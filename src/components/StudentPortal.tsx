import React, { useState, useEffect } from "react";
import { 
  UserCheck, 
  Lock, 
  Unlock, 
  Play, 
  Pause, 
  CheckCircle, 
  Calendar, 
  Video, 
  Clock, 
  FileText, 
  Search, 
  Sparkles, 
  Tv, 
  NotebookPen, 
  Check, 
  LogOut, 
  UserPlus, 
  TrendingUp, 
  AlertCircle,
  Brain,
  Send,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lightbulb,
  Loader2,
  Star,
  MessageSquare
} from "lucide-react";
import { StudentProfile, Course, CurriculumType } from "../types";

// Constant preset accounts to let the user log in immediately or create their custom ones
const PRESET_STUDENTS = [
  {
    name: "Zayd Al-Mansoori",
    grade: "10 (Secondary)",
    curriculum: "Coding & Robotics" as CurriculumType,
    streak: 6,
    xp: 280,
    badges: ["badge-first"],
    enrolledCourses: ["robo-astro"],
    bookedTrials: [],
    preferredStudyTime: "17:30",
    studyRemindersEnabled: true
  },
  {
    name: "Rohan Bhatia",
    grade: "Grade 12",
    curriculum: "CBSE" as CurriculumType,
    streak: 14,
    xp: 620,
    badges: ["badge-first", "badge-quiz"],
    enrolledCourses: ["test-prep-neet-jee"],
    bookedTrials: ["cbse-math-10"],
    preferredStudyTime: "16:00",
    studyRemindersEnabled: true
  },
  {
    name: "Emily Harrison",
    grade: "Grade 11",
    curriculum: "British" as CurriculumType,
    streak: 3,
    xp: 150,
    badges: ["badge-first"],
    enrolledCourses: ["british-igcse-physics"],
    bookedTrials: [],
    preferredStudyTime: "19:00",
    studyRemindersEnabled: false
  }
];

interface RecordedClass {
  id: string;
  title: string;
  subject: string;
  grade: string;
  curriculum: "CBSE" | "British" | "Coding & Robotics";
  duration: string;
  instructor: string;
  summary: string;
  boardFormula: string;
  videoDurationSec: number;
}

const RECORDED_CLASSES: RecordedClass[] = [
  // CBSE Classes
  {
    id: "rec-cbse-10-trig",
    title: "Trigonometric Identities & Height Calculations",
    subject: "Mathematics",
    grade: "Grade 10",
    curriculum: "CBSE",
    duration: "45 mins",
    instructor: "Mrs. Meenu Raj (HOD Board Mathematics)",
    summary: "Solving complex Board questions involving sin²θ + cos²θ = 1, and angle of elevation word problems representing Burj Khalifa height diagnostics.",
    boardFormula: "sin²θ + cos²θ = 1 | tan(θ) = Height / Distance",
    videoDurationSec: 2700
  },
  {
    id: "rec-cbse-12-org",
    title: "Chemistry: Carbonyl Nucleophilic Reaction Chains",
    subject: "Chemistry",
    grade: "Grade 12",
    curriculum: "CBSE",
    duration: "50 mins",
    instructor: "Dr. Farah Jamil (Senior Chemistry Lead)",
    summary: "Detailed analysis of Aldehydes, Ketones, and Carboxylic Acids board blueprint questions. Nucleophilic addition reactions step-by-step.",
    boardFormula: "R-CHO + Nu⁻ → R-CH(OH)-Nu (Addition mechanism)",
    videoDurationSec: 3000
  },
  {
    id: "rec-cbse-11-phy",
    title: "Physics: Laws of Motion & Friction Mechanics",
    subject: "Physics",
    grade: "Grade 11",
    curriculum: "CBSE",
    duration: "40 mins",
    instructor: "Dr. Satish Kumar (PhD, IIT Alumni)",
    summary: "Resolving vectors on inclined planes and checking kinetic vs static friction parameters with CBSE standard problems.",
    boardFormula: "F_friction = μ * N | F_net = m * a",
    videoDurationSec: 2400
  },
  
  // IGCSE / British Year 9 to 12
  {
    id: "rec-igcse-11-vector",
    title: "Forces in Equilibrium & Vector Resolving",
    subject: "Physics",
    grade: "Grade 11",
    curriculum: "British",
    duration: "35 mins",
    instructor: "Prof. Alistair Vance (Cambridge Certified)",
    summary: "Analyzing coplanar systems, resolving horizontal & vertical components using sine/cosine equations to attain total static equilibrium state.",
    boardFormula: "Σ F_x = 0 | Σ F_y = 0",
    videoDurationSec: 2100
  },
  {
    id: "rec-igcse-10-fraction",
    title: "Algebraic Fractions & Advanced Indices Laws",
    subject: "Mathematics",
    grade: "Grade 10",
    curriculum: "British",
    duration: "30 mins",
    instructor: "Andrew Sterling (Exam Spec Senior Tutor)",
    summary: "Simplifying tedious algebraic fractions by factoring quadratic expressions first. Rigorous application of IGCSE fractional power indices laws.",
    boardFormula: "x^(a/b) = ᵇ√(xᵃ) | (a² - b²) = (a-b)(a+b)",
    videoDurationSec: 1800
  },
  {
    id: "rec-igcse-12-bio",
    title: "A2 Biology: Mitosis Stages & DNA Polymerase Rates",
    subject: "Biology",
    grade: "Grade 12",
    curriculum: "British",
    duration: "55 mins",
    instructor: "Mrs. Karen O'Connor (King's College Alumni)",
    summary: "Tracing chromosomes through Metaphase and Anaphase under high definition electron microscope simulation sheets with past-paper markschemes.",
    boardFormula: "Mitotic Index = (Number of cells in mitosis) / (Total cells seen) * 100",
    videoDurationSec: 3300
  }
];

interface AttendanceRecord {
  id: string;
  studentName: string;
  classId: string;
  classTitle: string;
  dateStr: string;
  timeStr: string;
  verificationCode: string;
}

interface StudentPortalProps {
  currentProfile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
  soundEnabled: boolean;
  triggerNotification: (title: string, desc: string) => void;
}

