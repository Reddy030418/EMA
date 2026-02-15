const mongoose = require('mongoose');
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const User = require('./models/User');

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Sample test users
    const testUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123'
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: 'password123'
      },
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123'
      }
    ];

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create and hash passwords
    for (let user of testUsers) {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      await User.create(user);
      console.log(`✓ Created: ${user.email}`);
    }

    console.log('\n✅ Test users created successfully!\n');
    console.log('=== LOGIN CREDENTIALS ===');
    testUsers.forEach(user => {
      console.log(`
Email: ${user.email}
Password: ${user.password === 'password123' ? 'password123' : 'demo123'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createTestUsers();
