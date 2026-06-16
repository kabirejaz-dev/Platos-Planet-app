import React from "react";
import { 
  Trophy, GraduationCap, CheckCircle2, Award, 
  BookOpen, Star, AlertCircle, Heart, Wifi 
} from "lucide-react";

interface SuccessMetricProps {
  label: string;
  value: string;
  sub: string;
  color: string;
  percentage: number;
}

export default function StudentSuccessPanel({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  
  const academicMetrics: SuccessMetricProps[] = [
    { label: "Average Attendance", value: "95.2%", sub: "Industry top quartile", color: "bg-emerald-500", percentage: 95 },
    { label: "Homework Compliance", value: "89.4%", sub: "Pacing +4% MoM climb", color: "bg-amber-500", percentage: 89 },
    { label: "Mock Exam Readiness", value: "91.8%", sub: "12,480 active testers", color: "bg-indigo-500", percentage: 91 },
    { label: "Parent Engagement Index", value: "94.6%", sub: "9,870 parents active", color: "bg-pink-500", percentage: 94 }
  ];

  const curricula = [
    { 
      name: "IGCSE Stream Elite", 
      avgGrade: "A (88.4%)", 
      passRate: "98.2%", 
      readiness: "Exceeding Target",
      students: 4520,
      color: "from-amber-500/20 to-amber-600/5 text-amber-500 border-amber-500/30"
    },
    { 
      name: "A-Level Mastery", 
      avgGrade: "A- (84.1%)", 
      passRate: "97.4%", 
      readiness: "Optimal Pacing",
      students: 3180,
      color: "from-blue-500/20 to-blue-600/5 text-blue-500 border-blue-500/30"
    },
    { 
      name: "CBSE Master Board Core", 
      avgGrade: "91.2%", 
      passRate: "99.1%", 
      readiness: "100% Board Ready",
      students: 2940,
      color: "from-emerald-500/20 to-emerald-600/5 text-emerald-500 border-emerald-500/30"
    }
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-6" id="student-success-centre">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            Student Academic Success Centre
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Benchmarking attendance, mock achievements, and syllabus completion velocity across standard curriculums</p>
        </div>

        <button
          onClick={() => {
            onTriggerNotification("📊 Academic Deep Dive Active", "Extracting grade sheet data matrices for standard IGCSE/CBSE exam blocks.");
          }}
          className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Award className="w-4 h-4 text-amber-500 animate-spin-slow" />
          Audit Exam Blocks
        </button>
      </div>

      {/* Grid: Academic Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {academicMetrics.map((m) => (
          <div 
            key={m.label}
            className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl space-y-2 text-left"
          >
            <p className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">
              {m.label}
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-black text-white">{m.value}</span>
              <span className="text-[9px] text-slate-500 font-bold font-mono">{m.sub}</span>
            </div>
            
            {/* Horizontal progress visualization */}
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${m.color}`} 
                  style={{ width: `${m.percentage}%` }} 
                />
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-550">
                <span>Threshold: 85%</span>
                <span className="font-bold text-slate-400">Achieved</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum breakdown benchmarks */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">
          UAE Curriculum Benchmarking Analytics
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {curricula.map((curr) => (
            <div 
              key={curr.name}
              className={`p-5 rounded-2xl border bg-gradient-to-br ${curr.color} flex flex-col justify-between text-left space-y-3`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-xs font-black text-white">{curr.name}</h5>
                  <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">{curr.students.toLocaleString()} Cohort Roster</p>
                </div>
                <GraduationCap className="w-4 h-4 opacity-50" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono">
                <div className="p-2 bg-slate-955/60 rounded-xl border border-white/[0.02]">
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase">Avg Grade</span>
                  <p className="text-xs font-black text-white mt-0.5">{curr.avgGrade}</p>
                </div>
                <div className="p-2 bg-slate-955/60 rounded-xl border border-white/[0.02]">
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase">Pass Rate</span>
                  <p className="text-xs font-black text-emerald-400 mt-0.5">{curr.passRate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] border-t border-white/[0.03] pt-3">
                <span className="text-slate-450 font-bold uppercase">Board readiness:</span>
                <span className="bg-slate-950 text-amber-400 font-bold border border-slate-800 px-2 py-0.5 rounded-sm">
                  {curr.readiness}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
