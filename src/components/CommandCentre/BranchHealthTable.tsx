import React, { useState } from "react";
import { 
  MapPin, ShieldAlert, Users, MessageSquareCode, 
  Settings, ChevronRight, CheckCircle2, MessageSquare, ExternalLink,
  ChevronDown, Search
} from "lucide-react";
import { useGlobalAction } from "../GlobalActionContext";

interface BranchData {
  id: string;
  name: string;
  students: number;
  teachers: number;
  revenue: string;
  occupancy: number; // percentage
  satisfaction: number; // percentage
  riskScore: "Healthy" | "Monitor" | "Needs Attention";
  manager: string;
  phone?: string;
}

export default function BranchHealthTable({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Healthy" | "Monitor" | "Needs Attention">("All");

  const { branches: globalBranches, openModal } = useGlobalAction();

  const branches: BranchData[] = globalBranches.map((gb, i) => ({
    id: gb.id,
    name: gb.name,
    students: gb.studentsCount || (2350 - i * 150),
    teachers: 42 + (i * 12),
    revenue: gb.revenue || "AED 180,000",
    occupancy: Math.max(64, 91 - (i * 6)),
    satisfaction: Math.max(74, 94 - (i * 2)),
    riskScore: gb.health as any,
    manager: gb.manager,
    phone: gb.phone
  }));

  const getStatusStyle = (status: BranchData["riskScore"]) => {
    switch (status) {
      case "Healthy":
        return { text: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: "🟢 Healthy" };
      case "Monitor":
        return { text: "text-amber-500 bg-amber-500/10 border-amber-550/20", icon: "🟡 Monitor" };
      case "Needs Attention":
        return { text: "text-rose-500 bg-rose-500/10 border-rose-550/20", icon: "🔴 Needs Attention" };
      default:
        return { text: "text-slate-400 bg-slate-500/10 border-slate-500/20", icon: "⚪ Offline" };
    }
  };

  const filteredBranches = branches.filter(b => activeTab === "All" || b.riskScore === activeTab);

  const handleMessageSubmit = (branchName: string, manager: string) => {
    if (!messageText.trim()) return;
    onTriggerNotification(
      `📬 Message Dispatched`,
      `Message secure-routed to ${manager} (Manager, ${branchName}): "${messageText}"`
    );
    setMessageText("");
    setActiveBranchId(null);
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-4" id="multi-branch-command-centre">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <MapPin className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
            Multi-Branch Command Centre & GCC Grid
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Automated structural metrics monitoring 5 critical locations across UAE</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(["All", "Healthy", "Monitor", "Needs Attention"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-[9.5px] font-black transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-amber-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-2xl border border-slate-850/80">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-955 border-b border-slate-850 text-slate-400 font-mono tracking-wider font-extrabold text-[9.5px] uppercase">
              <th className="p-4">Branch Description</th>
              <th className="p-4">Active Students</th>
              <th className="p-4">Faculty Strength</th>
              <th className="p-4">Realized Rev</th>
              <th className="p-4">Class Occupancy</th>
              <th className="p-4">NPS Rating</th>
              <th className="p-4">Risk Audit</th>
              <th className="p-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-855 text-slate-205">
            {filteredBranches.map((branch) => {
              const status = getStatusStyle(branch.riskScore);
              return (
                <React.Fragment key={branch.id}>
                  <tr 
                    onClick={() => openModal("SUPER_ADMIN_VIEW_BRANCH", branch)}
                    className="hover:bg-slate-900/60 transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-bold text-white flex items-center gap-2 font-sans">
                      <div className="p-1 px-1.5 bg-slate-950 rounded border border-white/[0.04] text-[10px] text-amber-500 font-mono">
                        {branch.id.toUpperCase()}
                      </div>
                      <div>
                        <span>{branch.name}</span>
                        <p className="text-[9.5px] text-slate-500 font-normal mt-0.5">Manager: {branch.manager}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold leading-none">{branch.students.toLocaleString()} <span className="text-[9px] text-slate-500 font-normal">Registered</span></td>
                    <td className="p-4 font-mono font-bold leading-none">{branch.teachers} <span className="text-[9px] text-slate-500 font-normal">Specialists</span></td>
                    <td className="p-4 font-mono font-extrabold text-amber-400 leading-none">{branch.revenue}</td>
                    <td className="p-4 leading-none">
                      <div className="flex items-center gap-1.5 font-mono font-bold">
                        <span>{branch.occupancy}%</span>
                        <div className="w-12 h-1 bg-slate-950 rounded-full overflow-hidden">
                          <div className={`h-full ${branch.occupancy > 80 ? "bg-emerald-500" : "bg-amber-550"}`} style={{ width: `${branch.occupancy}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-pink-400">{branch.satisfaction}%</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase font-mono rounded-lg border ${status.text}`}>
                        {status.icon}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => {
                          openModal("SUPER_ADMIN_VIEW_BRANCH", branch);
                        }}
                        className="p-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all text-[10px] font-bold cursor-pointer"
                        title="Audit Report"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => {
                          setActiveBranchId(activeBranchId === branch.id ? null : branch.id);
                        }}
                        className="p-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-amber-550 hover:text-amber-400 rounded-lg transition-all text-[10px] font-bold cursor-pointer"
                        title="Secure Message Manager"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  {/* Messaging Drawer Drawer */}
                  {activeBranchId === branch.id && (
                    <tr>
                      <td colSpan={8} className="p-4 bg-slate-950/60 border-t border-b border-amber-500/20">
                        <div className="space-y-2.5 max-w-xl text-left">
                          <div className="flex items-center gap-2">
                            <MessageSquareCode className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] font-bold text-slate-350 uppercase font-mono">
                              Secure Terminal with {branch.manager} ({branch.name})
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              placeholder={`Type message e.g. 'Please contact parent Fatma bin Saeed regarding outstanding balances' ...`}
                              className="flex-1 bg-slate-900 border border-slate-800 text-xs text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500 placeholder-slate-550 font-sans"
                            />
                            <button
                              onClick={() => handleMessageSubmit(branch.name, branch.manager)}
                              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                            >
                              Dispatch
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
