import axiosInstance from '../lib/axios';
import { Product } from '../types';

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productService = {
  getAllProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    const response = await axiosInstance.get('/api/products', { params: filters });
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  },

  createProduct: async (data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const response = await axiosInstance.post('/api/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await axiosInstance.put(`/api/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/products/${id}`);
  },
};
