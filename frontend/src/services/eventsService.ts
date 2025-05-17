import axios from 'axios';

const API_URL = 'http://localhost:3001/api/events';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  society: any;
  attendees: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  date: string;
  location: string;
  societyId: string;
}

export const eventsService = {
  async getAllEvents(): Promise<Event[]> {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getEvent(id: string): Promise<Event> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async createEvent(data: CreateEventDto): Promise<Event> {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async joinEvent(id: string): Promise<Event> {
    const response = await axios.post(
      `${API_URL}/${id}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },

  async leaveEvent(id: string): Promise<Event> {
    const response = await axios.post(
      `${API_URL}/${id}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },
}; 