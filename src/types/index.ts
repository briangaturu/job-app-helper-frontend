export type Plan = 'free' | 'pro';

export interface UserProfile {
  headline?: string;
  bio?: string;
  location?: string;
  certifications?: string[];
}

export type ApplicationStatus = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface User {
  id: number;
  name: string;
  email: string;
  plan: Plan;
  dailyGenerationCount: number;
  usageResetAt: string;
  createdAt: string;
  profile?: UserProfile | null;
}

export interface Application {
  id: number;
  userId: number;
  generationId: number | null;
  company: string | null;
  jobTitle: string;
  jobText: string | null;
  status: ApplicationStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Generation {
  id: number;
  userId: number;
  jobTitle: string | null;
  jobText: string;
  outputJson: any;
  matchScore: number | null;
  createdAt: string;
}

export interface InterviewQuestion {
  id: number;
  userId: number;
  applicationId: number | null;
  question: string;
  userAnswer: string | null;
  feedback: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApplicationStats {
  total: number;
  saved: number;
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
}
