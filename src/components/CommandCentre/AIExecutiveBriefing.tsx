import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, TrendingUp, AlertTriangle, 
  Lightbulb, ArrowUpRight, CheckCircle2, ChevronRight,
  Send, RefreshCw, Layers, Sparkle 
} from "lucide-react";

interface InsightItem {
  id: string;
  category: "Growth" | "Academic" | "Risk" | "Sales" | "Finance";
  text: string;
  impactScore: number;
  trend: "up" | "down" | "warning";
}

interface RecommendedAction {
  id: string;
  action: string;
  priority: "Critical" | "Medium" | "Opportunity";
  team: string;
  impact: string;
}

export default function AIExecutiveBriefing({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [askQuery, setAskQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const insights: InsightItem[] = [
    { id: "i1", category: "Growth", text: "Enrollment increased 18% this month driven by direct-to-WhatsApp targeted campaigns matching Al Qusais demographic parameters.", impactScore: 92, trend: "up" },
    { id: "i2", category: "Risk", text: "Dubai Marina branch class utilization fell to 78%; scheduling optimization alerts are ready for prompt review.", impactScore: 84, trend: "warning" },
    { id: "i3", category: "Academic", text: "Chemistry mock exam results improved by 12.4% following custom academic pacing interventions deployed in May.", impactScore: 88, trend: "up" },
    { id: "i4", category: "Sales", text: "27 hot leads are flagged as highly likely to convert this week based on trial lesson attendance patterns.", impactScore: 95, trend: "up" },
    { id: "i5", category: "Finance", text: "AED 142,000 in outstanding fees require urgent direct parent outreach. Automated invoice reminders generated.", impactScore: 79, trend: "warning" }
  ];

  const recommendations: RecommendedAction[] = [
    { id: "r1", action: "Execute outbound outreach with direct WhatsApp billing templates to Marina & DSO overdue parents.", priority: "Critical", team: "Sales Ops", impact: "+ AED 82K" },
    { id: "r2", action: "Hire/Deploy a Senior IGCSE Mathematics Teacher to the Al Qusais branch to meet the 14-student waitlist.", priority: "Critical", team: "HR Module", impact: "Fulfill Waitlist" },
    { id: "r3", action: "Open a fresh foundation level A-Level Physics evening batch next Sunday (6:00 PM slot empty).", priority: "Opportunity", team: "Coordinator", impact: "+24% Cap" },
    { id: "r4", action: "Review and re-allocate Al Furjan marketing budget to high-ROI local Google Maps campaigns.", priority: "Medium", team: "Marketing", impact: "Reduce CAC" }
  ];

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;
    setLoading(true);
    setAiResponse(null);

    // Simulate Plato Gen AI pipeline
    setTimeout(() => {
      setLoading(false);
      const queryLower = askQuery.toLowerCase();
      if (queryLower.includes("revenue") || queryLower.includes("finance")) {
        setAiResponse("Based on current cohort enrollments, projected revenue for Q3 UAE is AED 2.84M, pacing +14% above target threshold. Outstanding fee collection is the primary risk factor.");
      } else if (queryLower.includes("grade") || queryLower.includes("student")) {
        setAiResponse("A-Level mock exam pass-rates are stable at 91.2%. We flag 14 students at risk in IGCSE Biology due to 80% lower homework compliance scores.");
      } else {
        setAiResponse("I have audited all 5 active campuses. Recommended focus is the JVC branch where trial conversion latency is slightly lagging the Dubai Marina baseline (24 hours vs 12 hours).");
      }
      onTriggerNotification("🧠 Plato AI Answered", "Parsed executive context & compiled smart strategic observations.");
    }, 900);
  };

  const triggerReset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onTriggerNotification("🔄 Data Briefing Re-calibrated", "Polished and consolidated latest multi-branch pipeline variables.");
    }, 600);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden space-y-6" id="ai-executive-briefing-panel">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-4 right-4 text-amber-500 opacity-20 pointer-events-none">
        <Sparkles className="w-48 h-48 stroke-[0.5]" />
      </div>

      {/* Title & Stats indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/15 rounded-2xl border border-amber-500/25 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight flex items-center gap-1.5 font-sans">
              Plato AI Executive Briefing
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                Live GenAI V4
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Auto-analyzing 12,480 students across Dubai, Al Qusais & Sharjah cohorts</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerReset}
            disabled={loading}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-750 text-slate-350 rounded-xl transition-all font-mono text-[10px] font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${loading ? "animate-spin" : ""}`} />
            Re-Audit Cores
          </button>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            KHDA Compliant
          </div>
        </div>
      </div>

      {/* Main Grid: Insights (Left) & Recommended Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left: Dynamic Generative Insights */}
        <div className="lg:col-span-7 space-y-3.5">
          <h3 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Real-Time Cohort Diagnostics
          </h3>
          
          <div className="space-y-2.5">
            {insights.map((insight) => (
              <div 
                key={insight.id}
                className="p-3.5 bg-slate-950/70 border border-slate-850 hover:bg-slate-950 hover:border-slate-800 rounded-2xl transition-all duration-200 group flex items-start gap-3 text-left"
              >
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  insight.trend === "up" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "bg-rose-500/10 text-rose-500"
                }`}>
                  {insight.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase bg-slate-900 border border-white/[0.03] px-2 py-0.2 rounded text-slate-450">
                      {insight.category}
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-500">
                      Impact Force: <strong className="text-slate-350">{insight.impactScore}%</strong>
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-200 leading-relaxed font-sans font-medium">
                    {insight.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Smart Recommendations & Ask AI Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              Strategic Next Actions
            </h3>

            <div className="space-y-2">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 bg-slate-900/50 border border-slate-850 hover:border-slate-800 rounded-xl transition-all flex items-center justify-between gap-3 text-left group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                        rec.priority === "Critical" 
                          ? "bg-rose-500/20 text-rose-450 border border-rose-500/20" 
                          : rec.priority === "Medium"
                          ? "bg-amber-500/20 text-amber-405 border border-amber-500/20"
                          : "bg-emerald-500/20 text-emerald-450 border border-emerald-500/20"
                      }`}>
                        {rec.priority}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono font-medium">{rec.team}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-bold group-hover:text-white transition-colors">
                      {rec.action}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="bg-slate-950 text-amber-400 border border-slate-800 px-2 py-1 rounded text-[10px] font-black font-mono">
                      {rec.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Ask Plato AI console */}
          <div className="border border-slate-850 bg-slate-950/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkle className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-[10px] font-extrabold text-slate-200 tracking-wider uppercase font-mono">
                Direct Platonian AI Query Console
              </p>
            </div>
            
            <form onSubmit={handleAskAI} className="flex gap-2">
              <input
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                placeholder="Ask e.g. 'Project expected revenue' or 'A-Level gaps'..."
                className="flex-1 bg-slate-900 border border-slate-800 text-xs font-bold text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1.5 animate-fade-in text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase font-mono">Response Summary</span>
                </div>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans font-medium">
                  {aiResponse}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
