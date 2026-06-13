import React, { useState, useEffect, useMemo } from "react";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trash2, 
  CheckCircle, 
  FileText, 
  AlertCircle, 
  Compass, 
  Timer,
  ChevronRight,
  RefreshCw,
  Award
} from "lucide-react";
import { StudentProfile, Course } from "../types";
import { PLATO_COURSES } from "../data";

interface ScheduleProps {
  profile: StudentProfile;
  onAwardXp: (amount: number, badgeId?: string) => void;
  triggerNotification: (title: string, desc: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

interface ExamInfo {
  subjectId: string; // Course ID or "custom_..."
  subjectName: string;
  examDate: string;
  targetScore: string; // e.g. "A*", "Centum 100", "Grade 9"
  syllabusChapters: string[];
}

interface GeneratedPlan {
  totalStudyHoursNeeded: number;
  dailyFocusHours: number;
  urgencyLevel: "relaxed" | "moderate" | "intensive" | "critical";
  timeline: {
    period: "morning" | "afternoon" | "evening";
    timeSlot: string;
    focusType: string;
    description: string;
    hours: number;
    tip: string;
  }[];
  topicDrills: {
    subject: string;
    topic: string;
    chapterIndex: number;
    status: "pending" | "completed";
  }[];
}

export default function Schedule({ profile, onAwardXp, triggerNotification, onNavigateToTab }: ScheduleProps) {
  // Exam dates storage
  const [exams, setExams] = useState<ExamInfo[]>(() => {
    try {
      const stored = localStorage.getItem(`plato_exams_${profile.name}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }

    // Default exams based on enrolled courses
    const initialExams: ExamInfo[] = [];
    const coursesEnrolled = PLATO_COURSES.filter(c => profile.enrolledCourses.includes(c.id));
    
    coursesEnrolled.forEach(c => {
      // Default to 14 days from now as placeholder
      const dateInTwoWeeks = new Date();
      dateInTwoWeeks.setDate(dateInTwoWeeks.getDate() + 14);
      const formattedDate = dateInTwoWeeks.toISOString().split("T")[0];

      initialExams.push({
        subjectId: c.id,
        subjectName: c.title,
        examDate: formattedDate,
        targetScore: c.curriculum === "British" ? "A*" : c.curriculum === "CBSE" ? "95%+" : "Completed Pro Portfolio",
        syllabusChapters: c.highlights.slice(0, 3)
      });
    });

    // Fallback if no course is enrolled
    if (initialExams.length === 0) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 10);
      initialExams.push({
        subjectId: "custom-math",
        subjectName: "General STEM & Coding Diagnostic",
        examDate: defaultDate.toISOString().split("T")[0],
        targetScore: "A*",
        syllabusChapters: ["Syllabus Foundation Check", "Trigonometric Formulations", "Weekly Robotics Calibration"]
      });
    }

    return initialExams;
  });

  // State for adding custom exams
  const [customSubject, setCustomSubject] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [customTarget, setCustomTarget] = useState("");
  const [customChapters, setCustomChapters] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Completed study tasks list
  const [completedTopicDrills, setCompletedTopicDrills] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`plato_completed_drills_${profile.name}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save exams to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`plato_exams_${profile.name}`, JSON.stringify(exams));
    } catch (e) {
      console.error(e);
    }
  }, [exams, profile.name]);

  // Save completed drills to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`plato_completed_drills_${profile.name}`, JSON.stringify(completedTopicDrills));
    } catch (e) {
      console.error(e);
    }
  }, [completedTopicDrills, profile.name]);

  // Calculate days remaining helper
  const getDaysRemaining = (examDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(examDateStr);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Auto-calculated dynamic plan using deterministic scheduler engine
  const generatedPlan = useMemo<GeneratedPlan>(() => {
    if (exams.length === 0) {
      return {
        totalStudyHoursNeeded: 0,
        dailyFocusHours: 0,
        urgencyLevel: "relaxed",
        timeline: [],
        topicDrills: []
      };
    }

    // Find the nearest exam
    let nearestDays = 999;
    let totalRecommendedHours = 0;
    
    exams.forEach(ex => {
      const days = getDaysRemaining(ex.examDate);
      if (days > 0 && days < nearestDays) {
        nearestDays = days;
      }
    });

    if (nearestDays === 999) nearestDays = 14; // Fallback

    // Urgency metrics & recommended daily hours
    let urgency: "relaxed" | "moderate" | "intensive" | "critical" = "moderate";
    let dailyHours = 1.5;

    if (nearestDays <= 3) {
      urgency = "critical";
      dailyHours = 4.0;
    } else if (nearestDays <= 7) {
      urgency = "intensive";
      dailyHours = 3.0;
    } else if (nearestDays <= 15) {
      urgency = "moderate";
      dailyHours = 2.0;
    } else {
      urgency = "relaxed";
      dailyHours = 1.0;
    }

    // Multiply hours slightly based on amount of enrolled classes/exams
    const examCountMultiplier = Math.min(1.5, 1 + (exams.length - 1) * 0.15);
    const calibratedDailyHours = Number((dailyHours * examCountMultiplier).toFixed(1));
    const totalHoursNeeded = Math.round(calibratedDailyHours * Math.min(nearestDays, 30));

    // Dynamic timeline allocation based on Day / Night mode constraints
    const timelineSlots: GeneratedPlan["timeline"] = [];

    // Morning Session - optimized for morning studying
    timelineSlots.push({
      period: "morning",
      timeSlot: "08:30 AM - 10:00 AM",
      focusType: "🌅 Morning Boost (Active recall)",
      description: "Tackle core mathematical equations & raw logical formulas while your brain is fresh. Perfect for high-contrast Day Mode study flow.",
      hours: Number((calibratedDailyHours * 0.4).toFixed(1)) || 0.5,
      tip: "Commit complex equations and diagrams to short-term recall intervals first thing!"
    });

    // Afternoon Session - focused on drills
    if (calibratedDailyHours >= 2.0) {
      timelineSlots.push({
        period: "afternoon",
        timeSlot: "03:30 PM - 05:00 PM",
        focusType: "⚡ Afternoon Past Paper Marathon",
        description: "Practice solving timed CBSE Mock papers, Arduino circuitry configurations, or custom diagnostic review questions.",
        hours: Number((calibratedDailyHours * 0.4).toFixed(1)) || 0.8,
        tip: "Avoid distraction: lock your phone or write on paper to fully simulate board pressure conditions!"
      });
    }

    // Night Memory recollection - comfort eye mode light review
    timelineSlots.push({
      period: "evening",
      timeSlot: "08:30 PM - 09:30 PM",
      focusType: "🌙 Night Light Consolidation",
      description: "Casual syllabus revision. Review Mindy AI chatbot questions, look over marked flashcards or listen to audio recordings. Relaxed comfort studying.",
      hours: Number((calibratedDailyHours * 0.2).toFixed(1)) || 0.5,
      tip: "Dusk revision! Calibrate your screen for night comfort view to lock in the day's study gains."
    });

    // Auto-generate high-yield topic drills based on selected chapters
    const activeDrills: GeneratedPlan["topicDrills"] = [];
    exams.forEach(ex => {
      ex.syllabusChapters.forEach((ch, idx) => {
        activeDrills.push({
          subject: ex.subjectName,
          topic: ch,
          chapterIndex: idx + 1,
          status: completedTopicDrills.includes(`${ex.subjectId}_${idx}`) ? "completed" : "pending"
        });
      });
    });

    return {
      totalStudyHoursNeeded: totalHoursNeeded,
      dailyFocusHours: calibratedDailyHours,
      urgencyLevel: urgency,
      timeline: timelineSlots,
      topicDrills: activeDrills
    };
  }, [exams, completedTopicDrills, profile.name]);

  // Action: Add exam
  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSubject || !customDate) {
      triggerNotification("⚠️ Missing fields", "Please select a topic name and exam date.");
      return;
    }

    const formatChapters = customChapters 
      ? customChapters.split(",").map(c => c.trim())
      : ["Core board concepts", "Doubt clearance questions", "Mock revision assessments"];

    const newEx: ExamInfo = {
      subjectId: "custom_" + Date.now(),
      subjectName: customSubject,
      examDate: customDate,
      targetScore: customTarget || "A* Excellence",
      syllabusChapters: formatChapters
    };

    setExams(prev => [...prev, newEx]);
    setCustomSubject("");
    setCustomDate("");
    setCustomTarget("");
    setCustomChapters("");
    setIsAddingCustom(false);

    onAwardXp(50); // Reward student citizenship!
    triggerNotification("📅 Study Schedule Updated", "New exam target synced to Plato Database! +50 XP claimed.");
  };

  // Action: Delete exam
  const handleDeleteExam = (id: string, name: string) => {
    setExams(prev => prev.filter(e => e.subjectId !== id));
    triggerNotification("🗑️ Target Removed", `Deleted ${name} study target from active tracking.`);
  };

  // Action: toggle topic milestone completion
  const handleToggleDrill = (subjectId: string, chapterIdx: number, topicName: string) => {
    const drillKey = `${subjectId}_${chapterIdx}`;
    const wasCompleted = completedTopicDrills.includes(drillKey);
    let updated: string[];

    if (wasCompleted) {
      updated = completedTopicDrills.filter(k => k !== drillKey);
      triggerNotification("🔄 Milestone Reset", `Marked "${topicName}" study drill as pending progress.`);
    } else {
      updated = [...completedTopicDrills, drillKey];
      onAwardXp(25); // Award study reward XP!
      triggerNotification("🎉 Study Goal Cleared!", `Amazing! Spent time on "${topicName}". Earned +25 XP!`);
    }
    setCompletedTopicDrills(updated);
  };

  // Action: Recalibrate schedule
  const handleRecalibrate = () => {
    triggerNotification("⚡ Algorithmic Recalibration", "Re-evaluating board deadlines, study velocity, and daily syllabus load...");
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in text-left">
      
      {/* Dynamic Header & Sparkle Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-2 py-0.5 rounded font-extrabold uppercase font-mono tracking-widest">
            AI Exam Assistant
          </span>
          <span className="text-[9px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
            V2.5 Planner
          </span>
        </div>
        <h2 className="text-base font-black text-slate-100 flex items-center gap-1.5 mt-1.5">
          <Calendar className="w-5 h-5 text-brand-yellow animate-pulse" />
          <span>Syllabus Target Scheduler</span>
        </h2>
        <p className="text-[10px] sm:text-[10.5px] text-slate-400 mt-1 leading-relaxed">
          Align your exam dates for board examinations or astro-coding milestones. Our algorithmic engines design daily focus timelines structured around your comfort preferences!
        </p>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-brand-yellow" />
            <div className="text-left">
              <span className="text-[9px] text-slate-450 uppercase block font-mono">Global Focus Pace</span>
              <span className="text-xs font-bold text-slate-200">
                {generatedPlan.dailyFocusHours} hrs / day recommended
              </span>
            </div>
          </div>
          <button
            onClick={handleRecalibrate}
            className="bg-slate-900 hover:bg-slate-850 p-2 rounded-xl text-slate-400 hover:text-slate-200 border border-slate-800 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all"
            title="Recalibrate Study Speeds"
          >
            <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin-slow" />
            <span>Recalibrate Flow</span>
          </button>
        </div>
      </div>

      {/* Target Exams List */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-black uppercase text-slate-300 font-mono tracking-wider">
              1. Enrolled Exam Dates & Targets
            </h3>
            <p className="text-[9.5px] text-slate-500">
              Dates configured for board results checklist tracking.
            </p>
          </div>
          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-slate-100 px-2.5 py-1.5 rounded-xl text-[9px] uppercase font-black tracking-wider transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Exam</span>
          </button>
        </div>

        {/* Form: Add Custom Target Exam */}
        {isAddingCustom && (
          <form onSubmit={handleAddExam} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-3 animate-fade-in text-xs">
            <h4 className="font-bold text-brand-yellow text-[11px] uppercase font-mono tracking-wide">
              Configure New Assessment Deadline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block">Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g. Science Board Paper, IGCSE math"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block">Exam Date</label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:border-brand-blue focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block">Target Score / Mark</label>
                <input
                  type="text"
                  placeholder="e.g. Centum (100/100) or Grade 9 (A*)"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:border-brand-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block">Chapters / Syllabus Topics (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Quadratic Equations, Trigonometry"
                  value={customChapters}
                  onChange={(e) => setCustomChapters(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:border-brand-blue focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="bg-slate-800 hover:bg-slate-755 text-slate-350 px-2.5 py-1.5 rounded-lg text-[10px] font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-red/90 text-slate-100 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
              >
                Sync Target
              </button>
            </div>
          </form>
        )}

        {/* Exams List Render */}
        <div className="space-y-2.5">
          {exams.map((ex) => {
            const daysLeft = getDaysRemaining(ex.examDate);
            const isNear = daysLeft <= 7;
            const isPassedValue = daysLeft < 0;

            return (
              <div 
                key={ex.subjectId}
                className="bg-slate-900 border border-slate-800 hover:border-slate-750 p-3 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-200">{ex.subjectName}</span>
                    <span className="text-[8px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded font-bold uppercase font-mono">
                      Target: {ex.targetScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-450">
                    <span className="font-mono">📅 {ex.examDate}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-medium">
                      {ex.syllabusChapters.length} active syllabus focuses
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2.5 border-t border-slate-850 pt-2 sm:pt-0 sm:border-0">
                  <div className="text-left sm:text-right">
                    {isPassedValue ? (
                      <span className="text-[10px] text-slate-600 italic">Exam Passed</span>
                    ) : (
                      <span className={`text-[10.5px] font-mono font-bold block ${isNear ? "text-brand-red animate-pulse" : "text-emerald-400"}`}>
                        {daysLeft} Days Remaining
                      </span>
                    )}
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Board Deadline</span>
                  </div>

                  <button
                    onClick={() => handleDeleteExam(ex.subjectId, ex.subjectName)}
                    className="p-1.5 text-slate-500 hover:text-brand-red transition-colors rounded-lg hover:bg-brand-red/5 cursor-pointer"
                    title="Remove target exam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Daily Study Plan Scheduler Card */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-xs font-black uppercase text-slate-350 font-mono tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span>2. Generated Study Plan Timeline</span>
            </h3>
            <p className="text-[9.5px] text-slate-500">
              Calibrated hourly routing balanced across daily energy curves.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-slate-400 font-bold">Urgency Index:</span>
            <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase font-mono tracking-wide ${
              generatedPlan.urgencyLevel === "critical" ? "bg-brand-red/10 text-brand-red border border-brand-red/20" :
              generatedPlan.urgencyLevel === "intensive" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
              generatedPlan.urgencyLevel === "moderate" ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20" :
              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}>
              {generatedPlan.urgencyLevel}
            </span>
          </div>
        </div>

        {/* Hourly Flow block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {generatedPlan.timeline.map((slot, index) => (
            <div 
              key={index} 
              className="bg-slate-900 border border-slate-850 p-3 rounded-xl space-y-2 relative text-xs flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between border-b border-slate-850 pb-1.5 mb-1.5">
                  <span className="font-extrabold uppercase text-[9.5px] text-brand-yellow font-mono block">
                    {slot.focusType}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono font-bold">
                    {slot.timeSlot}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {slot.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-850 mt-2 flex justify-between items-center bg-slate-950/20 p-1.5 rounded">
                <div className="text-[9px] text-slate-500">
                  <span className="font-bold text-slate-350 block">Suggested duration</span>
                  <span>{slot.hours} focus hrs</span>
                </div>
                <span className="text-[9.5px] text-slate-400 italic font-medium leading-tight max-w-[55%] text-right font-mono">
                  {slot.tip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist / Drills Assessment Hub */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-black uppercase text-slate-300 font-mono tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>3. High-Yield Study Checklist Milestones</span>
          </h3>
          <p className="text-[9.5px] text-slate-500">
            Check off syllabus topics as you cover them during Day/Night study blocks to earn <span className="font-bold text-brand-yellow">+25 XP</span> each!
          </p>
        </div>

        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {generatedPlan.topicDrills.length > 0 ? (
            generatedPlan.topicDrills.map((drill, idx) => {
              // Find matching exam to get its course key/ID
              const mathEx = exams.find(e => e.subjectName === drill.subject);
              const subId = mathEx ? mathEx.subjectId : "custom";
              const isCompleted = completedTopicDrills.includes(`${subId}_${drill.chapterIndex}`);

              return (
                <div 
                  key={idx}
                  onClick={() => handleToggleDrill(subId, drill.chapterIndex, drill.topic)}
                  className={`p-2.5 rounded-xl border transition-all text-xs flex justify-between items-center cursor-pointer select-none ${
                    isCompleted 
                      ? "bg-slate-900/60 border-emerald-500/30 opacity-75 text-slate-450" 
                      : "bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isCompleted 
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-400" 
                        : "border-slate-600 hover:border-slate-500"
                    }`}>
                      {isCompleted && "✓"}
                    </span>
                    <div className="text-left">
                      <span className={`font-bold block ${isCompleted ? "line-through text-slate-500" : "text-slate-100"}`}>
                        {drill.topic}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {drill.subject} • Chapter {drill.chapterIndex} Focus
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    {isCompleted ? (
                      <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md">
                        +25 XP Awarded
                      </span>
                    ) : (
                      <span className="text-[9px] text-indigo-400 font-bold font-mono">
                        Not started
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-[10px] italic">
              No syllabus checklists found. Set up your upcoming exam dates above!
            </div>
          )}
        </div>
      </div>

      {/* Advisory Study Note */}
      <div className="bg-gradient-to-r from-teal-950 to-indigo-950 border border-teal-900/30 p-3.5 rounded-xl text-left space-y-1.5 shadow-md">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-brand-yellow" />
          <span className="font-extrabold uppercase text-[9.5px] text-slate-200 font-mono tracking-wider">
            Plato Advisory
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          Scheduling exams guarantees board confidence. For optimal memorization: execute <strong className="text-brand-yellow">🌅 Morning active recall sessions</strong> under high-contrast Morning Light overlay settings, and utilize relaxed <strong className="text-brand-blue">🌙 Night recollection</strong> with lower screen glow! Needs help? Ask our Mindy AI chatbot anytime!
        </p>
      </div>

    </div>
  );
}
