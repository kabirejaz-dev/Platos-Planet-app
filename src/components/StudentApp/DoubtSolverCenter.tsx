import React, { useState } from "react";
import { Sparkles, Send, FileText, UploadCloud, Camera, CheckCircle, Clock, Trash2, ArrowUpRight } from "lucide-react";

interface Doubt {
  id: string;
  question: string;
  status: "solved_ai" | "solved_teacher" | "pending";
  category: string;
  timestamp: string;
  solutionStepByStep?: string[];
  similarConcepts?: string;
}

interface DoubtSolverCenterProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

export default function DoubtSolverCenter({
  onTriggerNotification,
  onAwardXp
}: DoubtSolverCenterProps) {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  const [doubtsList, setDoubtsList] = useState<Doubt[]>([
    {
      id: "doubt-1",
      question: "Prove why Concentrated Sodium Chloride electrolysis yields Chlorine gas at the anode instead of Oxygen.",
      status: "solved_ai",
      category: "Chemistry Electrolysis",
      timestamp: "Today, 09:12 AM",
      solutionStepByStep: [
        "Recall standard electrode potentials: OH- discharge potential is lower than Cl-.",
        "However, because the Sodium Chloride solution is concentrated, the concentration effect overrides standard potentials.",
        "Halide ions (Cl-) are present in a significantly higher ratio.",
        "Therefore, Chloride (Cl-) is preferentially oxidized at the positive anode, producing diatomic Chlorine (Cl2) gas."
      ],
      similarConcepts: "Refers to the competitive discharge Rules in electrolysis of aqueous solutions."
    },
    {
      id: "doubt-2",
      question: "Solve the derivative of f(x) = ln(sec x + tan x) with respect to x.",
      status: "solved_teacher",
      category: "Mathematics Calculus",
      timestamp: "Yesterday, 14:35",
      solutionStepByStep: [
        "Apply the chain rule: d/dx [ln(u)] = 1/u * du/dx, where u = sec(x) + tan(x).",
        "Calculate du/dx: d/dx[sec x] = sec x tan x, and d/dx[tan x] = sec^2 x.",
        "Substitute back into chain rule: f'(x) = [sec x tan x + sec^2 x] / [sec x + tan x].",
        "Factor out sec(x) from the numerator: f'(x) = sec x * [tan x + sec x] / [sec x + tan x].",
        "Simplify by canceling terms: f'(x) = sec x."
      ],
      similarConcepts: "This is a key standard integral derivative frequently used in integration."
    },
    {
      id: "doubt-3",
      question: "What is the primary role of the light-dependent stage in leaf cells of C3 crops?",
      status: "pending",
      category: "Biology Bioenergetics",
      timestamp: "Yesterday, 18:40"
    }
  ]);

  const [activeDoubtSolution, setActiveDoubtSolution] = useState<Doubt | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setSelectedFile(fileName);
      onTriggerNotification(
        "📁 File Uploaded successfully",
        `Buffered "${fileName}" into Plato's Vision AI parsing buffer.`
      );
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    setIsSolving(true);
    const userQuery = inputText.trim() || `Interpreted file payload from ${selectedFile}`;

    setTimeout(() => {
      const newDoubt: Doubt = {
        id: "doubt_" + Date.now(),
        question: userQuery,
        status: "solved_ai",
        category: "AI Autonomic Solver",
        timestamp: "Just Now",
        solutionStepByStep: [
          "Plato AI has parsed the question and isolated core syllabus keywords.",
          "Applied fundamental academic definitions from registered course materials.",
          "Final mathematical / conceptual deduction concluded successfully.",
          "Check the recommended syllabus section in the Resource Hub for deep recall training."
        ],
        similarConcepts: "Concept matching index ID Cl-7 relative to target board exams."
      };

      setDoubtsList(prev => [newDoubt, ...prev]);
      setActiveDoubtSolution(newDoubt);
      setIsSolving(false);
      setInputText("");
      setSelectedFile(null);
      onAwardXp(20, "badge-quiz");
      
      onTriggerNotification(
        "✨ AI Resolution Formulated",
        "Your uploaded doubt has been solved step-by-step by Plato's GenAI module! +20 XP awarded."
      );
    }, 1200);
  };

  const deleteDoubt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDoubtsList(prev => prev.filter(d => d.id !== id));
    if (activeDoubtSolution?.id === id) setActiveDoubtSolution(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            REAL-TIME INTELLECT INTERACTION
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            💭 World-Class AI Doubt Solver
          </h2>
          <p className="text-xs text-slate-400">
            Submit any chemistry diagram, math question, or PDF. Claim certified step-by-step proofs within seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Submission Console */}
        <div className="lg:col-span-6 space-y-4">
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Type Your Problem Query:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your question, or upload resources below... (e.g., 'A car accelerates from rest at 3 m/s²...')"
                className="w-full bg-slate-950 border border-slate-850 rounded-2xl text-xs text-white p-3.5 focus:outline-none focus:border-indigo-500 placeholder-slate-650 min-h-[100px] leading-relaxed font-bold"
              />
            </div>

            {/* Quick selectors row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Photo Input Selector */}
              <label className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-850 hover:border-indigo-500 hover:bg-slate-955 transition-all text-center cursor-pointer group">
                <Camera className="w-5 h-5 text-slate-450 group-hover:text-indigo-400 mb-1.5" />
                <span className="text-[10px] font-bold text-slate-350">Upload / Take Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* PDF Selector */}
              <label className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-850 hover:border-indigo-500 hover:bg-slate-955 transition-all text-center cursor-pointer group">
                <FileText className="w-5 h-5 text-slate-450 group-hover:text-indigo-400 mb-1.5" />
                <span className="text-[10px] font-bold text-slate-350">Integrate PDF File</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Display chosen file */}
            {selectedFile && (
              <div className="p-2 bg-indigo-550/10 border border-indigo-500/20 text-indigo-400 text-[10px] rounded-xl flex items-center justify-between">
                <span>📎 Buffered for Vision: {selectedFile}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-xs font-bold hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSolving || (!inputText.trim() && !selectedFile)}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-slate-950 text-xs font-black uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-550/15 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 fill-current animate-pulse" />
              <span>{isSolving ? "Constructing Solutions..." : "Apply AI Doubt Solver"}</span>
            </button>
          </form>

          {/* Quick List - Doubts History */}
          <div className="space-y-2 pt-4 border-t border-slate-805">
            <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Doubt Board Archives ({doubtsList.length})
            </h4>

            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {doubtsList.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setActiveDoubtSolution(d)}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 hover:border-indigo-500/40 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] bg-slate-900 px-2 py-0.2 rounded font-mono font-bold text-slate-450 border border-slate-850">
                        {d.category}
                      </span>
                      {d.status === "solved_ai" ? (
                        <span className="text-[8.5px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">
                          ✔ AI Solved
                        </span>
                      ) : d.status === "solved_teacher" ? (
                        <span className="text-[8.5px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-1 rounded">
                          🎓 Teacher Certified
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono text-amber-500 font-bold bg-amber-500/10 px-1 rounded animate-pulse">
                          ⏳ Under Review
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-slate-250 truncate font-semibold">
                      {d.question}
                    </p>
                  </div>

                  <button
                    onClick={(e) => deleteDoubt(d.id, e)}
                    className="p-1 rounded-lg text-slate-600 hover:text-rose-500 hover:bg-slate-900 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: AI proof reader board */}
        <div className="lg:col-span-6 p-4 bg-slate-950/90 border border-slate-850 rounded-2xl min-h-[300px] flex flex-col justify-between">
          {activeDoubtSolution ? (
            <div className="space-y-4 animate-fade-in text-[11px] leading-relaxed">
              <div className="border-b border-slate-805 pb-3">
                <span className="text-[8px] font-mono text-amber-500 font-bold uppercase block">ACTIVE FILE SELECTION</span>
                <p className="text-xs font-bold text-white mt-1 leading-snug">{activeDoubtSolution.question}</p>
              </div>

              {activeDoubtSolution.solutionStepByStep ? (
                <div className="space-y-3">
                  <h4 className="text-[9.5px] font-mono text-slate-505 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Step-By-Step AI Verification Proofs
                  </h4>

                  <div className="space-y-2">
                    {activeDoubtSolution.solutionStepByStep.map((step, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-[10px] font-black shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-slate-300 font-semibold">{step}</p>
                      </div>
                    ))}
                  </div>

                  {activeDoubtSolution.similarConcepts && (
                    <div className="mt-4 p-2.5 bg-slate-900/60 rounded-xl border border-slate-850 text-slate-400 text-[10px]">
                      <strong>💡 Conceptual Note:</strong> {activeDoubtSolution.similarConcepts}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-2">
                  <Clock className="w-8 h-8 text-amber-500 animate-spin" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-350">Doubt is currently in teacher queue</h4>
                    <p className="text-[10px] text-slate-450">Certified Plato supervisors will upload high-fidelity proof sheets shortly.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-3">
              <Sparkles className="w-10 h-10 text-slate-650 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-slate-350">No Doubt Active</h4>
                <p className="text-[10.5.px] text-slate-450 max-w-xs mx-auto mt-1 leading-relaxed">
                  Select any previous solved question card on the left panel or type an equation to launch step-by-step resolution trees!
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/[0.02] flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Server Response Time: ~450ms</span>
            <span>Plato Model Acc: 99.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
