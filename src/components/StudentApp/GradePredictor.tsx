import React, { useState } from "react";
import { Sparkles, TrendingUp, Info } from "lucide-react";
import { CurriculumType } from "../../types";

interface GradePredictorProps {
  curriculum: CurriculumType;
  onTriggerNotification: (title: string, desc: string) => void;
}

interface SubjectPrediction {
  subject: string;
  score: number; // percentage
  gradeIGCSE: string;
  previousScore: number;
}

export default function GradePredictor({
  curriculum,
  onTriggerNotification
}: GradePredictorProps) {
  // Mock performance prediction state
  const [predictions, setPredictions] = useState<SubjectPrediction[]>([
    { subject: "Physics", score: 91, gradeIGCSE: "A", previousScore: 84 },
    { subject: "Chemistry", score: 86, gradeIGCSE: "B", previousScore: 79 },
    { subject: "Mathematics", score: 96, gradeIGCSE: "A*", previousScore: 92 },
    { subject: "Biology", score: 89, gradeIGCSE: "A", previousScore: 83 },
    { subject: "English Literature", score: 92, gradeIGCSE: "A", previousScore: 88 }
  ]);

  const [simulatedSubject, setSimulatedSubject] = useState<string | null>(null);

  const simulateImprovement = (subj: string) => {
    setPredictions(prev =>
      prev.map(p => {
        if (p.subject === subj) {
          const nextScore = Math.min(100, p.score + 2);
          const nextGrade = nextScore >= 92 ? "A*" : nextScore >= 82 ? "A" : "B";
          
          setTimeout(() => {
            onTriggerNotification(
              "🚀 AI Study Simulation Active",
              `Practicing 3 similar NCERT/PYQ questions raises ${subj} projected grade by +2%!`
            );
          }, 100);

          return {
            ...p,
            score: nextScore,
            gradeIGCSE: nextGrade
          };
        }
        return p;
      })
    );
  };

  const isBritish = curriculum === "British";

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            GENATIVE MODEL ALPHA
          </span>
          <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-1.5 mt-0.5">
            🔮 AI Grade Predictor
          </h3>
        </div>
        <span className="text-[10px] bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-slate-400 font-bold">
          {isBritish ? "Cambridge System" : "CBSE Board Track"}
        </span>
      </div>

      <p className="text-[10.5px] text-slate-400 leading-relaxed mb-4 font-medium">
        Calculated hourly from your active recall logs, test scores, and mock inputs. <span className="text-amber-500 font-bold">Tap any subject card</span> to simulate target practice outcomes!
      </p>

      {/* Grid List */}
      <div className="space-y-3">
        {predictions.map((p) => {
          const percentage = p.score;
          const letterGrade = p.gradeIGCSE;
          const displayGrade = isBritish ? letterGrade : `${percentage}%`;
          
          return (
            <div
              key={p.subject}
              onClick={() => simulateImprovement(p.subject)}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-850 hover:border-slate-800 hover:bg-slate-950 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-amber-500 transition-colors truncate">
                    {p.subject}
                  </h4>
                  <span className="text-[8.5px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                    +{p.score - p.previousScore}% growth
                  </span>
                </div>

                {/* Progress bar graph */}
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[8.5px] text-slate-500 font-mono">
                  <span>Previous Target: {p.previousScore}%</span>
                  <span className="text-slate-405">Simulated probability: 94%</span>
                </div>
              </div>

              {/* Big predicted grade box */}
              <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 min-w-[62px] text-center group-hover:scale-105 transition-all shadow-md">
                <span className={`text-base font-black font-sans leading-none ${
                  p.gradeIGCSE === "A*" || percentage >= 95 
                    ? "text-emerald-400" 
                    : "text-amber-500"
                }`}>
                  {displayGrade}
                </span>
                <span className="text-[7.5px] text-slate-500 block font-black uppercase mt-1 leading-none">
                  EXPECTED
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-850 text-[10px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
        <span>Completing "Physics Variant 2" boosts average, triggering 12% probability of moving Physics B to A*.</span>
      </div>
    </div>
  );
}
