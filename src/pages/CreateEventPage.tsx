import React, { useState } from 'react';
import { createEvent } from '../api';
import { NotificationType } from '../types';
import Toast from '../components/Toast';
import { Plus, Send, Loader2 } from 'lucide-react';

const NOTIFICATION_TYPES: { value: NotificationType; label: string; emoji: string }[] = [
  { value: 'FOLLOW', label: 'Follow', emoji: '👤' },
  { value: 'LIKE', label: 'Like', emoji: '❤️' },
  { value: 'COMMENT', label: 'Comment', emoji: '💬' },
  { value: 'SHARE_JOB', label: 'Share Job', emoji: '💼' },
  { value: 'SHARE_BLOG', label: 'Share Blog', emoji: '📝' }
];

const SAMPLE_CONTENT: Record<NotificationType, string> = {
  'FOLLOW': 'Alice followed you',
  'LIKE': 'Bob liked your post',
  'COMMENT': 'Charlie commented on your post',
  'SHARE_JOB': 'David shared a job opportunity',
  'SHARE_BLOG': 'Emma shared a blog post'
};

export default function CreateEventPage() {
  const [userId, setUserId] = useState('user123');
  const [type, setType] = useState<NotificationType>('FOLLOW');
  const [content, setContent] = useState(SAMPLE_CONTENT.FOLLOW);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success'|'error'|'info' } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!userId.trim() || !content.trim()) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await createEvent({ userId: userId.trim(), type, content: content.trim() });
      setToast({ message: 'Event created successfully!', type: 'success' });
      // Reset form
      setUserId('user123');
      setType('FOLLOW');
      setContent(SAMPLE_CONTENT.FOLLOW);
    } catch (e: any) {
      console.error('Error creating event:', e);
      setToast({ message: e.message || 'Failed to create event', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  function onTypeChange(newType: NotificationType) {
    setType(newType);
    setContent(SAMPLE_CONTENT[newType]);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">
          <Plus size={28} />
          Create Event
        </h2>
      </div>

      <div className="content">
        <div className="form-container">
          <form onSubmit={onSubmit} className="create-form">
            <div className="form-group">
              <label htmlFor="userId" className="form-label">
                User ID <span className="required">*</span>
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-input"
                placeholder="Enter user ID"
                required
              />
              <p className="form-help">The user who will receive this notification</p>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Notification Type <span className="required">*</span>
              </label>
              <div className="type-grid">
                {NOTIFICATION_TYPES.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onTypeChange(value)}
                    className={`type-btn ${type === value ? 'active' : ''}`}
                  >
                    <span className="type-emoji">{emoji}</span>
                    <span className="type-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content <span className="required">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
                placeholder="Enter notification content"
                rows={4}
                required
              />
              <p className="form-help">The message that will be displayed in the notification</p>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading || !userId.trim() || !content.trim()}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spinning" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Create Event
                  </>
                )}
              </button>
            </div>
          </form>

          
        </div>
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