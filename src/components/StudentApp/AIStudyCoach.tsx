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
    <div className="relative overflow-hidden rounded-3xl p-6 shadow-2xl text-left bg-gradient-to-br from-electric-blue via-neo-purple to-neon-cyan border border-white/15 group neon-shadow-purple">
      {/* Background abstract overlay of dots and code snippet elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />

      {/* Headings / Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/15 text-white rounded-2xl border border-white/20 backdrop-blur-md shadow-inner animate-pulse">
            <BrainCircuit className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-black text-neon-cyan uppercase tracking-[0.2em] block">
              COGATIVE PLATINUM STUDY COMPANION
            </span>
            <h2 className="text-xl font-display font-black text-white tracking-tight mt-0.5">
              Ask Plato AI
            </h2>
          </div>
        </div>
        <div className="self-start sm:self-center px-3 py-1 bg-black/45 hover:bg-black/60 border border-white/10 text-neon-mint text-[9px] font-extrabold uppercase font-mono tracking-widest rounded-full transition-all">
          ⚡ 2026 AI ACTIVE ENGINE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        {/* Core Diagnosis Stats - Col 7 */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-2xl flex items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-neon-cyan uppercase tracking-wider block">EXPECTED PREDICTIVE JUMP</span>
              <h3 className="text-lg font-display font-black text-white leading-none pt-0.5">
                +6% expected grade boost
              </h3>
              <p className="text-[11.5px] text-white/80 leading-relaxed font-medium">
                Completing Organic Chemistry study blocks & solving wave diffraction doubts clears remaining critical mastery gaps this week.
              </p>
            </div>
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-tr from-neon-cyan to-neon-mint border border-white/20 flex flex-col items-center justify-center text-slate-900 font-mono text-xs font-black shadow-lg">
              <span>+6%</span>
              <span className="text-[7px] tracking-wider leading-none">GAIN</span>
            </div>
          </div>

          {/* Weakness & Strength bento arrays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weak */}
            <div className="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-hot-coral/20 relative">
              <span className="text-[8.5px] font-mono text-hot-coral font-black tracking-wider uppercase block mb-2">
                ❗ Targets requiring focus (Weak area)
              </span>
              <div className="space-y-1.5">
                {weakTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-1.5 text-[11px] text-white/90">
                    <span className="text-hot-coral select-none font-bold font-mono">•</span>
                    <p className="font-semibold leading-tight">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solid */}
            <div className="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-neon-mint/20 relative">
              <span className="text-[8.5px] font-mono text-neon-mint font-black tracking-wider uppercase block mb-2">
                ✔ High Mastery Areas (Stable)
              </span>
              <div className="space-y-1.5">
                {strongSubjects.map((topic, index) => (
                  <div key={index} className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="text-neon-mint select-none font-bold">✔</span>
                    <p className="font-semibold leading-tight">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel - Col 5 */}
        <div className="lg:col-span-5 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-[9.5px] font-mono text-neon-cyan uppercase tracking-widest mb-3 block font-bold">
              ASK PLATO ANYTHING
            </h4>

            {/* Prompting Chat block */}
            <div className="space-y-3">
              {coachResponse ? (
                <div className="p-3.5 bg-black/50 border border-white/10 rounded-2xl space-y-2 text-[11.5px] animate-fade-in mb-3">
                  <p className="text-white/90 leading-relaxed font-medium italic">{coachResponse}</p>
                  <button
                    onClick={() => {
                      setCoachResponse(null);
                      setPendingCoachQuery("");
                    }}
                    className="text-[10px] text-neon-cyan font-black hover:underline uppercase tracking-wide block"
                  >
                    Ask Another Question →
                  </button>
                </div>
              ) : isCoachThinking ? (
                <div className="p-3.5 bg-black/50 border border-white/10 rounded-2xl text-[11.5px] italic text-neon-cyan text-center animate-pulse mb-3">
                  Plato AI neural models formulating response...
                </div>
              ) : null}

              <form onSubmit={handleAskCoach} className="relative flex items-center gap-1.5">
                <input
                  type="text"
                  value={pendingCoachQuery}
                  onChange={(e) => setPendingCoachQuery(e.target.value)}
                  placeholder="e.g. 'Explain waveguide diffraction model...'"
                  className="w-full bg-black/50 border border-white/10 rounded-xl text-[11px] text-white placeholder-slate-400 p-2.5 outline-none focus:border-neon-cyan font-semibold"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-950 rounded-xl transition shadow-lg shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 mt-4 pt-3.5 space-y-2">
            <button
              onClick={handleTriggerPlanGen}
              className="w-full py-2 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-white/20 text-white text-[10.5px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Custom Revision Planner</span>
              <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
            </button>

            <button
              onClick={handleTriggerPracticeGen}
              className="w-full py-2 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-white/20 text-white text-[10.5px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Practice Exercises</span>
              <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
            </button>

            <button
              onClick={handleTriggerMockGen}
              className="w-full py-2 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-white/20 text-white text-[10.5px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-between px-3"
            >
              <span>Focused Mock Assembly</span>
              <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
