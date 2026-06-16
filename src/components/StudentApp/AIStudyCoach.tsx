import React, { useState } from "react";
import { Sparkles, ArrowRight, BrainCircuit, RefreshCw, Send, CheckSquare, Sparkle } from "lucide-react";

interface AIStudyCoachProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onLaunchRevisionFlow: (tab: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

export default function AIStudyCoach({
  onTriggerNotification,
  onLaunchRevisionFlow,
  onAwardXp
}: AIStudyCoachProps) {
  const [chatModeActive, setChatModeActive] = useState(false);
  const [pendingCoachQuery, setPendingCoachQuery] = useState("");
  const [isCoachThinking, setIsCoachThinking] = useState(false);
  const [coachResponse, setCoachResponse] = useState<string | null>(null);

  const weakTopics = ["Organic Chemistry Halogenoalkanes", "Physics Wave Diffraction & Refraction", "Mathematics Matrix Determinants"];
  const strongSubjects = ["Mathematics Probability", "English Literature Analysis", "Biology Photosynthesis Schemes"];

  const handleAskCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingCoachQuery.trim()) return;

    setIsCoachThinking(true);
    setTimeout(() => {
      let ans = "";
      const q = pendingCoachQuery.toLowerCase();
      if (q.includes("physics") || q.includes("optics") || q.includes("wave")) {
        ans = "✨ Plato AI Coach: Optics features heavily on CIE Variant 2. Focus on Snell's Law (n = sin i / sin r) and calculating focal lengths. Practice past paper structured queries from 2024 Series.";
      } else if (q.includes("chem") || q.includes("organic")) {
        ans = "✨ Plato AI Coach: For Organic Chemistry, note that esterification requires concentrated Sulfuric Acid (H2SO4) catalyst. Review distillation pathways and functional group structures.";
      } else {
        ans = `✨ Plato AI Coach: Excellent query regarding "${pendingCoachQuery}". I suggest reviewing active recall flashcards on NCERT/Cambridge core questions to consolidate this concept.`;
      }
      setCoachResponse(ans);
      setIsCoachThinking(false);
      onAwardXp(15, "badge-ai");
    }, 900);
  };

  const handleTriggerPlanGen = () => {
    onTriggerNotification(
      "📝 Generating Dynamic Study Blueprint",
      "Analyzing weak topics... Plato AI has compiled a 5-day customized micro-schedule focusing on Wave Diffraction equations."
    );
  };

  const handleTriggerPracticeGen = () => {
    onTriggerNotification(
      "🧠 Questions Synthesis Hub",
      "Generated 5 interactive board competency challenges on Matrix Determinants (+15 XP upon answer)."
    );
  };

  const handleTriggerMockGen = () => {
    onTriggerNotification(
      "📐 Board Simulation Ready",
      "Staged custom, time-bound CBSE mockup focusing on Organic Chemistry. Open 'Mock Center' to initiate."
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left">
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Title */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-amber-500/15 text-amber-500 rounded-2xl border border-amber-500/20">
          <BrainCircuit className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            INDIVIDUAL COGNITIVE COMPANION
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            🧠 Plato AI Study Coach
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Core Diagnosis Stats - Col 7 */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">POTENTIAL SCORE STEP</span>
              <h3 className="text-xl font-bold font-mono text-emerald-400 font-black leading-none pt-0.5">
                +6% expected grade boost
              </h3>
              <p className="text-[10.5px] text-slate-450 leading-normal">
                Completing Organic Chemistry study blocks & solving Optics doubts clears remaining critical mastery gaps this week.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-emerald-400 font-mono text-xs font-black">
              <span>+6%</span>
              <span className="text-[7px]">GAIN</span>
            </div>
          </div>

          {/* Weakness & Strength bento arrays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weak */}
            <div className="bg-slate-955/40 p-4 rounded-2xl border border-rose-950/20 relative">
              <span className="text-[8.5px] font-mono text-rose-500 font-black tracking-widest uppercase block mb-2">
                ❗ Targets requiring focus (Weak area)
              </span>
              <div className="space-y-1.5">
                {weakTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-1.5 text-[10.5px] text-slate-350">
                    <span className="text-rose-500 select-none">•</span>
                    <p className="font-medium leading-tight">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solid */}
            <div className="bg-slate-955/40 p-4 rounded-2xl border border-emerald-950/20 relative">
              <span className="text-[8.5px] font-mono text-emerald-400 font-black tracking-widest uppercase block mb-2">
                ✔ High Mastery Areas (Stable)
              </span>
              <div className="space-y-1.5">
                {strongSubjects.map((topic, index) => (
                  <div key={index} className="flex items-start gap-1.5 text-[10.5px] text-slate-300">
                    <span className="text-emerald-400 select-none">✔</span>
                    <p className="font-medium leading-tight">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel - Col 5 */}
        <div className="lg:col-span-5 p-4 bg-slate-950/80 border border-slate-850/80 rounded-2xl flex flex-col justify-between">
          <h4 className="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider mb-3 block">
            COGNITIVE DIAGNOSIS TOOLS
          </h4>

          {/* Prompting Chat block */}
          <div className="space-y-3">
            {coachResponse ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-[11px] animate-fade-in mb-3">
                <p className="text-slate-300 leading-relaxed italic">{coachResponse}</p>
                <button
                  onClick={() => {
                    setCoachResponse(null);
                    setPendingCoachQuery("");
                  }}
                  className="text-[9.5px] text-amber-500 font-bold hover:underline"
                >
                  Ask Another Question
                </button>
              </div>
            ) : isCoachThinking ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] italic text-slate-500 text-center animate-pulse mb-3">
                Plato AI neural models formulating response...
              </div>
            ) : null}

            <form onSubmit={handleAskCoach} className="relative flex items-center gap-1.5">
              <input
                type="text"
                value={pendingCoachQuery}
                onChange={(e) => setPendingCoachQuery(e.target.value)}
                placeholder="Ask e.g. 'How is organic ester cracked?'"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl text-[11px] text-white placeholder-slate-650 p-2.5 outline-none focus:border-amber-500 font-semibold"
              />
              <button
                type="submit"
                className="p-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="border-t border-slate-850 my-4 pt-3 space-y-2.5">
            <button
              onClick={handleTriggerPlanGen}
              className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-[10.5px] font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Generate Custom Revision Planner</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </button>

            <button
              onClick={handleTriggerPracticeGen}
              className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-[10.5px] font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Synthesize Board Standard Practice Exercises</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </button>

            <button
              onClick={handleTriggerMockGen}
              className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-[10.5px] font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Build Focused Mock Assembly</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
