# Vercel Deployment Guide

## Project Setup for Vercel

This project is configured to run on Vercel with a React frontend and serverless backend functions.

## Directory Structure

```
.
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── api/                     # Vercel serverless functions
│   ├── auth.ts             # Authentication (signup/login)
│   ├── events.ts           # Event management
│   ├── events/[id].ts      # Get individual event
│   └── registrations.ts    # Event registrations
├── vercel.json             # Vercel configuration
└── .vercelignore          # Files to ignore during deployment
```

## Deployment Steps

### 1. Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- MongoDB Atlas database (or your MongoDB instance URL)
- JWT secret key

### 2. Create Vercel Project

```bash
vercel
```

This will guide you through connecting your GitHub repository to Vercel.

### 3. Configure Environment Variables

In your Vercel project dashboard, set the following environment variables:

- **MONGO_URI**: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/bellcorp?retryWrites=true&w=majority`

- **JWT_SECRET**: Your JWT secret key for authentication
  - Example: `your-secret-key-here-min-32-chars`

### 4. Deploy

```bash
vercel --prod
```

Or simply push to your main branch if you've enabled auto-deploy.

## API Endpoints

All API endpoints are available under `/api/`:

### Authentication
- `POST /api/auth` - Signup (with `fullName`) or Login (with email & password)

### Events
- `GET /api/events` - Get all events with filters (search, category, location, page)
- `GET /api/events/[id]` - Get event by ID

### Registrations
- `GET /api/registrations` - Get user's registrations (requires auth)
- `POST /api/registrations` - Register for event (requires auth, send eventId in body)
- `DELETE /api/registrations` - Cancel registration (requires auth, send eventId in body)

## Development

### Local Development

Start the Express server (for local development):
```bash
cd server
npm install
npm run dev
```

In another terminal, start the React frontend:
```bash
cd client
npm install
npm start
```

The frontend will connect to `http://localhost:5000/api` by default.

### Vercel Functions Locally

To test Vercel functions locally:

```bash
vercel dev
```

This will run the project locally with the same structure as production.

## Troubleshooting

### CORS Issues
- The API functions have CORS headers configured to accept requests from any origin
- If you encounter CORS issues, check that the `baseURL` in `client/src/api/axios.js` is correct

### MongoDB Connection Issues
- Ensure your `MONGO_URI` environment variable is correctly set
- Check that your MongoDB IP whitelist includes Vercel's IP or is set to `0.0.0.0/0`
- Verify your MongoDB username and password don't contain special characters (or URL-encode them)

### Build Failures
- Ensure `client/package.json` exists and has a `build` script
- Check that all dependencies are listed in `package.json`

## Notes

- The backend is deployed as serverless functions, which means:
  - MongoDB connections are cached per function invocation
  - Functions have a 30-second timeout limit
  - Cold starts may add latency to the first request

- The React frontend is statically generated and served from the Vercel CDN

- For production, ensure:
  - MONGO_URI points to a production database with proper backups
  - JWT_SECRET is a strong, random string
  - Environment variables are not committed to version control
