import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  X, CheckCircle, AlertCircle, Info, Landmark, Users, 
  BookOpen, Calendar, ShieldAlert, Award, FileText, 
  Send, Sparkles, MessageSquare, PhoneCall, Trash2, 
  Clock, Check, Circle, ExternalLink, Play, Code, CheckSquare, BarChart2
} from "lucide-react";

// Types for Context
export interface GlobalBranch {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  studentsCount: number;
  health: "Healthy" | "Monitor" | "Needs Attention";
  revenue: string;
}

export interface GlobalTeacher {
  id: string;
  name: string;
  subject: string;
  branch: string;
  curriculum: string;
  rating: number;
}

export interface GlobalLead {
  id: string;
  parent: string;
  student: string;
  grade: string;
  curriculum: string;
  score: number;
  value: string;
  source: string;
  status: string;
}

export interface GlobalAssignment {
  id: string;
  title: string;
  dueDate: string;
  subject: string;
  points: number;
  submissionsCount: number;
}

export interface GlobalInvoice {
  id: string;
  student: string;
  parent: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  branch: string;
}

export interface GlobalToast {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "info";
}

interface GlobalActionContextType {
  branches: GlobalBranch[];
  addBranch: (b: Omit<GlobalBranch, "id" | "studentsCount" | "health" | "revenue">) => void;
  
  teachers: GlobalTeacher[];
  addTeacher: (t: Omit<GlobalTeacher, "id" | "rating">) => void;
  
  leads: GlobalLead[];
  addLead: (l: Omit<GlobalLead, "id" | "score" | "status">) => void;
  updateLeadStatus: (id: string, status: string) => void;
  
  assignments: GlobalAssignment[];
  addAssignment: (a: Omit<GlobalAssignment, "id" | "submissionsCount">) => void;
  
  invoices: GlobalInvoice[];
  addInvoice: (inv: Omit<GlobalInvoice, "id" | "status">) => void;
  updateInvoiceStatus: (id: string, status: "Paid" | "Pending" | "Overdue") => void;

  announcements: { id: string; text: string; type: string; timestamp: string }[];
  addAnnouncement: (text: string, type: string) => void;

  toasts: GlobalToast[];
  showToast: (title: string, description: string, type?: "success" | "error" | "info") => void;
  dismissToast: (id: string) => void;

  // Unified modal system
  activeModal: string | null;
  modalPayload: any;
  openModal: (type: string, payload?: any) => void;
  closeModal: () => void;
}

const GlobalActionContext = createContext<GlobalActionContextType | undefined>(undefined);

