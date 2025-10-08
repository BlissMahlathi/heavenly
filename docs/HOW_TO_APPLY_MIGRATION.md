# How to Apply Database Migration in Lovable

Since you're using Lovable Cloud, here's how to apply the admin_notifications table migration:

## 🚀 Quick Steps

### Method 1: Automatic (Recommended - Wait for Sync)

1. **Save all your files** in Lovable
2. **Wait for Lovable to rebuild** your project
3. The migration should be **automatically detected and applied**
4. Check your Supabase dashboard to verify the table was created

### Method 2: Manual (Immediate)

1. **Open your Lovable project**
2. Navigate to the **"Database"** or **"Supabase"** tab in the left sidebar
3. Look for **"SQL Editor"** or similar option
4. **Copy the entire content** from the file: `APPLY_THIS_SQL.sql`
5. **Paste and run** the SQL
6. You should see: "admin_notifications table created successfully!"

### Method 3: Direct Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Sign in and select your project: `orokbjfkklzlwbcweaja`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**
5. Copy the content from `APPLY_THIS_SQL.sql`
6. Paste and click **"Run"** (or Ctrl+Enter)

## ✅ Verify Migration Applied

After applying the migration, verify it worked:

1. Go to Supabase Dashboard → **Table Editor**
2. Look for the **`admin_notifications`** table
3. Check it has these columns:
   - id (uuid)
   - order_id (uuid)
   - message (text)
   - is_read (boolean)
   - created_at (timestamp)

## 🎯 What This Migration Does

Creates the `admin_notifications` table that will:

- Store notification messages when customers place orders
- Track which notifications have been read
- Link each notification to an order
- Enable real-time notifications in the admin panel

## 📝 File Locations

- **Migration SQL to apply:** `/APPLY_THIS_SQL.sql` (in project root)
- **Original migration file:** `/supabase/migrations/20251008120000_create_admin_notifications.sql`

## 🆘 Need Help?

If you encounter any errors:

1. Check that the `orders` table exists (it should)
2. Check that the `user_roles` table exists (it should)
3. Make sure you're signed in as a project admin in Supabase
4. Try running the SQL in parts if you get errors

---

**After the migration is applied, your notification system will be fully functional!** 🎉
