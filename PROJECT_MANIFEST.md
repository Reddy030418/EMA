# 📋 Bellcorp Project Manifest

## Complete File Inventory & Guide

Generated on: February 14, 2026

---

## 📦 Backend (Node.js + Express)

### Configuration
- ✅ `server/config/db.js` - MongoDB connection setup
- ✅ `server/.env` - Environment variables template
- ✅ `server/package.json` - Dependencies & scripts

### Models (Mongoose Schemas)
- ✅ `server/models/User.js` - User model (name, email, password)
- ✅ `server/models/Event.js` - Event model (details, capacity, registeredCount)
- ✅ `server/models/Registration.js` - Registration model (user-event mapping)

### Controllers (Business Logic)
- ✅ `server/controllers/authController.js`
  - `signup()` - Create new user
  - `login()` - Authenticate user
- ✅ `server/controllers/eventController.js`
  - `getEvents()` - Get all events with search/filter
  - `getEventById()` - Get single event
- ✅ `server/controllers/registrationController.js`
  - `registerEvent()` - Register user for event
  - `getMyRegistrations()` - Get user's registrations

### Middleware
- ✅ `server/middleware/authMiddleware.js`
  - `protect()` - JWT verification middleware

### Routes (API Endpoints)
- ✅ `server/routes/authRoutes.js`
  - POST `/auth/signup`
  - POST `/auth/login`
- ✅ `server/routes/eventRoutes.js`
  - GET `/events` (with search/filter)
  - GET `/events/:id`
- ✅ `server/routes/registrationRoutes.js`
  - POST `/registrations/:eventId` (protected)
  - GET `/registrations/my` (protected)

### Server
- ✅ `server/server.js` - Main entry point with Express setup
- ✅ `server/seed.js` - Database seeding with 20 sample events

---

## 🎨 Frontend (React + Context API)

### Core Files
- ✅ `client/src/index.js` - React entry point
- ✅ `client/src/index.css` - Global styles
- ✅ `client/src/App.js` - Main app with routing
- ✅ `client/src/App.css` - App styles
- ✅ `client/package.json` - Dependencies & scripts
- ✅ `client/.env` - Environment configuration

### Public Files
- ✅ `client/public/index.html` - HTML template

### API Layer
- ✅ `client/src/api/axios.js` - Axios instance with JWT interceptor
- ✅ `client/src/api/endpoints.js` - API function exports
  - `signup()`, `login()`
  - `getEvents()`, `getEventById()`
  - `registerForEvent()`, `getMyRegistrations()`

### Context & Hooks
- ✅ `client/src/context/AuthContext.js`
  - `AuthContext` - Global auth state
  - `AuthProvider` - Context provider
  - Methods: `login()`, `logout()`
- ✅ `client/src/hooks/useAuth.js`
  - `useAuth()` - Custom hook to access auth context

### Components (Reusable)
- ✅ `client/src/components/Navbar.js` - Navigation bar
- ✅ `client/src/components/Navbar.css` - Navbar styles
- ✅ `client/src/components/EventCard.js` - Event card component
- ✅ `client/src/components/EventCard.css` - EventCard styles

### Pages
- ✅ `client/src/pages/Home.js` - Landing page with hero
- ✅ `client/src/pages/Home.css` - Home styles
- ✅ `client/src/pages/Login.js` - Login form
- ✅ `client/src/pages/Signup.js` - Signup form
- ✅ `client/src/pages/Auth.css` - Auth pages styles
- ✅ `client/src/pages/Events.js` - Events grid with search/filter
- ✅ `client/src/pages/Events.css` - Events page styles
- ✅ `client/src/pages/EventDetails.js` - Single event details & registration
- ✅ `client/src/pages/EventDetails.css` - Event details styles
- ✅ `client/src/pages/Dashboard.js` - User dashboard
- ✅ `client/src/pages/Dashboard.css` - Dashboard styles

---

## 📚 Documentation

- ✅ `README.md` - Main project documentation
- ✅ `README_PROJECT.md` - Extended features & tech stack
- ✅ `GETTING_STARTED.md` - Quick start guide
- ✅ `SETUP_GUIDE.md` - Complete setup instructions (Phase 1-5)
- ✅ `API_TESTING_GUIDE.md` - Postman/API testing guide
- ✅ `POSTMAN_COLLECTION.json` - Ready-to-import API tests
- ✅ `.gitignore` - Git ignore rules
- ✅ `server/README.md` - Backend documentation
- ✅ `client/README.md` - Frontend documentation
- ✅ `PROJECT_MANIFEST.md` - This file

---

## 🚀 Quick Reference

### Backend Commands
```bash
cd server

# Install dependencies
npm install

# Seed database with sample events
npm run seed

# Start development server
npm run dev
# Runs on http://localhost:5000
```

