import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import TeamDetailsPage from './pages/TeamDetailsPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto px-4 py-6 md:py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/matches" element={<HomePage />} />
              <Route path="/team/:teamId" element={<TeamDetailsPage />} />
              <Route path="/player/:playerId" element={<PlayerProfilePage />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;