import React, { useState, useEffect } from "react";
import { 
  User, 
  Brain, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Tv, 
  Video, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  Trophy, 
  AlertCircle,
  FileText, 
  DollarSign, 
  Users, 
  Calendar, 
  MessageSquare, 
  ArrowRight,
  ShieldAlert,
  Search,
  Check,
  RotateCw,
  PlusCircle,
  Send,
  Upload,
  UserCheck,
  Activity,
  ThumbsUp,
  MapPin,
  Clock3,
  Download,
  Flame,
  Info
} from "lucide-react";
import { StudentProfile, CurriculumType } from "../types";
import { getStoredPlatosPlanetConfig } from "../platosPlanetConfig";

interface StudentPortalProps {
  currentProfile: StudentProfile;
  onUpdateProfile: (p: StudentProfile) => void;
  onAwardXp: (amount: number) => void;
  soundEnabled: boolean;
  triggerNotification: (title: string, desc: string) => void;
}

// Custom Interfaces for the newly structured premium data
interface SubjectInfo {
  name: string;
  progress: number;
  masteryScore: number;
  lastTestScore: number;
  weakChapter: string;
  nextAction: string;
  predictedGrade: string;
  teacherComment: string;
}

interface ActionCardItem {
  id: string;
  title: string;
  timeRequired: string;
  priority: "High" | "Medium" | "Low";
  subject: string;
  ctaText: string;
  type: string;
}

interface FeedbackEvent {
  id: string;
  date: string;
  teacher: string;
  subject: string;
  feedback: string;
  recommendedAction: string;
}

interface AlertNotification {
  id: string;
  type: "absence" | "homework" | "test" | "fee" | "meeting";
  title: string;
  desc: string;
  severity: "critical" | "warning" | "info";
  time: string;
  actionText: string;
  dismissed: boolean;
}

