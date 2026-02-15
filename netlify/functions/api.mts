import mongoose from 'mongoose';
import serverless from 'serverless-http';

// Import models
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'organizer'], default: 'user' }
});

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  organizer: { type: String, required: true },
  capacity: { type: Number, required: true },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

const RegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registeredAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);
const Registration = mongoose.model('Registration', RegistrationSchema);

// MongoDB connection with caching
let cachedConnection: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  const connection = await mongoose.connect(mongoUri);
  cachedConnection = connection;
  return connection;
}

// Import Express and required middleware
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Auth Controller
const signup = async (req: any, res: any) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });

    res.status(201).json({ message: 'User created successfully', token, user: { id: user._id, fullName, email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });

    res.json({ message: 'Login successful', token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Event Controller
const getEvents = async (req: any, res: any) => {
  try {
    const { search, category, location, page = 1 } = req.query;
    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const filter: any = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category && category !== '') filter.category = category;
    if (location && location !== '') filter.location = location;

    const events = await Event.find(filter).skip(skip).limit(limit);
    const totalEvents = await Event.countDocuments(filter);
    const totalPages = Math.ceil(totalEvents / limit);

    res.json({ events, page: parseInt(page), totalPages, totalEvents });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

const getEventById = async (req: any, res: any) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch event', error: error.message });
  }
};

const createEvent = async (req: any, res: any) => {
  try {
    const { name, description, date, location, category, organizer, capacity } = req.body;

    if (!name || !description || !date || !location || !category || !organizer || !capacity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({ name, description, date, location, category, organizer, capacity });
    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

// Registration Controller
const registerForEvent = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    const registration = new Registration({ user: userId, event: eventId });
    await registration.save();

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ message: 'Registered successfully', registration });
  } catch (error: any) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const getMyRegistrations = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const registrations = await Registration.find({ user: userId }).populate('event');
    res.json(registrations);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch registrations', error: error.message });
  }
};

const cancelRegistration = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const registration = await Registration.findOne({ user: userId, event: eventId });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    await Registration.deleteOne({ _id: registration._id });

    const event = await Event.findById(eventId);
    if (event) {
      event.registeredCount = Math.max(0, event.registeredCount - 1);
      await event.save();
    }

    res.json({ message: 'Registration cancelled' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to cancel registration', error: error.message });
  }
};

// Routes
app.use(express.json());

// Auth routes
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);

// Event routes
app.get('/api/events', getEvents);
app.get('/api/events/:id', getEventById);
app.post('/api/events', authenticateToken, createEvent);

// Registration routes
app.get('/api/registrations/my-registrations', authenticateToken, getMyRegistrations);
app.post('/api/registrations/:eventId', authenticateToken, registerForEvent);
app.delete('/api/registrations/:eventId', authenticateToken, cancelRegistration);

// Health check
app.get('/', (req: any, res: any) => {
  res.send("Bellcorp Event API Running");
});

// Connect to database before handling requests
app.use(async (req: any, res: any, next: any) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

export const handler = serverless(app);
