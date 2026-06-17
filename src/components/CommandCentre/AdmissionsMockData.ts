import { Lead, TrialClass, Scholarship, CalendarEvent, ActivityLog } from "./AdmissionsTypes";

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Student 4",
    parentName: "Parent 2",
    phone: "+971 50 123 4567",
    email: "student4@gmail.com",
    curriculum: "IGCSE",
    grade: "Grade 10",
    source: "Google Ads",
    branch: "Main Branch",
    score: 92,
    probability: 85,
    expectedRevenue: 8500,
    status: "Trial Class",
    nextAction: "Call Today",
    nextActionDate: "2026-06-16",
    createdAt: "2026-06-10"
  },
  {
    id: "lead-2",
    name: "Student 3",
    parentName: "Parent 6",
    phone: "+971 52 987 6543",
    email: "parent6@yahoo.com",
    curriculum: "A-Level",
    grade: "Grade 12",
    source: "Meta Ads",
    branch: "Main Branch",
    score: 88,
    probability: 80,
    expectedRevenue: 12000,
    status: "Counseling",
    nextAction: "Send WhatsApp Brochure",
    nextActionDate: "2026-06-16",
    createdAt: "2026-06-11"
  },
  {
    id: "lead-3",
    name: "Student 2",
    parentName: "Parent 7",
    phone: "+971 54 444 8888",
    email: "parent7@government.ae",
    curriculum: "IGCSE",
    grade: "Grade 11",
    source: "School Visit",
    branch: "Main Branch",
    score: 96,
    probability: 95,
    expectedRevenue: 9500,
    status: "Application",
    nextAction: "Approve Scholarship Request",
    nextActionDate: "2026-06-17",
    createdAt: "2026-06-12"
  },
  {
    id: "lead-4",
    name: "Student 5",
    parentName: "Parent 5",
    phone: "+971 56 312 4578",
    email: "parent5@emirates.com",
    curriculum: "CBSE",
    grade: "Grade 10",
    source: "Walk-In",
    branch: "Online Campus",
    score: 74,
    probability: 50,
    expectedRevenue: 6500,
    status: "Inquiry",
    nextAction: "Book Physics Trial Class",
    nextActionDate: "2026-06-16",
    createdAt: "2026-06-14"
  },
  {
    id: "lead-5",
    name: "Student 8",
    parentName: "Parent 8",
    phone: "+971 55 889 1234",
    email: "parent8@woodgroup.com",
    curriculum: "A-Level",
    grade: "Grade 13",
    source: "TikTok",
    branch: "Online Campus",
    score: 91,
    probability: 90,
    expectedRevenue: 14000,
    status: "Enrollment",
    nextAction: "Send Invoice Receipt",
    nextActionDate: "2026-06-15",
    createdAt: "2026-06-08"
  },
  {
    id: "lead-6",
    name: "Student 9",
    parentName: "Parent 9",
    phone: "+971 50 567 1290",
    email: "parent9@dubaimunicipality.ae",
    curriculum: "IGCSE",
    grade: "Grade 9",
    source: "Referral",
    branch: "Main Branch",
    score: 65,
    probability: 35,
    expectedRevenue: 8500,
    status: "Contacted",
    nextAction: "Re-engage Parent Follow-up",
    nextActionDate: "2026-06-16",
    createdAt: "2026-06-13"
  },
  {
    id: "lead-7",
    name: "Student 6",
    parentName: "Parent 10",
    phone: "+971 52 654 3210",
    email: "parent10@infosys.com",
    curriculum: "CBSE",
    grade: "Grade 12",
    source: "Website",
    branch: "Online Campus",
    score: 82,
    probability: 70,
    expectedRevenue: 7500,
    status: "Trial Class",
    nextAction: "Call Post-Trial",
    nextActionDate: "2026-06-16",
    createdAt: "2026-06-09"
  },
  {
    id: "lead-8",
    name: "Student 10",
    parentName: "Parent 11",
    phone: "+971 54 111 2222",
    email: "parent11@schneider-electric.com",
    curriculum: "A-Level",
    grade: "Grade 11",
    source: "Meta Ads",
    branch: "Online Campus",
    score: 41,
    probability: 10,
    expectedRevenue: 13500,
    status: "Contacted",
    nextAction: "Scheduled Automatic Callback email",
    nextActionDate: "2026-06-18",
    createdAt: "2026-06-14"
  }
];

