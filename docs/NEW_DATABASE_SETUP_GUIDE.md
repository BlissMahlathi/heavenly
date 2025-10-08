# 🚀 New Supabase Database Setup Guide

## Step 1: Create New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Choose your organization
4. Fill in project details:
   - **Name**: `pie-order-heaven` (or any name you prefer)
   - **Database Password**: Choose a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

---

## Step 2: Run the SQL Schema

1. In your new Supabase project dashboard:

   - Click **"SQL Editor"** in the left sidebar
   - Click **"New query"**

2. Open the file `COMPLETE_DATABASE_SCHEMA.sql` from this project

3. Copy the **entire contents** of that file

4. Paste it into the Supabase SQL Editor

5. Click **"Run"** (or press `Ctrl/Cmd + Enter`)

6. You should see success messages at the bottom showing:
   - Tables created
   - Functions created
   - Policies created
   - ✅ Success message

---

## Step 3: Get Your New Connection Keys

1. In Supabase dashboard, click **"Project Settings"** (gear icon in sidebar)

2. Click **"API"** in the settings menu

3. You'll see two important keys:

   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOi...` (very long string)

4. **IMPORTANT**: Copy both of these!

---

## Step 4: Update Your Application

1. Open the file `.env` in your project root (create it if it doesn't exist)

2. Replace the old values with your new ones:

```env
VITE_SUPABASE_URL=https://your-new-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-new-anon-key-here
```

3. Save the file

---

## Step 5: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Step 6: Create Your First Admin User

### Option A: Sign Up Through the App

1. Go to your app: `http://localhost:5173/auth`
2. Sign up with your email
3. Check your email for verification link
4. Verify your email

### Option B: Create User Directly in Supabase

1. In Supabase dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter your email and password
4. Click **"Create user"**

### Make Yourself an Admin

1. Go to **SQL Editor** in Supabase
2. Click **"New query"**
3. First, find your user ID:
   ```sql
   SELECT id, email FROM auth.users;
   ```
4. Copy your user ID
5. Run this to make yourself admin (replace `YOUR_USER_ID`):
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('YOUR_USER_ID_HERE', 'admin')
   ON CONFLICT (user_id, role) DO NOTHING;
   ```

---

## Step 7: Verify Everything Works

### Test Order Creation

1. Go to homepage: `http://localhost:5173`
2. Fill out the order form
3. Submit an order
4. You should see a success message with an **Order Number**

### Test Admin Dashboard

1. Go to admin page: `http://localhost:5173/admin`
2. Sign in with your admin account
3. You should see:
   - Recent orders with order numbers
   - Analytics cards
   - Notification bell (click it to see the order you just created)

### Test Notifications

1. Create another order from the homepage
2. Watch the notification bell on the admin page
3. A notification should appear in real-time!

---

## 🎉 You're All Set!

Your new Supabase database is now running with:

- ✅ All tables (profiles, user_roles, orders, admin_notifications)
- ✅ Row Level Security policies
- ✅ Admin role system
- ✅ Real-time notifications
- ✅ Order number system

---

## 🆘 Troubleshooting

### "Failed to fetch" errors

- Check your `.env` file has correct URL and key
- Make sure you restarted the dev server after updating `.env`

### Can't see orders in admin dashboard

- Make sure you added the admin role to your user
- Sign out and sign back in to refresh permissions

### Notifications not appearing

- Check browser console for errors
- Verify the admin_notifications table exists in Supabase
- Make sure you're signed in as an admin user

### Email verification not working

- Go to Supabase → **Authentication** → **URL Configuration**
- Add your site URL: `http://localhost:5173`
- Or disable email confirmation in **Authentication** → **Providers** → **Email** → Turn off "Confirm email"

---

## 📝 Notes

- Your old database (`orokbjfkklzlwbcweaja`) will remain unchanged
- You can keep both databases or delete the old one
- All data starts fresh in the new database
- Don't forget to update production environment variables when deploying!

---

## 🔒 Security Reminder

- Never commit `.env` files to Git
- Keep your database password safe
- The `anon` key is safe to use in client-side code
- Never expose your `service_role` key in frontend code
