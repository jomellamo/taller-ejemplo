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
  | { type: 'RANKING' };

export interface User {
  name: string;
  avatar: string;
  level: number;
  streak: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}