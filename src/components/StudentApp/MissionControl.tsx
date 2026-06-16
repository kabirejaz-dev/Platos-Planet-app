import React, { useState } from "react";
import { Sparkles, Trophy, Calendar, Zap, AlertTriangle, ArrowUpRight, Play } from "lucide-react";

export interface Mission {
  id: string;
  title: string;
  subject: string;
  rewardXp: number;
  readinessGain: number; // e.g. 2.0
  duration: string;
  difficulty: "Easy" | "Medium" | "High Skill" | "Legendary";
  priority: "High" | "Medium" | "Low";
  status: "available" | "completed" | "progressing";
  topic: string;
}

interface MissionControlProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
  onReadinessIncrease: (amt: number) => void;
}

export default function MissionControl({
  onTriggerNotification,
  onAwardXp,
  onReadinessIncrease
}: MissionControlProps) {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "miss-1",
      title: "🚀 Live Physics Class (Optics & Wave Models)",
      subject: "Physics",
      topic: "Optics and double-slit simulation",
      rewardXp: 150,
      readinessGain: 2.0,
      duration: "45 min",
      difficulty: "High Skill",
      priority: "High",
      status: "available"
    },
    {
      id: "miss-2",
      title: "🧪 Chemistry Organic Alkane Synthesis",
      subject: "Chemistry",
      topic: "Esterification mechanisms & cracking",
      rewardXp: 120,
      readinessGain: 1.5,
      duration: "30 min",
      difficulty: "Medium",
      priority: "High",
      status: "available"
    },
    {
      id: "miss-3",
      title: "📚 Biology Revision Sprint (Respiration cycles)",
      subject: "Biology",
      topic: "Compare Aerobic vs Anaerobic ATP yield",
      rewardXp: 100,
      readinessGain: 1.2,
      duration: "20 min",
      difficulty: "Easy",
      priority: "Medium",
      status: "available"
    },
    {
      id: "miss-4",
      title: "📐 Mathematics Calculus Integration Sprint",
      subject: "Mathematics",
      topic: "Formula recall and continuous domains",
      rewardXp: 180,
      readinessGain: 2.5,
      duration: "40 min",
      difficulty: "Legendary",
      priority: "High",
      status: "available"
    }
  ]);

  const [loadingMissionId, setLoadingMissionId] = useState<string | null>(null);

  const startMission = (id: string, title: string) => {
    setLoadingMissionId(id);
    onTriggerNotification(
      "⚡ Initializing Sandbox Mission",
      `Booting simulator environment for '${title}'. Secure focus immediately.`
    );
    
    setTimeout(() => {
      setMissions(prev =>
        prev.map(m => m.id === id ? { ...m, status: "progressing" } : m)
      );
      setLoadingMissionId(null);
    }, 800);
  };

  const completeMission = (mission: Mission) => {
    setMissions(prev =>
      prev.map(m => m.id === mission.id ? { ...m, status: "completed" } : m)
    );
    onAwardXp(mission.rewardXp);
    onReadinessIncrease(mission.readinessGain);
    
    setTimeout(() => {
      onTriggerNotification(
        "🏆 Mission Accomplished!",
        `Claimed +${mission.rewardXp} XP and pushed Exam Readiness by +${mission.readinessGain}%! Pure academic discipline.`
      );
    }, 100);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            DAILY SYLLABUS DIRECTIVES
          </span>
          <h2 className="text-base font-black text-white tracking-tight flex items-center gap-1.5 mt-0.5">
            🛰️ Today's Mission Control
          </h2>
          <p className="text-xs text-slate-400">
            Accept priority mission blocks containing optimized rewards to rapidly boost your syllabus metrics.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">4 Directives Ready</span>
        </div>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((m) => {
          const isAvailable = m.status === "available";
          const isProgressing = m.status === "progressing";
          const isCompleted = m.status === "completed";

          return (
            <div
              key={m.id}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between gap-4 relative group ${
                isCompleted
                  ? "bg-slate-950/40 border-emerald-500/20 text-emerald-400/80 cursor-default"
                  : "bg-slate-950 hover:bg-slate-950/70 border-slate-850 hover:border-slate-800"
              }`}
            >
              {/* Card headers */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-slate-505 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-full">
                      {m.subject}
                    </span>
                    <span className={`text-[8.5px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${
                      m.difficulty === "Legendary" 
                        ? "bg-amber-500/10 text-amber-500" 
                        : m.difficulty === "High Skill"
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "bg-slate-900 text-slate-400"
                    }`}>
                      {m.difficulty}
                    </span>
                  </div>

                  {m.priority === "High" && !isCompleted && (
                    <span className="text-[8.5px] font-mono text-rose-500 font-black animate-pulse flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 fill-current" /> HIGH PRIO
                    </span>
                  )}
                </div>

                <h3 className={`text-xs font-black tracking-tight leading-snug mt-2 ${
                  isCompleted ? "line-through text-slate-500" : "text-white"
                }`}>
                  {m.title}
                </h3>
                <p className="text-[9.5px] text-slate-450 leading-relaxed font-sans mt-1">
                  Topic: <span className="text-slate-350 italic font-semibold">{m.topic}</span>
                </p>
              </div>

              {/* Sub features stats bar */}
              <div className="grid grid-cols-3 gap-2 py-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-850 leading-none">
                <div>
                  <span className="text-[7.5px] text-slate-500 font-bold block uppercase font-mono">Planets XP</span>
                  <span className="text-[11px] font-black text-amber-500 font-mono block mt-1">+{m.rewardXp} XP</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 font-bold block uppercase font-mono">Readiness Impact</span>
                  <span className="text-[11px] font-black text-emerald-400 font-mono block mt-1">+{m.readinessGain}%</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 font-bold block uppercase font-mono">Duration</span>
                  <span className="text-[11px] font-black text-slate-300 font-mono block mt-1">{m.duration}</span>
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="pt-2 border-t border-white/[0.02] flex items-center justify-end">
                {isCompleted ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                    ✔ Completed
                  </span>
                ) : isProgressing ? (
                  <button
                    onClick={() => completeMission(m)}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[10.5px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer animate-pulse"
                  >
                    🚀 Finish Active Recall Quest
                  </button>
                ) : (
                  <button
                    onClick={() => startMission(m.id, m.title)}
                    disabled={loadingMissionId !== null}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-amber-500 hover:bg-slate-850 text-brand-yellow font-extrabold text-[10.5px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    {loadingMissionId === m.id ? (
                      <span>Booting...</span>
                    ) : (
                      <>
                        <span>Acquire Mission</span>
                        <Play className="w-3 h-3 fill-current" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