export const INITIAL_TRIALS: TrialClass[] = [
  {
    id: "trial-1",
    studentName: "Student 4",
    parentName: "Parent 2",
    curriculum: "IGCSE",
    grade: "Grade 10",
    branch: "Main Branch",
    subject: "Physics",
    datetime: "Today, 16:30",
    status: "Upcoming"
  },
  {
    id: "trial-2",
    studentName: "Student 5",
    parentName: "Parent 5",
    curriculum: "CBSE",
    grade: "Grade 10",
    branch: "Online Campus",
    subject: "Chemistry",
    datetime: "Today, 18:00",
    status: "Upcoming"
  },
  {
    id: "trial-3",
    studentName: "Student 6",
    parentName: "Parent 10",
    curriculum: "CBSE",
    grade: "Grade 12",
    branch: "Online Campus",
    subject: "Mathematics",
    datetime: "Yesterday, 15:30",
    status: "Attended"
  },
  {
    id: "trial-4",
    studentName: "Student 13",
    parentName: "Parent 12",
    curriculum: "CBSE",
    grade: "Grade 11",
    branch: "Online Campus",
    subject: "Physics",
    datetime: "Today, 19:30",
    status: "Upcoming"
  },
  {
    id: "trial-5",
    studentName: "Student 14",
    parentName: "Parent 13",
    curriculum: "IGCSE",
    grade: "Grade 10",
    branch: "Online Campus",
    subject: "Biology",
    datetime: "2026-06-15, 17:00",
    status: "Converted"
  }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-1",
    studentName: "Student 2",
    score: 96,
    grade: "Grade 11",
    type: "Merit",
    discountPct: 20,
    status: "Pending"
  },
  {
    id: "sch-2",
    studentName: "Student 11",
    score: 84,
    grade: "Grade 12",
    type: "Need-Based",
    discountPct: 15,
    status: "Approved"
  },
  {
    id: "sch-3",
    studentName: "Student 12",
    score: 55,
    grade: "Grade 9",
    type: "Merit",
    discountPct: 10,
    status: "Rejected"
  }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Trial Lesson (Physics)",
    type: "Trial Class",
    studentName: "Student 4",
    parentName: "Parent 2",
    datetime: "2026-06-16T16:30:00",
    branch: "Main Branch"
  },
  {
    id: "evt-2",
    title: "Parent Counseling Session",
    type: "Counseling",
    studentName: "Student 3",
    parentName: "Parent 6",
    datetime: "2026-06-16T12:00:00",
    branch: "Main Branch"
  },
  {
    id: "evt-3",
    title: "Trial Lesson (Chemistry)",
    type: "Trial Class",
    studentName: "Student 5",
    parentName: "Parent 5",
    datetime: "2026-06-16T18:00:00",
    branch: "Online Campus"
  },
  {
    id: "evt-4",
    title: "Scholarship Consultation",
    type: "Consultation",
    studentName: "Student 2",
    parentName: "Parent 7",
    datetime: "2026-06-17T11:30:00",
    branch: "Main Branch"
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-1",
    type: "lead",
    message: "New Hot Lead 'Student 4' entered via Google Ads, targeting IGCSE Physics Main Branch.",
    user: "System GenAI",
    timestamp: "10:15 AM"
  },
  {
    id: "act-2",
    type: "trial",
    message: "Trial booking confirmed for Student 5 for Chemistry. Advisor assigned: Advisor 1.",
    user: "Advisor 1",
    timestamp: "09:40 AM"
  },
  {
    id: "act-3",
    type: "scholarship",
    message: "Merit scholarship request drafted for Student 2 (Score: 96%). Approval pending.",
    user: "Administrator 1",
    timestamp: "09:02 AM"
  },
  {
    id: "act-4",
    type: "enroll",
    message: "Student 8 completed admissions enrollment. Paid AED 14,000 for Online Campus (A-Level).",
    user: "Admissions Clerk 1",
    timestamp: "Yesterday"
  },
  {
    id: "act-5",
    type: "followup",
    message: "Completed WhatsApp consultation with Parent 2. Student 4 scheduled for Physics Trial.",
    user: "Administrator 1",
    timestamp: "Yesterday"
  }
];
