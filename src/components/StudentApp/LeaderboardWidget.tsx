import React from "react";
import { Trophy, Globe2, Sparkles, ShieldAlert, Award } from "lucide-react";

export interface Competitor {
  rank: number;
  name: string;
  campus: string;
  xp: number;
  specialty: string;
  isCurrentUser?: boolean;
}

interface LeaderboardWidgetProps {
  currentXp: number;
  onTriggerNotification?: (title: string, desc: string) => void;
}

export default function LeaderboardWidget({
  currentXp,
  onTriggerNotification
}: LeaderboardWidgetProps) {
  const competitors: Competitor[] = [
    { rank: 1, name: "Fatima Al-Suwaidi", campus: "JVC Campus", xp: 1450, specialty: "CIE Mastermind 👑" },
    { rank: 2, name: "Zayd Al-Mansoori", campus: "Dubai Marina", xp: currentXp, specialty: "Burj Peak Climber 🏅", isCurrentUser: true },
    { rank: 3, name: "Sara Khan", campus: "Dubai Marina", xp: 850, specialty: "Scholar Shield 🎓" },
    { rank: 4, name: "Kabir Ejaz", campus: "Al Furjan", xp: 810, specialty: "Physics Pro ⚡" },
    { rank: 5, name: "Youssef Mahmoud", campus: "Silicon Oasis", xp: 720, specialty: "Formula Wizard 📐" }
  ];

  // Auto-sort based on updated user XP
  const sortedCompetitors = [...competitors].sort((a, b) => b.xp - a.xp);
  
  // Re-assign ranks based on sorted scores
  const rankedCompetitors = sortedCompetitors.map((c, idx) => ({
    ...c,
    rank: idx + 1
  }));

  const handleInteract = (name: string, isCurrentUser?: boolean) => {
    if (isCurrentUser) {
      onTriggerNotification?.("🎨 Your Leaderboard Stature", "You are holding the #2 spot across all Dubai Plato branches. Secure +80 XP to target Fatima!");
    } else {
      onTriggerNotification?.(
        "⚡ Peer Competition Active",
        `Sent a friendly 'Study Buzz' 🐝 notification tag to ${name}. Build a mutual accountability past-paper race!`
      );
    }
  };

  return (
    <div id="leaderboard-widget-root" className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left font-sans">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-850">
        <div className="space-y-0.5">
          <span className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            DUBAI METROPOLITAN
          </span>
          <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-current" /> Peer Leaderboard
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[8.5px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-emerald-400 font-mono font-bold uppercase tracking-wider">
          <Globe2 className="w-3 h-3 animate-spin" /> Live Sync
        </div>
      </div>

      <div className="space-y-2">
        {rankedCompetitors.map((c) => (
          <div
            key={c.name}
            onClick={() => handleInteract(c.name, c.isCurrentUser)}
            className={`p-2.5 rounded-xl flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
              c.isCurrentUser
                ? "bg-amber-500/10 border border-amber-500/30 shadow-md shadow-amber-500/5 hover:bg-amber-500/15"
                : "bg-slate-900/60 border border-slate-855 hover:bg-slate-900/90"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Placement Badges */}
              <span className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center font-mono text-[10px] font-black shrink-0 ${
                c.rank === 1
                  ? "bg-amber-500/20 text-amber-400 text-xs"
                  : c.rank === 2
                  ? "bg-slate-350/20 text-slate-200 text-xs"
                  : "bg-slate-800 text-slate-400"
              }`}>
                {c.rank === 1 ? "🥇" : c.rank === 2 ? "🥈" : `#${c.rank}`}
              </span>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5 className={`text-[11px] font-extrabold truncate ${c.isCurrentUser ? "text-amber-400" : "text-slate-200"}`}>
                    {c.name} {c.isCurrentUser && " (You)"}
                  </h5>
                </div>
                <span className="text-[8.5px] font-mono text-slate-500 block leading-tight mt-0.5">
                  {c.campus} • <span className="text-slate-400">{c.specialty}</span>
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-black font-mono text-white tracking-tight block">
                {c.xp} XP
              </span>
              <span className="text-[7.5px] text-slate-550 block font-bold tracking-widest uppercase">
                points
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
