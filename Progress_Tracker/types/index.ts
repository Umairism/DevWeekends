export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Task {
  id: string;
  title: string;
  difficulty?: Difficulty;
  estimatedMinutes?: number;
}

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface ProgressData {
  completed: string[];
  notes: Record<string, string>;
  evidence: Record<string, string>;
  customRoadmaps: Roadmap[];
}
