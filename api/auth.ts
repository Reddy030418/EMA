import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
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

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'organizer'], default: 'user' }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

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
    if (req.method === 'POST') {
      const { fullName, email, password, role } = req.body;

      // Signup endpoint
      if (fullName) {
        if (!email || !password) {
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

        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        return res.status(201).json({
          message: 'User created successfully',
          token,
          user: { id: user._id, fullName, email, role: user.role }
        });
      }

      // Login endpoint
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

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
      });
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (error: any) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
