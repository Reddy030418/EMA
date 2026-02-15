# React frontend for Bellcorp Events

This is the React frontend application for the Bellcorp Event Management system.

## Prerequisites
- Node.js (v14+)
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the client folder:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For production (Vercel):
```
REACT_APP_API_URL=https://your-backend-url.render.com/api
```

## Running the Application

```bash
npm start
```

The app will open on `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Project Structure

- `src/pages/` - Page components (Home, Login, Events, Dashboard)
- `src/components/` - Reusable components (Navbar, EventCard)
- `src/context/` - React Context for authentication
- `src/hooks/` - Custom React hooks (useAuth)
- `src/api/` - API calls and axios configuration
- `public/` - Static files

## Features

- User authentication (signup/login)
- Event discovery with search and filters
- Event registration
- User dashboard with upcoming/past events
- Responsive design

## Technologies Used

- React 18
- React Router v6
- Axios
- Context API for state management
- CSS3 for styling
