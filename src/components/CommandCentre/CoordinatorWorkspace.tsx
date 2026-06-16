import React, { useState } from "react";
import { 
  CheckSquare, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  RefreshCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  BrainCircuit,
  ClipboardList
} from "lucide-react";
import { useGlobalAction } from "../GlobalActionContext";

interface CoordinatorWorkspaceProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function CoordinatorWorkspace({ theme, onTriggerNotification }: CoordinatorWorkspaceProps) {
  const { openModal } = useGlobalAction();
  // Moderate checks list
  const [checklist, setChecklist] = useState([
    { id: "mod-1", task: "Audit Chemistry Organic syllabus logs", completed: false, branch: "Business Bay" },
    { id: "mod-2", task: "Review Dr. Feynman's electromagnetism past mock schemes", completed: true, branch: "Dubai Marina" },
    { id: "mod-3", task: "Moderate Alan Turing's advanced trigonometry matrices", completed: false, branch: "Al Qusais" },
    { id: "mod-4", task: "Syllabus validation sign-off (CBSE Board preparation)", completed: false, branch: "Silicon Oasis" },
  ]);

  const [activeCurriculum, setActiveCurriculum] = useState<"IGCSE" | "A-Level" | "CBSE">("IGCSE");

  const curriculumsStats = {
    IGCSE: [
      { name: "Mathematics Mastery (Extended)", coverage: 94, outcomes: "91% predicted A-A*", riskLevel: "Normal" },
      { name: "Physics Co-ordinated Sciences", coverage: 82, outcomes: "88% predicted A-A*", riskLevel: "Normal" },
      { name: "Chemistry Co-ordinated", coverage: 74, outcomes: "72% predicted A-B", riskLevel: "Organic Risk" },
    ],
    "A-Level": [
      { name: "Pure Mathematics Pure 1 & 2", coverage: 88, outcomes: "85% predicted A*-A", riskLevel: "Normal" },
      { name: "Advanced Physics (Mechanics)", coverage: 78, outcomes: "80% predicted A-B", riskLevel: "Thermal equations deficit" },
    ],
    CBSE: [
      { name: "Mathematics Grade 12 Series", coverage: 95, outcomes: "94% average score", riskLevel: "Normal" },
      { name: "Biology Grade 11 Anatomy", coverage: 89, outcomes: "86% average score", riskLevel: "Normal" },
      { name: "Chemistry Organic Synthesis", coverage: 68, outcomes: "70% average score", riskLevel: "Weak Organic formulas" },
    ]
  };

  const weakSubjects = [
    { subject: "Chemistry IGCSE", reason: "Organic Carbon compounds formulas are falling behind schedule pacing.", action: "Deploy automated 'Chemistry Organic 101' past sheets" },
    { subject: "Physics A-Level", reason: "Mechanics and Thermal equations are tracking 8% behind board exam timing rules.", action: "Shift start calendar session 30 mins earlier on Tuesdays" }
  ];

  const handleToggleTask = (id: string, name: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    onTriggerNotification("📋 Task Verified", `Toggled moderation checklist sign-off for: "${name}"`);
  };

  const handleAddRemediation = (subject: string) => {
    onTriggerNotification(
      "⚡ Remediation Deployed",
      `Dispatched mandatory revision and past paper drills package for ${subject} to all regional faculty members.`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Dynamic Welcome and KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Syllabus Audited", value: "84 chapters verified Today", note: "98% coverage threshold" },
          { label: "Checked Assessments", value: "34 Mock Papers moderated", note: "SLA compliance met" },
          { label: "Faculty NPS Average", value: "4.74 / 5.0 (Excellent)", note: "42 active instructors" },
          { label: "At-Risk Subjects", value: "2 Categories Flagged", note: "Organic Chem / Thermal Phys" }
        ].map((stat, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 tracking-wider block">
              {stat.label}
            </span>
            <span className="text-lg font-black text-white">{stat.value}</span>
            <span className="text-[9.5px] text-indigo-400 font-semibold block">{stat.note}</span>
          </div>
        ))}
      </div>

