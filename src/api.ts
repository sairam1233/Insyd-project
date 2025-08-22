import { Notification, CreateEventParams } from './types';

// Determine the base URL based on environment
const BASE_URL = (() => {
  // Use the proxy for both development and production (Vercel)
  // This allows Vercel to handle CORS and routing
  return '/api';
})();

export async function getNotifications(userId: string, onlyUnread = false): Promise<Notification[]> {
  try {
    const url = `${BASE_URL}/notifications/${userId}?onlyUnread=${onlyUnread}`;
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', BASE_URL);
    console.log('Fetching notifications from:', url);
    console.log('User ID:', userId);
    console.log('Only Unread:', onlyUnread);
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Add timeout and better error handling for production
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      throw new Error(`Failed to fetch notifications: ${res.status} ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Notifications received:', data);
    return data;
  } catch (error) {
    console.error('Network Error:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw error;
  }
}

export async function createEvent(params: CreateEventParams): Promise<Notification> {
  try {
    console.log('Creating event:', params);
    
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      throw new Error(`Failed to create event: ${res.status} ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Event created:', data);
    return data;
  } catch (error) {
    console.error('Network Error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw error;
  }
}

export async function markAsRead(id: string): Promise<Notification> {
  try {
    console.log('Marking notification as read:', id);
    
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { 
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      throw new Error(`Failed to mark as read: ${res.status} ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Marked as read:', data);
    return data;
  } catch (error) {
    console.error('Network Error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw error;
  }
}