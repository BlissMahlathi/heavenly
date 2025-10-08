# 🚨 URGENT FIX: Create Your Database Tables Now

## You're getting 401 errors because your database is EMPTY!

Your new Supabase project `iprskbrwscolvbigkdyv` has **NO TABLES** yet.
You need to create them by running the SQL script.

---

## ⚡ FASTEST FIX (2 Steps):

### **STEP 1: Click This Link**

👉 **https://supabase.com/dashboard/project/iprskbrwscolvbigkdyv/sql/new**

This opens the SQL Editor in your Supabase dashboard.

---

### **STEP 2: Copy & Run This SQL**

Copy everything below (from `-- ====` to the last line) and paste it into the SQL Editor, then click **RUN**:

```sql
-- ============================================================================
-- HEAVENLY PIES - QUICK SETUP
-- ============================================================================

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create orders table (THIS IS WHAT'S MISSING!)
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

-- Create other required tables
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

CREATE TABLE public.admin_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_admin_notifications_order_id ON public.admin_notifications(order_id);
CREATE INDEX idx_admin_notifications_is_read ON public.admin_notifications(is_read);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- THIS IS THE MOST IMPORTANT POLICY - IT ALLOWS PUBLIC ORDER CREATION!
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- Anyone can insert notifications
CREATE POLICY "Anyone can insert notifications"
  ON public.admin_notifications
  FOR INSERT
  WITH CHECK (true);

-- Admins can read notifications
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

-- Admins can update notifications
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

-- Users can view own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can view own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create function to check roles
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

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Success message
SELECT '✅ Database created successfully!' AS status,
       'Your order form should work now!' AS message;
```

---

## ✅ After Running:

1. You should see a success message: **"Database created successfully!"**
2. Go back to your app: http://localhost:8180
3. Try placing an order again
4. It should work! 🎉

---

## 🔍 What Just Happened:

The SQL script created:

- ✅ `orders` table - to store customer orders
- ✅ RLS policy: "Anyone can create orders" - this fixes the 401 error!
- ✅ All other tables and policies for the admin panel

---

## 🆘 If It Still Doesn't Work:

1. Make sure the SQL ran successfully (check for green success message)
2. Hard refresh your browser: `Ctrl + Shift + R`
3. Check browser console for any new errors
4. Come back and let me know what error you see!

---

**👉 DO THIS NOW: Click the link above, paste the SQL, and click RUN!**
