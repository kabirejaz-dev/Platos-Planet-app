import React, { useState } from "react";
import { 
  DollarSign, 
  Landmark, 
  ShieldAlert, 
  Award, 
  FileText, 
  ArrowRightLeft, 
  Sparkles, 
  TrendingUp, 
  Send,
  RefreshCw,
  PlusCircle,
  HelpCircle,
  ChevronRight,
  Download
} from "lucide-react";
import FinanceOverview from "./FinanceOverview";
import { useGlobalAction } from "../GlobalActionContext";

interface FinanceWorkspaceProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function FinanceWorkspace({ theme, onTriggerNotification }: FinanceWorkspaceProps) {
  const { openModal } = useGlobalAction();
  // Outstanding parent billing lists
  const [deficitsList, setDeficitsList] = useState([
    { id: "def-1", parent: "Fatima Al-Suwaidi", student: "Hamdan Al-Suwaidi", balance: "AED 8,400", delay: "22 days overdue", branch: "Al Qusais" },
    { id: "def-2", parent: "Michael Sterling", student: "Chloe Sterling", balance: "AED 12,400", delay: "16 days overdue", branch: "Dubai Marina" },
    { id: "def-3", parent: "Rajesh Chawla", student: "Mohammad Chawla", balance: "AED 5,200", delay: "11 days overdue", branch: "Business Bay" },
    { id: "def-4", parent: "Amina Al-Mansoor", student: "Zayed Al-Mansoor", balance: "AED 3,100", delay: "5 days overdue", branch: "Silicon Oasis" },
  ]);

  const [marketingSpendFactor, setMarketingSpendFactor] = useState(4000); // Slider factor

  const handleDispatchedAlert = (id: string, name: string) => {
    onTriggerNotification(
      "⚡ WhatsApp Billing Dispatched",
      `Urgent template dispatched to ${name}. Triggers automated legal institutional warning.`
    );
    // Move balance or update delay logs
    setDeficitsList(prev => prev.filter(d => d.id !== id));
  };

  const handleApplyPaymentPlan = (name: string) => {
    onTriggerNotification(
      "💳 Payment Plan Initialized",
      `Sub-divided ${name}'s tuition ledger into 3 flexible installment plans. E-Invoices dispatched.`
    );
  };

  const projectedROI = Math.round(marketingSpendFactor * 3.42);

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Overview main dashboard container */}
      <FinanceOverview theme={theme} onTriggerNotification={onTriggerNotification} />

      {/* Dynamic Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Finance Desk Actions:
        </span>
        <button
          onClick={() => openModal("FINANCE_COLLECT_FEES")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Collect Fees"
        >
          <span>💰 Collect Fees</span>
        </button>
        <button
          onClick={() => openModal("FINANCE_DOWNLOAD_VAT")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Download VAT Report"
        >
          <span>📥 Download VAT Statement</span>
        </button>
        <button
          onClick={() => openModal("FINANCE_CREATE_PLAN")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Create Payment Plan"
        >
          <span>💳 Create Pacing Plan</span>
        </button>
        <button
          onClick={() => openModal("FINANCE_FORECAST_CASH")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Forecast Cash Flow"
        >
          <span>📈 Forecast Cash Flow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Outstanding debts tables (8/12 block) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Overdue tuition payment roster */}
          <div className="bg-slate-955 border border-slate-850 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
                  Overdue Accounts Billing & Collections Desk
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Urgent parent ledger debts past standard institutional grace limits. Execute contact templates instantly</p>
              </div>
              <span className="text-[9px] font-mono text-rose-500 font-extrabold bg-rose-500/10 px-2 py-0.5 rounded">
                Action Required
              </span>
            </div>

            {deficitsList.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/20 rounded-xl text-slate-505 border border-slate-850">
                ⭐ Pristine! All overdue invoices are outstandingly cleared.
              </div>
            ) : (
              <div className="space-y-3">
                {deficitsList.map((def) => (
                  <div 
                    key={def.id}
                    className="p-3.5 bg-slate-900/60 border border-slate-855 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 text-left flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-mono font-black text-rose-400 uppercase bg-rose-500/10 px-1.5 py-0.2 rounded">
                          {def.delay}
                        </span>
                        <h4 className="text-[11.5px] font-black text-slate-100">{def.parent}</h4>
                        <span className="text-[9px] text-slate-550">({def.student} - {def.branch})</span>
                      </div>

                      <p className="text-[10px] text-slate-400">
                        Pending Fee Balance: <strong className="text-rose-400">{def.balance}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 md:justify-end">
                      <button
                        onClick={() => handleDispatchedAlert(def.id, def.parent)}
                        className="p-1 px-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Send className="w-3 h-3 text-white" /> Dispatch WhatsApp Alert
                      </button>

                      <button
                        onClick={() => handleApplyPaymentPlan(def.parent)}
                        className="p-1 px-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-350 hover:text-white font-bold text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                      >
                        Divide Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Section: Projections and Spend calculators (4/12 block) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Spend / Revenue ROI modelers */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-4">
            <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">
              ADMISSIONS SPEND FORECASTER (Q3)
            </h4>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>Simulated Social Marketing Spend</span>
                  <strong className="text-white font-mono">AED {marketingSpendFactor}</strong>
                </div>
                <input 
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={marketingSpendFactor}
                  onChange={(e) => setMarketingSpendFactor(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-900 cursor-pointer rounded-lg occurrence-none h-1"
                />
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-855 rounded-xl space-y-1.5">
                <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest block">EXPECTED INTAKE REVENUE</span>
                <h5 className="text-[20px] font-black text-emerald-400 leading-none">
                  AED {projectedROI.toLocaleString()}
                </h5>
                <p className="text-[9px] text-slate-450 leading-tight">
                  Assumed cohort conversion efficiency: 3.42x marketing ROI factor.
                </p>
              </div>

              <button
                onClick={() => onTriggerNotification("📈 Modeling Exported", "Exported current marketing ROI spend report to branch coordinators.")}
                className="w-full py-2 bg-indigo-505/10 bg-indigo-500/10 border border-slate-800 text-[10px] font-black uppercase tracking-wider text-indigo-400 rounded-xl transition-all cursor-pointer"
              >
                Send Model to Branch Managers
              </button>
            </div>
          </div>

          {/* Institutional guidelines */}
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-[11px] text-left space-y-3">
            <h5 className="text-[9.5px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase block">
              FINANCIAL DIRECTIVES
            </h5>
            <div className="p-2.5 bg-amber-500/5 rounded-xl border border-amber-500/10 text-[9.5px] text-slate-450 leading-relaxed font-semibold">
              🏦 **Grace Overdue Limits**: Standard institucional grace delay caps at 15 days in UAE centers. Beyond this boundary, mandatory direct automated outreach templates are triggered.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
