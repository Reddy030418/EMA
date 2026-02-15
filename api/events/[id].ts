import mongoose from 'mongoose';
import { VercelRequest, VercelResponse } from '@vercel/node';

// MongoDB connection cache
let cachedConnection: any = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error(
      'MONGO_URI environment variable is not set. ' +
      'Please configure it in Vercel Settings → Environment Variables. ' +
      'Get your MongoDB connection string from MongoDB Atlas and add it as MONGO_URI.'
    );
  }

  if (!process.env.JWT_SECRET) {
    throw new Error(
      'JWT_SECRET environment variable is not set. ' +
      'Please configure it in Vercel Settings → Environment Variables.'
    );
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 1,
  });
  cachedConnection = connection;
  return connection;
}

// Event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  organizer: { type: String, required: true },
  capacity: { type: Number, required: true },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

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
    await connectDB();
    if (req.method === 'GET') {
      const { id } = req.query;

      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      return res.json(event);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (error: any) {
    console.error('Event details error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
