import api from '../lib/axios';
import { InterviewQuestion } from '../types';

export const interviewsService = {
  generateQuestions: async (data: { applicationId: number; count?: number }): Promise<InterviewQuestion[]> => {
    const response = await api.post<InterviewQuestion[]>('/interviews/questions', data);
    return response.data;
  },

  submitAnswer: async (data: { questionId: number; userAnswer: string }): Promise<InterviewQuestion> => {
    const response = await api.post<InterviewQuestion>('/interviews/answers', data);
    return response.data;
  },

  listForApplication: async (applicationId: number): Promise<InterviewQuestion[]> => {
    const response = await api.get<InterviewQuestion[]>(`/interviews/applications/${applicationId}/questions`);
    return response.data;
  },
};
