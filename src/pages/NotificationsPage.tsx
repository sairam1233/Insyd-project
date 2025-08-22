import { useState, useEffect, useMemo } from 'react';
import { getNotifications, markAsRead } from '../api';
import { Notification } from '../types';
import Toast from '../components/Toast';
import { Bell, BellOff, Check, Loader2, AlertCircle } from 'lucide-react';

const USER_ID = 'user123';

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlyUnread, setOnlyUnread] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success'|'error'|'info' } | null>(null);

  const unreadCount = useMemo(() => items.filter(i => !i.isRead).length, [items]);

  async function load() {
    try {
      setLoading(true);
      console.log('Loading notifications for user:', USER_ID, 'onlyUnread:', onlyUnread);
      const data = await getNotifications(USER_ID, onlyUnread);
      setItems(data);
      setError(null);
    } catch (e: any) {
      console.error('Error loading notifications:', e);
      setError(e.message || 'Failed to load notifications');
      setToast({ message: 'Failed to load notifications', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function onMarkRead(id: string) {
    try {
      await markAsRead(id);
      if (onlyUnread) {
        setItems(prev => prev.filter(n => n._id !== id));
      } else {
        setItems(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      }
      setToast({ message: 'Marked as read', type: 'success' });
    } catch (e: any) {
      console.error('Error marking as read:', e);
      setError(e.message || 'Failed to mark as read');
      setToast({ message: 'Failed to mark as read', type: 'error' });
    }
  }

  function onRefresh() {
    load();
    setToast({ message: 'Refreshing notifications...', type: 'info' });
  }

  useEffect(() => { 
    load(); 
  }, [onlyUnread]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'FOLLOW': return '👤';
      case 'LIKE': return '❤️';
      case 'COMMENT': return '💬';
      case 'SHARE_JOB': return '💼';
      case 'SHARE_BLOG': return '📝';
      default: return '🔔';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">
          <Bell size={28} />
          Notifications
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </h2>
        <button onClick={onRefresh} className="refresh-btn" disabled={loading}>
          <Loader2 size={18} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      <div className="toolbar">
        <div className="filter-group">
          <button 
            onClick={() => setOnlyUnread(false)} 
            className={`filter-btn ${!onlyUnread ? 'active' : ''}`}
          >
            <Bell size={16} />
            All ({items.length + (onlyUnread ? unreadCount : 0)})
          </button>
          <button 
            onClick={() => setOnlyUnread(true)} 
            className={`filter-btn ${onlyUnread ? 'active' : ''}`}
          >
            <BellOff size={16} />
            Unread ({onlyUnread ? items.length : unreadCount})
          </button>
        </div>
      </div>

      <div className="content">
        {loading ? (
          <div className="loading-state">
            <Loader2 size={40} className="spinning" />
            <p>Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <AlertCircle size={40} />
            <p>{error}</p>
            <button onClick={onRefresh} className="retry-btn">Try Again</button>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <BellOff size={40} />
            <p>{onlyUnread ? 'No unread notifications' : 'No notifications found'}</p>
          </div>
        ) : (
          <div className="notifications-grid">
            {items.map(item => (
              <div key={item._id} className={`notification-card ${item.isRead ? 'read' : 'unread'}`}>
                <div className="notification-icon">
                  {getNotificationIcon(item.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-text">{item.content}</div>
                  <div className="notification-meta">
                    <span className="notification-type">{item.type}</span>
                    <span className="notification-time">{formatDate(item.createdAt)}</span>
                  </div>
                </div>
                <div className="notification-actions">
                  {!item.isRead && (
                    <button 
                      onClick={() => onMarkRead(item._id)} 
                      className="mark-read-btn"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}