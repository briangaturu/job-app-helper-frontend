import api from '../lib/axios';
import { Application, ApplicationStats } from '../types';

export const applicationsService = {
  create: async (data: {
    company?: string;
    jobTitle: string;
    jobText?: string;
    status?: string;
    notes?: string;
    generationId?: number;
  }): Promise<Application> => {
    const response = await api.post<Application>('/applications', data);
    return response.data;
  },

  list: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/applications');
    return response.data;
  },

  update: async (id: number, data: Partial<Application>): Promise<Application> => {
    const response = await api.patch<Application>(`/applications/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },

  getStats: async (): Promise<ApplicationStats> => {
    const response = await api.get<ApplicationStats>('/applications/stats');
    return response.data;
  },
};
