-- ============================================================================
-- DEFINITIVE FIX: Allow Anonymous Users to Insert Orders
-- ============================================================================
-- This grants explicit permissions to the anon role
-- ============================================================================

-- STEP 1: Drop existing policies completely
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- STEP 2: Grant explicit table permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON TABLE public.orders TO anon;
GRANT INSERT ON TABLE public.admin_notifications TO anon;

-- STEP 3: Create policy specifically for anon role
CREATE POLICY "anon_can_insert_orders"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- STEP 4: Create policy for authenticated admins to view
CREATE POLICY "admins_can_select_orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- STEP 5: Create policy for authenticated admins to update
CREATE POLICY "admins_can_update_orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- STEP 6: Fix admin_notifications policies
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can read all notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.admin_notifications;

GRANT INSERT ON TABLE public.admin_notifications TO anon;

CREATE POLICY "anon_can_insert_notifications"
  ON public.admin_notifications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "admins_can_select_notifications"
  ON public.admin_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "admins_can_update_notifications"
  ON public.admin_notifications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- STEP 7: Verify everything
SELECT 
  '✅ PERMISSIONS GRANTED' as status,
  grantee,
  privilege_type,
  table_name
FROM information_schema.role_table_grants
WHERE table_schema = 'public' 
  AND table_name IN ('orders', 'admin_notifications')
  AND grantee = 'anon'
ORDER BY table_name, privilege_type;

SELECT 
  '✅ POLICIES CREATED' as status,
  tablename,
  policyname,
  roles::text as for_roles,
  cmd as operation
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('orders', 'admin_notifications')
ORDER BY tablename, policyname;

-- SUCCESS!
SELECT '🎉 COMPLETE!' as status,
       'Anonymous users can now INSERT orders' as message,
       'Admins can SELECT and UPDATE orders' as admin_access,
       'Try placing an order now!' as action;
