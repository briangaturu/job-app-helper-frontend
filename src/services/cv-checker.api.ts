import api from '../lib/axios';

export interface ATSAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  keywords: string[];
  formatting: {
    isClean: boolean;
    issues: string[];
  };
  sections: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
  };
}

export interface CVCheckResponse {
  id: number;
  fileName: string;
  cvText: string;
  analysis: ATSAnalysis;
  improvedCv: string | null;
  createdAt: string;
}

export const cvCheckerService = {
  checkCV: async (file: File): Promise<CVCheckResponse> => {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await api.post<CVCheckResponse>('/cv/check', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  improveCV: async (cvCheckId: number): Promise<CVCheckResponse> => {
  const response = await api.post<CVCheckResponse>('/cv/improve', {
    cvCheckId,
  });

  return response.data;
},

  listHistory: async (): Promise<CVCheckResponse[]> => {
    const response = await api.get<CVCheckResponse[]>('/cv/history');
    return response.data;
  },
};