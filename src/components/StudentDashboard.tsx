import React, { useState } from "react";
import { StudentProfile } from "../types";
import { Flame, Sparkles, Target, BookmarkCheck, TrendingUp, Compass, Award, Rocket, Sparkle } from "lucide-react";
import { useGlobalAction } from "./GlobalActionContext";

// Import modular student components
import ExamCommandCenter from "./StudentApp/ExamCommandCenter";
import PlanetJourney from "./StudentApp/PlanetJourney";
import MissionControl from "./StudentApp/MissionControl";
import AIStudyCoach from "./StudentApp/AIStudyCoach";
import SubjectPerformanceHub from "./StudentApp/SubjectPerformanceHub";
import DoubtSolverCenter from "./StudentApp/DoubtSolverCenter";
import RevisionHub from "./StudentApp/RevisionHub";
import MockExamCenter from "./StudentApp/MockExamCenter";
import WellbeingCenter from "./StudentApp/WellbeingCenter";
import GamificationCenter from "./StudentApp/GamificationCenter";
import QuickActionMenu from "./StudentApp/QuickActionMenu";

// Additional high-fidelity interactive systems
import Schedule from "./Schedule";
import Library from "./Library";
import Leaderboard from "./Leaderboard";
import StudyGroups from "./StudyGroups";
import DemoClasses from "./DemoClasses";

