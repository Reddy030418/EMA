import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const spotsLeft = event.capacity - event.registeredCount;

  const handleCardClick = () => {
    navigate(`/event/${event._id}`);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/event/${event._id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="event-header">
        <h3 className="event-name">{event.name}</h3>
        <span className="event-category">{event.category}</span>
      </div>

      <p className="event-organizer">By {event.organizer}</p>

      <div className="event-details">
        <p>
          <strong>📍 Location:</strong> {event.location}
        </p>
        <p>
          <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>📝 Description:</strong> {event.description}
        </p>
      </div>

      <div className="event-footer">
        <div className="capacity-info">
          <span className={spotsLeft > 0 ? 'spots-available' : 'spots-full'}>
            {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Sold Out'}
          </span>
        </div>

        <button
          onClick={handleRegister}
          className={`register-btn ${spotsLeft === 0 ? 'disabled' : ''}`}
          disabled={spotsLeft === 0}
        >
          {spotsLeft === 0 ? 'Sold Out' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
