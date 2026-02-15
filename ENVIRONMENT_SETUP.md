# API Routes Configuration

## Setting Up Environment Variables in Vercel

Your serverless functions require two environment variables to be configured in your Vercel project settings:

### Required Environment Variables:

1. **MONGO_URI** - Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/bellcorp?retryWrites=true&w=majority`
   - Where to get it:
     - Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
     - Create a cluster or use existing one
     - Click "Connect" → "Drivers" → Copy the connection string
     - Replace `<username>`, `<password>`, and `<password>` with your actual credentials

2. **JWT_SECRET** - Your JWT secret key for authentication
   - Can be any random string (minimum 32 characters recommended)
   - Example: `your-super-secret-jwt-key-min-32-characters-long`

### How to Add Environment Variables to Vercel:

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your project (EMA)
3. Click **Settings** → **Environment Variables**
4. Add two new environment variables:
   - Name: `MONGO_URI`, Value: `mongodb+srv://...`
   - Name: `JWT_SECRET`, Value: `your-secret-key`
5. Click **Save**
6. Trigger a redeployment by pushing a commit or manually redeploy from Vercel dashboard

### API Endpoints Available:

- **Auth**: `POST /api/auth` (handles both signup with `fullName` and login)
- **Events**: `GET /api/events`, `POST /api/events`
- **Event Details**: `GET /api/events/{id}`
- **Registrations**: `GET /api/registrations`, `POST /api/registrations`, `DELETE /api/registrations`

### Testing Locally:

To test locally before deploying, install dependencies and create a `.env` file:

```bash
npm install
```

Create `.env.local` in root directory:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bellcorp
JWT_SECRET=your-secret-key
```

Then run Vercel Dev:
```bash
vercel dev
```

This will run your project locally with the same structure as production.
