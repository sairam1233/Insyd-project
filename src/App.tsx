import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import NotificationsPage from './pages/NotificationsPage';
import CreateEventPage from './pages/CreateEventPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/notifications" replace />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/create" element={<CreateEventPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}