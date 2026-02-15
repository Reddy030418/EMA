import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { VercelRequest, VercelResponse } from '@vercel/node';

// MongoDB connection cache
let cachedConnection: any = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 1,
  });
  cachedConnection = connection;
  return connection;
}

// Schemas
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

const authenticateToken = (req: VercelRequest) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
};

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
    // GET events with filters
    if (req.method === 'GET') {
      const { search, category, location, page = 1 } = req.query;
      const limit = 10;
      const skip = (parseInt(page as string) - 1) * limit;

      const filter: any = {};
      if (search) filter.name = { $regex: search, $options: 'i' };
      if (category && category !== '') filter.category = category;
      if (location && location !== '') filter.location = location;

      const events = await Event.find(filter).skip(skip).limit(limit);
      const totalEvents = await Event.countDocuments(filter);
      const totalPages = Math.ceil(totalEvents / limit);

      return res.json({ events, page: parseInt(page as string), totalPages, totalEvents });
    }

    // POST - Create event
    if (req.method === 'POST') {
      const user = authenticateToken(req);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { name, description, date, location, category, organizer, capacity } = req.body;

      if (!name || !description || !date || !location || !category || !organizer || !capacity) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const event = new Event({ name, description, date, location, category, organizer, capacity });
      await event.save();

      return res.status(201).json({ message: 'Event created successfully', event });
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (error) {
    console.error('Events error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