      {/* Dynamic Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Academic Moderation:
        </span>
        <button
          onClick={() => openModal("COORDINATOR_REVIEW_SYLLABUS")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Review Syllabus"
        >
          <span>📖 Review Syllabus</span>
        </button>
        <button
          onClick={() => openModal("COORDINATOR_APPROVE_ASSESSMENT")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Approve Assessment"
        >
          <span>📋 Approve Assessment</span>
        </button>
        <button
          onClick={() => openModal("COORDINATOR_VIEW_OUTCOMES")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="View Outcomes"
        >
          <span>📊 View Program Outcomes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left pane: Syllabus Tracking & Moderation checkers (8/12 block) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Syllabus coverages comparing tabs */}
          <div className="bg-slate-955 border border-slate-850 p-5 rounded-2xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.04]">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" />
                  Curriculum syllabus tracking dashboards
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Continuous pacing and board compliance trackers for core tutoring programs</p>
              </div>

              {/* Curriculum Selector tabs */}
              <div className="flex gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0 self-start">
                {(["IGCSE", "A-Level", "CBSE"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCurriculum(tab)}
                    className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase cursor-pointer transition-all ${
                      activeCurriculum === tab
                        ? "bg-indigo-505 text-indigo-405 bg-indigo-500 text-white shadow shadow-indigo-500/10"
                        : "text-slate-450 hover:text-slate-205"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Curriculum tracking items */}
            <div className="space-y-4">
              {curriculumsStats[activeCurriculum].map((course, idx) => (
                <div key={idx} className="p-3.5 bg-slate-900/60 border border-slate-855 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[11.5px] font-black text-slate-200">{course.name}</h4>
                      <span className="text-[9px] text-slate-500 block">Outcomes forecast: <strong className="text-slate-350">{course.outcomes}</strong></span>
                    </div>

                    <span className={`px-2 py-0.5 text-[8.5px] font-bold rounded font-mono ${
                      course.riskLevel === "Normal"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-550 border border-rose-500/20"
                    }`}>
                      {course.riskLevel}
                    </span>
                  </div>

                  {/* Syllabus progress metrics */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-slate-550 uppercase">
                      <span>Curriculum Chapters covered</span>
                      <strong className="text-slate-250">{course.coverage}% covered</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all" 
                        style={{ width: `${course.coverage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Interactive Quality checklists */}
          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-4.5 h-4.5 text-[#f59e0b]" />
              Syllabus Assessment & Moderation tracker
            </h3>

            <div className="space-y-2.5">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleToggleTask(item.id, item.task)}
                  className={`p-3 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    item.completed
                      ? "bg-slate-900/60 border-indigo-500/30 text-white"
                      : "bg-slate-955 border-slate-850 text-slate-400"
                  }`}
                >
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-[11px] font-black">{item.task}</h4>
                    <span className="text-[8.5px] font-mono text-slate-550 uppercase font-black">{item.branch} Campus</span>
                  </div>

                  <div className={`p-1 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-black ${
                    item.completed ? "bg-indigo-500/10 text-indigo-400" : "bg-slate-900 text-slate-500"
                  }`}>
                    {item.completed ? "Moderated Sync" : "Pending Sign-off"}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right pane: Weak subject remediations warning boards (4/12 block) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-4">
            <div className="flex items-start gap-2 text-rose-455">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono tracking-wider font-extrabold text-rose-450 uppercase">
                  ACTIVE SYLLABUS RISK DIRECTIVES
                </h4>
                <p className="text-[9.5px] text-slate-550 leading-normal leading-relaxed mt-1 font-semibold">
                  ML predictive cohort variables have identified 2 developmental areas tracking behind threshold schedules.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-[10.5px]">
              {weakSubjects.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 border border-slate-855 rounded-xl space-y-2 text-left">
                  <span className="font-mono text-slate-100 font-extrabold text-[11px] block">{item.subject}</span>
                  <p className="text-[9.5px] text-slate-400 leading-snug font-medium">"{item.reason}"</p>
                  
                  <div className="pt-2 border-t border-slate-850/80">
                    <span className="text-[7.5px] font-mono font-black text-rose-400 uppercase tracking-widest block mb-1">REMEDIAL ACTION REQUIRED</span>
                    <button
                      onClick={() => handleAddRemediation(item.subject)}
                      className="w-full py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[8.5px] font-black uppercase text-amber-500 rounded cursor-pointer leading-normal"
                    >
                      Deploy Materials Pack
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick coordination rules */}
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-[11px] text-left space-y-3">
            <h5 className="text-[9.5px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase block">
              COORDINATION MEMORANDUMS
            </h5>
            <div className="p-2.5 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-[9.5px] text-slate-450 leading-relaxed font-semibold">
              ⚠️ **KHDA Audit Alert**: Note that Syllabus verification logs and lesson plans parameters are audited this week. Ensure all instructors complete today's registers.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
