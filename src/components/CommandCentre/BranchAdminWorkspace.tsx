import React, { useState } from "react";
import { 
  Building, 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Activity, 
  FileText,
  DollarSign,
  UserPlus,
  RefreshCw,
  PlusCircle,
  HelpCircle
} from "lucide-react";
import OperationsCenter from "./OperationsCenter";
import { useGlobalAction } from "../GlobalActionContext";
import { getStoredPlatosPlanetConfig } from "../../platosPlanetConfig";

interface BranchAdminWorkspaceProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function BranchAdminWorkspace({ theme, onTriggerNotification }: BranchAdminWorkspaceProps) {
  const { openModal } = useGlobalAction();
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;
  const [selectedBranch, setSelectedBranch] = useState(branches[0] || "Main Branch");
  const [allocatedRoomId, setAllocatedRoomId] = useState("Classroom-1");
  const [allocatedTeacher, setAllocatedTeacher] = useState("Teacher 1");
  const [allocatedSubject, setAllocatedSubject] = useState("Physics Electromagnetism");

  // Dynamic Room Allocation simulation list
  const [roomAllocations, setRoomAllocations] = useState([
    { id: "Classroom-1", teacher: "Teacher 1", subject: "IGCSE Physics Electro", time: "16:00 - 17:30" },
    { id: "Classroom-2", teacher: "Teacher 2", subject: "Advanced Core Calculus", time: "17:30 - 19:00" },
    { id: "Classroom-3", teacher: "Teacher 3", subject: "CBSE Inorganic Compounds", time: "16:00 - 17:30" },
    { id: "Classroom-4", teacher: "Teacher 12", subject: "A-Level Relativity", time: "19:00 - 20:30" },
  ]);

  const [batchesList, setBatchesList] = useState([
    { code: "B-IG-PH-10A", studentsCount: 16, status: "Active Cycle", room: "Classroom-1" },
    { code: "B-CB-BI-11C", studentsCount: 22, status: "Active Cycle", room: "Classroom-3" },
    { code: "B-AL-MA-12D", studentsCount: 12, status: "Active Cycle", room: "Classroom-2" },
  ]);

  const handleCreateBatch = () => {
    onTriggerNotification(
      "📦 Batch Registered",
      `Constructed a new active tutoring batch for ${selectedBranch}. Allocated room and scheduler updated in portal.`
    );
  };

