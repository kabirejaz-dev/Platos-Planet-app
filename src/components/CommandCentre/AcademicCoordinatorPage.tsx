import React, { useState } from "react";
import { 
  BookOpen, Calendar, CheckSquare, Award, AlertTriangle, CheckCircle2, 
  ChevronRight, BrainCircuit, Users, ClipboardList, Send, FileText, Star 
} from "lucide-react";

interface AcademicCoordinatorPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function AcademicCoordinatorPage({ theme, onTriggerNotification }: AcademicCoordinatorPageProps) {
  const [activeCurriculum, setActiveCurriculum] = useState<"IGCSE" | "A-Level" | "CBSE">("IGCSE");

  // 1. Syllabus covered milestones
  const [syllabusSectors, setSyllabusSectors] = useState([
    { id: "s-1", title: "Mechanics Waves & Light Spectrum", curriculum: "IGCSE", coverage: 85, teacher: "Teacher 1", status: "On Track" },
    { id: "s-2", title: "Organic Carbon Compound Synthesis", curriculum: "IGCSE", coverage: 68, teacher: "Teacher 3", status: "Behind Schedule" },
    { id: "s-3", title: "Advanced Pure Math Vectors", curriculum: "A-Level", coverage: 90, teacher: "Teacher 2", status: "On Track" },
    { id: "s-4", title: "CBSE Biology Anatomy", curriculum: "CBSE", coverage: 94, teacher: "Teacher 4", status: "Completed" }
  ]);

  const handlePushPacingAlert = (topic: string, teacher: string) => {
    onTriggerNotification(
      "📢 Pacing Notification", 
      `Sent formal syllabus pacing advisory to ${teacher} regarding: "${topic}". Recommended crash course past sheets dispatched.`
    );
  };

  // 2. Pending Assessment Approvals
  const [approvals, setApprovals] = useState([
    { id: "app-1", title: "A-Level Calculus Mock Term 2 Draft", teacher: "Teacher 2", type: "Mock GCSE Paper", date: "June 16, 2026", status: "Pending Decision" },
    { id: "app-2", title: "CBSE Grade 11 Inorganic exam Scheme", teacher: "Teacher 3", type: "Semester check", date: "June 17, 2026", status: "Pending Decision" }
  ]);

