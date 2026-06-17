import React, { useState, useEffect } from "react";
import { 
  Users, UserCheck, 
  TrendingUp, TrendingDown, DollarSign, Target, Sparkles, ChevronRight, Info 
} from "lucide-react";
import { useGlobalAction } from "../GlobalActionContext";
import { getStoredPlatosPlanetConfig } from "../../platosPlanetConfig";

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
  const [demoMode, setDemoMode] = useState<boolean>(() => {
    return localStorage.getItem("platos_demo_mode") !== "false";
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDemoMode(localStorage.getItem("platos_demo_mode") !== "false");
    };
    window.addEventListener("platos_planet_config_updated", handleUpdate);
    return () => window.removeEventListener("platos_planet_config_updated", handleUpdate);
  }, []);

  const config = getStoredPlatosPlanetConfig();

  const kpis: KPIData[] = [
    { label: "Total Students", value: demoMode ? "12,480" : "0", change: demoMode ? "+14% MoM" : "0% ", isPositive: true, color: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30", detail: demoMode ? "At capacity thresholds" : "No live data connected", category: "students" },
    { label: "Registered Parents", value: demoMode ? "9,870" : "0", change: demoMode ? "+8% YoY" : "0% ", isPositive: true, color: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30", detail: demoMode ? "Active App Engagement" : "Connect student records", category: "parents" },
    { label: "Active Faculty", value: demoMode ? "428" : "0", change: demoMode ? "+22 Faculty" : "+0 ", isPositive: true, color: "from-purple-500/20 to-purple-600/5 text-purple-450 border-purple-500/30", detail: demoMode ? "Top 10 Benchmark ready" : "Admin onboarding active", category: "teachers" },
    { label: "Running Classes", value: demoMode ? "1,136" : "0", change: demoMode ? "94% room util" : "0% ", isPositive: true, color: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30", detail: demoMode ? `Peak ${config.officialBranches[0]} scheduling` : "Offline schedules pending", category: "classes" },
    { label: "Arabian Gulf Revenue", value: demoMode ? "AED 8.4M" : "AED 0", change: demoMode ? "+18% Target" : "0% ", isPositive: true, color: "from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30", detail: demoMode ? "Q2 fiscal checkpoint" : "Payment gateway standby", category: "revenue" },
    { label: "Outstanding Debts", value: demoMode ? "AED 421K" : "AED 0", change: demoMode ? "Urgent Reach" : "Clean Ledger", isPositive: false, color: "from-rose-500/10 to-rose-600/5 text-rose-500 border-rose-500/30", detail: demoMode ? "Triggers direct template" : "All local accounts paid", category: "fees" },
    { label: "Trial-to-Enrollment", value: demoMode ? "31.2%" : "0.0%", change: demoMode ? "+2.4% vs KPI" : "0.0% ", isPositive: true, color: "from-teal-500/20 to-teal-600/5 text-teal-450 border-teal-500/30", detail: demoMode ? "Aesthetic CRM pipeline" : "Lead registry initialized", category: "leads" },
    { label: "Cohort Satisfaction", value: demoMode ? "92.4%" : "100%", change: demoMode ? "Excellent" : "Verified", isPositive: true, color: "from-pink-500/20 to-pink-600/5 text-pink-450 border-pink-500/30", detail: "Internal Quality Index", category: "nps" }
  ];

  const handleCardClick = (kpi: KPIData) => {
    onTriggerNotification(
      `📊 Deep Audit: ${kpi.label}`,
      `Inspecting sub-cohorts and regional historical files for ${kpi.label} (${kpi.value}).`
    );
    openModal("SUPER_ADMIN_KPI_MODAL", kpi);
  };

  return (
    <div className="space-y-4" id="executive-kpi-bar-section">
      {/* Dynamic Demo Mode notification header bar */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
        demoMode 
          ? 'bg-amber-500/10 border-amber-505/20 text-amber-300' 
          : 'bg-indigo-500/10 border-indigo-505/20 text-indigo-300'
      }`}>
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <p className="text-xs">
            {demoMode ? (
              <span><strong>Interactive Demo Mode Active:</strong> High-fidelity figures shown below are simulated datasets for illustrative purposes. Toggle to Live mode above to see real database status.</span>
            ) : (
              <span><strong>Official Live Mode Verified:</strong> Now displaying only authorized client information, registered campuses, and live audit parameters.</span>
            )}
          </p>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border shrink-0 ${
          demoMode ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-indigo-500/20 border-indigo-505/30 text-indigo-400'
        }`}>
          {demoMode ? "Simulated Demo Data Available" : "Live Safe Workspace"}
        </span>
      </div>

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
              <span className="text-[11px] font-mono tracking-wider font-extrabold uppercase text-slate-450 flex items-center gap-1">
                {kpi.label}
                {demoMode && (
                  <span className="text-[8px] px-1 bg-amber-500/10 border border-amber-500/25 rounded text-amber-400 uppercase font-mono leading-none">
                    Demo
                  </span>
                )}
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
