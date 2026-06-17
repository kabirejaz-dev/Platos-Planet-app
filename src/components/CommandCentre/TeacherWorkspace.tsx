import React, { useState } from "react";
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Video, 
  CheckSquare, 
  Upload, 
  UserX, 
  Send,
  HelpCircle,
  Clock,
  Sparkle,
  TrendingUp,
  Brain
} from "lucide-react";
import TeacherLeaderboard from "./TeacherLeaderboard";
import { useGlobalAction } from "../GlobalActionContext";

interface TeacherWorkspaceProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function TeacherWorkspace({ theme, onTriggerNotification }: TeacherWorkspaceProps) {
  const { openModal } = useGlobalAction();
  // AI assistant states
  const [promptTopic, setPromptTopic] = useState("Photosynthesis & Light Absorption Rates");
  const [aiResultType, setAiResultType] = useState<"lesson" | "worksheet" | "quiz">("lesson");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResultContent, setAiResultContent] = useState<string | null>(null);

  // Dynamic attendance log simulation
  const [attendanceToday, setAttendanceToday] = useState<Record<string, boolean>>({
    "std-1": true,
    "std-2": true,
    "std-4": true,
  });

  const students = [
    { id: "std-1", name: "Student 1", grade: "10 (British)", avatar: "👨‍🎓" },
    { id: "std-2", name: "Student 3", grade: "12 (A-Level)", avatar: "👩‍🎓" },
    { id: "std-3", name: "Student 4", grade: "11 (CBSE)", avatar: "👨‍🎓" },
    { id: "std-4", name: "Student 7", grade: "10 (British)", avatar: "👩‍🎓" }
  ];

  // Grade Center lists
  const [pendingGrading, setPendingGrading] = useState([
    { id: "grade-1", name: "Student 4", subject: "Biology Cell Respiration", type: "Weekly Mock Paper 3" },
    { id: "grade-2", name: "Student 7", subject: "IGCSE Mathematics Trig", type: "Geometry Quiz" }
  ]);

  const [materials, setMaterials] = useState([
    { title: "Organic Chemistry Esterification Notes.pdf", date: "May 14, 25", size: "2.4 MB" },
    { title: "Electromagnetism Magnetic fields explanation.mp4", date: "May 10, 25", size: "48.2 MB" }
  ]);

  const [activeNoteText, setActiveNoteText] = useState("");

  const generateAiTeachingMaterial = () => {
    if (!promptTopic.trim()) return;
    setAiLoading(true);
    setAiResultContent(null);

    setTimeout(() => {
      setAiLoading(false);
      let content = "";

      if (aiResultType === "lesson") {
        content = `📚 **LESSON PLAN: ${promptTopic.toUpperCase()}**
*Target Grade: High-School IGCSE/CBSE (10-12)*
*Estimated Duration: 45 Minutes*

1. **Intake hook (5 mins)**: Display real-life vectors or chemical reactions. Prompt: "What governs active energy transfer here?"
2. **Core Directives (20 mins)**:
   • Master formula definitions and key symbols.
   • Staggered active recall: Ask students to map vectors on whiteboard.
3. **Interactive Lab/Quiz (15 mins)**:
   • 4 multiple-choice concept diagnostics.
4. **Conclusion & Homework (5 mins)**:
   • Answer past paper questions 1-4.`;
      } else if (aiResultType === "worksheet") {
        content = `📝 **STUDENT WORKSHEET: ${promptTopic.toUpperCase()}**
*Instructions: Answer all diagnostic inquiries. High level working expected.*

* **Q1**. Propose a detailed step-by-step proof of the main ${promptTopic} theorem.
* **Q2**. Identify the 2 critical error vectors in calculating chemical/physical variables.
* **Q3**. Propose a model to address a real-world discrepancy of +4.5% output variables.`;
      } else {
        content = `🧠 **AI GENERATED CONCEPT QUIZ: ${promptTopic.toUpperCase()}**
*Multiple choice diagnostic*

* **Question 1**: Which coefficient remains active under secondary ${promptTopic} conditions?
  A) Primary Alpha
  B) Core Beta Coefficient
  C) Theta Constant
  D) Null Variable
  *Correct Answer: B. Explanation: The core Beta coefficient dictates vector equilibrium rules.*

* **Question 2**: True or False: Resilient variables trigger structural thermal degradation.
  A) True
  B) False
  *Correct Answer: A. Explanation: Yes, thermal indexes are directly proportional to delta load limits.*`;
      }

      setAiResultContent(content);
      onTriggerNotification(
        "🧠 AI Lesson Created",
        `Drawn custom educational materials for ${promptTopic} successfully.`
      );
    }, 850);
  };

  const handleToggleAttendance = (id: string) => {
    setAttendanceToday(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveAttendance = () => {
    onTriggerNotification(
      "📝 Attendance Saved",
      "Saved today's checked-in student log parameters into the official attendance database ledger."
    );
  };

  const gradeStudentPaper = (id: string, name: string) => {
    setPendingGrading(prev => prev.filter(p => p.id !== id));
    onTriggerNotification(
      "💯 Grading Certified",
      `Dispatched mock paper scores and feedback notes for ${name} over current term.`
    );
  };

  const uploadLectureMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeNoteText.trim()) return;

    const newMaterial = {
      title: activeNoteText.endsWith(".pdf") || activeNoteText.endsWith(".mp4") ? activeNoteText : `${activeNoteText}.pdf`,
      date: "Today",
      size: "1.2 MB"
    };

    setMaterials(prev => [...prev, newMaterial]);
    setActiveNoteText("");
    onTriggerNotification("📂 Material Dispatched", "Uploaded new syllabus file resource into Student & Parent portal cloud spaces.");
  };

  return (
    <div className="space-y-6 animate-fade-in text-left font-sans select-none">
      
      {/* 2026 NOTION + LINEAR STYLE: STREAMLINED METRICS OS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "TODAY'S CLASSES", value: "4 Tutoring Cycles", compliance: "Next: Physics IGCSE at 5 PM", color: "text-electric-blue" },
          { label: "SYLLABUS COMPLIANCE", value: "88.2% Completed", compliance: "On-Track for June 2026", color: "text-neon-mint" },
          { label: "STUDENT SATISFACTION (NPS)", value: "4.82 / 5.0 Rating", compliance: "Top Dubai Standard", color: "text-neon-cyan" },
          { label: "PARENT RESPONSE COEFFICIENT", value: "98% Compliance", compliance: "PTM logs synced", color: "text-hot-coral" }
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:border-slate-705 transition-all">
            <div>
              <span className="text-[8px] font-mono tracking-[0.2em] font-black text-slate-500 uppercase">
                {stat.label}
              </span>
              <span className={`text-base font-black truncate block mt-1 ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-1.5 border-t border-slate-800/60 pt-1.5">
              {stat.compliance}
            </span>
          </div>
        ))}
      </div>

      {/* Classroom Control center command ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3 shadow-md">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Classroom Workspace Controls:
        </span>
        <button
          onClick={() => openModal("TEACHER_TAKE_ATTENDANCE")}
          className="px-3.5 py-1.5 bg-electric-blue hover:bg-electric-blue/90 text-white rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-electric-blue/15"
          aria-label="Take Attendance"
        >
          <span>📊 Take Attendance</span>
        </button>
        <button
          onClick={() => openModal("TEACHER_CREATE_ASSIGNMENT")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Create Assignment"
        >
          <span>✍️ Create Assignment</span>
        </button>
        <button
          onClick={() => openModal("TEACHER_UPLOAD_NOTES")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Upload Notes"
        >
          <span>📁 Upload Notes</span>
        </button>
        <button
          onClick={() => openModal("TEACHER_GRADE_TESTS")}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-805 text-slate-205 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Grade Tests"
        >
          <span>💯 Grade Tests</span>
        </button>
      </div>

      {/* Main Notion columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Notion Column: AI lesson planners & schedule checks (8/12 blocks) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Linear design: Plato AI Lesson Composer */}
          <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-5 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
              <div>
                <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Brain className="w-4.5 h-4.5 text-neon-cyan" />
                  Plato AI Teaching Assistant
                </h3>
                <p className="text-[10px] text-slate-450 mt-1">Generate Linear lessons worksheets and MCQs based on global Cambridge / CBSE syllabus</p>
              </div>
              <Sparkles className="w-4.5 h-4.5 text-neon-cyan animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <span className="text-[8px] uppercase font-mono font-black text-slate-500 block tracking-wider">
                    Syllabus Subject Chapter / Topic Input
                  </span>
                  <input
                    type="text"
                    value={promptTopic}
                    onChange={(e) => setPromptTopic(e.target.value)}
                    placeholder="E.g. Electric circuits Parallel vs Series..."
                    className="w-full bg-slate-905 border border-slate-800 text-xs text-white p-3 rounded-xl font-bold focus:outline-none focus:border-electric-blue transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[8px] uppercase font-mono font-black text-slate-500 block tracking-wider">
                    Outcome Format
                  </span>
                  <div className="grid grid-cols-3 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    {(
                      [
                        { id: "lesson", label: "Plan" },
                        { id: "worksheet", label: "Sheet" },
                        { id: "quiz", label: "Quiz" }
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setAiResultType(t.id)}
                        className={`py-1.5 text-[9px] font-black rounded-lg uppercase cursor-pointer transition-all ${
                          aiResultType === t.id
                            ? "bg-electric-blue text-white shadow-sm"
                            : "text-slate-450 hover:text-slate-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={generateAiTeachingMaterial}
                disabled={aiLoading}
                className="w-full py-3 bg-gradient-to-r from-electric-blue to-neo-purple hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-electric-blue/15"
              >
                {aiLoading ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin text-white" /> Constructing Premium Materials...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" /> Generate material with Plato Educational AI
                  </>
                )}
              </button>

              {/* Generated Result display card */}
              {aiResultContent && (
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] leading-relaxed font-mono whitespace-pre-wrap text-slate-300 relative animate-fade-in shadow-inner">
                  <span className="absolute top-4 right-4 text-[7.5px] font-mono uppercase bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 px-2 py-0.5 rounded font-black tracking-widest">
                    CURRICULUM COMPILED
                  </span>
                  
                  {aiResultContent}

                  <div className="mt-4 pt-3.5 border-t border-white/[0.04] flex items-center justify-between font-sans">
                    <span className="text-[9px] text-slate-500 font-medium">Auto-synced with Dubai branch compliance logs.</span>
                    <button
                      onClick={() => onTriggerNotification("📂 Material Dispatched", "Dispatched lesson plan to student active syllabus panels successfully.")}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black uppercase tracking-wider text-neon-cyan hover:text-white transition cursor-pointer"
                    >
                      Publish to Student Portals
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Today's classes check-in and attendance sheet */}
          <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl text-left space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider text-neon-mint">
                  ⚡ TODAY'S ACTIVE STUDENTS CHECK-IN
                </h3>
                <p className="text-[10px] text-slate-450 mt-1">Check-in students to record active tutoring logs and diagnostic streaks</p>
              </div>
              <CheckCircle className="w-4 h-4 text-neon-mint" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
              {students.map((std) => {
                const isPresent = attendanceToday[std.id] ?? false;
                return (
                  <div 
                    key={std.id}
                    onClick={() => handleToggleAttendance(std.id)}
                    className={`p-3.5 border rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-305 ${
                      isPresent
                        ? "bg-slate-900 border-electric-blue/20 text-white shadow-md shadow-electric-blue/5"
                        : "bg-slate-900/40 border-slate-850 text-slate-500 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{std.avatar}</span>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-250">{std.name}</h4>
                        <span className="text-[8.5px] text-slate-500 font-semibold block">{std.grade}</span>
                      </div>
                    </div>

                    <div className={`p-1 px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-wider ${
                      isPresent ? "bg-neon-mint/10 text-neon-mint" : "bg-rose-500/10 text-rose-450"
                    }`}>
                      {isPresent ? "CHECKED" : "ABSENT"}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSaveAttendance}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] text-slate-400 hover:text-white uppercase font-black tracking-widest rounded-xl transition-all cursor-pointer font-mono"
            >
              Comptroller: Push Attendances to Regional HQ
            </button>
          </div>

        </div>

        {/* Right Section: Notion Queue Columns (4/12 blocks) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Students Needing Attention - Dynamic Alerts block */}
          <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left space-y-4">
            <h4 className="text-[9px] font-mono tracking-[0.2em] font-black text-hot-coral uppercase block">
              🚨 STUDENTS NEEDING FOCUS
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-hot-coral/10 border border-hot-coral/20 rounded-2xl text-[10.5px]">
                <strong className="text-white block font-sans">Dev Patel</strong>
                <p className="text-slate-450 mt-1">Chemistry organic revision logs fall behind the standard branch pace this week.</p>
                <span className="text-[8.5px] font-mono text-hot-coral block mt-1.5 uppercase font-bold">Action: Drill quiz elements</span>
              </div>

              <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-2xl text-[10.5px]">
                <strong className="text-white block font-sans">Chloe Sterling</strong>
                <p className="text-slate-450 mt-1">Missed last thermal calculations class. Recorded absent on check-in registers.</p>
                <span className="text-[8.5px] font-mono text-neon-cyan block mt-1.5 uppercase font-bold">Action: Allocate lecture backup</span>
              </div>
            </div>
          </div>

          {/* Linear Queue: Papers Pending Review */}
          <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left space-y-4 shadow-xl">
            <h4 className="text-[9px] font-mono tracking-[0.2em] font-black text-neon-cyan uppercase block">
              📋 FEEDBACK & GRADING QUEUE
            </h4>

            {pendingGrading.length === 0 ? (
              <div className="p-4 text-center bg-slate-900/20 rounded-xl border border-slate-850 text-[10px] text-slate-500 font-mono">
                ⭐ All trials fully certified!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingGrading.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition-all">
                    <div>
                      <h5 className="text-[10px] font-black text-white">{item.name}</h5>
                      <span className="text-[8px] font-mono uppercase bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-neon-cyan inline-block mt-1">
                        {item.type}
                      </span>
                      <p className="text-[9.5px] text-slate-400 mt-1 truncate">{item.subject}</p>
                    </div>

                    <button
                      onClick={() => gradeStudentPaper(item.id, item.name)}
                      className="w-full py-1.5 bg-electric-blue hover:bg-electric-blue/90 text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-electric-blue/10"
                    >
                      Authenticate Grade
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Broadcaster form */}
          <form onSubmit={uploadLectureMaterial} className="bg-slate-950 border border-slate-850 p-5 rounded-3xl text-left space-y-4">
            <h4 className="text-[9px] font-mono tracking-[0.2em] font-black text-slate-500 uppercase block">
              📥 RESOURCE BROADCASTER
            </h4>

            <div className="space-y-2 text-[10.5px]">
              <span className="text-[8px] text-slate-500 uppercase font-mono tracking-wide block">PDF Material or MP4 Lecture Name</span>
              <input
                type="text"
                value={activeNoteText}
                onChange={(e) => setActiveNoteText(e.target.value)}
                placeholder="E.g. Thermal equilibrium homework.pdf"
                className="w-full bg-slate-905 border border-slate-850 text-[11px] text-white p-2.5 rounded-xl placeholder-slate-650 font-semibold focus:outline-none focus:border-neon-cyan transition-all"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-mono"
              >
                <Upload className="w-3.5 h-3.5 text-neon-cyan" /> Upload & Broadcast
              </button>
            </div>

            <div className="pt-3 border-t border-white/[0.04] space-y-1.5">
              <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest block">PORTAL MATERIALS</span>
              {materials.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px] text-slate-400 font-semibold bg-slate-900 border border-slate-850 p-2 rounded-lg">
                  <span className="truncate max-w-[150px] font-mono text-[9px] text-slate-300">{m.title}</span>
                  <span className="text-[8px] font-mono text-slate-500 shrink-0">{m.size}</span>
                </div>
              ))}
            </div>
          </form>

          {/* Teacher ranking details */}
          <TeacherLeaderboard theme={theme} onTriggerNotification={onTriggerNotification} />

        </div>

      </div>

    </div>
  );
}
