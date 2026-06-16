import React, { useState } from "react";
import { 
  FileText, 
  Database, 
  Key, 
  Users, 
  Layers, 
  Cpu, 
  Award, 
  Network, 
  DollarSign, 
  GitBranch, 
  Compass, 
  Layout, 
  ClipboardList, 
  CheckSquare, 
  Copy, 
  Check, 
  Search,
  BookOpen,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

interface SpecChapter {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: "Strategy" | "Architecture" | "Data" | "Workflow";
}

export default function SystemSpecs() {
  const [activeChapter, setActiveChapter] = useState<string>("prd-summary");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // --- CLASSPRO MANAGEMENT TERMINAL ADMIN STATES ---
  const [classproLeads, setClassproLeads] = useState<Array<{ id: string; name: string; grade: string; board: string; phone: string; source: string; status: string }>>([
    { id: "lead-1", name: "Aisha Al-Mansoori", grade: "Grade 10", board: "IGCSE", phone: "+971 50 123 4567", source: "Instagram Ads", status: "Trial Scheduled" },
    { id: "lead-2", name: "Vihaan Nair", grade: "Grade 12", board: "CBSE", phone: "+971 52 987 6543", source: "School Seminar", status: "Hot Lead" },
    { id: "lead-3", name: "Sarah Hussain", grade: "Grade 11", board: "CBSE", phone: "+971 56 444 1122", source: "Parent Referral", status: "Enrolled" }
  ]);
  const [newLeadName, setNewLeadName] = useState<string>("");
  const [newLeadGrade, setNewLeadGrade] = useState<string>("Grade 10");
  const [newLeadBoard, setNewLeadBoard] = useState<string>("CBSE");
  const [newLeadPhone, setNewLeadPhone] = useState<string>("");
  const [newLeadSource, setNewLeadSource] = useState<string>("Google Search");

  const [classproBatches, setClassproBatches] = useState<Array<{ id: string; name: string; capacity: number; enrolled: number; instructor: string; timing: string }>>([
    { id: "batch-1", name: "Physics Board Booster CBSE 12A", capacity: 20, enrolled: 14, instructor: "Dr. Satish Kumar", timing: "Mon/Wed 05:00 PM" },
    { id: "batch-2", name: "Extended Math IGCSE Premium X", capacity: 15, enrolled: 12, instructor: "Prof. Alistair Vance", timing: "Tue/Thu 04:30 PM" },
    { id: "batch-3", name: "Biology Foundation Camp 10B", capacity: 25, enrolled: 19, instructor: "Dr. Farah Jamil", timing: "Fri 04:00 PM" }
  ]);
  const [newBatchName, setNewBatchName] = useState<string>("");
  const [newBatchCap, setNewBatchCap] = useState<number>(20);
  const [newBatchInstr, setNewBatchInstr] = useState<string>("Dr. Satish Kumar");
  const [newBatchTime, setNewBatchTime] = useState<string>("Mon/Wed 06:00 PM");

  const [classproFeeInvoices, setClassproFeeInvoices] = useState<Array<{ id: string; studentName: string; baseFee: number; taxVat: number; totalFee: number; status: "Paid" | "Outstanding" }>>([
    { id: "inv-1", studentName: "Rohan Bhatia", baseFee: 1500, taxVat: 75, totalFee: 1575, status: "Paid" },
    { id: "inv-2", studentName: "Zayd Al-Mansoori", baseFee: 2200, taxVat: 110, totalFee: 2310, status: "Outstanding" },
    { id: "inv-3", studentName: "Averroes S.", baseFee: 1800, taxVat: 90, totalFee: 1890, status: "Outstanding" }
  ]);
  const [newInvoiceStudent, setNewInvoiceStudent] = useState<string>("");
  const [newInvoiceBase, setNewInvoiceBase] = useState<number>(1000);

  const [attendanceBroadcastLogs, setAttendanceBroadcastLogs] = useState<string[]>([
    "📢 System: Attendance biometric listener online...",
    "📲 Broadcast Status: WhatsApp dispatch complete 'Vihaan Nair verified present' to registered parent contact."
  ]);

  const chapters: SpecChapter[] = [
    { id: "prd-summary", title: "1. Product Specs & PRD", icon: <FileText className="w-4 h-4" />, category: "Strategy" },
    { id: "user-stories", title: "2. Multi-Role User Stories", icon: <Users className="w-4 h-4" />, category: "Strategy" },
    { id: "database-schema", title: "3. PostgreSQL Database Schema", icon: <Database className="w-4 h-4" />, category: "Data" },
    { id: "api-specs", title: "4. REST API Specifications", icon: <Compass className="w-4 h-4" />, category: "Data" },
    { id: "rbac-matrix", title: "5. RBAC Permission Matrix", icon: <ShieldCheck className="w-4 h-4" />, category: "Strategy" },
    { id: "system-architecture", title: "6. System & SaaS Infrastructure", icon: <Server className="w-4 h-4" />, category: "Architecture" },
    { id: "ai-agent-architecture", title: "7. AI Tutor & Agent Pipeline", icon: <Cpu className="w-4 h-4" />, category: "Architecture" },
    { id: "crm-fee-architecture", title: "8. CRM & Fee Workflows", icon: <DollarSign className="w-4 h-4" />, category: "Workflow" },
    { id: "academic-workflows", title: "9. CBSE vs IGCSE Standards", icon: <Award className="w-4 h-4" />, category: "Workflow" },
    { id: "ux-wireframes", title: "10. UI Navigation & Wireframes", icon: <Layout className="w-4 h-4" />, category: "Architecture" },
    { id: "classpro-console", title: "11. Classpro Coaching Terminal", icon: <ClipboardList className="w-4 h-4 text-emerald-400 animate-pulse" />, category: "Workflow" },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredChapters = chapters.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-slate-950 border border-slate-900 rounded-2xl flex flex-col overflow-hidden text-sm">
      {/* Upper header */}
      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-brand-yellow text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
              SaaS Blueprint
            </span>
            <span className="text-slate-500 font-mono text-[10px]">v4.2 • Enterprise Standard</span>
          </div>
          <h2 className="text-base font-black text-white tracking-tight mt-1 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-brand-yellow" />
            Plato's Planet System Specification Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Authorized multi-branch K-12 tuition center management, LMS database mapping & AI infrastructure specs.
          </p>
        </div>

        {/* Global Blueprint Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search specs (e.g. database, APIs)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 pl-9 pr-3 py-1.5 rounded-lg text-xs text-slate-300 placeholder-slate-650 focus:outline-none focus:border-brand-yellow/50"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[450px]">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 bg-slate-900/40 border-r border-slate-900 p-3.5 space-y-3 shrink-0 Overflow-y-auto">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono block px-1.5">
            Table of Contents
          </span>

          <div className="space-y-1">
            {filteredChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                  activeChapter === ch.id 
                    ? "bg-brand-yellow/10 text-brand-yellow font-black border-l-2 border-brand-yellow pl-2.5" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {ch.icon}
                  <span className="truncate text-xs">{ch.title}</span>
                </div>
                <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded shrink-0 uppercase tracking-widest ${
                  ch.category === "Strategy" ? "bg-cyan-950/20 text-cyan-400" :
                  ch.category === "Architecture" ? "bg-purple-950/20 text-purple-400" :
                  ch.category === "Data" ? "bg-emerald-950/20 text-emerald-400" :
                  "bg-orange-950/20 text-orange-400"
                }`}>
                  {ch.category[0]}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 border border-slate-900/60 p-3 rounded-xl space-y-1.5">
            <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Developer Sandbox</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              Press buttons on the right to copy Postgres scripts (DDLs) or mock payload objects to speed up backend coding.
            </p>
          </div>
        </div>

        {/* Dynamic Chapter Frame */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-950/10">
          
          {/* 1. PRODUCT PRD & EXECUTIVE SUMMARY */}
          {activeChapter === "prd-summary" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 01</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Product Requirements Document (PRD) Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-900/40 p-3.5 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Vision Goal</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To construct the premium Gulf standard LMS & SMS platform ensuring direct communication, academic telemetry, automatic board prep diagnostics, and responsive K12 tracking tools.
                  </p>
                </div>
                <div className="bg-slate-900/40 p-3.5 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Target Audience</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    UAE, Indian & expatriate households targeting high-grade preps in CBSE boards and Cambridge / Pearson British Edexcel curriculum models.
                  </p>
                </div>
                <div className="bg-slate-900/40 p-3.5 border border-slate-900 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Core Metrics</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Admissions transaction velocity, fee collections collection efficiency (Target &gt;98%), user retention, weekly diagnostic test count, and WhatsApp lead status response speeds.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Functional Scope Limits</h4>
                <div className="bg-slate-900/80 border border-slate-900/80 rounded-xl p-4 space-y-3">
                  <div className="flex gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200 block font-semibold">Tuition Centre Management (SMS)</strong>
                      <span className="text-slate-400 block leading-relaxed mt-0.5">
                        Dual-campus physical booking, live biometric registration schedules, auto conflict-detection matrix for classrooms, and batch capacity threshold controls.
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200 block font-semibold">Learning Management System (LMS)</strong>
                      <span className="text-slate-400 block leading-relaxed mt-0.5">
                        Interactive hierarchy mapping curriculums to specific Grades &gt; Subjects &gt; Chapters &gt; Topics &gt; Lesson materials (Direct PDFs, downloadable exam practice kits, and step-marking revision keys).
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200 block font-semibold">AI Assistant Mindy & Doubt Solver Hub</strong>
                      <span className="text-slate-400 block leading-relaxed mt-0.5">
                        Instant OCR diagnostics for captured math or physics textbook sheets. Emulates a caring tutor providing Socratic questioning to guide students toward the formulation steps without delivering the immediate answer sheet directly.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. USER STORIES */}
          {activeChapter === "user-stories" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 02</span>
                <h3 className="text-xl font-bold text-white tracking-tight">System Personas & User Stories</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-950 text-rose-300 text-xs font-bold flex items-center justify-center">SA</span>
                    <strong className="text-slate-200 font-semibold text-xs">As a Super Admin...</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "I want to track revenue, outstanding arrears, branch-wise staff performance, conversion ratios, and onboarding metrics across multiple campuses such as Al Qusais, Silicon Oasis, and Sharjah through a centralized telemetry console so we can maintain operational profitability."
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold flex items-center justify-center">S</span>
                    <strong className="text-slate-200 font-semibold text-xs">As a Sales Agent...</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "I want a quick CRM Kanban pipeline showing leads progressing from Initial Inquiry → Warm Follow-up → Free Trial Class → Deposit Paid → KHDA Registration, so that we minimize leakages in the customer acquisition funnel."
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-955 text-emerald-300 text-xs font-bold flex items-center justify-center">T</span>
                    <strong className="text-slate-200 font-semibold text-xs">As a Classroom Teacher...</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "I want to view today's active schedule, record digital student attendances instantly via mobile, post PDF homework guides, and grade board-prep marks online, so parents can trace their children's real-time progress."
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-955 text-amber-300 text-xs font-bold flex items-center justify-center">ST</span>
                    <strong className="text-slate-200 font-semibold text-xs">As an Active Student...</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "I want to chat with Mindy AI to resolve equations, receive daily revision alerts at my preferred study hour, answer board Readiness quizzes to earn XP rewards, and download specific physics/chemistry revision lists."
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-955 text-purple-300 text-xs font-bold flex items-center justify-center">P</span>
                    <strong className="text-slate-200 font-semibold text-xs">As a Worried Parent...</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "I want to receive automated SMS alerts if my child is absent, review their diagnostic test scorecard, download teacher feedback letters, and securely settle upcoming subscription/tuition fees online via Stripe or local portals."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. POSTGRESQL SCHEMA */}
          {activeChapter === "database-schema" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 03</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">PostgreSQL Relational Schema</h3>
                </div>
                <button
                  onClick={() => handleCopy(postgresDDL, "postgres-ddl")}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded font-mono hover:text-white flex items-center gap-1 active:scale-95"
                >
                  {copiedId === "postgres-ddl" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === "postgres-ddl" ? "Copied DDL" : "Copy Schema DDL"}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Relational schema normalized to 3NF. Supports multi-branch auditing, cascading deletes, structured financial VAT ledgers, and fast-indexing coordinates.
              </p>

              <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden font-mono text-[11px] leading-relaxed shadow-inner">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-850 flex items-center justify-between">
                  <span className="text-slate-400">plato_planet_schema.sql</span>
                  <span className="text-[9px] text-slate-500 font-mono">Drizzle Orm compatible postgres dialect</span>
                </div>
                <div className="p-4 max-h-[400px] overflow-y-auto text-emerald-400 bg-slate-950/90 whitespace-pre">
                  {postgresDDL}
                </div>
              </div>

              <div className="bg-slate-900/20 p-4 border border-slate-900 rounded-xl">
                <h4 className="text-xs font-bold text-slate-200 mb-2 uppercase tracking-wide">Key Database Indices (Optimized for scale)</h4>
                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                  <li><code>idx_students_curr_grade</code> on table <code>students(curriculum, grade)</code> for ultra-fast LMS materials queries.</li>
                  <li><code>idx_leads_crm_status</code> on <code>leads(status, assigned_branch_id)</code> for immediate pipeline reporting.</li>
                  <li><code>idx_finance_due_date</code> on <code>invoices(status, invoice_due)</code> to trigger automatic WhatsApp payment reminders.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 4. REST ENDPOINTS */}
          {activeChapter === "api-specs" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 04</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">Enterprise REST API Specifications</h3>
                </div>
                <button
                  onClick={() => handleCopy(apiSampleJson, "api-payload")}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded font-mono hover:text-white flex items-center gap-1 active:scale-95"
                >
                  {copiedId === "api-payload" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === "api-payload" ? "Copied JSON" : "Copy Mock Payload"}</span>
                </button>
              </div>

              <div className="space-y-4">
                
                {/* Endpoint 1 */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-850 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-950 text-emerald-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded">POST</span>
                      <code className="text-xs font-bold text-white">/api/crm/leads/inquire</code>
                    </div>
                    <span className="text-slate-550 text-[10px]">Sales Inquiry Pipeline Entry</span>
                  </div>
                  <div className="p-3.5 space-y-2 text-xs">
                    <p className="text-slate-400">Registers a potential student lead from web forms, instantly matching their curriculum preference and routing to the corresponding regional branch coordinator.</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      <strong>Headers:</strong> <code className="text-slate-400">Content-Type: application/json | X-API-Key: client_sec...</code>
                    </div>
                  </div>
                </div>

                {/* Endpoint 2 */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-850 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-950 text-blue-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded">GET</span>
                      <code className="text-xs font-bold text-white">/api/lms/materials/:studentGrade</code>
                    </div>
                    <span className="text-slate-550 text-[10px]">Filtered Syllabus Hub Files</span>
                  </div>
                  <div className="p-3.5 space-y-2 text-xs">
                    <p className="text-slate-400">Fetches curated NCERT solutions, British board transformation packets, and exam readiness sheets based on student profile curricula constraints.</p>
                  </div>
                </div>

                {/* Endpoint 3 */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-850 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="bg-amber-950 text-amber-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded">POST</span>
                      <code className="text-xs font-bold text-white">/api/ai/doubt-solver/ocr-analyze</code>
                    </div>
                    <span className="text-slate-550 text-[10px]">Gemini Vision Math Interpreter</span>
                  </div>
                  <div className="p-3.5 space-y-2 text-xs">
                    <p className="text-slate-400">Receives standard multipart image captures, performs server-side structural OCR tokenization, and queries vector indices to output stepwise Socratic suggestions.</p>
                  </div>
                </div>

                {/* Sample JSON payload preview */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">Sample Unified API Success Response:</span>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-slate-400 font-mono text-[10px] overflow-x-auto whitespace-pre">
                    {apiSampleJson}
                  </pre>
                </div>

              </div>
            </div>
          )}

          {/* 5. RBAC MATRIX */}
          {activeChapter === "rbac-matrix" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 05</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Role-Based Access Control (RBAC) Web Matrix</h3>
              </div>

              <div className="overflow-x-auto border border-slate-900 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 font-mono text-[9.5px] uppercase tracking-wide border-b border-slate-850">
                      <th className="p-3">Feature Area</th>
                      <th className="p-3 text-center">Super Admin</th>
                      <th className="p-3 text-center">Branch Admin</th>
                      <th className="p-3 text-center">Teacher</th>
                      <th className="p-3 text-center">Student</th>
                      <th className="p-3 text-center">Parent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300 bg-slate-950/40">
                    <tr>
                      <td className="p-3 font-semibold text-white">Branch Setup &amp; Pricing Config</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓ (Full)</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">CRM Lead Onboarding &amp; Pipelines</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓ (Read All)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Branch Only)</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Course Catalog &amp; PDF Uploads</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓ (Edit/Bulk)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Read Only)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Upload Files)</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Attendance Tracking Logs</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓ (Read)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Audit)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Fill/Update)</td>
                      <td className="p-3 text-center text-indigo-400">✓ (View Own)</td>
                      <td className="p-3 text-center text-indigo-400">✓ (View Child)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Arrears, Fees &amp; Stripe Transactions</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓ (Settle/Refund)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Check Arrears)</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Pay Online)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">AI Mindy Doubt Solver Sandbox</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-slate-600">—</td>
                      <td className="p-3 text-center text-indigo-400">✓ (Moderate)</td>
                      <td className="p-3 text-center text-emerald-400">✓ (Unlimited Prompt)</td>
                      <td className="p-3 text-center text-indigo-400">✓ (Check Prompts)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. SYSTEM ARCHITECTURE */}
          {activeChapter === "system-architecture" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 06</span>
                <h3 className="text-xl font-bold text-white tracking-tight">System &amp; SaaS Infrastructure Architecture</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Rendered container topology. Designed for 100,000+ concurrent students across 5 locations with high availability and Docker container clustering.
              </p>

              {/* ASCII/Visual Layout box of servers */}
              <div className="border border-slate-900 rounded-xl p-4 bg-slate-900/20 font-mono text-[10px] text-slate-350 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="border border-brand-yellow/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-brand-yellow block font-bold">DNS &amp; EDGE</span>
                    <span className="text-slate-500 block">Cloudflare Pro DNS • HTTPS Edge</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-slate-400">Rate Limiting</span>
                  </div>
                  <div className="border border-indigo-500/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-indigo-400 block font-bold">LOAD BALANCERS</span>
                    <span className="text-slate-500 block">Nginx reverse routing proxy layer</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-slate-400">SSL termination</span>
                  </div>
                  <div className="border border-purple-500/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-purple-400 block font-bold">KUBE PODS</span>
                    <span className="text-slate-500 block">NestJS API microservices pool</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-slate-400">Horizontal Auto-scale</span>
                  </div>
                </div>

                <div className="text-center text-slate-550 flex items-center justify-center gap-1">
                  <span>↓↓ Secure Internal VPC Peering (GCP VPC) ↓↓</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="border border-emerald-500/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-emerald-400 block font-bold">PRIMARY POSTGRES DB</span>
                    <span className="text-slate-500 block">Scale-to-zero scale, WAL archiving</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-slate-400">Drizzle/Sequelize Dialect</span>
                  </div>
                  <div className="border border-cyan-500/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-cyan-400 block font-bold">ASSETS STORAGE</span>
                    <span className="text-slate-500 block">AWS S3 / Cloud Bucket</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-teal-400">Presigned URLs</span>
                  </div>
                  <div className="border border-red-500/30 bg-slate-950 p-3 rounded-lg text-center space-y-1">
                    <span className="text-red-400 block font-bold">REAL-TIME REDIS</span>
                    <span className="text-slate-500 block">High-speed chat/message sockets</span>
                    <span className="text-[8px] bg-slate-900 px-1 text-slate-400">Cache expiration Pub-Sub</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-4 border border-slate-900 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Disaster Recovery &amp; Sizable SLA:</span>
                <p className="text-slate-400 leading-relaxed">
                  Backup cron is triggered automatically at 02:00 UAE time daily. Schema state is recorded directly inside GitHub repository control streams, guaranteeing immediate hot-swappable failover recovery in less than 5 minutes.
                </p>
              </div>
            </div>
          )}

          {/* 7. AI AGENT ARCHITECTURE */}
          {activeChapter === "ai-agent-architecture" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 07</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Mindy AI Tutor &amp; OCR Doubt Solver Pipeline</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                The Socratic chatbot handles continuous queries via custom grounding logic and server-side text compilation wrappers to protect API secrets.
              </p>

              {/* RAG pipeline drawing */}
              <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl space-y-3.5 text-xs text-slate-350">
                <h4 className="font-bold text-white uppercase tracking-wide text-xs">The Socratic AI Guardrail Workflow</h4>
                <div className="relative pl-6 border-l border-slate-800 space-y-4">
                  
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-brand-yellow text-slate-950 font-mono text-[9px] font-black flex items-center justify-center">1</div>
                    <strong className="text-slate-200 block font-semibold">Optical Character Recognition Tokenizer</strong>
                    <span className="text-slate-400 mt-0.5 block leading-relaxed">
                      Captured book sheets or formulas have their pixels isolated, processed via Tesseract/Google Vision, and compiled as contextual raw strings.
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-indigo-500 text-white font-mono text-[9px] font-black flex items-center justify-center">2</div>
                    <strong className="text-slate-200 block font-semibold">Semantic Vector Grounding Lookup</strong>
                    <span className="text-slate-400 mt-0.5 block leading-relaxed">
                      The query filters NCERT datasets and IGCSE past databases to retrieve matching mark schemes and specific curriculum guidelines.
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-purple-500 text-white font-mono text-[9px] font-black flex items-center justify-center">3</div>
                    <strong className="text-slate-200 block font-semibold">Socratic Instruction Injector (System Guard)</strong>
                    <span className="text-slate-400 mt-0.5 block leading-relaxed italic text-[11px] bg-slate-950 border border-slate-900 p-2 rounded-lg">
                      "CRITICAL: Never output the final mathematical answer or proof directly! Verify if the student listed step b² - 4ac, suggest calculations in a friendly, encouraging manner, and query if they want to review a parallel CBSE worksheet."
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 font-mono text-[9px] font-black flex items-center justify-center">4</div>
                    <strong className="text-slate-200 block font-semibold font-mono">Google Gemini API proxy execution</strong>
                    <span className="text-slate-400 mt-0.5 block leading-relaxed">
                      Secret API key loaded lazily server-side. Generates safe markdown text responses returned to the student UI without client leaks.
                    </span>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* 8. CRM & FEE WORKFLOWS */}
          {activeChapter === "crm-fee-architecture" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 08</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Tuition CRM Pipeline &amp; Automated Fee Workflows</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* CRM block */}
                <div className="bg-slate-900/30 p-4 border border-slate-900 rounded-xl space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-brand-yellow" />
                    Admissions CRM Funnel
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tracks customer acquisition directly from websites or foot traffic. Triggers instant WhatsApp and SMS follow-ups.
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between border-b border-slate-900 py-1">
                      <span className="text-slate-500">1. Inquiry Inflow</span>
                      <span className="bg-slate-955 text-zinc-300 font-mono text-[9px] px-1.5 rounded">Form submitted</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 py-1">
                      <span className="text-slate-500">2. Free Trial Booking</span>
                      <span className="bg-slate-955 text-brand-yellow font-mono text-[9px] px-1.5 rounded">Al Qusais campus</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 py-1">
                      <span className="text-slate-500">3. Deposit Settle</span>
                      <span className="bg-emerald-950 text-emerald-400 font-mono text-[9px] px-1.5 rounded">Paid via link</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">4. KHDA Portal Sync</span>
                      <span className="bg-blue-950 text-blue-400 font-mono text-[9px] px-1.5 rounded">Registered UAE database</span>
                    </div>
                  </div>
                </div>

                {/* Fee management block */}
                <div className="bg-slate-900/30 p-4 border border-slate-900 rounded-xl space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Automated Fee Billing Logic
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Schedules recurring monthly billing on a per-subject plan, factoring in physical books and sibling package discount ratios.
                  </p>
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg space-y-1 text-slate-400 font-mono text-[10px]">
                    <div><strong>Subscription plan billing schedule:</strong></div>
                    <div className="text-emerald-400 mt-1">If (Invoice.Age &gt; 3 days) &#123;</div>
                    <div className="pl-3">triggerWarnWhatsApp(Parent.tel, Invoice);</div>
                    <div className="pl-3">triggerAppBlockNotification(Student.id);</div>
                    <div className="text-emerald-400">&#125; else If (Paid) &#123;</div>
                    <div className="pl-3">incrementXpReward(Student.profile, 50);</div>
                    <div className="text-emerald-400">&#125;</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 9. ACADEMIC CBSE VS IGCSE */}
          {activeChapter === "academic-workflows" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 09</span>
                <h3 className="text-xl font-bold text-white tracking-tight">CBSE vs. IGCSE Board Workflows</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* CBSE Grid */}
                <div className="bg-slate-900/40 p-4 border border-slate-900 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] bg-red-950 text-red-400 font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase block w-fit">
                    CBSE Indian Board Division
                  </span>
                  <h4 className="font-bold text-white mt-1">Competency-Based Syllabus & Formulas</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Strict adherence to NCERT, focusing on CBSE step-marking guidelines for math formulas, and pre-board mock diagnostics to identify weak scores.
                  </p>
                  <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc pl-4 mt-2">
                    <li>NCERT Exemplar question bank integrations.</li>
                    <li>Automatic Percentage predictors matching previous trends.</li>
                    <li>Syllabus Tracker mapping Grade-10 Trigonometry steps.</li>
                  </ul>
                </div>

                {/* IGCSE Grid */}
                <div className="bg-slate-900/40 p-4 border border-slate-900 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] bg-blue-950 text-blue-400 font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase block w-fit">
                    British IGCSE / A-Levels
                  </span>
                  <h4 className="font-bold text-white mt-1">Past papers, Mark Schemes & Variants</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Aggregates past paper variants (Variant 1, 2, 3) from Pearson Edexcel and Cambridge IGCSE, together with detailed examiner report footnotes.
                  </p>
                  <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc pl-4 mt-2">
                    <li>Cambridge International exam readiness formulas.</li>
                    <li>Predicted grade bands matching standard score thresholds.</li>
                    <li>Direct downloads of question papers and official keys.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* 10. UX WIREFRAMES */}
          {activeChapter === "ux-wireframes" && (
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-wider block">Chapter 10</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Navigation &amp; Mobile Dashboard Wireframes</h3>
              </div>

              <div className="bg-slate-900/30 p-4 border border-slate-900 rounded-xl space-y-3.5 text-xs">
                <h4 className="font-bold text-slate-200">The 3-Tab Decluttered App Shell Architecture</h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Following strict clean guidelines, the complex Multi-branch SaaS features are accessible natively without clutter. Below is the blueprint map:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[10px] text-center">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
                    <span className="text-brand-yellow block font-bold">1. PRIMARY HUB</span>
                    <p className="text-[9px] text-slate-500 leading-tight">Student dashboard, streak tracker, current revision plans, downloadable PDFs, local campus addresses.</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
                    <span className="text-indigo-400 block font-bold">2. TUITION PROGRAMS</span>
                    <p className="text-[9px] text-slate-500 leading-tight">Interactive courses list (CBSE science, physics prep, oratory specs), trial booking reservation form, price ranges.</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
                    <span className="text-purple-400 block font-bold">3. MINDY AI ASSISTANT</span>
                    <p className="text-[9px] text-slate-500 leading-tight">Socratic physics revision questions pool, board preparation challenges, AI Study buddy revision scheduler.</p>
                  </div>
                </div>

                <div className="p-3 bg-brand-yellow/5 border border-brand-yellow/10 rounded-xl text-slate-350 leading-relaxed">
                  <span className="text-brand-yellow font-bold text-[11px] block mb-1">💡 SaaS Design Note • Proportional Scalability:</span>
                  This 3-tab lightweight structure guarantees maximum UX conversion speed while giving administrators full database telemetry via the side desktop spec sheet.
                </div>
              </div>
            </div>
          )}

          {/* 11. CLASSPRO COACHING TERMINAL (Interactive Admin Model Inputs) */}
          {activeChapter === "classpro-console" && (
            <div className="space-y-6">
              <div className="border-b border-slate-900 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">Chapter 11 • Interactive Admin Live Sandpit</span>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                    Classpro Live CRM &amp; Management Console
                  </h3>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-mono">
                  Role: Super Admin / Branch Manager
                </div>
              </div>

              {/* CRM Lead Pipeline Manager */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Classpro High-Fidelity Lead CRM Registry
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{classproLeads.length} active leads</span>
                </div>

                {/* Grid for forms + tables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Form to enter new lead */}
                  <div className="lg:col-span-5 bg-slate-950/80 p-3.5 border border-slate-800/80 rounded-lg space-y-3">
                    <span className="text-xs font-bold text-emerald-400 block">Capture New Branch Enquiry</span>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 block">Student Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Miriam Al-Zarouni" 
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        id="classpro-lead-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block">Grade Target</label>
                        <select 
                          value={newLeadGrade}
                          onChange={(e) => setNewLeadGrade(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 text-xs"
                          id="classpro-lead-grade-select"
                        >
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Board Curriculum</label>
                        <select 
                          value={newLeadBoard}
                          onChange={(e) => setNewLeadBoard(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 text-xs"
                          id="classpro-lead-board-select"
                        >
                          <option>CBSE</option>
                          <option>IGCSE</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block">Phone UAE</label>
                        <input 
                          type="text" 
                          placeholder="+971 50..." 
                          value={newLeadPhone}
                          onChange={(e) => setNewLeadPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          id="classpro-lead-phone-input"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Inquiry Source</label>
                        <select 
                          value={newLeadSource}
                          onChange={(e) => setNewLeadSource(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 text-xs"
                          id="classpro-lead-source-select"
                        >
                          <option>Google Search</option>
                          <option>Instagram Ads</option>
                          <option>School Seminar</option>
                          <option>Parent Referral</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (!newLeadName.trim()) return;
                        const nl = {
                          id: `lead-${Date.now()}`,
                          name: newLeadName,
                          grade: newLeadGrade,
                          board: newLeadBoard,
                          phone: newLeadPhone || "+971 50 000 0000",
                          source: newLeadSource,
                          status: "Cold Prospect"
                        };
                        setClassproLeads([...classproLeads, nl]);
                        setNewLeadName("");
                        setNewLeadPhone("");
                        setAttendanceBroadcastLogs(prev => [
                          `🆕 Admin CRM: Inputted new lead [${nl.name}] registered for ${nl.board} - ${nl.grade}. Assigned to triage queue.`,
                          ...prev
                        ]);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 duration-150 text-white font-medium text-xs py-1.5 rounded"
                      id="classpro-lead-submit-btn"
                    >
                      Process Lead Capture
                    </button>
                  </div>

                  {/* Table displaying the lead database */}
                  <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-2 overflow-x-auto">
                    <span className="text-xs font-bold text-slate-400 block">Classpro Dynamic CRM Lead Pipeline</span>
                    <table className="w-full text-xs text-left" id="classpro-leads-table">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
                          <th className="py-1.5">Enquirer</th>
                          <th className="py-1.5">Program Details</th>
                          <th className="py-1.5">Lead Source</th>
                          <th className="py-1.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300">
                        {classproLeads.map((l) => (
                          <tr key={l.id} className="hover:bg-slate-900/50">
                            <td className="py-2">
                              <div className="font-semibold text-slate-200">{l.name}</div>
                              <div className="text-[10px] text-slate-500">{l.phone}</div>
                            </td>
                            <td className="py-2">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold mr-1 ${l.board === "CBSE" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"}`}>
                                {l.board}
                              </span>
                              <span className="text-slate-400">{l.grade}</span>
                            </td>
                            <td className="py-2 text-[11px] text-slate-400">{l.source}</td>
                            <td className="py-2 text-right">
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-brand-yellow text-[9px] border border-brand-yellow/15 font-mono">
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Classpro Dynamic Batch Scheduler */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                    Allen &amp; Physics Wallah-Compatible Batch Provisioning
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{classproBatches.length} Active Batches</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Create Batch Intake */}
                  <div className="lg:col-span-5 bg-slate-950/80 p-3.5 border border-slate-800/80 rounded-lg space-y-2.5">
                    <span className="text-xs font-bold text-slate-250 block">Allocate New Smart-Batch</span>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">Batch Code Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. PW Boards Math Group Beta" 
                        value={newBatchName}
                        onChange={(e) => setNewBatchName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        id="classpro-batch-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 block">Assigned Instructor</label>
                        <select 
                          value={newBatchInstr}
                          onChange={(e) => setNewBatchInstr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 text-xs"
                          id="classpro-batch-instructor-select"
                        >
                          <option>Dr. Satish Kumar</option>
                          <option>Prof. Alistair Vance</option>
                          <option>Dr. Farah Jamil</option>
                          <option>Mindy AI Tutor Hub</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Max Size</label>
                        <input 
                          type="number" 
                          value={newBatchCap}
                          onChange={(e) => setNewBatchCap(parseInt(e.target.value) || 20)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
                          id="classpro-batch-cap-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">Time-Slot / Frequency</label>
                      <input 
                        type="text" 
                        value={newBatchTime}
                        onChange={(e) => setNewBatchTime(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
                        id="classpro-batch-time-input"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        if (!newBatchName.trim()) return;
                        const nb = {
                          id: `batch-${Date.now()}`,
                          name: newBatchName,
                          capacity: newBatchCap,
                          enrolled: 1,
                          instructor: newBatchInstr,
                          timing: newBatchTime
                        };
                        setClassproBatches([...classproBatches, nb]);
                        setNewBatchName("");
                        setAttendanceBroadcastLogs(prev => [
                          `🛡️ System: Provisioned new batch cohort [${nb.name}] with cap of ${nb.capacity} students. Assigned to ${nb.instructor}.`,
                          ...prev
                        ]);
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-500 duration-150 text-white font-medium text-xs py-1.5 rounded"
                      id="classpro-batch-submit-btn"
                    >
                      Provision New Coaching Batch
                    </button>
                  </div>

                  {/* Batch Roster list */}
                  <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-2">
                    <span className="text-xs font-bold text-slate-400 block">Classpro Interactive Scheduler Workspace</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs" id="classpro-batches-grid">
                      {classproBatches.map((b) => (
                        <div key={b.id} className="bg-slate-900/60 border border-slate-800 p-2.5 rounded hover:border-slate-700 duration-150 space-y-1">
                          <div className="font-bold text-slate-200 truncate">{b.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono leading-tight flex items-center justify-between">
                            <span>👩‍🏫 {b.instructor}</span>
                            <span>⏳ {b.timing}</span>
                          </div>
                          
                          {/* Capacity ratio bar */}
                          <div className="mt-2 text-[10px] flex items-center justify-between">
                            <span className="text-slate-400">Enrolled Core Ratio:</span>
                            <span className="font-mono text-emerald-400">{b.enrolled}/{b.capacity}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1">
                            <div 
                              className="bg-emerald-500 h-1 rounded-full" 
                              style={{ width: `${Math.round((b.enrolled / b.capacity) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* UAE 5% VAT Standard Fee & Invoice Ledger */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    VAT-Registered Consolidated Fee &amp; Invoices (UAE 5% VAT SLA)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[9px] font-mono text-emerald-400 border border-emerald-500/25">
                    Standard VAT 5% Included
                  </span>
                </div>

                <div className="bg-slate-950/40 p-3 border border-slate-800 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-5 space-y-1">
                      <label className="text-[10px] text-slate-400 block">Student Registered Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Zayd Al-Mansoori" 
                        value={newInvoiceStudent}
                        onChange={(e) => setNewInvoiceStudent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                        id="classpro-bill-student-input"
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[10px] text-slate-400 block">Base Monthly Fee (AED)</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1 font-mono text-[10px] text-slate-500">AED</span>
                        <input 
                          type="number" 
                          value={newInvoiceBase}
                          onChange={(e) => setNewInvoiceBase(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-800 rounded pl-10 pr-2 py-1 text-slate-200 text-xs focus:outline-none"
                          id="classpro-bill-base-input"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <button 
                        onClick={() => {
                          if (!newInvoiceStudent.trim()) return;
                          const base = newInvoiceBase;
                          const vat = base * 0.05;
                          const total = base + vat;
                          const inv = {
                            id: `inv-${Date.now()}`,
                            studentName: newInvoiceStudent,
                            baseFee: base,
                            taxVat: vat,
                            totalFee: total,
                            status: "Outstanding" as const
                          };
                          setClassproFeeInvoices([...classproFeeInvoices, inv]);
                          setNewInvoiceStudent("");
                          setAttendanceBroadcastLogs(prev => [
                            `🧾 Invoicing: Dispatched parent invoice for ${inv.studentName}. Base: AED ${inv.baseFee}, Standard 5% VAT (AED ${inv.taxVat.toFixed(1)}) applied. Total: AED ${inv.totalFee.toFixed(1)}.`,
                            ...prev
                          ]);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-1.5 rounded flex items-center justify-center gap-1"
                        id="classpro-bill-submit-btn"
                      >
                        <DollarSign className="w-3.5 h-3.5" /> Generates 5% VAT Invoice
                      </button>
                    </div>
                  </div>

                  {/* Ledger list */}
                  <table className="w-full text-xs text-left text-slate-350 mt-3" id="classpro-ledger-table">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
                        <th className="py-1">Bill Reference</th>
                        <th className="py-1">Base Fee</th>
                        <th className="py-1">UAE VAT (5%)</th>
                        <th className="py-1">Total Fee</th>
                        <th className="py-1 text-right">Settlement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {classproFeeInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-900/35">
                          <td className="py-2">
                            <div className="font-bold text-slate-200">{inv.studentName}</div>
                            <div className="text-[9px] text-slate-500 font-mono">ID: {inv.id}</div>
                          </td>
                          <td className="py-2 text-slate-300 font-mono">AED {inv.baseFee}</td>
                          <td className="py-2 text-slate-400 font-mono">AED {inv.taxVat.toFixed(1)}</td>
                          <td className="py-1.5 font-bold text-white font-mono">AED {inv.totalFee.toFixed(1)}</td>
                          <td className="py-2 text-right">
                            <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" : "bg-rose-500/10 text-rose-400 border border-rose-500/25"}`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dynamic SMS Attendance Logs & Hardware Sim */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    Biometric Fingerprint / RFID Attendance Simulation SMS Log
                  </span>
                  <button 
                    onClick={() => {
                      const names = ["Rohan Bhatia", "Zayd Al-Mansoori", "Sarah Hussain", "Aisha Al-Mansoori", "Vihaan Nair"];
                      const randomName = names[Math.floor(Math.random() * names.length)];
                      const hubs = ["Dubai Al Qusais Hub", "Abu Dhabi Branch A", "Sharjah Rolla Gate"];
                      const currentHub = hubs[Math.floor(Math.random() * hubs.length)];
                      const timeString = new Date().toLocaleTimeString();

                      const logLine = `📸 BIOMETRIC TAP: Registered [${randomName}] finger scan at ${currentHub}. Match confidence 99.4%. Dispatching automated SMS broadcast parent alert...`;
                      const smsLine = `📲 SMS TRANSMITTED: "Dear parent, ${randomName} has arrived safely inside Plato's ${currentHub} at ${timeString}. System logs verified."`;

                      setAttendanceBroadcastLogs(prev => [logLine, smsLine, ...prev]);
                    }}
                    className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 duration-150 rounded text-slate-100 text-[11px] font-semibold flex items-center gap-1"
                    id="classpro-biometric-trigger-btn"
                  >
                    Simulate RFID/Fingerprint Register Tap
                  </button>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-sky-400 space-y-1 max-h-36 overflow-y-auto" id="classpro-logs-box">
                  {attendanceBroadcastLogs.map((logStr, idx) => (
                    <div key={idx} className="leading-tight select-none">
                      {logStr}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Complex Multi-branch DDL mapping
const postgresDDL = `
-- ========================================================
-- PLATO'S PLANET — DATABASE SCHEMA BLUEPRINT 
-- Normalized 3NF Dialect • PostgreSQL Engine v16
-- ========================================================

CREATE TABLE branches (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  location VARCHAR(256) NOT NULL, -- e.g. "Al Qusais, Dubai, UAE"
  phone VARCHAR(32),
  license_number VARCHAR(128),     -- KHDA UAE official license
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles_permissions (
  role_name VARCHAR(64) PRIMARY KEY, -- "SUPER_ADMIN", "TEACHER", "STUDENT", "PARENT"
  can_manage_branches BOOLEAN DEFAULT FALSE,
  can_billing_audit BOOLEAN DEFAULT FALSE,
  can_grade_students BOOLEAN DEFAULT FALSE,
  can_chat_ai BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  email VARCHAR(256) UNIQUE NOT NULL,
  password_hash VARCHAR(512) NOT NULL,
  curr_grade VARCHAR(64) NOT NULL,   -- e.g. "Grade 10"
  curriculum VARCHAR(128) NOT NULL,  -- "CBSE" or "British"
  streak_count INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  active_branch_id VARCHAR(64) REFERENCES branches(id) ON DELETE RESTRICT,
  parent_contact VARCHAR(32) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  curriculum VARCHAR(128) NOT NULL,  -- "CBSE" or "British"
  grade_level VARCHAR(64) NOT NULL,
  description TEXT,
  monthly_fee NUMERIC(10, 2) NOT NULL,
  max_capacity INTEGER DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) REFERENCES students(id) ON DELETE CASCADE,
  course_id VARCHAR(64) REFERENCES courses(id) ON DELETE RESTRICT,
  enrollment_status VARCHAR(64) DEFAULT 'ACTIVE', -- 'PENDING', 'ACTIVE', 'COMPLETED'
  enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trials_schedule (
  id VARCHAR(64) PRIMARY KEY,
  candidate_name VARCHAR(256) NOT NULL,
  parent_name VARCHAR(256) NOT NULL,
  candidate_phone VARCHAR(32) NOT NULL,
  course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
  branch_id VARCHAR(64) REFERENCES branches(id) ON DELETE CASCADE,
  scheduled_time TIMESTAMP NOT NULL,
  is_visited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) REFERENCES students(id) ON DELETE RESTRICT,
  amount NUMERIC(10, 2) NOT NULL,
  vat_amount NUMERIC(10, 2) NOT NULL, -- 5% UAE standard VAT charge
  status VARCHAR(64) DEFAULT 'UNPAID', -- 'UNPAID', 'PAID', 'OVERDUE'
  invoice_due DATE NOT NULL,
  payment_processed_at TIMESTAMP,
  stripe_charge_id VARCHAR(256)
);

CREATE TABLE lms_materials (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(256) NOT NULL,
  file_url VARCHAR(512) NOT NULL, -- AWS S3 safe link
  file_size VARCHAR(128) DEFAULT '1.2 MB',
  curriculum VARCHAR(128) NOT NULL
);

-- Optimized query indices for multi-branch scale
CREATE INDEX idx_students_curr_grade ON students (curriculum, curr_grade);
CREATE INDEX idx_trials_scheduled_time ON trials_schedule (scheduled_time);
CREATE INDEX idx_invoices_status ON invoices (status, invoice_due);
`;

const apiSampleJson = `{
  "status": "success",
  "meta": {
    "requestId": "api-req-8473210-platoplanet",
    "timestamp": "2026-06-16T16:11:00Z",
    "processingTimeMs": 1.25
  },
  "data": {
    "lead": {
      "id": "lead-381x-9",
      "studentName": "Zayd Al-Mansoori",
      "parentName": "Al-Mansoori Family",
      "curriculum": "British",
      "targetGrade": "Grade 10",
      "assignedBranch": {
        "id": "branch-al-qusais",
        "name": "Plato's Planet Hub Dubai",
        "phone": "+971 4 263 6253",
        "address": "Al Qusais Building, Ground Floor, Dubai"
      },
      "pipelineStatus": "Trial Scheduled",
      "stripeDraftInvoiceId": "inv_1Nz789L34"
    },
    "lmsRecommendedArticles": [
      {
        "id": "doc-br-phy-02",
        "title": "Cambridge IGCSE Lens Sign Convention Tips",
        "size": "980 KB",
        "downloadUrl": "https://s3.eu-west-1.amazonaws.com/plato-lms/british/igcse_convex_lens.pdf"
      }
    ]
  }
}`;
