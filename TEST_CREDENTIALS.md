# ✅ BELLCORP EVENT MANAGEMENT - TEST CREDENTIALS

## 🔐 LOGIN ACCOUNTS (Ready to Use)

### Account 1
Email: admin@bellcorp.com
Password: Admin@123

### Account 2  
Email: user@bellcorp.com
Password: User@123

### Account 3
Email: chandu@bellcorp.com
Password: Chandu@123

### Account 4
Email: john@bellcorp.com
Password: John@123

### Account 5
Email: demo@bellcorp.com
Password: Demo@123


### Account 6
Email: reddy@gmail.com
Password: reddy123

---

## 🚀 HOW TO USE

1. **Start Backend Server:**
   ```
   cd C:\Users\achan\OneDrive\Documents\Desktop\MERN\Bellcorp\server
   node server.js
   ```

2. **Start Frontend (New Terminal):**
   ```
   cd C:\Users\achan\OneDrive\Documents\Desktop\MERN\Bellcorp\client
   npm start
   ```

3. **Go to Login Page:**
   - http://localhost:3000/login

4. **Use any credential above to login**

---

## ⚠️ MongoDB Setup Required

To use these accounts, you need MongoDB. Choose ONE option:

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 cluster
4. Create database user with credentials
5. Get connection string
6. Update `server/.env` with connection string
7. Run: `node createTestUsers.js`

### Option B: Local MongoDB
1. Install MongoDB Community: https://www.mongodb.com/try/download/community
2. Start mongod service
3. Run: `node createTestUsers.js`
4. Login with credentials above

---

## 📝 Notes

- All passwords follow format: `[Name]@123`
- Accounts are pre-configured in `createTestUsers.js`
- Passwords are bcrypt hashed in database (never stored in plain text)
- JWT tokens expire after 7 days
- Tokens stored in browser localStorage

---

**Status:** Ready for MongoDB connection ✅
**Created:** February 14, 2026