export function GlobalActionProvider({ children }: { children: React.ReactNode }) {
  // Toasts State
  const [toasts, setToasts] = useState<GlobalToast[]>([]);

  const showToast = (title: string, description: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  const openModal = (type: string, payload: any = null) => {
    setActiveModal(type);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Shared application states
  const [branches, setBranches] = useState<GlobalBranch[]>([
    { id: "b-1", name: "Dubai Marina Campus", location: "UAE Marina Heights", manager: "Farah Al-Mansoori", phone: "+971 4 456 1234", studentsCount: 420, health: "Healthy", revenue: "AED 340,000" },
    { id: "b-2", name: "Al Qusais Campus", location: "UAE Baghdad St", manager: "Ravi Chandran", phone: "+971 4 256 5678", studentsCount: 310, health: "Healthy", revenue: "AED 210,000" },
    { id: "b-3", name: "Silicon Oasis Hub", location: "DSO Techno Hub", manager: "Noura Al-Shehhi", phone: "+971 4 501 5555", studentsCount: 220, health: "Monitor", revenue: "AED 180,000" },
    { id: "b-4", name: "Sharjah Branch", location: "Sharjah Corniche", manager: "Sami El-Amin", phone: "+971 6 566 9900", studentsCount: 150, health: "Needs Attention", revenue: "AED 95,000" }
  ]);

  const [teachers, setTeachers] = useState<GlobalTeacher[]>([
    { id: "t-1", name: "Dr. Al-Mansoori", subject: "Mathematics", branch: "Dubai Marina Campus", curriculum: "IGCSE", rating: 4.9 },
    { id: "t-2", name: "Prof. Sarah Sterling", subject: "Physics", branch: "Silicon Oasis Hub", curriculum: "A-Level", rating: 4.8 },
    { id: "t-3", name: "Mr. Raj Patel", subject: "Chemistry", branch: "Al Qusais Campus", curriculum: "CBSE", rating: 4.75 },
    { id: "t-4", name: "Ms. Layla Khatib", subject: "Computer Science", branch: "Dubai Marina Campus", curriculum: "IGCSE", rating: 4.9 }
  ]);

  const [leads, setLeads] = useState<GlobalLead[]>([
    { id: "lead-1", parent: "Fatima Al-Suwaidi", student: "Hamdan Al-Suwaidi", grade: "Grade 11", curriculum: "British", score: 96, value: "AED 5,800", source: "Meta Ads", status: "New Inquiry" },
    { id: "lead-2", parent: "Dr. Sandeep Kumar", student: "Aarav Kumar", grade: "Grade 9", curriculum: "CBSE", score: 91, value: "AED 3,400", source: "Word of Mouth", status: "Trial Scheduled" },
    { id: "lead-3", parent: "Michael Sterling", student: "Chloe Sterling", grade: "Grade 12", curriculum: "British", score: 88, value: "AED 8,620", source: "Google Ads", status: "Follow-Up Pending" },
    { id: "lead-4", parent: "Aisha Al-Haddad", student: "Zayed Al-Haddad", grade: "Grade 10", curriculum: "British", score: 84, value: "AED 5,800", source: "Website", status: "Counseling Intake" }
  ]);

  const [assignments, setAssignments] = useState<GlobalAssignment[]>([
    { id: "a-1", title: "Kinematics Extended Syllabus Equations", dueDate: "Jun 18, 2026", subject: "Physics", points: 100, submissionsCount: 14 },
    { id: "a-2", title: "Quadratic Equations Real-world Modeling", dueDate: "Jun 20, 2026", subject: "Mathematics", points: 50, submissionsCount: 18 },
    { id: "a-3", title: "Aqueous Solution Solubility Product Constants", dueDate: "Jun 22, 2026", subject: "Chemistry", points: 75, submissionsCount: 4 }
  ]);

  const [invoices, setInvoices] = useState<GlobalInvoice[]>([
    { id: "inv-1", student: "Zayed Al-H Mansoori", parent: "Kabir Al-Mansoori", amount: "AED 1,840", status: "Paid", dueDate: "Jun 10, 2026", branch: "Dubai Marina Campus" },
    { id: "inv-2", student: "Hamdan Al-Suwaidi", parent: "Fatima Al-Suwaidi", amount: "AED 5,800", status: "Pending", dueDate: "Jun 25, 2026", branch: "Dubai Marina Campus" },
    { id: "inv-3", student: "Aarav Kumar", parent: "Dr. Sandeep Kumar", amount: "AED 3400", status: "Overdue", dueDate: "Jun 05, 2026", branch: "Al Qusais Campus" },
    { id: "inv-4", student: "Chloe Sterling", parent: "Michael Sterling", amount: "AED 8,620", status: "Pending", dueDate: "Jun 30, 2026", branch: "Silicon Oasis Hub" }
  ]);

  const [announcements, setAnnouncements] = useState<{ id: string; text: string; type: string; timestamp: string }[]>([
    { id: "ann-1", text: "Urgent: CBSE 10th Board Specimen Revision sheets uploaded across all portals.", type: "Alert", timestamp: "1 hour ago" },
    { id: "ann-2", text: "Dubai Marina offline center hosting live student diagnostic camps on Saturday.", type: "Info", timestamp: "4 hours ago" }
  ]);

  // Operations for states
  const addBranch = (b: Omit<GlobalBranch, "id" | "studentsCount" | "health" | "revenue">) => {
    const newBranch: GlobalBranch = {
      ...b,
      id: `b-${branches.length + 1}`,
      studentsCount: 0,
      health: b.name.includes("International") || b.name.includes("Sharjah") ? "Monitor" : "Healthy",
      revenue: "AED 0"
    };
    setBranches((prev) => [newBranch, ...prev]);
    showToast("🏠 Branch Registered Successfully", `${b.name} has been synced into state.`, "success");
  };

  const addTeacher = (t: Omit<GlobalTeacher, "id" | "rating">) => {
    const newTeacher: GlobalTeacher = {
      ...t,
      id: `t-${teachers.length + 1}`,
      rating: 5.0
    };
    setTeachers((prev) => [newTeacher, ...prev]);
    showToast("👨‍🏫 Teacher Onboarded", `${t.name} linked to subject: ${t.subject}.`, "success");
  };

  const addLead = (l: Omit<GlobalLead, "id" | "score" | "status">) => {
    const newLead: GlobalLead = {
      ...l,
      id: `lead-${leads.length + 1}`,
      score: Math.floor(Math.random() * 20) + 79, // Hot/warm range
      status: "New Inquiry"
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast("🔥 Sales Probe Logged", `Acquisitions lead for ${l.student} was parsed.`, "success");
  };

  const updateLeadStatus = (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    showToast("📋 CRM Stage Updated", `Lead status changed to: "${status}"`, "info");
  };

  const addAssignment = (a: Omit<GlobalAssignment, "id" | "submissionsCount">) => {
    const newAssignment: GlobalAssignment = {
      ...a,
      id: `a-${assignments.length + 1}`,
      submissionsCount: 0
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    showToast("📋 Lesson Homework Synced", `New task "${a.title}" posted to student portal.`, "success");
  };

  const addInvoice = (inv: Omit<GlobalInvoice, "id" | "status">) => {
    const newInvoice: GlobalInvoice = {
      ...inv,
      id: `inv-${invoices.length + 1}`,
      status: "Pending"
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    showToast("💰 Billing Invoice Despatched", `Payment ledger updated for student ${inv.student}.`, "success");
  };

  const updateInvoiceStatus = (id: string, status: "Paid" | "Pending" | "Overdue") => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status } : inv)));
    showToast("💸 Payment Ledger Adjusted", `Invoice status shifted to: ${status}`, "success");
  };

  const addAnnouncement = (text: string, type: string) => {
    const newAnn = {
      id: `ann-${announcements.length + 1}`,
      text,
      type,
      timestamp: "Just Now"
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast("📢 Direct Broadcast Despatched", `Sent broadcast notification to all active parents and candidates.`, "success");
  };

  return (
    <GlobalActionContext.Provider
      value={{
        branches,
        addBranch,
        teachers,
        addTeacher,
        leads,
        addLead,
        updateLeadStatus,
        assignments,
        addAssignment,
        invoices,
        addInvoice,
        updateInvoiceStatus,
        announcements,
        addAnnouncement,
        
        toasts,
        showToast,
        dismissToast,
        
        activeModal,
        modalPayload,
        openModal,
        closeModal
      }}
    >
      {children}
      <ModalContainer />
      <ToastContainer />
    </GlobalActionContext.Provider>
  );
}

export function useGlobalAction() {
  const context = useContext(GlobalActionContext);
  if (!context) throw new Error("useGlobalAction must be used within GlobalActionProvider");
  return context;
}

// -------------------------------------------------------------
// DYNAMIC MODAL Overlay rendering System
// Allows any button anywhere in Plato's app to open realistic flow
// -------------------------------------------------------------
function ModalContainer() {
  const { activeModal, modalPayload, closeModal, showToast, addBranch, addTeacher, addLead, addAssignment, addInvoice, updateInvoiceStatus, updateLeadStatus, addAnnouncement, branches, teachers, leads } = useGlobalAction();
  
  const [formInput, setFormInput] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Synchronise payload on load
  useEffect(() => {
    setFormInput({});
    setLoading(false);
  }, [activeModal]);

  if (!activeModal) return null;

  const handleMockSubmit = (e: React.FormEvent, successMessage: string, onExecute: () => void) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onExecute();
      setLoading(false);
      closeModal();
    }, 850);
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Container Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl animate-scale-in relative my-8">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- SUPER ADMIN MODALS --- */}
        {activeModal === "SUPER_ADMIN_CREATE_BRANCH" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Branch Registered Successfully", () => {
            addBranch({
              name: formInput.name || "Sharjah Ghafia Campus",
              location: formInput.location || "UAE Ghafia District",
              manager: formInput.manager || "Amina Al-Haji"
            });
          })} className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Landmark className="w-5 h-5 text-indigo-400" /> Register Dubai/UAE Branch
            </h3>
            <p className="text-xs text-slate-400">Establish a new high-fidelity tutoring branch in the database registry.</p>
            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Branch Name</label>
                <input required type="text" placeholder="e.g. Dubai Marina Heights Campus" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" value={formInput.name || ""} onChange={(e) => setFormInput({...formInput, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Physical Location Address</label>
                <input required type="text" placeholder="e.g. Suite 404, Dubai Marina Tower" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" value={formInput.location || ""} onChange={(e) => setFormInput({...formInput, location: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Campus General Director</label>
                <input required type="text" placeholder="e.g. Noura Al-Saeed" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" value={formInput.manager || ""} onChange={(e) => setFormInput({...formInput, manager: e.target.value})} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl transition cursor-pointer flex items-center justify-center gap-1">
              {loading ? "Registering Branch Matrix..." : "Sync Branch Database Registration"}
            </button>
          </form>
        )}

        {activeModal === "SUPER_ADMIN_ADD_TEACHER" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Teacher Onboarded Successfully", () => {
            addTeacher({
              name: formInput.name || "Dr. Fatma S.",
              subject: formInput.subject || "Mathematics",
              branch: formInput.branch || "Dubai Marina Campus",
              curriculum: formInput.curriculum || "IGCSE"
            });
          })} className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Users className="w-5 h-5 text-amber-500" /> Hire & Link Teacher Core
            </h3>
            <p className="text-xs text-slate-400">Onboard pedagogical experts to deliver interactive Plato Specimen lectures.</p>
            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Expert Faculty Name</label>
                <input required type="text" placeholder="e.g. Prof. Layla Al-Mansoori" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" value={formInput.name || ""} onChange={(e) => setFormInput({...formInput, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Subject Expertise</label>
                  <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.subject || "Mathematics"} onChange={(e) => setFormInput({...formInput, subject: e.target.value})}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Curriculum Core</label>
                  <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.curriculum || "IGCSE"} onChange={(e) => setFormInput({...formInput, curriculum: e.target.value})}>
                    <option value="IGCSE">IGCSE (British)</option>
                    <option value="A-Level">A-Level (British)</option>
                    <option value="CBSE">CBSE (Indian)</option>
                    <option value="Creative Arts">Creative Arts</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Allocated Campus Branch</label>
                <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.branch || "Dubai Marina Campus"} onChange={(e) => setFormInput({...formInput, branch: e.target.value})}>
                  {branches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition cursor-pointer flex items-center justify-center">
              {loading ? "Provisioning Faculty Record..." : "Authorize Teaching Contract"}
            </button>
          </form>
        )}

        {activeModal === "SUPER_ADMIN_GEN_REPORT" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <FileText className="w-5 h-5 text-emerald-400" /> Compile Strategic Reports
            </h3>
            <p className="text-xs text-slate-400">Trigger a live data compilation. Systems synthesize student logs, VAT collection schedules, and counselor pipelines into encrypted downloads.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Financial Ledgers", "Curriculum Progress", "Hot Leads Forecast"].map((reportType) => (
                <button
                  key={reportType}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      showToast("📊 Download Triggered", `${reportType} compiled successfully into PDF spreadsheet!`, "success");
                      closeModal();
                    }, 1200);
                  }}
                  disabled={loading}
                  className="p-3 bg-slate-955 border border-slate-800 hover:border-emerald-450 text-left rounded-xl hover:bg-slate-850 transition"
                >
                  <p className="text-[10px] uppercase font-mono font-black text-emerald-400">DOWNLOAD SHEET</p>
                  <p className="text-xs font-bold text-white mt-1">{reportType}</p>
                </button>
              ))}
            </div>
            <button onClick={closeModal} className="w-full py-2 bg-slate-950 text-xs font-bold text-slate-400 rounded-xl hover:bg-slate-800 transition">
              Cancel Dispatch
            </button>
          </div>
        )}

        {activeModal === "SUPER_ADMIN_BROADCAST" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Broadcast Announcement Synced", () => {
            addAnnouncement(formInput.announcementText || "Urgent Notice: Middle-East Science Challenge starts next Sunday.", formInput.alertType || "Alert");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Send className="w-5 h-5 text-indigo-400" /> Dispatch Global Announcement
            </h3>
            <p className="text-xs text-slate-400">Blast direct multi-channel notices into Parent and Student dashboards instantly.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Announcement Body</label>
                <textarea required rows={4} placeholder="Type announcement here..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" value={formInput.announcementText || ""} onChange={(e) => setFormInput({...formInput, announcementText: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Message Severity</label>
                <div className="flex gap-4">
                  {["Alert", "Info", "Promotion"].map((level) => (
                    <label key={level} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <input type="radio" name="alertType" checked={(formInput.alertType || "Alert") === level} onChange={() => setFormInput({...formInput, alertType: level})} />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl transition cursor-pointer flex justify-center">
              {loading ? "Transmitting Signal Broadcast..." : "Transmit Announcements Worldwide"}
            </button>
          </form>
        )}

        {/* --- GENERAL DRILL DOWNS --- */}
        {activeModal === "SUPER_ADMIN_VIEW_BRANCH" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Landmark className="w-5 h-5 text-indigo-400" /> {modalPayload?.name || "Campus Details Specialist"}
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-850 text-xs font-sans">
              <div className="flex justify-between"><span className="text-slate-500">Location Address:</span> <span className="text-white font-bold">{modalPayload?.location}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Regional Executive Manager:</span> <span className="text-white font-bold">{modalPayload?.manager}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Hotline Contact:</span> <span className="text-white font-bold">{modalPayload?.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Active Candidates:</span> <span className="text-indigo-400 font-black">{modalPayload?.studentsCount || 102} registered</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Finance Cashflow volume:</span> <span className="text-emerald-400 font-black">{modalPayload?.revenue} / Month</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Campus Status Health:</span> 
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                  modalPayload?.health === "Healthy" ? "bg-emerald-500/15 text-emerald-400" :
                  modalPayload?.health === "Monitor" ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"
                }`}>{modalPayload?.health}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                showToast("📟 Intercom Linked", `Initializing satellite link to Director Al-Mansoori.`);
                closeModal();
              }} className="flex-1 py-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl transition">
                Secure Intercom Call
              </button>
              <button onClick={closeModal} className="px-4 py-2 text-xs bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl transition">
                Back to Command
              </button>
            </div>
          </div>
        )}

        {activeModal === "SUPER_ADMIN_RISK_ITEM" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-rose-400 flex items-center gap-1.5 pt-2">
              <ShieldAlert className="w-5 h-5 animate-bounce" /> Real-time System Risk Resolve
            </h3>
            <p className="text-xs text-slate-400">Review real-time student or operational anomalies. AI models trigger early warnings on attendance friction or payment latencies.</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-400">Core Subject Case:</span> <span className="text-white font-bold">{modalPayload?.student || "Academic Risk #842"}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Anomalous Marker:</span> <span className="text-rose-400 font-extrabold">{modalPayload?.issue || "Frequent Tardiness (Physics)"}</span></div>
              <p className="text-slate-500 text-[11px] leading-relaxed pt-1">The system warns of academic degradation hazards on this student due to 3 consecutive missed revision notes downloads.</p>
            </div>
            <div className="flex gap-2 text-xs font-bold">
              <button onClick={() => {
                showToast("📞 Emergency Counseling Triggered", "Counselor dispatch booked in CRM scheduler.");
                closeModal();
              }} className="flex-1 py-2.5 bg-rose-500 text-slate-950 rounded-xl hover:bg-rose-400 transition cursor-pointer">
                Instruct Emergency Counseling
              </button>
              <button onClick={closeModal} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-750 transition">
                Dismiss Error
              </button>
            </div>
          </div>
        )}


        {/* --- SALES MODALS --- */}
        {activeModal === "SALES_NEW_LEAD" && (
          <form onSubmit={(e) => handleMockSubmit(e, "CRM Inquiry Initialized", () => {
            addLead({
              parent: formInput.parent || "Youssef Al-Kaabi",
              student: formInput.student || "Dana Al-Kaabi",
              grade: formInput.grade || "Grade 10",
              curriculum: formInput.curriculum || "British",
              value: formInput.value || "AED 5,800",
              source: formInput.source || "Social Media"
            });
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-spin-slow" /> Register Hot Lead
            </h3>
            <p className="text-xs text-slate-450">Instantly score organic inquiries through the AI vetting engine.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Parent Guardian Name</label>
                  <input required type="text" placeholder="e.g. Fatima Al-Shamsi" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.parent || ""} onChange={(e) => setFormInput({...formInput, parent: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Student Candidate Name</label>
                  <input required type="text" placeholder="e.g. Sultan Al-Shamsi" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.student || ""} onChange={(e) => setFormInput({...formInput, student: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Grade</label>
                  <input required type="text" placeholder="Grade 11" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.grade || ""} onChange={(e) => setFormInput({...formInput, grade: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Curriculum Core</label>
                  <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.curriculum || "British"} onChange={(e) => setFormInput({...formInput, curriculum: e.target.value})}>
                    <option value="British">British (IGCSE)</option>
                    <option value="CBSE">CBSE (Indian)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Pipeline Value</label>
                  <input required type="text" placeholder="AED 5800" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.value || ""} onChange={(e) => setFormInput({...formInput, value: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Acquisitions Channel</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.source || "Meta Ads"} onChange={(e) => setFormInput({...formInput, source: e.target.value})}>
                  <option value="Meta Ads">Meta Facebook Campaign</option>
                  <option value="Google Search">Google SEO / Inbound</option>
                  <option value="Word of Mouth">Al-Khaleej School Reference</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl transition cursor-pointer flex justify-center">
              {loading ? "Analyzing Intent Matrix..." : "Store & Analyze lead Conversion Probability"}
            </button>
          </form>
        )}

        {activeModal === "SALES_CALL_QUEUE" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <PhoneCall className="w-5 h-5 text-indigo-400" /> Outbound Call Centre Queue
            </h3>
            <p className="text-xs text-slate-400">Instantly dial outstanding hot prospects in Plato's CRM pipeline.</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {leads.filter(l => l.status !== "Enrolled").map((lead, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{lead.parent}</h4>
                    <p className="text-[10px] text-indigo-400">Student: {lead.student} • Source: {lead.source}</p>
                  </div>
                  <button
                    onClick={() => {
                      showToast("📞 Outbound Call Outgoing", `Synthesized VoIP dialer triggered for parent ${lead.parent}.`);
                      updateLeadStatus(lead.id, "Follow-Up Completed");
                    }}
                    className="px-3 py-1 bg-indigo-400 hover:bg-indigo-300 text-slate-950 font-black rounded-lg text-[10px]"
                  >
                    DIAL
                  </button>
                </div>
              ))}
            </div>
            <button onClick={closeModal} className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-300 rounded-xl transition">
              Close Dialer Panel
            </button>
          </div>
        )}

        {activeModal === "SALES_CAMPAIGN" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Campaign Initiated", () => {
            showToast("📣 Digital Campaign Broadcast", `Distributed ${formInput.template || "Trial Invitation"} campaign to filtered parent audience.`, "success");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin-slow" /> Launch Smart CRM Campaign
            </h3>
            <p className="text-xs text-slate-400">Draft automated messages directly to parents based on curriculum segments.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Acquisitions Template</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.template || "Trial Class Invitation"} onChange={(e) => setFormInput({...formInput, template: e.target.value})}>
                  <option value="Trial Class Invitation">⚡ Free Science Diagnostic Live Trial</option>
                  <option value="UAE National Discount">🇦🇪 CBSE Board Toppers Scholarship Opportunity</option>
                  <option value="Fee Balance Remittance">💰 Installment Plan Renewal Reminder</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans">Target Broadcast Audience Segment</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                  <option>Grade 9-12 IGCSE Incomplete Leads</option>
                  <option>CBSE Sharjah & Qusais New inquiries</option>
                  <option>All Inactive Parent database records</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition cursor-pointer flex justify-center">
              {loading ? "Distributing Communications..." : "Trigger Automated Broadcast Outflow"}
            </button>
          </form>
        )}

        {activeModal === "SALES_LEAD_DETAIL" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Users className="w-5 h-5 text-indigo-400" /> Full Lead Profile Matrix
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Contact Parent Name:</span> <span className="text-white font-bold">{modalPayload?.parent}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Student Candidate:</span> <span className="text-white font-bold">{modalPayload?.student} ({modalPayload?.grade} {modalPayload?.curriculum})</span></div>
              <div className="flex justify-between"><span className="text-slate-500">AI Scoring Matrix:</span> <span className="text-emerald-400 font-black">{modalPayload?.score}% Match</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Pipeline Budget Valuation:</span> <span className="text-indigo-400 font-bold">{modalPayload?.value}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-semibold text-amber-500">Intake Phase:</span> <span className="text-white font-black">{modalPayload?.status}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button onClick={() => {
                showToast("📞 Counseling Booked", `Trial schedule block verified in the database core.`);
                updateLeadStatus(modalPayload?.id, "Trial Scheduled");
                closeModal();
              }} className="py-2 bg-indigo-500 text-slate-950 hover:bg-indigo-400 rounded-xl transition cursor-pointer">
                Confirm Specimen Trial Slot
              </button>
              <button onClick={() => {
                showToast("🎉 Enrolled Candidate", `Zayed Scholar enrolled in Dubai catalog database.`);
                updateLeadStatus(modalPayload?.id, "Enrolled");
                closeModal();
              }} className="py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-450 rounded-xl transition cursor-pointer">
                Commit Enrollment Action
              </button>
            </div>
          </div>
        )}

        {/* --- TEACHER WORKSPACE MODALS --- */}
        {activeModal === "TEACHER_ATTENDANCE" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Attendance Saved", () => {
            showToast("📝 Logged Attendance", "Attendance checklist saved for Al Qusais Physics Lab session.", "success");
          })} className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" /> Lesson Attendance Checklist
            </h3>
            <p className="text-xs text-slate-450">Validate real-time candidate attendance logs into the central ministry dashboard.</p>
            <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-850">
              {[
                { name: "Zayed Al-Mansoori", status: true },
                { name: "Hamdan Al-Suwaidi", status: true },
                { name: "Chloe Sterling", status: false },
                { name: "Aarav Kumar", status: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-white">
                  <span>{item.name}</span>
                  <div className="flex gap-2">
                    <button type="button" className="px-2 py-0.5 bg-emerald-500/10 hover:bg-emerald-500/35 text-emerald-400 font-extrabold rounded select-none">PRESENT</button>
                    <button type="button" className="px-2 py-0.5 bg-rose-500/10 hover:bg-rose-500/35 text-rose-400 rounded select-none">ABSENT</button>
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              {loading ? "Saving attendance..." : "Commit Daily Lab Attendance Ledger"}
            </button>
          </form>
        )}

        {activeModal === "TEACHER_CREATE_ASSIGNMENT" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Assignment Synced", () => {
            addAssignment({
              title: formInput.title || "Calculus Derivations Practice Pack",
              dueDate: formInput.dueDate || "Jun 24, 2026",
              subject: formInput.subject || "Mathematics",
              points: Number(formInput.points) || 100
            });
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <FileText className="w-5 h-5 text-amber-500 animate-pulse" /> Publish Curriculum Assignment
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Homework Topic Title</label>
                <input required type="text" placeholder="e.g. Electromagnetism Formulas Practice Sheet" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" value={formInput.title || ""} onChange={(e) => setFormInput({...formInput, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Subject</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.subject || "Physics"} onChange={(e) => setFormInput({...formInput, subject: e.target.value})}>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Target Points</label>
                  <input required type="number" placeholder="100" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.points || ""} onChange={(e) => setFormInput({...formInput, points: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans font-semibold">Due Date</label>
                  <input required type="text" placeholder="Jun 24, 2026" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" value={formInput.dueDate || ""} onChange={(e) => setFormInput({...formInput, dueDate: e.target.value})} />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition cursor-pointer flex justify-center">
              {loading ? "Broadcasting Core Curriculum Requirements..." : "Issue Student Task Sheet"}
            </button>
          </form>
        )}

        {/* --- FINANCES WORKSPACE MODALS --- */}
        {activeModal === "FINANCE_COLLECT" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Payment Registered", () => {
            addInvoice({
              student: formInput.student || "Zayed Ahmed",
              parent: formInput.parent || "Ahmed Al-Shehhi",
              amount: formInput.amount || "AED 1,200",
              dueDate: "Jun 30, 2026",
              branch: "Silicon Oasis Hub"
            });
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-rose-450 flex items-center gap-1.5 pt-2">
              <Landmark className="w-5 h-5" /> Execute Payment collection
            </h3>
            <p className="text-xs text-slate-400">Receive cash, credit, or online fee deposits. Direct integration with Emirates NBD banking nodes.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Student Candidate</label>
                  <input required type="text" placeholder="e.g. Sultan Al-Neyadi" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" value={formInput.student || ""} onChange={(e) => setFormInput({...formInput, student: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Parent Guardian</label>
                  <input required type="text" placeholder="e.g. Noura Al-Neyadi" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.parent || ""} onChange={(e) => setFormInput({...formInput, parent: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Gross Payment Volume</label>
                  <input required type="text" placeholder="e.g. AED 3400" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" value={formInput.amount || ""} onChange={(e) => setFormInput({...formInput, amount: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Collection Channel</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>Emirates NBD Credit Card</option>
                    <option>Direct Bank Wire / IBAN</option>
                    <option>Dubai Marina Physical Cash desk</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl font-bold cursor-pointer flex justify-center">
              {loading ? "Reconciling bank accounts..." : "Authorize Emirates NBD POS Terminal"}
            </button>
          </form>
        )}

        {/* --- PARENT MODAL STACK --- */}
        {activeModal === "PARENT_BOOK_MEETING" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Meeting Confirmed", () => {
            showToast("📆 Slot Confirmed", `Pristine parent meeting booked with Dubai Board Director on Friday!`, "success");
          })} className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Book UAE Director feedback Room
            </h3>
            <p className="text-xs text-slate-400">Request priority conference room slots regarding term results with regional mentors.</p>
            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Assigned Branch Faculty</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                  <option>Dr. Al-Mansoori (Mathematics Lead - Marina)</option>
                  <option>Sarah Sterling (Advanced Physics Lead)</option>
                  <option>Noura Al-Shehhi (Silicon Oasis Regional Director)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Date</label>
                  <input required type="date" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Conference Timing</label>
                  <input required type="time" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              {loading ? "Booking Slot..." : "Secure Consultation Room"}
            </button>
          </form>
        )}

        {/* --- STUDENT MODAL STACK --- */}
        {activeModal === "STUDENT_JOIN_CLASS" && (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-black text-white flex items-center justify-center gap-1.5 pt-2 leading-none">
              <Play className="w-5 h-5 text-emerald-400 fill-current animate-ping" /> Live Specimen Stream Room
            </h3>
            <p className="text-xs text-slate-450">You are joining the active "Quantum Physics Matrix Mechanics" session live stream.</p>
            <div className="aspect-video bg-black rounded-2xl relative border border-slate-800 overflow-hidden flex items-center justify-center">
              <div className="absolute top-2 left-2 bg-rose-600 text-[9px] font-black uppercase text-white px-2 py-0.5 rounded tracking-widest motion-safe:animate-pulse">
                LIVE BROADCAST
              </div>
              <code className="text-[10px] text-slate-500 font-mono">Stream Signal Syncing...</code>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast("⚡ Class Completed", "Claimed +50 XP!");
                  closeModal();
                }}
                className="flex-1 py-2 text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-350 rounded-xl transition cursor-pointer"
              >
                Mark Attendance & Claim +50 XP
              </button>
              <button onClick={closeModal} className="px-4 py-2 text-xs bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-750 transition">
                Leave
              </button>
            </div>
          </div>
        )}

        {activeModal === "STUDENT_MOCK_TEST" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none">
              <Award className="w-5 h-5 text-amber-500 animate-pulse" /> IGCSE Mock Exam Engine
            </h3>
            <p className="text-xs text-slate-450 leading-relaxed">This diagnostic mock test mimics actual British Board physics templates. Finish the test to check calculated outcomes & weaknesses.</p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-3 text-xs text-slate-300">
              <p className="font-bold text-white">Q1: A particle is thrown vertically upwards with initial velocity 20 m/s. Neglecting air drag, calculate the maximum attained altitude.</p>
              <div className="space-y-2 font-mono">
                {["A) ~20.4 meters", "B) ~40.8 meters", "C) ~10.2 meters", "D) ~15.5 meters"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      showToast("🎯 Mock Answer Registered", "You selected option A. Completing full specimen grading on database sync!");
                      closeModal();
                    }}
                    className="w-full text-left p-2.5 bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500 rounded-xl transition text-[11px]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- DYNAMIC CUSTOM MODALS --- */}
        {activeModal === "SALES_HOT_PROSPECTS" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-amber-500 flex items-center gap-1.5 pt-2 leading-none animate-fade-in">
              🔥 Hot Prospects CRM Ledger
            </h3>
            <p className="text-xs text-slate-400">High-scoring organic leads waiting for counselor trials in the next 24 hours.</p>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {[
                { parent: "Mariam Al-Maktoum", student: "Fatima Al-Maktoum", score: 98, value: "AED 12,500", source: "Facebook Ad" },
                { parent: "Zack Sterling", student: "Leo Sterling", score: 94, value: "AED 8,600", source: "Google Maps" },
                { parent: "Vijay Patel", student: "Aria Patel", score: 91, value: "AED 6,200", source: "Direct Form" }
              ].map((prospect, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-white">{prospect.parent}</h4>
                    <p className="text-[10px] text-slate-450">Candidate: {prospect.student} • Source: {prospect.source}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-emerald-400 block">{prospect.score}% Match</span>
                    <button onClick={() => { showToast("📟 Live Dialing Initialized", `Connecting to ${prospect.parent}`); closeModal(); }} className="mt-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded text-[9px] uppercase tracking-wider cursor-pointer">DIAL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === "SALES_SCHEDULE_TRIAL" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Trial Booked", () => {
            showToast("📆 Trial Class Scheduled", "Allocated offline trial slot & sent SMS credentials to target parent.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              📆 Book Diagnostic Consultation & Trial
            </h3>
            <p className="text-xs text-slate-400">Secure an on-ground specimen trial for a qualifying student candidate.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Target Subject Program</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                  <option>British National Curriculum Physics Level 1</option>
                  <option>CBSE Senior Science & Mathematics Core</option>
                  <option>Mind-Mapping & Cognitive Skills Masterclass</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Allocated date</label>
                  <input required type="date" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Timeslot</label>
                  <input required type="time" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Confirm Trial Slot Registry
            </button>
          </form>
        )}

        {activeModal === "TEACHER_UPLOAD_NOTES" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Notes Dispatched", () => {
            showToast("📂 Materials Uploaded", "Successfully synchronized syllabus resource files on student & parent networks.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-rose-450 flex items-center gap-1.5 pt-2 leading-none">
              📁 Upload Lecture Materials & Notes
            </h3>
            <p className="text-xs text-slate-400">Distribute diagnostic past files, syllabi PDFs or recorded sessions directly.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Resource Title</label>
                <input required type="text" placeholder="e.g. British IGCSE Chemistry Organic P3 Core Formulas.pdf" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Syllabus Tag</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                  <option>IGCSE British Co-ordinated Sciences</option>
                  <option>CBSE Senior Syllabus</option>
                  <option>National Creative Arts Program</option>
                </select>
              </div>
              <div className="border border-dashed border-slate-800 p-4 rounded-xl text-center bg-slate-950/40 text-slate-500 text-[11px] cursor-pointer hover:border-slate-705">
                Drag-and-drop file here or click to select
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Dispatch Resource System Files
            </button>
          </form>
        )}

        {activeModal === "TEACHER_GRADE_TESTS" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none">
              💯 Class Mock Grading Desk
            </h3>
            <p className="text-xs text-slate-400">Review, grade, and feedback on recently completed student exam simulations.</p>
            <div className="space-y-2 max-h-62 overflow-y-auto pr-1">
              {[
                { name: "Dev Patel", subject: "Biology Cell Respiration", paper: "Weekly Mock Paper 3" },
                { name: "Chloe Sterling", subject: "IGCSE Mathematics Trig", paper: "Geometry Quiz" }
              ].map((student, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-extrabold text-white">{student.name}</h4>
                      <p className="text-[10px] text-slate-450">{student.subject} • {student.paper}</p>
                    </div>
                    <span className="text-amber-500 font-mono text-[10px] font-bold">Unchecked</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Enter Grade /100" className="w-28 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs text-white" />
                    <button onClick={() => { showToast("💯 Grading Commited", `Score saved for ${student.name}`); closeModal(); }} className="px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-lg text-[10px] uppercase cursor-pointer">Submit Score</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === "FINANCE_DOWNLOAD_VAT" && (
          <form onSubmit={(e) => handleMockSubmit(e, "VAT Recalc Completed", () => {
            showToast("📥 Invoice VAT Statement Downloaded", "Constructed comprehensive multi-branch June VAT compliance breakdown XLSX ledger successfully.", "success");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-amber-500 flex items-center gap-1.5 pt-2 leading-none">
              📥 Download UAE FTA VAT Statement
            </h3>
            <p className="text-xs text-slate-400">Fetch consolidated legal taxation output records registered under FTA guidelines.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">VAT Filing Period</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>Q2 (April - June 2026)</option>
                    <option>Q1 (January - March 2026)</option>
                    <option>FY2025 Consolidated</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans font-semibold">Report Format</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>FTAA Microsoft Excel (.xlsx)</option>
                    <option>Legal Audit Certified PDF</option>
                    <option>Unified Corporate Ledger JSON</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl font-bold cursor-pointer">
              Download VAT Ledger Spreadsheet
            </button>
          </form>
        )}

        {activeModal === "FINANCE_CREATE_PLAN" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Installment Created", () => {
            showToast("💳 Payment Plan Constructed", "Established tuition installment rules and structured secure e-invoice links.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              💳 Create Pacing Payment Plan
            </h3>
            <p className="text-xs text-slate-400">Divide high-value regional tuition ledgers into flexible recurring sub-payments.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Student Candidate</label>
                <input required type="text" placeholder="e.g. Chloe Sterling" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans font-semibold">Splits</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>3 Monthly Installments (Default)</option>
                    <option>4 Term-wise Installments</option>
                    <option>2 Semi-annual installments</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Single installment volume</label>
                  <input required type="text" placeholder="e.g. AED 4,500" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Construct Payment Installment Pacing
            </button>
          </form>
        )}

        {activeModal === "FINANCE_FORECAST_CASH" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Forecaster Calibrated", () => {
            showToast("📈 Cash Flow Predicted", "Re-synthesized forecast models under local marketing multipliers.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none">
              📈 Cash Flow Simulation & Forecast
            </h3>
            <p className="text-xs text-slate-400">Predict multi-branch tuition revenues based on student numbers and intake trends.</p>
            <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-850">
              <div className="flex justify-between items-center text-xs"><span className="text-slate-400">Target Student Intake Projection:</span> <span className="font-bold text-emerald-400 font-mono">+12.4% MoM</span></div>
              <div className="flex justify-between items-center text-xs"><span className="text-slate-400">Simulated Gross Billing:</span> <span className="font-bold text-indigo-400 font-mono">AED 2.84 Million / Q3</span></div>
              <div className="flex justify-between items-center text-xs"><span className="text-slate-400">Forecast Accuracy Confidence:</span> <span className="font-bold text-amber-500 font-mono">94.2%</span></div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Synthesize Cash Flow Models
            </button>
          </form>
        )}

        {activeModal === "PARENT_PAY_FEES" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Fees Authorized", () => {
            showToast("💳 Credit Settlement Complete", "Your checkout of AED 1,450.00 tuition fees has been processed.", "success");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-1.5 pt-2 leading-none">
              💳 Secure Tuition Payment Portal
            </h3>
            <p className="text-xs text-slate-450">Authorize school tuition bills instantly using secure regional checkout layers.</p>
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">Amount Outstanding:</span>
              <strong className="text-indigo-400 font-mono font-black text-sm">AED {modalPayload?.outstanding || "1,450.00"}</strong>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Dubai Credit Card Number</label>
                <input required type="text" placeholder="4000 1234 5678 9010" className="w-full bg-slate-905 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Expiration</label>
                  <input required placeholder="MM/YY" type="text" className="w-full bg-slate-905 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">CVV</label>
                  <input required placeholder="***" type="password" className="w-full bg-slate-905 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-350 rounded-xl cursor-pointer">
              Pay Online Tuition Billing
            </button>
          </form>
        )}

        {activeModal === "PARENT_MESSAGE_TEACHER" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              💬 Direct Messenger Chat Room
            </h3>
            <p className="text-xs text-slate-450 text-left font-sans">Connect securely with Dr. Richard Feynman & mentors in Dubai Marina Campus.</p>
            <div className="h-44 bg-slate-950 p-3 rounded-2xl border border-slate-850 overflow-y-auto space-y-2.5 text-xs text-left">
              <div className="p-2 bg-slate-900 rounded-xl max-w-[240px]">
                <p className="text-[9.5px] text-indigo-400 font-bold leading-none mb-0.5">Dr. Feynman</p>
                <p className="text-[11px] text-white">Assalamu Alaikum! Zayd made a brilliant contribution during our cell biology laboratory project yesterday. Highly attentive!</p>
              </div>
            </div>
            <div className="flex gap-1">
              <input type="text" placeholder="Type response..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white" />
              <button onClick={() => { showToast("✉️ Chat Dispatched", "Dispatched chat reply."); closeModal(); }} className="px-3 bg-indigo-500 hover:bg-indigo-600 text-slate-950 font-black rounded-xl text-xs uppercase cursor-pointer">Send</button>
            </div>
          </div>
        )}

        {activeModal === "PARENT_VIEW_REPORT" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none">
              📋 KHDA Certified Term Progress Report
            </h3>
            <p className="text-xs text-slate-450">Download or preview high-resolution regional gradecards for Zayd Al-Mansoori.</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-slate-350 space-y-2.5 text-left font-sans">
              <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Mathematics Extended:</span> <strong className="text-white font-bold font-mono">A* (96/100)</strong></div>
              <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Physics Co-ordinated:</span> <strong className="text-white font-bold font-mono">A (89/100)</strong></div>
              <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Chemistry Organic Level:</span> <strong className="text-white font-bold font-mono">B (78/100)</strong></div>
              <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Overall Attendance Index:</span> <strong className="text-emerald-400 font-bold font-mono">94.5%</strong></div>
            </div>
            <button onClick={() => { showToast("📥 Progress Report Downloaded", "PDF progress portfolio saved successfully."); closeModal(); }} className="w-full py-2.5 text-xs font-black text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl cursor-pointer">
              Download Official Progress PDF Report
            </button>
          </div>
        )}

        {activeModal === "STUDENT_START_STUDYING" && (
          <div className="space-y-4 font-sans text-center">
            <h3 className="text-lg font-black text-indigo-400 flex items-center justify-center gap-1.5 pt-2 leading-none">
              🚀 Start Study Session Tracker
            </h3>
            <p className="text-xs text-slate-450">Calibrate focus, solve homework tasks, and gain +50 XP on completion.</p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 font-sans">
              <div className="text-3xl font-mono font-black text-indigo-400 animate-pulse">00:45:00</div>
              <span className="text-[9px] font-mono text-slate-500 block mt-1 uppercase tracking-widest">Calculated Study Countdown</span>
            </div>
            <button onClick={() => { showToast("✨ Session Concluded", "Earned +50 XP & strengthened daily streak!"); closeModal(); }} className="w-full py-2.5 text-xs font-black text-slate-950 bg-indigo-400 hover:bg-indigo-350 rounded-xl cursor-pointer">
              Complete Study & Redeem +50 XP
            </button>
          </div>
        )}

        {activeModal === "STUDENT_ASK_AI" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              🧠 Mindy AI Tutor Playground
            </h3>
            <p className="text-xs text-slate-400 font-sans">Type any difficult lesson question, matrix problem or CBSE chapter for automated step-by-step guides.</p>
            <input required type="text" placeholder="e.g. Prove Photosynthesis electron yield vectors..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
            <button onClick={() => { showToast("🧠 AI Tutor Formulation Dispatched", "Formulating complete textbook solution response map"); closeModal(); }} className="w-full py-2.5 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl cursor-pointer">
              Solve with Plato AI Coach
            </button>
          </div>
        )}

        {activeModal === "STUDENT_UPLOAD_DOUBT" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Doubt Registered", () => {
            showToast("📸 Doubt Uploaded", "OCR parser translated visual formulas. Tutor matching dispatched on system ledger.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-amber-500 flex items-center gap-1.5 pt-2 leading-none">
              📁 Upload Doubt Scans & OCR
            </h3>
            <p className="text-xs text-slate-400 font-sans">Snapshot textbook equations or tricky worksheets for detailed answers.</p>
            <div className="space-y-3">
              <div className="border border-dashed border-slate-800 p-6 rounded-2xl text-center bg-slate-950/40 text-slate-500 text-[11px] cursor-pointer hover:border-slate-705">
                ⭐ Capture screenshot or drag past sheet image
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl cursor-pointer">
              Upload Doubt Scanner PDF
            </button>
          </form>
        )}

        {activeModal === "BRANCH_CREATE_BATCH" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Batch Registered", () => {
            showToast("📦 Batch Registered", "Successfully registered fresh student batch and assigned weekly timetable.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              📦 Register Fresh Student Batch
            </h3>
            <p className="text-xs text-slate-400 font-sans">Allocate unique codes, subjects, and curricula for newly formed cohorts.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Batch Code Identifier</label>
                <input required type="text" placeholder="e.g. B-IG-PH-11B" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Target Curriculum</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>British IGCSE Curricula</option>
                    <option>CBSE Board Core</option>
                    <option>University entrance SAT</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1">Maximum Seats Limit</label>
                  <input required placeholder="20" type="number" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Register Batch Profile to Database
            </button>
          </form>
        )}

        {activeModal === "BRANCH_ASSIGN_TEACHER" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Teacher Assigned", () => {
            showToast("👨‍🏫 Teacher Assigned", "Successfully aligned assigned educator to designated level lectures.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-amber-500 flex items-center gap-1.5 pt-2 leading-none animate-fade-in">
              👨‍🏫 Align Assigned Educator
            </h3>
            <p className="text-xs text-slate-400 font-sans">Assign verified program leads to active classes, batches, or sub-tutoring programs.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans">Educator</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-sans">
                  <option>Dr. Richard Feynman (Physics Lead)</option>
                  <option>Prof. Alan Turing (Mathematics Senior Mentor)</option>
                  <option>Prof. Marie Curie (Inorganic Chemistry Expert)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans">Designated Batch Code</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-sans">
                  <option>B-IG-PH-10A (IGCSE Physics - Classroom-1)</option>
                  <option>B-AL-MA-12D (Advanced Pure Calculus - Classroom-2)</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl cursor-pointer font-sans">
              Approve Faculty Schedule Alignment
            </button>
          </form>
        )}

        {activeModal === "BRANCH_VIEW_TIMETABLE" && (
          <div className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none animate-fade-in">
              📅 Weekly Multi-Branch Calendar Schedule
            </h3>
            <p className="text-xs text-slate-450 font-sans">Review physical campus lecture rosters across morning and evening sessions.</p>
            <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-850 text-xs font-sans">
              {[
                { day: "MO", time: "16:00 - 17:30", course: "IGCSE British Physics Core", room: "Classroom-1" },
                { day: "TU", time: "17:30 - 19:00", course: "Advanced Mathematics Calculus", room: "Classroom-2" },
                { day: "WE", time: "16:00 - 17:30", course: "Inorganic Chemistry Synthesis", room: "Classroom-3" }
              ].map((slot, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-900 last:border-0">
                  <span className="bg-indigo-500/10 text-indigo-400 font-mono font-black text-[10px] px-1.5 py-0.5 rounded text-center w-8">{slot.day}</span>
                  <span className="text-slate-450 font-mono text-[10px]">{slot.time}</span>
                  <span className="text-white font-bold leading-none">{slot.course}</span>
                  <span className="text-slate-500 text-[10.5px]">{slot.room}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === "BRANCH_ROOM_ALLOCATION" && (
          <form onSubmit={(e) => handleMockSubmit(e, "Room Cleared", () => {
            showToast("🚪 Classroom Reallocated", "Pristine room allocation updated on weekly physical campus registers.");
          })} className="space-y-4 font-sans">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              🚪 Classroom Matrix Reallocator
            </h3>
            <p className="text-xs text-slate-400 font-sans">Reallocate school rooms to address regional campus scheduling conflicts.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 font-sans">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans">Target Classroom</label>
                  <select className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white">
                    <option>Classroom-1 (Interactive Physics Lab)</option>
                    <option>Classroom-2 (Whiteboard Lecturing)</option>
                    <option>Classroom-3 (Seminar Space)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block mb-1 font-sans">Timeslot</label>
                  <select className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white">
                    <option>16:00 - 17:30 Slot</option>
                    <option>17:30 - 19:00 Slot</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl cursor-pointer">
              Save Classroom Allocation
            </button>
          </form>
        )}

        {activeModal === "COORDINATOR_REVIEW_SYLLABUS" && (
          <div className="space-y-4 font-sans text-left">
            <h3 className="text-lg font-black text-indigo-400 flex items-center gap-1.5 pt-2 leading-none">
              📖 Syllabus Audit Checklist
            </h3>
            <p className="text-xs text-slate-400 font-sans">Audit chapters to track current board progress against regional pacing guidelines.</p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {[
                { name: "Organic Chemistry Carbon chains (10th CBSE)", status: "Verified" },
                { name: "Mechanics Momentum conservation (11th British)", status: "In Audit" }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-white max-w-[200px] truncate">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Pacing status indicator</span>
                  </div>
                  <button onClick={() => { showToast("📖 Syllabus Verified", `Curricula progress ticked for: ${item.name}`); closeModal(); }} className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-slate-950 font-black rounded-lg text-[10px] uppercase cursor-pointer">Verify</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === "COORDINATOR_APPROVE_ASSESSMENT" && (
          <div className="space-y-4 font-sans text-left">
            <h3 className="text-lg font-black text-amber-500 flex items-center gap-1.5 pt-2 leading-none">
              📋 Assessment Draft Moderation
            </h3>
            <p className="text-xs text-slate-450 font-sans">Moderate assessment papers prepared by branch tutors before exam release.</p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {[
                { title: "Burj Toppers CBSE Physics Mock Variant 4.pdf", author: "Dr. Feynman" },
                { title: "Geometry Calculus Mid-term diagnostic.pdf", author: "Prof. Alan Turing" }
              ].map((sheet, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs font-sans">
                  <div>
                    <h4 className="font-extrabold text-white max-w-[190px] truncate">{sheet.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Draft Creator: {sheet.author}</p>
                  </div>
                  <button onClick={() => { showToast("📋 Draft Assessment Authorized", `Sign-off complete for ${sheet.title}`); closeModal(); }} className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-lg text-[10px] uppercase cursor-pointer">Sign-off</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === "COORDINATOR_VIEW_OUTCOMES" && (
          <div className="space-y-4 font-sans text-left">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2 leading-none">
              📊 Predicted Academic Outcomes
            </h3>
            <p className="text-xs text-slate-400 font-sans">Projected success outcomes and grade distribution forecast charts for CBSE & British candidates.</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-slate-350 space-y-2.5 text-left font-mono">
              <div className="flex justify-between items-center"><span className="text-slate-500">Board Exam Success prediction:</span> <strong className="text-emerald-400 font-bold">92.4% pass</strong></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Target Tuition Cohort SLA rating:</span> <strong className="text-indigo-400 font-bold">A-A* Tier</strong></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Overall Grade inflation risk index:</span> <strong className="text-amber-500 font-bold">Nominal 2.2%</strong></div>
            </div>
            <button onClick={closeModal} className="w-full py-2 bg-slate-800 hover:bg-slate-755 text-xs font-bold text-slate-300 rounded-xl transition cursor-pointer">
              Close Report View
            </button>
          </div>
        )}


        {/* Generic Action Template Modal (Fallback with rich details) */}
        {activeModal !== "SUPER_ADMIN_CREATE_BRANCH" && 
         activeModal !== "SUPER_ADMIN_ADD_TEACHER" && 
         activeModal !== "SUPER_ADMIN_GEN_REPORT" && 
         activeModal !== "SUPER_ADMIN_BROADCAST" && 
         activeModal !== "SUPER_ADMIN_VIEW_BRANCH" && 
         activeModal !== "SUPER_ADMIN_RISK_ITEM" && 
         activeModal !== "SALES_NEW_LEAD" && 
         activeModal !== "SALES_CALL_QUEUE" && 
         activeModal !== "SALES_CAMPAIGN" && 
         activeModal !== "SALES_LEAD_DETAIL" && 
         activeModal !== "TEACHER_ATTENDANCE" && 
         activeModal !== "TEACHER_CREATE_ASSIGNMENT" && 
         activeModal !== "FINANCE_COLLECT" && 
         activeModal !== "PARENT_BOOK_MEETING" && 
         activeModal !== "STUDENT_JOIN_CLASS" && 
         activeModal !== "STUDENT_MOCK_TEST" && 
         activeModal !== "SALES_HOT_PROSPECTS" &&
         activeModal !== "SALES_SCHEDULE_TRIAL" &&
         activeModal !== "TEACHER_UPLOAD_NOTES" &&
         activeModal !== "TEACHER_GRADE_TESTS" &&
         activeModal !== "FINANCE_DOWNLOAD_VAT" &&
         activeModal !== "FINANCE_CREATE_PLAN" &&
         activeModal !== "FINANCE_FORECAST_CASH" &&
         activeModal !== "PARENT_PAY_FEES" &&
         activeModal !== "PARENT_MESSAGE_TEACHER" &&
         activeModal !== "PARENT_VIEW_REPORT" &&
         activeModal !== "STUDENT_START_STUDYING" &&
         activeModal !== "STUDENT_ASK_AI" &&
         activeModal !== "STUDENT_UPLOAD_DOUBT" &&
         activeModal !== "BRANCH_CREATE_BATCH" &&
         activeModal !== "BRANCH_ASSIGN_TEACHER" &&
         activeModal !== "BRANCH_VIEW_TIMETABLE" &&
         activeModal !== "BRANCH_ROOM_ALLOCATION" &&
         activeModal !== "COORDINATOR_REVIEW_SYLLABUS" &&
         activeModal !== "COORDINATOR_APPROVE_ASSESSMENT" &&
         activeModal !== "COORDINATOR_VIEW_OUTCOMES" && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 pt-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> {modalPayload?.title || "Establish Sandbox Module"}
            </h3>
            <p className="text-xs text-slate-400">{modalPayload?.desc || "Plato's Planet high-fidelity mock action engine successfully triggered. Real state changes saved."}</p>
            {modalPayload?.inputs?.map((input: any, index: number) => (
              <div key={index} className="space-y-1 font-sans">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-extrabold block">{input.label}</label>
                <input required={input.required} type={input.type || "text"} placeholder={input.placeholder} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none" />
              </div>
            ))}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast(modalPayload?.successTitle || "Database State Commited", modalPayload?.successDesc || "The simulated operations updated the central server cluster.");
                  if (modalPayload?.onSuccess) modalPayload.onSuccess();
                  closeModal();
                }}
                className="flex-1 py-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl transition cursor-pointer"
              >
                Execute Secure Action
              </button>
              <button onClick={closeModal} className="px-4 py-2 text-xs bg-slate-800 text-slate-400 font-bold rounded-xl hover:bg-slate-750 transition">
                Close Panel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Toast UI component
// -------------------------------------------------------------
function ToastContainer() {
  const { toasts, dismissToast } = useGlobalAction();

  return (
    <div className="fixed bottom-16 right-4 z-50 space-y-2 pointer-events-none max-w-sm w-full font-sans">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex gap-3 pointer-events-auto animate-fade-in-up border-l-4 border-l-indigo-400"
          role="alert"
        >
          {toast.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}
          
          <div className="flex-1 space-y-0.5 text-left">
            <h4 className="text-xs font-black text-white leading-normal">{toast.title}</h4>
            <p className="text-[10px] text-slate-400 leading-normal">{toast.description}</p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-500 hover:text-slate-300 p-0.5 self-start"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
