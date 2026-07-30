import api from '../lib/axios';
import { Generation } from '../types';

export const generationsService = {
  create: async (data: { jobTitle?: string; jobText: string }): Promise<Generation> => {
    const response = await api.post<Generation>('/generations', data);
    return response.data;
  },

  list: async (): Promise<Generation[]> => {
    const response = await api.get<Generation[]>('/generations');
    return response.data;
  },
};
