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
    <div id="student-executive-dashboard-root" className="px-4 py-6 space-y-6 max-w-7xl mx-auto pb-28 text-left font-sans select-none">
      
      {/* Dynamic Hero Success Header Block */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-805 shadow-xl overflow-hidden group">
        {/* Abstract glowing vector background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none group-hover:from-amber-500/15 transition-all" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <h2 className="text-xl font-black text-white tracking-tight">
                Welcome back, {profile.name || "Sara"}
              </h2>
            </div>
            
            <p className="text-[13px] text-amber-500 font-extrabold leading-normal">
              🏆 You are {readinessScore}% exam-ready.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Complete <span className="text-white underline underline-offset-4 decoration-amber-500/50">Physics Variant 2</span> and <span className="text-white underline underline-offset-4 decoration-amber-500/50">Chemistry Organic Practice</span> today to reach target <span className="text-amber-500 font-extrabold">85% readiness mark!</span>
            </p>

            {/* Quick interactive actions inside Hero block */}
            <div className="flex flex-wrap gap-2.5 pt-3.5">
              <button
                onClick={handleStudyCheckIn}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10.5px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-500/15"
              >
                <Flame className="w-4 h-4 fill-current animate-bounce" />
                <span>Elevate Streak (+30 XP)</span>
              </button>

              <button
                onClick={() => handleManualAwardXp(15)}
                className="px-4 py-2 bg-slate-950 border border-slate-850 hover:border-slate-800 text-slate-300 text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <Sparkle className="w-3.5 h-3.5 text-amber-500" />
                <span>Claim daily rewards</span>
              </button>
            </div>
          </div>

          {/* Quick metric stats bubble board */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 p-4 border border-slate-850 rounded-2xl w-full md:w-auto self-stretch md:self-auto justify-around">
            <div className="text-center px-4 leading-none">
              <span className="text-2xl font-black font-mono text-amber-500 block">{readinessScore}%</span>
              <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest mt-1.5 block">READINESS</span>
            </div>
            <div className="w-px bg-slate-850 h-8 hidden sm:block" />
            <div className="text-center px-4 leading-none">
              <span className="text-2xl font-black font-mono text-indigo-400 block">{studyStreak} Days</span>
              <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest mt-1.5 block">STREAK</span>
            </div>
            <div className="w-px bg-slate-850 h-8 hidden sm:block" />
            <div className="text-center px-4 leading-none">
              <span className="text-2xl font-black font-mono text-white block">{xpPoints} XP</span>
              <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest mt-1.5 block">PLANETS XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Fast Operations Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Daily Orbit Actions:
        </span>
        <button
          onClick={() => openModal("STUDENT_START_STUDYING")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 animate-pulse"
          aria-label="Start Study Session"
        >
          <span>🚀 Start Session</span>
        </button>
        <button
          onClick={() => openModal("STUDENT_ASK_AI")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Ask Plato AI"
        >
          <span>🧠 Ask Plato AI</span>
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
            { id: "all", label: "🪐 Complete Command Center" },
            { id: "journey", label: "🌌 Star Odyssey Path" },
            { id: "academics", label: "⚙️ Exam Command HQ" },
            { id: "coach", label: "🧠 Plato Coach & doubts" },
            { id: "revision", label: "📚 Revision PDF Vault" },
            { id: "wellbeing", label: "🌱 Mind Wellbeing" },
            { id: "schedule", label: "📅 Syllabus Scheduler" },
            { id: "library", label: "📚 Vault Library" },
            { id: "leaderboard", label: "🏆 Burj Toppers" },
            { id: "groups", label: "👥 Study Circles" },
            { id: "democlasses", label: "🎓 Specimen Lessons" }
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
                ? "bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10"
                : "bg-slate-900 text-slate-450 hover:text-slate-200 border border-slate-805"
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
