import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    const jwtSecret = process.env.JWT_SECRET;

    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        MONGO_URI_SET: !!mongoUri,
        JWT_SECRET_SET: !!jwtSecret,
        NODE_ENV: process.env.NODE_ENV || 'production'
      },
      api_routes: {
        auth: 'POST /api/auth (signup with fullName or login)',
        events: 'GET /api/events, POST /api/events',
        event_details: 'GET /api/events/[id]',
        registrations: 'GET|POST|DELETE /api/registrations'
      }
    };

    // Check for missing env vars
    if (!mongoUri || !jwtSecret) {
      return res.status(500).json({
        status: 'error',
        message: 'Missing required environment variables',
        missing_vars: {
          MONGO_URI: !mongoUri,
          JWT_SECRET: !jwtSecret
        },
        instructions: 'Set MONGO_URI and JWT_SECRET in Vercel project settings: Settings → Environment Variables',
        ...status
      });
    }

    return res.json(status);
  } catch (error: any) {
    return res.status(500).json({
      message: 'Health check failed',
      error: error.message
    });
  }
};
