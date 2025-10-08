-- ============================================================================
-- NUCLEAR OPTION: Complete Reset and Rebuild
-- ============================================================================
-- If you're still getting errors, run this to completely reset
-- ============================================================================

-- STEP 1: Drop everything related to orders table
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;

-- STEP 2: Disable RLS temporarily
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- STEP 3: Re-enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create the INSERT policy (this is the critical one!)
CREATE POLICY "Anyone can create orders"
  ON public.orders 
  FOR INSERT
  TO public  -- Important: TO public means unauthenticated users
  WITH CHECK (true);  -- Always allow

-- STEP 5: Create SELECT policy for admins
CREATE POLICY "Admins can view all orders"
  ON public.orders 
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- STEP 6: Create UPDATE policy for admins
CREATE POLICY "Admins can update orders"
  ON public.orders 
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- STEP 7: Verify the policy was created
SELECT 
  'VERIFICATION' as status,
  policyname,
  cmd,
  CASE WHEN qual IS NULL THEN 'No USING clause' ELSE 'Has USING clause' END as using_status,
  CASE WHEN with_check IS NULL THEN 'No WITH CHECK' ELSE 'Has WITH CHECK' END as check_status,
  roles::text as applies_to_roles
FROM pg_policies 
WHERE tablename = 'orders'
ORDER BY policyname;

-- STEP 8: Grant explicit permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.admin_notifications TO anon;

-- Success message
SELECT '✅ COMPLETE!' as status,
       'Orders table policies recreated with explicit anon permissions' as message,
       'Try placing an order now!' as action;
