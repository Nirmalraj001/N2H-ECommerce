import axiosInstance from '../lib/axios';
import { User } from '../types';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/api/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put(`/api/users/${id}`, data);
    return response.data;
  },
};
