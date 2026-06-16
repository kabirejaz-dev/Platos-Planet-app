import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, Filter, ArrowUpRight, 
  Target, TrendingUp, Users, Calendar, PhoneCall, RefreshCw, Send 
} from "lucide-react";

interface FunnelStep {
  stage: string;
  count: number;
  pct: number; // conversion from previous
  totalPct: number; // conversion from lead start
  revenueExpectation: string;
  color: string;
}

export default function SalesPipeline({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Active Pipeline Leads", value: "3,892", trend: "+12.4% MoM climb", count: "350 incoming today" },
    { label: "Active Trials Booked", value: "482", trend: "31% Conversion Target", count: "42 active Al Qusais slots" },
    { label: "Scholarship Grants Approved", value: "AED 340K", trend: "Fully budgeted", count: "24 premium registrations" },
    { label: "Follow-Ups Backlog Due", value: "119 Due", trend: "Critical priority", count: "Average response: 12m" }
  ];

  const pipelineStages: FunnelStep[] = [
    { stage: "Lead Inbound", count: 3892, pct: 100, totalPct: 100, revenueExpectation: "AED 7.8M", color: "bg-teal-500" },
    { stage: "Syllabus Inquiry", count: 2840, pct: 72, totalPct: 72, revenueExpectation: "AED 5.6M", color: "bg-sky-500" },
    { stage: "Counseling Intake", count: 1820, pct: 64, totalPct: 46, revenueExpectation: "AED 3.6M", color: "bg-indigo-500" },
    { stage: "Trial Lesson booked", count: 1140, pct: 62, totalPct: 29, revenueExpectation: "AED 2.2M", color: "bg-violet-500" },
    { stage: "Enrolled Core Students", count: 910, pct: 79, totalPct: 23, revenueExpectation: "AED 1.8M", color: "bg-amber-500" }
  ];

  const triggerLeadOptimization = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onTriggerNotification(
        "⚡ Lead Queue Optimized",
        "Dispatched smart lead priority routing. High conversion scores allocated to premier branch coordinators."
      );
    }, 600);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-6 animate-fade-in" id="admissions-sales-command-centre">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5">
        <div className="space-y-0.5">
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Target className="w-5 h-5 text-amber-500 animate-spin-slow" />
            Admissions & Sales Command Centre (CRM)
          </h3>
          <p className="text-[10px] text-slate-450">Salesforce-style multi-branch acquisition tracking cohort trial rates</p>
        </div>

        <button
          onClick={triggerLeadOptimization}
          disabled={loading}
          className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${loading ? "animate-spin" : ""}`} />
          Optimize Lead Routing
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div 
            key={s.label}
            className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl text-left"
          >
            <p className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">
              {s.label}
            </p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">
              {s.value}
            </p>
            <div className="flex items-center justify-between mt-1 text-[9px] font-mono">
              <span className="text-slate-400 font-medium">
                {s.count}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded uppercase">
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Funnel section */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">
          Acquisition Pipeline Funnel Output
        </h4>

        <div className="space-y-2.5">
          {pipelineStages.map((step, index) => {
            const isSelected = activeStage === step.stage;
            return (
              <div 
                key={step.stage}
                onClick={() => {
                  setActiveStage(isSelected ? null : step.stage);
                  onTriggerNotification(
                    `📁 CRM Step Inspected: ${step.stage}`,
                    `Loading candidate lists and representative lead cards for detailed cohort testing.`
                  );
                }}
                className={`p-3.5 bg-slate-950/60 border rounded-2xl transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                  isSelected ? "border-amber-500 bg-slate-950" : "border-slate-850 hover:bg-slate-950/90"
                }`}
              >
                <div className="flex items-center gap-3 md:w-1/4">
                  <div className={`p-2.5 rounded-xl text-white ${step.color} bg-opacity-90 shrink-0 font-bold font-mono text-[10px]`}>
                    STEP {index + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white">{step.stage}</h5>
                    <p className="text-[9.5px] text-slate-500 font-medium font-mono">Cumulative Expectation</p>
                  </div>
                </div>

                {/* Horizontal scaled gauge segment */}
                <div className="flex-1 space-y-1">
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600`} 
                      style={{ width: `${step.totalPct}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>Leads: <strong>{step.count.toLocaleString()}</strong></span>
                    <span>Progression Rate: <strong className="text-slate-350">{step.totalPct}%</strong></span>
                  </div>
                </div>

                {/* Expectations & percentages */}
                <div className="flex items-center gap-4 text-right justify-between md:justify-end font-mono">
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Conversion Gate</p>
                    <p className="text-xs font-black text-emerald-400 mt-0.5">+{step.pct}%</p>
                  </div>
                  <div className="border-l border-white/[0.04] pl-4">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Weighted Pipeline Value</p>
                    <p className="text-xs font-black text-amber-550 mt-0.5">{step.revenueExpectation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
