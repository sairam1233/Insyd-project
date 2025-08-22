import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="nav">
      <div className="nav-content">
        <h1 className="nav-title">
          <Bell size={24} />
          Insyd Notifications
        </h1>
        <nav className="nav-links">
          <Link 
            to="/notifications" 
            className={`nav-link ${location.pathname.includes('/notifications') ? 'active' : ''}`}
          >
            <Bell size={18} />
            Notifications
          </Link>
          <Link 
            to="/create" 
            className={`nav-link ${location.pathname.includes('/create') ? 'active' : ''}`}
          >
            <Plus size={18} />
            Create Event
          </Link>
        </nav>
      </div>
    </header>
  );
}