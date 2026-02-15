# Bellcorp Event Management Application

A full-stack MERN application for discovering, viewing, and managing event registrations.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)

## ✨ Features

- **User Authentication**: Signup and login with JWT tokens
- **Event Discovery**: Browse and search events with filters
- **Event Registration**: Register for events with capacity management
- **User Dashboard**: View upcoming and past events
- **Real-time Search**: Search events by name, description, category, and location
- **Duplicate Prevention**: Cannot register twice for the same event
- **Capacity Management**: Automatic capacity checks prevent overbooking

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API/Redux** - State management
- **Tailwind CSS** - Styling (recommended)

## 📁 Project Structure

```
Bellcorp/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (signup/login)
│   │   ├── eventController.js    # Event fetching
│   │   └── registrationController.js  # Registration logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Event.js              # Event schema
│   │   └── Registration.js       # Registration schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── eventRoutes.js        # Event endpoints
│   │   └── registrationRoutes.js # Registration endpoints
│   ├── seed.js                   # Mock data generator
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   ├── context/              # Auth context
│   │   ├── api/                  # API calls
│   │   └── App.js                # Main app component
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone/Navigate to the repository**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (see Environment Setup below)

4. **Seed the database with mock events**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

## 🔐 Environment Setup

### Backend `.env` file

1. **Get MongoDB Atlas URI**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Click "Connect" and copy the connection string
   - Replace `<username>`, `<password>`, and `<cluster>` with your details

2. **Create `.env` file in server folder**:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bellcorp-events
   JWT_SECRET=your_super_secret_key_change_this_in_production
   ```

3. **Generate a strong JWT_SECRET** (optional but recommended):
   ```bash
   # In Node.js console
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## 🎯 Running the Application

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```
Output: `Server running on port 5000`

### Terminal 2: Start Frontend (after setup)
```bash
cd client
npm start
```
Output: Opens on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Signup
```bash
POST /api/auth/signup
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
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Event Routes (`/api/events`)

#### Get All Events (with filtering)
```bash
GET /api/events?search=tech&category=Technology&location=New York

Response (200):
[
  {
    "_id": "eventId",
    "name": "Tech Conference 2026",
    "organizer": "Tech Org",
    "location": "San Francisco",
    "date": "2026-03-15T00:00:00.000Z",
    "description": "Annual tech conference",
    "capacity": 500,
    "category": "Technology",
    "registeredCount": 45
  }
]
```

#### Get Event By ID
```bash
GET /api/events/:eventId

Response (200):
{
  "_id": "eventId",
  "name": "Tech Conference 2026",
  "organizer": "Tech Org",
  ...
}
```

### Registration Routes (`/api/registrations`)

#### Register for Event (Protected)
```bash
POST /api/registrations/:eventId
Authorization: Bearer <token>
Content-Type: application/json

Response (201):
{
  "message": "Registered successfully"
}
```

#### Get My Registrations (Protected)
```bash
GET /api/registrations/my
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "registrationId",
    "user": "userId",
    "event": {
      "_id": "eventId",
      "name": "Tech Conference 2026",
      ...
    },
    "createdAt": "2026-02-14T10:00:00.000Z"
  }
]
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, indexed),
  password: String (required, hashed, not selected by default),
  timestamps: true
}
```

### Event Model
```javascript
{
  _id: ObjectId,
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  category: String,
  registeredCount: Number (default: 0),
  timestamps: true
}
```

### Registration Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  timestamps: true
}
// Compound unique index on (user, event) prevents duplicate registrations
```

## 🧪 Testing with Postman

1. **Download Postman** from https://www.postman.com/downloads/

2. **Create a new collection** called "Bellcorp Events"

3. **Test Auth Endpoints**:
   - Create a POST request to `http://localhost:5000/api/auth/signup`
   - Add body (raw JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Send and save the returned `token`

4. **Test Event Endpoints**:
   - Create a GET request to `http://localhost:5000/api/events`
   - Add query parameters: `?search=tech&category=Technology`

5. **Test Registration (Protected)**:
   - Create a POST request to `http://localhost:5000/api/registrations/:eventId`
   - Go to "Authorization" tab
   - Select "Bearer Token"
   - Paste your JWT token
   - Send request

## 🌐 Deployment

### Backend Deployment (Render.com)

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repository
5. Set environment variables in Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
6. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.render.com`
5. Deploy

## 🎥 Demo Flow

The application demonstrates:
1. **User Registration**: New users can create accounts with email verification
2. **Authentication**: Login returns JWT token for protected routes
3. **Event Discovery**: Search and filter events dynamically
4. **Event Registration**: Register for events with capacity validation
5. **Dashboard**: View upcoming and past registrations

## 📝 Notes

- JWT tokens expire in 7 days
- Passwords are hashed using bcryptjs with salt rounds: 10
- Duplicate registrations are prevented at database level (unique compound index)
- Capacity is enforced server-side during registration
- CORS is enabled for frontend requests

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License

---

**Ready to start?** Run `npm install` in the server folder and `npm run dev` to launch the backend!
