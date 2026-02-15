# 🚀 Bellcorp Event Management - Complete Setup Guide

## Phase 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email/password
4. Verify your email

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Select "Shared" (free tier)
3. Choose cloud provider: AWS
4. Region: Closest to you
5. Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. In Cluster, go to "Database Access"
2. Click "Add New Database User"
3. Enter:
   - Username: `bellcorp_user`
   - Password: Generate strong password (save it!)
   - Role: "Edit any database"
4. Click "Create User"

### Step 4: Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect" button
3. Select "Drivers"
4. Copy connection string
5. Replace `<username>`, `<password>`, `bellcorp_events` with your values

Example:
```
mongodb+srv://bellcorp_user:yourPassword@cluster0.mongodb.net/bellcorp-events?retryWrites=true&w=majority
```

---

## Phase 2: Backend Installation & Setup

### Step 1: Navigate to Server Folder
```bash
cd Bellcorp/server
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB library)
- dotenv (environment variables)
- cors (cross-origin requests)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- nodemon (development)

### Step 3: Setup Environment Variables

Create `.env` file in `server/` folder:

```
PORT=5000
MONGO_URI=mongodb+srv://bellcorp_user:yourPassword@cluster0.mongodb.net/bellcorp-events?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345_change_this_in_production
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Seed Database (Optional but Recommended)
Populate database with 20 mock events:

```bash
npm run seed
```

You should see:
```
Connected to MongoDB
Database seeded with mock events
```

### Step 5: Start Backend Server
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### Test Backend with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create new request:
   - Method: GET
   - URL: http://localhost:5000/api/events
   - Send

You should get array of events!

---

## Phase 3: Frontend Installation & Setup

### Step 1: Navigate to Client Folder
```bash
cd Bellcorp/client
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- react (UI library)
- react-dom (rendering)
- react-router-dom (routing)
- axios (HTTP requests)

### Step 3: Create .env File

Create `.env` file in `client/` folder:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Server

In a NEW terminal (keep backend running):
```bash
npm start
```

App opens automatically on http://localhost:3000

---

## Phase 4: Testing the Full Application

### Test Flow:

1. **Visit Home Page**
   - http://localhost:3000
   - See features and CTA buttons

2. **Sign Up**
   - Click "Get Started"
   - Fill in: Name, Email, Password
   - Click "Sign Up"
   - Should redirect to Events page

3. **Browse Events**
   - See list of 20 events
   - Search events by name
   - Filter by Category and Location
   - See availability

4. **Register for Event**
   - Click "Register Now" on any event
   - Navigate to Event Details page
   - Click "Register Now" again
   - See success message
   - Go to Dashboard to see registered events

5. **View Dashboard**
   - See upcoming and past events
   - View registration stats

---

## Phase 5: Deployment

### Backend Deployment (Render.com)

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/Bellcorp.git
git push -u origin main
```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New Web Service"
   - Connect GitHub repo
   - Set Root Directory: `server`
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     NODE_ENV=production
     ```
   - Click "Deploy"

4. **Copy Backend URL**
   - After deployment, you get: `https://bellcorp-backend.render.com`

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Select GitHub repo
   - Set Root Directory: `client`
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://bellcorp-backend.render.com/api
     ```
   - Click "Deploy"

3. **Get Frontend URL**
   - After deployment: `https://bellcorp-frontend.vercel.app`

---

## 📱 API Documentation

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "_id": "userId",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Event Endpoints (Public)

#### Get All Events
```http
GET /events?search=tech&category=Technology&location=New York

Response (200):
[
  {
    "_id": "eventId",
    "name": "Tech Conference",
    "organizer": "Tech Org",
    "location": "San Francisco",
    "date": "2026-03-15T00:00:00Z",
    "description": "Annual conference",
    "capacity": 500,
    "category": "Technology",
    "registeredCount": 45
  }
]
```

#### Get Event by ID
```http
GET /events/:eventId

Response (200):
{
  _id, name, organizer, location, date, description, capacity, category, registeredCount
}
```

### Registration Endpoints (Protected - Requires JWT Token)

#### Register for Event
```http
POST /registrations/:eventId
Authorization: Bearer <YOUR_JWT_TOKEN>

Response (201):
{
  "message": "Registered successfully"
}
```

#### Get My Registrations
```http
GET /registrations/my
Authorization: Bearer <YOUR_JWT_TOKEN>

Response (200):
[
  {
    "_id": "registrationId",
    "user": "userId",
    "event": {
      _id, name, organizer, ...
    },
    "createdAt": "2026-02-14T10:00:00Z"
  }
]
```

---

## 🛠️ Troubleshooting

### Backend won't start
- Check `.env` file exists and MONGO_URI is correct
- Verify port 5000 is not in use
- Check MongoDB Atlas cluster is created
- Try: `npm install` again

### Frontend can't connect to backend
- Check backend is running (http://localhost:5000)
- Verify `.env` has correct API_URL
- Check browser console for CORS errors
- Try: `npm install axios` again

### Database errors
- Check MongoDB Atlas IP whitelist (allow all for development)
- Verify username/password in connection string
- Check database name in URI

### Can't register for event
- Make sure you're logged in
- Check JWT token is valid
- Verify event isn't full (capacity limit)
- Check backend console for errors

---

## 📋 Project Structure Final

```
Bellcorp/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   └── endpoints.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── EventCard.js
│   │   │   └── EventCard.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Home.js & Home.css
│   │   │   ├── Login.js & Auth.css
│   │   │   ├── Signup.js
│   │   │   ├── Events.js & Events.css
│   │   │   ├── EventDetails.js & EventDetails.css
│   │   │   ├── Dashboard.js & Dashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with correct credentials
- [ ] Backend `.env` configured
- [ ] `npm install` run in server folder
- [ ] `npm run seed` executed
- [ ] Backend starts with `npm run dev`
- [ ] Postman test successful
- [ ] Frontend `.env` configured
- [ ] `npm install` run in client folder
- [ ] Frontend starts with `npm start`
- [ ] Signup flow works
- [ ] Event search/filter works
- [ ] Event registration works
- [ ] Dashboard displays upcoming/past events
- [ ] (Optional) Backend deployed to Render
- [ ] (Optional) Frontend deployed to Vercel

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- React: https://react.dev
- JWT: https://jwt.io
- Mongoose: https://mongoosejs.com
- React Router: https://reactrouter.com

---

**Good luck building Bellcorp! 🎉**
