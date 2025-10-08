# 🔑 Quick Fix: Get Your Supabase Keys

## The Problem

Your `.env` file is missing the Supabase connection keys, causing the error:

```
Uncaught Error: supabaseUrl is required.
```

## The Solution (2 Minutes)

### Step 1: Go to Your Supabase Project

Open this link in your browser:

```
https://supabase.com/dashboard/project/orokbjfkklzlwbcweaja/settings/api
```

### Step 2: Copy Your Keys

You'll see two important values:

1. **Project URL** - looks like: `https://orokbjfkklzlwbcweaja.supabase.co`
2. **anon public key** - a very long string starting with `eyJ...`

### Step 3: Update Your `.env` File

Open the `.env` file in your project root and replace these lines:

```env
VITE_SUPABASE_URL=https://orokbjfkklzlwbcweaja.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=paste_your_actual_anon_key_here
```

**Replace:**

- `https://orokbjfkklzlwbcweaja.supabase.co` ← with your actual Project URL (if different)
- `paste_your_actual_anon_key_here` ← with your actual anon public key

### Step 4: Restart the Server

```bash
# Press Ctrl+C to stop the current server
# Then run:
npm run dev
```

## ✅ Verification

After restarting, go to `http://localhost:5173`

- If you see the homepage → **Success!** ✨
- If you still get errors → Check that you copied the full anon key (it's very long)

## 📝 Important Notes

- The **anon key** is safe to use in client-side code
- Never commit sensitive keys to Git (`.env` is already in `.gitignore`)
- The URL should match your project ID: `orokbjfkklzlwbcweaja`
- Make sure there are NO spaces before or after the `=` sign
- Make sure there are NO quotes around the values

## Example of a Correct `.env` File

```env
VITE_SUPABASE_URL=https://orokbjfkklzlwbcweaja.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yb2tiamZra2x6bHdiY3dlYWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMDAwMDAsImV4cCI6MTg1NDg1MjgwMH0.example_signature_here
```

The anon key will be much longer than this example!

## 🆘 Still Having Issues?

### "Cannot find module .env"

- Make sure the `.env` file is in the root folder (same level as `package.json`)
- The file should be named exactly `.env` (with the dot at the start)

### "Invalid API key"

- Copy the key again from Supabase dashboard
- Make sure you copied the **anon** key, not the **service_role** key
- Check for any extra spaces or line breaks

### "Project not found"

- Verify your project ID is `orokbjfkklzlwbcweaja`
- Check if the project is still active in your Supabase dashboard
