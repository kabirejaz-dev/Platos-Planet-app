/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import PhoneContainer from "./components/PhoneContainer";
import StudentDashboard from "./components/StudentDashboard";
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
  Moon
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  
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
      text: "Marhaban! I am Mindy, your AI tutor for Plato's Planet Dubai! 🌟 Meet me to unlock CBSE/British sample files or Astro-Robotics guide books!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Dynamic user profile structure
  const [profile, setProfile] = useState<StudentProfile>({
    name: "Zayd Al-Mansoori",
    grade: "10 (Secondary)",
    curriculum: "Coding & Robotics",
    streak: 6,
    xp: 280, // Burj Khalifa climbing target is 828 XP points!
    badges: ["badge-first"],
    enrolledCourses: ["robo-astro"],
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
    setActiveTab("enroll");
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

  const handleAddChatMessage = (newMsg: ChatMessage) => {
    setChats(prev => [...prev, newMsg]);
  };

  return (
    <PhoneContainer>
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
          <StudentDashboard 
            profile={profile} 
            onNavigateToTab={setActiveTab}
            onCancelTrial={handleCancelTrial}
            onAwardXp={handleAwardXp}
            onUpdateStreak={(newStreak: number) => setProfile(prev => ({ ...prev, streak: newStreak }))}
            triggerNotification={triggerLocalNotification}
          />
        )}
        {activeTab === "courses" && (
          <CourseCatalog 
            onSelectedCourseForEnroll={handleSelectedCourseForEnroll}
          />
        )}
        {activeTab === "assistant" && (
          <MindyChat 
            profile={profile}
            chats={chats}
            onAddChatMessage={handleAddChatMessage}
            onAwardXp={handleAwardXp}
          />
        )}
        {activeTab === "quiz" && (
          <InteractiveQuiz 
            profile={profile}
            onAwardXp={handleAwardXp}
          />
        )}
        {activeTab === "enroll" && (
          <LeadForm 
            initialCourse={selectedCourseForEnroll}
            onEnrollSuccess={handleEnrollSuccess}
          />
        )}
        {activeTab === "demos" && (
          <DemoClasses 
            onAwardXp={handleAwardXp}
            onBookSelectedCourse={handleSelectedCourseForEnroll}
          />
        )}
        {activeTab === "portal" && (
          <StudentPortal 
            currentProfile={profile}
            onUpdateProfile={setProfile}
            onAwardXp={handleAwardXp}
            soundEnabled={soundEnabled}
            triggerNotification={triggerLocalNotification}
          />
        )}
        {activeTab === "leaderboard" && (
          <Leaderboard 
            currentProfile={profile}
          />
        )}
        {activeTab === "groups" && (
          <StudyGroups 
            currentProfile={profile}
            onUpdateProfile={setProfile}
            triggerNotification={triggerLocalNotification}
            onAwardXp={handleAwardXp}
          />
        )}
        {activeTab === "library" && (
          <Library 
            profile={profile}
            onAwardXp={handleAwardXp}
            triggerNotification={triggerLocalNotification}
          />
        )}
        {activeTab === "schedule" && (
          <Schedule 
            profile={profile}
            onAwardXp={handleAwardXp}
            triggerNotification={triggerLocalNotification}
            onNavigateToTab={setActiveTab}
          />
        )}
      </div>

      {/* Low-profile Android Navigation Drawer Tab bar sticking at the bottom */}
      <div className="w-full bg-brand-blue-dark border-t border-brand-blue/40 py-1.5 flex items-center justify-start gap-1.5 overflow-x-auto scrollbar-none absolute bottom-0 left-0 right-0 z-40 select-none px-2.5">
        
        {/* Dashboard Tab */}
        <button
          id="nav-tab-dashboard"
          onClick={() => {
            setActiveTab("dashboard");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "dashboard" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Hub</span>
        </button>

        {/* Schedule Tab */}
        <button
          id="nav-tab-schedule"
          onClick={() => {
            setActiveTab("schedule");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "schedule" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <CalendarRange className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Schedule</span>
        </button>

        {/* Courses Catalog Tab */}
        <button
          id="nav-tab-courses"
          onClick={() => {
            setActiveTab("courses");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "courses" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Programs</span>
        </button>

        {/* Study Groups Tab */}
        <button
          id="nav-tab-groups"
          onClick={() => {
            setActiveTab("groups");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "groups" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Groups</span>
        </button>

        {/* Demo Lab Tab */}
        <button
          id="nav-tab-demos"
          onClick={() => {
            setActiveTab("demos");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "demos" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Demos</span>
        </button>

        {/* Student Portal Tab */}
        <button
          id="nav-tab-portal"
          onClick={() => {
            setActiveTab("portal");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "portal" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <UserCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Portal</span>
        </button>

        {/* Mindy assistant Tab */}
        <button
          id="nav-tab-assistant"
          onClick={() => {
            setActiveTab("assistant");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "assistant" 
              ? "text-brand-yellow font-bold animate-pulse-once" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full border border-slate-950" />
          </div>
          <span className="text-[8.5px] tracking-tight font-sans">Mindy AI</span>
        </button>

        {/* Syllabus Archive Library Tab */}
        <button
          id="nav-tab-library"
          onClick={() => {
            setActiveTab("library");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "library" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Library</span>
        </button>

        {/* Exam prep Quiz Tab */}
        <button
          id="nav-tab-quiz"
          onClick={() => {
            setActiveTab("quiz");
            setSelectedCourseForEnroll(null);
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "quiz" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <Award className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Challenge</span>
        </button>

        {/* Register Physical slot Tab */}
        <button
          id="nav-tab-enroll"
          onClick={() => {
            setActiveTab("enroll");
          }}
          className={`flex-grow flex-shrink-0 min-w-[48px] pb-1 pt-0.5 rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
            activeTab === "enroll" 
              ? "text-brand-yellow font-bold" 
              : "text-slate-400 hover:text-slate-250"
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[8.5px] tracking-tight font-sans">Book Trial</span>
        </button>

      </div>
      </div>
    </PhoneContainer>
  );
}
