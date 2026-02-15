# 🧪 Bellcorp API Testing Guide

Complete guide for testing the Bellcorp Event Management API using Postman or Insomnia.

## 📥 Setup

### Option 1: Import Collection
1. Download `POSTMAN_COLLECTION.json`
2. Open Postman
3. Click "Import" → Select file
4. Collection imported!

### Option 2: Manual Setup
Follow the endpoints below and create requests manually.

---

## 🔐 Authentication Endpoints

### 1️⃣ Signup (Create New User)

**Endpoint:** `POST http://localhost:5000/api/auth/signup`

**Headers:**
```http
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "_id": "65c1234567890abcdef12345",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**✅ Save the token for later use!**

---

### 2️⃣ Login (Get Token)

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Headers:**
```http
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "_id": "65c1234567890abcdef12345",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎫 Event Endpoints (Public)

### 3️⃣ Get All Events

**Endpoint:** `GET http://localhost:5000/api/events`

**Headers:** None required

**Query Parameters (Optional):**
- `search` - Search in name and description
- `category` - Filter by category
- `location` - Filter by location

**Examples:**

```http
# Get all events
GET http://localhost:5000/api/events

# Search for tech events
GET http://localhost:5000/api/events?search=tech

# Filter by category
GET http://localhost:5000/api/events?category=Technology

# Filter by location
GET http://localhost:5000/api/events?location=San Francisco

# Combine filters
GET http://localhost:5000/api/events?search=react&category=Technology&location=New York
```

**Expected Response (200):**
```json
[
  {
    "_id": "65c1234567890abcdef12345",
    "name": "Tech Conference 2026",
    "organizer": "Tech Org",
    "location": "San Francisco",
    "date": "2026-03-15T00:00:00.000Z",
    "description": "Annual tech conference featuring industry leaders",
    "capacity": 500,
    "category": "Technology",
    "registeredCount": 45,
    "createdAt": "2026-02-14T10:00:00.000Z",
    "updatedAt": "2026-02-14T10:00:00.000Z"
  },
  {
    "_id": "65c1234567890abcdef12346",
    "name": "React Workshop",
    "organizer": "Dev Academy",
    "location": "New York",
    "date": "2026-02-20T00:00:00.000Z",
    "description": "Hands-on React.js workshop for beginners",
    "capacity": 50,
    "category": "Technology",
    "registeredCount": 12,
    "createdAt": "2026-02-14T10:00:00.000Z",
    "updatedAt": "2026-02-14T10:00:00.000Z"
  }
]
```

---

### 4️⃣ Get Event by ID

**Endpoint:** `GET http://localhost:5000/api/events/:eventId`

**Replace `:eventId` with actual ID**

**Example:**
```http
GET http://localhost:5000/api/events/65c1234567890abcdef12345
```

**Expected Response (200):**
```json
{
  "_id": "65c1234567890abcdef12345",
  "name": "Tech Conference 2026",
  "organizer": "Tech Org",
  "location": "San Francisco",
  "date": "2026-03-15T00:00:00.000Z",
  "description": "Annual tech conference featuring industry leaders",
  "capacity": 500,
  "category": "Technology",
  "registeredCount": 45,
  "createdAt": "2026-02-14T10:00:00.000Z",
  "updatedAt": "2026-02-14T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Event not found"
}
```

---

## 🎟️ Registration Endpoints (Protected)

**⚠️ All registration endpoints require JWT token**

### Setup Token in Postman

1. After signup/login, copy the `token` from response
2. For each request:
   - Go to "Authorization" tab
   - Select "Bearer Token"
   - Paste token in the token field

OR add manually to Headers:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 5️⃣ Register for Event

**Endpoint:** `POST http://localhost:5000/api/registrations/:eventId`

**Headers:**
```http
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

**URL Parameter:**
- `:eventId` - Replace with actual event ID

**Example:**
```http
POST http://localhost:5000/api/registrations/65c1234567890abcdef12345
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** (Empty or empty JSON object)
```json
{}
```

**Expected Response (201):**
```json
{
  "message": "Registered successfully"
}
```

**Error Responses:**

**Event Full (400):**
```json
{
  "message": "Event full"
}
```

**Already Registered (400):**
```json
{
  "message": "Already registered"
}
```

**Event Not Found (404):**
```json
{
  "message": "Event not found"
}
```

**Not Authorized (401):**
```json
{
  "message": "Not authorized"
}
```

---

### 6️⃣ Get My Registrations

**Endpoint:** `GET http://localhost:5000/api/registrations/my`

