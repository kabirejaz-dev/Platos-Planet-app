import React from "react";
import { 
  Users, UserCheck, 
  TrendingUp, TrendingDown, DollarSign, Target, Sparkles, ChevronRight 
} from "lucide-react";
import { useGlobalAction } from "../GlobalActionContext";

interface KPIData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
  detail: string;
  category: "students" | "parents" | "teachers" | "classes" | "revenue" | "fees" | "leads" | "nps";
}

export default function KPIGrid({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const { openModal } = useGlobalAction();
  const kpis: KPIData[] = [
    { label: "Total Students", value: "12,480", change: "+14% MoM", isPositive: true, color: "from-emerald-500/20 to-emerald-600/5 text-emerald-450 border-emerald-500/30", detail: "At capacity thresholds", category: "students" },
    { label: "Registered Parents", value: "9,870", change: "+8% YoY", isPositive: true, color: "from-blue-500/20 to-blue-600/5 text-blue-450 border-blue-500/30", detail: "Active App Engagement", category: "parents" },
    { label: "Active Faculty", value: "428", change: "+22 Faculty", isPositive: true, color: "from-purple-500/20 to-purple-600/5 text-purple-450 border-purple-500/30", detail: "Top 10 Benchmark ready", category: "teachers" },
    { label: "Running Classes", value: "1,136", change: "94% room util", isPositive: true, color: "from-indigo-500/20 to-indigo-600/5 text-indigo-450 border-indigo-500/30", detail: "Peak Al Qusais scheduling", category: "classes" },
    { label: "Arabian Gulf Revenue", value: "AED 8.4M", change: "+18% Target", isPositive: true, color: "from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30", detail: "Q2 fiscal checkpoint", category: "revenue" },
    { label: "Outstanding Debts", value: "AED 421K", change: "Urgent Reach", isPositive: false, color: "from-rose-500/10 to-rose-600/5 text-rose-500 border-rose-500/30", detail: "Triggers direct template", category: "fees" },
    { label: "Trial-to-Enrollment", value: "31.2%", change: "+2.4% vs KPI", isPositive: true, color: "from-teal-500/20 to-teal-600/5 text-teal-450 border-teal-500/30", detail: "Aesthetic CRM pipeline", category: "leads" },
    { label: "Cohort Satisfaction", value: "92.4%", change: "Excellent", isPositive: true, color: "from-pink-500/20 to-pink-600/5 text-pink-450 border-pink-500/30", detail: "KHDA Top tier metric", category: "nps" }
  ];

  const handleCardClick = (kpi: KPIData) => {
    onTriggerNotification(
      `📊 Deep Audit: ${kpi.label}`,
      `Inspecting sub-cohorts and regional historical files for ${kpi.label} (${kpi.value}).`
    );
    openModal("SUPER_ADMIN_KPI_MODAL", kpi);
  };

  return (
    <div className="space-y-3" id="executive-kpi-bar-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        {kpis.map((kpi) => (
          <button
            key={kpi.label}
            onClick={() => handleCardClick(kpi)}
            className={`p-5 rounded-3xl border bg-slate-900/45 hover:bg-slate-900/75 hover:border-slate-700/80 hover:shadow-2xl transition-all duration-350 cursor-pointer text-left relative overflow-hidden group flex flex-col justify-between min-h-[145px] ${
              kpi.category === "fees" ? "border-rose-550/20 hover:border-rose-500/50" : "border-slate-850"
            }`}
          >
            {/* Subtle glow trace */}
            <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${kpi.color}`} />

            <div className="w-full flex items-start justify-between">
              <span className="text-[11px] font-mono tracking-wider font-extrabold uppercase text-slate-450">
                {kpi.label}
              </span>
              <span className={`text-[10.5px] font-bold font-mono px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                kpi.isPositive 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "bg-rose-500/10 text-rose-500"
              }`}>
                {kpi.isPositive ? "↑" : "↓"} {kpi.change}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                {kpi.value}
              </p>
              <div className="flex items-center justify-between mt-1 text-[9.5px]">
                <span className="text-slate-400 font-medium">
                  {kpi.detail}
                </span>
                <span className="text-[9px] font-bold opacity-0 group-hover:opacity-100 text-amber-500 font-mono tracking-tighter uppercase transition-opacity flex items-center gap-0.5">
                  AUDIT <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Simulated Miniature Sparkline bar chart at bottom */}
            <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden mt-3.5 flex gap-0.5">
              <div className={`h-full rounded-full ${kpi.isPositive ? "bg-emerald-500" : "bg-rose-500"}`} style={{ width: kpi.category === "nps" ? "92%" : "70%" }} />
              <div className="h-full rounded-full bg-white/5 flex-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
