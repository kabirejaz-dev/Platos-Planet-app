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
      text: `Hello! I am Plato parent advisor. I have analyzed Zayd's performance profile in British IGCSE. Ask me anything about his exam readiness, weak chapters, revision load, or attendance.`
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
      aiResponse = `📊 **Child Success Status**: Zayd's academic health is currently **GOOD (82% Exam Ready)**.\n\nHe has maintained a stellar **6-Day Study Streak** and registered excellent attendance (**94.5%** across tutoring logs). Physics is his strongest subject (Grade A, 88% mastery), while Chemistry is his primary development area (Grade B, weak on Organic Chemistry).`;
    } else if (type === "improve") {
      aiResponse = `🎯 **Actionable Improvement Plan**:\n\n1. **Chemistry Organic compounds**: Have him solve the specialized *Organic Chemistry Practice Sheet* on Plato's Revision Vault.\n2. **Physics Electromagnetism**: Re-watch Dr. Richard Feynman's live lecture replay in the Media Hub.\n3. **Weekly Practice**: Complete Wednesday's diagnostic mock paper. An incremental score improvement of **+6%** is projected if completed this week!`;
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
      const respText = `📝 Thanks for asking! I've logged Zayd's continuous study performance tracking. He recently achieved high marks on his past paper trials (+150 XP achieved today). I highly recommend having him attend the upcoming Live Chemistry Class. Would you like me to schedule a 1-on-1 PTM Counseling Session with his Academic Coach?`;
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
              <span>Hi, Mr. Al-Mansoori</span> <span className="text-xl">👋</span>
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

      {/* VIEW A: SUMMARY SNAPSHOT */}
      {parentTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Key Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-1 text-left">
              <p className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                ATTENDANCE INDEX
              </p>
              <h4 className="text-lg font-bold text-white tracking-tight">94.5%</h4>
              <p className="text-[9.5px] text-emerald-400 font-bold">Excellent Coverage</p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-1 text-left">
              <p className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                HOMEWORK STATUS
              </p>
              <h4 className="text-lg font-bold text-white tracking-tight">21 / 22 Done</h4>
              <p className="text-[9.5px] text-slate-400 font-semibold">95.4% Rate</p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-1 text-left">
              <p className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                OUTSTANDING TUITION
              </p>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {unpaidFees > 0 ? "AED 1,450" : "AED 0.00"}
              </h4>
              <p className={`text-[9.5px] font-bold ${unpaidFees > 0 ? "text-rose-450" : "text-emerald-450"}`}>
                {unpaidFees > 0 ? "Term 2 Billing Due" : "Fully Cleared ✨"}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl space-y-1 text-left">
              <p className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                CURRENT STREAK
              </p>
              <h4 className="text-lg font-bold text-indigo-400 flex items-center gap-1">
                🔥 {profile.streak} Days
              </h4>
              <p className="text-[9.5px] text-amber-500 font-bold uppercase tracking-wider">Top 5% of Dubai</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Feedback timeline (Syllabus Coverage & PTM Comments) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Teacher Feedback & Updates
                  </h3>
                  <p className="text-[9px] text-slate-500 mt-0.5">Syllabus progression reports with actual coaching feedback points</p>
                </div>
                <BookOpen className="w-4 h-4 text-indigo-500" />
              </div>

              <div className="space-y-4">
                {[
                  {
                    subject: "Physics IGCSE",
                    instructor: "Dr. Richard Feynman",
                    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                    comment: "Zayd has achieved 88% mastery. His active recall in electromagnetism remains solid. Weakness is purely thermal equations.",
                    progress: 88,
                    rec: "Keep solving Variant past paper 2 over the coming week."
                  },
                  {
                    subject: "Chemistry IGCSE",
                    instructor: "Prof. Marie Curie",
                    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-550",
                    comment: "Strong in inorganic analysis. He fell slightly behind in organic chemical compounds but the app chatbot practice is correcting this.",
                    progress: 74,
                    rec: "Attempt 'Chemistry Organic 101' flashcards on revision menu."
                  },
                  {
                    subject: "Mathematics",
                    instructor: "Prof. Alan Turing",
                    badgeColor: "bg-emerald-500/10 text-emerald-450 border-emerald-500/25",
                    comment: "Incredible trigonometry work! He regularly completes challenges with pristine working. High marks expected.",
                    progress: 95,
                    rec: "Cleared for advanced simulated mockup series next week."
                  }
                ].map((fb, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 border border-slate-855 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[11px] font-black text-slate-200">{fb.subject}</h4>
                        <span className="text-[8px] text-slate-500 block">Instructor: {fb.instructor}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-[8.5px] font-mono rounded-md border ${fb.badgeColor}`}>
                        {fb.progress}% Mastery
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-350 leading-relaxed">
                      " {fb.comment} "
                    </p>

                    <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between text-[9px] text-slate-450">
                      <span><strong>Next Action:</strong> {fb.rec}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick actions panel (Billing and meeting booking) */}
            <div className="lg:col-span-5 space-y-4">
              
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
                    Arrange a live digital video conference with Coordinator Fatima or Zayd's primary lecturers.
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
              Dubai Marina Campus Syllabus Analytics
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
