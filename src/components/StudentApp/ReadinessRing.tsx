import React from "react";
import { Sparkles, TrendingUp, Target } from "lucide-react";

interface ReadinessRingProps {
  currentReadiness: number; // e.g. 82
  predictedReadiness: number; // e.g. 91
  targetReadiness: number; // e.g. 95
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function ReadinessRing({
  currentReadiness,
  predictedReadiness,
  targetReadiness,
  onTriggerNotification
}: ReadinessRingProps) {
  // SVG Circular progress math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetCurrent = circumference - (currentReadiness / 100) * circumference;
  const strokeDashoffsetPredicted = circumference - (predictedReadiness / 100) * circumference;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-xl">
      {/* Absolute faint background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />

      <h4 className="text-[10px] font-mono font-black text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-1.5 self-start">
        <Target className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Exam Readiness Meter
      </h4>

      {/* Circle Ring Container */}
      <div className="relative w-44 h-44 flex items-center justify-center select-none">
        <svg className="w-full h-full transform -rotate-90">
          {/* Base outer circle */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Predicted outer circle (underneath or dashed) */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-amber-500/20"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetPredicted}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* Current readiness outer circle */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-gradient stroke-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetCurrent}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center space-y-0.5">
          <span className="text-4xl font-black font-sans text-white tracking-tight">
            {currentReadiness}%
          </span>
          <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
            EXAM READY
          </span>
          <div className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-800 mt-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[8.5px] font-mono text-emerald-400 font-bold">
              → {predictedReadiness}% Pred
            </span>
          </div>
        </div>
      </div>

      {/* Target and predicted details cards */}
      <div className="w-full grid grid-cols-2 gap-3 mt-5 border-t border-slate-800/60 pt-4">
        <div 
          className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-850 text-left cursor-pointer hover:border-slate-850 relative"
          onClick={() => {
            onTriggerNotification(
              "📈 AI Grade Improvement Forecast",
              `Completing scheduled study-cards and Organic chemistry revision triggers predicted trajectory to ${predictedReadiness}% before final UAE Series.`
            );
          }}
        >
          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase block">Expected Range</span>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-sm font-black text-white">{currentReadiness}% → {predictedReadiness}%</span>
          </div>
          <span className="text-[8px] text-slate-450 block mt-0.5 font-bold">Expected by Exam Day</span>
        </div>

        <div 
          className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-850 text-left cursor-pointer hover:border-slate-800"
          onClick={() => {
            onTriggerNotification(
              "🎯 Target Lock Status",
              `Your absolute syllabus milestone objective is set to ${targetReadiness}%. Plato is dynamically generating assignments to clear this gap!`
            );
          }}
        >
          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase block">Plato Target</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-sm font-black text-amber-500">{targetReadiness}%</span>
          </div>
          <span className="text-[8px] text-slate-450 block mt-0.5 font-bold">Personal Scholar Goal</span>
        </div>
      </div>
    </div>
  );
}
