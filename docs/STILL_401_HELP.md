# 🔥 STILL GETTING 401 ERROR? DO THIS:

## Quick Diagnosis

### Step 1: Run Diagnostic

1. Open SQL Editor: https://supabase.com/dashboard/project/iprskbrwscolvbigkdyv/sql/new
2. Copy and run `DIAGNOSTIC_CHECK.sql`
3. **Tell me what the "CRITICAL CHECK" row says**

### Step 2: Run Nuclear Fix

1. Open SQL Editor again
2. Copy and run `NUCLEAR_FIX.sql` (the entire file)
3. Wait for success message

### Step 3: Hard Refresh Your Browser

```bash
# In your browser on http://localhost:8180
Press: Ctrl + Shift + R (or Cmd + Shift + R on Mac)
```

### Step 4: Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try placing an order
4. **Copy any error messages you see**

---

## Common Issues:

### Issue 1: Policy Doesn't Actually Exist

**Symptom:** Still getting 401
**Fix:** Run `NUCLEAR_FIX.sql`

### Issue 2: RLS is Blocking Anon Users

**Symptom:** Error says "permission denied"
**Fix:** The `NUCLEAR_FIX.sql` adds explicit GRANT permissions

### Issue 3: Wrong Supabase Key

**Check your `.env` file:**

```bash
cat .env
```

Should show:

```
VITE_SUPABASE_URL=https://iprskbrwscolvbigkdyv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbG...
```

If different, you're connecting to wrong database!

### Issue 4: Dev Server Not Reloaded

```bash
# Stop server (Ctrl+C) then restart:
npm run dev
```

---

## Tell Me:

1. **What does `DIAGNOSTIC_CHECK.sql` show?**
2. **What's the EXACT error message in browser console?**
3. **Does your `.env` file have the right project ID? (iprskbrwscolvbigkdyv)**

Let me know and I'll help you fix it!