export default function StudentPortal({ 
  currentProfile, 
  onUpdateProfile, 
  onAwardXp, 
  soundEnabled, 
  triggerNotification 
}: StudentPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginStep, setLoginStep] = useState<"preset" | "new">("preset");
  
  // Feedback star-rating and text-input states
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  
  // Login input states
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentGrade, setNewStudentGrade] = useState<string>("Grade 10");
  const [newStudentCurriculum, setNewStudentCurriculum] = useState<CurriculumType>("CBSE");
  const [pinCode, setPinCode] = useState<string>("");

  // Search and filter for classes
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCurriculumFilter, setActiveCurriculumFilter] = useState<"ALL" | "CBSE" | "British" | "Coding & Robotics">("ALL");

  // AI Interactive Study states
  const [aiTab, setAiTab] = useState<"flashcards" | "qa">("flashcards");
  const [aiFlashcards, setAiFlashcards] = useState<Array<{ question: string; answer: string; hint: string }>>([]);
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isGeneratingCards, setIsGeneratingCards] = useState<boolean>(false);
  const [viewedCardsIndices, setViewedCardsIndices] = useState<number[]>([]); // Tracks which card indices were reviewed
  const [hasAwardedAiClassBonus, setHasAwardedAiClassBonus] = useState<string[]>([]); // Tracks bonus XP awards per classId

  // Lecture custom AI Support Q&A
  const [studentQuestion, setStudentQuestion] = useState<string>("");
  const [aiAnswerResponse, setAiAnswerResponse] = useState<string>("");
  const [isExplainingLecture, setIsExplainingLecture] = useState<boolean>(false);

  // Video Simulator states
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeProgress, setCurrentTimeProgress] = useState<number>(10); // Simulated progress bar percentage
  const [whiteboardText, setWhiteboardText] = useState<string>("Click Play to boot video transmitter...");

  // Attendance log database (simulated with localStorage)
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([]);

  // Initialize and load attendance log database
  useEffect(() => {
    const savedLogs = localStorage.getItem(`plato_attendance_${currentProfile.name}`);
    if (savedLogs) {
      setAttendanceLogs(JSON.parse(savedLogs));
    } else {
      // Mock initial presence log
      const initialLogs: AttendanceRecord[] = [
        {
          id: "att-init-1",
          studentName: currentProfile.name,
          classId: "v-initial",
          classTitle: "STEM Orientation Lecture",
          dateStr: "June 08, 2026",
          timeStr: "05:15 PM",
          verificationCode: "PLA-ATT-1092"
        }
      ];
      setAttendanceLogs(initialLogs);
      localStorage.setItem(`plato_attendance_${currentProfile.name}`, JSON.stringify(initialLogs));
    }
  }, [currentProfile.name]);

  // Reset AI states when switching active class
  useEffect(() => {
    setAiFlashcards([]);
    setIsCardFlipped(false);
    setActiveCardIdx(0);
    setViewedCardsIndices([]);
    setAiAnswerResponse("");
    setStudentQuestion("");
  }, [playingVideoId]);

  // If student profile name changes dynamically (e.g. from outer components)
  const handlePresetSelect = (idx: number) => {
    setSelectedPresetIndex(idx);
  };

  const handleApplyPresetLogin = () => {
    const chosen = PRESET_STUDENTS[selectedPresetIndex];
    onUpdateProfile({
      name: chosen.name,
      grade: chosen.grade,
      curriculum: chosen.curriculum,
      streak: chosen.streak,
      xp: chosen.xp,
      badges: chosen.badges,
      enrolledCourses: chosen.enrolledCourses,
      bookedTrials: chosen.bookedTrials,
      preferredStudyTime: chosen.preferredStudyTime,
      studyRemindersEnabled: chosen.studyRemindersEnabled
    });
    setIsLoggedIn(true);
    triggerNotification("🔑 Access Granted", `Logged in successfully as ${chosen.name}!`);
  };

  const handleRegisterNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      triggerNotification("⚠️ Missing Detail", "Please enter the student's name.");
      return;
    }

    const newPrf: StudentProfile = {
      name: newStudentName.trim(),
      grade: newStudentGrade,
      curriculum: newStudentCurriculum,
      streak: 1,
      xp: 120, // bonus starting XP
      badges: ["badge-first"],
      enrolledCourses: [],
      bookedTrials: [],
      preferredStudyTime: "17:30",
      studyRemindersEnabled: true
    };

    onUpdateProfile(newPrf);
    setIsLoggedIn(true);
    setNewStudentName("");
    triggerNotification("🚀 Profile Created!", `Welcome standard scholar ${newPrf.name}! +120 starting XP added.`);
  };

  const handleLogCircleOut = () => {
    setIsLoggedIn(false);
    setPlayingVideoId(null);
    setIsPlaying(false);
    triggerNotification("🔒 Logged Out", "Securely stored current student workspace progress.");
  };

  // Video simulated controls
  const handleLaunchVideo = (cls: RecordedClass) => {
    setPlayingVideoId(cls.id);
    setIsPlaying(true);
    setCurrentTimeProgress(12); // start slightly into class
    setWhiteboardText(`Lecture: ${cls.subject} by ${cls.instructor}\nTopic Focus: ${cls.title}\nKey Formula: ${cls.boardFormula}\n---------------------------------\nNotes: Keep active board verification code ready.`);
    triggerNotification("📺 Video Server Connected", `Streaming: "${cls.title}"`);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTimeProgress(parseInt(e.target.value));
  };

  // MARK ATTENDANCE LOGIC
  const handleMarkAttendanceForClass = (classId: string, classTitle: string) => {
    // Check if already present
    const alreadyLogged = attendanceLogs.some(log => log.studentName === currentProfile.name && log.classId === classId);
    if (alreadyLogged) {
      triggerNotification("✓ Presence Extant", "Attendance already verified for this lecture.");
      return;
    }

    // Generate random mock verification code
    const randomCode = `PLA-ATT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const timeFormatted = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord: AttendanceRecord = {
      id: `att-log-${Date.now()}`,
      studentName: currentProfile.name,
      classId,
      classTitle,
      dateStr: dateFormatted,
      timeStr: timeFormatted,
      verificationCode: randomCode
    };

    const updatedLogs = [newRecord, ...attendanceLogs];
    setAttendanceLogs(updatedLogs);
    localStorage.setItem(`plato_attendance_${currentProfile.name}`, JSON.stringify(updatedLogs));

    // Award +20 XP
    onAwardXp(30);
    triggerNotification("🎟️ Attendance Swiped", `Signed in successfully! +30 XP revision point awarded. Code: ${randomCode}`);
  };

  // FETCH LECTURE FLASHCARDS FROM AI BACKEND
  const handleGenerateAiFlashcards = async (cls: RecordedClass) => {
    setIsGeneratingCards(true);
    setAiFlashcards([]);
    setIsCardFlipped(false);
    setActiveCardIdx(0);
    setViewedCardsIndices([0]); // start with looking at the first card

    try {
      const response = await fetch("/api/gemini/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: cls.title,
          subject: cls.subject,
          curriculum: cls.curriculum,
          summary: cls.summary
        })
      });
      const data = await response.json();
      if (data.flashcards && data.flashcards.length > 0) {
        setAiFlashcards(data.flashcards);
        triggerNotification("🧠 AI Study cards Synchronized", `Generated 3 revision cards for "${cls.title}"`);
      } else {
        throw new Error("No flashcard returned");
      }
    } catch (err) {
      console.error("AI Flashcards error:", err);
      // Hardcoded fallback
      setAiFlashcards([
        {
          question: `What is the core formula discussed in "${cls.title}"?`,
          answer: cls.boardFormula || "Variables represent values in STEM blocks.",
          hint: "Double check your classroom whiteboard worksheet snap!"
        },
        {
          question: `What was the primary goal of this ${cls.curriculum} session?`,
          answer: cls.summary,
          hint: "Focus closely on the key chapters taught by " + cls.instructor
        },
        {
          question: "How can you reinforce this topic for final board marks?",
          answer: `Solve past school papers and note key formulas. Stating variables correctly secures 70% basic marks in CBSE & British systems.`,
          hint: "Burj levels of precision require writing clear worksheets!"
        }
      ]);
    } finally {
      setIsGeneratingCards(false);
    }
  };

  // FETCH CUSTOM EXPLANATION FROM AI BACKEND
  const handleAskMindyQuestion = async (cls: RecordedClass) => {
    if (!studentQuestion.trim()) return;
    setIsExplainingLecture(true);
    setAiAnswerResponse("");

    try {
      const response = await fetch("/api/gemini/explain-lecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: cls.title,
          subject: cls.subject,
          curriculum: cls.curriculum,
          summary: cls.summary,
          boardFormula: cls.boardFormula,
          question: studentQuestion
        })
      });
      const data = await response.json();
      setAiAnswerResponse(data.answer);
      // Award XP for engaging with Mindy classroom helper
      onAwardXp(15);
      triggerNotification("✨ Mindy Answered Your Doubt", "Study companion solved your query. +15 XP credited!");
    } catch (err) {
      console.error("AI Explain Error:", err);
      setAiAnswerResponse(`### Mindy Study Note 🚀\n\nI processed your query about: *"${studentQuestion}"*\n\n1. **Core Concept**: Storing active values is important in ${cls.subject}.\n2. **Revision Tip**: Look closely at the board formula: \`${cls.boardFormula}\`.\n3. Keep revisions going at our Dubai tutoring hub to easily scale past CBSE and British board criteria!`);
    } finally {
      setIsExplainingLecture(false);
    }
  };

  // Flip state tracker to award XP when all 3 cards are examined!
  const handleCardNav = (direction: "prev" | "next") => {
    setIsCardFlipped(false);
    let nextIdx = activeCardIdx;
    if (direction === "prev") {
      nextIdx = Math.max(0, activeCardIdx - 1);
    } else {
      nextIdx = Math.min(aiFlashcards.length - 1, activeCardIdx + 1);
    }
    setActiveCardIdx(nextIdx);
    
    // Add to viewed list if not there
    if (!viewedCardsIndices.includes(nextIdx)) {
      const updated = [...viewedCardsIndices, nextIdx];
      setViewedCardsIndices(updated);
      
      // If we have viewed all cards (0, 1, 2) and haven't awarded yet for this class
      if (updated.length === aiFlashcards.length && currentlyPlayingClass && !hasAwardedAiClassBonus.includes(currentlyPlayingClass.id)) {
        setHasAwardedAiClassBonus([...hasAwardedAiClassBonus, currentlyPlayingClass.id]);
        onAwardXp(20);
        triggerNotification("🎉 Mindy AI Revision Award", "Flawless retrieval! Reviewed all study cards. +20 XP awarded!");
      }
    }
  };

  // Filter list of recorded classes dynamically based on curriculum alignment
  const filteredRecordedClasses = RECORDED_CLASSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCurriculum = activeCurriculumFilter === "ALL" || c.curriculum === activeCurriculumFilter;
    
    return matchesSearch && matchesCurriculum;
  });

  const currentlyPlayingClass = RECORDED_CLASSES.find(c => c.id === playingVideoId);

  // Auto-calculated attendance rate
  const attendanceRate = Math.min(100, 75 + (attendanceLogs.length * 5));

  return (
    <div id="student-portal-root" className="flex flex-col p-4 space-y-4">
      
      {/* ⚠️ NOT LOGGED IN MODE */}
      {!isLoggedIn ? (
        <div id="login-panel" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl relative overflow-hidden animate-pulse-once">
          {/* Neon aesthetic headers */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-brand-yellow/15 text-brand-yellow rounded-xl flex items-center justify-center mx-auto border border-brand-yellow/30 shadow-md">
              <Lock className="w-5 h-5 text-brand-yellow" />
            </div>
            <h3 className="text-base font-black text-slate-100 tracking-tight mt-1.5">
              Secure Plato Student Terminal
            </h3>
            <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto leading-normal">
              Validate credentials to access live lesson archives, syllabus worksheets, and attendance record logs.
            </p>
          </div>

          {/* Selector login options */}
          <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 border border-slate-850 rounded-lg">
            <button
              onClick={() => setLoginStep("preset")}
              className={`py-1 text-[11px] font-black rounded-md cursor-pointer transition-colors ${
                loginStep === "preset"
                  ? "bg-brand-blue border border-brand-blue-dark text-slate-100 font-bold"
                  : "bg-transparent text-slate-500 hover:text-slate-400"
              }`}
            >
              Select Active Student
            </button>
            <button
              onClick={() => setLoginStep("new")}
              className={`py-1 text-[11px] font-black rounded-md cursor-pointer transition-colors ${
                loginStep === "new"
                  ? "bg-brand-blue border border-brand-blue-dark text-slate-100 font-bold"
                  : "bg-transparent text-slate-500 hover:text-slate-400"
              }`}
            >
              Register New ID
            </button>
          </div>

          {loginStep === "preset" ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">
                  Registered Dubai Students
                </label>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {PRESET_STUDENTS.map((st, i) => (
                    <button
                      key={st.name}
                      onClick={() => handlePresetSelect(i)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        selectedPresetIndex === i
                          ? "bg-brand-blue-dark/50 border-brand-yellow text-brand-yellow font-bold shadow-sm"
                          : "bg-slate-950/60 border-slate-850 text-slate-350 hover:bg-slate-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{st.name}</span>
                        <span className="text-[9px] text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded">
                          {st.curriculum} {st.grade.split(" ")[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pin Code Box */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-450 block font-mono">
                    Secured Passcode PIN
                  </label>
                  <span className="text-[9px] text-slate-650">(Demo code defaults to: 1234)</span>
                </div>
                <input
                  type="password"
                  placeholder="• • • •"
                  value={pinCode}
                  maxLength={4}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 tracking-widest text-center px-3 py-2 text-xs rounded-lg text-brand-yellow font-black focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <button
                onClick={handleApplyPresetLogin}
                className="w-full py-2.5 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-yellow/10 cursor-pointer transition-all"
              >
                Authenticate Terminal ✓
              </button>
            </div>
          ) : (
            /* Custom new registration form */
            <form onSubmit={handleRegisterNewStudent} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide block font-mono">
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priyan Sethi"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 px-3 py-2 text-xs text-slate-200 rounded-lg focus:outline-none focus:border-brand-yellow placeholder-slate-750"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide block font-mono">
                    Grade Level
                  </label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 px-3 py-2 rounded-lg cursor-pointer focus:outline-none focus:border-brand-yellow"
                  >
                    <option value="Grade 9">Grade 9 (Secondary)</option>
                    <option value="Grade 10">Grade 10 (Secondary)</option>
                    <option value="Grade 11">Grade 11 (High School)</option>
                    <option value="Grade 12">Grade 12 (Board Year)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wide block font-mono">
                    Syllabus Stream
                  </label>
                  <select
                    value={newStudentCurriculum}
                    onChange={(e) => setNewStudentCurriculum(e.target.value as CurriculumType)}
                    className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 px-3 py-2 rounded-lg cursor-pointer focus:outline-none focus:border-brand-yellow"
                  >
                    <option value="CBSE">CBSE (India)</option>
                    <option value="British">British (IGCSE)</option>
                    <option value="Coding & Robotics">Tinkering / STEM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-brand-red to-orange-500 hover:from-brand-red-hover hover:to-brand-red text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Create Hub ID & Log In
              </button>
            </form>
          )}
        </div>
      ) : (

        /* 🟢 LOGGED IN MODE - FULL INTERACTIVE WORKSHEETS & RECORDED PLAYER */
        <>
          {/* Mini active profile block */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center font-black text-brand-yellow text-sm font-mono">
                {currentProfile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-slate-100">{currentProfile.name}</h4>
                  <span className="text-[8px] bg-slate-950 border border-slate-850 text-brand-yellow font-extrabold px-1.5 py-0.2 rounded">
                    Active Session
                  </span>
                </div>
                <p className="text-[10px] text-slate-450">
                  {currentProfile.curriculum} Syllabus • {currentProfile.grade}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => {
                  setFeedbackRating(5);
                  setFeedbackComment("");
                  setFeedbackSubmitted(false);
                  setIsFeedbackOpen(true);
                }}
                className="py-1.5 px-2 bg-gradient-to-r from-amber-500/10 to-brand-yellow/10 hover:from-amber-500/20 hover:to-brand-yellow/20 border border-brand-yellow/30 hover:border-brand-yellow/60 rounded-xl text-brand-yellow text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 shadow-md active:scale-95"
                title="Share feedback on your Plato tutorial experience"
              >
                <Star className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                <span>Give Feedback</span>
              </button>

              <button
                onClick={handleLogCircleOut}
                className="p-1.5 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-brand-red hover:border-brand-red/30 transition-all cursor-pointer"
                title="Secure Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* DAILY STUDY REMINDER CENTER                             */}
          {/* ======================================================= */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-3 shadow-xl relative overflow-hidden">
            <div className="absolute -left-10 -top-10 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] bg-brand-yellow/10 text-brand-yellow font-extrabold px-1.5 py-0.5 rounded border border-brand-yellow/20 uppercase tracking-widest font-mono">
                  Habit Loop Builder
                </span>
                <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5 mt-1.5">
                  <Clock className="w-4 h-4 text-brand-yellow" />
                  <span>Consistency Streak Scheduler</span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  Configure your preferred daily study time. Settle in for a class to maintain your streak!
                </p>
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Preferred Time:
                </label>
                <input
                  type="time"
                  value={currentProfile.preferredStudyTime || "17:30"}
                  onChange={(e) => {
                    onUpdateProfile({
                      ...currentProfile,
                      preferredStudyTime: e.target.value
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-lg py-1.5 px-2.5 text-[11px] text-slate-200 focus:outline-none transition-colors cursor-pointer font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Daily Reminders:
                </label>
                <div className="flex bg-slate-950 border border-slate-850 p-0.5 rounded-lg text-[10px] font-bold h-[30px] items-center">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateProfile({
                        ...currentProfile,
                        studyRemindersEnabled: true
                      });
                      triggerNotification("🕒 Daily Notifications Active", "Re-targeted daily reminders have been switched on.");
                    }}
                    className={`flex-1 py-1 rounded cursor-pointer text-center text-[9.5px] transition-all font-mono uppercase ${
                      currentProfile.studyRemindersEnabled 
                        ? "bg-brand-yellow text-slate-950 font-black" 
                        : "text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateProfile({
                        ...currentProfile,
                        studyRemindersEnabled: false
                      });
                      triggerNotification("🕒 Daily Reminders Silenced", "Preferred hour warnings have been temporarily silenced.");
                    }}
                    className={`flex-1 py-1 rounded cursor-pointer text-center text-[9.5px] transition-all font-mono uppercase ${
                      !currentProfile.studyRemindersEnabled 
                        ? "bg-slate-900 border border-slate-800 text-slate-350 font-bold" 
                        : "text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    OFF
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions and instant Test simulation */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  triggerNotification(
                    "💾 Preferences Saved!", 
                    `Daily revision alert set to ${currentProfile.preferredStudyTime || "17:30"} successfully.`
                  );
                }}
                className="flex-1 py-2 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-250 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center select-none hover:bg-slate-900 border-dashed"
              >
                Save Schedule ✓
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerNotification(
                    "⏱️ Daily Study Hour Reminder!", 
                    `Prestige discipline, ${currentProfile.name}! It is exactly ${currentProfile.preferredStudyTime || "17:30"}. Start a 25-min Pomodoro session to claim +35 XP and maintain your ${currentProfile.streak}-day streak! 🚀`
                  );
                }}
                className="px-3.5 py-2 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md active:scale-95 flex-none"
                title="Immediately simulate a preferred time study session alert to inspect its high fidelity banner"
              >
                <Sparkles className="w-3 h-3" />
                <span>Test Alert</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid with Attendance rate */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-center">
              <span className="text-[8px] text-slate-550 uppercase tracking-widest font-semibold block">Verified Present</span>
              <span className="text-sm font-extrabold text-brand-yellow font-mono">{attendanceLogs.length} Lectures</span>
            </div>
            
            <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-center">
              <span className="text-[8px] text-slate-550 uppercase tracking-widest font-semibold block">Attendance Score</span>
              <span className={`text-sm font-extrabold font-mono ${attendanceRate >= 90 ? "text-emerald-400" : "text-brand-yellow"}`}>
                {attendanceRate}%
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-center">
              <span className="text-[8px] text-slate-550 uppercase tracking-widest font-semibold block">Ascending XP</span>
              <span className="text-sm font-extrabold text-brand-red font-mono">+{currentProfile.xp}</span>
            </div>
          </div>

          {/* SIMULATED LECTURE PLAYBACK ENVIRONMENT */}
          {playingVideoId && currentlyPlayingClass ? (
            <div id="video-console" className="bg-slate-950 border-2 border-brand-yellow/40 rounded-2xl p-4.5 space-y-3 relative overflow-hidden transition-all duration-300">
              
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div className="flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-brand-yellow animate-pulse" />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                    Plato Streaming Hub
                  </span>
                </div>
                <button
                  onClick={() => { setPlayingVideoId(null); setIsPlaying(false); }}
                  className="text-[10px] text-slate-400 hover:text-slate-100 font-bold hover:underline"
                >
                  Close Player ×
                </button>
              </div>

              {/* Simulated Interactive Video Screen view */}
              <div className="h-44 bg-slate-900 border border-slate-850 rounded-xl relative overflow-hidden flex flex-col justify-end p-2 text-center group">
                <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
                
                {/* Visual Audio waves playing indicator */}
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none space-x-1 opacity-25">
                    <span className="w-1 h-8 bg-brand-yellow rounded-full animate-pulse transition-all duration-500 delay-75" />
                    <span className="w-1 h-14 bg-brand-yellow rounded-full animate-pulse transition-all duration-500 delay-150" />
                    <span className="w-1 h-10 bg-brand-yellow rounded-full animate-pulse transition-all duration-500 delay-300" />
                    <span className="w-1 h-6 bg-brand-yellow rounded-full animate-pulse transition-all duration-500 delay-450" />
                  </div>
                )}

                {/* Simulated Floating teacher dialogue bar */}
                <div className="absolute top-4 left-4 right-4 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-left scale-95 select-none animate-fadeIn">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase font-mono">TRANSCRIPT SUBTITLE (LIVE CAPTIONS)</span>
                  </div>
                  <p className="text-[10px] text-slate-100 italic leading-snug line-clamp-2">
                    {currentTimeProgress < 30 ? 
                      `"Marhaban! In this particular board module, we'll focus deeply on our curriculum guidelines. Be sure to note the structural formulas..."` :
                      currentTimeProgress < 70 ? 
                      `"Remember: CBSE examiners specifically award marks for writing formulas in step-by-step layout. Let's solve page 22 in your workbook."` :
                      `"We have calculated the precise parameters! Now, click 'Mark Attendance' below to update your class registers instantly."`}
                  </p>
                </div>

                {/* Big play button centered standard */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleTogglePlay}
                    className="w-11 h-11 bg-brand-yellow hover:bg-brand-gold text-slate-950 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer z-20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                </div>

                {/* Subtitle details */}
                <div className="z-10 text-left bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-2 pt-6 rounded-b-xl">
                  <h4 className="text-[11px] font-black text-slate-100 truncate">{currentlyPlayingClass.title}</h4>
                  <p className="text-[9px] text-brand-yellow font-medium">Instructor: {currentlyPlayingClass.instructor}</p>
                </div>
              </div>

              {/* Progress and Timeline Scrubber slider */}
              <div className="space-y-1">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={currentTimeProgress}
                  onChange={handleProgressSlider}
                  className="w-full accent-brand-yellow h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center text-[9px] text-slate-550 font-mono">
                  <span>{Math.floor((currentlyPlayingClass.videoDurationSec * currentTimeProgress) / 100 / 60)}m elapsed</span>
                  <span>{currentlyPlayingClass.duration} total duration</span>
                </div>
              </div>

              {/* Notebook / Teacher's whiteboard snap */}
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5 font-mono">
                <span className="text-[8px] text-brand-yellow font-bold uppercase tracking-wider block">
                  Interactive Board Worksheet Snap
                </span>
                <pre className="text-[9px] text-slate-350 leading-relaxed overflow-x-auto whitespace-pre-wrap font-sans bg-slate-955 p-2 rounded border border-slate-850">
                  {whiteboardText}
                </pre>
              </div>

              {/* Interactive Attendance register trigger inside the class */}
              <div className="bg-brand-blue-dark/35 border border-brand-blue/30 p-3 rounded-xl flex items-center justify-between gap-1">
                <div className="space-y-0.5 flex-1">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-mono">STEP 3: SECURE ABSOLUTE PRESENCE</span>
                  <span className="text-[10px] font-extrabold text-slate-200">Confirm Class Attendance ID</span>
                </div>
                
                <button
                  onClick={() => handleMarkAttendanceForClass(currentlyPlayingClass.id, currentlyPlayingClass.title)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-[10px] font-extrabold rounded-lg flex items-center gap-1 cursor-pointer shadow transition-all hover:scale-102"
                >
                  <NotebookPen className="w-3 h-3" />
                  <span>Mark Present ✓</span>
                </button>
              </div>

              {/* ======================================================= */}
              {/* BRAND NEW: MINDY AI INTERACTIVE STUDY SUITE FOR LECTURES */}
              {/* ======================================================= */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3.5 mt-3 shadow-inner">
                {/* Header block with glow & micro badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-brand-yellow/10 rounded-lg text-brand-yellow">
                      <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-100 flex items-center gap-1">
                        <span>Mindy AI Study Suite</span>
                        <span className="text-[8px] px-1 bg-slate-950 font-bold border border-slate-850 text-brand-yellow rounded">ACTIVE</span>
                      </h4>
                      <span className="text-[9px] text-slate-500 block">CBSE & British syllabus personalized assistant</span>
                    </div>
                  </div>
                  
                  {/* Tab Swappers */}
                  <div className="flex bg-slate-950 p-0.5 border border-slate-850 rounded-lg text-[9px] font-bold">
                    <button
                      onClick={() => setAiTab("flashcards")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all ${aiTab === "flashcards" ? "bg-slate-900 text-brand-yellow font-black border border-slate-800" : "text-slate-500"}`}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setAiTab("qa")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all ${aiTab === "qa" ? "bg-slate-900 text-brand-yellow font-black border border-slate-800" : "text-slate-500"}`}
                    >
                      Doubt Q&A
                    </button>
                  </div>
                </div>

                {/* TAB CONTENT A: HIGHLY INTERACTIVE PERSPECTIVE REVISION CARDS */}
                {aiTab === "flashcards" && (
                  <div className="space-y-3">
                    {aiFlashcards.length === 0 ? (
                      <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-lg text-center space-y-3 animate-fade-in">
                        <div className="w-9 h-9 rounded-full bg-brand-yellow/10 flex items-center justify-center mx-auto text-brand-yellow">
                          <Brain className="w-4 h-4 text-brand-yellow" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-slate-200">Prepare for Exam Questions</h5>
                          <p className="text-[10px] text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                            Generate cards custom-tailored to *"{currentlyPlayingClass.title}"* to master syllabus rules and get instant tips.
                          </p>
                        </div>
                        <button
                          onClick={() => handleGenerateAiFlashcards(currentlyPlayingClass)}
                          disabled={isGeneratingCards}
                          className="px-4 py-2 bg-gradient-to-r from-brand-yellow to-brand-gold text-slate-950 font-black text-[10px] rounded-lg tracking-wide hover:from-brand-gold active:scale-95 cursor-pointer disabled:opacity-50 transition-all flex items-center gap-1.5 mx-auto"
                        >
                          {isGeneratingCards ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Sustaining AI Mind...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              <span>Generate Revision Cards (+20 XP)</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-fade-in text-center">
                        {/* Interactive 3D Perspective Flip Card */}
                        <div 
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="cursor-pointer group perspective-1000 w-full min-h-[110px]"
                        >
                          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isCardFlipped ? "rotate-y-180" : ""}`}>
                            
                            {/* Card Front Component */}
                            <div className={`w-full min-h-[110px] bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between text-left backface-hidden ${isCardFlipped ? "opacity-0 absolute pointer-events-none" : "opacity-100"}`}>
                              <div className="space-y-1">
                                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono block">REVISION CARD {activeCardIdx + 1} OF {aiFlashcards.length}</span>
                                <p className="text-xs font-semibold text-slate-100 leading-snug">
                                  {aiFlashcards[activeCardIdx].question}
                                </p>
                              </div>
                              <div className="flex justify-between items-center text-[9px] pt-3 text-slate-450 border-t border-slate-900 mt-2">
                                <span className="flex items-center gap-1 text-slate-300">
                                  <Lightbulb className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                                  <span className="truncate max-w-[180px]">Clue: {aiFlashcards[activeCardIdx].hint}</span>
                                </span>
                                <span className="text-brand-yellow font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
                                  <RotateCw className="w-2.5 h-2.5 animate-spin-reverse" /> TAP TO FLIP
                                </span>
                              </div>
                            </div>

                            {/* Card Back Component */}
                            <div className={`w-full min-h-[110px] bg-slate-950 border border-brand-yellow/30 rounded-xl p-4 flex flex-col justify-between text-left backface-hidden transform rotate-y-180 ${isCardFlipped ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>
                              <div className="space-y-1">
                                <span className="text-[8px] text-brand-yellow uppercase tracking-widest font-mono block">MINDY ANSWER</span>
                                <p className="text-xs font-medium text-slate-200 leading-snug">
                                  {aiFlashcards[activeCardIdx].answer}
                                </p>
                              </div>
                              <div className="flex justify-between items-center text-[9px] pt-3 text-slate-450 border-t border-slate-900 border-dashed mt-2">
                                <span className="text-emerald-400 font-bold uppercase block text-[8px]">MODEL SOLUTION VERIFIED</span>
                                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">
                                  TAP FRONT SIDE
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Pagination Steppers and XP reward */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCardNav("prev"); }}
                              disabled={activeCardIdx === 0}
                              className="w-7 h-7 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-350 disabled:opacity-30 rounded-lg flex items-center justify-center cursor-pointer active:scale-95 transition-all text-xs"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCardNav("next"); }}
                              disabled={activeCardIdx === aiFlashcards.length - 1}
                              className="w-7 h-7 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-350 disabled:opacity-30 rounded-lg flex items-center justify-center cursor-pointer active:scale-95 transition-all text-xs"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* XP and status indicator */}
                          <div className="text-[10px] font-medium">
                            {hasAwardedAiClassBonus.includes(currentlyPlayingClass.id) ? (
                              <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/10">
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Study completed (+20 XP Granted)</span>
                              </span>
                            ) : (
                              <span className="text-slate-500 font-mono text-[9px]">
                                Reviewed: {viewedCardsIndices.length} / 3 to earn XP
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB CONTENT B: CLASS DOUBTS Q&A PORT */}
                {aiTab === "qa" && (
                  <div className="space-y-3.5 animate-fade-in">
                    {/* Doubt Answer Container (reveals answer beautifully) */}
                    {aiAnswerResponse ? (
                      <div className="bg-slate-955 border border-slate-850 p-3 rounded-xl space-y-2 max-h-[140px] overflow-y-auto Scrollbar-thin animate-fade-in text-[11px] leading-relaxed relative">
                        <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-1 bg-slate-955 sticky top-0">
                          <span className="text-[8px] text-brand-yellow font-bold uppercase tracking-wider block font-mono">Plato Instructor Mindy</span>
                          <button
                            onClick={() => setAiAnswerResponse("")}
                            className="text-[8.5px] text-slate-500 hover:text-slate-350"
                          >
                            Clear Answer ×
                          </button>
                        </div>
                        <div className="text-slate-300 font-light whitespace-pre-line font-sans">
                          {aiAnswerResponse}
                        </div>
                      </div>
                    ) : isExplainingLecture ? (
                      /* Thinking Loader representation */
                      <div className="bg-slate-950/60 p-5 border border-dashed border-slate-850 rounded-xl text-center flex flex-col items-center justify-center space-y-2">
                        <Loader2 className="w-6 h-6 text-brand-yellow animate-spin" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-300 block">Formulating Study Resolution</span>
                          <span className="text-[9px] text-slate-500 block leading-tight">Analyzing lecture formulas and board criteria...</span>
                        </div>
                      </div>
                    ) : (
                      /* Zero state explaining AI Q&A capabilities */
                      <div className="bg-slate-955 p-3 border border-slate-850 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-slate-950 text-brand-yellow rounded-lg">
                          <Brain className="w-4 h-4 text-brand-yellow" />
                        </div>
                        <div className="space-y-0.5">
                          <h6 className="text-[11px] font-bold text-slate-300">Stuck on calculation steps?</h6>
                          <p className="text-[9.5px] text-slate-500 leading-snug">
                            Type your specific doubt below to get contextual step instructions matched with your syllabus board rules.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Question Input form fields */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAskMindyQuestion(currentlyPlayingClass);
                      }}
                      className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-850"
                    >
                      <input
                        type="text"
                        placeholder="e.g. Can you explain why Σ F_y must equal 0?"
                        value={studentQuestion}
                        onChange={(e) => setStudentQuestion(e.target.value)}
                        className="flex-1 bg-transparent px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none placeholder-slate-650"
                      />
                      <button
                        type="submit"
                        disabled={!studentQuestion.trim() || isExplainingLecture}
                        className="p-1.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 rounded-md disabled:opacity-45 cursor-pointer active:scale-95 transition-all"
                      >
                        <Send className="w-3.5 h-3.5 text-slate-950" />
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>
          ) : null}

          {/* SECTION A: FILTERABLE LECTURE ARCHIVES */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-brand-yellow" />
                <span>Recorded Class Catalog</span>
              </span>
              <span className="text-[9px] text-slate-500">Dubai Board Archives</span>
            </div>

            {/* In-tab search bar filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search recorded subjects, teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-[11px] text-slate-200 placeholder-slate-650 focus:outline-none focus:border-brand-yellow"
                />
              </div>

              {/* Curriculum Selector Pill filters */}
              <select
                value={activeCurriculumFilter}
                onChange={(e) => setActiveCurriculumFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-[10px] text-slate-350 px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Boards</option>
                <option value="CBSE">CBSE India</option>
                <option value="British">British (IGCSE)</option>
              </select>
            </div>

            {/* List entries */}
            <div className="space-y-2.5">
              {filteredRecordedClasses.length > 0 ? (
                filteredRecordedClasses.map((cls) => {
                  const isPresentLogged = attendanceLogs.some(log => log.studentName === currentProfile.name && log.classId === cls.id);
                  const isClassAligned = cls.curriculum === currentProfile.curriculum;
                  
                  return (
                    <div 
                      key={cls.id}
                      className={`bg-slate-900/80 border rounded-xl p-3 flex flex-col justify-between space-y-2.5 transition-all relative overflow-hidden group ${
                        isClassAligned ? "border-brand-yellow/20" : "border-slate-800"
                      }`}
                    >
                      {/* Highlight recommended items matching current student syllabus */}
                      {isClassAligned && (
                        <div className="absolute top-0 right-0 bg-brand-yellow/15 text-brand-yellow px-1.5 py-0.5 rounded-bl text-[8px] font-bold tracking-wide">
                          RECOMMENDED FOR SYLLABUS
                        </div>
                      )}

                      <div className="flex items-start gap-2.5">
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-850 flex-shrink-0 text-brand-yellow">
                          <Play className="w-4 h-4 fill-current text-brand-yellow group-hover:scale-105 transition-transform" />
                        </div>
                        
                        <div className="space-y-0.5 min-w-0 pr-12">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[8px] font-extrabold text-brand-yellow uppercase">
                              {cls.curriculum} • {cls.grade}
                            </span>
                            <span className="text-[8px] font-medium text-slate-500 font-mono">
                              ({cls.duration})
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-slate-200 leading-tight truncate group-hover:text-brand-yellow transition-colors">
                            {cls.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                            {cls.summary}
                          </p>
                        </div>
                      </div>

                      {/* Instructor subline and action triggers */}
                      <div className="pt-2 border-t border-slate-850/60 flex items-center justify-between text-[10px] text-slate-450">
                        <p className="truncate max-w-[130px]">Led by: <strong className="text-slate-350 font-medium">{cls.instructor}</strong></p>
                        
                        <div className="flex items-center gap-2">
                          {isPresentLogged && (
                            <span className="text-[9px] text-emerald-400 font-black flex items-center gap-0.5 bg-emerald-950/20 px-1.5 py-0.2 rounded border border-emerald-500/10">
                              <Check className="w-2.5 h-2.5" />
                              PRESENT
                            </span>
                          )}

                          <button
                            onClick={() => handleLaunchVideo(cls)}
                            className="px-3 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-brand-yellow text-slate-200 hover:text-brand-yellow font-extrabold text-[10px] rounded-md cursor-pointer transition-all active:scale-98"
                          >
                            Play Class
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 bg-slate-900/10 border border-dashed border-slate-800 rounded-xl text-center text-slate-550 text-xs font-light">
                  No matching recorded school classes found for filters.
                </div>
              )}
            </div>
          </div>

          {/* SECTION B: MY SIGNED ATTENDANCE LOG */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>My Attendance Register History</span>
              </span>
              <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-1.5 rounded font-mono font-bold uppercase">
                Term Registry
              </span>
            </div>

            <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
              {attendanceLogs.length > 0 ? (
                attendanceLogs.map((log) => (
                  <div 
                    key={log.id}
                    className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex items-center justify-between text-[10.5px]"
                  >
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-slate-200 line-clamp-1">{log.classTitle}</h5>
                      <p className="text-[9px] text-slate-500">
                        {log.dateStr} at {log.timeStr}
                      </p>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="text-[9.5px] font-black text-emerald-400 block">
                        Present ✓
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-550 block">
                        {log.verificationCode}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-slate-650 text-[10px] italic">
                  No attendance swiped yet. Run a lesson simulator and click present above!
                </div>
              )}
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850 flex items-start gap-1.5 text-[9.5px] text-slate-450 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 mt-0.5" />
              <p>
                Attendance verified records are automatically synchronized with Plato Planet's Al Qusais counselor database for annual CBSE / British syllabus qualifications. Keep a minimum 80% score to maintain your active discount vouchers.
              </p>
            </div>
          </div>
        </>
      )}

      {/* ======================================================= */}
      {/* INTERACTIVE STAR FEEDBACK MODAL OVERLAY                 */}
      {/* ======================================================= */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute -right-16 -top-16 w-36 h-36 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
            
            {!feedbackSubmitted ? (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-1.5 py-0.5 rounded font-extrabold uppercase font-mono tracking-widest">
                      Quality Control
                    </span>
                    <span className="text-[8px] bg-slate-950 text-slate-450 border border-slate-850 px-1.5 py-0.5 rounded font-mono">
                      Plato Hub
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5 mt-1">
                    <MessageSquare className="w-4 h-4 text-brand-yellow" />
                    <span>Improve Training Experience</span>
                  </h3>
                  <p className="text-[9.5px] text-slate-450 leading-relaxed">
                    Your live rating influences teaching material and workbook updates across our Dubai hubs. Tell us how we are doing today!
                  </p>
                </div>

                {/* Star selection component */}
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-2xl border border-slate-850/60 text-center">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                    Tap to Rate Center
                  </span>
                  
                  <div className="flex items-center justify-center gap-2.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      >
                        <Star 
                          className={`w-6 h-6 transition-all ${
                            star <= feedbackRating 
                              ? "fill-brand-yellow text-brand-yellow drop-shadow-[0_0_4px_rgba(234,179,8,0.25)]" 
                              : "text-slate-700 hover:text-slate-500"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-black text-brand-yellow block font-mono uppercase tracking-wide">
                    {feedbackRating === 1 && "⚠️ Needs Attention"}
                    {feedbackRating === 2 && "📚 Fair / Average"}
                    {feedbackRating === 3 && "👍 Worthy study tool"}
                    {feedbackRating === 4 && "🔥 Very Interactive"}
                    {feedbackRating === 5 && "🌟 Stellar Experience!"}
                  </span>
                </div>

                {/* Quick Touch Suggestions Presets */}
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                    Quick Suggestion Tag:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { text: "Excellent mentors! 🏫", rating: 5 },
                      { text: "Love the whiteboard math snaps! 📝", rating: 5 },
                      { text: "Mindy Assistant helps me pass board tests! 🧠", rating: 5 },
                      { text: "Needs more trial slot options 📅", rating: 3 }
                    ].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setFeedbackComment((prev) => 
                            prev ? `${prev} ${preset.text}` : preset.text
                          );
                          setFeedbackRating(preset.rating);
                        }}
                        className="px-2 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-[8.5px] rounded-lg transition-colors cursor-pointer"
                      >
                        {preset.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment textarea */}
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-slate-450 uppercase tracking-wider block font-mono">
                    Syllabus remarks or general feedback:
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Provide any additional tips or training hub recommendations to help our Dubai faculty..."
                    className="w-full bg-slate-955 border border-slate-850 focus:border-brand-yellow/60 rounded-xl p-2.5 text-[10px] text-slate-200 placeholder-slate-650 focus:outline-none transition-colors resize-none font-sans"
                  />
                </div>

                {/* Actions row */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(false)}
                    className="flex-1 py-2 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-450 hover:text-slate-200 text-[10px] font-bold uppercase rounded-xl transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackSubmitted(true);
                      // Award structured XP points for interactive citizenship
                      onAwardXp(20);
                      triggerNotification(
                        "⭐ Feedback Received!", 
                        `Thank you! You have been awarded +20 XP points.`
                      );
                    }}
                    className="flex-1 py-2 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer text-center shadow-md active:scale-95"
                  >
                    Submit Feedback
                  </button>
                </div>
              </>
            ) : (
              /* Success confirmation state */
              <div className="text-center py-5 space-y-4">
                <div className="w-12 h-12 bg-emerald-950/40 border-2 border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                  <CheckCircle className="w-6 h-6 animate-pulse text-emerald-400" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-100">
                    Review Saved Successfully!
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed px-2 font-sans">
                    Thank you, <strong className="text-brand-yellow">{currentProfile.name}</strong>, for supporting our high standards. Your detailed comments are now synced for faculty review.
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-2.5 py-0.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-md text-[9px] text-brand-yellow font-bold font-mono">
                      ✨ CITIZEN BONUS: +20 XP CLAIMED!
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                  className="w-full py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-slate-100 font-extrabold text-[10px] uppercase rounded-xl transition-all cursor-pointer block"
                >
                  Return to portal hub
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
