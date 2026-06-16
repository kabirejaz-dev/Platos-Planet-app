import React, { useState } from "react";
import { Sparkles, MessageCircle, HelpCircle, BookOpen, Layers, X, Plus, ShieldCheck } from "lucide-react";

interface QuickActionMenuProps {
  onQuickAction: (actionType: string) => void;
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function QuickActionMenu({
  onQuickAction,
  onTriggerNotification
}: QuickActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const performAction = (actionType: string, actionLabel: string, desc: string) => {
    onTriggerNotification(actionLabel, desc);
    onQuickAction(actionType);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Expanded Menu Actions */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-slate-900 border border-slate-800 rounded-3xl p-4 w-60 shadow-2.5xl space-y-2 animate-fade-in-up">
          <div className="pb-2 border-b border-slate-805 mb-2 flex items-center justify-between">
            <span className="text-[9.5px] font-mono font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Plato Quick Launcher
            </span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <button
            onClick={() => performAction("doubt", "💬 Vision Doubt Solver Initialized", "Snapshot or type your question for step-by-step proofs.")}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-left text-xs font-bold text-slate-102 hover:text-white transition flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Upload academic doubt</span>
          </button>

          <button
            onClick={() => performAction("assistant", "🤖 AI Study Coach Staged", "Prompt your personal tutor Mindy on specific topics.")}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-left text-xs font-bold text-slate-102 hover:text-white transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
            <span>Ask Plato AI Coach</span>
          </button>

          <button
            onClick={() => performAction("quiz", "📝 Mini Board Quiz Staged", "Launching focus-oriented continuous mastery check.")}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-left text-xs font-bold text-slate-102 hover:text-white transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Practice Board Quiz</span>
          </button>

          <button
            onClick={() => performAction("revision", "📚 Resource Vault Staged", "Opening GCC Past Papers & Mark Schemes catalogues.")}
            className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 text-left text-xs font-bold text-slate-102 hover:text-white transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-rose-400" />
            <span>View Board revision sheets</span>
          </button>
        </div>
      )}

      {/* Main Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/10 cursor-pointer transform hover:scale-105 active:scale-95 transition-all outline-none border border-amber-400 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Plus className="w-6 h-6 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
}