export default function StudentPortal({
  currentProfile,
  onUpdateProfile,
  onAwardXp,
  soundEnabled,
  triggerNotification
}: StudentPortalProps) {
  const platosConfig = getStoredPlatosPlanetConfig();

  // Primary Role Switches: Student Workspace vs Parent Dashboard
  const [activeRole, setActiveRole] = useState<"student" | "parent">("student");
  // Curriculum Switch: IGCSE (British Standard) vs CBSE (Indian National Standard)
  const [curriculum, setCurriculum] = useState<"IGCSE" | "CBSE">("IGCSE");

  // TOAST NOTIFICATIONS STATE (In-app beautiful toast stack)
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message: string; type: "success" | "info" }>>([]);
  const addToast = (title: string, message: string, type: "success" | "info" = "success") => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // State values customized based on user's literal instructions
  const studentName = "Student 3";
  const parentName = "Parent 1";
  const location = "Dubai, UAE";
  const academicYear = "2026–27";

  // GAMIFICATION STATES
  const [studentXP, setStudentXP] = useState<number>(340);
  const [studyStreak, setStudyStreak] = useState<number>(12);
  const [leaderboardRank, setLeaderboardRank] = useState<number>(4);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(["badge-first", "badge-perfect-attendance"]);

  const [weeklyMissions, setWeeklyMissions] = useState([
    { id: "m1", title: "Complete 2 Core Subject Quizzes", done: true, points: 50 },
    { id: "m2", title: "Review Chemistry Organic Formulas via AI", done: false, points: 60 },
    { id: "m3", title: "Upload & Verify 1 Homework doubt", done: false, points: 40 }
  ]);

  // LOCAL DATABASE FOR SUBJECTS
  const [subjectsState, setSubjectsState] = useState<SubjectInfo[]>([
    {
      name: "Mathematics",
      progress: 88,
      masteryScore: 85,
      lastTestScore: 90,
      weakChapter: "Trigonometric Identities & Calculus proofs",
      nextAction: "Complete IGCSE Paper 4 Trigonometry Worksheet",
      predictedGrade: "A* (98%)",
      teacherComment: "Student 3 demonstrates exceptionally solid command of equation proof frameworks but needs slightly more promptness during dry-runs."
    },
    {
      name: "Physics",
      progress: 78,
      masteryScore: 80,
      lastTestScore: 82,
      weakChapter: "Electromagnetic Induction & Forces Variant 2",
      nextAction: "Solve 10 MCQ Practice items with Mindy AI Tutor",
      predictedGrade: "A (93%)",
      teacherComment: "Brilliant understanding of mechanics, but core electromagnetic theories require visual recall repetition."
    },
    {
      name: "Chemistry",
      progress: 82,
      masteryScore: 79,
      lastTestScore: 84,
      weakChapter: "Organic Chemistry Practice & Esters",
      nextAction: "Review Organic Synthesis flashcard stack on Plato AI",
      predictedGrade: "A (91%)",
      teacherComment: "Organic chains are accurate, though chemical state notation speeds must improve."
    },
    {
      name: "Biology",
      progress: 91,
      masteryScore: 88,
      lastTestScore: 92,
      weakChapter: "Genetic Crosses & Paper 6 Practical Methods",
      nextAction: "Verify cell division diagrams with study buddies",
      predictedGrade: "A* (96%)",
      teacherComment: "Student 3 commands biological processes with ease and writes precise examiner-friendly answers."
    },
    {
      name: "English",
      progress: 95,
      masteryScore: 92,
      lastTestScore: 94,
      weakChapter: "Complex Essay structures & reading schemas",
      nextAction: "Prepare analysis outline for descriptive prose",
      predictedGrade: "A* (97%)",
      teacherComment: "Outstanding voice and grammar maturity. She writes beautiful critical analyses."
    }
  ]);

  // EXPANDABLE DETAILS STATE
  const [expandedSubjectIndex, setExpandedSubjectIndex] = useState<number | null>(null);

  // ACTIVE RECALL / DOUBT OCR STATES
  const [doubtQuestion, setDoubtQuestion] = useState<string>("");
  const [doubtSubject, setDoubtSubject] = useState<string>("Physics");
  const [doubtFile, setDoubtFile] = useState<File | null>(null);
  const [doubtFileName, setDoubtFileName] = useState<string>("");
  const [isSolvingDoubt, setIsSolvingDoubt] = useState<boolean>(false);
  const [doubtResponse, setDoubtResponse] = useState<any | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // PLANET LEARNING JOURNEY STATE
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(3); // Starts on Mars
  const planetsList = [
    { name: "Mercury", milestone: "Foundational Formulas", xpRequired: 50, status: "completed", reward: "Formula Novice badge", desc: "Covers Core algebraic structures and NCERT science fundamentals." },
    { name: "Venus", milestone: "Mechanics & Stoichiometry", xpRequired: 120, status: "completed", reward: "Lab Wizard title", desc: "Covers core kinematics and chemical weight transformations." },
    { name: "Earth", milestone: "Cell Biology & Trigonometry", xpRequired: 200, status: "completed", reward: "Planet Balance badge", desc: "Covers basic English prose, cell cycles, and sine laws." },
    { name: "Mars", milestone: "Organic Chemistry & Calculus", xpRequired: 300, status: "active", reward: "Cosmic Element Shield", desc: "Currently revising organic ester chains & standard differentiation!" },
    { name: "Jupiter", milestone: "Advanced Wave Optics", xpRequired: 450, status: "locked", reward: "+100 XP Bonus", desc: "Locked. Requires mastering electrostatics and physical chemistry concepts." },
    { name: "Saturn", milestone: "Thermal Physics & Integration", xpRequired: 600, status: "locked", reward: "UAE Space Booster pack", desc: "Locked. Deep dive into thermal mechanics and integral calculus methods." },
    { name: "Neptune", milestone: "Genetics and Probability", xpRequired: 750, status: "locked", reward: "Infinite Wisdom insignia", desc: "Locked. Focuses on Mendel's laws and complex statistical sets." },
    { name: "Pluto", milestone: "Booster Pre-Board Mock Series", xpRequired: 900, status: "locked", reward: "Grand Master Certificate", desc: "Locked. Comprehensive exam simulation mimicking final GCSE / CBSE papers." }
  ];

  // ACTION CARDS LIST
  const actionCards: ActionCardItem[] = [
    { id: "act-1", title: "Join Live IGCSE Math Paper 4 Webinar", timeRequired: "40 mins", priority: "High", subject: "Mathematics", ctaText: "Join Webclass", type: "live" },
    { id: "act-2", title: "Resume Biology Paper 6 Recorded Session", timeRequired: "20 mins", priority: "Medium", subject: "Biology", ctaText: "Resume Class", type: "recorded" },
    { id: "act-3", title: "Verify Physics Spherical Shell Doubt with Plato AI", timeRequired: "5 mins", priority: "High", subject: "Physics", ctaText: "Solve OCR", type: "doubt" },
    { id: "act-4", title: "Launch CBSE Pre-Board Mathematics Mock", timeRequired: "60 mins", priority: "High", subject: "Mathematics", ctaText: "Enter Room", type: "test" },
    { id: "act-5", title: "Upload Organic Esters Assignment Worksheets", timeRequired: "15 mins", priority: "Medium", subject: "Chemistry", ctaText: "Submit PDF", type: "homework" },
    { id: "act-6", title: "Practice NCERT Forces Weak-Topic MCQ Drill", timeRequired: "10 mins", priority: "Low", subject: "Physics", ctaText: "Start Drill", type: "practice" }
  ];

  // EXAM PREP QUEUE WITH FILTERS
  const [examSubjectFilter, setExamSubjectFilter] = useState<string>("ALL");
  const examQueue = [
    { title: "British IGCSE Physics Variant 2 Past Paper Practice", curriculum: "IGCSE", subject: "Physics", dueDate: "June 20, 2026", difficulty: "Hard", readiness: "84%", status: "Pending", xpValue: 50 },
    { title: "CBSE Class 10 NCERT Science Term-End Chapter 4 Prep", curriculum: "CBSE", subject: "Chemistry", dueDate: "June 25, 2026", difficulty: "Medium", readiness: "91%", status: "In Progress", xpValue: 40 },
    { title: "CBSE Mathematics Board Assessment Competency Set", curriculum: "CBSE", subject: "Mathematics", dueDate: "June 18, 2026", difficulty: "Hard", readiness: "72%", status: "Pending", xpValue: 60 },
    { title: "British IGCSE English Essay Writing Assessment Mock", curriculum: "IGCSE", subject: "English", dueDate: "June 22, 2026", difficulty: "Medium", readiness: "95%", status: "Completed", xpValue: 35 },
    { title: "British IGCSE Organic Chemistry practice variant pack", curriculum: "IGCSE", subject: "Chemistry", dueDate: "June 29, 2026", difficulty: "Hard", readiness: "80%", status: "Pending", xpValue: 55 }
  ];

  // TEACHER FEEDBACK TIMELINE
  const feedbackTimeline: FeedbackEvent[] = [
    {
      id: "feed-1",
      date: "June 14, 2026",
      teacher: "Teacher 2",
      subject: "Mathematics",
      feedback: "Student 1 did extremely well in the mock calculus proofs. She has a very bright analytical mind.",
      recommendedAction: "Focus on speed drills for trigonometry variant proof structures to ensure maximum marks."
    },
    {
      id: "feed-2",
      date: "June 11, 2026",
      teacher: "Teacher 5",
      subject: "Physics",
      feedback: "Understands electrostatic field structures, though induction equations need minor study attention.",
      recommendedAction: "Watch the recommended 15-minute electromagnetism active video in Plato's student lounge."
    },
    {
      id: "feed-3",
      date: "June 08, 2026",
      teacher: "Teacher 10",
      subject: "Chemistry",
      feedback: "Excellent recall of organic structures. Ready for CBSE NCERT-based Board challenges.",
      recommendedAction: "Practice drawing high-yield ester bond formations once more on a physical whiteboard draft."
    }
  ];

  // SMART ALERT NOTIFICATIONS
  const [notifications, setNotifications] = useState<AlertNotification[]>([
    { id: "not-1", type: "absence", title: "Absence Detected - Physics 12A", desc: "Missed mock test prep due to school schedule conflict.", severity: "warning", time: "1 day ago", actionText: "Request Makeup Class", dismissed: false },
    { id: "not-2", type: "homework", title: "Chemistry Homework Overdue", desc: "Organic esters chapter assignment is pending since Wednesday.", severity: "critical", time: "2 hours ago", actionText: "Upload Homework PDF", dismissed: false },
    { id: "not-3", type: "test", title: "Test Score Dropped - Physics Field Mock", desc: "Slight dip from prior performance (82% actual vs 88% average score).", severity: "info", time: "3 days ago", actionText: "Review Wrong Answers", dismissed: false },
    { id: "not-4", type: "fee", title: "Term 2 Core Tuition Fee Due", desc: "Invoice pending due date in 12 days. (AED 1,575 standard UAE VAT inclusive).", severity: "warning", time: "Today", actionText: "Pay Online Secured", dismissed: false },
    { id: "not-5", type: "meeting", title: "1-on-1 Dubai Parent Counselor Conference Selected", desc: "Scheduled online zoom meeting with educational director.", severity: "info", time: "Scheduled: June 20 at 16:00", actionText: "Manage Meeting", dismissed: false }
  ]);

  // FEES AND BILLING HISTORY
  const [billingList, setBillingList] = useState([
    { id: "inv-2026-c1", term: "Term 1 Premium Tuition", baseAmount: 1500, vat: 75, status: "Paid", datePaid: "May 01, 2026", receiptRequested: true },
    { id: "inv-2026-c2", term: "Term 2 Board Booster Class Pack", baseAmount: 1500, vat: 75, status: "Unpaid", datePaid: "-", receiptRequested: false }
  ]);

  // MODAL OVERLAYS STATE MANAGER
  const [activeModal, setActiveModal] = useState<"ai-coach" | "book-meeting" | "pay-fees" | "upload-doubt" | "report-card" | null>(null);

  // REUSABLE INPUT STATES for modals
  const [selectedTeacher, setSelectedTeacher] = useState<string>("Teacher 2 (Mathematics)");
  const [meetingDate, setMeetingDate] = useState<string>("2026-06-20");
  const [meetingTime, setMeetingTime] = useState<string>("16:00");
  const [meetingNote, setMeetingNote] = useState<string>("");

  const [cardHolder, setCardHolder] = useState<string>("Parent 1");
  const [cardNumber, setCardNumber] = useState<string>("4000 1234 5678 9010");
  const [isPayingProcess, setIsPayingProcess] = useState<boolean>(false);

  const [aiCoachPrompt, setAiCoachPrompt] = useState<string>("");
  const [aiCoachHistory, setAiCoachHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "How can I assist you with your IGCSE / CBSE revision today? I can solve physics equations, check organic chem chains, or prepare descriptive English outlines!" }
  ]);
  const [isGeneratingAiCoachMsg, setIsGeneratingAiCoachMsg] = useState<boolean>(false);

  // Trigger Local Notification for parent/student
  const localNotify = (title: string, desc: string) => {
    triggerNotification(title, desc);
    addToast(title, desc, "info");
  };

  // HANDLERS
  const handlePlanetProgress = (idx: number) => {
    setSelectedPlanetIndex(idx);
    const planet = planetsList[idx];
    if (planet.status === "completed") {
      addToast("🪐 Milestone Selected", `Reviewing progress for ${planet.name}: ${planet.milestone}`);
    } else {
      setActivePlanetRewardClaim(idx);
    }
  };

  const [activePlanetRewardClaim, setActivePlanetRewardClaim] = useState<number | null>(null);

  const claimPlanetBonus = (idx: number) => {
    const planet = planetsList[idx];
    addToast("🎁 Reward Claimed!", `You unlocked the ${planet.reward} milestone reward and earned 100 XP!`, "success");
    setStudentXP(prev => prev + 100);
    onAwardXp(100);
    localNotify("🏆 XP Awarded", `Added +100 XP to ${studentName}'s profile for reaching station ${planet.name}!`);
    setActivePlanetRewardClaim(null);
  };

  // DRAG & DROP MULTI-DEVICE SUPPORT
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setDoubtFile(droppedFile);
      setDoubtFileName(droppedFile.name);
      addToast("📂 Document Dropped", `Staged ${droppedFile.name} successfully for AI OCR solver diagnostics.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setDoubtFile(selected);
      setDoubtFileName(selected.name);
      addToast("📂 File Uploaded", `Loaded ${selected.name} for doubt solving.`);
    }
  };

  const solveDoubtTrigger = () => {
    if (!doubtQuestion && !doubtFile) {
      addToast("⚠️ Input Required", "Please type a challenge question or upload an image/PDF first.", "info");
      return;
    }
    setIsSolvingDoubt(true);
    setTimeout(() => {
      setIsSolvingDoubt(false);
      setStudentXP(prev => prev + 30);
      onAwardXp(30);
      setDoubtResponse({
        question: doubtQuestion || `Doubt scanned from file: ${doubtFileName}`,
        steps: [
          `Identify core constants: Subject: ${doubtSubject}. Scoped in Dubai Academic Year ${academicYear}.`,
          `Formulate theoretical layout using standard British / CBSE marking criteria.`,
          `Resolution Step 1: Isolate the force scalar variables horizontally along the vector paths.`,
          `Resolution Step 2: Integrate terms using calculus power structures to calculate continuous net field state.`,
          `Final verified outcome: Realised score yield of 4.5 N / complete balanced derivative form.`
        ],
        practiceQuests: [
          `Compare the force fields in standard Physics Variant Paper 2 formats.`,
          `Calculate NCERT Science competency Chapter 4 class proofs.`
        ]
      });
      addToast("🧠 AI Doubt Resolved", "Earned +30 XP! Step-by-step solution compiled.", "success");
      localNotify("🎯 Level Progress Boosted", `${studentName} solved her homework doubt using Plato's AI Solver and unlocked +30 XP!`);
    }, 2000);
  };

  // SEND AI MESSAGE
  const sendAiCoachMessage = () => {
    if (!aiCoachPrompt.trim()) return;
    const userMsg = aiCoachPrompt;
    setAiCoachHistory(prev => [...prev, { sender: "user", text: userMsg }]);
    setAiCoachPrompt("");
    setIsGeneratingAiCoachMsg(true);

    setTimeout(() => {
      setIsGeneratingAiCoachMsg(false);
      let reply = "";
      if (userMsg.toLowerCase().includes("math") || userMsg.toLowerCase().includes("calculus")) {
        reply = "For British Mathematics Paper 4 calculus proofs: Always state the boundary constraints. Remember, the derivative f'(x) determines local gradients, while the definite integral models area density under IGCSE curves. Try practicing similar variant 2 sets!";
      } else if (userMsg.toLowerCase().includes("physic") || userMsg.toLowerCase().includes("optics")) {
        reply = "Physics variant tests require you to define vector forces first. Under CBSE specifications, NCERT chapter 10 models focal lengths as f = R/2. Keep units strictly as metric SI scalars to score maximum points!";
      } else {
        reply = "That is a brilliant exploration! Let's schedule a diagnostic mock task on this topic. Practice makes perfect. Don't forget that you can also check out our student reference logs inside the Library tab anytime.";
      }
      setAiCoachHistory(prev => [...prev, { sender: "ai", text: reply }]);
      addToast("💡 AI Mentor Advice", "Plato AI study advice received.");
    }, 1200);
  };

  // MEETING SUBMIT
  const handleConfirmMeeting = () => {
    addToast("📅 Counselor Booking Submitted", `Meeting scheduled with ${selectedTeacher} on ${meetingDate} at ${meetingTime}. Check WhatsApp or email for confirmations.`, "success");
    localNotify("📅 Parent Consultation Scheduled", `Parent-Teacher feedback slot reserved for June 20 at ${platosConfig.officialBranches[0] || 'Main Branch'} campus.`);
    
    // update parent notifications
    setNotifications(prev => prev.map(n => n.type === "meeting" ? { ...n, title: `Meeting Confirmed: ${selectedTeacher}`, desc: `Scheduled: ${meetingDate} at ${meetingTime} - GCC Standard Time.`, severity: "info" } : n));
    setActiveModal(null);
  };

  // FEES TRANSACTION
  const handlePaymentSubmit = () => {
    setIsPayingProcess(true);
    setTimeout(() => {
      setIsPayingProcess(false);
      setBillingList(prev => prev.map(b => b.status === "Unpaid" ? { ...b, status: "Paid", datePaid: new Date().toLocaleDateString() } : b));
      addToast("💳 Fee Paid Successfully", "AED 1,575 transaction cleared via secured Stripe checkout. Receipt issued.", "success");
      localNotify(`🧾 ${platosConfig.officialBranches[0] || 'Main Campus'} Fees Cleared`, "Parent 1 processed standard GCSE/IGCSE/CBSE Term Tuition fee + local VAT. Ledger updated.");
      setNotifications(prev => prev.filter(n => n.type !== "fee"));
      setActiveModal(null);
    }, 2000);
  };

  // DOWNLOAD SIMULATED INVOICE
  const downloadSimulatedInvoice = (invoiceId: string, term: string, base: number, vat: number) => {
    const textBlob = `
========================================
     PLATO'S PLANET TUITION CENTER
       DUBAI, UNITED ARAB EMIRATES
========================================
INVOICE REFERENCE: ${invoiceId}
DATE: June 16, 2026
ACADEMIC YEAR: ${academicYear}
BRANCH LOCATION: ${platosConfig.officialBranches[0] || 'Main Campus'}
STUDENT REFERENCE: ${studentName}
PARENT GUARDIAN: ${parentName}

BILLING SUMMARY:
----------------------------------------
Item Description: ${term}
Base Course Fee: AED ${base.toFixed(2)}
Standard UAE VAT (5%): AED ${vat.toFixed(2)}
TOTAL CHARGE: AED ${(base + vat).toFixed(2)}
STATUS: CLEAR / PAID SECURELY
----------------------------------------
Thank you for enrolling at Plato's Planet. 
Providing elite CBSE & IGCSE booster scores!
========================================
    `;
    const element = document.createElement("a");
    const file = new Blob([textBlob], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${invoiceId}-PlatoInvoice.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast("📥 Invoice Downloaded", "Plato UAE tax compliant statement downloaded successfully.");
  };

  // APPROVE MAKEUP CLASS
  const handleApproveMakeup = (alertId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== alertId));
    addToast("✅ Makeup Approved", "Makeup class with Cambridge assessor schedule added.", "success");
    localNotify("📅 Attendance Slot Updated", "Approved Physics 12A makeup slot for Tuesday 17:30. SMS sent.");
  };

  return (
    <div id="student-portal-wrapper" className="min-h-screen bg-slate-950 text-slate-100 p-2 sm:p-4 md:p-6 font-sans relative">
      
      {/* Visual background lights */}
      <div className="absolute top-24 left-10 w-72 h-72 bg-gradient-to-tr from-brand-blue/10 to-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-10 w-80 h-80 bg-gradient-to-tr from-red-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* FIXED TOAST STACK */}
      <div className="fixed bottom-18 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className="p-3 bg-slate-900 border-l-4 border-l-brand-yellow border border-slate-800 rounded-lg shadow-xl flex items-start gap-2.5 animate-slide-in"
          >
            <div className="flex-1">
              <div className="text-[11px] font-black uppercase text-brand-yellow flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {t.title}
              </div>
              <p className="text-[10px] text-slate-350 leading-normal mt-0.5">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PREMIUM NAVIGATION SWITCHER */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
            <User className="text-brand-yellow w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">ACADEMIC HUB</span>
            <h1 className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
              <span>Plato's Dubai Digital Campus</span>
              <span className="text-[9.5px] bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded-full">
                {academicYear}
              </span>
            </h1>
          </div>
        </div>

        {/* CONTROLS AREA WITH ROLE SWITCHER & CURRICULUM TOGGLE */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* ROLE SWITCHER */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveRole("student");
                localNotify("🎓 Role Switched", "Currently viewing Student portal dashboard workspace.");
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                activeRole === "student"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student (${studentName})</span>
            </button>
            <button
              onClick={() => {
                setActiveRole("parent");
                localNotify("👨‍👩‍👧 Role Switched", "Currently viewing Parent tracking center.");
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                activeRole === "parent"
                  ? "bg-brand-yellow text-slate-950 shadow-lg font-black"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Parent (Mr. Kabir)</span>
            </button>
          </div>

          {/* CURRICULUM TOGGLER */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center w-full sm:w-auto">
            <button
              onClick={() => {
                setCurriculum("IGCSE");
                addToast("🇬🇧 Cambridge Select", "Curriculum switched to British IGCSE Paper standard.");
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider duration-150 ${
                curriculum === "IGCSE"
                  ? "bg-rose-950/80 border border-brand-red text-brand-red"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              British IGCSE
            </button>
            <button
              onClick={() => {
                setCurriculum("CBSE");
                addToast("🇮🇳 Board Standard Select", "Curriculum switched to Indian CBSE syllabus.");
              }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider duration-150 ${
                curriculum === "CBSE"
                  ? "bg-teal-950/80 border border-emerald-500 text-emerald-450"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              CBSE Boards
            </button>
          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/*            STUDENT WORKSPACE AREA          */}
      {/* ========================================== */}
      {activeRole === "student" && (
        <div id="student-workspace-view" className="space-y-6 animate-fade-in">
          
          {/* SECTION 1: HERO LEARNING PANEL */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-at-tr from-brand-yellow/10 via-transparent to-transparent pointer-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-brand-yellow" /> Daily Quest Space
                </span>
                
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-100 leading-tight">
                    Marhaban, <span className="bg-gradient-to-r from-brand-yellow via-rose-455 to-sky-400 text-transparent bg-clip-text font-black">{studentName}!</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Academic Goal for today: <strong className="text-slate-200">Solve Organic Synthesis chains & Calculus Variant 2 papers</strong>
                  </p>
                </div>

                {/* Sub Metadata Strip */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-450 border-t border-slate-850 pt-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" /> Syllabus: {curriculum === "IGCSE" ? "British Extended IGCSE" : "CBSE Grade 10 Boor"}
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-slate-500" /> Exam Readiness Score: <strong className="text-emerald-400">84% Gold</strong>
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Campus: {location}
                  </span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-850 flex items-start gap-2.5 max-w-2xl">
                  <Brain className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow block">Plato AI Action Plan</span>
                    <p className="text-[10.5px] text-slate-300 leading-relaxed">
                      "Optics refraction formulas have shown a 12% comprehension dip. Practice the Class 10/IGCSE Optics MCQ Challenge right now to secure +25 XP and stabilize your streak rating!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Exam countdown & summary widgets */}
              <div className="lg:col-span-4 bg-slate-950 p-4 border border-slate-800 rounded-2xl space-y-3 shadow-inner">
                <div className="text-center pb-2 border-b border-slate-900">
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">BOARD COUNTDOWN</span>
                  <span className="text-2xl font-black text-rose-500 font-mono">48 Days Left</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">{curriculum === "IGCSE" ? "Cambridge Board Autumn Series" : "CBSE Class 10 Finals"}</span>
                </div>
                
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Currently Subscribed Subjects:</span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {subjectsState.map(s => (
                      <span key={s.name} className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-850 text-[10px] text-slate-300 font-semibold font-mono">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: INTERACTIVE PLANET LEARNING JOURNEY */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-5 h-5 text-brand-yellow" />
                  <span>Plato's Planet Orbit Learning Map</span>
                </h3>
                <p className="text-[11px] text-slate-450">
                  Simulated multi-stage revision roadmap. Advance through space coordinates as you practice CBSE & IGCSE mock sheets!
                </p>
              </div>
              <span className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-brand-yellow font-mono font-bold shrink-0">
                Current Space Station: Mars
              </span>
            </div>

            {/* Simulated Map Nodes */}
            <div className="relative py-4 overflow-x-auto select-none no-scrollbar">
              
              {/* Connected Line Background */}
              <div className="absolute top-1/2 left-2 right-2 h-1 bg-gradient-to-r from-emerald-500 via-brand-yellow to-slate-800 -translate-y-1/2 z-0 rounded-full" />

              <div className="flex justify-between min-w-[700px] px-4 relative z-10 gap-2">
                {planetsList.map((pl, idx) => {
                  const isCur = idx === selectedPlanetIndex;
                  const isComp = pl.status === "completed";
                  const isLock = pl.status === "locked";

                  return (
                    <button
                      key={pl.name}
                      onClick={() => handlePlanetProgress(idx)}
                      className={`relative flex flex-col items-center gap-2 max-w-[85px] cursor-pointer focus:outline-none transition-transform duration-150 hover:scale-105 ${
                        isCur ? "z-20" : ""
                      }`}
                    >
                      {/* Planet visual shape representation */}
                      <div 
                        className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCur 
                            ? "bg-slate-900 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] text-rose-400" 
                            : isComp
                            ? "bg-slate-950 border-emerald-400 text-emerald-400"
                            : "bg-slate-950 border-slate-800 text-slate-600"
                        }`}
                      >
                        {isComp ? (
                          <CheckCircle className="w-5 h-5 fill-emerald-500/10" />
                        ) : isCur ? (
                          <Sparkles className="w-5 h-5 text-brand-yellow animate-spin" style={{ animationDuration: "5s" }} />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>

                      {/* Name & Milestone tag info */}
                      <div className="text-center">
                        <span className={`text-[10px] font-black block leading-none ${isCur ? "text-rose-455 font-bold animate-pulse" : isComp ? "text-slate-300" : "text-slate-500"}`}>
                          {pl.name}
                        </span>
                        <span className="text-[8px] font-mono text-slate-450 block truncate max-w-[80px] mt-0.5 leading-none">
                          {pl.milestone}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Dynamic Planet details inspector card */}
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left flex-1">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wide">
                  Station {selectedPlanetIndex + 1}: {planetsList[selectedPlanetIndex].name}
                </span>
                <h4 className="text-xs font-bold text-slate-200 mt-1">
                  Revision Milestone: <span className="text-brand-yellow">{planetsList[selectedPlanetIndex].milestone}</span>
                </h4>
                <p className="text-[10.5px] text-slate-400 italic">
                  "{planetsList[selectedPlanetIndex].desc}"
                </p>
                <div className="text-[9.5px] text-slate-500 font-mono pt-1">
                  Station Reward Target: <strong className="text-sky-400 font-black">{planetsList[selectedPlanetIndex].reward}</strong>
                </div>
              </div>

              <div className="shrink-0">
                {planetsList[selectedPlanetIndex].status === "locked" ? (
                  <button 
                    onClick={() => claimPlanetBonus(selectedPlanetIndex)}
                    className="px-4 py-2 bg-gradient-to-r from-brand-yellow to-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-xl hover:shadow-lg transition-all"
                  >
                    Simulator Force-Unlock Task
                  </button>
                ) : (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Milestone Completed
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* GRID: ACTIONS AND SUBJECTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: ACTIONS & DOUBTS MODULE (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TODAY'S LEARNING TASKS */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Clock3 className="w-4 h-4 text-rose-500" />
                    <span>{studentName}'s Today Action Tasks</span>
                  </h3>
                  <span className="text-[10px] text-slate-500">6 high priority revisions listed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {actionCards.map(act => (
                    <div 
                      key={act.id} 
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col justify-between gap-3 shadow-md hover:shadow-lg transition-all duration-150"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[9px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-350 border border-slate-850">
                            {act.subject}
                          </span>
                          <span className={`font-bold px-1.5 rounded ${
                            act.priority === "High" 
                              ? "bg-red-500/10 text-red-400" 
                              : act.priority === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-slate-800 text-slate-400"
                          }`}>
                            {act.priority} Unit
                          </span>
                        </div>

                        <h4 className="text-[11.5px] font-bold text-slate-200 leading-tight">
                          {act.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-[9.5px] text-slate-450 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" /> Estimated: <span className="text-slate-300">{act.timeRequired}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          if (act.type === "doubt") {
                            const el = document.getElementById("doubt-solver-anchor");
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            addToast("🔍 Doubts Scanner Active", "Scrolled to OCR doubt submission zone!");
                          } else if (act.type === "live") {
                            addToast("🚀 Direct Webinar Webinar", "Connecting to live Cisco WebClass server node code...");
                          } else if (act.type === "test") {
                            addToast("📋 Entering Lobby", "Loading secured lock browser engine for board mockup...");
                          } else {
                            addToast("📥 Resource Loaded", `Access unit scheduled successfully for ${act.subject}`);
                          }
                        }}
                        className="w-full py-2 bg-slate-950 hover:bg-slate-850 text-[10px] font-bold uppercase tracking-wider text-brand-yellow rounded-xl border border-slate-850 hover:border-brand-yellow/30 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>{act.ctaText}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-brand-yellow" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTEGRATED INTERACTIVE DOUBT SOLVER AREA */}
              <div id="doubt-solver-anchor" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <div>
                  <h3 className="text-sm font-black uppercase text-slate-250 tracking-wider flex items-center gap-1.5">
                    <Brain className="w-5 h-5 text-indigo-400" />
                    <span>Plato Doubt Solver Scanner OCR</span>
                  </h3>
                  <p className="text-[10.5px] text-slate-400">
                    Snap an image of CBSE mathematics or IGCSE organic equations of past papers, choose your subject, and hit Solve to get immediate detailed solutions!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-slate-450 block">Select Subject:</label>
                      <select 
                        value={doubtSubject}
                        onChange={(e) => setDoubtSubject(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 p-2.5 rounded-xl focus:border-brand-yellow"
                      >
                        <option value="Physics">Physics Variant 2 / CBSE Mechanics</option>
                        <option value="Chemistry">Organic Chemistry chains / CBSE NCERT</option>
                        <option value="Mathematics">IGCSE Calculus Paper 4 / Algebra</option>
                        <option value="Biology">Genetic Crosses Paper 6 Practical</option>
                        <option value="English">Critical descriptive prose themes</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-slate-450 block">Or Type Your Question:</label>
                      <textarea
                        value={doubtQuestion}
                        onChange={(e) => setDoubtQuestion(e.target.value)}
                        placeholder="e.g., Prove why f'(x) of x^3 + 5x is 3x^2 + 5 using definition limits..."
                        rows={2.5}
                        className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 p-2.5 rounded-xl focus:border-brand-yellow placeholder-slate-700"
                      />
                    </div>

                    {/* Drag and Drop Zone */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        dragActive 
                          ? "border-brand-yellow bg-slate-950/50" 
                          : doubtFile 
                          ? "border-emerald-500 bg-emerald-500/5" 
                          : "border-slate-800 hover:border-slate-700 bg-slate-950"
                      }`}
                    >
                      <input 
                        type="file" 
                        id="doubt-file-upload" 
                        className="hidden" 
                        accept="image/*,.pdf" 
                        onChange={handleFileChange} 
                      />
                      <label htmlFor="doubt-file-upload" className="cursor-pointer space-y-1 flex flex-col items-center">
                        <Upload className={`w-6 h-6 ${doubtFile ? "text-emerald-400" : "text-indigo-400 animate-pulse"}`} />
                        <span className="text-[10px] font-semibold text-slate-300 block">
                          {doubtFile ? "Change file" : "Drag-and-drop Image/PDF or Click to Browse"}
                        </span>
                        <span className="text-[8.5px] text-slate-500 block">Supports high-fidelity snaps & worksheets</span>
                      </label>
                    </div>

                    {doubtFileName && (
                      <div className="flex items-center justify-between bg-slate-950 p-2 border border-slate-850 rounded-lg text-[9px] font-mono pr-3">
                        <span className="text-emerald-400 truncate max-w-[200px]">{doubtFileName}</span>
                        <button 
                          onClick={() => { setDoubtFile(null); setDoubtFileName(""); }}
                          className="text-red-400 hover:text-red-300"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={solveDoubtTrigger}
                      disabled={isSolvingDoubt}
                      className="w-full py-2.5 bg-gradient-to-r from-brand-blue to-indigo-650 hover:from-brand-blue-dark hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      {isSolvingDoubt ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          <span>Mindy OCR Processing...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 text-white" />
                          <span>AI Solve doubt</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Results box */}
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9.5px] text-indigo-400 font-mono uppercase tracking-widest block font-bold mb-2">Step-by-Step AI Solutions output</span>
                      {doubtResponse ? (
                        <div className="space-y-3">
                          <p className="text-[10.5px] text-slate-200 font-black italic">
                            "{doubtResponse.question}"
                          </p>
                          <div className="space-y-1.5 text-[10px] text-slate-350">
                            {doubtResponse.steps.map((st: string, sIdx: number) => (
                              <div key={sIdx} className="flex gap-1.5 items-start">
                                <span className="text-brand-yellow font-black">✔</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 flex flex-col items-center justify-center text-center space-y-2 text-slate-650 select-none">
                          <HelpCircle className="w-10 h-10 text-slate-800" />
                          <p className="text-[10.5px]">No doubts resolved yet in current active session.</p>
                          <span className="text-[9px] max-w-[180px]">Submit an organic molecule equation or math proof on the left for diagnostic step breakdowns.</span>
                        </div>
                      )}
                    </div>

                    {doubtResponse && (
                      <div className="border-t border-slate-900 pt-3 mt-3">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">RECOMMENDED ADDITIONAL TRIALS:</span>
                        <div className="flex gap-1 pt-1.5 overflow-x-auto no-scrollbar">
                          {doubtResponse.practiceQuests.map((pQ: string, pIdx: number) => (
                            <button 
                              key={pIdx}
                              onClick={() => { setDoubtQuestion(pQ); addToast("🔬 Study Prompt Selected", "Question pasted successfully."); }}
                              className="px-2 py-1 bg-slate-900 border border-slate-850 rounded text-[9px] hover:border-brand-yellow/30 text-indigo-300 max-w-[150px] truncate"
                            >
                              {pQ}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR: LEVEL, BADGES & SUBJECT MASTERY (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* GAMIFICATION STATS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#F59E0B] block">LEVEL STATS</span>
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div>
                    <span className="text-2xl font-black text-brand-yellow font-mono">{studentXP}</span>
                    <span className="text-[10px] text-slate-450 block font-mono">Planetary XP points</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400 font-mono">#{leaderboardRank}</span>
                    <span className="text-[10px] text-slate-450 block font-mono">Rank: Dubai Campus</span>
                  </div>
                </div>

                {/* Progress bar to target Burj peak height (828 XP points!) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Burj Peak Milestone: 828 XP</span>
                    <span>{Math.round((studentXP / 828) * 100)}% Clear</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
                    <div className="bg-gradient-to-r from-brand-yellow to-emerald-400 h-2 rounded-full" style={{ width: `${Math.min(100, (studentXP / 828) * 100)}%` }} />
                  </div>
                </div>

                {/* STUDY STREAK */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                    <div>
                      <span className="text-[10px] text-slate-450 block">Streak Power</span>
                      <strong className="text-slate-100 font-bold text-xs">{studyStreak} Days Active</strong>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setStudyStreak(prev => prev + 1);
                      addToast("🔥 Streak Maintained", "You checked into Plato's hub class and extended your study streak count!");
                    }}
                    className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[9px] rounded-lg border border-slate-800 transition-all cursor-pointer"
                  >
                    Check In
                  </button>
                </div>

                {/* WEEKLY MISSIONS */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">This Week's Space Missions:</h4>
                  <div className="space-y-1.5 text-[10px]">
                    {weeklyMissions.map(m => (
                      <div key={m.id} className="flex justify-between items-center p-2 bg-slate-950/80 rounded-xl border border-slate-850/60">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className={`w-3.5 h-3.5 ${m.done ? "text-emerald-400 fill-emerald-500/10" : "text-slate-600"}`} />
                          <span className={m.done ? "text-slate-500 line-through" : "text-slate-300"}>{m.title}</span>
                        </div>
                        <span className="text-indigo-400 font-mono text-[9px] shrink-0 font-bold">+{m.points} XP</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* STUDY COACH WIDGET */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-4.5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-bold tracking-wide">
                    COACH ADVICE
                  </span>
                  <span className="text-[10.5px] text-emerald-400 font-mono font-black">+12% Predicted Gain</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-slate-200">Recommended Next Steps for {studentName}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Based on mock paper variant errors, we advise targeting:
                  </p>
                  <ul className="text-[10px] text-slate-300 space-y-1">
                    <li className="flex gap-1.5 items-start">
                      <span className="text-brand-yellow font-black">•</span>
                      <span>Review Electromagnetic variants (Physics test card pending)</span>
                    </li>
                    <li className="flex gap-1.5 items-start">
                      <span className="text-brand-yellow font-black">•</span>
                      <span>Practice organic chemistry esters and bonds representation sheet</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    addToast("🤖 Plato Coach Loaded", "Opening standard Plato Chat Mentor drawer!");
                    setAiCoachHistory([
                      { sender: "ai", text: `Assalamu Alaikum! I am Plato's AI Tutor. I see that ${studentName} is currently working through British IGCSE and NCERT boards in ${location}. Tell me what chapter you want help with!` }
                    ]);
                    setActiveModal("ai-coach");
                  }}
                  className="w-full py-2 bg-indigo-650 hover:bg-indigo-600 text-[10px] text-white uppercase tracking-widest font-extrabold rounded-xl transition-all shadow-md mt-1 flex items-center justify-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5 text-white" />
                  <span>Ask Plato Coach AI</span>
                </button>
              </div>

            </div>

          </div>

          {/* SECTION 4: EXAM PREPARATION QUEUE */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-850 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Interactive Exam Preparation Queue</span>
                </h3>
                <p className="text-[11px] text-slate-450">
                  Targeted past papers, एनसीईआरटी chapter competency sets, and specimen variant checklists.
                </p>
              </div>

              {/* Queue Filters */}
              <div className="flex gap-1 flex-wrap">
                {["ALL", "Physics", "Chemistry", "Mathematics", "Biology", "English"].map(subj => (
                  <button
                    key={subj}
                    onClick={() => setExamSubjectFilter(subj)}
                    className={`px-3 py-1 rounded-lg text-[9.5px] font-bold duration-150 ${
                      examSubjectFilter === subj 
                        ? "bg-brand-blue text-white shadow-md border border-brand-blue-dark/50" 
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* List items */}
            <div className="space-y-2">
              {examQueue
                .filter(eq => examSubjectFilter === "ALL" || eq.subject === examSubjectFilter)
                .map((eq, qIdx) => (
                  <div 
                    key={qIdx}
                    className="p-3.5 bg-slate-950 border border-slate-850 rounded-2xl hover:border-slate-800 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
                  >
                    <div className="space-y-1 w-full sm:flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded font-mono text-[8px] font-bold ${
                          eq.curriculum === "IGCSE" ? "bg-rose-950/80 text-brand-red" : "bg-teal-950/80 text-emerald-450"
                        }`}>
                          {eq.curriculum} Unit
                        </span>
                        <span className="text-[9.5px] text-slate-500 font-mono">Due date: {eq.dueDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 leading-snug">{eq.title}</h4>
                      
                      <div className="flex items-center gap-3 text-[9.5px] text-slate-450 font-mono">
                        <span>Readiness Rank: <strong className="text-brand-yellow font-black">{eq.readiness}</strong></span>
                        <span>•</span>
                        <span>Challenge: <strong className="text-slate-300">{eq.difficulty}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-start">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold shrink-0">+{eq.xpValue} XP Award</span>
                      <button 
                        onClick={() => {
                          setStudentXP(prev => prev + eq.xpValue);
                          onAwardXp(eq.xpValue);
                          addToast("🎯 Specimen Sheet Opened", `Loading BoardSpecimen: ${eq.title}. Earned +${eq.xpValue} XP!`, "success");
                          localNotify("📊 Board Mock Activated", `${studentName} initialized past paper workspace: ${eq.title}`);
                        }}
                        className="p-1 px-3.5 bg-slate-900 border border-slate-800 hover:border-brand-yellow/30 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                      >
                        {eq.status === "Completed" ? "Review Mock" : "Start Task"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* SECTION 5: SUBJECT MASTERY DASHBOARD */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-black uppercase text-slate-200 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-indigo-450" />
                <span>{studentName}'s Subject Mastery & Feedback</span>
              </h3>
              <p className="text-[11px] text-slate-450">
                Live board-aligned grade tracking. Expand to read core teacher notes and specialized Dubai counselor advice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjectsState.map((subj, sIdx) => {
                const isExpanded = expandedSubjectIndex === sIdx;
                return (
                  <div 
                    key={subj.name}
                    className="p-4 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl transition-all flex flex-col justify-between gap-3 text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-100">{subj.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.2 rounded border border-[#F59E0B]/10">
                          {subj.predictedGrade}
                        </span>
                      </div>

                      {/* Mini progress bar */}
                      <div className="space-y-1 font-mono">
                        <div className="flex items-center justify-between text-[9px] text-slate-500">
                          <span>Syllabus Mastered</span>
                          <span>{subj.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-1.5 rounded-full" style={{ width: `${subj.progress}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9.5px] text-slate-450 font-mono">
                        <span>Mastery score: {subj.masteryScore}</span>
                        <span>Last Quiz score: {subj.lastTestScore}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedSubjectIndex(isExpanded ? null : sIdx)}
                      className="w-full py-1.5 bg-slate-900 text-slate-400 hover:text-slate-200 text-[9px] font-semibold uppercase tracking-wider rounded-lg text-center"
                    >
                      {isExpanded ? "Hide detailed analytics ▲" : "View diagnostic feedback ▼"}
                    </button>

                    {isExpanded && (
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850 text-[10px] space-y-1.5 animate-slide-in mt-1">
                        <div>
                          <strong className="text-brand-yellow font-extrabold block uppercase text-[8px] font-mono tracking-wider">Weak Chapters focus:</strong>
                          <span className="text-slate-350">{subj.weakChapter}</span>
                        </div>
                        <div>
                          <strong className="text-brand-yellow font-extrabold block uppercase text-[8px] font-mono tracking-wider">Teacher remarks:</strong>
                          <span className="text-slate-400 italic">"{subj.teacherComment}"</span>
                        </div>
                        <div>
                          <strong className="text-brand-blue block uppercase text-[8px] font-mono tracking-wider">Recommended Parent action:</strong>
                          <span className="text-indigo-300">{subj.nextAction}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/*             PARENT WORKSPACE AREA          */}
      {/* ========================================== */}
      {activeRole === "parent" && (
        <div id="parent-tracking-view" className="space-y-6 animate-fade-in text-left">
          
          {/* SECTION 1: CHILD SUCCESS SNAPSHOT */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-at-tr from-rose-500/5 via-transparent to-transparent pointer-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/15 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase">
                  <UserCheck className="w-3.5 h-3.5 text-[#10B981]" /> Unified Diagnostic Space
                </span>

                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                    Parent Workspace: <span className="text-brand-yellow">{parentName}</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time academic outcomes tracking for: <strong className="text-emerald-400">{studentName}</strong> • Grade 10 • Location: Dubai Campus
                  </p>
                </div>

                {/* AI GENERATED PARENT BRIEF */}
                <div className="p-3.5 bg-[#F59E0B]/5 rounded-2xl border border-[#F59E0B]/15 max-w-3xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#F59E0B] font-black uppercase tracking-widest font-mono">
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                    <span>Plato AI Hub Parent Briefing note</span>
                  </div>
                  <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans">
                    "{studentName} is showing exceptional resilience in Mathematics proofs and Physics. Chemistry Organic Synthesis requires a 20-minute active recall booster this weekend to raise the confidence index to Gold Level."
                  </p>
                </div>
              </div>

              {/* ACADEMIC HEALTH SCORE MODULE */}
              <div className="lg:col-span-4 bg-slate-950 p-4 border border-slate-800 rounded-2xl space-y-3.5 text-center shadow-inner">
                <span className="text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-widest block">ACADEMIC HEALTH GRADE</span>
                
                {/* Visual Ring Gauge */}
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-900" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent border-r-transparent animate-spin" style={{ animationDuration: "12s" }} />
                  <div className="text-center z-10">
                    <span className="text-2xl font-black text-emerald-400 block font-mono">92/100</span>
                    <span className="text-[8.5px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded">EXCELLENT</span>
                  </div>
                </div>

                <p className="text-[9.5px] text-slate-400 leading-normal font-sans">
                  Compiled from attendance checks, continuous exam homework submissions, and recent board past papers.
                </p>
              </div>

            </div>
          </div>

          {/* PARENT INTUITIVE NOTIFICATIONS FEED */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#F59E0B] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                <span>Plato Smart Alert Notifications feed</span>
              </h3>
              <span className="text-[10px] text-slate-500">Action items require parental review</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notifications.map(n => (
                <div 
                  key={n.id}
                  className={`p-3.5 border rounded-2xl flex flex-col justify-between gap-3 text-left transition-all ${
                    n.severity === "critical" 
                      ? "bg-rose-950/20 border-rose-500/30" 
                      : n.severity === "warning"
                      ? "bg-amber-950/20 border-amber-550/30"
                      : "bg-slate-950 border-slate-850"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className={`px-2 py-0.2 rounded uppercase ${
                        n.severity === "critical" 
                          ? "bg-rose-500/15 text-rose-400" 
                          : n.severity === "warning" 
                          ? "bg-amber-500/15 text-amber-400" 
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {n.severity} Alert
                      </span>
                      <span className="text-slate-500">{n.time}</span>
                    </div>

                    <h4 className="text-[11px] font-bold text-slate-205 leading-snug">{n.title}</h4>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{n.desc}</p>
                  </div>

                  <button 
                    onClick={() => {
                      if (n.type === "absence") {
                        handleApproveMakeup(n.id);
                      } else if (n.type === "homework") {
                        setActiveRole("student");
                        const el = document.getElementById("doubt-solver-anchor");
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        addToast("📂 Homework Workspace Active", "Switched role for target doc upload.");
                      } else if (n.type === "fee") {
                        setActiveModal("pay-fees");
                      } else {
                        addToast("🧠 Feedback Requested", "Connecting to parent advisor code console...");
                      }
                    }}
                    className="w-full py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-[10px] font-mono font-bold text-brand-yellow rounded-xl text-center"
                  >
                    {n.actionText} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PARENT VALUE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-3xl space-y-3.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-black text-slate-200">
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-emerald-400" /> Learning Progress</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded text-[10px]">84% Done</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                {studentName} completed 14 core mathematics and chemistry modules this month. Specimen mock indices are strong.
              </p>
              <button 
                onClick={() => addToast("📥 Report Generation", "Academic tracking worksheet compiled.")}
                className="w-full py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-lg text-[10px] font-bold text-brand-yellow"
              >
                Detailed Progress Report
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-3xl space-y-3.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-black text-slate-200">
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-brand-blue" /> Attendance status</span>
                <span className="text-[#3b82f6] bg-[#3b82f6]/10 px-1.5 py-0.2 rounded text-[10px]">98% Present</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Consistent attendance monitored inside Dubai outlet. Confirms streak loop objectives.
              </p>
              <button 
                onClick={() => addToast("📋 Attendance Log", "Absence, biometric logs verified with server.")}
                className="w-full py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-lg text-[10px] font-bold text-brand-yellow"
              >
                View Attendance database
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-3xl space-y-3.5 shadow-md">
              <div className="flex items-center justify-between text-xs font-black text-slate-200">
                <span className="flex items-center gap-1"><Info className="w-4 h-4 text-[#F59E0B]" /> Dubai Branch Counselor</span>
                <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.2 rounded text-[10px]">Assigned</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Receive specialized advice on board strategies from our resident certified academic advisers.
              </p>
              <button 
                onClick={() => setActiveModal("book-meeting")}
                className="w-full py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-lg text-[10px] font-bold text-brand-yellow"
              >
                Schedule Free Slot Inquiry
              </button>
            </div>

          </div>

          {/* SECTION 4 & 5: PARENT ACTION CENTER & SUBJECT PERFORMANCE MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: SUBJECT PERFORMANCE & TEACHER TIMELINE (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* SUBJECT ANALYSIS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 font-mono">
                    BOARD PREDICTION MATRIX (SARA)
                  </h3>
                  <p className="text-[10.5px] text-slate-400">
                    Calculated in alignment with standard GCSE spec and NCERT Class 10 pre-board scaling logic.
                  </p>
                </div>

                <div className="space-y-2">
                  {subjectsState.map(subj => (
                    <div 
                      key={subj.name}
                      className="p-3 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-left font-sans"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-slate-100 font-black">{subj.name}</strong>
                          <span className="text-[9.5px] font-mono text-emerald-400">Predicted: {subj.predictedGrade}</span>
                        </div>
                        <p className="text-[9.5px] text-slate-450 italic leading-relaxed">
                          Teacher remarks: "{subj.teacherComment}"
                        </p>
                        <div className="text-[9px] text-[#F59E0B] font-mono">
                          Weak sub-topic: {subj.weakChapter}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold bg-slate-900 px-2 py-1 rounded">Score: {subj.lastTestScore}%</span>
                        <button 
                          onClick={() => {
                            addToast("📝 Revision Dispatched", `Sent ${subj.nextAction} SMS to ${studentName}.`);
                          }}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] font-bold text-white uppercase"
                        >
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TEACHER FEEDBACK TIMELINE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <h3 className="text-xs font-black uppercase text-slate-100 tracking-wider font-mono">
                  CHRONOLOGICAL TEACHER FEEDBACK TIMELINE
                </h3>

                <div className="space-y-3">
                  {feedbackTimeline.map((f, fIdx) => (
                    <div 
                      key={f.id}
                      className="p-3.5 bg-slate-950 border border-slate-850 rounded-2xl relative text-left"
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono mb-1 text-slate-450">
                        <span className="font-semibold text-slate-300">Reviewed by {f.teacher} ({f.subject})</span>
                        <span>{f.date}</span>
                      </div>
                      
                      <p className="text-[10px] text-slate-350 italic font-sans leading-relaxed">
                        "{f.feedback}"
                      </p>
                      
                      <div className="text-[9.5px] text-indigo-300 font-medium pt-1.5 border-t border-slate-900 mt-1.5 font-mono">
                        💡 Advice key: {f.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: BILLING LEDGER & ACTIONS (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* PARENT QUICK ACTION PANEL */}
              <div className="bg-gradient-to-br from-indigo-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 rounded-3xl p-4.5 space-y-3 shadow-xl">
                <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#10B981] block">PARENT HUB CENTER</span>
                
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-slate-200">Express UAE Parent Action keys</h4>
                  <p className="text-[9.5px] text-slate-400 mb-2">Book consultations or clear bills standard secure:</p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-left">
                  <button 
                    onClick={() => setActiveModal("pay-fees")}
                    className="w-full p-2.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 font-black text-[9.5px] uppercase tracking-widest rounded-xl hover:shadow duration-150 flex items-center justify-center gap-1"
                  >
                    <DollarSign className="w-3.5 h-3.5" /> Pay Tuition Fees
                  </button>

                  <button 
                    onClick={() => {
                      const unpaid = billingList.find(b => b.status === "Unpaid");
                      if (unpaid) {
                        downloadSimulatedInvoice(unpaid.id, unpaid.term, unpaid.baseAmount, unpaid.vat);
                      } else {
                        downloadSimulatedInvoice("inv-clear-01", "Term 1 Premium Tuition", 1500, 75);
                      }
                    }}
                    className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-200 font-bold text-[9.5px] uppercase tracking-widest rounded-xl duration-150 flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" /> Download UAE VAT Invoice
                  </button>

                  <button 
                    onClick={() => setActiveModal("book-meeting")}
                    className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-200 font-bold text-[9.5px] uppercase tracking-widest rounded-xl duration-150 flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Book Conference Slot
                  </button>

                  <button 
                    onClick={() => {
                      localNotify("📲 WhatsApp Dispatch", "Direct chat trigger initialized with Teacher 2.");
                      addToast("💬 Encrypted SMS", "Connecting safely to educator secure line standard WhatsApp.");
                    }}
                    className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[#10B981] font-bold text-[9.5px] uppercase tracking-widest rounded-xl duration-150 flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" /> Send Teacher SMS
                  </button>
                </div>
              </div>

              {/* REGISTERED LEDGER / FEE STATUS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4.5 space-y-4 shadow-xl">
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-450 uppercase block">FEE TRANSACTION SYSTEM</h4>
                  <span className="text-[8.5px] text-slate-500 font-sans block">{platosConfig.officialBranches[0] || 'Main Campus'} registration</span>
                </div>

                <div className="space-y-3 text-[10px]">
                  {billingList.map((bill, bIdx) => (
                    <div 
                      key={bill.id} 
                      className={`p-3 rounded-2xl border ${
                        bill.status === "Paid" 
                          ? "bg-slate-950/60 border-slate-850/60" 
                          : "bg-red-950/10 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[9px] mb-1">
                        <span className="text-slate-450 uppercase">{bill.id}</span>
                        <span className={`px-1.5 font-bold rounded ${
                          bill.status === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/15 text-brand-red"
                        }`}>
                          {bill.status}
                        </span>
                      </div>
                      
                      <h5 className="font-bold text-slate-200">{bill.term}</h5>
                      <p className="text-[9px] text-[#F59E0B] font-mono m-0.5">Base: AED {bill.baseAmount} + Standard VAT 5%: AED {bill.vat}</p>
                      
                      <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2 border-t border-slate-900 mt-2">
                        <span>Paid: {bill.datePaid}</span>
                        <button 
                          onClick={() => downloadSimulatedInvoice(bill.id, bill.term, bill.baseAmount, bill.vat)}
                          className="text-indigo-400 hover:text-indigo-300 font-bold"
                        >
                          Invoice PDF ↓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/*                       MODAL OVERLAYS                      */}
      {/* ========================================================= */}

      {/* 1. BOOK MEETING MODAL */}
      {activeModal === "book-meeting" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 animate-scale-in text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                Book Dubai Teacher Conference
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-600 hover:text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">Select Educator:</label>
                <select 
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 focus:border-brand-yellow font-sans text-left"
                >
                  <option value="Teacher 2 (Mathematics)">Teacher 2 (Mathematics Variant Paper 4)</option>
                  <option value="Teacher 5 (Physics)">Teacher 5 (Physics Grade 10 Specimen)</option>
                  <option value="Teacher 10 (Chemistry)">Teacher 10 (Chemistry Organic NCERT)</option>
                  <option value="Teacher 11 (English Language)">Teacher 11 (English descriptive critical)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">Select Date:</label>
                  <input 
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">Time Slot (Dubai):</label>
                  <input 
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">Brief Parent query note:</label>
                <textarea
                  value={meetingNote}
                  onChange={(e) => setMeetingNote(e.target.value)}
                  placeholder="e.g. Discussing SARA's trigonometry field proof scores..."
                  rows={2.5}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-sans focus:border-brand-yellow"
                />
              </div>

              <button 
                onClick={handleConfirmMeeting}
                className="w-full py-2.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
              >
                Confirm Booking Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PAY FEES SECURE WINDOW */}
      {activeModal === "pay-fees" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 animate-scale-in text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                Secured UAE Credit-Card payment gate
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-600 hover:text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-2xl text-[10px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-200 block uppercase font-mono text-[8.5px]">BILLING SUMMARY:</span>
                <div>Enrolled Child: <strong className="text-white">{studentName} (Grade 10)</strong></div>
                <div>Standard Monthly Tuition: <strong className="text-white">AED 1,500.00</strong></div>
                <div>Standard UAE VAT (5.00%): <strong className="text-white">AED 75.00</strong></div>
                <div className="text-brand-yellow font-black border-t border-slate-900 pt-2 mt-2">
                  GRAND TOTAL ENROLLED FEE: AED 1,575.00 USD equivalent (Cleared)
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#F59E0B] block">Cardholder Name:</label>
                <input 
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#F59E0B] block">Standard Card Number:</label>
                <input 
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-205 p-2.5 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">Expiry Date:</label>
                  <input 
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-450 block">CVV Code:</label>
                  <input 
                    type="password"
                    placeholder="•••"
                    defaultValue="014"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 p-2.5 font-mono"
                  />
                </div>
              </div>

              <button 
                onClick={handlePaymentSubmit}
                disabled={isPayingProcess}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-555 to-teal-600 hover:from-emerald-600 hover:to-teal-550 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isPayingProcess ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Cleared...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-3.5 h-3.5 text-slate-950" />
                    <span>Authorize AED 1,575.00 Checkout</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PLATOS ASK AI COACH OVERLAY */}
      {activeModal === "ai-coach" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-4 animate-scale-in text-left flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
                  Plato AI Coach spec Solver
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-600 hover:text-slate-400 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-950 rounded-2xl border border-slate-850 min-h-[250px] max-h-[400px]">
              {aiCoachHistory.map((m, mIdx) => (
                <div 
                  key={mIdx}
                  className={`p-3 rounded-2xl text-[11px] leading-relaxed max-w-[85%] ${
                    m.sender === "user" 
                      ? "bg-indigo-600 text-white ml-auto" 
                      : "bg-slate-900 text-slate-300 border border-slate-850 mr-auto"
                  }`}
                >
                  <strong>{m.sender === "user" ? studentName : "Plato Coach"}:</strong>
                  <p className="mt-1 font-sans">{m.text}</p>
                </div>
              ))}
              {isGeneratingAiCoachMsg && (
                <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl text-[10px] text-slate-400 mr-auto max-w-[150px] flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span>Thinking steps...</span>
                </div>
              )}
            </div>

            {/* Prompts quick keys */}
            <div className="flex gap-1 overflow-x-auto no-scrollbar shrink-0 py-1">
              {[
                "Calculate standard physics acceleration vector",
                "Explain how esters form in organic synthesis",
                "Write outline essay structure for descriptive text"
              ].map(qp => (
                <button
                  key={qp}
                  onClick={() => { setAiCoachPrompt(qp); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-sans truncate max-w-[200px]"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Inputs strip */}
            <div className="flex gap-2 shrink-0 border-t border-slate-850 pt-3">
              <input 
                type="text"
                value={aiCoachPrompt}
                onChange={(e) => setAiCoachPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendAiCoachMessage(); }}
                placeholder="Ask Plato Coach AI about boards equations..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-350 p-2.5"
              />
              <button 
                onClick={sendAiCoachMessage}
                className="p-2 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl transition-all"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