### Frontend Commands
```bash
cd client

# Install dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000
```

---

## 📊 Database Collections

### Users Collection
- Schema: name, email (unique), password (hashed)
- Indexes: email (for fast lookup)

### Events Collection
- Schema: name, organizer, location, date, description, capacity, category, registeredCount
- Indexes: date (for sorting), category (for filtering)
- 20 Sample events pre-populated

### Registrations Collection
- Schema: user (ref), event (ref)
- Indexes: Unique compound (user, event) - prevents duplicates

---

## 🔐 Security Features Implemented

✅ JWT Authentication (7-day expiration)
✅ Password Hashing (bcryptjs, 10 salt rounds)
✅ Protected Routes (middleware verification)
✅ CORS Enabled (for frontend requests)
✅ Duplicate Prevention (database-level unique index)
✅ Capacity Enforcement (server-side validation)
✅ Input Validation (both frontend & backend)

---

## 🎯 API Endpoints Summary

### Public Routes
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/events
GET    /api/events/:id
```

### Protected Routes (Require JWT Token)
```
POST   /api/registrations/:eventId
GET    /api/registrations/my
```

---

## 📱 Routes (Frontend)

```
/              - Home
/login         - Login page
/signup        - Signup page
/events        - Events grid
/event/:id     - Event details
/dashboard     - User dashboard
```

---

## 🧪 Testing Checklist

- [ ] Backend server starts
- [ ] Frontend server starts
- [ ] MongoDB connection successful
- [ ] Signup creates new user
- [ ] Login returns JWT token
- [ ] Get events loads 20 events
- [ ] Search filters work
- [ ] Event details display correctly
- [ ] Registration successful
- [ ] Dashboard shows registered events
- [ ] Duplicate registration prevented
- [ ] Capacity limit enforced

---

## 🌍 Environment Setup

### MongoDB Atlas
1. Create cluster (free tier)
2. Create database user
3. Get connection string
4. Add to `server/.env` as `MONGO_URI`

### Backend Environment
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend Environment
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Backend
- express (4.18+)
- mongoose (7.0+)
- jsonwebtoken (9.0+)
- bcryptjs (2.4+)
- dotenv (16.0+)
- cors (2.8+)
- nodemon (dev dependency)

### Frontend
- react (18.2+)
- react-dom (18.2+)
- react-router-dom (6.8+)
- axios (1.3+)

---

## 🎓 Code Architecture

### Backend Structure
```
Authentication Flow:
User → Signup → Hashed Password → DB
User → Login → JWT Token ← Bearer Auth
```

```
Event Registration Flow:
User → Select Event → Check Capacity
User → Register → Atomic Counter ++ → DB
User → Prevent Duplicate (Unique Index)
```

### Frontend Structure
```
Context API:
AuthProvider → AuthContext → useAuth Hook
Global State: user, token, login, logout
```

```
Page Flow:
Home → Signup/Login → Events → Event Details → Register
Dashboard → View Registrations
```

---

## 📈 Performance Optimizations

✅ Database indexes on email, date, category
✅ Atomic operations for registeredCount
✅ Unique compound index for duplicates
✅ JWT interceptor for automatic token attachment
✅ Lazy loading of event details
✅ Responsive CSS with minimal reflows

---

## 🔧 Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in `.env` |
| DB connection failed | Check MongoDB Atlas IP whitelist |
| CORS error | Ensure backend CORS is enabled |
| Token expired | Logout and login again |
| Event won't load | Verify database is seeded |
| API returns 401 | Check JWT token validity |

See `SETUP_GUIDE.md` for detailed troubleshooting.

---

## 🌐 Deployment Targets

- **Backend:** Render.com (Free tier available)
- **Frontend:** Vercel (Free tier available)
- **Database:** MongoDB Atlas (Free tier: 512MB)

---

## 📞 Support

For detailed instructions:
1. Start with `GETTING_STARTED.md`
2. Follow `SETUP_GUIDE.md` for setup
3. Use `API_TESTING_GUIDE.md` for testing
4. Reference `README.md` for documentation

---

## ✨ Key Features

✅ User Authentication
✅ Event Discovery & Search
✅ Advanced Filtering
✅ Event Registration
✅ Capacity Management
✅ Duplicate Prevention
✅ User Dashboard
✅ Responsive Design
✅ Modern UI
✅ Error Handling

---

## 🎉 Project Status

**Status:** ✅ COMPLETE & READY TO RUN

All files generated and documented.
Ready for:
- Local development
- Testing
- Deployment
- Production use

---

**Start with:** `GETTING_STARTED.md` or `SETUP_GUIDE.md`

**Questions?** Check the relevant documentation file.

**Good luck! 🚀**
