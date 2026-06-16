import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, Landmark, ShieldAlert, Award, FileText,
  Percent, ArrowRightLeft, Sparkles, ChevronRight, BarChart3, Download
} from "lucide-react";

interface BranchRanking {
  rank: number;
  branch: string;
  revenue: string;
  collectedPct: number;
  unpaidAED: string;
  status: "Normal" | "Escalation";
}

export default function FinanceOverview({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [activeTab, setActiveTab] = useState<"All" | "Pending">("All");

  const branchRankings: BranchRanking[] = [
    { rank: 1, branch: "Al Qusais Primary Hub", revenue: "AED 3.12M", collectedPct: 94, unpaidAED: "AED 84k", status: "Normal" },
    { rank: 2, branch: "Dubai Marina Campus", revenue: "AED 1.84M", collectedPct: 89, unpaidAED: "AED 124k", status: "Normal" },
    { rank: 3, branch: "Dubai Silicon Oasis", revenue: "AED 1.42M", collectedPct: 88, unpaidAED: "AED 92k", status: "Normal" },
    { rank: 4, branch: "Business Bay GCC Core", revenue: "AED 1.04M", collectedPct: 74, unpaidAED: "AED 114k", status: "Escalation" },
    { rank: 5, branch: "JVC Campus Node", revenue: "AED 980K", collectedPct: 81, unpaidAED: "AED 72k", status: "Normal" }
  ];

  const handleForecastClick = () => {
    onTriggerNotification(
      "🔮 Expected Revenue Forecast Active",
      "Compiling cohort pacing variables. Expected next month UAE Revenue: AED 1.35M (at +12.4% enrollment intake target)."
    );
  };

  const handleDownloadInvoices = () => {
    onTriggerNotification(
      "📥 Fetching Unpaid Invoices",
      "Compiling direct ledger variables. Excel sheets with parent phone numbers sent to administrative coordinators."
    );
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-6 animate-fade-in" id="finance-command-centre">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5">
        <div className="space-y-0.5">
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Landmark className="w-5 h-5 text-amber-500" />
            Finance & Billing Command Centre
          </h3>
          <p className="text-[10px] text-slate-450">Stripe-style financial console monitoring collected fees, scholarships, and outstanding debt rosters</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadInvoices}
            className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-450" />
            Export Outstanding Invoices
          </button>
        </div>
      </div>

      {/* Main Grid: Statistics Card (Left) & Next-Month Forecast Gauge (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Statistics Widgets Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl flex flex-col justify-between h-30 text-left">
            <div className="flex items-center justify-between text-slate-450">
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase">Collected Fees (YTD)</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">AED 7.98M</p>
              <p className="text-[9.5px] text-slate-500 font-bold mt-1 font-mono">92% collection threshold reached</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl flex flex-col justify-between h-30 text-left">
            <div className="flex items-center justify-between text-slate-455">
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-rose-450">Outstanding Deficit</span>
              <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
            <div>
              <p className="text-2xl font-black text-rose-400">AED 421,000</p>
              <p className="text-[9.5px] text-slate-500 font-bold mt-1 font-mono">Triggers automated WhatsApp template</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl flex flex-col justify-between h-30 text-left">
            <div className="flex items-center justify-between text-slate-450">
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase">Scholarship disbursements</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">AED 340,000</p>
              <p className="text-[9.5px] text-slate-500 font-bold mt-1 font-mono">119 corporate scholar candidates</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/45 border border-slate-850/80 rounded-2xl flex flex-col justify-between h-30 text-left">
            <div className="flex items-center justify-between text-slate-450">
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase">Refund volume processed</span>
              <ArrowRightLeft className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">AED 48,000</p>
              <p className="text-[9.5px] text-slate-500 font-bold mt-1 font-mono">Under 0.6% total intake tier</p>
            </div>
          </div>

        </div>

        {/* Right: Expectation Revenue Forecast Gauge */}
        <div className="lg:col-span-4 p-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-850 rounded-2xl flex flex-col justify-between text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-amber-500 uppercase">Interactive Forecast</span>
            <div className="p-1 bg-amber-500/10 text-amber-500 rounded text-[9px] font-black uppercase font-mono">
              Q3 Plato AI
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h4 className="text-xs font-black text-white">Projected Next Month Receipts</h4>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">AED 1.35 Million</p>
            <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
              Expected billing forecast assumes 94.2% cohort compliance levels and 72 high-roi premium marketing acquisitions.
            </p>
          </div>

          <button
            onClick={handleForecastClick}
            className="w-full mt-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            Calculate Live Q3 Pipeline
          </button>
        </div>

      </div>

      {/* Branch Financial Rankings */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">
          UAE Branch Financial Leaderboard
        </h4>

        <div className="overflow-x-auto w-full rounded-2xl border border-slate-850/85">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-955 border-b border-slate-850 text-slate-400 font-mono tracking-wider font-extrabold text-[9px] uppercase">
                <th className="p-3">Rank & Branch</th>
                <th className="p-3">Total Expected Fees</th>
                <th className="p-3">Collection Percentage</th>
                <th className="p-3">Deficit Pending</th>
                <th className="p-3 text-right">Audit Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-855 text-slate-205 font-mono">
              {branchRankings.map((b) => (
                <tr key={b.rank} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-sans font-bold text-white flex items-center gap-2">
                    <span className="text-slate-500 text-[10px]">#{b.rank}</span>
                    <span>{b.branch}</span>
                  </td>
                  <td className="p-3 font-bold">{b.revenue}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-400">{b.collectedPct}%</span>
                      <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${b.collectedPct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className={`p-3 font-black ${b.status === "Escalation" ? "text-rose-500" : "text-slate-400"}`}>
                    {b.unpaidAED}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase ${
                      b.status === "Escalation" 
                        ? "bg-rose-500/20 text-rose-450 border border-rose-500/10" 
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
