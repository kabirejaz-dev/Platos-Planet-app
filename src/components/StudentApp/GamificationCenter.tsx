import React, { useState } from "react";
import { Sparkles, Trophy, Flame, Award, HelpCircle, Star, ArrowUpRight, CheckSquare } from "lucide-react";
import LeaderboardWidget from "./LeaderboardWidget";
import StudyStreakWidget from "./StudyStreakWidget";

interface BadgeItem {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  category: string;
  unlocked: boolean;
}

interface GamificationCenterProps {
  currentStreak: number;
  currentXp: number;
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

export default function GamificationCenter({
  currentStreak,
  currentXp,
  onTriggerNotification,
  onAwardXp
}: GamificationCenterProps) {
  // Badges collection
  const badges: BadgeItem[] = [
    { id: "badge-first", title: "Genesis Planet Medal", desc: "First membership entry", emoji: "🏅", category: "Syllabus Core", unlocked: true },
    { id: "badge-streak", title: "7-Day Streak Shield", desc: "Maintained 7 check-ins", emoji: "🔥", category: "Discipline", unlocked: currentStreak >= 7 },
    { id: "badge-ai", title: "AI Mind Solver Explorer", desc: "Queried Plato AI coach", emoji: "🤖", category: "AI Skills", unlocked: true },
    { id: "badge-quiz", title: "Paper Solver Badge", desc: "Cleared IGCSE past paper mock", emoji: "📝", category: "Academics", unlocked: true },
    { id: "badge-science", title: "Science Sprint Badge", desc: "Finished 3 Physics units", emoji: "⚡", category: "Academics", unlocked: false }
  ];

  // Weekly challenges list
  const [weeklyChallenges, setWeeklyChallenges] = useState([
    { id: "wc-1", title: "Commit 3 focused Pomodoro hours", done: false, xpVal: 100 },
    { id: "wc-2", title: "Resolve 2 academic Chemistry doubts", done: true, xpVal: 80 },
    { id: "wc-3", title: "Achieve >85% in any timed Past Paper Mock", done: false, xpVal: 150 }
  ]);

  const handleClaimChallenge = (id: string, xp: number) => {
    setWeeklyChallenges(prev =>
      prev.map(wc => wc.id === id ? { ...wc, done: true } : wc)
    );
    onAwardXp(xp);
    onTriggerNotification(
      "🏆 Weekly Challenge Cleared!",
      `Terrific focus! Claimed +${xp} XP and contributed to Dubai Region Toppers scoreboard.`
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            DOPAMINE ENGAGEMENT SYSTEM
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            🏆 Gamified Academy Center
          </h2>
          <p className="text-xs text-slate-400">
            Gain study streaks, list earned badges, and climb the local leaderboard to secure highest board medals.
          </p>
        </div>

        {/* StudyStreakWidget embedded directly in horizontal stats row */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-2xl">
          <Flame className="w-5 h-5 text-amber-500 fill-current animate-pulse" />
          <div>
            <span className="text-[7.5px] font-mono text-slate-550 uppercase block font-bold">BURJ STREAK</span>
            <strong className="text-xs text-white font-black font-mono leading-none">{currentStreak} Days Active</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Badges & Weekly Challenges - Col 7 */}
        <div className="lg:col-span-7 space-y-5">
          {/* Unlocked Badges Row */}
          <div className="space-y-3">
            <h4 className="text-[9.5px] font-mono font-black text-slate-500 uppercase tracking-widest block">
              Earned Badges & Credentials ({badges.filter(b => b.unlocked).length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center relative ${
                    b.unlocked
                      ? "bg-slate-950/90 border-amber-500/25 text-amber-400/90"
                      : "bg-slate-950/40 border-slate-900 opacity-40"
                  }`}
                >
                  <span className="text-2xl select-none mb-1">{b.emoji}</span>
                  <h5 className="text-[10.5px] font-black leading-tight text-white">{b.title}</h5>
                  <p className="text-[8.5px] text-slate-500 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Challenges */}
          <div className="space-y-3 pt-3 border-t border-slate-805">
            <h4 className="text-[9.5px] font-mono font-black text-slate-500 uppercase tracking-widest block">
              Global Study Challenges
            </h4>

            <div className="space-y-2">
              {weeklyChallenges.map((wc) => (
                <div
                  key={wc.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-left ${
                    wc.done
                      ? "bg-slate-950/55 border-emerald-500/20 text-emerald-450/80"
                      : "bg-slate-950 border-slate-855"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg select-none">{wc.done ? "⭐" : "🎯"}</span>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${wc.done ? "line-through text-slate-550" : "text-white"}`}>
                        {wc.title}
                      </p>
                      <span className="text-[8.5px] font-mono text-slate-450 font-bold">
                        Challenge payout: +{wc.xpVal} XP points
                      </span>
                    </div>
                  </div>

                  {!wc.done && (
                    <button
                      onClick={() => handleClaimChallenge(wc.id, wc.xpVal)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-[9.5px] font-black uppercase rounded-lg transition-transform active:scale-95 cursor-pointer text-slate-950"
                    >
                      Clear
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Render the two new high-fidelity widgets */}
        <div className="lg:col-span-5 space-y-4">
          <StudyStreakWidget
            currentStreak={currentStreak}
            onTriggerNotification={onTriggerNotification}
          />
          <LeaderboardWidget
            currentXp={currentXp}
            onTriggerNotification={onTriggerNotification}
          />
        </div>
      </div>
    </div>
  );
}
