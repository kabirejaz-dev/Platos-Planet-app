import React, { useState } from "react";
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  PhoneCall, 
  ArrowUpRight, 
  MessageSquare,
  Sparkle,
  Bookmark,
  CheckCircle,
  Clock,
  Briefcase,
  AlertCircle
} from "lucide-react";
import SalesPipeline from "./SalesPipeline";
import { useGlobalAction } from "../GlobalActionContext";
import { getStoredPlatosPlanetConfig } from "../../platosPlanetConfig";

interface SalesWorkspaceProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function SalesWorkspace({ theme, onTriggerNotification }: SalesWorkspaceProps) {
  const { openModal } = useGlobalAction();
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [followUpDone, setFollowUpDone] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState("Jun 16, 2026");

  // Mock leads list with Lead Score and probable conversion value
  const [hotLeads, setHotLeads] = useState([
    { id: "lead-1", parent: "Fatima Al-Suwaidi", student: "Hamdan Al-Suwaidi", grade: "Grade 11", curriculum: "IGCSE", score: 96, value: "AED 5,800", source: "Meta Ads", status: "New Inquiry" },
    { id: "lead-2", parent: "Dr. Sandeep Kumar", student: "Aarav Kumar", grade: "Grade 9", curriculum: "CBSE", score: 91, value: "AED 3400", source: "Word of Mouth", status: "Trial Scheduled" },
    { id: "lead-3", parent: "Michael Sterling", student: "Chloe Sterling", grade: "Grade 12", curriculum: "A-Level", score: 88, value: "AED 8,620", source: "Google Ads", status: "Follow-Up Pending" },
    { id: "lead-4", parent: "Aisha Al-Haddad", student: "Zayed Al-Haddad", grade: "Grade 10", curriculum: "IGCSE", score: 84, value: "AED 5,800", source: "Website", status: "Counseling Intake" },
  ]);

  const [forecastTimeline, setForecastTimeline] = useState("This Month");

  const calendarEvents = [
    { time: "02:30 PM", client: "Fatima Al-Suwaidi", type: "Admission Counseling", campus: branches[0] || "Main Branch" },
    { time: "04:00 PM", client: "Dr. Sandeep Kumar", type: "Trial Class Checkin", campus: branches[1] || "Online Campus" },
    { time: "05:30 PM", client: "Michael Sterling", type: "Online Feedback Hub", campus: "Online Portal" }
  ];

