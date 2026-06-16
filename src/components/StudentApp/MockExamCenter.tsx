import React, { useState } from "react";
import { Sparkles, Trophy, Calendar, CheckSquare, BarChart, X, ArrowUpRight, Award, ShieldAlert } from "lucide-react";

interface MockExam {
  id: string;
  name: string;
  subject: string;
  curriculum: "IGCSE" | "CBSE";
  testDate: string;
  scorePct?: number;
  completed: boolean;
  duration: string;
  leaderPosition?: number;
  weakAreaIdentified?: string;
  revisionPlanRecommended?: string;
}

interface MockExamCenterProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

export default function MockExamCenter({
  onTriggerNotification,
  onAwardXp
}: MockExamCenterProps) {
  const [mocks, setMocks] = useState<MockExam[]>([
    {
      id: "mock-1",
      name: "Mid-Term Comprehensive Mock Exam II",
      subject: "Physics Thermodynamics & Optics",
      curriculum: "IGCSE",
      testDate: "Yesterday, 14:00",
      scorePct: 86,
      completed: true,
      duration: "120 min",
      leaderPosition: 4,
      weakAreaIdentified: "Wave diffraction equations and calculating Snells Index for multiple layers",
      revisionPlanRecommended: "Solve 2 Variant II past papers focusing on year 2024 structured answers"
    },
    {
      id: "mock-2",
      name: "Advanced Algebra & Calculus Integration test",
      subject: "Mathematics",
      curriculum: "CBSE",
      testDate: "2026-06-11",
      scorePct: 94,
      completed: true,
      duration: "180 min",
      leaderPosition: 2,
      weakAreaIdentified: "Continuity of boundary conditions in trigonometric equations",
      revisionPlanRecommended: "Practice NCERT Exemplar Chapter 8 Chapter Review"
    },
    {
      id: "mock-3",
      name: "Pre-Board Organic Chemistry Cracking Assessment",
      subject: "Chemistry",
      curriculum: "IGCSE",
      testDate: "Upcoming: June 20, 16:00",
      completed: false,
      duration: "90 min"
    },
    {
      id: "mock-4",
      name: "Plant Respiration and bioenergetics challenge",
      subject: "Biology",
      curriculum: "CBSE",
      testDate: "Upcoming: June 24, 15:30",
      completed: false,
      duration: "75 min"
    }
  ]);

  const [activeReportMock, setActiveReportMock] = useState<MockExam | null>(null);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const simulateMockPractice = (mockName: string) => {
    setIsRunningSim(true);
    onTriggerNotification(
      "📝 Building Board Simulation Sandbox",
      `Staging test env matching ${mockName}. Maintain quiet surroundings.`
    );
    
    setTimeout(() => {
      setIsRunningSim(false);
      onAwardXp(50);
      onTriggerNotification(
        "🏆 Mock Simulation Completed!",
        "Completed practice modules successfully! Grade records saved to Toppers Board. +50 XP granted."
      );
    }, 1500);
  };

  const showReportModal = (mock: MockExam) => {
    setActiveReportMock(mock);
  };

  return (
    <div id="mock-exam-center-container" className="bg-slate-900 border border-slate-805 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            BOARD EXAMS TRIAL ENVIRONMENT
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            🎯 Mock Exam & Diagnostic Center
          </h2>
          <p className="text-xs text-slate-400">
            Simulate real timed national board challenges. Claim instant diagnostic reports showing expected score elevations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-2xl font-mono text-[11px] text-slate-350">
          <span>Overall Timed Rank:</span>
          <strong className="text-amber-500 font-extrabold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-current" /> Topper #3
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Scheduled Timed Mock Stack - Col 7 */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-[9.2px] font-mono font-black text-slate-500 uppercase tracking-widest block">
            Staged & Completed Mock Papers ({mocks.length})
          </h4>

          <div className="space-y-3">
            {mocks.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  m.completed
                    ? "bg-slate-950/70 border-slate-855"
                    : "bg-slate-950 border-amber-500/20 hover:border-amber-500/50"
                }`}
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[8.5px] font-mono text-slate-500 font-bold uppercase tracking-wider bg-slate-900 border border-slate-850 px-2 py-0.2 rounded">
                      {m.subject}
                    </span>
                    <span className="text-[8px] font-mono font-bold text-slate-500">
                      Duration: {m.duration}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-100 uppercase tracking-tight leading-snug">
                    {m.name}
                  </h4>

                  <span className="text-[9.5px] text-slate-500 font-mono block">
                    Session slot: {m.testDate}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {m.completed ? (
                    <div className="flex items-center gap-2">
                      <div className="text-center px-3 py-1.5 bg-slate-900 border border-slate-850 rounded-xl">
                        <span className="text-sm font-black text-emerald-450 font-mono block leading-none">{m.scorePct}%</span>
                        <span className="text-[6.5px] text-slate-500 font-black uppercase tracking-widest mt-0.5 block">GRADE</span>
                      </div>
                      <button
                        onClick={() => showReportModal(m)}
                        className="px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 font-black text-[10px] uppercase rounded-xl transition cursor-pointer"
                      >
                        AI Diagnosis
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => simulateMockPractice(m.name)}
                      disabled={isRunningSim}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] uppercase rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/5"
                    >
                      <span>Simulate Timed Exam</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timed Performance Analytics Box - Col 5 */}
        <div className="lg:col-span-5 p-4 bg-slate-955/40 border border-slate-850 rounded-2xl flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest block">BOARD EXAM ANALYTICS</span>
            <h4 className="text-xs font-black text-slate-205">Past Mock Achievements</h4>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Real-time update signals mapping grade milestones achieved in timed classrooms.
            </p>
          </div>

          <div className="space-y-3 my-4">
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-2xl border border-slate-855">
              <span className="text-[10.5px] font-bold text-slate-300 font-mono">Best Score Level:</span>
              <span className="text-xs font-black text-emerald-450 font-mono font-black">94% (Mathematics)</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-2xl border border-slate-855">
              <span className="text-[10.5px] font-bold text-slate-303 font-mono">Topper Leaderboard Rank:</span>
              <span className="text-xs font-black text-amber-500 font-mono font-black">#3 Out of Group leaders</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-2xl border border-slate-855">
              <span className="text-[10.5px] font-bold text-slate-303 font-mono">Completed Timed mock papers:</span>
              <span className="text-xs font-black text-slate-202 font-mono font-bold">2 full-scale papers</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-855 text-[9.5px] text-slate-450 leading-relaxed font-sans">
            💡 <strong>Toppers Note:</strong> Practice under strict timer frames reduces test day anxiety block by 52%.
          </div>
        </div>
      </div>

      {/* Pop up AI Report Modal */}
      {activeReportMock && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left space-y-4 shadow-2.5xl relative overflow-hidden animate-fade-in">
            {/* Header and close button */}
            <button
              onClick={() => setActiveReportMock(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-450 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-amber-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-black uppercase font-mono tracking-wider">Board Diagnostic Report</span>
            </div>

            <div>
              <h3 className="text-base font-black text-white">Mock Proof: {activeReportMock.name}</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Syllabus Subject matched: {activeReportMock.subject}</p>
            </div>

            {/* Analysis details blocks */}
            <div className="space-y-3.5 border-t border-slate-805 pt-4">
              <div>
                <span className="text-[8px] font-mono text-rose-500 font-black tracking-widest uppercase block">
                  ⚠️ Target Weak Area identified:
                </span>
                <p className="text-xs font-bold text-slate-305 mt-1 leading-snug">{activeReportMock.weakAreaIdentified}</p>
              </div>

              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-black tracking-widest uppercase block">
                  🛡️ Personalized Revision Plan Suggested:
                </span>
                <p className="text-xs font-bold text-slate-302 mt-1 leading-snug">{activeReportMock.revisionPlanRecommended}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-855 text-left">
                  <span className="text-[7.5px] font-mono text-slate-505 font-bold uppercase block leading-none">Expected Score Gain</span>
                  <span className="text-sm font-black text-emerald-404 font-mono block mt-1">+4.5% improvement</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-855 text-left">
                  <span className="text-[7.5px] font-mono text-slate-505 font-bold uppercase block leading-none">Accredited Grade Match</span>
                  <span className="text-sm font-black text-amber-500 font-mono block mt-1">{activeReportMock.scorePct >= 90 ? "Grade A*" : "Grade A"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-805 text-xs font-bold font-mono">
              <button
                onClick={() => setActiveReportMock(null)}
                className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl font-black uppercase tracking-wider transition hover:bg-amber-600"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
