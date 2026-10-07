import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tours/:id" element={<TourDetailPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
