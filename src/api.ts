import { Notification, CreateEventParams } from './types';

const BASE_URL = (import.meta as any).env?.DEV 
  ? '/api' 
  : 'https://api-node-insyd.onrender.com/api';

export async function getNotifications(userId: string, onlyUnread = false): Promise<Notification[]> {
  try {
    const url = `${BASE_URL}/notifications/${userId}?onlyUnread=${onlyUnread}`;
    console.log('Fetching notifications from:', url);
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
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
      body: JSON.stringify(params)
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
      }
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
    throw error;
  }
}