# Troubleshooting Guide - MONGO_URI Error

If you're seeing the error "MONGO_URI environment variable is not set", follow these steps:

## Step 1: Verify Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your **EMA** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. You should see:
   - `MONGO_URI` → `mongodb+srv://...`
   - `JWT_SECRET` → `your-secret-key`

If you don't see these variables, **add them now** using the form.

## Step 2: Check the Health Endpoint

After setting environment variables, test this endpoint:

```
GET https://your-vercel-project.vercel.app/api/health
```

This will show you:
- Whether MONGO_URI is set
- Whether JWT_SECRET is set
- Available API routes

## Step 3: Redeploy After Adding Env Vars

After adding environment variables:

**Option A: Automatic (recommended)**
- Just push a new commit to GitHub
- Vercel will automatically redeploy with the new env vars
- Wait 1-2 minutes for deployment to complete

**Option B: Manual Redeploy**
1. Go to Vercel dashboard → Your Project
2. Click **Deployments** tab
3. Find the latest deployment
4. Click the ⋯ (three dots) → **Redeploy**
5. Click **Redeploy** button in the confirmation dialog

## Step 4: Get MongoDB Connection String

If you don't have a MongoDB connection string:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click **Build a Database** → **Create** (Free tier)
4. Wait for cluster creation (~5 minutes)
5. Click **Connect** button
6. Click **Drivers** tab
7. Copy the connection string that looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 5: Paste into Vercel

1. Go back to Vercel → Your Project → Settings → Environment Variables
2. Create new variable:
   - Name: `MONGO_URI`
   - Value: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bellcorp`
   - Production: ✓ (checked)
   - Click **Add**

For JWT_SECRET:
- Name: `JWT_SECRET`
- Value: `your-super-secret-jwt-key-1234567890` (any random string, min 32 chars)
- Production: ✓ (checked)
- Click **Add**

## Step 6: Wait for Redeployment

After adding env vars:
1. Any new push to GitHub will trigger a redeploy with the env vars
2. Or manually redeploy from Vercel dashboard
3. Wait for deployment status to show ✓ (green checkmark)
4. Test `/api/health` endpoint to verify env vars are loaded

## Verification Checklist

- [ ] Environment variables added in Vercel Settings
- [ ] Project redeployed after adding env vars
- [ ] `GET /api/health` returns 200 and shows MONGO_URI_SET: true
- [ ] `POST /api/auth` with login credentials works
- [ ] No "MONGO_URI is not set" errors in logs

## Common Mistakes

❌ **Mistake 1:** Added env vars but didn't redeploy
✅ **Fix:** After adding env vars, push a commit or manually redeploy

❌ **Mistake 2:** Set env vars in `.env` file locally instead of Vercel
✅ **Fix:** Environment variables MUST be set in Vercel project settings, NOT in `.env` files

❌ **Mistake 3:** Used wrong MongoDB connection string format
✅ **Fix:** Use the full connection string from MongoDB Atlas with username and password

❌ **Mistake 4:** Deployment shows green ✓ but still getting errors
✅ **Fix:** Stop the browser cache by doing hard refresh (Ctrl+Shift+R on Windows)

## Still Having Issues?

Check Vercel logs:
1. Go to Vercel dashboard → Your Project
2. Click **Deployments** → Latest deployment
3. Click **View Build Logs** to see if build succeeded
4. Click **Runtime Logs** to see function execution errors

If logs show the functions are still being built, wait a few more minutes for the build to complete.
