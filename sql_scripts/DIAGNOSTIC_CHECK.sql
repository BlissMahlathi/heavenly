-- ============================================================================
-- DIAGNOSTIC: Check Current Database State
-- ============================================================================
-- Run this to see what's configured in your database
-- ============================================================================

-- 1. Check if tables exist
SELECT 'TABLES' as check_type, tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check if RLS is enabled
SELECT 'RLS STATUS' as check_type, tablename, rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 3. Check policies on orders table
SELECT 'ORDERS POLICIES' as check_type, 
       policyname, 
       cmd as operation,
       qual as using_expression,
       with_check as with_check_expression
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'orders';

-- 4. Check if the critical policy exists
SELECT 'CRITICAL CHECK' as check_type,
       CASE 
         WHEN EXISTS (
           SELECT 1 FROM pg_policies 
           WHERE tablename = 'orders' 
           AND policyname = 'Anyone can create orders'
         ) 
         THEN '✅ Policy EXISTS - orders should work'
         ELSE '❌ Policy MISSING - this is the problem!'
       END as status;

-- 5. Check admin notifications policies
SELECT 'NOTIFICATIONS POLICIES' as check_type,
       policyname,
       cmd as operation
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'admin_notifications';

-- 6. Test insert permission (this will fail if policy is wrong)
-- This is just to see what error we get
SELECT 'TEST INSERT' as check_type,
       'About to test if anonymous users can insert...' as message;
