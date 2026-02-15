require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Event = require('./models/Event');

const mockEvents = [
  {
    name: "Tech Conference 2026",
    organizer: "Tech Org",
    location: "Hyderabad",
    date: new Date("2026-03-15"),
    description: "Annual tech conference featuring industry leaders",
    capacity: 500,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "React Workshop",
    organizer: "Dev Academy",
    location: "Bangalore",
    date: new Date("2026-02-20"),
    description: "Hands-on React.js workshop for beginners",
    capacity: 50,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Web Design Summit",
    organizer: "Design Co",
    location: "Chennai",
    date: new Date("2026-04-10"),
    description: "Explore latest web design trends",
    capacity: 200,
    category: "Design",
    registeredCount: 0
  },
  {
    name: "Networking Event",
    organizer: "Business Connect",
    location: "Delhi",
    date: new Date("2026-02-28"),
    description: "Professional networking with tech entrepreneurs",
    capacity: 300,
    category: "Networking",
    registeredCount: 0
  },
  {
    name: "AI & Machine Learning",
    organizer: "AI Institute",
    location: "Pune",
    date: new Date("2026-05-05"),
    description: "Deep dive into AI and machine learning",
    capacity: 100,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Startup Pitch Event",
    organizer: "Venture Fund",
    location: "Gurgaon",
    date: new Date("2026-03-25"),
    description: "Startups pitch to investors",
    capacity: 150,
    category: "Business",
    registeredCount: 0
  },
  {
    name: "UX/UI Masterclass",
    organizer: "Design Masters",
    location: "Jaipur",
    date: new Date("2026-04-01"),
    description: "Master user experience and interface design",
    capacity: 80,
    category: "Design",
    registeredCount: 0
  },
  {
    name: "DevOps Conference",
    organizer: "Cloud Ops",
    location: "Kolkata",
    date: new Date("2026-05-20"),
    description: "Infrastructure, deployment, and DevOps best practices",
    capacity: 250,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Digital Marketing Summit",
    organizer: "Marketing Experts",
    location: "Mumbai",
    date: new Date("2026-06-01"),
    description: "Latest strategies in digital marketing",
    capacity: 350,
    category: "Marketing",
    registeredCount: 0
  },
  {
    name: "Cybersecurity Forum",
    organizer: "Security Labs",
    location: "Kerala",
    date: new Date("2026-04-15"),
    description: "Cybersecurity threats and solutions",
    capacity: 180,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Mobile App Development",
    organizer: "Mobile First",
    location: "Bangalore",
    date: new Date("2026-05-10"),
    description: "Build mobile apps for iOS and Android",
    capacity: 120,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Blockchain Workshop",
    organizer: "Crypto Academy",
    location: "Hyderabad",
    date: new Date("2026-06-05"),
    description: "Understanding blockchain and smart contracts",
    capacity: 90,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Women in Tech",
    organizer: "Tech Sisterhood",
    location: "Chandigarh",
    date: new Date("2026-03-08"),
    description: "Celebrating and supporting women in technology",
    capacity: 200,
    category: "Community",
    registeredCount: 0
  },
  {
    name: "Cloud Computing Expo",
    organizer: "Cloud Solutions",
    location: "Bangalore",
    date: new Date("2026-05-15"),
    description: "Latest cloud technologies and platforms",
    capacity: 400,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Data Science Bootcamp",
    organizer: "Data Academy",
    location: "Pune",
    date: new Date("2026-04-20"),
    description: "Master data science and analytics",
    capacity: 70,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Entrepreneurship Seminar",
    organizer: "Startup Hub",
    location: "Ahmedabad",
    date: new Date("2026-03-30"),
    description: "Learn how to build and scale your business",
    capacity: 160,
    category: "Business",
    registeredCount: 0
  },
  {
    name: "Full Stack Development",
    organizer: "Code Bootcamp",
    location: "Delhi",
    date: new Date("2026-04-25"),
    description: "Complete full stack web development training",
    capacity: 110,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "API Design Best Practices",
    organizer: "Backend Masters",
    location: "Lucknow",
    date: new Date("2026-05-25"),
    description: "Design scalable and secure APIs",
    capacity: 95,
    category: "Technology",
    registeredCount: 0
  },
  {
    name: "Creative Coding Workshop",
    organizer: "Art & Code",
    location: "Indore",
    date: new Date("2026-06-10"),
    description: "Combine art and programming creatively",
    capacity: 85,
    category: "Design",
    registeredCount: 0
  },
  {
    name: "Leadership & Management",
    organizer: "Executive Forum",
    location: "Surat",
    date: new Date("2026-03-20"),
    description: "Develop leadership and management skills",
    capacity: 200,
    category: "Business",
    registeredCount: 0
  }
];

const seedEvents = async () => {
  try {
    const count = await Event.countDocuments();
    if (count === 0) {
      await Event.insertMany(mockEvents);
      console.log('✅ Events seeded successfully!');
    } else {
      console.log(`📅 ${count} events already exist in database`);
    }
  } catch (error) {
    console.error('Error seeding events:', error);
  }
};

const startServer = async () => {
  await connectDB();
  await seedEvents();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/events', require('./routes/eventRoutes'));
  app.use('/api/registrations', require('./routes/registrationRoutes'));

  app.get('/', (req, res) => {
    res.send("Bellcorp Event API Running");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
