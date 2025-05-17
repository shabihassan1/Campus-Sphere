import axios from 'axios';

const API_URL = 'http://localhost:3001/api/societies';

export interface Society {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  category: string;
  isActive: boolean;
  members: any[];
  president?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSocietyDto {
  name: string;
  description: string;
  logoUrl?: string;
  category: string;
}

export const societiesService = {
  async getAllSocieties(): Promise<Society[]> {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getSociety(id: string): Promise<Society> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async createSociety(data: CreateSocietyDto): Promise<Society> {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async joinSociety(id: string): Promise<Society> {
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

  async leaveSociety(id: string): Promise<Society> {
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

  async editSociety(id: string, data: Partial<CreateSocietyDto>): Promise<Society> {
    const response = await axios.patch(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async getMembers(id: string): Promise<any[]> {
    const response = await axios.get(`${API_URL}/${id}/members`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  async removeMember(societyId: string, memberId: string): Promise<Society> {
    const response = await axios.delete(`${API_URL}/${societyId}/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },
}; 