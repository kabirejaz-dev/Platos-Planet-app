export type CurriculumType = "CBSE" | "British" | "Creative Arts & Test Prep";

export interface Course {
  id: string;
  title: string;
  curriculum: CurriculumType;
  gradeLevel: string;
  description: string;
  highlights: string[];
  feeRange: string;
  schedule: string;
  duration: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface StudentProfile {
  name: string;
  grade: string;
  curriculum: CurriculumType;
  streak: number;
  xp: number;
  badges: string[];
  enrolledCourses: string[]; // ids
  bookedTrials: string[]; // Course IDs
  preferredStudyTime?: string; // e.g. "18:30"
  studyRemindersEnabled?: boolean;
}

export interface LeadQuery {
  studentName: string;
  parentName: string;
  contactNumber: string;
  email: string;
  courseId: string;
  curriculum: CurriculumType;
  preferredCampus: "Al Qusais" | "Silicon Oasis" | "Online Hub" | "Sharjah Campus";
  message: string;
}
