import React, { useState } from "react";
import { 
  Sparkles, Star, Zap, Flame, Calendar, BookOpen, ChevronRight, 
  Send, CheckCircle2, Award, PlayCircle, Volume2 
} from "lucide-react";

interface StudentHubPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function StudentHubPage({ theme, onTriggerNotification }: StudentHubPageProps) {
  // 1. Gamified learning achievements
  const [streakCount, setStreakCount] = useState(7);
  const [studentXP, setStudentXP] = useState(1420);
  const [quizScore, setQuizScore] = useState(0);

  // 2. Active courses & resources
  const [courses, setCourses] = useState([
    { id: "c-1", name: "IGCSE Physics Masterclass", tutor: "Teacher 1", progress: 84, nextTopic: "Nuclear Radiation Half-Life", files: ["Electromagnetic Fields PDF", "Waves Lab Sheets ZIP"] },
    { id: "c-2", name: "A-Level Pure Calculus 2", tutor: "Teacher 2", progress: 72, nextTopic: "Integration by Substitution", files: ["Advanced Derivative review PDF"] },
    { id: "c-3", name: "Grade 11 Inorganic CBSE", tutor: "Teacher 3", progress: 91, nextTopic: "Aromatic Benzene Rings", files: ["Carbon Compounds past keys"] }
  ]);

  // 3. Simple Gamified concept quiz
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const activeQuestion = {
    text: "Which of the following describes the rate of change of momentum of a falling body in Physics?",
    options: [
      { id: "A", label: "Equilibrium mechanical force vector" },
      { id: "B", label: "Acceleration gravity indices" },
      { id: "C", label: "The net external force acting on it (Newton's 2nd Law)" },
      { id: "D", label: "Thermal kinetic coefficient" }
    ],
    correctAnswer: "C"
  };

