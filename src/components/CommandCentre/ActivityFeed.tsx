import React, { useState } from "react";
import { 
  Bell, CheckCircle2, UserPlus, DollarSign, 
  HelpCircle, AlertTriangle, Calendar, RefreshCw 
} from "lucide-react";
import { getStoredPlatosPlanetConfig } from "../../platosPlanetConfig";

interface ActivityItem {
  id: string;
  type: "Enrollment" | "Payment" | "Faculty Alert" | "PTM Request" | "CRM Inbound";
  title: string;
  desc: string;
  timestamp: string;
  branch: string;
  isRead: boolean;
}

export default function ActivityFeed({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;

  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: "act1", type: "Enrollment", title: "New student enrolled", desc: "Student 1 has completed registration for the IGCSE Chemistry Master batch.", timestamp: "2 mins ago", branch: branches[0] || "Main Branch", isRead: false },
    { id: "act2", type: "Payment", title: "Fee payment received", desc: "AED 12,400 successfully collected via Apple Pay for batch tuition fees.", timestamp: "12 mins ago", branch: "Online Campus", isRead: false },
    { id: "act3", type: "Faculty Alert", title: "Teacher absent substitute designated", desc: "Teacher 1 substitute approved for Algebra Block B Tuesdays.", timestamp: "45 mins ago", branch: branches[0] || "Main Branch", isRead: true },
    { id: "act4", type: "PTM Request", title: "Parent meeting requested", desc: "Parent of Student 6 requested an evening Zoom sync regarding biology mock exam grades.", timestamp: "1 hour ago", branch: branches[1] || "Online Campus", isRead: false },
    { id: "act5", type: "CRM Inbound", title: "New high-ROI WhatsApp lead created", desc: "Inbound campaign target score: 94%. Assigned instantly to local sales coordinators.", timestamp: "2 hours ago", branch: "Online Campus", isRead: true }
  ]);

  const handleMarkAsRead = (id: string, title: string) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
    onTriggerNotification("🔔 Notification Acknowledged", `Marked event "${title}" as audited.`);
  };

  const handleMarkAllRead = () => {
    setActivities(prev => prev.map(a => ({ ...a, isRead: true })));
    onTriggerNotification("🔔 Batch Clearance Complete", "Marked all open executive notifications as read.");
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-4 animate-fade-in" id="notification-centre-feed">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Bell className="w-5 h-5 text-amber-500 animate-swing" />
            Executive Security Notification Centre
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Real-time log registry showing multi-campus administrative actions</p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-3 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white rounded-xl text-[9.5px] font-bold font-mono transition-all cursor-pointer"
        >
          Clear All Logs
        </button>
      </div>

      {/* Feed list */}
      <div className="space-y-3">
        {activities.map((act) => (
          <div 
            key={act.id}
            className={`p-3.5 bg-slate-955/60 border rounded-2xl flex items-start gap-3.5 transition-all text-left group ${
              act.isRead ? "border-slate-850 opacity-70" : "border-slate-800 bg-slate-900/40 shadow-md"
            }`}
          >
            {/* Type Icon indicator */}
            <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              act.type === "Enrollment" ? "bg-emerald-500/10 text-emerald-400" :
              act.type === "Payment" ? "bg-amber-500/10 text-amber-500" :
              act.type === "Faculty Alert" ? "bg-rose-500/10 text-rose-500" :
              act.type === "PTM Request" ? "bg-purple-500/10 text-purple-400" :
              "bg-blue-500/10 text-blue-400"
            }`}>
              {act.type === "Enrollment" ? <UserPlus className="w-4 h-4" /> :
               act.type === "Payment" ? <DollarSign className="w-4 h-4" /> :
               act.type === "Faculty Alert" ? <AlertTriangle className="w-4 h-4" /> :
               <Bell className="w-4 h-4" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase bg-slate-900 border border-white/[0.03] px-2 py-0.2 rounded text-slate-400 leading-none">
                  {act.type} • {act.branch}
                </span>
                <span className="text-[9.5px] font-mono text-slate-500">{act.timestamp}</span>
              </div>
              <h4 className="text-xs font-black text-white">{act.title}</h4>
              <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-medium">
                {act.desc}
              </p>
            </div>

            {/* Read action toggle button button */}
            {!act.isRead && (
              <button
                onClick={() => handleMarkAsRead(act.id, act.title)}
                className="p-1 px-2.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 rounded-lg text-[9px] font-black font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer"
              >
                Mark Audited
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
