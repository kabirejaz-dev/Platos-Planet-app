import React from "react";
import { 
  Crown, Sparkles, UserPlus, Home, UserCheck, 
  Megaphone, FileBarChart, Sparkle, Globe, Clock,
  ChevronRight, Laptop, Server, AppWindow, ShieldAlert 
} from "lucide-react";
export type RoleType = 
  | "Super Admin" 
  | "Branch Admin" 
  | "Sales" 
  | "Teacher" 
  | "Student" 
  | "Parent" 
  | "Academic Coordinator"
  | "Finance Manager";

interface ExecutiveHeaderProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
  onTriggerActionModal: (actionName: string) => void;
}

export default function ExecutiveHeader({
  currentRole,
  onRoleChange,
  theme,
  onTriggerNotification,
  onTriggerActionModal
}: ExecutiveHeaderProps) {
  const roles: { id: RoleType; label: string; icon: string; desc: string }[] = [
    { id: "Super Admin", label: "Executive Admin", icon: "👑", desc: "Global Control & SaaS Operations" },
    { id: "Branch Admin", label: "Branch Manager", icon: "🏢", desc: "Single Branch Infrastructure" },
    { id: "Sales", label: "Admissions VP", icon: "💼", desc: "CRM Sales & Funnel Metrics" },
    { id: "Teacher", label: "Educator Pro", icon: "🎓", desc: "Analytics & Grade Sheets" },
    { id: "Academic Coordinator", label: "Academic Coord", icon: "📋", desc: "Syllabus Tracking & Milestones" },
    { id: "Finance Manager", label: "Finance CFO", icon: "💰", desc: "Fees, Ledger & Projections" },
    { id: "Student", label: "Student Hub", icon: "✏️", desc: "Tutor & Gamified Learning" },
    { id: "Parent", label: "Parent Portal", icon: "👨‍👩‍👧", desc: "Engagement & Fee Balances" }
  ];

  const quickActions = [
    { name: "New Enrollment", icon: <UserPlus className="w-4 h-4" />, color: "from-teal-500 to-emerald-600", desc: "Register fresh students digitally", slug: "enroll" },
    { name: "Create Branch", icon: <Home className="w-4 h-4" />, color: "from-blue-500 to-indigo-600", desc: "Open new UAE/GCC academy node", slug: "branch" },
    { name: "Add Teacher", icon: <UserCheck className="w-4 h-4" />, color: "from-violet-500 to-purple-600", desc: "Onboard academic specialists", slug: "teacher" },
    { name: "Create Campaign", icon: <Sparkle className="w-4 h-4" />, color: "from-pink-500 to-rose-600", desc: "Launch direct-to-WhatsApp ads", slug: "campaign" },
    { name: "Generate Report", icon: <FileBarChart className="w-4 h-4" />, color: "from-amber-500 to-orange-600", desc: "In-depth KHDA audit PDF", slug: "report" },
    { name: "Broadcast Announcement", icon: <Megaphone className="w-4 h-4" />, color: "from-red-500 to-pink-600", desc: "Push notification to parents", slug: "broadcast" }
  ];

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handleActionClick = (action: typeof quickActions[0]) => {
    onTriggerNotification(
      `⚡ Command Active: ${action.name}`,
      `Initializing executive tool workspace for creating a: ${action.name.toLowerCase()}`
    );
    onTriggerActionModal(action.slug);
  };

  return (
    <div className="space-y-6" id="executive-header-section">
      {/* Upper Grid: Welcome Card & Segmented Role Switcher */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-900/45 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic Welcome Unit */}
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-wider font-mono flex items-center gap-1.5 animate-pulse">
              <Globe className="w-3 h-3" />
              <span>Plato UAE Live Control Room</span>
            </div>
            <div className="text-[10px] text-slate-450 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Good Morning, Sayed
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
            </h1>
            <p className="text-slate-400 text-xs mt-0.5 font-medium leading-relaxed max-w-lg">
              Plato's Planet Global Command Centre is calibrated. You are managing all branches, students, teachers, and growth operations.
            </p>
          </div>
        </div>

        {/* Ultimate Workspace Sandbox Simulator Widget */}
        <div className="xl:text-right shrink-0 z-10 self-start xl:self-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 max-w-md w-full xl:w-auto">
          <div className="flex items-center justify-between xl:justify-end gap-3 mb-2.5">
            <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-mono flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              Active Control Context
            </span>
            <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
              Fully Authorized
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2 bg-slate-900/50 rounded-xl border border-white/[0.02]">
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">Multi-Branch Grid</p>
              <p className="text-xs text-slate-200 font-black mt-0.5">5 ACTIVE CORES</p>
            </div>
            <div className="p-2 bg-slate-900/50 rounded-xl border border-white/[0.02]">
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">System Latency</p>
              <p className="text-xs text-rose-450 font-black mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                12 ms (Realtime)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Workspace Selector - Segmented Control Slider Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
            Executive Control Context Switcher
          </p>
          <span className="text-[10px] text-slate-500 font-mono">
            Click roles below to alternate complete platform simulation views
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-900/30 p-2 rounded-2xl border border-slate-850">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onRoleChange(r.id)}
                className={`relative group px-1 text-center py-2.5 rounded-xl transition-all duration-300 font-sans cursor-pointer overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/60 shadow-[0_4px_20px_-3px_rgba(245,158,11,0.2)]" 
                    : "bg-slate-950/20 border border-slate-850/60 hover:bg-slate-800/40 hover:border-slate-800"
                }`}
              >
                {/* Visual marker inside buttons */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 rounded-full" />
                )}
                <div className="text-lg mb-1">{r.icon}</div>
                <p className={`text-[11px] font-extrabold ${isActive ? "text-amber-400" : "text-slate-350"}`}>
                  {r.label}
                </p>
                <p className="text-[8.5px] text-slate-500 font-medium tracking-tight truncate px-1 mt-0.5">
                  {r.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Global Quick Actions Section */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
          Executive Workspace Quick Actions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {quickActions.map((action) => (
            <button
              key={action.name}
              onClick={() => handleActionClick(action)}
              className="group p-4 bg-slate-900/40 border border-slate-850 hover:border-amber-500/50 hover:bg-slate-900/80 rounded-2xl transition-all duration-250 text-left cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden"
            >
              {/* Subtle hover backglow */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-amber-500/5 group-hover:bg-amber-500/10 rounded-full blur-xl transition-all duration-500" />
              
              <div className="flex items-center justify-between">
                <div className={`p-2 bg-gradient-to-br ${action.color} text-white rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-amber-500 font-mono font-black flex items-center gap-0.5">
                  RUN <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-slate-100 group-hover:text-amber-400 transition-colors">
                  {action.name}
                </p>
                <p className="text-[9.5px] text-slate-450 mt-0.5 font-medium leading-relaxed tracking-tight">
                  {action.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
