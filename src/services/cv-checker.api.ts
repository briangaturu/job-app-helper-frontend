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
  fileName: string;
  fileSize: number;
  analysis: ATSAnalysis;
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
};
