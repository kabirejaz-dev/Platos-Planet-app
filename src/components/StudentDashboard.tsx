import React, { useMemo } from "react";
import { StudentProfile, Course } from "../types";
import { PLATO_COURSES, MOCK_ACHIEVEMENTS } from "../data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Compass, 
  BookMarked,
  MapPin,
  MapPinHouse,
  School,
  Gift,
  PhoneCall,
  UserCheck,
  ArrowRight,
  Clock,
  Check,
  Zap,
  History,
  Award,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Timer
} from "lucide-react";

interface StudentDashboardProps {
  profile: StudentProfile;
  onNavigateToTab: (tab: string) => void;
  onCancelTrial: (courseId: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
  onUpdateStreak: (newStreak: number) => void;
  triggerNotification?: (title: string, desc: string) => void;
}

export default function StudentDashboard({ 
  profile, 
  onNavigateToTab, 
  onCancelTrial,
  onAwardXp,
  onUpdateStreak,
  triggerNotification
}: StudentDashboardProps) {
  // Load study logs and track check-ins locally for student consistency
  const todayDateStr = new Date().toDateString();
  const [logs, setLogs] = React.useState<any[]>(() => {
    try {
      const stored = localStorage.getItem(`plato_study_logs_${profile.name}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hours, setHours] = React.useState<number>(2);
  const [subject, setSubject] = React.useState<string>("Mathematics 📐");
  const [topic, setTopic] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [showHistory, setShowHistory] = React.useState<boolean>(false);

  const todayLog = logs.find(l => l.date === todayDateStr);
  const hasCheckedInToday = !!todayLog;

  // Track the student's dynamic and actual study Performance XP Gain over the last 7 days
  const performanceData = useMemo(() => {
    const days = [];
    const now = new Date();
    
    // Create a student-customized deterministic seed for starting placeholder curve
    const nameSeed = (profile.name || "Scholar")
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    
    for (let i = 6; i >= 0; i--) {
      // Calculate past dates
      const targetDate = new Date();
      targetDate.setDate(now.getDate() - i);
      const dateKey = targetDate.toDateString();
      
      // Label name e.g. "Mon"
      const label = targetDate.toLocaleDateString("en-US", { weekday: "short" });
      
      // Sum real logs matching this day
      const realXp = logs
        .filter((l: any) => l.date === dateKey)
        .reduce((s: number, l: any) => s + (Number(l.xpAwarded) || 0), 0);
        
      // Seed a beautiful baseline when there are no logs, scaled gracefully based on overall XP
      let seededBase = 0;
      if (i > 0) {
        const variation = (nameSeed + i * 13) % 4;
        seededBase = 15 + variation * 15; // 15 to 60 XP
        if (profile.xp < 100) {
          seededBase = Math.floor(seededBase * 0.3); // Scale down for newer accounts
        }
      } else {
        // Today: baseline of 15 XP if they have not done any dashboard logs yet
        seededBase = realXp > 0 ? 0 : 15;
      }
      
      days.push({
        dateStr: dateKey.substring(0, 10) + ", " + dateKey.substring(11),
        dayName: label,
        xp: realXp + seededBase,
        subject: realXp > 0
          ? logs.filter((l: any) => l.date === dateKey).map((l: any) => l.subject.split(" ")[0]).join(", ")
          : ["Math", "Physics", "Chemistry", "AI Lab", "Revision", "Coding"][(nameSeed + i) % 6],
        realLogsCount: logs.filter((l: any) => l.date === dateKey).length
      });
    }
    return days;
  }, [logs, profile.xp, profile.name]);

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasCheckedInToday) return;

    setIsSubmitting(true);
    
    // Aesthetic educational check-in processing delay
    setTimeout(() => {
      const baseXP = hours * 15;
      const consistencyBonus = profile.streak * 5;
      const totalXP = baseXP + consistencyBonus;
      
      const newLog = {
        id: "log_" + Date.now(),
        date: todayDateStr,
        hours,
        subject,
        topic: topic.trim() || `Revised chapters in ${subject.split(" ")[0]}`,
        xpAwarded: totalXP,
        streakAtTime: profile.streak + 1
      };

      const updatedLogs = [newLog, ...logs];
      setLogs(updatedLogs);
      try {
        localStorage.setItem(`plato_study_logs_${profile.name}`, JSON.stringify(updatedLogs));
      } catch (err) {
        console.error("Local study log storage failure:", err);
      }

      // Claim rewards via callbacks
      onAwardXp(totalXP);
      onUpdateStreak(profile.streak + 1);
      setIsSubmitting(false);
      setTopic("");
    }, 850);
  };

  // Pomodoro focus timer states
  const [speedMode, setSpeedMode] = React.useState<boolean>(false);
  const [pomodoroSeconds, setPomodoroSeconds] = React.useState<number>(1500);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  const [timerSubject, setTimerSubject] = React.useState<string>("Mathematics 📐");
  const [sessionCompleted, setSessionCompleted] = React.useState<boolean>(false);
  const [pomoAwardedXp, setPomoAwardedXp] = React.useState<number>(0);

  // Monitor speed mode toggle to instantly update display value
  React.useEffect(() => {
    if (!isTimerRunning) {
      setPomodoroSeconds(speedMode ? 10 : 1500);
    }
  }, [speedMode, isTimerRunning]);

  // Core countdown setInterval effect following strict useEffect guidelines
  React.useEffect(() => {
    let intervalId: any = null;

    if (isTimerRunning && pomodoroSeconds > 0) {
      intervalId = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && pomodoroSeconds === 0) {
      setIsTimerRunning(false);
      setSessionCompleted(true);

      const xpToAward = speedMode ? 10 : 35; // 35 XP for successful standard pomodoro, 10 XP for demo run
      setPomoAwardedXp(xpToAward);
      onAwardXp(xpToAward);

      // Auto-log to Study Focus list for consistent tracking
      const pomoLog = {
        id: "pomo_" + Date.now(),
        date: todayDateStr,
        hours: speedMode ? 0.05 : 0.42, // ~0.42 hrs represents 25 minutes
        subject: timerSubject,
        topic: `Completed 25-Min Pomodoro Focus Session ⏱️`,
        xpAwarded: xpToAward,
        streakAtTime: profile.streak
      };

      const updatedLogs = [pomoLog, ...logs];
      setLogs(updatedLogs);
      try {
        localStorage.setItem(`plato_study_logs_${profile.name}`, JSON.stringify(updatedLogs));
      } catch (err) {
        console.error("Local study log storage failure:", err);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerRunning, pomodoroSeconds, speedMode, timerSubject, profile.name]);

  const formatPomoTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetPomodoro = () => {
    setIsTimerRunning(false);
    setPomodoroSeconds(speedMode ? 10 : 1500);
    setSessionCompleted(false);
  };

  // Calculate percentage toward Burj Khalifa heights checkpoint (828 Meters / 828 XP points!)
  const BURJ_KHALIFA_XP_TARGET = 828;
  const xpPercentage = Math.min(100, Math.round((profile.xp / BURJ_KHALIFA_XP_TARGET) * 100));

  // Determine active courses
  const trialCourses = PLATO_COURSES.filter(c => profile.bookedTrials.includes(c.id));

  // State for chosen Board Exam countdown tracker
  const [selectedExam, setSelectedExam] = React.useState<"cbse10" | "cbse12" | "igcse">("cbse10");

  // State for daily check-off quests
  const [checkedQuests, setCheckedQuests] = React.useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`plato_quests_${profile.name}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // State for swipes handbook guides card index
  const [swipeIdx, setSwipeIdx] = React.useState<number>(0);

  const REVISION_CARDS = [
    {
      subject: "CBSE Mathematics 📐",
      concept: "Integration Formula Rule",
      detail: "∫ sec(x) dx = ln|sec(x) + tan(x)| + C\n∫ cosec(x) dx = ln|cosec(x) - cot(x)| + C",
      tip: "Heavyweight item for Grade 12 Advanced Calculus board exercises!"
    },
    {
      subject: "Cambridge IGCSE Chemistry 🧪",
      concept: "Electrolysis Preferential Rule",
      detail: "Concentrated: Halide ions are discharged at Anode (e.g. Chlorine gas). Dilute: Oxygen is discharged.",
      tip: "Secures your CIE A* grade in structured theory paper segments!"
    },
    {
      subject: "CBSE Science G10 ⚡",
      concept: "Cartesian Light Sign Convention",
      detail: "Concave lens & mirror focal length (f) is negative.\nConvex optical systems ALWAYS have positive focal lengths.",
      tip: "Saves calculation time in ray diagram board examinations."
    },
    {
      subject: "Astro-Robotics & Code 👾",
      concept: "Python Pygame Sprite Collision",
      detail: "if sprite1.rect.colliderect(sprite2.rect):\n  # Triggers true bounding box overlap algorithm",
      tip: "Useful for building orbital gravity simulator controllers!"
    }
  ];

  const handleToggleQuest = (questId: string, xpValue: number) => {
    const isAlreadyChecked = checkedQuests.includes(questId);
    let updated: string[];
    if (isAlreadyChecked) {
      updated = checkedQuests.filter(q => q !== questId);
    } else {
      updated = [...checkedQuests, questId];
      // Award XP on check-off!
      onAwardXp(xpValue);
      if (triggerNotification) {
        triggerNotification("🎯 Quest Cleared!", `High five! You unlocked +${xpValue} XP for student citizenship!`);
      }
    }
    setCheckedQuests(updated);
    try {
      localStorage.setItem(`plato_quests_${profile.name}`, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Helper date utility to ensure countdown never lapses below 0
  const daysRemaining = (examKey: string) => {
    const currentYear = new Date().getFullYear();
    const examDates: Record<string, string> = {
      cbse10: `March 01, ${currentYear + 1}`,
      cbse12: `March 01, ${currentYear + 1}`,
      igcse: `May 15, ${currentYear + 1}`
    };
    const target = new Date(examDates[examKey] || `March 01, ${currentYear + 1}`).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 120;
  };

  return (
    <div className="flex flex-col p-4 space-y-5">
      {/* UAE Welcome Card with Level & XP */}
      <div className="bg-gradient-to-br from-brand-blue-dark via-slate-950 to-brand-blue/40 border border-brand-blue/30 rounded-2xl p-4 shadow-[0_4px_20px_rgba(22,113,230,0.15)] relative overflow-hidden">
        {/* Abstract absolute background graphics */}
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-tr from-brand-red/20 to-brand-yellow/20 rounded-full blur-xl" />
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20 tracking-wide uppercase">
              Plato Member Hub
            </span>
            <h2 className="text-lg font-black text-slate-100 tracking-tight mt-1 truncate max-w-[180px]">
              Marhaban, {profile.name || "Student"}!
            </h2>
            <p className="text-[11px] text-slate-400">
              Grade {profile.grade || "8"} • {profile.curriculum} Syllabus
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-amber-500">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
              <span className="text-xl font-black font-mono leading-none">{profile.streak}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">DUBAI STREAK</span>
          </div>
        </div>

        {/* Burj Khalifa XP Progress Challenge */}
        <div className="mt-4 space-y-1.5 pt-3 border-t border-brand-blue-dark">
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-yellow font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Burj Khalifa Peak Climb</span>
            </span>
            <span className="text-slate-300 font-bold font-mono">
              {profile.xp} <span className="text-[10px] text-slate-500">/ {BURJ_KHALIFA_XP_TARGET} XP</span>
            </span>
          </div>
          
          <div className="w-full bg-slate-950/80 rounded-full h-3 p-0.5 border border-slate-800">
            <div 
              className="bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-red h-full rounded-full transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[9px] text-slate-500">
            <span>Ground Level</span>
            <span className="text-brand-yellow font-bold">{xpPercentage}% Tower Height reached (Dubai Peak)</span>
          </div>

          {/* Dynamic interactive Leaderboard Comparison button */}
          <button
            onClick={() => onNavigateToTab("leaderboard")}
            className="mt-3 w-full py-2 bg-gradient-to-r from-slate-900 to-brand-blue-dark hover:from-slate-850 hover:to-brand-blue border border-brand-blue/30 rounded-xl text-slate-200 text-[10.5px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer shadow-sm shadow-brand-blue-dark/5"
          >
            <Trophy className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Compare on Dubai Toppers Board</span>
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* WEEKLY REVISION & STUDY PERFORMANCE GRAPH               */}
      {/* ======================================================= */}
      <div id="weekly-performance-card" className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[8px] bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-2 py-0.5 rounded font-extrabold uppercase font-mono tracking-wider">
              Dubai Active Syllabus Analytics
            </span>
            <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-1.5 mt-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-yellow animate-pulse" />
              <span>Weekly Performance Analytics</span>
            </h3>
            <p className="text-[10px] text-slate-405 leading-normal">
              Acquisition of dynamic XP over the last 7 calendar days. Real-time updates reflect self-logged actions.
            </p>
          </div>
          <div className="text-right flex-shrink-0 bg-slate-950/60 p-1.5 border border-slate-850 rounded-lg">
            <span className="text-xs font-mono font-black text-brand-yellow block leading-none">
              +{performanceData.reduce((sum, d) => sum + d.xp, 0)}
            </span>
            <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-widest block font-mono mt-0.5">
              XP Climbed
            </span>
          </div>
        </div>

        {/* Elegant Recharts Area Chart */}
        <div className="w-full h-36 mt-1 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fdb813" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#fdb813" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis 
                dataKey="dayName" 
                stroke="#64748b" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl text-[10px] shadow-2xl text-left space-y-1 backdrop-blur-sm min-w-[120px]">
                        <p className="font-bold text-slate-300 text-[10.5px] border-b border-slate-850 pb-1">{data.dateStr}</p>
                        <p className="text-brand-yellow font-black">
                          XP gained: <span className="text-slate-100 font-mono">+{data.xp} XP</span>
                        </p>
                        <p className="text-slate-400 text-[9px] truncate">
                          Focus: <span className="text-slate-250 italic">{data.subject}</span>
                        </p>
                        {data.realLogsCount > 0 && (
                          <span className="inline-block mt-0.5 text-[7.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.2 rounded font-mono font-bold">
                            ✔ Actual check-in log
                          </span>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="xp" 
                stroke="#fdb813" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#xpGradient)" 
                activeDot={{ r: 5, stroke: "#0f172a", strokeWidth: 1.5, fill: "#fdb813" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gamified feedback text based on performance */}
        <div className="flex items-center gap-2 p-2 bg-slate-950/60 border border-slate-850/80 rounded-xl text-[10px] text-slate-400 text-left">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 animate-pulse" />
          <span>
            {performanceData.reduce((sum, d) => sum + d.xp, 0) > 280 
              ? "Superb! Your active syllabus checkpoints put you in Dubai's Top tier! Slay CBSE milestones!"
              : "Consistently log self-study check-ins or run Pomodoro slots to raise your Weekly XP curve!"}
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* PLATO BOARD EXAM CENTRAL TARGET COMPASS               */}
      {/* ======================================================= */}
      <div id="board-milestones-card" className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 text-left">
            <span className="text-[8px] bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-1.5 py-0.5 rounded font-extrabold uppercase font-mono tracking-wider">
              UAE Board Targets
            </span>
            <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-1 mt-1">
              🚀 KHDA Board Exam Milestones
            </h3>
          </div>
          
          {/* Exam Switcher tabs */}
          <div className="flex gap-1 bg-slate-950/80 p-0.5 border border-slate-900 rounded-lg">
            {(["cbse10", "cbse12", "igcse"] as const).map((ex) => (
              <button
                key={ex}
                type="button"
                id={`exam-tab-${ex}`}
                onClick={() => setSelectedExam(ex)}
                className={`px-2 py-1 text-[8.5px] font-bold rounded cursor-pointer transition-all ${
                  selectedExam === ex
                    ? "bg-brand-yellow text-slate-950 font-black shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {ex === "cbse10" && "CBSE-10"}
                {ex === "cbse12" && "CBSE-12"}
                {ex === "igcse" && "IGCSE"}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Exam Highlight Frame */}
        <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl flex items-center justify-between gap-3 animate-fade-in text-left">
          <div className="space-y-1">
            <h4 id="selected-exam-heading" className="text-xs font-black text-slate-200 uppercase tracking-wide">
              {selectedExam === "cbse10" && "CBSE Grade 10 National Boards"}
              {selectedExam === "cbse12" && "CBSE Grade 12 Premium Science / Math"}
              {selectedExam === "igcse" && "CIE Year 11 Cambridge IGCSE Series"}
            </h4>
            <p className="text-[10px] text-slate-450 leading-normal font-sans">
              {selectedExam === "cbse10" && "Complete Physics, Chemistry equations & NCERT exercises master guide."}
              {selectedExam === "cbse12" && "Integration, matrices coordinate formulas, and NEET/JEE elite mock papers."}
              {selectedExam === "igcse" && "Extended Algebraic fractions, vector matrices & electrolysis exam keys."}
            </p>
            <div className="flex gap-2 pt-1 font-mono text-[9px] text-[#888]">
              <span>Campus Prep Hubs: Al Qusais & Karama</span>
            </div>
          </div>

          <div className="text-center flex-shrink-0 bg-slate-900 border border-slate-800 p-2.5 rounded-xl min-w-[76px] shadow-inner">
            <span id="countdown-days" className="text-xl font-black text-brand-yellow font-mono block tracking-tight leading-none">
              {daysRemaining(selectedExam)}
            </span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest font-mono block mt-1">
              Days Left
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* SWIPEABLE DYNAMIC REVISION HANDBOOK CHEAT SHEETS        */}
      {/* ======================================================= */}
      <div id="quick-cards-card" className="bg-slate-900/45 border border-slate-850 rounded-2xl p-4 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-left">
            <div className="w-1.5 h-3 bg-brand-yellow rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-350">Plato Quick Revision Cards</span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono">
            {swipeIdx + 1} / {REVISION_CARDS.length}
          </span>
        </div>

        {/* Cheat card layout */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2 text-left relative min-h-[96px] flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span id="card-subject-label" className="text-[9px] text-brand-yellow font-extrabold uppercase bg-brand-yellow/15 px-2 py-0.5 rounded border border-brand-yellow/10">
                {REVISION_CARDS[swipeIdx].subject}
              </span>
              <span className="text-[8.5px] text-slate-500 font-mono font-semibold">
                {REVISION_CARDS[swipeIdx].concept}
              </span>
            </div>
            <p className="text-[11px] text-slate-200 font-mono whitespace-pre-line leading-relaxed italic border-l-2 border-slate-800 pl-2.5 py-1">
              {REVISION_CARDS[swipeIdx].detail}
            </p>
          </div>
          <p className="text-[9px] text-slate-400 font-light flex items-center gap-1 text-emerald-400 justify-start">
            <strong>💡 Tip:</strong> <span id="card-tip-label">{REVISION_CARDS[swipeIdx].tip}</span>
          </p>
        </div>

        {/* Card navigation footer */}
        <div className="flex items-center justify-between gap-2.5 pt-0.5">
          <button
            type="button"
            id="prev-revision-card"
            onClick={() => setSwipeIdx((prev) => (prev > 0 ? prev - 1 : REVISION_CARDS.length - 1))}
            className="flex-1 py-1.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer text-center"
          >
            ← Previous Card
          </button>
          <button
            type="button"
            id="next-revision-card"
            onClick={() => setSwipeIdx((prev) => (prev + 1) % REVISION_CARDS.length)}
            className="flex-1 py-1.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-extrabold uppercase rounded-lg transition-all cursor-pointer text-center"
          >
            Next Card →
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* INTERACTIVE DAILY STUDY SYSTEM QUESTS                   */}
      {/* ======================================================= */}
      <div id="daily-quests-card" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-850 rounded-2xl p-4 shadow-xl space-y-3.5 relative overflow-hidden">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[8.5px] bg-emerald-950 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-900/50 uppercase tracking-widest font-mono">
              Daily Planner Quests
            </span>
            <span className="text-[8.5px] bg-slate-950 text-brand-yellow font-extrabold px-1.5 py-0.5 rounded border border-slate-900 uppercase">
              Claim Active Bonus
            </span>
          </div>
          <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-1.5 mt-1.5">
            🎯 Level-Up Daily Quests
          </h3>
          <p className="text-[10px] text-slate-400">
            Check off actions as you revise. Acquire XP checkpoints to conquer the Burj Khalifa!
          </p>
        </div>

        {/* Quests row/column */}
        <div className="space-y-2">
          {[
            { id: "quest_checkin", title: "Complete Daily Study Hour Check-In", actionLabel: "Log Hours", tab: "dashboard", xp: 15, isDone: hasCheckedInToday },
            { id: "quest_pomodoro", title: "Complete 1 Focused Pomodoro Session", actionLabel: "Run Clock", tab: "dashboard", xp: 20, isDone: sessionCompleted },
            { id: "quest_mindy", title: "Query Mindy AI tutor for Syllabus Help", actionLabel: "Ask Mindy", tab: "assistant", xp: 15, isDone: checkedQuests.includes("quest_mindy") },
            { id: "quest_quiz", title: "Trigger 1 Stem Challenge Practice Test", actionLabel: "Start Test", tab: "quiz", xp: 25, isDone: checkedQuests.includes("quest_quiz") }
          ].map((q) => {
            const isFinished = q.isDone;
            return (
              <div
                key={q.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-left transition-all ${
                  isFinished
                    ? "bg-emerald-950/20 border-emerald-500/35 text-emerald-400/80"
                    : "bg-slate-950 border-slate-900 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleQuest(q.id, q.xp)}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isFinished
                        ? "bg-emerald-500 border-emerald-500 text-slate-950"
                        : "border-slate-705 hover:border-brand-yellow"
                    }`}>
                      {isFinished && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>
                  </button>

                  <div className="min-w-0">
                    <p className={`text-[10.5px] leading-tight font-semibold truncate ${isFinished ? "line-through text-slate-500" : ""}`}>
                      {q.title}
                    </p>
                    <span className="text-[8.5px] font-mono text-brand-yellow font-bold uppercase block mt-0.5">
                      ⭐ +{q.xp} XP Claimable
                    </span>
                  </div>
                </div>

                {/* Target tab shortcut */}
                {!isFinished && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToTab(q.tab);
                      if (q.tab === "dashboard") {
                        // Scroll directly to dynamic widget segment
                        const targetId = q.id === "quest_checkin" ? "today-log-form" : "pomo-section";
                        const el = document.getElementById(targetId);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-brand-yellow border border-slate-800 text-[9px] font-bold rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    {q.actionLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================= */}
      {/* STREAK & PREFERRED TIMING BOOSTER CARD                  */}
      {/* ======================================================= */}
      {profile.preferredStudyTime && (
        <div className="bg-gradient-to-r from-brand-blue-dark/45 via-slate-950 to-slate-950 border border-brand-blue/20 p-3.5 rounded-2xl flex items-start gap-3 relative overflow-hidden animate-fade-in shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-yellow/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-brand-yellow flex-none">
            <Clock className="w-4 h-4 text-brand-yellow" />
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-widest font-mono ${
                profile.studyRemindersEnabled 
                  ? "bg-emerald-950 text-emerald-400 border-emerald-900/35" 
                  : "bg-slate-900 text-slate-450 border-slate-800"
              }`}>
                {profile.studyRemindersEnabled ? "Streak Shield Guard" : "Reminders Inactive"}
              </span>
              <span className="text-[8px] text-slate-500 font-mono">
                Target: {profile.preferredStudyTime} Daily
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-200 leading-tight">
              Plato Consistency Suggestion
            </h4>
            <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans">
              To defend your <strong className="text-brand-yellow font-extrabold">{profile.streak} Days streak</strong>, we suggest joining a class around your daily slot of <strong>{profile.preferredStudyTime}</strong>. Launch a Pomodoro focus loop to maintain standard momentum!
            </p>

            {/* Quick action buttons block */}
            <div className="flex items-center gap-2 pt-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  if (triggerNotification) {
                    triggerNotification(
                      "⏱️ Study Alert Simulation",
                      `Discipline, ${profile.name}! It is exactly your study hour ${profile.preferredStudyTime}. Save tasks or run a focused Pomodoro to claim +35 XP!`
                    );
                  }
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-brand-yellow text-slate-300 hover:text-brand-yellow text-[9px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Trigger Demo Alert 🔔
              </button>

              <button
                type="button"
                onClick={() => {
                  // Navigate to portal to check recorded classes or trigger pomodoro countdown
                  const pomoSectionElement = document.getElementById("pomo-section");
                  if (pomoSectionElement) {
                    pomoSectionElement.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigateToTab("portal");
                  }
                  if (triggerNotification) {
                    triggerNotification("⏱️ Study Mode Target Locked", "Time to defend your streak! Settle in for some quality focus.");
                  }
                }}
                className="px-2.5 py-1 bg-brand-yellow/15 hover:bg-brand-yellow/25 text-brand-yellow text-[9px] font-bold rounded-lg cursor-pointer"
              >
                Go to class solver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Bento Strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-yellow">
            <Trophy className="w-5 h-5 text-brand-yellow" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-light">Badges Won</span>
            <span className="text-base font-black text-slate-200 tracking-tight font-mono">
              {profile.badges.length} / {MOCK_ACHIEVEMENTS.length}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <BookMarked className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-light">Royal Trials</span>
            <span className="text-base font-black text-slate-200 tracking-tight font-mono">
              {profile.bookedTrials.length}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* DAILY CHECK-IN & FOCUS LOG (XP STREAK BOOSTER)         */}
      {/* ======================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3.5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -left-12 -top-12 w-24 h-24 bg-brand-yellow/5 rounded-full blur-xl pointer-events-none" />
        
        {/* Header containing badge */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] bg-brand-yellow/10 text-brand-yellow font-extrabold px-1.5 py-0.5 rounded border border-brand-yellow/20 uppercase tracking-wider font-mono">
                Consistency Multiplier Active
              </span>
              <span className="text-[9px] bg-slate-950 font-mono font-bold text-slate-500 px-1.5 py-0.5 rounded border border-slate-900">
                1x Daily
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5 mt-1.5">
              <Zap className="w-4 h-4 text-brand-yellow animate-pulse" />
              <span>Daily Focus Check-In</span>
            </h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Log self-study hours to claim XP. Consistently checking in grows your Dubai Streak!
            </p>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-brand-yellow border border-slate-850 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic State views */}
        {hasCheckedInToday ? (
          /* Checked-in SUCCESS STATE */
          <div className="bg-slate-950 border border-emerald-550/20 rounded-xl p-3.5 space-y-3 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-emerald-400">Study Log Confirmed today! 🎉</h4>
                <p className="text-[10.5px] text-slate-350 leading-relaxed">
                  You successfully logged <strong className="text-slate-100 font-mono font-bold">{todayLog.hours} hours</strong> of <strong className="text-slate-100 font-semibold">{todayLog.subject}</strong> study.
                </p>
                {todayLog.topic && (
                  <p className="text-[10px] text-slate-400 italic bg-slate-900/60 p-2 rounded-md border border-slate-900 mt-1">
                    "{todayLog.topic}"
                  </p>
                )}
              </div>
            </div>

            {/* Streak & XP Claim display */}
            <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-900 mt-2 bg-slate-950">
              <span className="text-slate-400 flex items-center gap-1 font-mono">
                Streak: <Flame className="w-3.5 h-3.5 text-brand-red fill-current inline" /> <strong className="text-slate-200">{todayLog.streakAtTime} Days</strong>
              </span>
              <span className="text-brand-yellow font-bold uppercase tracking-wider flex items-center gap-1 bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/10">
                ⭐ +{todayLog.xpAwarded} XP Claimed
              </span>
            </div>
          </div>
        ) : (
          /* FORM / LOGGING STATE */
          <form onSubmit={handleCheckIn} className="space-y-3">
            
            {/* 1. Study Hours Selector */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                1. Select Study Hours:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setHours(hr)}
                    className={`py-2 px-1 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                      hours === hr 
                        ? "bg-brand-yellow text-slate-950 border-brand-yellow shadow-md shadow-brand-yellow/10" 
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    {hr === 4 ? "4+ Hrs" : `${hr} ${hr === 1 ? 'Hour' : 'Hours'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Subject options & custom topic in a single row */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  2. Select Subject:
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-lg py-2 px-2 text-[11px] text-slate-200 focus:outline-none transition-colors"
                >
                  <option value="Mathematics 📐">Mathematics 📐</option>
                  <option value="Physics ⚡">Physics ⚡</option>
                  <option value="Chemistry 🧪">Chemistry 🧪</option>
                  <option value="Biology 🧬">Biology 🧬</option>
                  <option value="Computer Science 💻">Computer Science 💻</option>
                  <option value="Robotics 🤖">Robotics 🤖</option>
                  <option value="English Literature 📚">English Literature 📚</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  3. Topic Studied:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vectors calculus sheet"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-lg py-2 px-2.5 text-[11px] text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Rewards calculation preview */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
              <div className="space-y-0.5">
                <span>Value: {hours * 15} XP Base + {profile.streak * 5} XP Consistency</span>
                <span className="block text-[9px] text-[#888]">Est. Growth: climb <strong>{Math.round(((hours * 15 + profile.streak * 5) / 828) * 100)}%</strong> more Burj meters</span>
              </div>
              <div className="text-right">
                <span className="text-brand-yellow font-bold uppercase block tracking-wider font-mono text-[11px]">
                  ⭐ +{hours * 15 + profile.streak * 5} XP Total
                </span>
              </div>
            </div>

            {/* Check-In Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-brand-yellow to-brand-gold text-slate-950 font-black text-xs rounded-xl tracking-wide uppercase hover:from-brand-gold active:scale-[0.98] cursor-pointer shadow-lg shadow-brand-yellow/10 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Locking Study Log...</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5" />
                  <span>Check In & Claim XP (+{hours * 15 + profile.streak * 5} XP)</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Log History Drawer Toggle and Section */}
        {logs.length > 0 && (
          <div className="pt-2 border-t border-slate-900/60 mt-1">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between text-[10px] text-slate-400 hover:text-slate-350 font-semibold cursor-pointer py-1"
            >
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>View Focus History ({logs.length} sessions logged)</span>
              </span>
              <span>{showHistory ? "Collapse ▲" : "Expand ▼"}</span>
            </button>

            {showHistory && (
              <div className="space-y-1.5 mt-2 max-h-[120px] overflow-y-auto Scrollbar-thin pr-1 pb-1 animate-fade-in font-mono text-[9.5px]">
                {logs.map((log) => (
                  <div key={log.id} className="bg-slate-950 border border-slate-900/80 rounded-lg p-2 flex items-center justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-350 font-bold">{log.date}</span>
                        <span className="text-[8px] bg-slate-900 text-slate-400 px-1 rounded-sm">{log.hours}h</span>
                      </div>
                      <p className="text-slate-400 font-sans truncate pr-1">
                        <strong className="text-slate-350 font-semibold">{log.subject.split(" ")[0]}</strong> • {log.topic}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-brand-yellow font-black">+{log.xpAwarded} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ======================================================= */}
      {/* POMODORO CLASS ROOM TIMER (DUBAI FOCUS ZONE)            */}
      {/* ======================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3.5 relative overflow-hidden">
        {/* Subtle top ambient gold glow represent focus heat */}
        <div className={`absolute -right-12 -top-12 w-28 h-28 bg-brand-yellow/5 rounded-full blur-2xl transition-opacity duration-1000 ${isTimerRunning ? 'opacity-100 animate-pulse' : 'opacity-40'}`} />
        
        {/* Header containing badge & logo */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider font-mono transition-all ${
                isTimerRunning 
                  ? 'bg-rose-500/10 text-rose-450 border-rose-500/20 animate-pulse' 
                  : 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
              }`}>
                {isTimerRunning ? '● Study Session Active' : '⏱️ Pomodoro Focus Zone'}
              </span>
              <span className="text-[9px] bg-slate-950 font-mono font-bold text-slate-500 px-1.5 py-0.5 rounded border border-slate-900">
                25 Min Cycle
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5 mt-1.5">
              <Timer className={`w-4 h-4 text-brand-yellow ${isTimerRunning ? 'animate-spin' : ''}`} />
              <span>Plato Focus Timer</span>
            </h3>
            <p className="text-[10px] text-slate-400 leading-normal">
              Power up conceptual mastery. Finish a 25-minute study sprint to unlock instant bonus XP rewards.
            </p>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-brand-yellow border border-slate-850 flex-shrink-0">
            <Coffee className="w-4 h-4 text-brand-yellow" />
          </div>
        </div>

        {sessionCompleted ? (
          /* SESSION COMPLETED SUCCESS CARD */
          <div className="bg-slate-950 border border-brand-yellow/20 rounded-xl p-4 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center mx-auto text-brand-yellow border border-brand-yellow/20">
              <Award className="w-6 h-6 text-brand-yellow" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-100 uppercase tracking-widest">Revision Cycle Unlocked! 🎓</h4>
              <p className="text-[11px] text-slate-350 max-w-[280px] mx-auto leading-relaxed">
                Superb discipline! You focused on <strong className="text-slate-100">{timerSubject}</strong>. Your study hours log has been auto-appended and your streak has been boosted.
              </p>
            </div>
            <div className="inline-block px-3 py-1 bg-brand-yellow/10 text-brand-yellow font-black text-xs rounded-full border border-brand-yellow/20">
              ⭐ +{pomoAwardedXp} XP Credited
            </div>
            <button
              onClick={resetPomodoro}
              className="mt-1 w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer"
            >
              Start Next Study Cycle
            </button>
          </div>
        ) : (
          /* ACTIVE COUNTDOWN VIEW */
          <div className="space-y-4">
            
            {/* Subject Selector & Speed Toggle */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Syllabus Subject:
                </label>
                <select
                  disabled={isTimerRunning}
                  value={timerSubject}
                  onChange={(e) => setTimerSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 disabled:opacity-50 hover:border-slate-700 rounded-lg py-1.5 px-2 text-[10.5px] text-slate-200 focus:outline-none transition-colors"
                >
                  <option value="Mathematics 📐">Mathematics 📐</option>
                  <option value="Physics ⚡">Physics ⚡</option>
                  <option value="Chemistry 🧪">Chemistry 🧪</option>
                  <option value="Biology 🧬">Biology 🧬</option>
                  <option value="Computer Science 💻">Computer Science 💻</option>
                  <option value="Robotics 🤖">Robotics 🤖</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Timer Settings:
                </label>
                <button
                  type="button"
                  disabled={isTimerRunning}
                  onClick={() => setSpeedMode(!speedMode)}
                  className={`w-full py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    speedMode 
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                      : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-350"
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${speedMode ? 'text-amber-400 fill-amber-400' : ''}`} />
                  <span>{speedMode ? "⚡ 10s Demo Mode" : "Standard 25 Min"}</span>
                </button>
              </div>
            </div>

            {/* Central Clock Engine with circular outline track state */}
            <div className="py-2.5 flex flex-col items-center justify-center bg-slate-950 border border-slate-900 rounded-xl space-y-2 relative">
              
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-mono text-slate-100 tracking-wider animate-pulse">
                  {formatPomoTime(pomodoroSeconds)}
                </span>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">
                  {isTimerRunning ? 'focusing hard...' : 'timer paused'}
                </span>
              </div>

              {/* Progress bar representing study chunk */}
              <div className="w-4/5 h-1 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    isTimerRunning ? 'bg-gradient-to-r from-brand-yellow to-brand-gold' : 'bg-slate-700'
                  }`}
                  style={{ width: `${(pomodoroSeconds / (speedMode ? 10 : 1500)) * 100}%` }}
                />
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex-1 py-1 px-4 min-h-[44px] rounded-xl text-[11px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                  isTimerRunning 
                    ? "bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200" 
                    : "bg-brand-yellow hover:bg-brand-gold text-slate-950 shadow-md shadow-brand-yellow/5"
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 animate-bounce-horizontal" />
                    <span>Start focus sprint (+{speedMode ? '10' : '35'} XP)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetPomodoro}
                className="w-12 h-11 bg-slate-900 border border-slate-850 hover:bg-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-all select-none"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Interactive Portal quicklink card */}
      <div className="bg-gradient-to-r from-brand-blue-dark/40 to-slate-900 border border-brand-blue/30 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.2 rounded font-mono uppercase">
              Online Hub Active
            </span>
            <span className="text-[9px] bg-slate-950 font-bold text-slate-400 px-1.5 py-0.2 rounded font-mono">
              G9-12 SYLLABUS
            </span>
          </div>
          <h4 className="text-xs font-extrabold text-slate-100">
            Virtual Student Portal & Attendance Desk
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed font-light">
            Log in to stream video archives, check class syllabus whiteboards, and sign your digital attendance book!
          </p>
        </div>
        
        <button
          onClick={() => onNavigateToTab("portal")}
          className="px-3.5 py-2.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-xl shadow-lg shadow-brand-yellow/5 flex-shrink-0 cursor-pointer transition-all active:scale-95"
        >
          Open Portal
        </button>
      </div>

      {/* Booked Free Lessons / Campus RSVP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <School className="w-4 h-4 text-amber-500" />
            <span>My Booked Demo Trials</span>
          </span>
          {trialCourses.length === 0 && (
            <button 
              onClick={() => onNavigateToTab("courses")}
              className="text-[11px] text-amber-400 font-bold hover:underline"
            >
              Explore Programs +
            </button>
          )}
        </div>

        {trialCourses.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-slate-800 p-4 rounded-xl text-center space-y-2">
            <p className="text-xs text-slate-400">
              No physical campus trial booked yet. Every student gets a free 1-on-1 counseling & demo lesson in Dubai!
            </p>
            <button
              onClick={() => onNavigateToTab("courses")}
              className="px-4 py-1.5 bg-slate-900 text-amber-400 border border-slate-800 hover:border-amber-400/30 rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
            >
              Discover Courses
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {trialCourses.map(course => (
              <div 
                id={`trial-dashboard-item-${course.id}`}
                key={course.id}
                className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl relative space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-amber-400 font-bold uppercase bg-amber-400/10 px-1.5 py-0.2 rounded">
                      Demo Confirmed
                    </span>
                    <h4 className="text-xs font-bold text-slate-200">{course.title}</h4>
                  </div>
                  <button 
                    onClick={() => onCancelTrial(course.id)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                  >
                    Reschedule
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 space-y-1 bg-slate-950/40 p-2 rounded scale-95 origin-left">
                  <p className="flex items-center gap-1">
                    <MapPinHouse className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                    <span>Plato's Corner Location Selected: Al Qusais Hub</span>
                  </p>
                  <p>🗓️ Timings: {course.schedule.split(" | ")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🚀 Grade 9-12 Interactive Playable Demo Class Banner */}
      <button 
        id="dashboard-demo-banner"
        onClick={() => onNavigateToTab("demos")}
        className="w-full text-left bg-gradient-to-r from-brand-yellow/15 to-brand-red/10 border-2 border-dashed border-brand-yellow/40 hover:border-brand-yellow p-3.5 rounded-2xl flex items-center justify-between gap-3 group relative overflow-hidden transition-all duration-300 cursor-pointer shadow-lg shadow-brand-yellow/5 active:scale-[0.99]"
      >
        <div className="space-y-1 z-10 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] bg-brand-red text-white font-extrabold px-1.5 py-0.2 rounded font-mono uppercase tracking-widest leading-none">
              New: Grade 9-12
            </span>
            <span className="text-[9px] bg-brand-blue-dark border border-brand-yellow/20 text-brand-yellow font-bold px-1 py-0.2 rounded font-mono leading-none flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-brand-yellow" />
              Interactive Lab
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-black text-slate-100 group-hover:text-brand-yellow transition-colors leading-tight">
            Launch Dynamic Demo Classes 🚀
          </h4>
          <p className="text-[10px] text-slate-400 font-light leading-normal">
            Try real-world interactive worksheets for CBSE Boards & IGCSE Physics, Calculus & Moles with instant XP rewards!
          </p>
        </div>
        <div className="p-2 sm:p-2.5 bg-slate-900 border border-slate-800 rounded-xl group-hover:bg-brand-yellow group-hover:text-slate-950 text-brand-yellow transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Achievements Grid */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Achievements & Badges
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {MOCK_ACHIEVEMENTS.map(badge => {
            const hasBadge = profile.badges.includes(badge.id);
            return (
              <div 
                id={`badge-card-${badge.id}`}
                key={badge.id} 
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all relative group ${
                  hasBadge 
                    ? "bg-slate-900 border-brand-yellow/50 text-slate-100" 
                    : "bg-slate-950/40 border-slate-800/40 opacity-45 grayscale select-none"
                }`}
              >
                <span className="text-2xl mb-1 filter drop-shadow">{badge.icon}</span>
                <span className="text-[9px] font-bold leading-tight block truncate w-full px-1">{badge.name}</span>
                
                {/* Micro tooltip detail standard in mobile screens */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-1.5 bg-slate-950 border border-slate-800 text-[9px] rounded-lg text-slate-300 hidden group-hover:block z-50 pointer-events-none shadow-xl">
                  <p className="font-bold text-brand-yellow">{badge.title}</p>
                  <p className="font-light mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dubai Location Info Contact block */}
      <div className="bg-slate-900/40 border border-slate-800/60 p-3.5 rounded-xl space-y-2">
        <span className="text-[10px] font-extrabold text-brand-yellow uppercase tracking-wider block">
          Plato's Planet UAE Campus Information
        </span>
        <div className="text-[10px] text-slate-400 space-y-1.5 leading-relaxed">
          <p className="flex items-start gap-1">
            <span className="text-amber-500">📍</span>
            <span><strong>Main Campus:</strong> Al Qusais, Plaza Building 202 (Next to Metro Station), Dubai, UAE.</span>
          </p>
          <p className="flex items-start gap-1">
            <span className="text-amber-500">📞</span>
            <span><strong>Call / WhatsApp:</strong> +971 4 269 1445 | +971 50 964 3133</span>
          </p>
        </div>
      </div>
    </div>
  );
}
