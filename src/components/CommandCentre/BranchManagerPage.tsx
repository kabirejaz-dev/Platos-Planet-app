import React, { useState } from "react";
import { 
  Building, Users, UserCheck, Calendar, Clock, DollarSign, 
  HelpCircle, CheckCircle2, ChevronRight, Send, AlertTriangle, 
  BookOpen, Star, Mail 
} from "lucide-react";

interface BranchManagerPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

interface StudentDirectory {
  id: string;
  name: string;
  grade: string;
  curriculum: string;
  batch: string;
  attendance: string;
}

interface TeacherOnDuty {
  id: string;
  name: string;
  subject: string;
  status: "Teaching" | "Idle" | "Absent";
  batches: string[];
}

interface FeeArrearRecord {
  id: string;
  parentName: string;
  studentName: string;
  amount: number;
  dueDate: string;
  phone: string;
}

export default function BranchManagerPage({ theme, onTriggerNotification }: BranchManagerPageProps) {
  const [selectedBranch, setSelectedBranch] = useState("Main Branch");

  // 1. Branch Students State
  const [students, setStudents] = useState<StudentDirectory[]>([
    { id: "s-1", name: "Student 1", grade: "Grade 10", curriculum: "British", batch: "B-IG-PH-10A", attendance: "96%" },
    { id: "s-2", name: "Student 10", grade: "Grade 11", curriculum: "British", batch: "B-IG-CH-11B", attendance: "92%" },
    { id: "s-3", name: "Student 8", grade: "Grade 10", curriculum: "CBSE", batch: "B-CB-MA-10C", attendance: "98%" },
    { id: "s-4", name: "Student 3", grade: "Grade 12", curriculum: "A-Level", batch: "B-AL-PH-12D", attendance: "89%" },
    { id: "s-5", name: "Student 5", grade: "Grade 10", curriculum: "British", batch: "B-IG-PH-10A", attendance: "91%" }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Active Staff On duty State
  const [teachers, setTeachers] = useState<TeacherOnDuty[]>([
    { id: "t-1", name: "Teacher 1", subject: "Physics", status: "Teaching", batches: ["B-IG-PH-10A", "B-AL-PH-12D"] },
    { id: "t-2", name: "Teacher 3", subject: "Chemistry", status: "Teaching", batches: ["B-IG-CH-11B"] },
    { id: "t-3", name: "Teacher 2", subject: "Mathematics & Computing", status: "Idle", batches: ["B-CB-MA-10C"] },
    { id: "t-4", name: "Teacher 12", subject: "Astronomy & Physics", status: "Absent", batches: [] }
  ]);

  // 3. Batches State
  const [batches, setBatches] = useState([
    { id: "batch-1", code: "B-IG-PH-10A", students: 16, room: "Hall A", time: "16:00 - 17:30", scale: 88 },
    { id: "batch-2", code: "B-IG-CH-11B", students: 22, room: "Science Lab", time: "17:30 - 19:00", scale: 75 },
    { id: "batch-3", code: "B-CB-MA-10C", students: 12, room: "Hall B", time: "16:00 - 17:30", scale: 95 },
    { id: "batch-4", code: "B-AL-PH-12D", students: 15, room: "Hall C", time: "19:00 - 20:30", scale: 80 }
  ]);

  // 4. Fee Follow-up Action state
  const [arrears, setArrears] = useState<FeeArrearRecord[]>([
    { id: "f-1", parentName: "Parent 4", studentName: "Student 5", amount: 2450, dueDate: "2026-06-10", phone: "+971 50 123 4567" },
    { id: "f-2", parentName: "Parent 3", studentName: "Student 3", amount: 4800, dueDate: "2026-06-05", phone: "+971 52 987 6543" },
    { id: "f-3", parentName: "Parent 8", studentName: "Student 8", amount: 1200, dueDate: "2026-06-15", phone: "+971 56 312 4578" }
  ]);

  const [reminderText, setReminderText] = useState("Dear Parent, this is a friendly reminder from Plato's Planet Main Campus regarding due tuition fees of AED [amount] for [student]. Kindly disburse via the secure parent app payments tab or visit headquarters. Shokran.");

  const triggerFeeReminder = (record: FeeArrearRecord) => {
    let customizedText = reminderText
      .replace("[amount]", record.amount.toString())
      .replace("[student]", record.studentName);
    
    onTriggerNotification(
      "💬 Outreach WhatsApp Dispatched", 
      `Sent automated collection notice to parent ${record.parentName} (${record.phone}): "${customizedText.substring(0, 48)}..."`
    );
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in text-left select-none">
      
      {/* 1. Brand Banner with Selector */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[9px] uppercase font-mono font-black text-indigo-400 font-bold">
              SINGLE CAMPUS METRICS & TIMING
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Campus HQ Office Manager
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Operational dashboard configured for daily on-ground batch delivery, lecturer timing checklist, classroom halls, and outstanding arrears collections.
          </p>
        </div>

        <div className="shrink-0 z-10 w-full md:w-auto">
          <select 
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              onTriggerNotification("🏢 branch context altered", `Now rendering operations log matching ${e.target.value}`);
            }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-extrabold p-3 rounded-2xl outline-none cursor-pointer"
          >
            <option value="Main Branch">Main Branch (Jumeirah HQ)</option>
            <option value="Al-Sufouh Campus">Al-Sufouh Campus</option>
            <option value="Online Campus">Online Interactive Classroom</option>
          </select>
        </div>
      </div>

      {/* 2. Key Local Performance Summary Cells */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Campus Total Students", value: "752 Active", note: "92% attendance benchmark" },
          { label: "Educators on Shift", value: "14 Lecturers", note: "Average NPS score: 4.8★" },
          { label: "Total Active Batches", value: "24 Batches", note: "Room space occupancy: 85%" },
          { label: "Local NPS Level", value: "94.2%", note: "Pass quota ratio: 98.4%" },
        ].map((item, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 tracking-wider block">
              {item.label}
            </span>
            <span className="text-lg font-black text-white">{item.value}</span>
            <span className="text-[10px] text-indigo-400 font-bold block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* Columns: Interactive Student Registry & Active Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Branch Students Directory */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-indigo-400">
                ✏️ Jumeirah HQ Student Registry ({filteredStudents.length})
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Live search and instant attendance check.</p>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name..." 
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-[10.5px] font-bold text-white rounded-xl focus:border-indigo-500 focus:outline-none w-full sm:w-44 placeholder-slate-600"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 font-mono text-[9px] uppercase">
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Curriculum</th>
                  <th className="py-2.5">Active Batch</th>
                  <th className="py-2.5 text-right">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-slate-900/30 transition">
                    <td className="py-3 pr-2">
                      <div className="font-extrabold text-slate-250">{s.name}</div>
                      <span className="text-[9.5px] text-slate-500">{s.grade}</span>
                    </td>
                    <td className="py-3 text-slate-400 font-medium">{s.curriculum}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-[9px] text-slate-400">{s.batch}</span>
                    </td>
                    <td className="py-3 text-right font-mono font-black text-emerald-400">{s.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teachers On Duty */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-indigo-400">
                👨‍🏫 Active Shift Instructors
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Status registry of scheduled academy experts.</p>
            </div>
            <UserCheck className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-3.5">
            {teachers.map(t => (
              <div key={t.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-200 text-xs">{t.name}</strong>
                    <span className="text-[8px] font-mono uppercase bg-slate-950 border border-slate-800 px-1 rounded-md text-slate-400">{t.subject}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {t.batches.length > 0 ? (
                      t.batches.map(b => (
                        <span key={b} className="text-[8.5px] font-mono text-indigo-400 font-bold">{b}</span>
                      ))
                    ) : (
                      <span className="text-[8.5px] text-slate-500 font-medium">No Class allocated</span>
                    )}
                  </div>
                </div>
                <span className={`text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded-lg border ${
                  t.status === "Teaching" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : t.status === "Idle" 
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Classroom Batch Allocations (Grid Scheduler) */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-indigo-400">
              📅 Today's Classroom Timing Grid
            </h3>
            <p className="text-[10px] text-slate-550 mt-1">Real-time room availability matrix and scheduled pass quotients.</p>
          </div>
          <Calendar className="w-4 h-4 text-indigo-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {batches.map(b => (
            <div key={b.id} className="p-4 bg-slate-900 border border-slate-850 rounded-2xl relative overflow-hidden space-y-3">
              <div className="absolute top-0 right-0 p-1 px-2 bg-slate-950 text-indigo-400 text-[8.5px] font-mono rounded-bl-xl border-l border-b border-slate-850 font-black">
                {b.room}
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-black text-slate-100">{b.code}</span>
                <span className="text-[9.5px] text-slate-500 block">{b.time}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9.5px] text-slate-400 font-bold">
                  <span>Student Capacity</span>
                  <span className="text-slate-200">{b.students}/30</span>
                </div>
                <div className="w-full bg-slate-955 h-1.5 rounded-full overflow-hidden border border-white/[0.02]">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${b.scale}%` }} />
                </div>
              </div>
              <button 
                onClick={() => onTriggerNotification("📅 Timetable Synchronized", `Broadcasted student entry reminders for batch ${b.code}`)}
                className="w-full py-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-[9px] text-slate-400 hover:text-white font-black uppercase rounded-lg transition"
              >
                Trigger Check-in
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Arrear Collections and Notification dispatcher */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-indigo-400">
              💰 FEE PAYMENTS OUTREACH DESK
            </h3>
            <p className="text-[10px] text-slate-550 mt-1">Review outstanding branch fees and trigger instant SMS alert drafts.</p>
          </div>
          <DollarSign className="w-4 h-4 text-indigo-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[8px] font-mono tracking-widest text-slate-550 uppercase block font-black">Outstanding Invoices Ledger</span>
            {arrears.map(rec => (
              <div key={rec.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                <div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-slate-200 text-xs">{rec.parentName}</strong>
                    <span className="text-[9px] text-slate-500 font-medium">({rec.studentName})</span>
                  </div>
                  <span className="text-[10px] text-slate-450 block font-mono">Due Date: {rec.dueDate} • Phone: {rec.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-rose-500 font-mono">AED {rec.amount}</span>
                  <button 
                    onClick={() => triggerFeeReminder(rec)}
                    className="p-1 px-2.5 bg-indigo-600/10 hover:bg-indigo-650/25 border border-indigo-505/20 hover:border-indigo-500 text-indigo-400 text-[10px] font-bold uppercase rounded-xl transition cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" /> Outreach
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 bg-slate-900/60 p-4 rounded-2xl border border-slate-850 flex flex-col justify-between space-y-3 text-left">
            <div className="space-y-1">
              <span className="text-[8px] font-mono tracking-widest text-slate-550 uppercase block font-black">Interactive Outreach Template</span>
              <p className="text-[10px] text-slate-500 leading-normal">This template will merge student information and arrears automatically before dispatching.</p>
            </div>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 text-[10.5px] p-2.5 rounded-xl font-medium text-slate-300 focus:outline-none focus:border-indigo-500"
              rows={4}
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
            />
            <p className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg font-semibold flex items-center gap-1.5 leading-snug">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Rich compliance variables validated.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
