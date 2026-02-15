# Complete API Reference & Testing Guide

## API Base URL

**Development:** `http://localhost:5000/api`
**Production:** Configure in `client/src/api/axios.js`

---

## Authentication Endpoints

### 1. User Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- 400: Email already in use
- 400: Missing required fields

---

### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- 401: Invalid email or password
- 400: Missing email or password

---

## Event Endpoints

### 3. Get All Events (with Pagination & Filters)
```http
GET /events?search=tech&category=Technology&location=San%20Francisco&page=2
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| search | string | Yes | Search in event name/description (case-insensitive) |
| category | string | Yes | Filter by event category |
| location | string | Yes | Filter by event location |
| page | number | Yes | Page number (default: 1, 8 events per page) |

**Response (200):**
```json
{
  "events": [
    {
      "_id": "609c1f6cf7d7b4a8f8c1e0a1",
      "name": "React Workshop",
      "organizer": "Tech Academy",
      "location": "San Francisco",
      "date": "2024-12-25T10:00:00Z",
      "description": "Learn React fundamentals...",
      "capacity": 50,
      "registeredCount": 32,
      "category": "Technology",
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "page": 2,
  "totalPages": 5,
  "totalEvents": 40
}
```

**Examples:**

Get first page of all events:
```bash
GET /events
```

Search for technology events:
```bash
GET /events?search=tech&category=Technology
```

Get San Francisco events on page 3:
```bash
GET /events?location=San%20Francisco&page=3
```

---

### 4. Get Single Event Details
```http
GET /events/{eventId}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "609c1f6cf7d7b4a8f8c1e0a1",
  "name": "React Workshop",
  "organizer": "Tech Academy",
  "location": "San Francisco",
  "date": "2024-12-25T10:00:00Z",
  "description": "Learn React fundamentals with expert instructors...",
  "capacity": 50,
  "registeredCount": 32,
  "category": "Technology",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Error Responses:**
- 404: Event not found

---

## Registration Endpoints

### 5. Register for Event ⭐
```http
POST /registrations/{eventId}
Authorization: Bearer {token}
```

**Response (201):**
```json
{
  "message": "Registered successfully"
}
```

**Error Responses:**
- 400: "Event full"
- 400: "Already registered"
- 404: Event not found
- 401: Missing or invalid token

---

### 6. Cancel Event Registration ✨ NEW
```http
DELETE /registrations/{eventId}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Registration cancelled successfully"
}
```

**Error Responses:**
- 404: Registration not found
- 500: Error cancelling registration
- 401: Missing or invalid token

---

### 7. Get User's Registrations
```http
GET /registrations/my
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "_id": "609c1f6cf7d7b4a8f8c1e0a1",
    "user": "507f1f77bcf86cd799439011",
    "event": {
      "_id": "609c1f6cf7d7b4a8f8c1e0a2",
      "name": "React Workshop",
      "organizer": "Tech Academy",
      "location": "San Francisco",
      "date": "2024-12-25T10:00:00Z",
      "description": "Learn React fundamentals...",
      "capacity": 50,
      "registeredCount": 32,
      "category": "Technology"
    },
    "createdAt": "2024-01-10T14:30:00Z"
  }
]
```

**Error Responses:**
- 401: Missing or invalid token

---

## Testing with cURL

### 1. Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

*Save the returned `token` for subsequent requests*

### 3. Get Events with Pagination
```bash
curl -X GET "http://localhost:5000/api/events?page=1&category=Technology" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Register for Event
```bash
curl -X POST http://localhost:5000/api/registrations/609c1f6cf7d7b4a8f8c1e0a2 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Cancel Registration ✨
```bash
curl -X DELETE http://localhost:5000/api/registrations/609c1f6cf7d7b4a8f8c1e0a2 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Get My Registrations
```bash
curl -X GET http://localhost:5000/api/registrations/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing with Postman

### Setup

1. **Create Environment Variables:**
   - Token: `{{token}}`
   - Base URL: `{{base_url}}` = `http://localhost:5000/api`

2. **Import Collection:**
   - Use `POSTMAN_COLLECTION.json` from project root
   - Or manually create requests below

### Collection Folder Structure

```
Bellcorp Event Management
├── Authentication
│   ├── Signup
│   └── Login
├── Events
│   ├── Get All Events
│   ├── Get Single Event
│   └── Search Events (with pagination)
├── Registrations
│   ├── Register for Event
│   ├── Cancel Registration ✨
│   └── Get My Registrations
└── Error Cases
    ├── Duplicate Registration
    ├── Event Full
    └── Unauthorized Access
```

### Request Templates

**Signup**
```
POST {{base_url}}/auth/signup
Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test123"
}
```

**Login**
```
POST {{base_url}}/auth/login
Body:
{
  "email": "test@example.com",
  "password": "Test123"
}
Postman Test:
pm.environment.set("token", pm.response.json().token);
```

**Get Events with Filters**
```
GET {{base_url}}/events?search=tech&category=Technology&page=1
Headers:
Authorization: Bearer {{token}}
```

**Register for Event**
```
POST {{base_url}}/registrations/{eventId}
Headers:
Authorization: Bearer {{token}}
```

**Cancel Registration** ✨
```
DELETE {{base_url}}/registrations/{eventId}
Headers:
Authorization: Bearer {{token}}
Postman Test:
pm.test("Registration cancelled", function() {
  pm.response.to.have.status(200);
  pm.expect(pm.response.json().message).to.include("cancelled");
});
```

**Get My Registrations**
```
GET {{base_url}}/registrations/my
Headers:
Authorization: Bearer {{token}}
```

---

## Frontend Integration

### Using Endpoints in React

```javascript
import { 
  signup, 
  login, 
  getEvents, 
  getEventById, 
  registerForEvent, 
  cancelRegistration,    // ✨ NEW
  getMyRegistrations 
} from '../api/endpoints';

// Signup
await signup({ name, email, password });

// Login
const { token, user } = await login({ email, password });

// Get events with filters
const { data } = await getEvents({ 
  search: 'tech',
  category: 'Technology',
  location: 'San Francisco',
  page: 2 
});

// Register for event
await registerForEvent(eventId);

// Cancel registration ✨
await cancelRegistration(eventId);

// Get user's registrations
const registrations = await getMyRegistrations();
```

---

## HTTP Status Codes

| Code | Meaning | Typical Scenario |
|------|---------|------------------|
| 200 | OK | Successful GET, DELETE |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Invalid data, event full, already registered |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Event/registration doesn't exist |
| 500 | Server Error | Database error, server crash |

---

## Authentication & Security

### JWT Token
- **Format:** Bearer token in Authorization header
- **Expiration:** 7 days
- **Storage:** localStorage (frontend)
- **Included in:** All protected endpoints automatically via axios interceptor

### Password
- **Hashing:** bcryptjs with 10 salt rounds
- **Storage:** Never logged or transmitted
- **Transmission:** HTTPS only in production

### CORS
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Production:** Configure in `server/server.js`

---

## Database Queries Behind Each Endpoint

### Get Events Query
```javascript
// Builds dynamic query based on filters
db.events.find({
  name: { $regex: search, $options: 'i' },    // Case-insensitive
  category: filterCategory,
  location: filterLocation
})
.sort({ date: 1 })
.skip((page - 1) * 8)
.limit(8)
```

### Register Query
```javascript
// Atomic increment on successful registration
db.events.updateOne(
  { _id: eventId },
  { $inc: { registeredCount: 1 } }  // Atomic operation
)
```

### Cancel Query
```javascript
// Atomic decrement on cancellation
db.events.updateOne(
  { _id: eventId },
  { $inc: { registeredCount: -1 } }  // Atomic operation
)
```

---

## Performance Optimization

### Database Indexes
```
User.email (unique)          → Fast login lookup
Event.category              → Fast category filtering
Event.location             → Fast location filtering
Event.date (ascending)      → Fast chronological sorting
Registration (user, event)  → Unique constraint + fast lookup
```

### Pagination Strategy
- **Limit:** 8 events per page (balanced performance)
- **Skip:** (pageNumber - 1) * 8
- **Total Count:** Calculated once per query
- **Pages:** ceil(total / 8)

### Response Caching (Future)
- Implement Redis caching for popular events
- Cache invalidation on registration changes
- 1-hour cache TTL for static event data

---

## Error Handling Examples

### Scenario: User tries to register for full event
```json
{
  "message": "Event full"
}
HTTP Status: 400
```

### Scenario: User tries to register twice
```json
{
  "message": "Already registered"
}
HTTP Status: 400
```

### Scenario: Invalid token
```json
{
  "message": "Invalid or expired token"
}
HTTP Status: 401
```

### Scenario: Event doesn't exist
```json
{
  "message": "Event not found"
}
HTTP Status: 404
```

---

## Quick Testing Workflow

1. **Start Backend**
   ```bash
   cd server && npm start
   ```

2. **Seed Sample Data**
   ```bash
   npm run seed
   ```

3. **Start Frontend**
   ```bash
   cd client && npm start
   ```

4. **Test Flow**
   - Visit http://localhost:3000
   - Sign up with test account
   - Log in
   - Browse events with search/filters/pagination
   - Register for event (check Dashboard)
   - Cancel registration (verify capacity decrements)
   - Check EventDetails page
   - Verify URL maintains query parameters

---

## API Endpoints Summary Table

| Method | Endpoint | Auth | Query Params | Description |
|--------|----------|------|--------------|-------------|
| POST | /auth/signup | ❌ | - | Create new user |
| POST | /auth/login | ❌ | - | Authenticate user |
| GET | /events | ✅ | search, category, location, page | Get events with pagination |
| GET | /events/:id | ✅ | - | Get single event |
| POST | /registrations/:id | ✅ | - | Register for event |
| DELETE | /registrations/:id | ✅ | - | Cancel registration ✨ |
| GET | /registrations/my | ✅ | - | Get user registrations |

✅ = Requires authentication
❌ = No authentication needed
✨ = NEW endpoint (Phase 5)

---

**Last Updated:** Requirements complete
**Documentation Version:** 1.0
**Status:** Production Ready ✅
