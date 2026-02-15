# 🎫 Bellcorp Event Management Application

**A full-stack MERN application for discovering, viewing, and managing event registrations.**

![Status](https://img.shields.io/badge/Status-Ready-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square)

## 📸 Features Overview

✨ **User Authentication**
- Secure signup and login with JWT tokens
- Password hashing with bcryptjs
- Protected routes and API endpoints

🔍 **Event Discovery**
- Browse extensive event catalog
- Real-time search functionality
- Filter by category and location
- View event details and availability

🎫 **Event Registration**
- One-click event registration
- Capacity validation and management
- Duplicate registration prevention (database level)
- Real-time availability updates

📊 **User Dashboard**
- View all registered events
- Separate upcoming and past events
- Registration statistics
- Event management

🎨 **Modern UI/UX**
- Responsive design (mobile-friendly)
- Beautiful gradient interfaces
- Smooth animations and transitions
- Intuitive navigation

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework (v4.18+)
- **MongoDB** - NoSQL database with Atlas
- **Mongoose** - MongoDB ODM (v7.0+)
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library (v18.2+)
- **React Router** - Client-side routing (v6.8+)
- **Axios** - HTTP client (v1.3+)
- **Context API** - State management
- **CSS3** - Modern styling with gradients and animations

### DevOps & Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database
- **Git/GitHub** - Version control

## 📋 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- MongoDB Atlas account (free)
- Git

### 1. Clone/Navigate to Project
```bash
cd Bellcorp
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Configure .env file (see SETUP_GUIDE.md)
# Add: MONGO_URI, JWT_SECRET, PORT

# Seed database with sample events
npm run seed

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup (New Terminal)
```bash
cd client

# Install dependencies
npm install

# Configure .env file
# Add: REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

Frontend opens on `http://localhost:3000`

## 📖 Documentation

- [**SETUP_GUIDE.md**](./SETUP_GUIDE.md) - Detailed setup instructions for MongoDB, backend, and frontend
- [**README.md**](./README.md) - Comprehensive project documentation
- [**server/README.md**](./server/README.md) - Backend-specific documentation (coming soon)
- [**client/README.md**](./client/README.md) - Frontend-specific documentation

## 🚀 API Endpoints

### Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login with credentials

### Events (Public)
- `GET /events` - Get all events (supports search & filters)
- `GET /events/:id` - Get event details

### Registrations (Protected)
- `POST /registrations/:eventId` - Register for an event
- `GET /registrations/my` - Get user's registrations

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed API documentation.

## 📁 Project Structure

```
Bellcorp/
├── server/                          # Backend (Node.js + Express)
│   ├── config/db.js                # MongoDB connection
│   ├── controllers/                # Business logic
│   ├── middleware/                 # Auth middleware
│   ├── models/                     # MongoDB schemas
│   ├── routes/                     # API endpoints
│   ├── seed.js                     # Sample data
│   ├── server.js                   # Entry point
│   ├── package.json
│   └── .env
│
├── client/                          # Frontend (React)
│   ├── public/                     # Static files
│   ├── src/
│   │   ├── api/                    # API calls
│   │   ├── components/             # Reusable components
│   │   ├── context/                # Auth context
│   │   ├── hooks/                  # Custom hooks
│   │   ├── pages/                  # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── SETUP_GUIDE.md                  # Complete setup instructions
├── POSTMAN_COLLECTION.json         # API testing collection
├── .gitignore
└── README.md                        # This file
```

## 🧪 Testing

### Using Postman
1. Import `POSTMAN_COLLECTION.json` into Postman
2. Configure variables for JWT token after signup/login
3. Test all endpoints manually

### Manual Testing Flow
1. Sign up with new credentials
2. Login to get JWT token
3. Browse events with search/filters
4. Register for an event
5. Check dashboard for registrations

## 🌐 Deployment

### Deploy Backend (Render.com)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

[Detailed instructions in SETUP_GUIDE.md](./SETUP_GUIDE.md#phase-5-deployment)

### Deploy Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set `REACT_APP_API_URL` environment variable
3. Deploy

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Protected API routes with middleware
- ✅ Duplicate prevention at database level (unique compound index)
- ✅ CORS enabled for frontend
- ✅ Input validation on both frontend and backend
- ✅ Capacity enforcement server-side (never trust client)

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed, not selected),
  timestamps: true
}
```

### Event Model
```javascript
{
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  category: String,
  registeredCount: Number,
  timestamps: true
}
```

### Registration Model
```javascript
{
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  timestamps: true
  // Unique compound index on (user, event)
}
```

## 🎓 Key Implementation Details

### Authentication Flow
1. User signs up → Password hashed → Stored in DB
2. User logs in → Credentials verified → JWT token generated
3. Token stored in localStorage → Sent with each API request
4. Middleware verifies token → Allows/denies access

### Registration Logic
- Check if event exists
- Check remaining capacity
- Create registration document
- Increment registeredCount atomically
- Prevent duplicates with database index

### Search & Filter
- MongoDB regex for text search (name & description)
- Query parameters for category and location filtering
- Case-insensitive search
- Sorted by date ascending

## 🐛 Troubleshooting

### Backend Issues
- Port 5000 already in use? → Change PORT in .env
- MongoDB connection failed? → Check MongoDB Atlas whitelist and URI
- CORS error? → Verify frontend URL in backend CORS config

### Frontend Issues
- API calls fail? → Check backend is running and API_URL is correct
- Login doesn't work? → Check browser console for errors
- Events won't load? → Verify database is seeded with `npm run seed`

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#-troubleshooting) for detailed troubleshooting.

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bellcorp-events
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Future Enhancements

- 🔔 Email notifications for event reminders
- 💬 User comments and reviews on events
- ⭐ Event ratings and recommendations
- 👥 Social sharing features
- 📱 Mobile app (React Native)
- 🎨 Advanced theming and customization
- 📈 Analytics dashboard for organizers
- 🔐 Two-factor authentication
- 💳 Payment integration for paid events
- 📸 Event image uploads

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

## 🎉 Ready to Get Started?

1. **Read** [SETUP_GUIDE.md](./SETUP_GUIDE.md) for step-by-step instructions
2. **Setup** MongoDB Atlas
3. **Install** backend and frontend dependencies
4. **Run** both servers
5. **Test** the application
6. **Deploy** to production (optional)

**Happy coding! 🚀**

---

<div align="center">

Made with ❤️ by Bellcorp

[GitHub](https://github.com) | [Issues](https://github.com/issues) | [Discussions](https://github.com/discussions)

</div>