interface StudentDashboardProps {
  profile: StudentProfile;
  onNavigateToTab: (tab: string) => void;
  onCancelTrial: (courseId: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
  onUpdateStreak: (newStreak: number) => void;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  triggerNotification?: (title: string, desc: string) => void;
}

type MenuSelectionType = 
  | "all" 
  | "journey" 
  | "academics" 
  | "coach" 
  | "revision" 
  | "wellbeing"
  | "schedule"
  | "library"
  | "leaderboard"
  | "groups"
  | "democlasses";

export default function StudentDashboard({
  profile,
  onNavigateToTab,
  onCancelTrial,
  onAwardXp,
  onUpdateStreak,
  onUpdateProfile,
  triggerNotification
}: StudentDashboardProps) {
  const { openModal } = useGlobalAction();
  // Navigation internal filter
  const [activeSegment, setActiveSegment] = useState<MenuSelectionType>("all");

  // Dynamic state for mock calculations
  const [readinessScore, setReadinessScore] = useState(82);
  const [studyStreak, setStudyStreak] = useState(profile.streak || 6);
  const [xpPoints, setXpPoints] = useState(profile.xp || 280);

  const raiseReadinessVal = (amt: number) => {
    setReadinessScore(prev => Math.min(100, Math.round((prev + amt) * 10) / 10));
  };

  const notify = (title: string, desc: string) => {
    if (triggerNotification) {
      triggerNotification(title, desc);
    } else {
      console.log(`[Notification] ${title}: ${desc}`);
    }
  };

  const handleManualAwardXp = (amount: number, badgeId?: string) => {
    setXpPoints(prev => prev + amount);
    onAwardXp(amount, badgeId);
  };

  const handleStudyCheckIn = () => {
    const nextStreak = studyStreak + 1;
    setStudyStreak(nextStreak);
    onUpdateStreak(nextStreak);
    handleManualAwardXp(30, "badge-streak");
    notify(
      "🔥 Check-In Complete!",
      `Streak elevated to ${nextStreak} Days! Claimed +30 XP and fortified your daily rank milestone.`
    );
  };

  const handleQuickRedirect = (target: string) => {
    if (target === "quiz") {
      onNavigateToTab("quiz");
    } else if (target === "assistant") {
      onNavigateToTab("assistant");
    } else if (
      target === "schedule" || 
      target === "library" || 
      target === "leaderboard" || 
      target === "groups" || 
      target === "democlasses"
    ) {
      setActiveSegment(target);
    } else {
      // Internal segment redirect
      if (target === "doubt" || target === "coach") {
        setActiveSegment("coach");
      } else if (target === "revision") {
        setActiveSegment("revision");
      }
    }
  };

  return (
    <div id="student-executive-dashboard-root" className="px-4 py-6 space-y-6 max-w-7xl mx-auto pb-28 text-left font-sans select-none animate-fade-in">
      
      {/* 2026 NEON LEARNING OS: HERO OPERATING SYSTEM FRAME */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-electric-blue via-neo-purple to-neon-cyan text-white shadow-2xl border border-white/10 overflow-hidden group neon-shadow-blue">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
        
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl animate-bounce">👋</span>
              <div>
                <span className="text-[9px] font-mono font-black text-neon-cyan uppercase tracking-[0.25em] block">STUDENT ACADEMIC OS</span>
                <h2 className="text-2xl font-display font-black text-white tracking-tight mt-0.5">
                  Hi {profile.name || "Sara"}
                </h2>
              </div>
            </div>
            
            {/* Daily Core Missions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
              <div>
                <span className="text-[8.5px] font-mono text-neon-mint font-black tracking-widest uppercase block mb-1">
                  🎯 TODAY'S CORE MISSION
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  Continue Physics Revision & Solve Organic Chemistry
                </p>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4 flex flex-col justify-center">
                <span className="text-[8.5px] font-mono text-neon-cyan font-black tracking-widest uppercase block mb-1">
                  📈 EXPECTED CORE IMPACT
                </span>
                <span className="text-xs font-black text-neon-mint flex items-center gap-1.5 font-mono">
                  +2% Exam Readiness • Claim +30 XP
                </span>
              </div>
            </div>

            {/* Action buttons inside Hero block */}
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              <button
                onClick={handleStudyCheckIn}
                className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-mint text-slate-900 text-[10.5px] font-black uppercase tracking-wider rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-lg shadow-neon-mint/20 animate-pulse"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>Elevate Streak (+30 XP)</span>
              </button>

              <button
                onClick={() => handleManualAwardXp(15)}
                className="px-4 py-2 bg-black/40 hover:bg-black/65 border border-white/10 text-white text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <Sparkle className="w-3.5 h-3.5 text-neon-cyan" />
                <span>Claim daily rewards</span>
              </button>
            </div>
          </div>

          {/* Performance statistics inspired by Apple Fitness and Wealthfront */}
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3 shrink-0">
            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between shadow-md">
              <span className="text-[9px] font-mono text-white/70 font-bold uppercase tracking-widest block mb-1">READINESS</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-neon-mint">{readinessScore}%</span>
                <span className="text-[10px] text-neon-mint/70">Score</span>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between shadow-md">
              <span className="text-[9px] font-mono text-white/70 font-bold uppercase tracking-widest block mb-1">STREAK</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-hot-coral">{studyStreak} Days</span>
                <span className="text-[10px] text-hot-coral/70">Streak</span>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between shadow-md">
              <span className="text-[9px] font-mono text-white/70 font-bold uppercase tracking-widest block mb-1">PREDICTED GRADE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-neon-cyan">A*</span>
                <span className="text-[9px] font-mono text-neon-cyan/70 font-black">TARGET</span>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between shadow-md">
              <span className="text-[9px] font-mono text-white/70 font-bold uppercase tracking-widest block mb-1">PLANETARY XP</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-white">{xpPoints} XP</span>
                <span className="text-[10px] text-white/70">Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Fast Operations Ribbon - Neon Actions toolbelt */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3 shadow-md">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Daily Orbit Actions:
        </span>
        <button
          onClick={() => openModal("STUDENT_START_STUDYING")}
          className="px-3.5 py-1.5 bg-electric-blue hover:bg-electric-blue/90 text-white rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-electric-blue/15"
          aria-label="Start Study Session"
        >
          <span>🚀 Start Session</span>
        </button>
        <button
          onClick={() => openModal("STUDENT_ASK_AI")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Ask Plato AI"
        >
          <span className="text-neon-cyan">🧠 Ask Plato AI</span>
        </button>
        <button
          onClick={() => openModal("STUDENT_UPLOAD_DOUBT")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Upload Doubt"
        >
          <span>📁 Upload Doubt</span>
        </button>
        <button
          onClick={() => openModal("STUDENT_JOIN_CLASS")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Join Live Lesson Class"
        >
          <span>📺 Join Live Class</span>
        </button>
        <button
          onClick={() => openModal("STUDENT_MOCK_TEST")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Take Mock Test Exam"
        >
          <span>💯 Take Mock Test</span>
        </button>
      </div>

      {/* Structured Category Segments pills Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 pr-4 no-scrollbar scroll-smooth">
        {(
          [
            { id: "all", label: "🪐 Command Center" },
            { id: "journey", label: "🌌 Star Odyssey" },
            { id: "academics", label: "⚙️ Exam HQ" },
            { id: "coach", label: "🧠 Coach & Doubts" },
            { id: "revision", label: "📚 Revision PDF" },
            { id: "wellbeing", label: "🌱 Mind Wellbeing" },
            { id: "schedule", label: "📅 Scheduler" },
            { id: "library", label: "📚 Vault Library" },
            { id: "leaderboard", label: "🏆 Toppers" },
            { id: "groups", label: "👥 Circles" },
            { id: "democlasses", label: "🎓 Specimen" }
          ]
        ).map((pill) => (
          <button
            key={pill.id}
            onClick={() => {
              setActiveSegment(pill.id as MenuSelectionType);
              notify(
                "🚀 Changing Dashboard Lens",
                `Refocusing workspace view layout target to: "${pill.label.substring(3)}".`
              );
            }}
            className={`px-4 py-2 whitespace-nowrap text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeSegment === pill.id
                ? "bg-gradient-to-r from-electric-blue to-neo-purple text-white font-black shadow-lg shadow-electric-blue/20 animate-pulse"
                : "bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Main active frame rendering layout */}
      <div className="space-y-10">

        {/* 1. Odysses map segmented view */}
        {(activeSegment === "all" || activeSegment === "journey") && (
          <div className="animate-fade-in-up">
            <PlanetJourney
              currentXp={xpPoints}
              onLaunchMissionXp={(amt) => handleManualAwardXp(amt)}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 2. Urgent Mission control panel */}
        {activeSegment === "all" && (
          <div className="animate-fade-in-up">
            <MissionControl
              onAwardXp={handleManualAwardXp}
              onReadinessIncrease={raiseReadinessVal}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 3. Academic exam modules */}
        {(activeSegment === "all" || activeSegment === "academics") && (
          <div className="space-y-10 animate-fade-in-up">
            {/* Exam Command center ring and charts */}
            <ExamCommandCenter
              curriculum={profile.curriculum}
              onTriggerNotification={notify}
            />

            {/* Structured Mock centre papers */}
            <MockExamCenter
              onAwardXp={handleManualAwardXp}
              onTriggerNotification={notify}
            />

            {/* Primary Subject dashboards catalogs */}
            <SubjectPerformanceHub
              onTriggerNotification={notify}
              onQuickAction={handleQuickRedirect}
            />
          </div>
        )}

        {/* 4. AI Coach and Doubts elements */}
        {(activeSegment === "all" || activeSegment === "coach") && (
          <div className="space-y-10 animate-fade-in-up">
            {/* Doubt Solver tool */}
            <DoubtSolverCenter
              onAwardXp={handleManualAwardXp}
              onTriggerNotification={notify}
            />

            {/* Brain study advisor */}
            <AIStudyCoach
              onAwardXp={handleManualAwardXp}
              onLaunchRevisionFlow={handleQuickRedirect}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 5. Resource papers hub */}
        {(activeSegment === "all" || activeSegment === "revision") && (
          <div className="animate-fade-in-up">
            <RevisionHub
              onAwardXp={handleManualAwardXp}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 6. Wellbeing stress indicators */}
        {(activeSegment === "all" || activeSegment === "wellbeing") && (
          <div className="animate-fade-in-up">
            <WellbeingCenter
              onAwardXp={(amt) => handleManualAwardXp(amt)}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 7. Gamification center widgets (streaks and leaderboards) */}
        {activeSegment === "all" && (
          <div className="animate-fade-in-up">
            <GamificationCenter
              currentStreak={studyStreak}
              currentXp={xpPoints}
              onAwardXp={handleManualAwardXp}
              onTriggerNotification={notify}
            />
          </div>
        )}

        {/* 8. Syllabus Target Schedulers */}
        {activeSegment === "schedule" && (
          <div className="animate-fade-in-up">
            <Schedule
              profile={profile}
              onAwardXp={handleManualAwardXp}
              triggerNotification={notify}
              onNavigateToTab={onNavigateToTab}
            />
          </div>
        )}

        {/* 9. Vault PDF Library References */}
        {activeSegment === "library" && (
          <div className="animate-fade-in-up">
            <Library
              profile={profile}
              onAwardXp={handleManualAwardXp}
              triggerNotification={notify}
            />
          </div>
        )}

        {/* 10. Peer Leaderboard system */}
        {activeSegment === "leaderboard" && (
          <div className="animate-fade-in-up">
            <Leaderboard
              currentProfile={profile}
            />
          </div>
        )}

        {/* 11. Custom digital study groups circles */}
        {activeSegment === "groups" && (
          <div className="animate-fade-in-up">
            <StudyGroups
              currentProfile={profile}
              onUpdateProfile={onUpdateProfile}
              onAwardXp={handleManualAwardXp}
              triggerNotification={notify}
            />
          </div>
        )}

        {/* 12. Free Specimen Demo classes list */}
        {activeSegment === "democlasses" && (
          <div className="animate-fade-in-up">
            <DemoClasses
              onAwardXp={handleManualAwardXp}
              onBookSelectedCourse={(course) => {
                onNavigateToTab("courses");
                notify(
                  "📆 Registration Form Active",
                  `Drafting admissions inquiry for custom course: ${course.title}`
                );
              }}
            />
          </div>
        )}

      </div>

      {/* Floating Persistant launcher menu */}
      <QuickActionMenu
        onQuickAction={handleQuickRedirect}
        onTriggerNotification={notify}
      />
    </div>
  );
}
