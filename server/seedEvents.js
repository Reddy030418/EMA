const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('./models/Event');

const createSampleEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Sample events
    const events = [
      {
        name: 'React Advanced Workshop',
        organizer: 'Tech Academy',
        location: 'Hyderabad',
        date: new Date('2026-03-15T10:00:00Z'),
        description: 'Learn advanced React concepts including hooks, context API, and performance optimization.',
        capacity: 50,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Web Development Bootcamp',
        organizer: 'Code Academy',
        location: 'Bangalore',
        date: new Date('2026-04-08T14:00:00Z'),
        description: 'Comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
        capacity: 30,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Advanced JavaScript Masterclass',
        organizer: 'JavaScript Pro',
        location: 'Chennai',
        date: new Date('2026-05-22T09:00:00Z'),
        description: 'Deep dive into JavaScript ES6+, async/await, promises, and modern patterns.',
        capacity: 25,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'UX/UI Design Workshop',
        organizer: 'Design Masters',
        location: 'Hyderabad',
        date: new Date('2026-03-20T11:00:00Z'),
        description: 'Learn modern UX/UI design principles, tools like Figma, and user research methods.',
        capacity: 40,
        registeredCount: 0,
        category: 'Design'
      },
      {
        name: 'Product Launch Strategy',
        organizer: 'Business Innovators',
        location: 'Mumbai',
        date: new Date('2026-06-10T10:00:00Z'),
        description: 'Master the strategies for launching successful products in competitive markets.',
        capacity: 35,
        registeredCount: 0,
        category: 'Business'
      },
      {
        name: 'Digital Marketing Bootcamp',
        organizer: 'Marketing Experts',
        location: 'Delhi',
        date: new Date('2026-04-18T13:00:00Z'),
        description: 'Learn SEO, SEM, social media marketing, analytics, and conversion optimization.',
        capacity: 45,
        registeredCount: 0,
        category: 'Marketing'
      },
      {
        name: 'AI and Machine Learning',
        organizer: 'AI Institute',
        location: 'Bangalore',
        date: new Date('2026-07-12T10:00:00Z'),
        description: 'Introduction to machine learning, neural networks, and practical AI applications.',
        capacity: 28,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Community Networking Event',
        organizer: 'Tech Community',
        location: 'Kerala',
        date: new Date('2026-05-30T18:00:00Z'),
        description: 'Meet local tech professionals, share ideas, and build meaningful connections.',
        capacity: 100,
        registeredCount: 0,
        category: 'Community'
      },
      {
        name: 'Node.js Backend Development',
        organizer: 'Backend Masters',
        location: 'Pune',
        date: new Date('2026-04-05T09:00:00Z'),
        description: 'Build scalable backend applications with Node.js, Express, and databases.',
        capacity: 32,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'GraphQL for Modern APIs',
        organizer: 'API Experts',
        location: 'Gurgaon',
        date: new Date('2026-08-14T14:00:00Z'),
        description: 'Learn GraphQL, build efficient APIs, and manage complex data requirements.',
        capacity: 22,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'MongoDB Database Mastery',
        organizer: 'DB Professionals',
        location: 'Jaipur',
        date: new Date('2026-06-25T10:00:00Z'),
        description: 'Master MongoDB including indexing, replication, sharding, and optimization.',
        capacity: 24,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Docker & Kubernetes',
        organizer: 'DevOps Academy',
        location: 'Mumbai',
        date: new Date('2026-09-05T11:00:00Z'),
        description: 'Containerization with Docker and orchestration with Kubernetes.',
        capacity: 26,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Business Strategy & Growth',
        organizer: 'Business Coaching',
        location: 'Kolkata',
        date: new Date('2026-07-20T09:00:00Z'),
        description: 'Strategic planning for business growth, market analysis, and competitive advantage.',
        capacity: 30,
        registeredCount: 0,
        category: 'Business'
      },
      {
        name: 'Social Media Marketing',
        organizer: 'Marketing Experts',
        location: 'Pune',
        date: new Date('2026-08-03T15:00:00Z'),
        description: 'Strategies for Instagram, TikTok, LinkedIn, and building engaged communities.',
        capacity: 40,
        registeredCount: 0,
        category: 'Marketing'
      },
      {
        name: 'Web Design Fundamentals',
        organizer: 'Design Academy',
        location: 'Chennai',
        date: new Date('2026-05-18T10:00:00Z'),
        description: 'Learn design principles, color theory, typography, and creating beautiful websites.',
        capacity: 35,
        registeredCount: 0,
        category: 'Design'
      },
      {
        name: 'Introduction to Python',
        organizer: 'Learning Hub',
        location: 'Bangalore',
        date: new Date('2026-10-12T10:00:00Z'),
        description: 'Beginner-friendly introduction to Python programming.',
        capacity: 50,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'React Native Mobile Development',
        organizer: 'Mobile Academy',
        location: 'Hyderabad',
        date: new Date('2026-09-18T10:00:00Z'),
        description: 'Build cross-platform mobile apps with React Native.',
        capacity: 28,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Full Stack Development Path',
        organizer: 'Code Bootcamp',
        location: 'Delhi',
        date: new Date('2026-11-02T09:00:00Z'),
        description: 'Complete path from frontend to backend covering all modern technologies.',
        capacity: 25,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Cloud Computing with AWS',
        organizer: 'Cloud Experts',
        location: 'Gurgaon',
        date: new Date('2026-06-15T11:00:00Z'),
        description: 'Learn AWS services, cloud architecture, and scalable infrastructure.',
        capacity: 30,
        registeredCount: 0,
        category: 'Technology'
      },
      {
        name: 'Startup Funding & Pitching',
        organizer: 'Startup Mentors',
        location: 'Bangalore',
        date: new Date('2026-12-08T14:00:00Z'),
        description: 'Learn how to pitch your startup and secure funding from investors.',
        capacity: 40,
        registeredCount: 0,
        category: 'Business'
      }
    ];

    // Create events
    const createdEvents = await Event.insertMany(events);
    console.log(`✓ Created ${createdEvents.length} sample events\n`);

    console.log('=== SAMPLE EVENTS CREATED ===\n');
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   Location: ${event.location}`);
      console.log(`   Category: ${event.category}`);
      console.log(`   Capacity: ${event.capacity}`);
      console.log(`   Date: ${event.date.toLocaleDateString()}\n`);
    });

    console.log('✅ Sample events seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createSampleEvents();
