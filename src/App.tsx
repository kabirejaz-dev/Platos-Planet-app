/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import PhoneContainer from "./components/PhoneContainer";
import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import CourseCatalog from "./components/CourseCatalog";
import MindyChat from "./components/MindyChat";
import InteractiveQuiz from "./components/InteractiveQuiz";
import LeadForm from "./components/LeadForm";
import DemoClasses from "./components/DemoClasses";
import StudentPortal from "./components/StudentPortal";
import Leaderboard from "./components/Leaderboard";
import StudyGroups from "./components/StudyGroups";
import Library from "./components/Library";
import { LIBRARY_DOCUMENTS } from "./components/Library";
import Schedule from "./components/Schedule";
import SystemSpecs from "./components/SystemSpecs";
import Payments from "./components/Payments";
import CommandCentre, { RoleType } from "./components/CommandCentre";
import { StudentProfile, Course, ChatMessage } from "./types";
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Award, 
  CalendarDays,
  Calendar,
  CalendarRange,
  Sparkles,
  MapPin,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  GraduationCap,
  UserCheck,
  Users,
  Sun,
  Moon,
  CreditCard,
  Play
} from "lucide-react";

import { GlobalActionProvider, useGlobalAction } from "./components/GlobalActionContext";

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  
  // High fidelity role configuration selector - defaulting to Super Admin as shown in the picture
  const [currentRole, setCurrentRole] = useState<RoleType>("Super Admin");
  
  // Audio guidance system state
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Theme state: 'dark' (calibrated night comfort) or 'light' (Day Mode morning studying)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const stored = localStorage.getItem("plato_app_theme");
      return (stored === "light" || stored === "dark") ? stored : "dark";
    } catch {
      return "dark";
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("plato_app_theme", nextTheme);
    } catch {}
    triggerLocalNotification(
      nextTheme === "light" ? "☀️ Day Mode Activated" : "🌙 Night Mode Activated",
      nextTheme === "light"
        ? "Switching to high-contrast Day Mode for productive morning study sessions!"
        : "Switching to cozy Dark Mode calibrated for night-time eye comfort!"
    );
  };

  // Lift chat history so it survives tab switching!
  const [chats, setChats] = useState<ChatMessage[]>([
    {
      id: "mindy-welcome",
      role: "model",
      text: "Marhaban! I am Mindy, your AI tutor for Plato's Planet Dubai! 🌟 Meet me to unlock CBSE/British sample files or interactive revision study-sheets!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Dynamic user profile structure
  const [profile, setProfile] = useState<StudentProfile>({
    name: "Zayd Al-Mansoori",
    grade: "10 (Secondary)",
    curriculum: "British",
    streak: 6,
    xp: 280, // Burj Khalifa climbing target is 828 XP points!
    badges: ["badge-first"],
    enrolledCourses: ["british-igcse-physics"],
    bookedTrials: [],
    preferredStudyTime: "17:30",
    studyRemindersEnabled: true
  });

  const [notification, setNotification] = useState<{ title: string; desc: string } | null>(null);

  const triggerLocalNotification = (title: string, desc: string) => {
    setNotification({ title, desc });
    if (soundEnabled) {
      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2018/2018-84.wav");
        audio.volume = 0.25;
        audio.play();
      } catch (e) {
        console.log("Audio feedback restricted by iframe permissions");
      }
    }
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Automated study session daily hour time checker
  React.useEffect(() => {
    if (!profile.studyRemindersEnabled || !profile.preferredStudyTime) return;

    let lastTriggeredHHMM = "";

    const evaluateTime = () => {
      const now = new Date();
      // Format to match HH:MM e.g. "17:30"
      const currentHHMM = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
      
      if (currentHHMM === profile.preferredStudyTime && lastTriggeredHHMM !== currentHHMM) {
        lastTriggeredHHMM = currentHHMM;

        const libCurriculum = profile.curriculum === "British" ? "IGCSE" : profile.curriculum === "CBSE" ? "CBSE" : "General";
        const matches = LIBRARY_DOCUMENTS.filter(doc => doc.curriculum === libCurriculum || doc.curriculum === "General");
        const dateIndex = now.getDate();
        const doc = matches[dateIndex % (matches.length || 1)] || matches[0] || LIBRARY_DOCUMENTS[0];
        const suggestion = doc 
          ? `\n\n💡 Suggested Active Recall: "${doc.title}" (${doc.subject}) under standard difficulty [${doc.difficulty}]. Tap 'Focus Zone' to begin!` 
          : "";

        triggerLocalNotification(
          "⏱️ Daily Study Hour Reminder!",
          `Pristine discipline, ${profile.name}! It is exactly ${profile.preferredStudyTime}. Start a 25-min Pomodoro session to claim +35 XP and secure your ${profile.streak}-day streak! 🚀${suggestion}`
        );
      }
    };

    evaluateTime();
    const clockInterval = setInterval(evaluateTime, 20000); // Check every 20 seconds
    return () => clearInterval(clockInterval);
  }, [profile.preferredStudyTime, profile.studyRemindersEnabled, profile.name, profile.streak]);

  // State utility to handle XP awardings and automatic badges detection
  const handleAwardXp = (amount: number, badgeId?: string) => {
    setProfile(prev => {
      let updatedBadges = [...prev.badges];
      let gotNewBadge = false;
      let badgeName = "";

      if (badgeId && !prev.badges.includes(badgeId)) {
        updatedBadges.push(badgeId);
        gotNewBadge = true;
        // Determine name for notification beauty
        if (badgeId === "badge-quiz") badgeName = "Quiz Conquerer 🧠";
        if (badgeId === "badge-ai") badgeName = "AI Explorer 🤖";
        if (badgeId === "badge-enrolled") badgeName = "Future Prodigy 🎯";
      }

      const newXp = prev.xp + amount;
      
      // Auto trigger notice
      if (gotNewBadge) {
        setTimeout(() => {
          triggerLocalNotification("🏆 Achievement Unlocked!", `You earned '${badgeName}' and +${amount} Planetary XP!`);
        }, 100);
      } else {
        setTimeout(() => {
          triggerLocalNotification("✨ Space Level Progress!", `Earned +${amount} XP! Climbing closer to the Burj Peak.`);
        }, 100);
      }

      return {
        ...prev,
        xp: newXp,
        badges: updatedBadges
      };
    });
  };

  // Event handler for booking/reserving trial lesson standard
  const handleSelectedCourseForEnroll = (course: Course) => {
    setSelectedCourseForEnroll(course);
    setActiveTab("courses");
  };

  const handleEnrollSuccess = (courseId: string) => {
    setProfile(prev => {
      const alreadySaved = prev.bookedTrials.includes(courseId);
      if (alreadySaved) return prev;
      
      const updatedTrials = [...prev.bookedTrials, courseId];
      
      // Auto trigger success badge
      setTimeout(() => {
        handleAwardXp(120, "badge-enrolled");
      }, 200);

      return {
        ...prev,
        bookedTrials: updatedTrials
      };
    });
  };

  const handleCancelTrial = (courseId: string) => {
    setProfile(prev => ({
      ...prev,
      bookedTrials: prev.bookedTrials.filter(id => id !== courseId)
    }));
    triggerLocalNotification("🕒 Slot Updated", "Your campus slot has been cleared for rescheduling.");
  };

  const handleRoleChange = (role: RoleType) => {
    setCurrentRole(role);
    triggerLocalNotification(
      `🔑 Role Switched: ${role}`,
      `Loaded workspace layout and tools calibrated for ${role}.`
    );
  };

  const isAdminRole = 
    currentRole === "Super Admin" || 
    currentRole === "Branch Admin" || 
    currentRole === "Sales" || 
    currentRole === "Teacher" || 
    currentRole === "Academic Coordinator" ||
    currentRole === "Finance Manager";

  const handleAddChatMessage = (newMsg: ChatMessage) => {
    setChats(prev => [...prev, newMsg]);
  };

  return (
    <PhoneContainer sideComponent={<SystemSpecs />} isWidescreen={isAdminRole}>
      {isAdminRole ? (
        <CommandCentre 
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          theme={theme}
          onTriggerNotification={triggerLocalNotification}
        />
      ) : (
        <div className={`w-full min-h-full flex flex-col relative transition-all duration-300 ${theme === "light" ? "day-mode bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"}`}>
        {/* App brand strip */}
        <div className="w-full bg-brand-blue-dark px-4 py-3 flex items-center justify-between border-b border-brand-blue/30 sticky top-0 z-40">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-red to-brand-yellow flex items-center justify-center font-black text-slate-100 text-xs shadow-md">
              P
            </div>
            <div>
              <h1 className="text-xs font-black tracking-widest text-[#FFF] uppercase leading-none">
                Plato's Planet
              </h1>
              <span className="text-[9px] text-brand-yellow font-extrabold uppercase tracking-wider font-mono">
                Dubai Training
              </span>
            </div>
          </div>

          {/* Global status pill */}
          <div className="flex items-center gap-2">
            {/* Elegant mobile role selector */}
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as RoleType)}
              className="bg-slate-900 text-slate-100 border border-slate-750 p-1 px-1.5 rounded-lg text-[9px] font-black tracking-tight cursor-pointer focus:outline-none hover:border-brand-blue-light transition-colors"
            >
              <option value="Super Admin">Admin 👑</option>
              <option value="Branch Admin">B.Admin 🏢</option>
              <option value="Sales">Sales 💼</option>
              <option value="Teacher">Teacher 🎓</option>
              <option value="Academic Coordinator">Coord. 📋</option>
              <option value="Finance Manager">Finance 💰</option>
              <option value="Student">Student ✏️</option>
              <option value="Parent">Parent 👨‍👩‍👧</option>
            </select>

            {/* User-controlled Night/Day theme toggle */}
            <button 
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-1 px-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center cursor-pointer"
              title={theme === "light" ? "Switch to Nightcomfort Mode" : "Switch to Morning Day Mode"}
            >
              {theme === "light" ? (
                <Sun className="w-3.5 h-3.5 text-brand-yellow animate-bounce" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>

            {/* Audio toggle controls */}
            <button 
              id="sound-toggle-btn"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                triggerLocalNotification("📢 Audio Mode Changed", soundEnabled ? "Sounds disabled" : "Sound notifications active!");
              }}
              className="p-1 px-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-300 transition-colors"
              title="Toggle Notification Sounds"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-brand-yellow" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-center gap-1 text-[10px] bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              <Flame className="w-3 h-3 text-brand-red fill-current" />
              <span className="text-slate-350 font-bold font-mono">{profile.streak} Days</span>
            </div>
          </div>
        </div>

      {/* Floating high-fidelity push notifications (Dynamic in-app toaster) */}
      {notification && (
        <div className="mx-4 my-2.5 bg-slate-900 border-2 border-brand-yellow p-3 rounded-xl flex items-start gap-2.5 shadow-2xl animate-fade-in relative z-50">
          <span className="text-lg">📢</span>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-100 block">{notification.title}</span>
            <p className="text-[10px] text-brand-yellow leading-normal">{notification.desc}</p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="absolute top-2 right-2 text-slate-500 hover:text-slate-400 text-xs font-bold p-1 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Active Tab rendering router */}
      <div className="flex-1 pb-16">
        {activeTab === "dashboard" && (
          currentRole === "Parent" ? (
            <ParentDashboard 
              profile={profile}
              onNavigateToTab={setActiveTab}
              onTriggerNotification={triggerLocalNotification}
            />
          ) : (
            <StudentDashboard 
              profile={profile} 
              onNavigateToTab={setActiveTab}
              onCancelTrial={handleCancelTrial}
              onAwardXp={handleAwardXp}
              onUpdateStreak={(newStreak: number) => setProfile(prev => ({ ...prev, streak: newStreak }))}
              onUpdateProfile={(newP) => setProfile(newP)}
              triggerNotification={triggerLocalNotification}
            />
          )
        )}
        {activeTab === "courses" && (
          selectedCourseForEnroll ? (
            <div className="space-y-2">
              {/* Return button back to Tuition Courses list */}
              <button 
                id="back-to-courses-btn"
                onClick={() => setSelectedCourseForEnroll(null)}
                className="mx-4 mt-4 px-3 py-1.5 bg-slate-900 border border-slate-800 text-brand-yellow font-extrabold text-[11px] rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-slate-850 hover:border-brand-yellow/30 transition-all uppercase"
              >
                ← Back to Programs
              </button>
              <LeadForm 
                initialCourse={selectedCourseForEnroll}
                onEnrollSuccess={(courseId) => {
                  handleEnrollSuccess(courseId);
                  setSelectedCourseForEnroll(null);
                }}
              />
            </div>
          ) : (
            <CourseCatalog 
              onSelectedCourseForEnroll={handleSelectedCourseForEnroll}
            />
          )
        )}
        {activeTab === "assistant" && (
          <div className="w-full flex flex-col" style={{ minHeight: "550px" }}>
            <div className="flex-1">
              <MindyChat 
                profile={profile}
                chats={chats}
                onAddChatMessage={handleAddChatMessage}
                onAwardXp={handleAwardXp}
              />
            </div>
            
            {/* Integrated Practice Quiz Promo */}
            <div className="m-4 p-3.5 bg-gradient-to-r from-brand-blue-dark/50 to-slate-900 border border-brand-blue/30 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
              <div className="space-y-0.5">
                <span className="text-[8px] bg-brand-red text-white font-extrabold px-1.5 py-0.2 rounded font-mono uppercase tracking-widest leading-none">
                  Practice
                </span>
                <h4 className="text-xs font-bold text-slate-100">Board Exam Challenge Quiz</h4>
                <p className="text-[10px] text-slate-400 font-light leading-snug">Solve high-yield CBSE & British questions</p>
              </div>
              <button 
                id="launch-quiz-integrated"
                onClick={() => setActiveTab("quiz")}
                className="px-3.5 py-2 whitespace-nowrap bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-xl transition-all active:scale-95 cursor-pointer shadow-lg shadow-brand-yellow/5"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}
        {activeTab === "quiz" && (
          <div className="space-y-2">
            <button 
              id="back-to-assistant-btn"
              onClick={() => setActiveTab("assistant")}
              className="mx-4 mt-4 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-brand-yellow font-extrabold text-[11px] rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-slate-850 hover:border-brand-yellow/30 transition-all uppercase"
            >
              ← Back to Chat Assistant
            </button>
            <InteractiveQuiz 
              profile={profile}
              onAwardXp={handleAwardXp}
            />
          </div>
        )}
        {activeTab === "payments" && (
          <Payments 
            profile={profile}
            onAwardXp={(amt) => handleAwardXp(amt)}
            triggerNotification={triggerLocalNotification}
          />
        )}
        {activeTab === "portal" && (
          <StudentPortal 
            currentProfile={profile}
            onUpdateProfile={(newProfile) => setProfile(newProfile)}
            onAwardXp={handleAwardXp}
            soundEnabled={soundEnabled}
            triggerNotification={triggerLocalNotification}
          />
        )}
      </div>

      {/* Decluttered & Compact 5-Tab Bottom bar — perfectly spaced without scrolling! */}
      <div className="w-full bg-slate-950 border-t border-slate-900 py-3.5 flex items-center justify-around absolute bottom-0 left-0 right-0 z-40 select-none px-2">
        
        {/* Hub Tab */}
        <button
          id="nav-tab-dashboard"
          onClick={() => {
            setActiveTab("dashboard");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
            activeTab === "dashboard" 
              ? "text-brand-yellow font-black scale-105" 
              : "text-slate-450 hover:text-slate-200"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide font-sans">Hub</span>
        </button>

        {/* Programs / Course Catalog Tab */}
        <button
          id="nav-tab-courses"
          onClick={() => {
            setActiveTab("courses");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
            activeTab === "courses" 
              ? "text-brand-yellow font-black scale-105" 
              : "text-slate-450 hover:text-slate-200"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide font-sans">Programs</span>
        </button>

        {/* Payments Tab */}
        <button
          id="nav-tab-payments"
          onClick={() => {
            setActiveTab("payments");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
            activeTab === "payments" 
              ? "text-brand-yellow font-black scale-105" 
              : "text-slate-450 hover:text-slate-200"
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide font-sans">Payments</span>
        </button>

        {/* Mindy AI Assistant Tab */}
        <button
          id="nav-tab-assistant"
          onClick={() => {
            setActiveTab("assistant");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
            activeTab === "assistant" || activeTab === "quiz"
              ? "text-brand-yellow font-black scale-105" 
              : "text-slate-450 hover:text-slate-200"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide font-sans">Mindy AI</span>
        </button>

        {/* Log In / Portal Tab */}
        <button
          id="nav-tab-portal"
          onClick={() => {
            setActiveTab("portal");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
            activeTab === "portal" 
              ? "text-brand-yellow font-black scale-105" 
              : "text-slate-450 hover:text-slate-200"
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide font-sans">Portal</span>
        </button>

      </div>

      </div>
      )}
    </PhoneContainer>
  );
}

export default function App() {
  return (
    <GlobalActionProvider>
      <AppContent />
    </GlobalActionProvider>
  );
}
