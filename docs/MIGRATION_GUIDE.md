# Database Migration Guide - Manual Development

Since you've switched from Lovable to manual development, migrations are **NOT automatically applied** when you run the dev server. You need to apply them manually.

## 🎯 Quick Answer

**Will migrations be applied when I update or re-run the server?**

- ❌ **NO** - In manual development, migrations must be applied separately
- ✅ The dev server (`npm run dev`) only runs your frontend code
- ✅ Database migrations must be pushed to Supabase separately

## 🚀 How to Apply Migrations Now

### **Option 1: Use the Helper Script** (Easiest)

I've created a script that gives you multiple options:

```bash
./apply-migration.sh
```

This will show you a menu with 3 options:

1. **Supabase Dashboard** (Recommended - Opens browser)
2. **Supabase CLI** (Automated - needs password)
3. **Show SQL** (Copy manually)

### **Option 2: Direct Supabase Dashboard** (Manual but Simple)

1. **Open:** https://supabase.com/dashboard/project/orokbjfkklzlwbcweaja/sql/new

2. **Copy all SQL from:** `APPLY_THIS_SQL.sql` (in project root)

3. **Paste into SQL Editor and click "Run"**

4. **Verify:** You should see "admin_notifications table created successfully!"

### **Option 3: Using npx and Supabase CLI** (For Future Migrations)

```bash
# Link your project (one-time setup - you'll need your DB password)
npx supabase link --project-ref orokbjfkklzlwbcweaja

# Push migrations
npx supabase db push
```

## 📦 Project Structure

```
pie-order-heaven-main/
├── supabase/
│   ├── migrations/
│   │   ├── 20251008051816_*.sql  (existing)
│   │   └── 20251008120000_create_admin_notifications.sql  (new - needs to be applied)
│   └── config.toml
├── APPLY_THIS_SQL.sql  (ready-to-copy SQL)
├── apply-migration.sh  (helper script)
└── HOW_TO_APPLY_MIGRATION.md  (this file)
```

## 🔄 Development Workflow

### When Running the Dev Server:

```bash
npm run dev  # Only runs your React app - does NOT apply migrations
```

### When You Add New Migrations:

```bash
# 1. Create migration file in supabase/migrations/
# 2. Apply it using one of the methods above
# 3. Your app will use the updated database
```

## ✅ Verify Migration Applied

After applying, check in Supabase Dashboard:

1. Go to **Table Editor**
2. Look for `admin_notifications` table
3. Should have columns: `id`, `order_id`, `message`, `is_read`, `created_at`

## 🔧 Troubleshooting

### "Migration already applied" error?

- That's fine! The SQL uses `IF NOT EXISTS` so it's safe to run multiple times

### Can't access Supabase Dashboard?

- Make sure you're logged in to https://supabase.com
- Check you have access to project: `orokbjfkklzlwbcweaja`

### Supabase CLI asking for password?

- This is your **database password** (not your Supabase account password)
- Find it in Supabase Dashboard → Settings → Database → Connection string

## 💡 Future Migrations

For any new migrations you create:

1. **Create file:** `supabase/migrations/YYYYMMDDHHMMSS_description.sql`
2. **Apply using:** One of the methods above
3. **Commit to git:** So team members can apply the same migration

## 🎓 Understanding the Migration

The current migration creates:

- ✅ `admin_notifications` table
- ✅ Indexes for performance
- ✅ Row Level Security policies
- ✅ Integration with existing `orders` and `user_roles` tables

This enables real-time order notifications in your admin panel!

---

**Need Help?** Run the helper script: `./apply-migration.sh`
