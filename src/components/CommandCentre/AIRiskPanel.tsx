import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, AlertTriangle, Play, HelpCircle, 
  UserX, Home, DollarSign, Calendar, RefreshCw, Send, ShieldX 
} from "lucide-react";
import { useGlobalAction } from "../GlobalActionContext";

interface RiskItem {
  id: string;
  category: "At Risk Student" | "At Risk Teacher" | "At Risk Branch" | "Fee Collection Risk" | "Attendance Risk";
  subjectName: string;
  reason: string;
  severity: "Critical" | "Escalate" | "Monitor";
  suggestedAction: string;
  details: string;
}

export default function AIRiskPanel({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const { openModal } = useGlobalAction();
  const [loading, setLoading] = useState(false);
  const [riskList, setRiskList] = useState<RiskItem[]>([
    {
      id: "risk1",
      category: "At Risk Student",
      subjectName: "Dev Patel (Grade 11 CBSE Jumeirah)",
      reason: "Homework completion dropped to 48% over last 3 weeks coinciding with 78% biology mock marks decline.",
      severity: "Critical",
      suggestedAction: "Trigger automated parent academic pacing notification",
      details: "Grade score: D (was B+)"
    },
    {
      id: "risk2",
      category: "At Risk Teacher",
      subjectName: "Math Instructor T-102 (Al Qusais)",
      reason: "NPS lesson feedback scores fell below the crucial 4.0 threshold to 3.82. Chemistry pass rates remain robust.",
      severity: "Escalate",
      suggestedAction: "Initiate coordinator classroom appraisal session",
      details: "NPS score: 3.8"
    },
    {
      id: "risk3",
      category: "At Risk Branch",
      subjectName: "Business Bay GCC Core Branch",
      reason: "Class utilization metrics sitting at 64% due to lag in converting counseling inquiries to first trials.",
      severity: "Escalate",
      suggestedAction: "Redirect local organic ad spend from DSO to Business Bay",
      details: "Utilization: 64%"
    },
    {
      id: "risk4",
      category: "Fee Collection Risk",
      subjectName: "Dubai Marina Pending Cohorts",
      reason: "AED 124,000 in outstanding invoices are flagged overdue past the standard 15-day institutional grace marker.",
      severity: "Critical",
      suggestedAction: "Execute legal/billing parent outreach WhatsApp templates",
      details: "12 invoices unpaid"
    },
    {
      id: "risk5",
      category: "Attendance Risk",
      subjectName: "IGCSE Chemistry Evening Block Delta",
      reason: "Syllabus attendance averages fell to 78% on Tuesdays due to local public transport construction delays.",
      severity: "Monitor",
      suggestedAction: "Shift block starting slot 30 minutes later to 6:30 PM",
      details: "Tuesday attendance: 78%"
    }
  ]);

  const handleResolveAction = (risk: RiskItem) => {
    onTriggerNotification(
      `⚡ Plato AI Remediating`,
      `Executed smart suggest: "${risk.suggestedAction}". Direct actions dispatched to branch managers.`
    );
    // Remove or resolve risk locally
    setRiskList(prev => prev.filter(r => r.id !== risk.id));
  };

  const handleRecalculate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onTriggerNotification(
        "🧠 Plato AI Audit Compeleted",
        "Regenerated 12,480 student records. All critical risk vectors are listed below."
      );
    }, 600);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-5 animate-fade-in" id="ai-risk-detection">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <ShieldX className="w-5 h-5 text-rose-500 animate-pulse" />
            Plato AI Predictive Risk Detection Control
          </h3>
          <p className="text-[10px] text-slate-450">Continuous ML audits checking homework thresholds, instructor NPS levels, and regional balance limits</p>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={loading}
          className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${loading ? "animate-spin" : ""}`} />
          Run ML Risk Model
        </button>
      </div>

      {/* Risk Items Feed */}
      <div className="space-y-3.5">
        {riskList.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/20 border border-slate-850 rounded-2xl text-slate-500 space-y-2">
            <ShieldCheck className="w-8 h-8 mx-auto text-emerald-400 stroke-1" />
            <p className="text-xs font-bold text-white">All Clear! No critical risks detected</p>
            <p className="text-[9.5px]">Re-run ML models on the top right to verify real-time cohort pacing variables.</p>
          </div>
        ) : (
          riskList.map((risk) => (
            <div 
              key={risk.id}
              onClick={() => openModal("SUPER_ADMIN_RISK_ITEM", { student: risk.subjectName, issue: risk.reason })}
              className="p-4.5 bg-slate-955/60 border border-slate-850 hover:border-slate-800 rounded-2xl flex flex-col lg:flex-row lg:items-start justify-between gap-4 text-left group cursor-pointer hover:bg-slate-900/60 transition"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="p-1 px-1.5 bg-slate-950 text-amber-500 border border-slate-850 rounded text-[9px] font-black uppercase font-mono">
                    {risk.category}
                  </span>
                  <span className="text-xs font-black text-white">{risk.subjectName}</span>
                  
                  <span className={`px-2 py-0.5 text-[8.5px] font-black uppercase font-mono rounded ${
                    risk.severity === "Critical" 
                      ? "bg-rose-500/20 text-rose-450 border border-rose-500/10" 
                      : risk.severity === "Escalate"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-505/10"
                      : "bg-blue-500/10 text-blue-400 border border-blue-505/10"
                  }`}>
                    {risk.severity} Severity
                  </span>

                  <span className="text-[9.5px] text-slate-505 font-mono ml-auto lg:ml-0">
                    {risk.details}
                  </span>
                </div>

                <p className="text-[11.5px] text-slate-300 leading-relaxed font-medium">
                  <strong>Risk Description:</strong> {risk.reason}
                </p>

                <div className="p-2.5 bg-slate-950/80 border border-white/[0.02] rounded-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                  <p className="text-[10px] text-amber-400 font-mono font-bold leading-none">
                    SUGGESTED INTEL ACTION: <span className="text-slate-300 font-sans font-bold normal-case ml-1">{risk.suggestedAction}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center shrink-0 justify-end self-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleResolveAction(risk)}
                  className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-500 rounded-xl text-[10px] font-black tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Mitigate Risk Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
