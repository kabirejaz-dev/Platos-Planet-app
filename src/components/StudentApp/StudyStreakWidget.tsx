import React from "react";
import { Flame, Sparkles, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";

interface StudyStreakWidgetProps {
  currentStreak: number;
  onTriggerNotification?: (title: string, desc: string) => void;
}

interface WeekDay {
  shortName: string;
  fullName: string;
  completed: boolean;
  isToday: boolean;
}

export default function StudyStreakWidget({
  currentStreak,
  onTriggerNotification
}: StudyStreakWidgetProps) {
  // Configured default week representation
  const weeklyTrack: WeekDay[] = [
    { shortName: "M", fullName: "Monday", completed: true, isToday: false },
    { shortName: "T", fullName: "Tuesday", completed: true, isToday: false },
    { shortName: "W", fullName: "Wednesday", completed: true, isToday: true },
    { shortName: "T", fullName: "Thursday", completed: false, isToday: false },
    { shortName: "F", fullName: "Friday", completed: false, isToday: false },
    { shortName: "S", fullName: "Saturday", completed: false, isToday: false },
    { shortName: "S", fullName: "Sunday", completed: false, isToday: false }
  ];

  const triggerMotivationChallenge = (day: WeekDay) => {
    if (day.completed) {
      onTriggerNotification?.(
        "⚡ Past Recall Secured",
        `You completed active questions on ${day.fullName}. Your micro-sessions are logged on our Dubai cloud tracker!`
      );
    } else {
      onTriggerNotification?.(
        "🔥 Tomorrow's Fuel Quest",
        `Set up a calendar event for ${day.fullName} to solve Physics chapter questions. Keep the streak active!`
      );
    }
  };

  return (
    <div id="study-streak-widget-root" className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left font-sans flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header Block */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest block">
              ACADEMIC DISCIPLINE
            </span>
            <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-500 fill-current animate-pulse" /> Burj Streak Tracker
            </h4>
          </div>
          
          <div className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono font-black text-amber-500 uppercase tracking-wider">
            {currentStreak}-Day Active
          </div>
        </div>

        {/* Calendar visual indicators week list */}
        <div className="grid grid-cols-7 gap-1.5 pt-2">
          {weeklyTrack.map((day, idx) => (
            <div
              key={idx}
              onClick={() => triggerMotivationChallenge(day)}
              className={`p-1.5 rounded-xl text-center cursor-pointer transition-all border ${
                day.completed
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : day.isToday
                  ? "bg-slate-900 border-indigo-500/50 text-indigo-400 font-extrabold animate-pulse"
                  : "bg-slate-900/40 border-slate-900 text-slate-500"
              }`}
            >
              <span className="text-[8px] font-mono uppercase font-black block tracking-widest text-slate-500">
                {day.shortName}
              </span>
              <div className="text-xs font-black font-mono mt-1 select-none">
                {day.completed ? "🔥" : idx + 14}
              </div>
              {day.isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mx-auto mt-1 block" />
              )}
            </div>
          ))}
        </div>

        {/* Motivational alert section */}
        <div className="p-3 bg-slate-900/50 border border-slate-850 rounded-xl flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h3 className="text-[10px] font-black text-white uppercase tracking-wider leading-none">
              Perfect Streak Score
            </h3>
            <p className="text-[9.5px] text-slate-450 leading-relaxed font-semibold">
              Sara is in the <strong>Top 5% of Dubai students</strong> this week. Complete tomorrow's Chemistry micro-test to unlock the 7-day shield rewards.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation link to gamification zone */}
      <div className="pt-3 border-t border-slate-900/80 flex items-center justify-between text-[9px] text-amber-500 font-mono font-extrabold uppercase mt-4">
        <span>Dubai Marina Milestone</span>
        <div className="flex items-center gap-0.5 cursor-pointer hover:text-amber-400 transition-colors">
          <span>Challenges</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
