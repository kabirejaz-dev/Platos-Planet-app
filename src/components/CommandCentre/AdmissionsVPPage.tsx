import React, { useState } from "react";
import { 
  Users, DollarSign, Calendar, Clock, Sparkles, TrendingUp, Filter, CheckCircle2,
  PhoneCall, MessageSquare, Plus, Mail, ChevronRight, BarChart3, AlertCircle 
} from "lucide-react";
import { INITIAL_LEADS } from "./AdmissionsMockData";
import { Lead } from "./AdmissionsTypes";

interface AdmissionsVPPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function AdmissionsVPPage({ theme, onTriggerNotification }: AdmissionsVPPageProps) {
  // 1. Leads CRM State
  const [leads, setLeads] = useState<Lead[]>(() => INITIAL_LEADS);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchText, setSearchText] = useState("");

  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadParent, setNewLeadParent] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadCurric, setNewLeadCurric] = useState("IGCSE");
  const [newLeadRevenue, setNewLeadRevenue] = useState(8500);

  // 2. Scheduled follow-up checklist
  const [followups, setFollowups] = useState([
    { id: "fl-1", leadName: "Student 3", parentName: "Parent 3", action: "Send WhatsApp Brochure", status: "Pending", phone: "+971 52 987 6543" },
    { id: "fl-2", leadName: "Student 8", parentName: "Parent 8", action: "Confirm Physics Trial slot", status: "Pending", phone: "+971 56 312 4578" },
    { id: "fl-3", leadName: "Student 1", parentName: "Parent 2", action: "Approve scholarship check", status: "Urgent", phone: "+971 54 444 8888" }
  ]);

  // 3. active Campaigns State
  const [campaigns, setCampaigns] = useState([
    { id: "c-1", channel: "Google search Ads", budget: "AED 12,000", leadsGenerated: 165, cpa: "AED 72.7" },
    { id: "c-2", channel: "Meta Instagram Retargeting", budget: "AED 8,500", leadsGenerated: 112, cpa: "AED 75.8" },
    { id: "c-3", channel: "TikTok Physics Experiment Reels", budget: "AED 4,000", leadsGenerated: 89, cpa: "AED 44.9" },
    { id: "c-4", channel: "Dubai Mall School Expo Off-line", budget: "AED 15,000", leadsGenerated: 142, cpa: "AED 105.6" }
  ]);

  // 4. Trial class schedules State
  const [trialClasses, setTrialClasses] = useState([
    { id: "tc-1", studentName: "Student 8", subject: "CBSE Physics Trial", teacher: "Teacher 1", time: "16:00 Today" },
    { id: "tc-2", studentName: "Student 3", subject: "IGCSE Mathematics Trial", teacher: "Teacher 2", time: "17:30 Tomorrow" },
    { id: "tc-3", studentName: "Student 5", subject: "A-Level Chemistry Trial", teacher: "Teacher 3", time: "18:00 Tomorrow" }
  ]);

  const handleUpdateLeadStatus = (id: string, currentStatus: string) => {
    const statuses = ["Inquiry", "Counseling", "Trial Class", "Application", "Enrollment"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, status: nextStatus as any };
      }
      return l;
    }));
    onTriggerNotification("📊 CRM Registry Shift", `Lead state progressed to ${nextStatus}.`);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadParent) return;

    const freshLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      parentName: newLeadParent,
      phone: newLeadPhone,
      email: `${newLeadName.toLowerCase().replace(/\s/g, "")}@gmail.com`,
      curriculum: newLeadCurric as any,
      grade: "Grade 10",
      source: "Walk-In",
      branch: "Main Branch",
      score: 82,
      probability: 70,
      expectedRevenue: Number(newLeadRevenue),
      status: "Inquiry",
      nextAction: "Initial call",
      nextActionDate: "2026-06-18",
      createdAt: "2026-06-17"
    };

    setLeads(prev => [freshLead, ...prev]);
    setNewLeadName("");
    setNewLeadParent("");
    setNewLeadPhone("");
    onTriggerNotification("🎯 CRM Lead Created", `Registered intake profile for ${newLeadName}. Assigned score: 82 (High Prob).`);
  };

  const triggerCallAction = (name: string, phone: string) => {
    onTriggerNotification("📞 VoG IP Call Initiated", `Plato dialer connecting outbound channel to ${name} (${phone})...`);
  };

  const triggerWhatsAppAction = (name: string, phone: string) => {
    onTriggerNotification("💬 WhatsApp Broadcast Send", `Dispatched informational PDF brochure and trial lesson booking calendar link to ${name} (${phone}).`);
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const matchesSearch = l.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          l.phone.includes(searchText) || 
                          l.parentName.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in text-left select-none">
      
      {/* 1. Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-mono font-black text-emerald-400">
              ADMISSIONS & COMMERCE CONTROL
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Admissions CRM, Funnel & Trails
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Lead pipelines, active marketing campaign spends, predictive conversion analytics, and teacher-assigned trial tutoring allocations.
          </p>
        </div>

        <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl text-left font-mono space-y-0.5 max-w-xs w-full shrink-0">
          <span className="text-[9px] text-slate-500 uppercase block font-black">Monthly Enrollment KPI Target</span>
          <span className="text-base font-black text-white">420 Students</span>
          <span className="text-[10px] text-emerald-400 font-bold block">78% Target Met (328/420)</span>
        </div>
      </div>

      {/* 2. Key Conversion Analytics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active CRM Leads", value: `${leads.length} Records`, note: "Intake score avg: 84" },
          { label: "Total Funnel Conversion", value: "31.2% Rate", note: "Ministry benchmark: 28%" },
          { label: "Campaign CPA Mean", value: "AED 75.8 / Lead", note: "Average CAC drop by 12%" },
          { label: "Predictive Funnel Rev", value: "AED 842K Expected", note: "Q2 forecasted admissions" },
        ].map((item, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-500 tracking-wider block">
              {item.label}
            </span>
            <span className="text-lg font-black text-white">{item.value}</span>
            <span className="text-[10px] text-emerald-400 font-bold block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* 3. Sales Funnel Visual Section */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-emerald-500">
              📊 Multi-Stage Sales Funnel Volume
            </h3>
            <p className="text-[10px] text-slate-550 mt-1">Numerical conversion analysis from raw Inquiry down to official Tuition Fees Enrollment.</p>
          </div>
          <Filter className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { stage: "1. Raw Inquiry", count: "1,240 leads", width: "w-full", color: "bg-emerald-500", conv: "100%" },
            { stage: "2. Counseling", count: "890 profiles", width: "w-4/5", color: "bg-emerald-550", conv: "71.7%" },
            { stage: "3. Trial Class", count: "512 bookings", width: "w-3/5", color: "bg-emerald-600", conv: "41.2%" },
            { stage: "4. Application", count: "398 files", width: "w-2/5", color: "bg-emerald-650", conv: "32.0%" },
            { stage: "5. Enrollment", count: "288 payments", width: "w-1/4", color: "bg-amber-500", conv: "23.2%" }
          ].map((step, idx) => (
            <div key={idx} className="p-3.5 bg-slate-905 border border-slate-900 rounded-2xl flex flex-col justify-between space-y-3 min-h-[110px]">
              <span className="text-[10px] font-mono uppercase font-black text-slate-450">{step.stage}</span>
              <div className="space-y-1">
                <span className="text-base font-black text-white">{step.count}</span>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/[0.02]">
                  <div className={`h-full ${step.color}`} style={{ width: step.conv }} />
                </div>
              </div>
              <span className="text-[9.5px] text-slate-500 font-mono font-bold block">Conversion: {step.conv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leads Directory & Client Input form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leads Pipeline Manager (Col 8) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-emerald-500">
                🎯 CRM Active lead Registry ({filteredLeads.length})
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Filter, sort pipeline priority, or update lead cycle stage.</p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-800 p-1.5 px-2.5 rounded-xl text-[10.5px] text-white font-bold cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Counseling">Counseling</option>
                <option value="Trial Class">Trial Class</option>
                <option value="Application">Application</option>
                <option value="Enrollment">Enrollment</option>
              </select>

              <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search phone or name..." 
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10.5px] text-white rounded-xl focus:outline-none w-full sm:w-36 placeholder-slate-650"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredLeads.map(l => (
              <div key={l.id} className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-100 text-xs">{l.name}</strong>
                    <span className="text-[8.5px] px-1.5 bg-slate-950 border border-slate-800 text-slate-400 font-mono rounded">{l.curriculum} ({l.grade})</span>
                    <span className="text-[8.5px] text-slate-550 font-mono font-bold">via {l.source}</span>
                  </div>
                  <div className="text-[10px] text-slate-450 mt-0.5 font-medium leading-relaxed">
                    Parent: {l.parentName} • Contact: {l.phone} • Est Revenue: AED {l.expectedRevenue}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <button 
                    onClick={() => handleUpdateLeadStatus(l.id, l.status)}
                    className="px-2.5 py-1 text-[8.5px] font-black uppercase font-mono rounded bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-550/20 text-emerald-400 transition"
                  >
                    Stage: {l.status}
                  </button>
                  <button 
                    onClick={() => triggerCallAction(l.name, l.phone)}
                    className="p-1 px-2 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400 rounded-lg transition"
                    title="Call Outbound"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => triggerWhatsAppAction(l.name, l.phone)}
                    className="p-1 px-2 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-550/10 text-slate-500 hover:text-indigo-400 rounded-lg transition"
                    title="WhatsApp Brochure"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Intake Client Form */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-emerald-500">
                ➕ REGISTER INTAKE PROFILES
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Directly enroll walk-in client records to server databases.</p>
            </div>
          </div>

          <form onSubmit={handleAddLead} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Student Name</label>
              <input 
                type="text" 
                value={newLeadName}
                onChange={(e) => setNewLeadName(e.target.value)}
                placeholder="E.g. Elon Musk Jr"
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Parent Name</label>
              <input 
                type="text" 
                value={newLeadParent}
                onChange={(e) => setNewLeadParent(e.target.value)}
                placeholder="E.g. Errol Musk"
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Phone contact number</label>
              <input 
                type="text" 
                value={newLeadPhone}
                onChange={(e) => setNewLeadPhone(e.target.value)}
                placeholder="+971 50 XXXXXXX"
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Curriculum</label>
                <select 
                  value={newLeadCurric}
                  onChange={(e) => setNewLeadCurric(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-850 text-[11px] font-bold text-white rounded-xl outline-none"
                >
                  <option value="IGCSE">IGCSE</option>
                  <option value="A-Level">A-Level</option>
                  <option value="CBSE">CBSE</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Est Revenue (AED)</label>
                <input 
                  type="number" 
                  value={newLeadRevenue}
                  onChange={(e) => setNewLeadRevenue(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-900 border border-slate-850 text-[11px] font-bold text-white rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="py-2.5 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
            >
              Add CRM record
            </button>
          </form>
        </div>

      </div>

      {/* Campaigns Spends Audit & Trial Schedules (Grid layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Campaign Metrics (Col 7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-emerald-500">
                📢 Active Marketing campaign Budgets
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Inspect CPA levels and total leads dispatched from API hooks.</p>
            </div>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="space-y-3">
            {campaigns.map(camp => (
              <div key={camp.id} className="p-3 bg-slate-900 border border-slate-850 flex items-center justify-between gap-4 rounded-2xl">
                <div>
                  <strong className="text-xs text-slate-205 block">{camp.channel}</strong>
                  <span className="text-[9.5px] text-slate-500 block">Invested: {camp.budget}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white block">{camp.leadsGenerated} leads</span>
                  <span className="text-[9.5px] font-mono text-emerald-400 font-extrabold">CPA: {camp.cpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trial Class allocations (Col 5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono text-emerald-500">
                🕒 Booked Trial Lecturing
              </h3>
              <p className="text-[10px] text-slate-550 mt-1">Students assigned to expert educators for evaluation.</p>
            </div>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-3">
            {trialClasses.map(trial => (
              <div key={trial.id} className="p-3 bg-slate-900 border border-slate-855 rounded-2xl space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-100 text-xs">{trial.studentName}</strong>
                  <span className="text-[8.5px] font-mono bg-slate-950 border border-slate-800 text-slate-400 p-0.5 px-1 rounded-md">{trial.time}</span>
                </div>
                <div className="text-[10.5px] text-slate-450 leading-snug">
                  Type: <span className="text-slate-300 font-bold">{trial.subject}</span> • Instructor: <span className="text-indigo-400 font-bold">{trial.teacher}</span>
                </div>
                <button 
                  onClick={() => onTriggerNotification("🕒 Trial Confirmed", `Contacted ${trial.studentName}'s parent regarding their trial schedule.`)}
                  className="w-full py-1 text-[8.5px] uppercase font-black bg-slate-950 text-slate-450 hover:text-white rounded-lg transition"
                >
                  Verify Instructor Attendance
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
