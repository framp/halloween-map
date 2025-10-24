# Halloween Tracer

A simple Solid.js application for tracking your Halloween route using Google Maps.

## Features

- Real-time location tracking
- Draw custom paths on satellite view
- Persistent path storage using localStorage
- Edit and reset functionality
- Optimized for GitHub Pages deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Google Maps API key:
```bash
cp .env.example .env
```

Then edit `.env` and add your API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

## Building for Production

Build the static files:
```bash
npm run build
```

The output will be in the `dist` folder, ready to deploy to GitHub Pages or any static hosting service.

## GitHub Pages Deployment

1. Build the project: `npm run build`
2. Push the `dist` folder to your repository
3. Configure GitHub Pages to serve from the appropriate branch/folder

## Usage

- **Edit**: Click to start drawing a path on the map. Click points to add them to your route.
- **Save**: Saves the current path (automatically persisted to localStorage).
- **Reset**: Clears the current path and returns to default empty state.

Your location is shown as a blue marker, and your path is drawn in orange with numbered waypoints.
