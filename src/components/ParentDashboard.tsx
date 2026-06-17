import React, { useState } from "react";
import { StudentProfile } from "../types";
import { 
  Users, 
  Calendar, 
  Trophy, 
  Sparkles, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldCheck, 
  Download, 
  Send,
  Sparkle,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Video
} from "lucide-react";
import { useGlobalAction } from "./GlobalActionContext";
import { getStoredPlatosPlanetConfig } from "../platosPlanetConfig";

interface ParentDashboardProps {
  profile: StudentProfile;
  onNavigateToTab: (tab: string) => void;
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function ParentDashboard({
  profile,
  onNavigateToTab,
  onTriggerNotification
}: ParentDashboardProps) {
  const { openModal } = useGlobalAction();
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;
  // Tabs within Parent dashboard: "overview" | "subjects" | "actions" | "copilot"
  const [parentTab, setParentTab] = useState<"overview" | "subjects" | "actions" | "copilot">("overview");

  // Local state for fee, counselor meeting, or query simulation
  const [unpaidFees, setUnpaidFees] = useState(1450);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [inputText, setInputText] = useState("");

  // AI Assistant Chat state (specific to parent concerns)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: `Hello! I am Plato parent advisor. I have analyzed Student 1's performance profile in British IGCSE. Ask me anything about their exam readiness, weak chapters, revision load, or attendance.`
    }
  ]);

  // Standard predefined parent questions
  const presetQuestions = [
    { q: "How is my child doing?", type: "status" },
    { q: "What should we improve?", type: "improve" },
    { q: "Are we exam ready?", type: "ready" }
  ];

  const triggerPresetQuestion = (text: string, type: string) => {
    // Add user message
    const userMsg = { sender: "user" as const, text };
    let aiResponse = "";

    if (type === "status") {
      aiResponse = `📊 **Child Success Status**: Student 1's academic health is currently **GOOD (82% Exam Ready)**.\n\nHe has maintained a stellar **6-Day Study Streak** and registered excellent attendance (**94.5%** across tutoring logs). Physics is his strongest subject (Grade A, 88% mastery), while Chemistry is his primary development area (Grade B, weak on Organic Chemistry).`;
    } else if (type === "improve") {
      aiResponse = `🎯 **Actionable Improvement Plan**:\n\n1. **Chemistry Organic compounds**: Have him solve the specialized *Organic Chemistry Practice Sheet* on Plato's Revision Vault.\n2. **Physics Electromagnetism**: Re-watch Teacher 1's live lecture replay in the Media Hub.\n3. **Weekly Practice**: Complete Wednesday's diagnostic mock paper. An incremental score improvement of **+6%** is projected if completed this week!`;
    } else {
      aiResponse = `📅 **Exam Readiness Projection**:\n\n* **Current Readiness**: 82%\n* **Projected Grade by June 2026**: physics (A), Mathematics (A*), Chemistry (B).\n* **Calculated Workload**: Recommended 45 minutes of daily focused revision on Plato's app to ensure readiness increases to **89%** prior to board exam simulations next month. At-risk score indicator is **LOW**.`;
    }

    setChatMessages(prev => [...prev, userMsg]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
      onTriggerNotification("✨ Plato parent AI Synced", "Parsed and formulated study plan logs.");
    }, 600);
  };

  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInputText("");

    setTimeout(() => {
      const respText = `📝 Thanks for asking! I've logged Student 1's continuous study performance tracking. He recently achieved high marks on his past paper trials (+150 XP achieved today). I highly recommend having him attend the upcoming Live Chemistry Class. Would you like me to schedule a 1-on-1 PTM Counseling Session with his Academic Coach?`;
      setChatMessages(prev => [...prev, { sender: "ai", text: respText }]);
    }, 600);
  };

  const payOutstandingFees = () => {
    openModal("PARENT_PAY_FEES", { outstanding: unpaidFees });
  };

  const bookMeeting = () => {
    openModal("PARENT_BOOK_PTM");
  };

  return (
    <div id="parent-success-dashboard-root" className="px-4 py-6 space-y-6 max-w-7xl mx-auto pb-28 text-left font-sans select-none">
      
      {/* 1. Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-805 shadow-xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 flex-1">
            <span className="text-[9.5px] uppercase font-mono font-black text-indigo-400 bg-indigo-500/15 border border-indigo-500/25 px-2.5 py-0.5 rounded-full inline-block tracking-wider">
              PARENT SUCCESS CONSOLE
            </span>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              <span>Hi, Parent 1</span> <span className="text-xl">👋</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Track your child <strong className="text-slate-100">{profile.name}</strong>'s school performance, syllabus coverages, and boarding exam readiness in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl w-full sm:w-44 text-center leading-none">
              <span className="text-[8.5px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                ACADEMIC HEALTH
              </span>
              <span className="text-lg font-black text-emerald-400 block tracking-tight">
                GOOD (82%)
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl w-full sm:w-44 text-center leading-none">
              <span className="text-[8.5px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                EXAM RISK PROFILE
              </span>
              <span className="text-lg font-black text-amber-500 block tracking-tight">
                MINIMAL 🛡️
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Parent Quick Actions:
        </span>
        <button
          onClick={() => openModal("PARENT_PAY_FEES", { outstanding: unpaidFees })}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Pay Fees"
        >
          <span>💳 Pay Fees</span>
        </button>
        <button
          onClick={() => openModal("PARENT_BOOK_PTM")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Book Meeting"
        >
          <span>📆 Book PTM Meeting</span>
        </button>
        <button
          onClick={() => openModal("PARENT_MESSAGE_TEACHER")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Message Teacher"
        >
          <span>💬 Message Teacher</span>
        </button>
        <button
          onClick={() => openModal("PARENT_VIEW_REPORT", { profile })}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="View Report"
        >
          <span>📋 View Progress Report</span>
        </button>
      </div>

      {/* 2. Parent-specific Navigation segments */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 pr-4 no-scrollbar scroll-smooth">
        {(
          [
            { id: "overview", label: "🏡 Summary Snapshot" },
            { id: "subjects", label: "📚 Subject Analytics" },
            { id: "copilot", label: "🧠 Parent AI Assistant" },
            { id: "actions", label: "⚙️ Parent Action HQ" }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setParentTab(tab.id)}
            className={`px-4 py-2 whitespace-nowrap text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              parentTab === tab.id
                ? "bg-indigo-500 text-white font-black shadow-lg shadow-indigo-500/20"
                : "bg-slate-900 text-slate-455 hover:text-slate-200 border border-slate-805"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Render Dashboard depending on view */}

      {/* VIEW A: SUMMARY SNAPSHOT (WEALTHFRONT FOR EDUCATION IMPLEMENTATION) */}
      {parentTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Wealthfront Style: Academic Capital Allocation Header Portfolio */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-electric-blue/10 via-neon-cyan/5 to-transparent blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              
              {/* Left Column: Investment (Academic) Health */}
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-mint ring-4 ring-neon-mint/20 animate-pulse" />
                  <span className="text-[9px] font-mono font-black text-neon-mint uppercase tracking-widest">
                    ACTIVE PORTFOLIO APPRAISAL STATE
                  </span>
                </div>
                <h3 className="text-3xl font-display font-black text-white tracking-tight leading-none">
                  Student 1's Academic Index Score: <span className="text-neon-cyan font-mono font-black">87%</span>
                </h3>
                <div className="flex items-center gap-2.5 text-[11px] text-slate-350">
                  <span className="text-neon-mint font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +3.4% projected growth
                  </span>
                  <span>•</span>
                  <span>Compared to Cambridge standard peer velocity</span>
                </div>
              </div>

              {/* Right Column: Key Wealthfront Portfolio Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center leading-none flex flex-col justify-between">
                  <span className="text-[7.5px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2 leading-none">ATTENDANCE TREND</span>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-white block">94.5%</span>
                    <span className="text-[8px] text-neon-mint font-semibold block leading-none">🚀 96% Projected</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center leading-none flex flex-col justify-between">
                  <span className="text-[7.5px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2 leading-none">RISK ASSESSMENT</span>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-neon-cyan block">MINIMAL 🛡️</span>
                    <span className="text-[8px] text-neon-cyan/70 font-semibold block leading-none">Safe Orbit</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center leading-none flex flex-col justify-between col-span-2 sm:col-span-1">
                  <span className="text-[7.5px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2 leading-none">STUDY STREAK</span>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-hot-coral block">14 Days</span>
                    <span className="text-[8px] text-hot-coral/70 font-semibold block leading-none">Dubai Top 5%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Academic Asset Allocation & Predictive Grade Benchmarks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Asset Class Breakdown (IGCSE Subjects & Predicted Performance) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl text-left space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-neon-cyan">
                    📊 ACADEMIC ASSET ALLOCATION
                  </h3>
                  <p className="text-[10px] text-slate-450 mt-1">Real-time mastery index & June 2026 Board predicted grades</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neon-cyan" />
              </div>

              {/* Subject Asset table modeled after wealth allocation charts */}
              <div className="space-y-5">
                {[
                  {
                    subject: "Physics (Extended IGCSE)",
                    instructor: "Teacher 1",
                    mastery: 88,
                    grade: "A",
                    improvement: "+2.4%",
                    color: "bg-electric-blue",
                    textColor: "text-neon-cyan",
                    textGlow: "shadow-[0_0_8px_rgba(0,102,255,0.4)]"
                  },
                  {
                    subject: "Chemistry (Extended IGCSE)",
                    instructor: "Teacher 3",
                    mastery: 74,
                    grade: "B",
                    improvement: "+4.1%",
                    color: "bg-neo-purple",
                    textColor: "text-purple-400",
                    textGlow: "shadow-[0_0_8px_rgba(157,78,221,0.4)]"
                  },
                  {
                    subject: "Advanced Mathematics",
                    instructor: "Teacher 2",
                    mastery: 95,
                    grade: "A*",
                    improvement: "+1.0%",
                    color: "bg-neon-cyan",
                    textColor: "text-neon-cyan",
                    textGlow: "shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                  }
                ].map((fb, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <div>
                        <strong className="text-slate-100">{fb.subject}</strong>
                        <span className="text-[9px] text-slate-500 block">Instructor: {fb.instructor}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-black text-white bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-lg text-xs">
                          Class Grade: {fb.grade}
                        </span>
                        <span className="text-[9px] text-neon-mint font-black block mt-1">{fb.improvement} Improvement</span>
                      </div>
                    </div>

                    {/* Horizontal asset bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-white/[0.02]">
                      <div 
                        className={`h-full rounded-full ${fb.color} ${fb.textGlow} transition-all duration-500`}
                        style={{ width: `${fb.mastery}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-500 pt-0.5">
                      <span>CURRENT MASTERY: {fb.mastery}%</span>
                      <span className="text-neon-cyan">TARGET: A* (92%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Column containing Alerts, PTM Video Conferences, and quick actions */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Intelligent Risk & Academic Alert system */}
              <div className="p-5 rounded-3xl bg-slate-900/65 border border-slate-800 text-left space-y-3 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-neon-cyan/5 blur-xl rounded-full" />
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-neon-mint shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-black text-white uppercase tracking-wider leading-none">PORTFOLIO SECURITY HEALTH</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      Student 1's risk model is logged as <strong className="text-neon-mint">EXCEPTIONAL</strong>. High homework completion scores and regular revision sessions suggest a safe path towards Grade A/A* without risk of learning loss.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Payment Alert Box */}
              {unpaidFees > 0 ? (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-3.5 text-left">
                  <div className="flex items-start gap-2.5 text-rose-450">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black uppercase tracking-wider">Unpaid Term Balance</h4>
                      <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">
                        Outstanding fees of **AED 1,450.00** are due for Semester Tutoring programs. Clear immediately to maintain uninterrupted progress logs.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={payOutstandingFees}
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/10"
                  >
                    <CreditCard className="w-4 h-4 fill-current" /> Pay Now via Stripe/Apple Pay
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-left flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">A/C Fully Cleared</h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal font-semibold mt-0.5">
                      No unpaid tuition balances found. Thank you for your continued stellar commitment to Plato's Planet.
                    </p>
                  </div>
                </div>
              )}

              {/* Booking 1-on-1 counselor block */}
              <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-[11px] text-left space-y-3.5">
                <div className="space-y-1">
                  <p className="text-[8px] font-mono font-black text-indigo-400 uppercase tracking-widest block leading-none">
                    ACADEMIC COUNSELING
                  </p>
                  <h4 className="text-xs font-black text-slate-200">PTM Parent-Teacher Meetings</h4>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                    Arrange a live digital video conference with the coordinator or Student 1's primary lecturers.
                  </p>
                </div>

                {!meetingBooked ? (
                  <button
                    onClick={bookMeeting}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-amber-500 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5 text-amber-500" /> Book Thursday Video Call
                  </button>
                ) : (
                  <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 font-semibold text-[10px] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>PTM Video call logged: Thursday 6:00 PM GST</span>
                  </div>
                )}
              </div>

              {/* Quick direct download of past transcript reports */}
              <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-2xl text-left space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Download Diagnostic Reports</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => onTriggerNotification("📂 Download initiated", "Downloaded May IGCSE mock grading matrix sheet.")}
                    className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-855 text-[9.5px] text-slate-400 font-extrabold rounded-lg flex items-center justify-between px-3 transition-all cursor-pointer"
                  >
                    <span>May IGCSE Mock Transcript.pdf</span>
                    <Download className="w-3 h-3 text-amber-500 animate-bounce" />
                  </button>

                  <button
                    onClick={() => onTriggerNotification("📂 Download initiated", "Downloaded Diagnostic analysis study tracker profile.")}
                    className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-855 text-[9.5px] text-slate-400 font-extrabold rounded-lg flex items-center justify-between px-3 transition-all cursor-pointer"
                  >
                    <span>Syllabus Progress Analysis.pdf</span>
                    <Download className="w-3 h-3 text-indigo-400" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW B: SUBJECT DETAILS */}
      {parentTab === "subjects" && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {branches[0] || 'Main Branch'} Syllabus Analytics
            </h3>
            <p className="text-[11.5px] text-slate-450 leading-relaxed font-semibold">
              Deep dive diagnostic metrics logged across secondary grade learning paths. Track predicted vs target score metrics in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Physics",
                grade: "A",
                target: "A*",
                mastery: 88,
                testAvg: "89.2%",
                attendance: "96.4%",
                weakness: "Electric Circuits & Thermal equations",
                trend: "+2.4% this week",
                rec: "Solve Electromagnetism revision paper before Thursday class."
              },
              {
                title: "Chemistry",
                grade: "B",
                target: "A",
                mastery: 74,
                testAvg: "78.5%",
                attendance: "92.0%",
                weakness: "Organic Carbon Compounds & Esterification",
                trend: "+4.1% this week",
                rec: "Generate the customized Mindy AI chemistry summary and complete flashcards."
              },
              {
                title: "Mathematics",
                grade: "A*",
                target: "A*",
                mastery: 95,
                testAvg: "96.8%",
                attendance: "98.0%",
                weakness: "Vector Geometry representation",
                trend: "Steady high-performer",
                rec: "Complete advanced Mock simulation variant 3 as final practice."
              },
              {
                title: "Biology",
                grade: "A",
                target: "A*",
                mastery: 82,
                testAvg: "85.0%",
                attendance: "91.8%",
                weakness: "Respiration cycle formula details",
                trend: "+1.2% this week",
                rec: "Review revision sheet under secondary grade files."
              },
              {
                title: "English Language",
                grade: "A",
                target: "A",
                mastery: 86,
                testAvg: "87.4%",
                attendance: "94.0%",
                weakness: "Creative write outline constructs",
                trend: "Expected grade target met",
                rec: "Submit upcoming outline task directly to the academic coach online."
              }
            ].map((subject, idx) => (
              <div 
                key={idx}
                className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-500/20 transition-all text-left"
              >
                <div className="space-y-3">
                  {/* Subject Name and Grade badges */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">{subject.title}</h4>
                      <span className="text-[8.5px] font-mono text-emerald-400 font-extrabold">{subject.trend}</span>
                    </div>

                    <div className="flex items-center gap-1.5 leading-none">
                      <div className="bg-slate-900 border border-slate-800 text-[10.5px] font-black font-mono tracking-tight p-2 rounded-xl text-center">
                        <span className="text-slate-500 block text-[6.5px] uppercase font-bold leading-normal mb-0.5">CURRENT</span>
                        <span className="text-amber-500 font-extrabold block">{subject.grade}</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 text-[10.5px] font-black font-mono tracking-tight p-2 rounded-xl text-center">
                        <span className="text-slate-500 block text-[6.5px] uppercase font-bold leading-normal mb-0.5">TARGET</span>
                        <span className="text-indigo-400 font-bold block">{subject.target}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progressive visual bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono uppercase text-slate-500">
                      <span>Curriculum Mastery</span>
                      <span className="text-white font-bold">{subject.mastery}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${subject.mastery}%` }}
                      />
                    </div>
                  </div>

                  {/* Detailed metrics details */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] leading-tight pb-1 pt-1">
                    <div className="bg-slate-900/40 border border-slate-855 rounded-lg p-2 text-left">
                      <span className="text-[7.5px] text-slate-500 font-black block tracking-wider uppercase mb-0.5">TEST AVG</span>
                      <strong className="text-slate-200">{subject.testAvg}</strong>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-855 rounded-lg p-2 text-left">
                      <span className="text-[7.5px] text-slate-500 font-black block tracking-wider uppercase mb-0.5">ATTENDANCE</span>
                      <strong className="text-slate-200">{subject.attendance}</strong>
                    </div>
                  </div>

                  {/* Weak areas highlighting */}
                  <div className="p-2 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-0.5 text-left">
                    <span className="text-[7.5px] text-rose-400 font-black tracking-widest uppercase block mb-0.5">WEAK AREA DETECTED</span>
                    <p className="text-[9.5px] font-bold text-slate-300 leading-snug">{subject.weakness}</p>
                  </div>
                </div>

                {/* AI Recommendation action */}
                <div className="pt-2.5 border-t border-slate-900/80 text-[10px] text-left leading-relaxed">
                  <span className="text-slate-500 block text-[7px] uppercase font-black tracking-widest">AI REASSURANCE DIRECTIVE</span>
                  <p className="text-slate-350 mt-0.5 font-medium">{subject.rec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW C: PARENT AI COPILOT */}
      {parentTab === "copilot" && (
        <div id="parent-ai-copilot-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in text-left">
          
          {/* Left panel: Info & preset questions */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-black uppercase tracking-wider">Mindy Parent Support</h4>
              </div>
              <h3 className="text-sm font-black text-white">Ask Plato's Academic AI Advisor</h3>
              <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">
                Pose strategic queries regarding curriculum timelines, grade expectations, risk scores, or outstanding syllabus logs.
              </p>
            </div>

            {/* Presets query clicks */}
            <div className="space-y-2 pt-2">
              <span className="text-[7.5px] font-mono font-black text-slate-500 tracking-widest uppercase block">
                SUGGESTED ENQUIRIES TODAY
              </span>

              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerPresetQuestion(pq.q, pq.type)}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-850 hover:border-indigo-500/40 text-slate-300 text-[10.5px] font-bold hover:text-white transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>"{pq.q}"</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                </button>
              ))}
            </div>

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/25 rounded-xl flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="text-[10px] font-extrabold text-white uppercase tracking-wider">Privacy Guaranteed</h5>
                <p className="text-[9px] text-slate-400 leading-normal leading-relaxed text-indigo-350">
                  All conversational analysis runs server-side on secured Dubai-based academic nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel: Active Chat UI */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-850 p-4 rounded-3xl flex flex-col h-[460px] justify-between">
            <div id="parent-copilot-messages" className="flex-1 overflow-y-auto space-y-4 pr-1 scroll-smooth">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                    msg.sender === "user" ? "bg-amber-500 text-slate-950" : "bg-indigo-500 text-white"
                  }`}>
                    {msg.sender === "user" ? "👨‍👩‍👧" : "🤖"}
                  </div>

                  <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed font-semibold whitespace-pre-wrap ${
                    msg.sender === "user" 
                      ? "bg-amber-500 text-slate-950 rounded-tr-none font-bold" 
                      : "bg-slate-900 text-slate-200 border border-slate-855 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat inputs form */}
            <form onSubmit={handleCustomQuestion} className="pt-3.5 border-t border-white/[0.04] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your strategic query e.g. 'How is algebra progress?'"
                className="flex-1 bg-slate-900 border border-slate-850 focus:border-indigo-500 text-[11.5px] text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none"
              />

              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* VIEW D: PARENT ACTION HQ */}
      {parentTab === "actions" && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Parent Operations and Strategic Directives
            </h3>
            <p className="text-[11.5px] text-slate-450 leading-relaxed font-semibold">
              Authorized gateways to handle fee clearings, schedule appointments, submit doctor notes, or initiate a support chat ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Action Card A: Invoices & Receipts download */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" /> Invoice archives & Statements
              </h4>

              <div className="space-y-2 text-[11px] leading-tight font-semibold">
                {[
                  { id: "INV-612", date: "May 14, 2026", amt: "AED 1,450.00", status: "Due", isDue: true },
                  { id: "INV-441", date: "Apr 14, 2026", amt: "AED 1,450.00", status: "Paid", isDue: false },
                  { id: "INV-109", date: "Mar 11, 2026", amt: "AED 1,450.00", status: "Paid", isDue: false }
                ].map((inv) => (
                  <div key={inv.id} className="p-3 bg-slate-900/50 border border-slate-855 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-slate-100 font-bold block">{inv.id} ({inv.date})</span>
                      <span className="text-[9px] text-slate-500 block">Tuition Subscriptions Class hours</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold ${inv.isDue ? "text-rose-450" : "text-emerald-450"}`}>
                        {inv.amt}
                      </span>
                      <button 
                        onClick={() => onTriggerNotification("📄 Downloading Transaction receipt", `Dispatched PDF download for hash key ${inv.id}`)}
                        className="p-1 px-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-amber-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Card B: Administrative inputs submission form */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> File a school directive
              </h4>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono font-black text-slate-500">
                    Subject of matter
                  </span>
                  <select className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl outline-none font-bold">
                    <option>Absence or Health Notification</option>
                    <option>Transport Assistance Rescheduling</option>
                    <option>Schedule Batch Adjustment request</option>
                    <option>Curriculum Counseling inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono font-black text-slate-500">
                    Parent Narrative notes
                  </span>
                  <textarea 
                    placeholder="Provide details of your directive..."
                    className="w-full h-20 bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl placeholder-slate-650 font-bold outline-none resize-none"
                  />
                </div>

                {!feedbackSent ? (
                  <button
                    onClick={() => {
                      setFeedbackSent(true);
                      onTriggerNotification("✅ Narrative directive submitted", "Dispatched to regional center. SLA tracking activated.");
                    }}
                    className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Dispatch Directive to Admin Area
                  </button>
                ) : (
                  <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 font-extrabold text-[10px] text-center">
                    Directive Lodged! Support SLA tracking code: #PLA-901X3
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
