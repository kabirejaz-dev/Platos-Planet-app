import { Lead, TrialClass, Scholarship, CalendarEvent, ActivityLog } from "./AdmissionsTypes";

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Ahmed Ali",
    parentName: "Ali Hammad",
    phone: "+971 50 123 4567",
    email: "ahmed.ali@gmail.com",
    curriculum: "IGCSE",
    grade: "Grade 10",
    source: "Google Ads",
    branch: "Al Furjan",
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
    name: "Sara Khan",
    parentName: "Faisal Khan",
    phone: "+971 52 987 6543",
    email: "faisal.k@yahoo.com",
    curriculum: "A-Level",
    grade: "Grade 12",
    source: "Meta Ads",
    branch: "Dubai Marina",
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
    name: "Zayed Al-Mansoori",
    parentName: "Hamad Al-Mansoori",
    phone: "+971 54 444 8888",
    email: "h.mansoori@government.ae",
    curriculum: "IGCSE",
    grade: "Grade 11",
    source: "School Visit",
    branch: "Dubai Marina",
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
    name: "Rohan Verma",
    parentName: "Sanjay Verma",
    phone: "+971 56 312 4578",
    email: "sanjay.verma@emirates.com",
    curriculum: "CBSE",
    grade: "Grade 10",
    source: "Walk-In",
    branch: "Silicon Oasis",
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
    name: "Mia Peterson",
    parentName: "Carl Peterson",
    phone: "+971 55 889 1234",
    email: "carl.peterson@woodgroup.com",
    curriculum: "A-Level",
    grade: "Grade 13",
    source: "TikTok",
    branch: "Business Bay",
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
    name: "Hassan Mahmoud",
    parentName: "Youssef Mahmoud",
    phone: "+971 50 567 1290",
    email: "youssef.mahmoud@dubaimunicipality.ae",
    curriculum: "IGCSE",
    grade: "Grade 9",
    source: "Referral",
    branch: "Al Furjan",
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
    name: "Karan Sharma",
    parentName: "Nitin Sharma",
    phone: "+971 52 654 3210",
    email: "sharma.nitin@infosys.com",
    curriculum: "CBSE",
    grade: "Grade 12",
    source: "Website",
    branch: "Silicon Oasis",
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
    name: "Chloe Dupont",
    parentName: "Jean Dupont",
    phone: "+971 54 111 2222",
    email: "jean.dupont@schneider-electric.com",
    curriculum: "A-Level",
    grade: "Grade 11",
    source: "Meta Ads",
    branch: "JVC",
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
    studentName: "Ahmed Ali",
    parentName: "Ali Hammad",
    curriculum: "IGCSE",
    grade: "Grade 10",
    branch: "Al Furjan",
    subject: "Physics",
    datetime: "Today, 16:30",
    status: "Upcoming"
  },
  {
    id: "trial-2",
    studentName: "Rohan Verma",
    parentName: "Sanjay Verma",
    curriculum: "CBSE",
    grade: "Grade 10",
    branch: "Silicon Oasis",
    subject: "Chemistry",
    datetime: "Today, 18:00",
    status: "Upcoming"
  },
  {
    id: "trial-3",
    studentName: "Karan Sharma",
    parentName: "Nitin Sharma",
    curriculum: "CBSE",
    grade: "Grade 12",
    branch: "Silicon Oasis",
    subject: "Mathematics",
    datetime: "Yesterday, 15:30",
    status: "Attended"
  },
  {
    id: "trial-4",
    studentName: "Aditya Roy",
    parentName: "Arun Roy",
    curriculum: "CBSE",
    grade: "Grade 11",
    branch: "JVC",
    subject: "Physics",
    datetime: "Today, 19:30",
    status: "Upcoming"
  },
  {
    id: "trial-5",
    studentName: "Lina Hadad",
    parentName: "Rami Hadad",
    curriculum: "IGCSE",
    grade: "Grade 10",
    branch: "Business Bay",
    subject: "Biology",
    datetime: "2026-06-15, 17:00",
    status: "Converted"
  }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-1",
    studentName: "Zayed Al-Mansoori",
    score: 96,
    grade: "Grade 11",
    type: "Merit",
    discountPct: 20,
    status: "Pending"
  },
  {
    id: "sch-2",
    studentName: "Sameer Sheikh",
    score: 84,
    grade: "Grade 12",
    type: "Need-Based",
    discountPct: 15,
    status: "Approved"
  },
  {
    id: "sch-3",
    studentName: "John Doe",
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
    studentName: "Ahmed Ali",
    parentName: "Ali Hammad",
    datetime: "2026-06-16T16:30:00",
    branch: "Al Furjan"
  },
  {
    id: "evt-2",
    title: "Parent Counseling Session",
    type: "Counseling",
    studentName: "Sara Khan",
    parentName: "Faisal Khan",
    datetime: "2026-06-16T12:00:00",
    branch: "Dubai Marina"
  },
  {
    id: "evt-3",
    title: "Trial Lesson (Chemistry)",
    type: "Trial Class",
    studentName: "Rohan Verma",
    parentName: "Sanjay Verma",
    datetime: "2026-06-16T18:00:00",
    branch: "Silicon Oasis"
  },
  {
    id: "evt-4",
    title: "Scholarship Consultation",
    type: "Consultation",
    studentName: "Zayed Al-Mansoori",
    parentName: "Hamad Al-Mansoori",
    datetime: "2026-06-17T11:30:00",
    branch: "Dubai Marina"
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-1",
    type: "lead",
    message: "New Hot Lead 'Ahmed Ali' entered via Google Ads, targeting IGCSE Physics Al Furjan.",
    user: "System GenAI",
    timestamp: "10:15 AM"
  },
  {
    id: "act-2",
    type: "trial",
    message: "Trial booking confirmed for Rohan Verma for Chemistry. Counselor assigned: Priya.",
    user: "Priya S.",
    timestamp: "09:40 AM"
  },
  {
    id: "act-3",
    type: "scholarship",
    message: "Merit scholarship request drafted for Zayed Al-Mansoori (Score: 96%). Approval pending.",
    user: "Sayed Ahmad",
    timestamp: "09:02 AM"
  },
  {
    id: "act-4",
    type: "enroll",
    message: "Mia Peterson completed admissions enrollment. Paid AED 14,000 for Business Bay (A-Level).",
    user: "Fatima Ali",
    timestamp: "Yesterday"
  },
  {
    id: "act-5",
    type: "followup",
    message: "Completed WhatsApp consultation with Ali Hammad. Ahmed Ali scheduled for Physics Trial.",
    user: "Sayed Ahmad",
    timestamp: "Yesterday"
  }
];