  const handleApproveAssessment = (id: string, title: string, approve: boolean) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    if (approve) {
      onTriggerNotification("📋 Exam Content Approved", `The following mock parameters are locked & ready for student download: "${title}"`);
    } else {
      onTriggerNotification("⚠️ Content Rejected", `Returned draft booklet "${title}" to faculty with correction annotations.`);
    }
  };

  // 3. Exam Results Moderation State
  const [marksToModerate, setMarksToModerate] = useState([
    { id: "m-1", studentName: "Student 5", rawMark: "78%", subject: "CBSE Physics Term 1", moderatedMark: "82%" },
    { id: "m-2", studentName: "Student 3", rawMark: "64%", subject: "IGCSE Math Test 2", moderatedMark: "68%" },
    { id: "m-3", studentName: "Student 1", rawMark: "94%", subject: "IGCSE Biology Mock", moderatedMark: "94%" }
  ]);

  const handleModerateMarks = (id: string, student: string, newMark: string) => {
    setMarksToModerate(prev => prev.map(m => m.id === id ? { ...m, moderatedMark: newMark } : m));
    onTriggerNotification("🎯 Marks Moderated", `Overrode initial grading parameters for ${student} to ${newMark} to align with curriculum curves.`);
  };

  // 4. teacher reviews roster list
  const [teacherReviews, setTeacherReviews] = useState([
    { id: "tr-1", name: "Teacher 1", classAudited: "IGCSE Physics Electro", rating: 4.9, feedback: "Excellent student micro-group diagnostic interactions. Pacing matches high-score rules perfectly." },
    { id: "tr-2", name: "Teacher 3", classAudited: "IGCSE Chemistry Organic", rating: 4.4, feedback: "Clear definitions. Advised to increase on-board diagram drawings for complex ester equations." }
  ]);

  // 5. Intervention diagnostics (At-risk students list)
  const [atRiskStudents, setAtRiskStudents] = useState([
    { id: "risk-1", name: "Student 3", class: "IGCSE Math Test 2", reason: "Scored 64% below general class curves. Missed homework term targets.", status: "Intervention Dispatched" },
    { id: "risk-2", name: "Student 4", class: "A-Level Physics Mechanics", reason: "At-risk on thermal equations module indices.", status: "Pending Diagnostics" }
  ]);

  const handleDispatchIntervention = (student: string, id: string) => {
    setAtRiskStudents(prev => prev.map(s => s.id === id ? { ...s, status: "Intervention Dispatched" } : s));
    onTriggerNotification("⚡ Remediation Deployed", `Assigned personal revision worksheets and booked a 1-on-1 advisor diagnostic for ${student}.`);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left text-slate-150 select-none">
      
      {/* 1. Header banner */}
      <div className="p-6 bg-slate-900 border border-slate-855 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[9.5px] uppercase font-mono font-black text-indigo-400">
              ACADEMIC MODERATION & PACING
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Curriculum Coordination Console
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Verify Cambridge IGCSE, CBSE, and A-Level syllabus pacing indices, authorize exam mock papers, moderate mark curves, track teacher NPS performance, and deploy student interventions.
          </p>
        </div>

        <div className="shrink-0 z-10 w-full md:w-auto">
          <div className="flex gap-1.5 bg-slate-950 border border-slate-800 rounded-2xl p-1.5">
            {(["IGCSE", "A-Level", "CBSE"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveCurriculum(tab);
                  onTriggerNotification("📖 curriculum shifted", `Academics board loaded standard indices matching ${tab}.`);
                }}
                className={`px-3 py-1.5 text-[9.5px] font-black rounded-lg uppercase cursor-pointer transition-all ${
                  activeCurriculum === tab
                    ? "bg-indigo-600 text-white font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Key Academic Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Consolidated Pacing Index", value: "92.4% rate", note: "Outpacing 2025 schedules" },
          { label: "Approved Mock Papers", value: "48 Papers", note: "12 pending coord sign-off" },
          { label: "At-Risk Intervention List", value: `${atRiskStudents.filter(s => s.status === "Pending Diagnostics").length} Students`, note: "Syllabus metrics falling" },
          { label: "Moderate Mark Audits", value: "112 Adjusted", note: "GCC curve alignment" },
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

      {/* Grid: syllabus coverage & Assessment approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Course Coverage & Milestones */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400">🏫 Program Coverage & pacing index</h3>
              <p className="text-[10px] text-slate-550 mt-1">Cross-check standard chapter metrics with teacher execution schedules.</p>
            </div>
            <BrainCircuit className="w-4.5 h-4.5 text-indigo-400" />
          </div>

          <div className="space-y-4">
            {syllabusSectors.map(sec => (
              <div key={sec.id} className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-slate-100 text-xs">{sec.title}</strong>
                    <span className="text-[10.5px] text-slate-450 block mt-0.5">Faculty: {sec.teacher} ({sec.curriculum})</span>
                  </div>
                  <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-lg border ${
                    sec.status === "On Track" || sec.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                  }`}>
                    {sec.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/[0.02]">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${sec.coverage}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 font-bold block">Chapters Compiled: {sec.coverage}%</span>
                  </div>
                  
                  {sec.status === "Behind Schedule" && (
                    <button 
                      onClick={() => handlePushPacingAlert(sec.title, sec.teacher)}
                      className="px-2.5 py-1.5 bg-rose-650 hover:bg-rose-600 text-white text-[9.5px] font-bold rounded-xl uppercase transition shrink-0"
                    >
                      Issue Warning alert
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Approvals */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400">📋 Pending Assessment Authorizations</h3>
              <p className="text-[10px] text-slate-550 mt-1">Audit mock exam templates and course schemas before term roll-out.</p>
            </div>
            <CheckSquare className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-3.5">
            {approvals.length > 0 ? (
              approvals.map(app => (
                <div key={app.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl space-y-2.5 text-left">
                  <div className="space-y-0.5">
                    <strong className="text-slate-100 text-xs block">{app.title}</strong>
                    <span className="text-[10px] text-slate-455 block font-mono">Faculty: {app.teacher} • Submitted on: {app.date}</span>
                  </div>
                  <div className="flex gap-2 font-mono">
                    <button 
                      onClick={() => handleApproveAssessment(app.id, app.title, false)}
                      className="flex-1 py-1 px-2 border border-slate-800 hover:border-rose-500 hover:bg-rose-550/10 text-[9.5px] text-slate-400 hover:text-rose-400 font-bold uppercase rounded-lg transition"
                    >
                      Reject Draft
                    </button>
                    <button 
                      onClick={() => handleApproveAssessment(app.id, app.title, true)}
                      className="flex-1 py-1 px-2 bg-indigo-650 hover:bg-indigo-600 text-[9.5px] text-white font-bold uppercase rounded-lg transition"
                    >
                      Approve & Lock
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[10.5px] text-slate-500 font-semibold text-center py-6">All draft exams approved for Jumeirah Campus roster.</p>
            )}
          </div>
        </div>

      </div>

      {/* Grid: Marks curves Moderation & Intervention program desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Results Curve Moderation */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400">📊 Mock Exam mark-sheet Moderation</h3>
              <p className="text-[10px] text-slate-550 mt-1">Override raw examination papers marks with curriculum bell-curves.</p>
            </div>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="space-y-3">
            {marksToModerate.map(m => (
              <div key={m.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between gap-3 text-left">
                <div>
                  <strong className="text-slate-100 text-xs block">{m.studentName}</strong>
                  <span className="text-[10px] text-slate-500 block">{m.subject} • Raw mark: {m.rawMark}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-550 font-mono font-bold">Moderated:</span>
                  <input 
                    type="text" 
                    value={m.moderatedMark}
                    onChange={(e) => handleModerateMarks(m.id, m.studentName, e.target.value)}
                    className="w-14 p-1 text-center bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-400 font-black rounded outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intervention diagnostic plans */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-indigo-400">⚡ At-risk Student Remediation programs</h3>
              <p className="text-[10px] text-slate-550 mt-1">Assign custom pacing lessons or schedule peer tutorials.</p>
            </div>
            <AlertTriangle className="w-4.5 h-4.5 text-rose-500" />
          </div>

          <div className="space-y-3.5">
            {atRiskStudents.map(student => (
              <div key={student.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-150 text-xs">{student.name}</strong>
                    <span className="text-[9px] px-1 bg-slate-950 text-slate-500 font-mono font-semibold rounded">{student.class}</span>
                  </div>
                  <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">{student.reason}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                  <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-md border ${
                    student.status === "Intervention Dispatched" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-rose-505/10 text-rose-500 border-rose-500/20"
                  }`}>
                    {student.status === "Intervention Dispatched" ? "Dispatched" : "Pending"}
                  </span>
                  {student.status === "Pending Diagnostics" && (
                    <button 
                      onClick={() => handleDispatchIntervention(student.name, student.id)}
                      className="px-2 py-1 bg-indigo-650 hover:bg-indigo-600 font-mono text-[9px] text-white font-bold rounded uppercase cursor-pointer"
                    >
                      Deploy
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lesson audits peer review log table */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black uppercase text-indigo-400">🕵️ Teacher Peer Reviews & Audits Log</h3>
            <p className="text-[10px] text-slate-550 mt-1 font-semibold">Track rating evaluations, class pacing integrity, and coordinator diagnostic comments.</p>
          </div>
          <Users className="w-4.5 h-4.5 text-indigo-400" />
        </div>

        <div className="space-y-3 text-left">
          {teacherReviews.map(rev => (
            <div key={rev.id} className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-100">{rev.name}</strong>
                  <span className="text-[9px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-1 rounded-md">Audited Course: {rev.classAudited}</span>
                </div>
                <span className="text-amber-400 font-bold font-mono">NPS Audited Rating: {rev.rating} ★</span>
              </div>
              <p className="text-[10.5px] text-slate-400 italic leading-relaxed">
                "{rev.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
