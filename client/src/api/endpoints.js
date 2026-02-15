import API from './axios';

// Auth APIs
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (credentials) => API.post('/auth/login', credentials);

// Event APIs
export const getEvents = (filters) => API.get('/events', { params: filters });
export const getEventById = (id) => API.get(`/events/${id}`);

// Registration APIs
export const registerForEvent = (eventId) => API.post('/registrations/' + eventId);
export const cancelRegistration = (eventId) => API.delete('/registrations/' + eventId);
export const getMyRegistrations = () => API.get('/registrations/my');