  const handleAllocateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocatedSubject.trim()) return;

    setRoomAllocations(prev => {
      const idx = prev.findIndex(r => r.id === allocatedRoomId);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { id: allocatedRoomId, teacher: allocatedTeacher, subject: allocatedSubject, time: "18:00 - 20:00" };
        return copy;
      } else {
        return [...prev, { id: allocatedRoomId, teacher: allocatedTeacher, subject: allocatedSubject, time: "18:00 - 20:00" }];
      }
    });

    onTriggerNotification(
      "🚪 Classroom Reallocated",
      `Allocation saved! Room ${allocatedRoomId} allocated to ${allocatedTeacher} for '${allocatedSubject}'.`
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* 1. Branch Selector and quick metrics headers */}
      <div className="p-6 bg-slate-900 border border-slate-805 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <span className="text-[9px] uppercase font-mono font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full inline-block tracking-wider">
            TUITION CENTRE OPERATIONS HUB
          </span>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-white tracking-tight">
              Headquarters Operations Control
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-lg">
            Manage Room allocations, timetables schedules, staff payroll metrics, and on-ground student attendance registers for the {selectedBranch}.
          </p>
        </div>

        <div className="shrink-0 z-10 w-full md:w-auto">
          <select 
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-amber-500 font-extrabold p-3 rounded-2xl outline-none cursor-pointer"
          >
            {branches.map(branchName => (
              <option key={branchName} value={branchName}>{branchName}</option>
            ))}
            <option value="Online Campus">Online Campus</option>
          </select>
        </div>
      </div>

      {/* 2. Key Branch Metrics Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Branch Students Count", value: "1,842 Active", note: "Capacity Index: 89%" },
          { label: "Campus Staff Check-ins", value: "42 Lecturers", note: "98% schedule integrity" },
          { label: "Billing Target Met", value: "AED 1.84M Collected", note: "89% success tracking" },
          { label: "Today Attendance", value: "94.5% Rate", note: "Top among GCC branches" },
        ].map((item, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 tracking-wider block">
              {item.label}
            </span>
            <span className="text-lg font-black text-white">{item.value}</span>
            <span className="text-[9.5px] text-indigo-400 font-semibold block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* Dynamic Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Operations Actions:
        </span>
        <button
          onClick={() => openModal("BRANCH_CREATE_BATCH")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Create Batch"
        >
          <span>📦 Create Batch</span>
        </button>
        <button
          onClick={() => openModal("BRANCH_ASSIGN_TEACHER")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Assign Teacher"
        >
          <span>👨‍🏫 Assign Teacher</span>
        </button>
        <button
          onClick={() => openModal("BRANCH_VIEW_TIMETABLE")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="View Timetable"
        >
          <span>📅 View Timetable</span>
        </button>
        <button
          onClick={() => openModal("BRANCH_ROOM_ALLOCATION")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Room Allocation"
        >
          <span>🚪 Room Allocation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left pane: Grid of active room allocations (8/12 block) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Room Allocation Matrix Dashboard */}
          <div className="bg-slate-955 border border-slate-850 p-5 rounded-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Physical Classroom allocations
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Solve teacher location blockades. Allocate classrooms to active classes in real time</p>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded">
                Active Scheduling Grid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roomAllocations.map((room) => (
                <div 
                  key={room.id}
                  className="p-4 bg-slate-900/60 border border-slate-855 rounded-xl text-left space-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500" />
                  
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-mono text-amber-500 font-black uppercase text-[10.5px] tracking-wider">{room.id}</span>
                    <span className="text-slate-500 font-medium font-mono">{room.time}</span>
                  </div>

                  <h4 className="text-[11.5px] font-bold text-slate-100">{room.subject}</h4>
                  <p className="text-[9.5px] text-slate-400 font-medium">Instructor: {room.teacher}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive room allocation form */}
          <form onSubmit={handleAllocateRoom} className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider leading-none">
              Assign Classroom / Room Auditor Solver
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px]">
              <div className="space-y-1">
                <span className="text-[8px] uppercase font-mono font-black text-slate-500">Pick Target HallWAY / Room</span>
                <select 
                  value={allocatedRoomId}
                  onChange={(e) => setAllocatedRoomId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-205 p-3 rounded-xl font-bold"
                >
                  <option value="Classroom-1">Classroom 1 (Primary Hub)</option>
                  <option value="Classroom-2">Classroom 2 (Delta Block)</option>
                  <option value="Classroom-3">Classroom 3 (Zeta Wing)</option>
                  <option value="Classroom-4">Classroom 4 (Seminar Room)</option>
                  <option value="Classroom-5">Classroom 5 (General Stage)</option>
                  <option value="Classroom-6">Classroom 6 (Media Lab)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] uppercase font-mono font-black text-slate-500">Assign Onboarding Teacher</span>
                <select 
                  value={allocatedTeacher}
                  onChange={(e) => setAllocatedTeacher(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-205 p-3 rounded-xl font-bold"
                >
                  <option value="Teacher 1">Teacher 1 (Physics)</option>
                  <option value="Teacher 2">Teacher 2 (Math)</option>
                  <option value="Teacher 3">Teacher 3 (Chemistry)</option>
                  <option value="Teacher 12">Teacher 12 (A-Level)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] uppercase font-mono font-black text-slate-500">Subject Class / Module Topic</span>
                <input 
                  type="text"
                  value={allocatedSubject}
                  onChange={(e) => setAllocatedSubject(e.target.value)}
                  placeholder="E.g. Electromagnetism Advanced"
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2 text-slate-200 outline-none p-3 rounded-xl font-bold focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Comptroller: Bind Classroom Slot & Broadcast
            </button>
          </form>

        </div>

        {/* Right pane: Operational Telemetries & Payroll variables (4/12 block) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active branch batch registers */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase block">
                ACTIVE BATCH REGISTERS
              </h4>
              <button 
                onClick={handleCreateBatch}
                className="bg-slate-900 border border-slate-800 p-1 rounded hover:text-white cursor-pointer"
                title="Create a new Batch"
              >
                <PlusCircle className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            <div className="space-y-2 text-[11px] leading-tight font-semibold">
              {batchesList.map((batch) => (
                <div key={batch.code} className="p-3 bg-slate-900/60 border border-slate-855 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-100 font-bold block">{batch.code}</span>
                    <span className="text-[9px] text-slate-500 block">Allocated in {batch.room}</span>
                  </div>
                  <span className="bg-slate-950 text-emerald-400 border border-slate-800 px-2 py-0.5 font-mono text-[9px] font-bold rounded">
                    {batch.studentsCount} Students
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher schedules / Payroll Integration */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3">
            <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">
              STAFF LECTURER SCHEDULES & PAYROLL
            </h4>

            <div className="space-y-2 text-[10.5px]">
              {[
                { name: "Teacher 1", sessions: "14 hours compiled", rate: "AED 350 / HR", check: "Checkin Verified" },
                { name: "Teacher 3", sessions: "18 hours compiled", rate: "AED 300 / HR", check: "Checkin Verified" },
                { name: "Teacher 2", sessions: "12 hours compiled", rate: "AED 320 / HR", check: "Checkin Verified" }
              ].map((faculty, i) => (
                <div key={i} className="p-2.5 bg-slate-90) rounded-xl border border-slate-855 bg-slate-900/50 flex flex-col gap-1.5 font-semibold">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 block text-[11px] font-extrabold">{faculty.name}</span>
                    <span className="text-[9px] text-emerald-450 font-bold">{faculty.check}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] text-slate-500 font-mono">
                    <span>{faculty.sessions}</span>
                    <strong className="text-slate-400">{faculty.rate}</strong>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onTriggerNotification("💰 Live Payroll Synced", "Compiled automated lecturing sheets. Payout logs synced to Finance Hub.")}
              className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] text-slate-400 hover:text-white uppercase font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <RefreshCw className="w-3 h-3 text-amber-500" /> Recompile Staff Billing logs
            </button>
          </div>

        </div>

      </div>

      <OperationsCenter theme={theme} onTriggerNotification={onTriggerNotification} />

    </div>
  );
}
