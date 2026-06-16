import React, { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, BookMarked, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

interface SubjectDashboardData {
  subject: string;
  emoji: string;
  grade: string;
  masteryPct: number;
  progressPct: number;
  attendancePct: number;
  testAverage: number; // e.g. 88
  weakChapter: string;
  nextAction: string;
  trend: "up" | "down" | "stable";
  colorTheme: string; // Tailwind color class
}

interface SubjectPerformanceHubProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onQuickAction: (actionName: string) => void;
}

export default function SubjectPerformanceHub({
  onTriggerNotification,
  onQuickAction
}: SubjectPerformanceHubProps) {
  const [subjectsData, setSubjectsData] = useState<SubjectDashboardData[]>([
    {
      subject: "Physics",
      emoji: "⚡",
      grade: "A",
      masteryPct: 88,
      progressPct: 74,
      attendancePct: 96,
      testAverage: 86,
      weakChapter: "Electric Circuits & Alternating Current",
      nextAction: "Practice Board Variant II Mechanics",
      trend: "up",
      colorTheme: "from-amber-500 to-amber-600"
    },
    {
      subject: "Chemistry",
      emoji: "🧪",
      grade: "B",
      masteryPct: 76,
      progressPct: 62,
      attendancePct: 92,
      testAverage: 79,
      weakChapter: "Organic Cracking & Polymeric Structures",
      nextAction: "Solve Esterification Mechanisms Test",
      trend: "stable",
      colorTheme: "from-indigo-550 to-purple-600"
    },
    {
      subject: "Mathematics",
      emoji: "📐",
      grade: "A*",
      masteryPct: 96,
      progressPct: 82,
      attendancePct: 100,
      testAverage: 94,
      weakChapter: "Continuous Domain Defenite Integration",
      nextAction: "Verify Advanced Limit Theory Sets",
      trend: "up",
      colorTheme: "from-blue-500 to-sky-655"
    },
    {
      subject: "Biology",
      emoji: "🌱",
      grade: "A",
      masteryPct: 89,
      progressPct: 68,
      attendancePct: 94,
      testAverage: 87,
      weakChapter: "Aerobic Respiration Carbon Exchanges",
      nextAction: "Draft Photosynthesis Summary Diagrams",
      trend: "up",
      colorTheme: "from-emerald-500 to-teal-650"
    },
    {
      subject: "English Literature",
      emoji: "📚",
      grade: "A",
      masteryPct: 91,
      progressPct: 80,
      attendancePct: 98,
      testAverage: 90,
      weakChapter: "Critical Analysis of Post-Modernist Prose",
      nextAction: "Outline Theme Essay Sample CIE Paper 1",
      trend: "stable",
      colorTheme: "from-rose-500 to-pink-600"
    }
  ]);

  const triggerDirectPractice = (subData: SubjectDashboardData) => {
    onTriggerNotification(
      `📚 Initializing ${subData.subject} Quiz`,
      `Staging practice questions matching your weak topic: "${subData.weakChapter}". Complete to increase mastery metric!`
    );
    onQuickAction("quiz");
  };

  return (
    <div className="space-y-4 text-left font-sans">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            SYLLABUS PORTFOLIO PROGRESSION
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            📈 Subject Performance Hubs
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-500">5 CURRICULA MODULES ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjectsData.map((s) => (
          <div
            key={s.subject}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-805 hover:border-slate-800 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Corner visual backdrop glow corresponding to custom subject color */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl select-none">{s.emoji}</span>
                <h3 className="text-sm font-black text-white group-hover:text-amber-500 transition-colors">
                  {s.subject}
                </h3>
              </div>

              {/* Big grade tag */}
              <div className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5 shadow-sm font-mono text-[10px] font-black tracking-tight shrink-0">
                <span className="text-slate-500 uppercase">Grade</span>
                <span className="text-amber-500 text-xs font-black">{s.grade}</span>
              </div>
            </div>

            {/* Progression indicators bars stack */}
            <div className="space-y-3 mt-4 border-t border-slate-850/50 pt-4">
              {/* Mastery bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 font-mono">Mastery Ratio</span>
                  <span className="text-white font-mono">{s.masteryPct}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${s.masteryPct}%` }}
                  />
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 font-mono">Syllabus Covered</span>
                  <span className="text-slate-200 font-mono">{s.progressPct}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${s.progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick stats board */}
            <div className="grid grid-cols-2 gap-2 mt-4 py-2.5 px-3 bg-slate-950/60 rounded-xl border border-slate-850/60 leading-tight">
              <div>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider block font-mono">
                  Attendance Ratio
                </span>
                <span className="text-[11px] font-black text-slate-300 font-mono block mt-0.5">
                  {s.attendancePct}%
                </span>
              </div>
              <div>
                <span className="text-[7px] text-slate-505 font-bold uppercase tracking-wider block font-mono">
                  Test average mark
                </span>
                <span className="text-[11px] font-black text-slate-300 font-mono block mt-0.5">
                  {s.testAverage}%
                </span>
              </div>
            </div>

            {/* Actionable items */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.03] space-y-2.5">
              <div className="text-left leading-normal space-y-0.5">
                <span className="text-[8px] font-mono font-bold text-rose-500 uppercase block tracking-wide">
                  ⚠️ Weak Area:
                </span>
                <p className="text-[10px] text-slate-400 font-semibold truncate leading-tight">
                  {s.weakChapter}
                </p>
              </div>

              <button
                onClick={() => triggerDirectPractice(s)}
                className="w-full py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-202 text-[10px] font-bold rounded-xl transition-all flex items-center justify-between px-3 hover:bg-slate-900 group"
              >
                <span className="font-mono text-amber-500 font-black tracking-wide text-[8.5px] uppercase">
                  ⚡ NEXT: {s.nextAction.substring(0, 24)}...
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
