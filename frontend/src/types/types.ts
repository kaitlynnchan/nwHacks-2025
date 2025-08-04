
export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty?: string;
  category?: string;
  estimatedTime?: string;
  requirements: string[];
  completed?: boolean;
}

export interface UserChallenge {
  id: string;
  challengeId: string;
  completed: boolean;
  notes: string;
  document: string;
  completedAtTs: Date;
  completedAt: string;
}

export interface User {
  id: string;
  email: string;
  points: number;
  challenges: [UserChallenge];
  accessToken: string;
}