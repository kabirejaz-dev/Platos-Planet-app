import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, HelpCircle, User, 
  MapPin, Globe, Compass, RefreshCw, Send, AlertCircle 
} from "lucide-react";
import { useGlobalAction } from "./GlobalActionContext";

// Import custom high-fidelity executive widgets
import ExecutiveHeader from "./CommandCentre/ExecutiveHeader";
import AIExecutiveBriefing from "./CommandCentre/AIExecutiveBriefing";
import KPIGrid from "./CommandCentre/KPIGrid";
import ExecutiveAnalytics from "./CommandCentre/ExecutiveAnalytics";
import BranchHealthTable from "./CommandCentre/BranchHealthTable";
import StudentSuccessPanel from "./CommandCentre/StudentSuccessPanel";
import TeacherLeaderboard from "./CommandCentre/TeacherLeaderboard";
import SalesPipeline from "./CommandCentre/SalesPipeline";
import FinanceOverview from "./CommandCentre/FinanceOverview";
import ParentEngagementPanel from "./CommandCentre/ParentEngagementPanel";
import AIRiskPanel from "./CommandCentre/AIRiskPanel";
import OperationsCenter from "./CommandCentre/OperationsCenter";
import ActivityFeed from "./CommandCentre/ActivityFeed";
import GlobalSearchBar from "./CommandCentre/GlobalSearchBar";
import OfficialDataSettings from "./CommandCentre/OfficialDataSettings";

// Import separate page components
import ExecutiveAdminPage from "./CommandCentre/ExecutiveAdminPage";
import BranchManagerPage from "./CommandCentre/BranchManagerPage";
import AdmissionsVPPage from "./CommandCentre/AdmissionsVPPage";
import EducatorProPage from "./CommandCentre/EducatorProPage";
import AcademicCoordinatorPage from "./CommandCentre/AcademicCoordinatorPage";
import FinanceCFOPage from "./CommandCentre/FinanceCFOPage";
import StudentHubPage from "./CommandCentre/StudentHubPage";
import ParentPortalPage from "./CommandCentre/ParentPortalPage";

export type RoleType = 
  | "Super Admin" 
  | "Branch Admin" 
  | "Sales" 
  | "Teacher" 
  | "Student" 
  | "Parent" 
  | "Academic Coordinator"
  | "Finance Manager";

const appToCommandRoleMap: Record<string, string> = {
  "Super Admin": "Executive Admin",
  "Branch Admin": "Branch Manager",
  "Sales": "Admissions VP",
  "Teacher": "Educator Pro",
  "Academic Coordinator": "Academic Coord",
  "Finance Manager": "Finance CFO",
  "Student": "Student Hub",
  "Parent": "Parent Portal"
};

const commandToAppRoleMap: Record<string, "Super Admin" | "Branch Admin" | "Sales" | "Teacher" | "Academic Coordinator" | "Finance Manager" | "Student" | "Parent"> = {
  "Executive Admin": "Super Admin",
  "Branch Manager": "Branch Admin",
  "Admissions VP": "Sales",
  "Educator Pro": "Teacher",
  "Academic Coord": "Academic Coordinator",
  "Finance CFO": "Finance Manager",
  "Student Hub": "Student",
  "Parent Portal": "Parent"
};

