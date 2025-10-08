-- ============================================================================
-- SIMPLE TEST: Can anon insert into orders?
-- ============================================================================
-- Run this to see EXACTLY what's wrong
-- ============================================================================

-- Test 1: Check if orders table exists
SELECT 
  'TEST 1: Table Exists' as test,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'orders' AND schemaname = 'public')
    THEN '✅ YES - orders table exists'
    ELSE '❌ NO - orders table missing!'
  END as result;

-- Test 2: Check if RLS is enabled
SELECT 
  'TEST 2: RLS Status' as test,
  CASE 
    WHEN rowsecurity = true 
    THEN '✅ RLS is enabled'
    ELSE '❌ RLS is disabled'
  END as result
FROM pg_tables 
WHERE tablename = 'orders' AND schemaname = 'public';

-- Test 3: Check table grants for anon role
SELECT 
  'TEST 3: Anon Permissions' as test,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.role_table_grants
      WHERE table_schema = 'public'
        AND table_name = 'orders'
        AND grantee = 'anon'
        AND privilege_type = 'INSERT'
    )
    THEN '✅ anon has INSERT permission'
    ELSE '❌ anon DOES NOT have INSERT permission - THIS IS THE PROBLEM!'
  END as result;

-- Test 4: List all policies on orders table
SELECT 
  'TEST 4: Policies' as test,
  policyname,
  cmd as operation,
  ARRAY_TO_STRING(roles, ', ') as applies_to_roles
FROM pg_policies
WHERE tablename = 'orders' AND schemaname = 'public';

-- Test 5: Check if policy for anon INSERT exists
SELECT 
  'TEST 5: Anon INSERT Policy' as test,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = 'orders'
        AND cmd = 'INSERT'
        AND 'anon' = ANY(roles)
    )
    THEN '✅ Policy exists for anon INSERT'
    ELSE '❌ No policy for anon INSERT - THIS IS THE PROBLEM!'
  END as result;

-- FINAL DIAGNOSIS
SELECT 
  '🔍 DIAGNOSIS' as test,
  CASE 
    -- Check if both grant and policy exist
    WHEN EXISTS (
      SELECT 1 FROM information_schema.role_table_grants
      WHERE table_schema = 'public'
        AND table_name = 'orders'
        AND grantee = 'anon'
        AND privilege_type = 'INSERT'
    ) AND EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = 'orders'
        AND cmd = 'INSERT'
        AND 'anon' = ANY(roles)
    )
    THEN '✅ Everything is configured correctly!'
    
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.role_table_grants
      WHERE table_schema = 'public'
        AND table_name = 'orders'
        AND grantee = 'anon'
        AND privilege_type = 'INSERT'
    )
    THEN '❌ MISSING: GRANT INSERT permission to anon role'
    
    WHEN NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = 'orders'
        AND cmd = 'INSERT'
        AND 'anon' = ANY(roles)
    )
    THEN '❌ MISSING: RLS policy for anon INSERT'
    
    ELSE '❌ Unknown issue'
  END as diagnosis,
  '👉 Run FINAL_FIX_ANON_ROLE.sql to fix!' as solution;
