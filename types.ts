export enum ExerciseStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  ATTEMPTED = 'attempted',
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  status: ExerciseStatus;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  initialCode: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: string; // Icon name reference
  totalExercises: number;
  completedExercises: number;
  exercises: Exercise[];
}

export type ViewState = 
  | { type: 'DASHBOARD' }
  | { type: 'COURSES' }
  | { type: 'COURSE_DETAIL'; courseId: string }
  | { type: 'EXERCISE_DETAIL'; courseId: string; exerciseId: string }
  | { type: 'RANKING' }
  | { type: 'PROFILE' };

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  date: string;
}

export interface CosmeticsItem {
  id: string;
  name: string;
  preview: string; // URL or CSS class
  type: 'avatar' | 'frame';
  unlocked: boolean;
  requiredLevel: number;
}

export interface User {
  name: string; // Real Name (private/profile)
  nickname: string; // Display Name (ranking)
  email: string;
  avatar: string;
  frame: string | null; // ID of selected frame
  isPublic: boolean; // Privacy setting
  level: number;
  streak: number;
  streakHistory: string[]; // Dates 'YYYY-MM-DD'
  xp: number;
  bio: string;
  joinDate: string;
  achievements: Achievement[];
  inventory: CosmeticsItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}