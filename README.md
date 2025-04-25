# Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices using WebSocket connections and managing all state via Redux.

## Features

- **Real WebSocket Integration**: Live data from Binance API for real-time price updates
- **Filtering and Sorting**: Filter and sort assets by price, market cap, and other criteria
- **localStorage Support**: User preferences and favorites are saved between sessions
- **Detailed Asset Views**: Comprehensive information pages for each cryptocurrency
- **Search Functionality**: Quickly find specific cryptocurrencies
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Tech Stack

- React
- Redux Toolkit for state management
- React Router for navigation
- Recharts for interactive charts
- Tailwind CSS for styling
- WebSocket connection to Binance API

## Setup Instructions

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Installation Commands

To set up this project from scratch, run the following commands:

\`\`\`bash
# Create a new React app
npx create-react-app crypto-price-tracker
cd crypto-price-tracker

# Install dependencies
npm install react-redux @reduxjs/toolkit react-router-dom recharts tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p
\`\`\`

## Project Structure

- `/src/components`: UI components for rendering the crypto data
- `/src/features`: Redux slices and related functionality
- `/src/services`: WebSocket and localStorage services
- `/src/data`: Initial data and constants

## Usage

- **Main Dashboard**: View all cryptocurrencies with real-time price updates
- **Filtering**: Use the filter panel to narrow down assets by price range, category, etc.
- **Sorting**: Sort assets by different criteria like price, market cap, or 24h change
- **Search**: Use the search bar to find specific cryptocurrencies
- **Favorites**: Mark assets as favorites for quick access
- **Detailed View**: Click on an asset name to see detailed information and charts

## Future Enhancements

- Add more technical indicators and chart types
- Implement portfolio tracking functionality
- Add price alerts and notifications
- Support for more cryptocurrencies and exchanges
- Dark/light theme toggle
