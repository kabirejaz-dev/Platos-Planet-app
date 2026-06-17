import React, { useState, useEffect } from "react";
import { 
  Cpu, Users, Shield, Radio, Activity, RefreshCw, 
  MessageSquare, Play, HelpCircle, ToggleLeft, ToggleRight, Wifi 
} from "lucide-react";
import { getStoredPlatosPlanetConfig } from "../../platosPlanetConfig";

interface LiveSession {
  id: string;
  className: string;
  branch: string;
  teacher: string;
  studentsCount: number;
  utilization: string;
}

export default function OperationsCenter({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [liveStreamOn, setLiveStreamOn] = useState(true);
  const [ticker, setTicker] = useState(0);
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;

  // Live ticking simulation
  useEffect(() => {
    if (!liveStreamOn) return;
    const interval = setInterval(() => {
      setTicker(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [liveStreamOn]);

  const liveClasses: LiveSession[] = [
    { id: "L-110", className: "IGCSE Mathematics Mastery (Delta Block)", branch: branches[0] || "Main Campus", teacher: "Teacher 12", studentsCount: 16, utilization: "94%" },
    { id: "L-112", className: "A-Level Electromagnetism Session 4", branch: branches[1] || "Branch 1", teacher: "Teacher 1", studentsCount: 12, utilization: "100%" },
    { id: "L-114", className: "CBSE Biology (Mock Review Alpha)", branch: branches[2] || "Branch 2", teacher: "Teacher 3", studentsCount: 22, utilization: "91%" },
    { id: "L-116", className: "Discrete Algorithms Mastery 10A", branch: "Online Campus", teacher: "Teacher 2", studentsCount: 14, utilization: "85%" }
  ];

  const metrics = [
    { label: "Classes Running Now", value: 114 + (ticker % 3), sub: "Peak afternoon load", target: "120 max limit" },
    { label: "Faculty Checked-In", value: 98 + (ticker % 2), sub: "99.1% checkcompliance", target: "100 logged faculty" },
    { label: "Attendance Today", value: "96.4%", sub: "9,640 verified students", target: "Goal: >95%" },
    { label: "Students Logged-In", value: 1950 + (ticker * 4) % 15, sub: "Direct online session, UAE", target: "Avg peak: 2,100" },
    { label: "AI Tutor Sessions Daily", value: 420 + (ticker * 2) % 11, sub: "Generative voice sandbox", target: "Pacing +14% YoY" },
    { label: "Support Tickets pending", value: 8 - (ticker % 2), sub: "SLA response rate: 12m", target: "All cleared" }
  ];

  const handleToggleFeed = () => {
    setLiveStreamOn(!liveStreamOn);
    onTriggerNotification(
      liveStreamOn ? "⏸️ Operations Feed Paused" : "▶️ Operations Feed Active",
      liveStreamOn ? "Paused real-time socket updates for GCC nodes." : "Reconnected telemetry sockets."
    );
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-6" id="operations-centre">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Radio className="w-5 h-5 text-amber-500 animate-pulse animate-ping" />
            Global Operations Centre (Live Control Core)
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Real-time telemetry and network ping metrics monitoring on-ground educational programs</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleFeed}
            className="px-3 py-1.5 bg-slate-950 border border-slate-850 text-slate-350 hover:text-white rounded-xl text-[10.5px] font-black font-mono tracking-wide transition-all cursor-pointer flex items-center gap-2"
          >
            {liveStreamOn ? (
              <>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>Socket Connected</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-slate-500 rounded-full" />
                <span>Socket Suspended</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid: 6 Operational stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <div 
            key={m.label}
            className="p-4 bg-slate-950/45 border border-slate-850 rounded-2xl space-y-1.5 text-left"
          >
            <p className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase leading-relaxed font-sans">
              {m.label}
            </p>
            <p className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">
              {m.value}
            </p>
            <p className="text-[9.5px] text-slate-505 font-medium leading-none">
              {m.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Live running class list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10.5px] font-bold text-amber-500 tracking-wider uppercase font-mono flex items-center gap-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            Active Classrooms & Telemetry Stream (Saudi/UAE Nodes)
          </h4>
          <span className="text-[9.5px] font-mono text-slate-500">Auto-refreshing every 4s</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.map((cl) => (
            <div 
              key={cl.id}
              className="p-4 bg-slate-955/65 border border-slate-850 hover:border-slate-800 rounded-2xl flex items-center justify-between gap-4 text-left relative overflow-hidden"
            >
              {/* Green connection tracer indicator */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500 animate-pulse" />

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.2 rounded text-[8.5px] font-mono font-bold">
                    {cl.id}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono font-medium">{cl.branch}</span>
                </div>
                <h5 className="text-[11.5px] font-extrabold text-white">{cl.className}</h5>
                <p className="text-[9.5px] text-slate-400 font-medium">Instructor: {cl.teacher}</p>
              </div>

              <div className="text-right font-mono shrink-0">
                <span className="text-emerald-400 text-xs font-black">{cl.studentsCount} Students</span>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Pace: {cl.utilization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
