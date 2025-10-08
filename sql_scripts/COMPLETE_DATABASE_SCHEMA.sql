-- ============================================================================
-- HEAVENLY PIES - COMPLETE DATABASE SCHEMA
-- ============================================================================
-- This script creates all tables, functions, triggers, and policies
-- Run this in your new Supabase project SQL Editor
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE ENUMS
-- ============================================================================

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- ============================================================================
-- STEP 2: CREATE TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PROFILES TABLE
-- Stores additional user information linked to auth.users
-- ----------------------------------------------------------------------------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- USER_ROLES TABLE
-- Manages user permissions (admin/user)
-- ----------------------------------------------------------------------------
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- ----------------------------------------------------------------------------
-- ORDERS TABLE
-- Stores customer pie orders
-- ----------------------------------------------------------------------------
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  delivery_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  change_needed BOOLEAN DEFAULT FALSE,
  customer_amount DECIMAL(10, 2),
  calculated_change DECIMAL(10, 2),
  special_notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- ADMIN_NOTIFICATIONS TABLE
-- Stores notifications for admin when new orders arrive
-- ----------------------------------------------------------------------------
CREATE TABLE public.admin_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STEP 3: CREATE INDEXES
-- ============================================================================

-- Orders indexes
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_orders_customer_phone ON public.orders(customer_phone);

-- Admin notifications indexes
CREATE INDEX idx_admin_notifications_order_id ON public.admin_notifications(order_id);
CREATE INDEX idx_admin_notifications_is_read ON public.admin_notifications(is_read);
CREATE INDEX idx_admin_notifications_created_at ON public.admin_notifications(created_at DESC);

-- User roles index
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- ============================================================================
-- STEP 4: CREATE FUNCTIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- FUNCTION: has_role
-- Check if a user has a specific role
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ----------------------------------------------------------------------------
-- FUNCTION: handle_new_user
-- Automatically create profile and assign default role when user signs up
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- FUNCTION: notify_admin_on_new_order
-- Placeholder for order notification logic (notifications created from app)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_order()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
  -- The notification will be created by the application
  -- This trigger is just a placeholder for future enhancements
  RETURN NEW;
END;
$$;

-- ============================================================================
-- STEP 5: CREATE TRIGGERS
-- ============================================================================

-- Trigger: Create profile and role when new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Handle new order creation
CREATE TRIGGER on_order_created
  AFTER INSERT ON public.orders
  FOR EACH ROW 
  EXECUTE FUNCTION public.notify_admin_on_new_order();

-- ============================================================================
-- STEP 6: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 7: CREATE RLS POLICIES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------------------------------

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles 
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles 
  FOR UPDATE
  USING (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- USER_ROLES POLICIES
-- ----------------------------------------------------------------------------

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles 
  FOR SELECT
  USING (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- ORDERS POLICIES
-- ----------------------------------------------------------------------------

-- Anyone can create orders (public order form)
CREATE POLICY "Anyone can create orders"
  ON public.orders 
  FOR INSERT
  WITH CHECK (true);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON public.orders 
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders 
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- ADMIN_NOTIFICATIONS POLICIES
-- ----------------------------------------------------------------------------

-- Admins can read all notifications
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

-- Admins can update notifications (mark as read)
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

-- Anyone can insert notifications (for when orders are created)
CREATE POLICY "Anyone can insert notifications"
  ON public.admin_notifications
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- STEP 8: CREATE YOUR FIRST ADMIN USER (OPTIONAL)
-- ============================================================================

-- After you sign up through your app, run this to make yourself an admin:
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users

/*
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
*/

-- To find your user ID, you can run:
-- SELECT id, email FROM auth.users;

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify everything was created)
-- ============================================================================

-- Check all tables were created
SELECT 
  schemaname,
  tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check all functions
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- Check RLS is enabled
SELECT 
  tablename,
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

SELECT '✅ Heavenly Pies database schema created successfully!' AS status,
       'Tables: profiles, user_roles, orders, admin_notifications' AS tables_created,
       'Now update your .env with the new connection keys!' AS next_step;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
