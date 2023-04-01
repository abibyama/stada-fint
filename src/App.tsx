import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './pages/Header'
import LandingPage from './pages/LandingPage'
import BookingsPage from './pages/BookingPage'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bookings/:customerName" element={<BookingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
