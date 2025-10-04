import axiosInstance from '../lib/axios';
import { Order } from '../types';

export const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await axiosInstance.get('/api/orders');
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await axiosInstance.get(`/api/orders/${id}`);
    return response.data;
  },

  createOrder: async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    const response = await axiosInstance.post('/api/orders', data);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await axiosInstance.put(`/api/orders/${id}`, { status });
    return response.data;
  },
};
