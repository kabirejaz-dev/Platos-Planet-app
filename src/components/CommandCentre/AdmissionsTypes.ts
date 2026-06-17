export interface Lead {
  id: string;
  name: string;
  parentName: string;
  phone: string;
  email: string;
  curriculum: "IGCSE" | "A-Level" | "CBSE";
  grade: string;
  source: "Google Ads" | "Meta Ads" | "TikTok" | "Website" | "Walk-In" | "Referral" | "School Visit";
  branch: string;
  score: number; // 0-100
  probability: number; // percentage
  expectedRevenue: number;
  status: "Inquiry" | "Contacted" | "Counseling" | "Trial Class" | "Application" | "Enrollment";
  nextAction: string;
  nextActionDate: string;
  createdAt: string;
}

export interface TrialClass {
  id: string;
  studentName: string;
  parentName: string;
  curriculum: "IGCSE" | "A-Level" | "CBSE";
  grade: string;
  branch: string;
  subject: string;
  datetime: string;
  status: "Upcoming" | "Attended" | "Missed" | "Converted";
}

export interface Scholarship {
  id: string;
  studentName: string;
  score: number;
  grade: string;
  type: "Merit" | "Need-Based";
  discountPct: number;
  status: "Approved" | "Pending" | "Rejected";
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: "Meeting" | "Counseling" | "Trial Class" | "Consultation";
  studentName: string;
  parentName: string;
  datetime: string;
  branch: string;
}

export interface ActivityLog {
  id: string;
  type: "lead" | "trial" | "enroll" | "scholarship" | "followup" | "system";
  message: string;
  user: string;
  timestamp: string;
}
