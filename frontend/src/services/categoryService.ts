import axiosInstance from '../lib/axios';
import { Category } from '../types';

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get('/api/categories');
    return response.data;
  },

  createCategory: async (data: Omit<Category, 'id'>): Promise<Category> => {
    const response = await axiosInstance.post('/api/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: Partial<Category>): Promise<Category> => {
    const response = await axiosInstance.put(`/api/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/categories/${id}`);
  },
};
