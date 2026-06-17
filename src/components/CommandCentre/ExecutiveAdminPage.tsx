import React, { useState } from "react";
import { 
  Users, UserCheck, Shield, Clipboard, FileText, CheckCircle2, AlertCircle, 
  Trash2, RefreshCw, Layers, Sparkles, Building 
} from "lucide-react";
import KPIGrid from "./KPIGrid";
import BranchHealthTable from "./BranchHealthTable";
import ExecutiveAnalytics from "./ExecutiveAnalytics";

interface ExecutiveAdminPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  status: "Active" | "Suspended";
}

export default function ExecutiveAdminPage({ theme, onTriggerNotification }: ExecutiveAdminPageProps) {
  // 1. User Management State
  const [users, setUsers] = useState<UserRecord[]>([
    { id: "u-1", name: "Admin 1", email: "admin1@platosplanet.com", role: "Super Admin", branch: "All Branches", status: "Active" },
    { id: "u-2", name: "Teacher 1", email: "teacher1@platosplanet.com", role: "Educator", branch: "Main Branch", status: "Active" },
    { id: "u-3", name: "Manager 1", email: "manager1@platosplanet.com", role: "Branch Manager", branch: "Main Branch", status: "Active" },
    { id: "u-4", name: "Parent 2", email: "parent2@gmail.com", role: "Parent", branch: "Online Campus", status: "Active" },
    { id: "u-5", name: "Student 1", email: "student1@gmail.com", role: "Student", branch: "Main Branch", status: "Active" }
  ]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Educator");
  const [newUserBranch, setNewUserBranch] = useState("Main Branch");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser: UserRecord = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      branch: newUserBranch,
      status: "Active"
    };
    setUsers(prev => [...prev, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    onTriggerNotification("👤 User Registered", `Successfully added ${newUserName} as an active ${newUserRole}.`);
  };

  const handleToggleUserStatus = (id: string, name: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        onTriggerNotification("👤 Security Updated", `User ${name} has been set to ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string, name: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    onTriggerNotification("🗑️ Account Deallocated", `Removed ${name} from regional security groups.`);
  };

  // 2. Go-Live Readiness State
  const [readinessTasks, setReadinessTasks] = useState([
    { id: "rl-1", task: "Regional payment gateway synchronization with Stripe MEA", done: true, priority: "Critical" },
    { id: "rl-2", task: "Dubai KHDA school-board syllabus standard verification", done: true, priority: "High" },
    { id: "rl-3", task: "Teacher training workshops for Plato V3 AI Lesson Composer", done: false, priority: "High" },
    { id: "rl-4", task: "Verify SMS & WhatsApp regional outreach templates", done: true, priority: "Medium" },
    { id: "rl-5", task: "Backup cloud database mirroring setups (GCC East Core)", done: false, priority: "Critical" }
  ]);

  const handleToggleReadiness = (id: string) => {
    setReadinessTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = !t.done;
        return { ...t, done: nextStatus };
      }
      return t;
    }));
    onTriggerNotification("📋 Progress Logged", "Readiness matrix updated dynamically.");
  };

  const completedCount = readinessTasks.filter(t => t.done).length;
  const readinessPercentage = Math.round((completedCount / readinessTasks.length) * 100);

  // 3. System Logs / Audit Log List
  const [auditLogs, setAuditLogs] = useState([
    { time: "09:35:12", event: "Admin Sayed Ahmad approved Middle East revenue ledger", category: "Auth" },
    { time: "09:22:04", event: "Teacher richard.f generated Electromagnetism past-paper challenge", category: "AI Module" },
    { time: "08:50:11", event: "Parent Portal synchronization with Main Branch complete", category: "System" },
    { time: "08:12:45", event: "New lead 'Mia Peterson' generated via active TikTok campaign", category: "Sales" }
  ]);

  const handleTriggerManualAudit = () => {
    const freshLog = {
      time: new Date().toLocaleTimeString(),
      event: "Manual diagnostic system audit dispatched by Executive Admin",
      category: "Audit"
    };
    setAuditLogs(prev => [freshLog, ...prev]);
    onTriggerNotification("🛡️ System Audit Completed", "Checked memory stacks and API routes. latency is pristine.");
  };

  return (
    <div className="space-y-8 animate-fade-in text-left select-none">
      
      {/* Upper Overview Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20 animate-pulse" />
              <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest">
                SUPER EXECUTIVE COMMAND ENVIRONMENT
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">SaaS & Group-Level Diagnostics</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Consolidated operational ledger for Group Plato. Monitor critical KPIs, security accounts, and regional regulatory compliance.
            </p>
          </div>
          <button 
            onClick={() => onTriggerNotification("📦 Local Backup Completed", "Dispatched full SQLite database transaction dump to regional AWS S3 buckets.")}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-black text-amber-500 uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Force S3 Data Mirrors
          </button>
        </div>
      </div>

      {/* KPI Stats Modules */}
      <KPIGrid theme={theme} onTriggerNotification={onTriggerNotification} />

      {/* Analytics Summary Panels */}
      <ExecutiveAnalytics theme={theme} onTriggerNotification={onTriggerNotification} />

      {/* Branch Health Table Grid */}
      <BranchHealthTable theme={theme} onTriggerNotification={onTriggerNotification} />

      {/* Layout Columns: User Manager & Go-Live readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* User Management Section */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-amber-500">
                👤 Security User & Account Directory
              </h3>
              <p className="text-[10px] text-slate-550 mt-1 leading-snug">Track, allocate, and withdraw portal permissions instantly.</p>
            </div>
            <Users className="w-4.5 h-4.5 text-amber-500" />
          </div>

          <form onSubmit={handleAddUser} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-mono font-black text-slate-550">Full Name</label>
              <input 
                type="text" 
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="E.g. Elon Musk"
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-mono font-black text-slate-550">Email</label>
              <input 
                type="email" 
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="elon@musk.com"
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-mono font-black text-slate-550">Group Role</label>
              <select 
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Branch Manager">Branch Manager</option>
                <option value="Educator">Educator</option>
                <option value="Sales VP">Sales VP</option>
                <option value="Academic Coordinator">Coordinator</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase transition cursor-pointer"
            >
              Add User
            </button>
          </form>

          <div className="space-y-2.5">
            {users.map(u => (
              <div key={u.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-100 text-xs">{u.name}</strong>
                    <span className="text-[8px] px-1 bg-slate-950 border border-slate-800 rounded font-mono text-slate-400 capitalize">{u.role}</span>
                  </div>
                  <span className="text-[10px] text-slate-450 block truncate max-w-sm mt-0.5">{u.email} • {u.branch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleUserStatus(u.id, u.name)}
                    className={`px-2 py-1 border rounded-lg text-[9px] font-bold uppercase transition ${
                      u.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}
                  >
                    {u.status}
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(u.id, u.name)}
                    className="p-1 px-2 border border-slate-800/80 hover:border-rose-500 hover:bg-rose-550/10 rounded-lg text-slate-500 hover:text-rose-500 transition cursor-pointer"
                    title="Delete Account"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Go-Live Readiness Matrix Column (5/12 blocks) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-amber-500">
                🚀 GO-LIVE INTEGRATION CHECKLIST
              </h3>
              <p className="text-[10px] text-slate-550 mt-1 leading-snug">Track remaining deployment checkmarks for GCC.</p>
            </div>
            <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" />
          </div>

          <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-2.5 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xs opacity-5 text-amber-500 font-mono font-black">GCC SYSTEM</div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-450 uppercase font-black">PLATFORM READINESS SCORES</span>
              <span className="text-xs font-mono font-black text-amber-400">{readinessPercentage}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/[0.02]">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {readinessTasks.map(t => (
              <div 
                key={t.id} 
                className={`p-3 bg-slate-903 border rounded-2xl text-left transition-all ${
                  t.done ? "border-amber-500/20 bg-slate-900/40" : "border-slate-850"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <input 
                      type="checkbox" 
                      checked={t.done}
                      onChange={() => handleToggleReadiness(t.id)}
                      className="mt-1 accent-amber-500 cursor-pointer w-3.5 h-3.5"
                    />
                    <div>
                      <span className={`text-[11px] font-sans font-bold leading-relaxed block ${t.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {t.task}
                      </span>
                      <span className={`text-[8px] font-mono uppercase px-1 rounded-md border mt-1 inline-block ${
                        t.priority === "Critical" 
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20 font-black" 
                          : t.priority === "High" 
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                          : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Regional Reports & Audit Trail */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-amber-500">
              📋 GLOBAL COMPLIANCE REPORT CHANNELS
            </h3>
            <p className="text-[10px] text-slate-550 mt-1 leading-snug">Generate instantly audit files according to UAE Regulatory Authorities standards.</p>
          </div>
          <button 
            onClick={handleTriggerManualAudit}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-mono uppercase font-black transition cursor-pointer"
          >
            Audit System Logs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-left space-y-2.5">
            <span className="text-[8px] font-mono text-slate-500 leading-none block font-black">UAE COMPLIANCE REPORT</span>
            <strong className="text-xs text-slate-200 block">CBSE & British Course Equivalency Audits</strong>
            <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">Validates academic syllabus milestones matches standard ministry guidelines.</p>
            <button 
              onClick={() => onTriggerNotification("📥 Audit Generated", "Successfully compiled course equivalency audit PDF. Saved to active report cache.")}
              className="py-1.5 w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] text-slate-400 hover:text-white font-black uppercase rounded-lg transition"
            >
              Compile Audit
            </button>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-left space-y-2.5">
            <span className="text-[8px] font-mono text-slate-500 leading-none block font-black">FISCAL STABILITY LAUNCH</span>
            <strong className="text-xs text-slate-200 block">Q2 Consolidated VAT Audit Logs</strong>
            <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">Consolidated operating invoicing records mapped to country taxation standards.</p>
            <button 
              onClick={() => onTriggerNotification("📥 Invoicing Compiled", "Consolidated GCC Operating revenue streams mapped. VAT breakdown generated.")}
              className="py-1.5 w-full bg-slate-950 hover:bg-slate-900 border border-slate-805 text-[10px] text-slate-400 hover:text-white font-black uppercase rounded-lg transition"
            >
              Export VAT Log
            </button>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-left space-y-2.5">
            <span className="text-[8px] font-mono text-slate-500 leading-none block font-black">FACULTY RATINGS DATA</span>
            <strong className="text-xs text-slate-200 block">Teacher NPS Rating & Milestones PDF</strong>
            <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">Analyzes actual tutoring indices, mock test completion streaks, and parent reviews.</p>
            <button 
              onClick={() => onTriggerNotification("📥 NPS Summary Active", "Exported teacher satisfaction rosters to GCC Education Hub registry.")}
              className="py-1.5 w-full bg-slate-950 hover:bg-slate-900 border border-slate-805 text-[10px] text-slate-400 hover:text-white font-black uppercase rounded-lg transition"
            >
              Sync Roster
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-4 border border-slate-850 rounded-2xl space-y-2 text-left">
          <span className="text-[8px] font-mono text-slate-550 font-black tracking-widest uppercase">REGIONAL METRICS CONTROL STREAM ({auditLogs.length} EVENTS LOGGED)</span>
          <div className="space-y-1.5">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex justify-between items-center text-[10.5px] font-mono border-b border-white/[0.02] pb-1.5 text-slate-400">
                <span className="truncate max-w-[500px]">🛡️ [{log.category}] {log.event}</span>
                <span className="text-slate-500 text-[9.5px] shrink-0 font-bold">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
