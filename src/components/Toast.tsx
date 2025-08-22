import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { ToastProps } from '../types';

export default function Toast({ message, type = 'info', dismissAfterMs = 2500, onDismiss }: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onDismiss, dismissAfterMs);
    return () => clearTimeout(id);
  }, [dismissAfterMs, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <XCircle size={20} />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div role="status" aria-live="polite" className={`toast toast-${type}`}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
}