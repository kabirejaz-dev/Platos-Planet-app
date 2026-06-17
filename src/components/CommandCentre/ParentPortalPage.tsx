import React, { useState } from "react";
import { 
  Users, DollarSign, Calendar, MessageSquare, CheckCircle2, AlertCircle, 
  Send, Landmark, ShieldCheck, CreditCard, Star, Activity, Award 
} from "lucide-react";

interface ParentPortalPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function ParentPortalPage({ theme, onTriggerNotification }: ParentPortalPageProps) {
  // 1. Child summary profiles
  const childProfile = {
    name: "Rohan Verma",
    grade: "Grade 10 (CBSE Cycle)",
    attendance: "98% Rate",
    lastCheckIn: "16:02 Today (HQ Hall B)",
    masteryScore: "74% Mastery Index"
  };

  // 2. Child Term Exam Roster
  const grades = [
    { name: "CBSE Mathematics Geometry Term 1", score: "88% (A)", date: "June 10, 2026", status: "Certified" },
    { name: "Biology Respiration Cycle Review", score: "72% (B)", date: "June 12, 2026", status: "Certified" },
    { name: "CBSE Physics Term 1 Test", score: "85% (A)", date: "June 15, 2026", status: "Certified" }
  ];

  // 3. Outstanding fee arrears list & secure checkout module simulator
  const [arrears, setArrears] = useState([
    { id: "ba-101", title: "CBSE Standard Tuition Term 2", amount: 2450, vat: 122.5, status: "Unpaid" },
    { id: "ba-102", title: "Cambridge Physics laboratory Fee", amount: 650, vat: 32.5, status: "Unpaid" }
  ]);

  const [checkoutActive, setCheckoutActive] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<string>("ba-101");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [paying, setPaying] = useState(false);

