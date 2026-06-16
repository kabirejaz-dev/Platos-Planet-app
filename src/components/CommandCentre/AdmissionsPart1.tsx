import React from "react";
import { Sparkles, ShieldCheck, TrendingUp, TrendingDown, Users, Phone, ArrowUpRight, DollarSign, Calendar, Target, Award, Play } from "lucide-react";
import { Lead } from "./AdmissionsTypes";

interface AISalesCopilotProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
  onQuickAction: (actionType: string) => void;
}

export function AISalesCopilot({ theme, onTriggerNotification, onQuickAction }: AISalesCopilotProps) {
  const insights = [
    { text: "17 leads are highly active and likely to convert this week.", type: "conversion" },
    { text: "Physics trial classes yield a 41% higher enrollment conversion rate.", type: "curriculum" },
    { text: "Al Furjan branch conversion has dipped 8% below target threshold.", type: "branch" },
    { text: "12 hot prospects (>90 lead score) are idling with no pending actions.", type: "followup" },
    { text: "AED 98,000 in expected enrollment revenue is ready for immediate weekly close.", type: "revenue" }
  ];

  return (
    <div 
      className={`border rounded-3xl p-6 relative overflow-hidden transition-all duration-350 shadow-xl ${
        theme === "light" 
          ? "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/60 text-slate-950" 
          : "bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 border-slate-800/80 text-white"
      }`}
    >
      {/* Decorative ambient glowing backdrops for mission control vibe */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-gradient-to-tr from-amber-500/5 to-transparent blur-2xl rounded-full pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 relative z-10">
        
        {/* Left Side: Generative Copilot Stats & Insights List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-md animate-pulse">
              <Sparkles className="w-5 h-5 font-black" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-500 font-mono tracking-widest block">GENAI ASSISTANT SYSTEM</span>
              <h2 className="text-xl font-black tracking-tight font-sans mt-0.5">Plato AI Admissions Copilot</h2>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-medium max-w-2xl leading-relaxed">
            Real-time neural signals analyzing counselor touchpoints, trial class records, and parent chat transcripts across all Dubai campuses.
          </p>

          <div className="space-y-2.5 max-w-3xl">
            {insights.map((insight, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 transition-all hover:translate-x-1 duration-200 cursor-pointer ${
                  theme === "light"
                    ? "bg-white/70 border-slate-100 hover:bg-white shadow-sm text-slate-800"
                    : "bg-slate-900/50 border-slate-850/60 hover:bg-slate-900 hover:border-slate-800 text-slate-300"
                }`}
                onClick={() => {
                  onTriggerNotification(
                    "🤖 Copilot Context Loaded",
                    `Loading specific cohort segment guidelines and action metrics details matching: "${insight.text.substring(0, 36)}..."`
                  );
                }}
              >
                <span className="text-base select-none mt-0.5">✨</span>
                <p className="leading-relaxed font-medium">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Categorized Prioritized Quick Actions Dashboard Panel */}
        <div 
          className={`w-full lg:w-80 shrink-0 p-5 rounded-2xl border ${
            theme === "light"
              ? "bg-white border-slate-200/50 shadow-md"
              : "bg-slate-950/80 border-slate-800/80 shadow-2xl"
          }`}
        >
          <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase font-mono mb-4 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-500" /> Priorities Matrix
          </h3>

          <div className="space-y-3.5">
            {/* Critical Task */}
            <div className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping mt-1.5 shrink-0" />
              <div>
                <p className="text-[10px] font-mono leading-none tracking-wider text-rose-500 font-bold uppercase">CRITICAL ACTION</p>
                <p className="text-[11px] font-bold text-slate-300 mt-1 leading-snug">Address Al Furjan's 18% trial attendance decline immediately.</p>
              </div>
            </div>

            {/* High Priority */}
            <div className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-[10px] font-mono leading-none tracking-wider text-amber-500 font-bold uppercase">HIGH PRIORITY</p>
                <p className="text-[11px] font-bold text-slate-300 mt-1 leading-snug">Execute call schedules for 12 idle prospects &gt;90 tracker scores.</p>
              </div>
            </div>

            {/* Opportunity */}
            <div className="flex gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-[10px] font-mono leading-none tracking-wider text-emerald-500 font-bold uppercase">OPPORTUNITY</p>
                <p className="text-[11px] font-bold text-slate-300 mt-1 leading-snug">Reroute CBSE science leads to newly booked British Trial formats.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 my-5 pt-4 space-y-2.5">
            <button 
              onClick={() => onQuickAction("call")}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
            >
              <Phone className="w-3.5 h-3.5 fill-current" /> Call Leads
            </button>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold uppercase">
              <button 
                onClick={() => onQuickAction("hot")}
                className="py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 hover:text-white transition-all text-slate-300 cursor-pointer"
              >
                Hot Prospects
              </button>
              <button 
                onClick={() => onQuickAction("campaign")}
                className="py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 hover:text-white transition-all text-slate-300 cursor-pointer"
              >
                Campaigns
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

interface SalesKPIGridProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
  metrics: {
    leadsCount: number;
    newTodayCount: number;
    trialsCount: number;
    enrollsCount: number;
    conversionRate: number;
    pipelineVolume: number;
    closedRevenue: number;
    followupsDue: number;
  };
}

export function SalesKPIGrid({ theme, onTriggerNotification, metrics }: SalesKPIGridProps) {
  const cards = [
    {
      title: "Admissions Leads",
      value: metrics.leadsCount.toLocaleString(),
      sub: `+${metrics.newTodayCount} New Today`,
      subColor: "text-emerald-400 bg-emerald-500/10",
      comparison: "vs last month: +18.4%",
      isPositive: true,
      category: "Leads Stack",
      icon: <Users className="w-5 h-5 text-sky-400" />
    },
    {
      title: "Trials Booked",
      value: metrics.trialsCount.toString(),
      sub: "89 Target",
      subColor: "text-amber-400 bg-amber-500/15",
      comparison: "Attended target: 82%",
      isPositive: true,
      category: "Active Demos",
      icon: <Calendar className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Enrolled Students",
      value: metrics.enrollsCount.toString(),
      sub: "+5 this week",
      subColor: "text-emerald-500 bg-emerald-500/10",
      comparison: "Average value: AED 8,500",
      isPositive: true,
      category: "Admitted Cohort",
      icon: <Award className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Conversion Rate",
      value: `${metrics.conversionRate}%`,
      sub: "Industry Peak: 24%",
      subColor: "text-emerald-450 bg-emerald-500/10",
      comparison: "Admissions progress +4.2%",
      isPositive: true,
      category: "Admitted Ratio",
      icon: <Target className="w-5 h-5 text-rose-400" />
    },
    {
      title: "Revenue Pipeline",
      value: `AED ${(metrics.pipelineVolume / 1000000).toFixed(1)}M`,
      sub: "Active Forecast",
      subColor: "text-violet-400 bg-violet-500/10",
      comparison: "Weighted closes this week",
      isPositive: true,
      category: "Sales Forecast",
      icon: <DollarSign className="w-5 h-5 text-violet-400" />
    },
    {
      title: "Closed Revenue",
      value: `AED ${(metrics.closedRevenue / 1000000).toFixed(1)}M`,
      sub: "AED 8M Target Achieved",
      subColor: "text-amber-500 bg-amber-500/10",
      comparison: "Direct admissions core keys",
      isPositive: true,
      category: "Admitted Capital",
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Follow-Ups Backlog",
      value: metrics.followupsDue.toString(),
      sub: "64 Outstanding",
      subColor: "text-rose-450 bg-rose-500/10",
      comparison: "Time backlog: ~1 hour",
      isPositive: false,
      category: "Outstanding Tasks",
      icon: <Phone className="w-5 h-5 text-rose-400 animate-bounce" />
    }
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">
          Executive Admissions Stats
        </h4>
        <div className="text-[9px] font-mono font-bold text-slate-500 uppercase">
          LIVESTREAMING ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div 
            key={idx}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-pointer ${
              theme === "light"
                ? "bg-white border-slate-200/60 shadow-sm"
                : "bg-slate-900/40 border-slate-850/80 shadow-md hover:border-slate-800"
            }`}
            onClick={() => {
              onTriggerNotification(
                `📊 Stat Detail: ${card.title}`,
                `Loaded historic performance sheets and database matching ${card.value} occurrences.`
              );
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block">
                {card.category}
              </span>
              <div className="p-2 bg-slate-950/40 border border-slate-850 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                {card.icon}
              </div>
            </div>

            <div className="mt-3.5 space-y-1">
              <h3 className="text-2xl font-black text-white leading-none tracking-tight font-sans">
                {card.value}
              </h3>
              <p className="text-xs font-semibold text-slate-400 leading-none">
                {card.title}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/[0.03] flex items-center justify-between gap-1.5 text-[10px] font-bold font-mono">
              <span className="text-slate-550 leading-none">
                {card.comparison}
              </span>
              <span className={`px-2 py-0.5 rounded leading-none ${card.subColor}`}>
                {card.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
