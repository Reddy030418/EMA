import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, registerForEvent, cancelRegistration, getMyRegistrations } from '../api/endpoints';
import { useAuth } from '../hooks/useAuth';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await getEventById(id);
      setEvent(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load event');
      setLoading(false);
    }
  }, [id]);

  const checkUserRegistration = useCallback(async () => {
    try {
      const response = await getMyRegistrations();
      const isRegistered = response.data.some(reg => reg?.event?._id === id);
      setRegistered(isRegistered);
    } catch (err) {
      console.error('Error checking registration status:', err);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkUserRegistration();
    }
  }, [id, user, fetchEvent, checkUserRegistration]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      await registerForEvent(id);
      setRegistered(true);
      setError('');
      setSuccess('Successfully registered for the event!');
      setTimeout(() => setSuccess(''), 3000);
      fetchEvent();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!window.confirm('Are you sure you want to cancel your registration for this event?')) {
      return;
    }

    setRegistering(true);
    try {
      await cancelRegistration(id);
      setRegistered(false);
      setError('');
      setSuccess('Registration cancelled successfully');
      setTimeout(() => setSuccess(''), 3000);
      fetchEvent();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel registration');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <div className="event-details-container"><p>Loading event details...</p></div>;
  }

  if (!event) {
    return (
      <div className="event-details-container">
        <p>Event not found</p>
        <button onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.registeredCount;

  return (
    <div className="event-details-container">
      <button onClick={() => navigate('/events')} className="back-button">← Back to Events</button>
      
      <div className="event-details">
        <div className="event-header-detail">
          <h1>{event.name}</h1>
          <span className="category-badge">{event.category}</span>
        </div>

        <div className="event-body">
          <div className="event-main">
            <div className="info-section">
              <h2>Event Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Organizer</label>
                  <p>{event.organizer}</p>
                </div>
                <div className="info-item">
                  <label>Location</label>
                  <p>{event.location}</p>
                </div>
                <div className="info-item">
                  <label>Date & Time</label>
                  <p>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}</p>
                </div>
                <div className="info-item">
                  <label>Category</label>
                  <p>{event.category}</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Description</h2>
              <p className="description">{event.description}</p>
            </div>
          </div>

          <div className="event-sidebar">
            <div className="registration-card">
              <h3>Registration</h3>
              
              <div className="capacity-details">
                <div className="capacity-bar">
                  <div 
                    className="capacity-filled" 
                    style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                  ></div>
                </div>
                <p>{event.registeredCount} / {event.capacity} registered</p>
                <p className={`spots-info ${spotsLeft > 0 ? 'available' : 'full'}`}>
                  {spotsLeft > 0 ? `${spotsLeft} spots available` : 'This event is sold out'}
                </p>
              </div>

              {success && <div className="success-message">✓ {success}</div>}
              {error && <div className="error-message">{error}</div>}

              {registered ? (
                <div className="button-group">
                  <button
                    onClick={handleCancelRegistration}
                    disabled={registering}
                    className="cancel-button"
                  >
                    {registering ? 'Cancelling...' : 'Cancel Registration'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={spotsLeft === 0 || registering}
                  className={`register-button ${spotsLeft === 0 ? 'disabled' : ''}`}
                >
                  {registering ? 'Registering...' : 'Register Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
