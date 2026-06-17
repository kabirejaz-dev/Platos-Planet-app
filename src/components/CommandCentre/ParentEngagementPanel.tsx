import React from "react";
import { 
  Users, Calendar, ThumbsUp, HelpCircle, PhoneCall, 
  Sparkles, MessageSquare, AlertCircle, Heart, Star 
} from "lucide-react";

export default function ParentEngagementPanel({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const metrics = [
    { label: "Parent Mobile App Usage", value: "9,120 active DAU", detail: "92% global registration rate" },
    { label: "PTM Meetings requested", value: "84 slots open", detail: "Averages 18m slots" },
    { label: "Digital Fee Payments", value: "78% checkout share", detail: "Stripe/ApplePay core channel" },
    { label: "Parent Satisfaction Index", value: "4.85 / 5.0", detail: "Highly satisfied cohort" },
    { label: "Open Parent Requests", value: "12 pending tickets", detail: "SLA response time: under 3 hours" }
  ];

  const parentRequests = [
    { id: "pr1", parent: "Parent 1", student: "Student 1 (Grade 11 CBSE)", type: "Schedule Change", time: "18 mins ago", desc: "Requesting math session shift to evening block due to transport latency.", priority: "High" },
    { id: "pr2", parent: "Parent 4", student: "Student 12 (Grade 9 IGCSE)", type: "Billing Query", time: "1 hour ago", desc: "Inquiring about summer scholarship enrollment benefits.", priority: "Medium" },
    { id: "pr3", parent: "Parent 8", student: "Student 8 (Grade 10 IGCSE)", type: "Progress Report", time: "3 hours ago", desc: "Requesting teacher Teacher 1 call regarding syllabus mock progress.", priority: "High" }
  ];

  const handleResolve = (id: string, parentName: string) => {
    onTriggerNotification(
      `✅ Parent SLA Resolved`,
      `Secure communication channel initiated with ${parentName}. Ticket resolved successfully.`
    );
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-6 animate-fade-in" id="parent-engagement-dashboard">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Users className="w-5 h-5 text-amber-500" />
            Parent Engagement & App Dashboard
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Tracking parent app usage, open meeting requests, and digital payment checkout metrics</p>
        </div>

        <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          92.4% Parent Retention Index
        </span>
      </div>

      {/* Grid: Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div 
            key={m.label}
            className="p-4 bg-slate-950/45 border border-slate-850 rounded-2xl space-y-1.5 text-left"
          >
            <p className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase leading-relaxed">
              {m.label}
            </p>
            <p className="text-base sm:text-lg font-black text-white">
              {m.value}
            </p>
            <p className="text-[9.5px] text-slate-505 font-medium leading-none">
              {m.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Open Requests Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">
            Active Open Parent Requests (SLA Feed)
          </h4>
          <span className="text-[9.5px] font-mono text-slate-500 animate-pulse">3 HIGH PRIORITIES</span>
        </div>

        <div className="space-y-3">
          {parentRequests.map((req) => (
            <div 
              key={req.id}
              className="p-4 bg-slate-950/65 border border-slate-850 hover:border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-left"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-white">{req.parent}</span>
                  <span className="text-[9.5px] text-slate-400 font-mono">({req.student})</span>
                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase font-mono rounded ${
                    req.priority === "High" ? "bg-rose-500/20 text-rose-450 border border-rose-500/25" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {req.priority} Priority
                  </span>
                  <span className="text-[8.5px] text-slate-500 font-mono ml-auto md:ml-0">{req.time}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  <strong>[{req.type}]</strong> {req.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 justify-end">
                <button
                  onClick={() => handleResolve(req.id, req.parent)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10.5px] font-black rounded-lg transition-colors cursor-pointer"
                >
                  Resolve Parent Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
