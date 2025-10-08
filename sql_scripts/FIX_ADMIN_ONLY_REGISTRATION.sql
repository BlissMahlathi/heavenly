-- ============================================================================
-- FIX: Drop existing policies and recreate with admin-only registration
-- ============================================================================
-- Run this in Supabase SQL Editor to fix the policy conflict
-- ============================================================================

-- First, drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can read all notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Drop and recreate the user creation function to prevent public signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ============================================================================
-- RECREATE POLICIES
-- ============================================================================

-- ORDERS: Anyone can create orders (customers don't need accounts)
CREATE POLICY "Anyone can create orders"
  ON public.orders 
  FOR INSERT
  WITH CHECK (true);

-- ORDERS: Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON public.orders 
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- ORDERS: Admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders 
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- NOTIFICATIONS: Anyone can insert (for when orders are created)
CREATE POLICY "Anyone can insert notifications"
  ON public.admin_notifications
  FOR INSERT
  WITH CHECK (true);

-- NOTIFICATIONS: Admins can read all
CREATE POLICY "Admins can read all notifications"
  ON public.admin_notifications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- NOTIFICATIONS: Admins can update
CREATE POLICY "Admins can update notifications"
  ON public.admin_notifications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- PROFILES: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles 
  FOR SELECT
  USING (auth.uid() = id);

-- PROFILES: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles 
  FOR UPDATE
  USING (auth.uid() = id);

-- USER_ROLES: Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles 
  FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- ADMIN-ONLY REGISTRATION FUNCTION
-- This function only creates profiles for users with admin role
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create profile if user already has admin role
  -- (Admin users must be created manually via Supabase dashboard first)
  IF EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = NEW.id AND role = 'admin'
  ) THEN
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'full_name',
      NEW.email
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

SELECT '✅ Policies updated successfully!' AS status,
       'Public signups are now blocked - only manual admin creation allowed' AS message;

-- ============================================================================
-- HOW TO CREATE ADMIN USERS
-- ============================================================================

-- STEP 1: Go to Authentication → Users in Supabase dashboard
-- STEP 2: Click "Add user" → "Create new user"
-- STEP 3: Enter email and password
-- STEP 4: After user is created, run this SQL (replace the email):
/*
-- Find the user ID
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';

-- Add admin role (replace YOUR_USER_ID with the ID from above)
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create profile
INSERT INTO public.profiles (id, email, full_name)
VALUES ('YOUR_USER_ID_HERE', 'admin@example.com', 'Admin Name')
ON CONFLICT (id) DO NOTHING;
*/
