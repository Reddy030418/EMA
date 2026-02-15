import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRegistrations, cancelRegistration } from '../api/endpoints';
import { useAuth } from '../hooks/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchRegistrations();
  }, [user, navigate]);

  const fetchRegistrations = async () => {
    try {
      const response = await getMyRegistrations();
      setRegistrations(response.data);
    } catch (err) {
      setError('Failed to load registrations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (eventId, eventName) => {
    if (!window.confirm(`Are you sure you want to cancel registration for "${eventName}"?`)) {
      return;
    }

    try {
      await cancelRegistration(eventId);
      setSuccess(`Successfully cancelled registration for ${eventName}`);
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchRegistrations();
    } catch (err) {
      setError(`Failed to cancel registration: ${err.response?.data?.message || 'Unknown error'}`);
      console.error(err);
    }
  };

  const now = new Date();

  const upcoming = registrations.filter(
    reg => reg?.event?.date && new Date(reg.event.date) > now
  );

  const past = registrations.filter(
    reg => reg?.event?.date && new Date(reg.event.date) <= now
  );

  const renderEventList = (events, title) => (
    <div className="event-section">
      <h2>{title}</h2>
      {events.length === 0 ? (
        <p className="no-events">No {title.toLowerCase()}</p>
      ) : (
        <div className="events-list">
          {events.map(reg => (
            <div key={reg._id} className="event-item">
              <div className="event-info">
                <h3>{reg.event?.name || 'Untitled event'}</h3>
                <p><strong>By:</strong> {reg.event?.organizer || 'Unknown'}</p>
                <p><strong>Location:</strong> {reg.event?.location || 'TBA'}</p>
                <p><strong>Date:</strong> {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'Date TBA'}</p>
                <p><strong>Registered:</strong> {reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : 'Unknown'}</p>
              </div>
              <div className="event-actions">
                <span className={`status ${title === 'Upcoming Events' ? 'upcoming' : 'past'}`}>
                  {title === 'Upcoming Events' ? '🔔 Upcoming' : '✓ Completed'}
                </span>
                {title === 'Upcoming Events' && (
                  <button
                    onClick={() => handleCancelRegistration(reg.event._id, reg.event.name)}
                    className="cancel-btn"
                  >
                    Cancel Registration
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Manage your event registrations</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{upcoming.length}</h3>
          <p>Upcoming Events</p>
        </div>
        <div className="stat-card">
          <h3>{past.length}</h3>
          <p>Past Events</p>
        </div>
        <div className="stat-card">
          <h3>{registrations.length}</h3>
          <p>Total Registrations</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="events-sections">
        {renderEventList(upcoming, 'Upcoming Events')}
        {renderEventList(past, 'Past Events')}
      </div>
    </div>
  );
};

export default Dashboard;
