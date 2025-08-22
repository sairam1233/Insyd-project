export type NotificationType = 'FOLLOW' | 'LIKE' | 'COMMENT' | 'SHARE_JOB' | 'SHARE_BLOG';

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateEventParams {
  userId: string;
  type: NotificationType;
  content: string;
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  dismissAfterMs?: number;
  onDismiss: () => void;
}