**Headers:**
```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

**Example:**
```http
GET http://localhost:5000/api/registrations/my
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**
```json
[
  {
    "_id": "65c1234567890abcdef12347",
    "user": "65c1234567890abcdef12345",
    "event": {
      "_id": "65c1234567890abcdef12346",
      "name": "React Workshop",
      "organizer": "Dev Academy",
      "location": "New York",
      "date": "2026-02-20T00:00:00.000Z",
      "description": "Hands-on React.js workshop for beginners",
      "capacity": 50,
      "category": "Technology",
      "registeredCount": 12
    },
    "createdAt": "2026-02-14T15:30:00.000Z",
    "updatedAt": "2026-02-14T15:30:00.000Z"
  },
  {
    "_id": "65c1234567890abcdef12348",
    "user": "65c1234567890abcdef12345",
    "event": {
      "_id": "65c1234567890abcdef12345",
      "name": "Tech Conference 2026",
      "organizer": "Tech Org",
      "location": "San Francisco",
      "date": "2026-03-15T00:00:00.000Z",
      "description": "Annual tech conference featuring industry leaders",
      "capacity": 500,
      "category": "Technology",
      "registeredCount": 45
    },
    "createdAt": "2026-02-14T16:00:00.000Z",
    "updatedAt": "2026-02-14T16:00:00.000Z"
  }
]
```

---

## 🧪 Testing Workflow

### Complete Test Sequence

**Step 1: Clear Previous Data**
- Delete all test users and registrations from database
- Optionally run seed script: `npm run seed`

**Step 2: Create New User**
```
Request: POST /auth/signup
Body: { name, email, password }
✅ Save token from response
```

**Step 3: Get All Events**
```
Request: GET /events
✅ Note down an event ID
```

**Step 4: Search & Filter Events**
```
Request: GET /events?search=tech&category=Technology
✅ Verify filters work
```

**Step 5: Get Event Details**
```
Request: GET /events/:eventId
✅ Check event details and capacity
```

**Step 6: Register for Event**
```
Request: POST /registrations/:eventId
Headers: Authorization: Bearer <token>
✅ Verify registration successful
```

**Step 7: Try Duplicate Registration**
```
Request: POST /registrations/:eventId (same event)
Headers: Authorization: Bearer <token>
✅ Verify error: "Already registered"
```

**Step 8: Get My Registrations**
```
Request: GET /registrations/my
Headers: Authorization: Bearer <token>
✅ See both registered events
```

**Step 9: Test Capacity Limit** (Optional)
```
Request: Register multiple users for same event
✅ After reaching capacity, new registrations fail
```

---

## 🔍 Common Issues & Solutions

### "Not authorized" Error (401)
- **Issue:** Missing or expired token
- **Solution:** Check Bearer token is correct and hasn't expired

### "Already registered" Error (400)
- **Issue:** User already registered for this event
- **Solution:** Register for a different event

### "Event full" Error (400)
- **Issue:** Event capacity reached
- **Solution:** Register for event with available spots

### CORS Error in Frontend
- **Issue:** Frontend can't reach backend
- **Solution:** Ensure backend is running on port 5000

### Connection Refused on :5000
- **Issue:** Backend server not running
- **Solution:** Start backend with `npm run dev` in server folder

---

## 📊 Query Examples

### Search Events
```http
GET http://localhost:5000/api/events?search=bootcamp
```

### Filter by Category
```http
GET http://localhost:5000/api/events?category=Technology
GET http://localhost:5000/api/events?category=Design
GET http://localhost:5000/api/events?category=Business
```

### Filter by Location
```http
GET http://localhost:5000/api/events?location=San Francisco
GET http://localhost:5000/api/events?location=New York
```

### Combined Filters
```http
GET http://localhost:5000/api/events?search=react&category=Technology&location=New York
```

---

## 💡 Pro Tips

1. **Set Authorization Globally** in Postman
   - Collection → Auth → Bearer Token
   - Set once for all requests

2. **Use Environment Variables**
   - Create variable: `token`
   - Use: `{{token}}` in Authorization

3. **Test Error Cases**
   - No token → 401 Not authorized
   - Invalid event ID → 404 Not found
   - Full event → 400 Event full

4. **Monitor Response Times**
   - Look for slow queries
   - Check database indexes

5. **Validate Response Schemas**
   - Check all fields present
   - Verify data types
   - Check timestamps

---

## 📖 Status Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET request successful |
| 201 | Created | User signup/registration created |
| 400 | Bad Request | Already registered, event full |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Event doesn't exist |
| 500 | Server Error | Database connection failed |

---

## 🎯 Next Steps

1. **Test all endpoints** in this guide
2. **Try different queries** with various search parameters
3. **Test error cases** (invalid tokens, missing fields, etc.)
4. **Load test** by registering thousands of users
5. **Deploy** to Render and Vercel when ready

---

Good luck testing! 🧪🚀
