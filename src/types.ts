export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export type ActionCategory = "paperless" | "energy" | "waste" | "plastic" | "other";

export interface GreenActionTemplate {
  id: string;
  name: string;
  category: ActionCategory;
  co2Saved: number; // in kg
  plasticSaved: number; // in pieces / units
  points: number;
  description: string;
  iconName: string; // Key of Lucide icons
}

export interface LoggedAction {
  id: string;
  employeeName: string;
  actionId: string;
  actionName: string;
  category: ActionCategory;
  co2Saved: number;
  plasticSaved: number;
  points: number;
  date: string;
  notes?: string;
}

export interface LeaderboardEntry {
  employeeName: string;
  totalPoints: number;
  totalCo2: number;
  totalPlastic: number;
  actionCount: number;
  rank?: number;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface FeaturedArticle {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

export interface Article {
  id: string;
  category: string;
  hashtag: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
}

