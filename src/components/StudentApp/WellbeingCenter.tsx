import React, { useState } from "react";
import { Sparkles, Heart, Activity, Coffee, Brain, Info, Compass } from "lucide-react";

interface WellbeingCenterProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number) => void;
}

export default function WellbeingCenter({
  onTriggerNotification,
  onAwardXp
}: WellbeingCenterProps) {
  // Wellbeing metrics state
  const [studyLoad, setStudyLoad] = useState("Optimal Balanced"); // e.g. Optimal Balanced
  const [burnoutRisk, setBurnoutRisk] = useState("Low Risk"); // Low
  const [focusScore, setFocusScore] = useState(88); // 88%
  const [motivationScore, setMotivationScore] = useState(94); // 94%

  const [activeBreakState, setActiveBreakState] = useState(false);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(1200); // 20 min break

  const triggerBreaks = () => {
    setActiveBreakState(true);
    onTriggerNotification(
      "🌸 Rest State Initialized",
      "Staging a 20-minute cognitive decompression cycle. Mute focus reminders and breathe deeply."
    );
    // simulated rest addition
    onAwardXp(15);
  };

  return (
    <div id="wellbeing-center-container" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-teal-400 uppercase tracking-widest block">
            COGNITIVE LOAD & HEALTH SHIELD
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5 flex items-center gap-2">
            🌱 Mind & Wellbeing Center
          </h2>
          <p className="text-xs text-slate-400">
            A premium cognitive shield preventing fatigue. Track study stress, evaluate burnout risk parameters, and take active recess.
          </p>
        </div>

        <div className="bg-slate-950 border border-teal-500/10 px-3 py-1 rounded-2xl flex items-center gap-1.5 text-[10.5px] font-mono text-teal-400 font-bold shrink-0">
          <Activity className="w-4 h-4 text-teal-550" />
          <span>Cognitive Zone Balanced</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Statistics Panels - Col 7 */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Study Load */}
          <div className="p-4 bg-slate-950/90 border border-slate-855 rounded-2xl space-y-1 relative">
            <span className="text-[7.5px] font-mono text-slate-500 font-bold uppercase block">Weekly workload</span>
            <h4 className="text-xs font-black text-white uppercase truncate">Study Load</h4>
            <span className="text-sm font-black font-mono text-teal-400 mt-2 block">{studyLoad}</span>
          </div>

          {/* Burnout Risk */}
          <div className="p-4 bg-slate-950/90 border border-slate-855 rounded-2xl space-y-1 relative">
            <span className="text-[7.5px] font-mono text-slate-500 font-bold uppercase block">Fatigue indicators</span>
            <h4 className="text-xs font-black text-white uppercase truncate">Burnout Risk</h4>
            <span className="text-sm font-black font-mono text-emerald-400 mt-2 block">{burnoutRisk}</span>
          </div>

          {/* Focus Ratio */}
          <div className="p-4 bg-slate-925 bg-slate-950 border border-slate-855 rounded-2xl space-y-1 relative">
            <span className="text-[7.5px] font-mono text-slate-550 font-bold uppercase block">Hourly accuracy</span>
            <h4 className="text-xs font-black text-white uppercase truncate">Focus Score</h4>
            <span className="text-sm font-black font-mono text-amber-500 mt-2 block">{focusScore} / 100</span>
          </div>

          {/* Motivation Rate */}
          <div className="p-4 bg-slate-925 bg-slate-950 border border-slate-855 rounded-2xl space-y-1 relative">
            <span className="text-[7.5px] font-mono text-slate-550 font-bold uppercase block">Confidence index</span>
            <h4 className="text-xs font-black text-white uppercase truncate">Motivation</h4>
            <span className="text-sm font-black font-mono text-indigo-400 mt-2 block">{motivationScore}% Score</span>
          </div>

        </div>

        {/* Recess suggestions center - Col 5 */}
        <div className="lg:col-span-5 p-4 bg-slate-950/90 border border-slate-855 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex gap-2.5 items-start">
              <div className="p-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl shrink-0 mt-0.5">
                <Coffee className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <span className="text-[8.5px] font-mono text-teal-400 font-bold uppercase tracking-widest block">PLATO AI MINDFULNESS</span>
                <p className="text-[11px] font-black text-slate-202 italic mt-1 leading-relaxed">
                  "Take a 20-minute cognitive recess break before launching Physics Unit II circuits exercises."
                </p>
              </div>
            </div>

            {/* Break option actions */}
            <div className="pt-2">
              {activeBreakState ? (
                <div className="p-3 bg-teal-555/10 bg-teal-950/20 border border-teal-500/20 rounded-xl flex items-center justify-between text-[11px] text-teal-400 animate-pulse">
                  <span>🍃 Recess Active. Decompresing: 20:00</span>
                  <button
                    onClick={() => setActiveBreakState(false)}
                    className="text-[10px] font-mono font-black uppercase text-teal-300 hover:underline"
                  >
                    Complete Break
                  </button>
                </div>
              ) : (
                <button
                  onClick={triggerBreaks}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-teal-500 text-teal-400 text-xs font-black uppercase rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5 fill-current" />
                  <span>Start 20-Min Brain Recess (+15 XP)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
