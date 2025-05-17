import axios from 'axios';

const API_URL = 'http://localhost:3001/api/feedback';

export interface Feedback {
  id: string;
  message: string;
  rating?: number;
  user: any;
  society?: any;
  event?: any;
  createdAt: string;
}

export interface CreateFeedbackDto {
  message: string;
  rating?: number;
  societyId?: string;
  eventId?: string;
}

export const feedbackService = {
  async createFeedback(data: CreateFeedbackDto): Promise<Feedback> {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async getBySociety(societyId: string): Promise<Feedback[]> {
    const response = await axios.get(`${API_URL}/society/${societyId}`);
    return response.data;
  },

  async getByEvent(eventId: string): Promise<Feedback[]> {
    const response = await axios.get(`${API_URL}/event/${eventId}`);
    return response.data;
  },

  async getAll(): Promise<Feedback[]> {
    const response = await axios.get(API_URL);
    return response.data;
  },
}; 