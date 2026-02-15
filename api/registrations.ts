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

// Schemas
const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registeredAt: { type: Date, default: Date.now }
});

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

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
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
    const user = authenticateToken(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // GET my registrations - /api/registrations/my
    if (req.method === 'GET' && (req.url.includes('/my') || !req.query.eventId)) {
      const registrations = await Registration.find({ user: user.id }).populate('event');
      return res.json(registrations);
    }

    const eventId = req.query.eventId as string || req.body?.eventId;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // POST - Register for event
    if (req.method === 'POST') {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.registeredCount >= event.capacity) {
        return res.status(400).json({ message: 'Event is full' });
      }

      const existingRegistration = await Registration.findOne({ user: user.id, event: eventId });
      if (existingRegistration) {
        return res.status(400).json({ message: 'Already registered for this event' });
      }

      const registration = new Registration({ user: user.id, event: eventId });
      await registration.save();

      event.registeredCount += 1;
      await event.save();

      return res.status(201).json({ message: 'Registered successfully', registration });
    }

    // DELETE - Cancel registration
    if (req.method === 'DELETE') {
      const registration = await Registration.findOne({ user: user.id, event: eventId });
      if (!registration) {
        return res.status(404).json({ message: 'Registration not found' });
      }

      await Registration.deleteOne({ _id: registration._id });

      const event = await Event.findById(eventId);
      if (event) {
        event.registeredCount = Math.max(0, event.registeredCount - 1);
        await event.save();
      }

      return res.json({ message: 'Registration cancelled' });
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (error: any) {
    console.error('Registrations error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