interface CommandCentreProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function CommandCentre({
  currentRole,
  onRoleChange,
  theme,
  onTriggerNotification
}: CommandCentreProps) {
  // 1. One Source of Truth for Role-based Navigation mapping to App-level role
  const [activeRole, setActiveRole] = useState(() => appToCommandRoleMap[currentRole] || "Executive Admin");

  React.useEffect(() => {
    const mapped = appToCommandRoleMap[currentRole];
    if (mapped && mapped !== activeRole) {
      setActiveRole(mapped);
    }
  }, [currentRole]);

  const handleRoleChange = (newRole: string) => {
    setActiveRole(newRole);
    const mappedAppRole = commandToAppRoleMap[newRole];
    if (mappedAppRole && onRoleChange) {
      // Keep user in the widescreen CommandCentre mockup for active auditing
      if (!["Student", "Parent"].includes(mappedAppRole)) {
        onRoleChange(mappedAppRole);
      }
    }
  };

  // Action states
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);
  const [actionInput, setActionInput] = useState("");

  const handleSelectSearchResult = (type: string, id: string) => {
    onTriggerNotification(
      `🔍 Record Retrieved: ${type}`,
      `Loaded digital portfolio files matching database hash prefix ${id}.`
    );
  };

  const { openModal } = useGlobalAction();

  const handleTriggerActionModal = (slug: string) => {
    if (slug === "branch") {
      openModal("SUPER_ADMIN_CREATE_BRANCH");
    } else if (slug === "teacher") {
      openModal("SUPER_ADMIN_ADD_TEACHER");
    } else if (slug === "campaign") {
      openModal("SALES_CAMPAIGN");
    } else if (slug === "report") {
      openModal("SUPER_ADMIN_GEN_REPORT");
    } else if (slug === "broadcast") {
      openModal("SUPER_ADMIN_BROADCAST");
    } else if (slug === "enroll") {
      openModal("SALES_NEW_LEAD");
    } else {
      setActiveActionModal(slug);
      setActionInput("");
    }
  };

  const executeModalAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionInput.trim()) return;

    onTriggerNotification(
      "⚡ System Command Executed",
      `Dispatched payload to multi-branch data center: "${actionInput}"`
    );
    setActiveActionModal(null);
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col font-sans relative ${
        theme === "light" 
          ? "bg-slate-50 text-slate-900" 
          : "bg-slate-950 text-slate-100"
      }`}
      id="plato-global-command-root"
    >
      
      {/* 1. FIXED TOP GLOBAL NAVIGATION SYSTEM */}
      <header 
        className={`sticky top-0 z-40 px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between gap-6 transition-all ${
          theme === "light" 
            ? "bg-white/90 border-slate-200/80 shadow-sm shadow-slate-100/50" 
            : "bg-slate-950/90 border-slate-900/85 shadow-2.5xl shadow-black/85"
        }`}
        id="fixed-global-navigation-header"
      >
        {/* Brand Unit */}
        <div className="flex items-center gap-3 shrink-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-lg tracking-wider shadow-lg select-none ring-2 ring-amber-500/10">
            P
          </div>
          <div className="hidden sm:block text-left">
            <h2 className="text-xs font-black tracking-widest text-slate-200 uppercase leading-none flex items-center gap-1">
              Plato's Planet
              <span className="bg-amber-500/10 text-amber-500 px-1 rounded-[4px] text-[8px] font-mono tracking-normal font-black animate-pulse">GCC V3</span>
            </h2>
            <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block mt-1 leading-none select-none">
              Learn. Explore. Achieve.
            </span>
          </div>
        </div>

        {/* Global AI-Power Search bar */}
        <div className="flex-1 max-w-xl mx-auto">
          <GlobalSearchBar 
            theme={theme} 
            onSelectResult={handleSelectSearchResult} 
          />
        </div>

        {/* Status Indicators & Profile */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-805">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-mono font-extrabold text-emerald-400 select-none">ACTIVE MULTI-CORE</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-mono font-bold text-amber-500">Administrator 1</p>
              <p className="text-[8.5px] font-bold text-slate-500 uppercase leading-none mt-0.5">SaaS Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm font-bold font-mono">
              👑
            </div>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC WORKSPACE BODY CONTAINER */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6 relative">
        
        {/* Standard warning notice if not Super Admin to prompt the user */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/25 text-amber-500 rounded-2xl text-left flex items-start gap-3 shadow-lg">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-amber-400 animate-pulse" />
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-wider font-mono">
              Current Role Debugger: <span className="text-white bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-md text-[10.5px]">Current Role: {activeRole}</span>
            </p>
            <p className="text-[10.5px] font-semibold text-slate-400 mt-1 leading-snug">
              Dubai Jumeirah Campus centralized server active. Access operational portals seamlessly by clicking role subsets inside the Switcher row.
            </p>
          </div>
        </div>

        {/* A. Executive Header (Dynamic Welcome, Quick Actions, Role Switcher) */}
        <ExecutiveHeader 
          activeRole={activeRole}
          setActiveRole={handleRoleChange}
          theme={theme}
          onTriggerNotification={onTriggerNotification}
          onTriggerActionModal={handleTriggerActionModal}
        />

        {/* Render separate page components depending on activeRole */}
        <div className="space-y-2 mt-4" id="main-content-display-port">
          
          {activeRole === "Executive Admin" && (
            <ExecutiveAdminPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Branch Manager" && (
            <BranchManagerPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Admissions VP" && (
            <AdmissionsVPPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Educator Pro" && (
            <EducatorProPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Academic Coord" && (
            <AcademicCoordinatorPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Finance CFO" && (
            <FinanceCFOPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Student Hub" && (
            <StudentHubPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

          {activeRole === "Parent Portal" && (
            <ParentPortalPage 
              theme={theme} 
              onTriggerNotification={onTriggerNotification} 
            />
          )}

        </div>

      </main>

      {/* 3. FLOATING EXECUTIVE ACTION MODAL */}
      {activeActionModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <p className="text-xs font-black uppercase font-mono tracking-wider">Authorize Action Payload</p>
            </div>
            <p className="text-xs text-slate-400">
              Discharging manual overrides inside {activeActionModal} modules. Type query specifications to commit.
            </p>
            <form onSubmit={executeModalAction} className="space-y-4">
              <input 
                type="text" 
                value={actionInput}
                onChange={(e) => setActionInput(e.target.value)}
                placeholder="E.g. Broadcast to all families regarding upcoming National Day Holiday"
                className="w-full p-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:outline-none focus:border-amber-500"
              />
              <div className="flex justify-end gap-2 text-xs">
                <button 
                  type="button" 
                  onClick={() => setActiveActionModal(null)}
                  className="px-4 py-2 hover:bg-slate-800 text-slate-350 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase rounded-xl transition"
                >
                  Deploy Command
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
