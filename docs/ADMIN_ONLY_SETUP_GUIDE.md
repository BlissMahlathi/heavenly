# 🔒 Admin-Only Registration Setup

## What This Does:

- ✅ Customers can place orders without signing up
- ✅ Only manually created admin users can access the admin panel
- ❌ Public signup is blocked

---

## Step 1: Run the SQL Fix

1. Open SQL Editor: https://supabase.com/dashboard/project/iprskbrwscolvbigkdyv/sql/new
2. Copy the entire contents of `FIX_ADMIN_ONLY_REGISTRATION.sql`
3. Paste and click **Run**
4. You should see: "Policies updated successfully!"

---

## Step 2: Disable Public Signups in Supabase

1. Go to: https://supabase.com/dashboard/project/iprskbrwscolvbigkdyv/auth/providers
2. Scroll down to **"Email"** provider
3. **Turn OFF** these options:
   - ❌ **"Enable email signups"** (uncheck this!)
   - ❌ **"Confirm email"** (optional, can leave on)
4. Click **"Save"**

This prevents anyone from signing up through your `/auth` page!

---

## Step 3: Create Your First Admin User

### Method A: Through Supabase Dashboard (Recommended)

1. Go to: https://supabase.com/dashboard/project/iprskbrwscolvbigkdyv/auth/users
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: `your-admin-email@example.com`
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Check this
4. Click **"Create user"**
5. Copy the User ID that appears

### Method B: Get User ID and Assign Admin Role

After creating the user, run this SQL to make them admin:

```sql
-- First, find your user ID
SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com';

-- Copy the ID, then run this (replace YOUR_USER_ID):
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create their profile
INSERT INTO public.profiles (id, email, full_name)
VALUES ('YOUR_USER_ID_HERE', 'your-admin-email@example.com', 'Admin Name')
ON CONFLICT (id) DO NOTHING;
```

---

## Step 4: Test It!

### Test Order Placement (Should Work)

1. Go to homepage: http://localhost:8180
2. Fill out the order form
3. Submit order
4. Should work! ✅

### Test Admin Login (Should Work)

1. Go to: http://localhost:8180/admin
2. Click "Sign In"
3. Enter your admin email and password
4. Should see the admin dashboard! ✅

### Test Public Signup (Should Fail)

1. Go to: http://localhost:8180/auth
2. Try to sign up with a new email
3. Should show error or be disabled! ✅

---

## How It Works:

```
┌─────────────────────────────────────────────────────┐
│  PUBLIC USERS (No Account)                          │
│  ✅ Can place orders through the form               │
│  ❌ Cannot sign up                                   │
│  ❌ Cannot access admin panel                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ADMIN USERS (Manually Created)                     │
│  ✅ Created via Supabase dashboard                   │
│  ✅ Have 'admin' role in user_roles table            │
│  ✅ Can sign in to admin panel                       │
│  ✅ Can view all orders and notifications            │
└─────────────────────────────────────────────────────┘
```

---

## Database Policies Explained:

### Orders Table:

- ✅ **Anyone** can INSERT (place orders) - no auth needed
- ✅ **Only admins** can SELECT (view orders)
- ✅ **Only admins** can UPDATE (change order status)

### Admin Notifications:

- ✅ **Anyone** can INSERT (create notifications when order placed)
- ✅ **Only admins** can SELECT/UPDATE (view and mark as read)

### Profiles & User Roles:

- ✅ **Only authenticated users** can view their own data
- ✅ **No public access**

---

## Troubleshooting:

### "Policy already exists" error

- The SQL fix script already handles this - it drops existing policies first

### Can't access admin panel after signing in

- Make sure you added the admin role using the SQL above
- Check: `SELECT * FROM user_roles WHERE user_id = 'YOUR_ID';`

### Orders still not working

- Check browser console for errors
- Verify the "Anyone can create orders" policy exists
- Run: `SELECT * FROM pg_policies WHERE tablename = 'orders';`

### How to add more admin users

- Repeat Step 3 for each new admin
- Or create a helper function to do it automatically

---

## Summary:

✅ Run `FIX_ADMIN_ONLY_REGISTRATION.sql`
✅ Disable email signups in Auth settings
✅ Create admin user in Supabase dashboard
✅ Assign admin role using SQL
✅ Test order placement and admin login
