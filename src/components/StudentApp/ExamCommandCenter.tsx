import React, { useState } from "react";
import { Hourglass, Calendar, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import ReadinessRing from "./ReadinessRing";
import GradePredictor from "./GradePredictor";
import { CurriculumType } from "../../types";

interface ExamCommandCenterProps {
  curriculum: CurriculumType;
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function ExamCommandCenter({
  curriculum,
  onTriggerNotification
}: ExamCommandCenterProps) {
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>(curriculum);

  // Simulated Days Countdown based on current local time (2026-06-16)
  const examDates: Record<string, string> = {
    "British": "2027-05-15", // ~330 days left
    "CBSE": "2027-03-01",    // ~258 days left
    "Creative Arts & Test Prep": "2026-11-20" // ~157 days left
  };

  const getDaysLeft = () => {
    const target = new Date(examDates[selectedCurriculum] || "2027-03-01").getTime();
    const now = new Date("2026-06-16").getTime(); // fixed system constant
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 120;
  };

  const daysLeft = getDaysLeft();

  return (
    <div id="exam-command-center-root" className="space-y-6 text-left">
      
      {/* Tab Switcher for Curriculum Reference */}
      <div className="flex items-center justify-between bg-slate-950 border border-slate-900 rounded-3xl p-4">
        <div>
          <h2 className="text-base font-black text-white tracking-widest uppercase font-mono flex items-center gap-2">
            🏆 Exam Command HQ
          </h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5 leading-none">
            Active Curriculum: {selectedCurriculum}
          </p>
        </div>

        <div className="flex gap-1.5 bg-slate-900/85 p-1 border border-slate-800 rounded-2xl">
          {(["British", "CBSE"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => {
                setSelectedCurriculum(curr);
                onTriggerNotification(
                  "🔄 Exam Context Switched",
                  `Switched predicted targets and countdowns to comply with ${curr} curricula guidelines.`
                );
              }}
              className={`px-3 py-1.5 text-[9px] font-black rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                selectedCurriculum === curr
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {curr === "British" ? "IGCSE / A-Level" : "CBSE Series"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Countdown & Overview Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Days Left Card */}
        <div className="p-5 bg-gradient-to-br from-rose-950/20 via-slate-900 to-slate-950 border border-rose-900/35 rounded-3xl text-left flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 blur-2xl rounded-full pointer-events-none" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] uppercase font-mono font-black text-rose-500 tracking-wider flex items-center gap-1">
              <Hourglass className="w-3.5 h-3.5" /> Countdown Timer
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight leading-none pt-1">
              {daysLeft} <span className="text-xs text-slate-500 font-semibold font-mono uppercase">Days</span>
            </h3>
            <p className="text-[10.5px] font-medium text-slate-405 leading-relaxed">
              Target Series: {selectedCurriculum === "British" ? "May/June 2027" : "CBSE Board 2027"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 text-xl font-bold select-none shrink-0">
            ⏰
          </div>
        </div>

        {/* Workload Recommendations */}
        <div className="p-5 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-900/25 rounded-3xl text-left flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] uppercase font-mono font-black text-amber-500 tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Daily Workload
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight leading-none pt-1">
              2.5 Hrs <span className="text-xs text-slate-550 font-semibold font-mono uppercase">/ Day</span>
            </h3>
            <p className="text-[10.5px] font-medium text-slate-405 leading-relaxed">
              Active study pace suggested to secure predicted {selectedCurriculum === "British" ? "A*" : "94%"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 text-xl font-bold select-none shrink-0">
            📚
          </div>
        </div>

        {/* Milestone Stage */}
        <div className="p-5 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 border border-emerald-900/30 rounded-3xl text-left flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] uppercase font-mono font-black text-emerald-400 tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 animate-pulse" /> Revision Stage
            </span>
            <h3 className="text-lg font-black text-white tracking-snug pt-1">
              Stage 1: Syllabus Capture
            </h3>
            <p className="text-[10.5px] font-medium text-slate-405 leading-relaxed">
              Completing core NCERT / Cambridge exercises. Weightage: 40%
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold select-none shrink-0">
            🎯
          </div>
        </div>
      </div>

      {/* Grid containing ReadinessRing & GradePredictor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <ReadinessRing
            currentReadiness={82}
            predictedReadiness={91}
            targetReadiness={95}
            onTriggerNotification={onTriggerNotification}
          />
        </div>
        <div className="lg:col-span-7">
          <GradePredictor
            curriculum={selectedCurriculum}
            onTriggerNotification={onTriggerNotification}
          />
        </div>
      </div>
    </div>
  );
}