  const activeBill = arrears.find(b => b.id === selectedBillId);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBill) return;
    setPaying(true);

    setTimeout(() => {
      setPaying(false);
      setCheckoutActive(false);
      // set that bill as settled
      setArrears(prev => prev.filter(b => b.id !== selectedBillId));
      onTriggerNotification(
        "💳 Stripe Transaction Success", 
        `Successfully settled invoice #${selectedBillId} of AED ${activeBill.amount + activeBill.vat}. PDF payment certificate sent to email.`
      );
    }, 1200);
  };

  // 4. Coordinator Message Chat Console
  const [chatLog, setChatLog] = useState([
    { role: "Coordinator", text: "Hello! I am Sayed Ahmad, the Senior Curriculum Coordinator. I saw Rohan's latest Biology scorecard looks good. Let me know if you need specific homework pacing." }
  ]);
  const [userMsg, setUserMsg] = useState("");

  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const freshUserMsg = { role: "Parent", text: userMsg };
    setChatLog(prev => [...prev, freshUserMsg]);
    setUserMsg("");

    setTimeout(() => {
      setChatLog(prev => [...prev, { role: "Coordinator", text: "Excellent feedback! I have aligned with Teacher 3 to allocate 3 additional organic Chemistry sheets inside your child's study panel today. Shokran." }]);
      onTriggerNotification("💬 SMS alert Delivered", "Coordinator replied over curriculum desk.");
    }, 900);
  };

  // 5. Teacher Reviews average
  const teacherComments = [
    { teacher: "Teacher 1", subject: "Physics", rating: "4.9★", comment: "Your child is highly active during class vectors mapping. A natural scholar." },
    { teacher: "Teacher 2", subject: "Mathematics", rating: "4.8★", comment: "Excellent logic processing. Needs to review quadratic formula brackets pacing." }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left text-slate-100 select-none">
      
      {/* 1. Header with Child Profile Info */}
      <div className="p-6 bg-slate-900 border border-slate-855 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="md:col-span-8 space-y-2 z-10">
          <div className="flex items-center gap-1.5 text-indigo-400 font-bold font-mono text-xs">
            <Activity className="w-5 h-5 animate-pulse text-indigo-400" />
            <span className="uppercase tracking-widest">Parent Portal Campus Synchronizer</span>
          </div>
          <h2 className="text-2xl font-black text-white">Consolidated Progress: {childProfile.name}</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Audit term scorecards, verify student physical check-in timings, settle outstanding billing invoices, and chat directly with Jumeirah HQ academic coordinators.
          </p>
        </div>

        <div className="md:col-span-4 p-4.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3 shrink-0 z-10">
          <span className="text-3xl">👨‍👩‍👧</span>
          <div>
            <strong className="text-slate-150 text-xs block">Sanjay Verma (Parent)</strong>
            <span className="text-[10px] text-indigo-400 font-mono">Student Account: Rohan ({childProfile.grade})</span>
          </div>
        </div>
      </div>

      {/* 2. child real-time status indices */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Child Attendance Rate", value: childProfile.attendance, note: "Top performance tier" },
          { label: "Check-in Status log", value: "Verified In-class", note: childProfile.lastCheckIn },
          { label: "Course Mastery score", value: childProfile.masteryScore, note: "Target completion: 80%" },
          { label: "Outstanding Dues balance", value: arrears.length > 0 ? `AED ${arrears.reduce((sum, item) => sum + item.amount + item.vat, 0)}` : "AED 0 (Settled)", note: "VAT calculations compiled" },
        ].map((item, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-550 block">
              {item.label}
            </span>
            <span className="text-lg font-black text-white">{item.value}</span>
            <span className="text-[10px] text-indigo-400 font-bold block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* Grid Layout: secure checkout invoice table & child grades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Child Grades (Col 7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400 font-mono">🏆 CHILD OFFICIAL TERM REPORT CARDS</h3>
              <p className="text-[10px] text-slate-550 mt-1">Syllabus mock test results validated by the Academic Coordinator board.</p>
            </div>
            <Award className="w-4.5 h-4.5 text-indigo-400" />
          </div>

          <div className="space-y-3">
            {grades.map((gr, id) => (
              <div key={id} className="p-3.5 bg-slate-900 border border-slate-855 rounded-2xl flex items-center justify-between gap-3 text-left">
                <div>
                  <strong className="text-slate-100 text-xs block">{gr.name}</strong>
                  <span className="text-[10px] text-slate-500 block font-mono">Date: {gr.date} • Verification: {gr.status}</span>
                </div>
                <span className="text-sm font-mono font-black text-indigo-405 text-indigo-400">{gr.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secure Checkout Billing Desk (Col 5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 text-xs opacity-5 text-indigo-400 font-mono font-black">SECURE PAY</div>
          
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400 font-mono">💰 SECURE TUITION BILLING DESK</h3>
              <p className="text-[10px] text-slate-550 mt-1">Review outstanding Jumeirah HQ arrear invoices.</p>
            </div>
            <Landmark className="w-4 h-4 text-indigo-400" />
          </div>

          {!checkoutActive ? (
            <div className="space-y-4">
              {arrears.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {arrears.map(b => (
                      <div key={b.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between gap-3 text-left">
                        <div>
                          <strong className="text-slate-205 text-xs block">{b.title}</strong>
                          <span className="text-[9.5px] text-slate-550 font-mono font-black">Fees: AED {b.amount} + VAT: AED {b.vat}</span>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedBillId(b.id);
                            setCheckoutActive(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-xl uppercase transition cursor-pointer shrink-0"
                        >
                          Checkout
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-6 text-center space-y-2">
                  <span className="text-3xl block">🎉</span>
                  <strong className="text-slate-200 text-xs block">Balance Cleanly Cleared!</strong>
                  <p className="text-[10px] text-slate-500 italic max-w-xs mx-auto">All tuition invoice receipts VAT logs settled for current academic term.</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSimulatePayment} className="space-y-4 text-left animate-fade-in bg-slate-900 p-4 border border-slate-850 rounded-2xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-450 font-black">INVOICE: #{selectedBillId}</span>
                <span className="font-black text-white font-mono">AED {activeBill ? activeBill.amount + activeBill.vat : 0}</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-mono font-black text-slate-550">Secure Cardholder input</span>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-slate-300 rounded-xl focus:outline-none"
                    />
                    <CreditCard className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase font-mono font-black text-slate-555">Expiration</span>
                    <input 
                      type="text" 
                      defaultValue="12 / 29"
                      className="w-full p-2 bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-center text-slate-305 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase font-mono font-black text-slate-555">CVV Code</span>
                    <input 
                      type="text" 
                      defaultValue="772"
                      className="w-full p-2 bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-center text-slate-305 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setCheckoutActive(false)}
                  className="flex-1 py-2 text-[10px] font-bold text-slate-450 hover:text-white border border-slate-800 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={paying}
                  className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 font-mono text-[10px] font-black uppercase text-slate-950 rounded-lg cursor-pointer transition flex items-center justify-center gap-1.5"
                >
                  {paying ? (
                    <>
                      <span className="w-3 h-3 border-2 border-t-transparent border-slate-950 rounded-full animate-spin" />
                      <span>Transacting...</span>
                    </>
                  ) : (
                    <span>Settle Pay</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Grid: message console with coordinator & teacher rating comments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chat Console with Sayed Coordinator */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="border-b pb-4 border-white/[0.04]">
            <h3 className="text-xs font-black uppercase text-indigo-400 font-mono">💬 CHAT CONSOLE WITH SENIOR ACADEMIC MANAGER</h3>
            <p className="text-[10px] text-slate-550 mt-1">Queries regarding syllabus coverage blocks or personal test schedules.</p>
          </div>

          <div className="h-44 overflow-y-auto space-y-3 p-2.5 bg-slate-900/60 rounded-2xl border border-slate-855 text-[11px] leading-relaxed">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`p-2.5 rounded-2xl max-w-[85%] text-left ${
                msg.role === "Coordinator" 
                  ? "bg-slate-950 border border-slate-850 text-slate-300 self-start border-l-2 border-l-indigo-550" 
                  : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 self-end ml-auto"
              }`}>
                <span className="text-[9px] font-mono block font-black mb-0.5 text-slate-500 uppercase">{msg.role}</span>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChatMsg} className="flex gap-2">
            <input 
              type="text" 
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Query Coordinator Sayed..." 
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:outline-none placeholder-slate-650"
            />
            <button 
              type="submit" 
              className="p-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Teacher Reviews (Col 5) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400 font-mono">👨‍🏫 FACULTY REVIEW ROSTERS</h3>
              <p className="text-[10px] text-slate-550 mt-1">Continuous classroom evaluation metrics for teachers assigned.</p>
            </div>
            <Star className="w-4.5 h-4.5 text-indigo-400" />
          </div>

          <div className="space-y-3">
            {teacherComments.map((tc, id) => (
              <div key={id} className="p-3 bg-slate-900 border border-slate-855 rounded-2xl space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-105 text-xs block">{tc.teacher}</strong>
                  <span className="text-amber-400 font-mono font-bold text-[10.5px]">{tc.rating}</span>
                </div>
                <p className="text-[10px] text-slate-450 font-normal leading-relaxed">
                  "{tc.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
