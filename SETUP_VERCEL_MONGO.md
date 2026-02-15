# ✅ COMPLETE SETUP GUIDE - Fix MONGO_URI Error

## 🎯 Goal
Get your login working by setting up environment variables in Vercel.

---

## 📝 Step 1: Get MongoDB Connection String (5 minutes)

### If you DON'T have MongoDB yet:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** or **Sign In**
3. Create account (or login if you have one)
4. Click **Build a Database** → **Create** (Free tier)
5. Wait ~5 minutes for cluster to be created
6. You'll see a green banner saying "Cluster created!"

### Get the connection string:

1. Click the **Connect** button (green button)
2. Click **Drivers** tab
3. Select **Node.js** from dropdown
4. Copy the full connection string that looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**⚠️ IMPORTANT:** Replace placeholders:
- `<username>` → Your MongoDB username (you created it during setup)
- `<password>` → Your MongoDB password (you created it during setup)
- Remove the `/?retryWrites=true&w=majority` part
- Add `/bellcorp` at the end (database name)

**Final format should look like:**
```
mongodb+srv://myusername:mypassword123@cluster0.abcde.mongodb.net/bellcorp
```

---

## 🔑 Step 2: Add Environment Variables to Vercel (2 minutes)

### 1. Open Vercel Dashboard
Go to: https://vercel.com/dashboard

### 2. Select Your Project
Click on **EMA** project

### 3. Click Settings
Click **Settings** in the top navigation bar

### 4. Click Environment Variables
In the left sidebar, click **Environment Variables**

### 5. Add MONGO_URI
Click **Add New**:
- **Name:** `MONGO_URI`
- **Value:** Paste your MongoDB connection string
  ```
  mongodb+srv://myusername:mypassword123@cluster0.abcde.mongodb.net/bellcorp
  ```
- **Select Environment:** Make sure all are checked (Production, Preview, Development)
- Click **Save**

### 6. Add JWT_SECRET
Click **Add New** again:
- **Name:** `JWT_SECRET`
- **Value:** Any random string (min 32 characters)
  ```
  your-super-secret-jwt-key-min-32-characters-12345678
  ```
- **Select Environment:** Make sure all are checked
- Click **Save**

### Screenshot Reference:
```
Settings → Environment Variables
├── MONGO_URI: mongodb+srv://...
├── JWT_SECRET: your-super-secret-jwt-key...
```

---

## 🚀 Step 3: Redeploy Your Project (1 minute)

### Option A: Automatic Redeploy (Recommended)
1. Go back to your code editor
2. Run:
   ```bash
   git add .
   git commit -m "Trigger redeploy"
   git push
   ```
3. Wait 1-2 minutes for Vercel to redeploy automatically

### Option B: Manual Redeploy
1. Go to Vercel → Your Project → **Deployments**
2. Find the latest deployment
3. Click the **⋯** (three dots) on the right
4. Click **Redeploy**
5. Click **Redeploy** in the confirmation dialog
6. Wait for green ✓ checkmark

---

## ✅ Step 4: Verify Environment Variables Are Loaded

### Test the Health Check Endpoint

Once deployment shows ✓, go to:
```
https://your-project-name.vercel.app/api/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2026-02-15T...",
  "environment": {
    "MONGO_URI_SET": true,        ← ✅ Should be true
    "JWT_SECRET_SET": true,        ← ✅ Should be true
    "NODE_ENV": "production"
  },
  "api_routes": { ... }
}
```

**If you see `false` for any variable:**
- Go back to Step 2 and verify you added them correctly
- Make sure you clicked **Save**
- Redeploy again

---

## 🔐 Step 5: Create Test User & Login (2 minutes)

### Create a User (Signup)
Go to your app and click **Sign Up**:
- **Full Name:** `Test User`
- **Email:** `test@example.com`
- **Password:** `password123`
- Click **Sign Up**

### Login with That User
- **Email:** `test@example.com`
- **Password:** `password123`
- Click **Login**

You should now be logged in! ✅

---

## 🐛 Troubleshooting

### ❌ Still seeing "MONGO_URI is not configured"

**Checklist:**
- [ ] Environment variables are in **Vercel Settings** (not local `.env`)
- [ ] Both `MONGO_URI` and `JWT_SECRET` are set
- [ ] Values have NO quotes around them
- [ ] Values have NO spaces
- [ ] Project was redeployed after setting env vars
- [ ] Waited 1-2 minutes for redeploy to complete
- [ ] Hard refreshed browser (Ctrl+Shift+R on Windows)

### ❌ `/api/health` shows `MONGO_URI_SET: false`

**Fix:**
1. Go to Vercel Settings → Environment Variables
2. Delete the `MONGO_URI` variable
3. Click **Add New** again
4. Carefully paste the MongoDB connection string again
5. Make sure **Production** is checked
6. Click **Save**
7. Click **Redeploy** on latest deployment

### ❌ MongoDB Authentication Failed

**Error:** `MongoAuthenticationError`

**Fix:**
- Go to MongoDB Atlas
- Click **Network Access** → **Add IP Address**
- Select **Allow access from anywhere** (0.0.0.0/0)
- Click **Confirm**

This allows Vercel serverless to connect to your database.

### ❌ "Invalid MongoDB URI"

**Common issues:**
- ❌ `mongodb+srv://username:password@cluster.mongodb.net` (missing `/dbname`)
- ✅ `mongodb+srv://username:password@cluster.mongodb.net/bellcorp`

- ❌ Password has special characters that need URL encoding
  - If password is `pass@word`, use `pass%40word` in URL
  - Use this tool: https://www.urlencoder.org/

### ❌ Server responds but shows "Database validation query failed"

**Fix:**
1. MongoDB credentials are correct
2. But database is empty
3. Create a user by signing up in the app
4. Database collections will be auto-created

---

## 📋 Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Connection string copied (format: `mongodb+srv://user:pass@cluster.mongodb.net/bellcorp`)
- [ ] MONGO_URI added to Vercel Settings
- [ ] JWT_SECRET added to Vercel Settings
- [ ] Project redeployed
- [ ] `/api/health` endpoint returns MONGO_URI_SET: true
- [ ] Created test user via signup
- [ ] Successfully logged in with test user

✅ If all checked → **Your app is fully working!**

---

## 🎓 Key Concepts Learned

| Concept | Explanation |
|---------|------------|
| **Environment Variables** | Configuration values that change per environment (local vs production) |
| **Local .env** | File in your computer - works locally only |
| **Vercel Settings** | Dashboard config - works in production |
| **MONGO_URI** | MongoDB connection string with credentials |
| **JWT_SECRET** | Secret key used to sign authentication tokens |
| **Redeploy** | Re-build and deploy your code with new env vars |

---

## 💡 Pro Tips

1. **Keep secrets safe:** Never commit `.env` files to GitHub
2. **Different secrets per env:** Use different JWT_SECRET for staging vs production
3. **MongoDB security:** Whitelist Vercel IP or use 0.0.0.0/0 (less secure but works)
4. **Test locally first:** Copy Vercel env vars to `.env.local` and test with `vercel dev`