  const handleFollowUp = (id: string, name: string) => {
    setFollowUpDone(prev => [...prev, id]);
    onTriggerNotification(
      "📞 Call Dispatched",
      `Dialing simulated UAE outreach for parent ${name}. Priority status updated in CRM ledger.`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* AI Admissions Copilot Hero Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-805 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-indigo-505/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 flex-1">
            <span className="text-[9.5px] uppercase font-mono font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full inline-block tracking-wider">
              AI ADMISSIONS COPILOT
            </span>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              <span>Smart Intake Optimizer</span> <span className="text-base text-amber-400">⚡</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Plato's predictive CRM scores organic inquiries in real-time. High-ROI parents are automatically funneled into live counseling trials.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl text-center leading-none w-1/2 md:w-36">
              <span className="text-[8.5px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                Avg Lead Score
              </span>
              <span className="text-base font-black text-emerald-400 block tracking-tight">
                91.4% 🔥
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl text-center leading-none w-1/2 md:w-36">
              <span className="text-[8.5px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                Conversion Pipeline
              </span>
              <span className="text-base font-black text-amber-500 block tracking-tight">
                31.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          CRM Operations:
        </span>
        <button
          onClick={() => openModal("SALES_NEW_LEAD")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="New Lead"
        >
          <span>＋ New Lead</span>
        </button>
        <button
          onClick={() => openModal("SALES_CALL_LEADS")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Call Leads"
        >
          <span>📞 Call Leads</span>
        </button>
        <button
          onClick={() => openModal("SALES_HOT_PROSPECTS")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="View Hot Prospects"
        >
          <span>🔥 Hot Prospects</span>
        </button>
        <button
          onClick={() => openModal("SALES_CAMPAIGN")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Launch Campaign"
        >
          <span>🚀 Launch Campaign</span>
        </button>
        <button
          onClick={() => openModal("SALES_SCHEDULE_TRIAL")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Schedule Trial"
        >
          <span>📆 Schedule Trial</span>
        </button>
      </div>

      {/* Primary KPI Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Active Inquiries", value: "3,892", labelColor: "text-slate-400" },
          { label: "Trials Booked", value: "482", labelColor: "text-indigo-400" },
          { label: "Completed Trials", value: "310", labelColor: "text-emerald-400" },
          { label: "Enrollments", value: "128", labelColor: "text-amber-500" },
          { label: "Target Deficit", value: "AED 34K", labelColor: "text-slate-500" },
          { label: "Pipeline Value", value: "AED 1.8M", labelColor: "text-emerald-400" }
        ].map((item, idx) => (
          <div key={idx} className="p-3.5 bg-slate-950 border border-slate-850 rounded-2xl">
            <span className="text-[8px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">
              {item.label}
            </span>
            <span className="text-base font-black text-slate-100 mt-1 block">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Main CRM Workspace Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Hot Lead Centre (8/12 block) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Hot Leads Feed */}
          <div className="bg-slate-955 border border-slate-850 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Predictive Hot Leads Inbox
                </h3>
                <p className="text-[9px] text-slate-500 mt-0.5">High probability lead prospects with integrated direct UAE messaging actions</p>
              </div>
              <span className="text-[9px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full">
                4 Priority Core Elements
              </span>
            </div>

            <div className="space-y-3">
              {hotLeads.map((lead) => {
                const isCompleted = followUpDone.includes(lead.id);
                return (
                  <div 
                    key={lead.id}
                    className="p-3.5 bg-slate-900/60 border border-slate-855 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 text-left flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-slate-950 border border-slate-800 text-[9.5px] font-black text-emerald-400 font-mono px-2 py-0.5 rounded">
                          ★ {lead.score} Scoring
                        </span>
                        <h4 className="text-[11.5px] font-black text-slate-100">{lead.parent}</h4>
                        <span className="text-[9px] text-slate-550 font-medium">({lead.student} - {lead.grade})</span>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-none">
                        Requested Curriculum: <strong className="text-slate-205">{lead.curriculum}</strong> | Channel Origin: <strong className="text-slate-205">{lead.source}</strong>
                      </p>

                      <div className="flex items-center gap-2 text-[9px] text-slate-500 font-semibold">
                        <span>Intake Potential: <strong className="text-emerald-400">{lead.value}</strong></span>
                        <span>•</span>
                        <span>Stage: <strong className="text-indigo-400">{lead.status}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 md:justify-end">
                      <button
                        onClick={() => handleFollowUp(lead.id, lead.parent)}
                        disabled={isCompleted}
                        className={`p-2 px-3 text-[9px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                          isCompleted
                            ? "bg-slate-850 text-slate-600 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white shadow shadow-indigo-500/10"
                        }`}
                      >
                        <PhoneCall className="w-3 h-3" />
                        {isCompleted ? "Called Logged" : "Outreach Call"}
                      </button>
                      
                      <button
                        onClick={() => onTriggerNotification("💬 Template Sent", `Outreached ${lead.parent} via custom WhatsApp syllabus template.`)}
                        className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                        title="Send WhatsApp Briefing"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Admissions Sales Pipelines */}
          <SalesPipeline theme={theme} onTriggerNotification={onTriggerNotification} />

        </div>

        {/* Right column: Marketing channels & calendars (4/12 block) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Predictive Revenue Forecast */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase block">
                REVENUE CONVERSION FORECAST
              </span>
              <select 
                value={forecastTimeline}
                onChange={(e) => setForecastTimeline(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded p-1 text-[8px] font-bold font-mono outline-none"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
            </div>

            <div className="space-y-1">
              <p className="text-[9.5px] text-slate-500">Predicted intake receipts based on trend compliance models:</p>
              <h4 className="text-xl font-black text-emerald-400">
                {forecastTimeline === "This Week" ? "AED 184,200" : forecastTimeline === "This Month" ? "AED 842,000" : "AED 2.65 Million"}
              </h4>
              <p className="text-[9px] text-slate-400 font-semibold">Projected Conversion Accuracy: 88% confidence</p>
            </div>

            <button
              onClick={() => onTriggerNotification("📈 Forecast Refined", "Re-evaluated pipeline inputs. Target accuracy is updated based on June marketing spend.")}
              className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] uppercase font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" /> Recalculate Funnel Leads
            </button>
          </div>

          {/* Marketing Attribution Tracking */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3">
            <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">
              MARKETING SOURCE ATTRIBUTION
            </h4>

            <div className="space-y-2 text-[10.5px]">
              {[
                { name: "Meta Facebook/Instagram Ads", traffic: "42% of trials", count: "1,634 leads", color: "w-[42%] bg-blue-500" },
                { name: "Google Local Search Ads", traffic: "28% of trials", count: "1,089 leads", color: "w-[28%] bg-emerald-500" },
                { name: "Direct Website Form Intakes", traffic: "18% of trials", count: "700 leads", color: "w-[18%] bg-teal-500" },
                { name: "Referrals & Walk-ins", traffic: "12% of trials", count: "469 leads", color: "w-[12%] bg-amber-500" }
              ].map((src, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-350 text-[9.5px]">
                    <span className="truncate max-w-[170px]">{src.name}</span>
                    <span className="font-mono text-slate-500 mt-0.5">{src.count}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${src.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admissions Calendar Widget */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase">
                ADMISSIONS CRM CALENDAR
              </h4>
              <span className="text-[8.5px] font-mono text-indigo-400 font-extrabold">{activeDate}</span>
            </div>

            <div className="space-y-2">
              {calendarEvents.map((evt, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/60 border border-slate-855 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-mono text-emerald-400 font-black">{evt.time}</span>
                    <span className="text-slate-500">{evt.campus}</span>
                  </div>
                  <h5 className="text-[10px] font-black text-slate-200">{evt.client}</h5>
                  <p className="text-[9px] text-slate-450">{evt.type}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onTriggerNotification("📆 Meeting Scheduled", "Booked a new offline consultation session in calendar.")}
              className="w-full py-2 bg-indigo-505/10 hover:bg-indigo-500/10 border border-slate-800 text-[10px] font-extrabold text-indigo-400 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Diagnostic Consultation
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
