import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { getEvents } from '../api/endpoints';
import './Events.css';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalEvents: 0
  });

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const location = searchParams.get('location') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const filters = {
        search,
        category,
        location,
        page
      };
      const response = await getEvents(filters);
      setEvents(response.data.events);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalEvents: response.data.totalEvents
      });
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, location, page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, value);
    newParams.set('page', '1'); // Reset to page 1 when filter changes
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', newPage);
      setSearchParams(newParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const categories = ['Technology', 'Design', 'Business', 'Marketing', 'Community', 'Networking'];
  const locations = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Pune', 'Gurgaon', 'Jaipur', 'Kolkata', 'Mumbai', 'Kerala', 'Ahmedabad', 'Chandigarh', 'Lucknow', 'Indore', 'Surat'];

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>🎫 Discover Events</h1>
        <p>Find and register for amazing events near you</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            name="search"
            placeholder="Search events..."
            value={search}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="category"
            value={category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            name="location"
            value={location}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="no-events">No events found. Try adjusting your filters.</div>
      ) : (
        <>
          <div className="events-info">
            Showing {events.length} of {pagination.totalEvents} events
          </div>
          <div className="events-grid">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="pagination-btn"
              >
                ← Previous
              </button>

              <div className="page-info">
                Page {pagination.page} of {pagination.totalPages}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
