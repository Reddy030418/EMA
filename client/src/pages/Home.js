import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Bellcorp Events</h1>
          <p>Discover, Connect, and Celebrate Amazing Events</p>
          <button
            onClick={() => navigate(user ? '/events' : '/signup')}
            className="cta-button"
          >
            {user ? 'Browse Events' : 'Get Started'}
          </button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Bellcorp?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Discover Events</h3>
            <p>Search and filter events by category, location, and interests</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎫</span>
            <h3>Easy Registration</h3>
            <p>Register for events with just one click and manage your bookings</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h3>Track Events</h3>
            <p>Keep track of upcoming and past events in your dashboard</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Connect</h3>
            <p>Meet like-minded people and network at amazing events</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join Thousands of Event Enthusiasts</h2>
        <p>Start discovering amazing events today</p>
        <button
          onClick={() => navigate(user ? '/events' : '/signup')}
          className="cta-button-secondary"
        >
          {user ? 'Explore Events' : 'Sign Up Now'}
        </button>
      </section>
    </div>
  );
};

export default Home;