  const handleSubmitQuiz = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    if (selectedAnswer === activeQuestion.correctAnswer) {
      setIsCorrect(true);
      setStudentXP(prev => prev + 150);
      setQuizScore(prev => prev + 10);
      onTriggerNotification("🏆 Achievement unlocked: Master Quantum", "Gained +150 Brain XP! Keep the flame streak alive.");
    } else {
      setIsCorrect(false);
      onTriggerNotification("⚠️ Concept Review Required", "Answer was incorrect. Try reading Teacher 1's lecture slide deck below.");
    }
  };

  const handleRetryQuiz = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  // 4. Live messages panel with Chatbot Advisor simulator
  const [chatLog, setChatLog] = useState([
    { role: "Advisor", text: "Welcome back, Zayd! Today we explore atomic structures. Feel free to draft any questions here." }
  ]);
  const [userMsg, setUserMsg] = useState("");

  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const freshUserMsg = { role: "Student", text: userMsg };
    setChatLog(prev => [...prev, freshUserMsg]);
    setUserMsg("");

    setTimeout(() => {
      let advisorReply = "Fascinating query! In physics mechanics, variables exist as vectors until active measurement resolves them. Try mapping the equilibrium energy values!";
      if (userMsg.toLowerCase().includes("photosynthesis")) {
        advisorReply = "Ah, Dr. Elena Rostova's department! Light absorption ratios are dictated by chlorophyll photon capture indices.";
      } else if (userMsg.toLowerCase().includes("calculus") || userMsg.toLowerCase().includes("math")) {
        advisorReply = "Prof. Robert Chen suggests checking integration by parts first. Break complex vectors down into primitive differentials!";
      }

      setChatLog(prev => [...prev, { role: "Advisor", text: advisorReply }]);
      onTriggerNotification("💬 Message from Faculty", "Advisor replied to your query.");
    }, 900);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left text-slate-100 select-none">
      
      {/* 1. Gamified Header Streak Banner (Duolingo Style) */}
      <div className="p-6 bg-slate-900 border border-slate-855 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-emerald-600/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="md:col-span-8 space-y-2 relative z-10">
          <div className="flex items-center gap-1.5 text-amber-500 font-bold font-mono text-xs">
            <Flame className="w-5 h-5 fill-amber-500 animate-bounce" />
            <span className="uppercase tracking-widest">{streakCount} DAYS ACADEMIC STREAK ACTIVE!</span>
          </div>
          <h2 className="text-2xl font-black text-white">Welcome back, Zayd! Ready to level up?</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            You are outperforming 94% of Grade 10 student registries globally this week. Complete daily concept challenges to unlock gold badges.
          </p>
        </div>

        <div className="md:col-span-4 flex items-center justify-end gap-4 relative z-10">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-0.5 shrink-0 min-w-[100px]">
            <span className="text-[10px] text-slate-500 font-mono uppercase font-black block">Total Brain XP</span>
            <span className="text-lg font-black text-amber-500 font-mono">{studentXP} XP</span>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-0.5 shrink-0 min-w-[100px]">
            <span className="text-[10px] text-slate-505 font-mono uppercase font-black block">Gold Badges</span>
            <span className="text-lg font-black text-white font-mono">🏆 4 / 6</span>
          </div>
        </div>
      </div>

      {/* Grid: Concept Challenge MCQ (Duolingo style) & active courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Playful MCQ Game (Col 7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 text-xs opacity-5 text-indigo-400 font-mono font-black">GAME CORE</div>
          
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-amber-500 font-mono flex items-center gap-1.5">
                <Star className="w-4.5 h-4.5 fill-amber-500" />
                DAILY QUANTUM DIAGNOSTIC CHALLENGE
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Submit correct response to fuel streak metrics (+150 XP).</p>
            </div>
            <span className="bg-slate-900 px-2 py-1 text-[9px] font-mono text-slate-400 border border-slate-800 rounded-lg">LEVEL 2</span>
          </div>

          <div className="space-y-4 text-left">
            <span className="text-xs font-bold text-slate-200 block leading-relaxed">{activeQuestion.text}</span>
            
            <div className="space-y-2.5">
              {activeQuestion.options.map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => {
                    if (!submitted) setSelectedAnswer(opt.id);
                  }}
                  className={`p-3 border rounded-2xl flex items-center justify-between transition cursor-pointer ${
                    selectedAnswer === opt.id 
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400" 
                      : "bg-slate-900 hover:bg-slate-850 border-slate-850 text-slate-300"
                  }`}
                >
                  <span className="text-[11px] font-bold">{opt.id}. {opt.label}</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-mono font-black ${
                    selectedAnswer === opt.id ? "bg-amber-500 text-slate-950 border-amber-500" : "border-slate-700"
                  }`}>
                    {selectedAnswer === opt.id && "✓"}
                  </span>
                </div>
              ))}
            </div>

            {!submitted ? (
              <button 
                onClick={handleSubmitQuiz}
                disabled={!selectedAnswer}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
              >
                Validate Diagnosis
              </button>
            ) : (
              <div className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in text-left font-mono text-xs text-slate-200 leading-snug">
                <div>
                  {isCorrect ? (
                    <span className="text-emerald-400 font-black block">🏆 EXTREMELY ACCURATE! (+150 XP added to cloud registry)</span>
                  ) : (
                    <span className="text-rose-500 font-extrabold block">❌ STUDY OPPORTUNITY INCURRED (Correct answer is {activeQuestion.correctAnswer})</span>
                  )}
                  <p className="text-[10px] text-slate-450 mt-1 leading-normal font-semibold font-sans">Newton's 2nd Law of motion rules that mass acceleration products dictate vector forces.</p>
                </div>
                <button 
                  onClick={handleRetryQuiz}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase rounded-lg cursor-pointer shrink-0"
                >
                  Regame Challenge
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live messages panel Advisor (Col 5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="border-b pb-4 border-white/[0.04]">
            <h3 className="text-xs font-black uppercase text-amber-500 font-mono">💬 1-on-1 Faculty Advisory chat</h3>
            <p className="text-[10px] text-slate-550 mt-1">Continuous live chat with senior Physics coordinator Teacher 1.</p>
          </div>

          <div className="h-44 overflow-y-auto space-y-3 p-2 bg-slate-900/60 rounded-2xl border border-slate-855 text-[11px] leading-relaxed">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`p-2.5 rounded-2xl max-w-[85%] text-left ${
                msg.role === "Advisor" 
                  ? "bg-slate-950 border border-slate-850 text-slate-300 self-start border-l-2 border-l-violet-500" 
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-400 self-end ml-auto"
              }`}>
                <span className="text-[9px] font-mono block font-black mb-0.5 text-slate-500 uppercase">{msg.role}</span>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChatMsg} className="flex gap-2">
            <input 
              type="text" 
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Query Teacher 1..." 
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:outline-none placeholder-slate-650"
            />
            <button 
              type="submit" 
              className="p-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Tutoring Course Materials & Lecture slide lists */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
          <div>
            <h3 className="text-xs font-black uppercase text-amber-500 font-mono">📂 Your course Study Library</h3>
            <p className="text-[10px] text-slate-550 mt-1">Review lesson notes chapters matching your registered curriculum cycles.</p>
          </div>
          <BookOpen className="w-4.5 h-4.5 text-amber-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(crs => (
            <div key={crs.id} className="p-4.5 bg-slate-900 border border-slate-850 rounded-21 p-4 rounded-3xl space-y-3.5 text-left">
              <div className="space-y-1">
                <strong className="text-slate-100 text-xs block">{crs.name}</strong>
                <span className="text-[10px] text-slate-500 font-bold block">Tutor: {crs.tutor}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] text-slate-450 font-mono font-black">
                  <span>TERM WORK COMPLETED</span>
                  <span>{crs.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/[0.02]">
                  <div className="h-full bg-amber-500" style={{ width: `${crs.progress}%` }} />
                </div>
              </div>

              <div className="space-y-1.5 border-t border-white/[0.03] pt-3">
                <span className="text-[8px] uppercase font-mono font-black text-slate-550 block">Published Study sheets</span>
                <div className="space-y-1">
                  {crs.files.map(fl => (
                    <div 
                      key={fl} 
                      onClick={() => onTriggerNotification("📂 Material Cached", `Downloading study sheet: "${fl}" Term 2 syllabus`)}
                      className="p-1.5 px-2 bg-slate-950 hover:bg-slate-920 rounded-lg text-[9.5px] text-slate-400 hover:text-white flex items-center justify-between cursor-pointer border border-white/[0.01]"
                    >
                      <span className="truncate">{fl}</span>
                      <PlayCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
