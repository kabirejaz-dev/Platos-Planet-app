import React, { useState } from "react";
import { 
  Sparkles, GraduationCap, BookOpen, Clock, CheckSquare, Upload, 
  Send, Brain, CheckCircle2, AlertTriangle, TrendingUp, Notebook, BarChart3, Star
} from "lucide-react";

interface EducatorProPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

export default function EducatorProPage({ theme, onTriggerNotification }: EducatorProPageProps) {
  // 1. AI Lesson Planner states
  const [promptTopic, setPromptTopic] = useState("Photosynthesis & Light Absorption Rates");
  const [aiResultType, setAiResultType] = useState<"lesson" | "worksheet" | "quiz">("lesson");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResultContent, setAiResultContent] = useState<string | null>(null);

  // 2. Today's Classes List
  const [classes, setClasses] = useState([
    { id: "cl-1", name: "IGCSE Biology Masterclass", time: "16:00 - 17:30", curriculum: "British", students: 16, status: "Active" },
    { id: "cl-2", name: "A-Level Advanced Core Calculus", time: "17:30 - 19:00", curriculum: "British", students: 12, status: "Upcoming" },
    { id: "cl-3", name: "CBSE Organic Chemistry", time: "19:00 - 20:30", curriculum: "CBSE", students: 22, status: "Upcoming" }
  ]);

  // 3. Roll-Call Attendance State
  const [attendance, setAttendance] = useState<Record<string, boolean>>({
    "s-1": true,
    "s-2": true,
    "s-3": false,
    "s-4": true,
    "s-5": true
  });

  const studentsList = [
    { id: "s-1", name: "Student 1", grade: "Grade 10", progress: "94% Mastery" },
    { id: "s-2", name: "Student 10", grade: "Grade 11", progress: "88% Mastery" },
    { id: "s-3", name: "Student 8", grade: "Grade 10", progress: "74% Mastery" },
    { id: "s-4", name: "Student 3", grade: "Grade 12", progress: "91% Mastery" },
    { id: "s-5", name: "Student 5", grade: "Grade 10", progress: "85% Mastery" }
  ];

  const handleToggleAttendance = (id: string) => {
    setAttendance(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveAttendance = () => {
    onTriggerNotification("📝 Roll Call Complete", "Today's checked-in student attendance log has been successfully saved to Plato's student records cloud space.");
  };

  // 4. Homework & Tests Grading Center
  const [homeworks, setHomeworks] = useState([
    { id: "hw-1", studentName: "Student 8", title: "CBSE Linear Vector Exercises Q1-Q5", status: "Submited", score: "" },
    { id: "hw-2", studentName: "Student 3", title: "A-Level Calculus Derivatives Review", status: "Submited", score: "" },
    { id: "hw-3", studentName: "Student 10", title: "IGCSE Chemistry Organic Esterification", status: "Graded", score: "92%" }
  ]);

  const [testGrades, setTestGrades] = useState([
    { id: "test-1", studentName: "Student 1", testName: "IGCSE Biology Mock Term 2", status: "Submited", score: "" },
    { id: "test-2", studentName: "Student 5", testName: "IGCSE Biology Mock Term 2", status: "Graded", score: "88%" }
  ]);

  const [inputScores, setInputScores] = useState<Record<string, string>>({});

  const handleGradeItem = (itemId: string, studentName: string, isTest: boolean) => {
    const scoreVal = inputScores[itemId] || "90%";
    if (isTest) {
      setTestGrades(prev => prev.map(t => t.id === itemId ? { ...t, status: "Graded", score: scoreVal } : t));
    } else {
      setHomeworks(prev => prev.map(hw => hw.id === itemId ? { ...hw, status: "Graded", score: scoreVal } : hw));
    }
    onTriggerNotification("💯 Grade Dispatched", `Assigned grade of ${scoreVal} to ${studentName}. Progress scorecard updated.`);
  };

  // 5. Notes Content Composer & Syllabus check
  const [syllabusSectors, setSyllabusSectors] = useState([
    { id: "sec-1", title: "IGCSE Cell Structure & DNA", covered: true },
    { id: "sec-2", title: "IGCSE Organism Respiration Cycles", covered: true },
    { id: "sec-3", title: "IGCSE Photosynthesis Factors", covered: false },
    { id: "sec-4", title: "IGCSE Plant Water Transportation", covered: false }
  ]);

  const toggleSyllabusCovered = (id: string) => {
    setSyllabusSectors(prev => prev.map(s => s.id === id ? { ...s, covered: !s.covered } : s));
    onTriggerNotification("📖 Milestone Updated", "Syllabus tracking progress synced with Academic Coordinator portal.");
  };

  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialType, setNewMaterialType] = useState("Revision PDF");

  const [materials, setMaterials] = useState([
    { title: "Photosynthesis Absorption Spectrum Rules.pdf", type: "Revision PDF", date: "June 12, 2026", size: "1.4 MB" },
    { title: "IGCSE Biology Sample Past Papers 2025.zip", type: "Past Papers", date: "June 15, 2026", size: "12.8 MB" }
  ]);

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialName) return;

    setMaterials(prev => [{
      title: newMaterialName.endsWith(".pdf") ? newMaterialName : `${newMaterialName}.pdf`,
      type: newMaterialType,
      date: "Today",
      size: "2.1 MB"
    }, ...prev]);

    setNewMaterialName("");
    onTriggerNotification("📂 Material Dispatched", `Uploaded new resource: ${newMaterialName} under ${newMaterialType}.`);
  };

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
  *Correct Answer: A. Explanation: Yes, thermal indexes are directly proportional to load limits.*`;
      }

      setAiResultContent(content);
      onTriggerNotification(
        "🧠 AI Lesson Created",
        `Drawn custom educational materials for ${promptTopic} successfully.`
      );
    }, 850);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left select-none text-slate-100">
      
      {/* 1. Header Area */}
      <div className="p-6 bg-slate-900 border border-slate-850 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[9.5px] uppercase font-mono font-black text-violet-400">
              EDUCATIONAL CURRICULUM DELIVERY CORE
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Educator Pro Classroom Dashboard
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Manage student attendance registers, mock exam test scoring ledger, revision material dispatchers, and deploy generative AI lesson drafting algorithms.
          </p>
        </div>

        <div className="shrink-0 z-10 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left max-w-xs w-full sm:w-auto flex items-center gap-3">
          <span className="text-3xl">☕</span>
          <div>
            <strong className="text-slate-150 text-xs block">Teacher 1</strong>
            <span className="text-[10px] text-violet-400 font-mono">Senior Instructor, Physics</span>
          </div>
        </div>
      </div>

      {/* Grid: Attendance & Today's classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Classes */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <h3 className="text-xs font-black uppercase text-violet-400">🕒 Scheduled Daily Classes</h3>
            <span className="text-[9.5px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-850">TODAY</span>
          </div>

          <div className="space-y-3">
            {classes.map(cl => (
              <div key={cl.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between">
                <div>
                  <strong className="text-xs text-slate-200 block">{cl.name}</strong>
                  <span className="text-[10px] text-slate-450 block mt-0.5 font-mono">{cl.time} • {cl.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[8.5px] font-mono uppercase font-black px-1.5 py-0.5 rounded-lg border ${
                    cl.status === "Active" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-slate-950 text-slate-450 border-slate-800"
                  }`}>
                    {cl.status}
                  </span>
                  {cl.status === "Upcoming" && (
                    <button 
                      onClick={() => onTriggerNotification("📢 Lecture Initialized", `Dispatched lecture room start reminders for ${cl.name}.`)}
                      className="px-2 py-1 bg-violet-650 hover:bg-violet-600 text-[10px] font-bold uppercase rounded-lg text-white"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Attendance Roll Call */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-violet-400"> Roll Call Attendance register</h3>
              <p className="text-[10px] text-slate-550 mt-1">Check student boxes below and commit parameters.</p>
            </div>
            <CheckSquare className="w-4.5 h-4.5 text-violet-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {studentsList.map(st => {
              const present = attendance[st.id] !== false;
              return (
                <div 
                  key={st.id} 
                  onClick={() => handleToggleAttendance(st.id)}
                  className={`p-3 border rounded-2xl flex items-center justify-between cursor-pointer transition ${
                    present ? "bg-emerald-550/5 border-emerald-500/20" : "bg-rose-550/5 border-rose-500/15"
                  }`}
                >
                  <div>
                    <strong className="text-xs text-slate-202 block">{st.name}</strong>
                    <span className="text-[9.5px] text-slate-500">{st.grade} • {st.progress}</span>
                  </div>
                  <span className={`text-[9.5px] font-bold font-mono px-2 py-0.5 rounded-lg border uppercase ${
                    present ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-550 border-rose-500/20"
                  }`}>
                    {present ? "Present" : "Absent"}
                  </span>
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleSaveAttendance}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
          >
            Save & Publish Attendance
          </button>
        </div>

      </div>

      {/* Homework, Mocks & Test Grading Center */}
      <div className="bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
          <div>
            <h3 className="text-xs font-black uppercase text-violet-400">💯 Homework & Term Exams grading Desk</h3>
            <p className="text-[10px] text-slate-550 mt-1">Grade and submit review comments into parent portfolios instantly.</p>
          </div>
          <GraduationCap className="w-4.5 h-4.5 text-violet-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Homework items */}
          <div className="space-y-3">
            <span className="text-[8px] font-mono uppercase font-black text-slate-550 tracking-widest block">Weekly homework submissions</span>
            {homeworks.map(hw => (
              <div key={hw.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <strong className="text-xs text-slate-205 block">{hw.studentName}</strong>
                  <span className="text-[10.5px] text-slate-450 block truncate max-w-[280px] mt-0.5">{hw.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {hw.status === "Graded" ? (
                    <span className="text-xs font-mono font-black text-emerald-400">{hw.score}</span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text" 
                        placeholder="E.g. 95%"
                        value={inputScores[hw.id] || ""}
                        onChange={(e) => setInputScores({ ...inputScores, [hw.id]: e.target.value })}
                        className="w-14 p-1 bg-slate-950 border border-slate-800 text-[10.5px] font-mono text-center rounded text-white"
                      />
                      <button 
                        onClick={() => handleGradeItem(hw.id, hw.studentName, false)}
                        className="px-2 py-1 bg-violet-650 hover:bg-violet-600 text-[9.5px] text-white font-bold rounded uppercase cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Exam test grading */}
          <div className="space-y-3">
            <span className="text-[8px] font-mono uppercase font-black text-slate-550 tracking-widest block">Active mock exams list</span>
            {testGrades.map(t => (
              <div key={t.id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <strong className="text-xs text-slate-205 block">{t.studentName}</strong>
                  <span className="text-[10.5px] text-slate-450 block truncate max-w-[280px] mt-0.5">{t.testName}</span>
                </div>
                <div className="flex items-center gap-2">
                  {t.status === "Graded" ? (
                    <span className="text-xs font-mono font-black text-emerald-400">{t.score}</span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text" 
                        placeholder="E.g. 88"
                        value={inputScores[t.id] || ""}
                        onChange={(e) => setInputScores({ ...inputScores, [t.id]: e.target.value })}
                        className="w-14 p-1 bg-slate-950 border border-slate-800 text-[10.5px] font-mono text-center rounded text-white"
                      />
                      <button 
                        onClick={() => handleGradeItem(t.id, t.studentName, true)}
                        className="px-2 py-1 bg-violet-650 hover:bg-violet-600 text-[9.5px] text-white font-bold rounded uppercase cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Material Upload and Syllabus Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Document dispatch */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-violet-400">📂 Dispatch Lecture Materials</h3>
              <p className="text-[10px] text-slate-550 mt-1">Publish study booklets and trial worksheets to portals.</p>
            </div>
            <Upload className="w-4 h-4 text-violet-400" />
          </div>

          <form onSubmit={handleUploadMaterial} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-mono font-black text-slate-500">Resource Title</label>
              <input 
                type="text" 
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                placeholder="E.g. Bio Osmosis Laws"
                required
                className="w-full p-2 bg-slate-950 border border-slate-800 text-[10.5px] text-white font-bold rounded-xl outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-mono font-black text-slate-505">Resource Type</label>
              <select 
                value={newMaterialType}
                onChange={(e) => setNewMaterialType(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 text-[10.5px] text-white font-bold rounded-xl outline-none"
              >
                <option value="Revision PDF">Revision PDF</option>
                <option value="Past Papers">Past Papers Pack</option>
                <option value="Video lecture">Video lecture</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition"
            >
              Dispatch File
            </button>
          </form>

          <div className="space-y-3">
            {materials.map((m, id) => (
              <div key={id} className="p-3 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-between text-left">
                <div>
                  <strong className="text-xs text-slate-202 block truncate max-w-[320px]">{m.title}</strong>
                  <span className="text-[9.5px] text-slate-500 block font-mono">{m.type} • Uploaded: {m.date}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-450 font-bold">{m.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus tracker */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b pb-4 border-white/[0.04]">
            <div>
              <h3 className="text-xs font-black uppercase text-violet-400">📖 Cambridge Syllabus Milestones</h3>
              <p className="text-[10px] text-slate-550 mt-1">Select completed milestone fields below.</p>
            </div>
            <Notebook className="w-4 h-4 text-violet-400" />
          </div>

          <div className="space-y-2.5">
            {syllabusSectors.map(s => (
              <div 
                key={s.id} 
                onClick={() => toggleSyllabusCovered(s.id)}
                className={`p-3 border rounded-2xl flex items-center justify-between cursor-pointer transition ${
                  s.covered ? "border-emerald-500/20 bg-slate-900/40" : "border-slate-850"
                }`}
              >
                <span className={`text-xs font-bold ${s.covered ? "line-through text-slate-550" : "text-slate-205"}`}>{s.title}</span>
                <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-md border ${
                  s.covered ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-520 border-rose-500/20"
                }`}>
                  {s.covered ? "Covered" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* High-Fidelity Creator AI Lesson Planner (Copied verbatim from specification) */}
      <div className="bg-slate-950 border border-slate-855 p-6 rounded-3xl space-y-5 text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-violet-400">
              <Brain className="w-5 h-5" />
              <p className="text-xs font-black uppercase font-mono tracking-wider">PLATO-AI EXTREME LECTURE ENGINE</p>
            </div>
            <p className="text-xs text-slate-400 mt-1">Prompt Socrates-AI to draft high-yield course blueprints, quiz diagnostics, or worksheets instantly.</p>
          </div>
          <span className="p-1 px-2.5 bg-violet-500/15 border border-violet-500/35 text-violet-400 rounded-full text-[9px] font-black uppercase font-mono tracking-widest leading-none">V3 GenAI Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1">
            <span className="text-[8px] uppercase font-mono font-black text-slate-550">Core Topic of Interest</span>
            <input 
              type="text" 
              value={promptTopic}
              onChange={(e) => setPromptTopic(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[8px] uppercase font-mono font-black text-slate-555">Output Blueprint Format</span>
            <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
              {(["lesson", "worksheet", "quiz"] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAiResultType(type)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg capitalize transition cursor-pointer ${
                    aiResultType === type ? "bg-violet-600 font-extrabold text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={generateAiTeachingMaterial}
            disabled={aiLoading}
            className="w-full py-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-705 text-white rounded-xl text-xs font-black uppercase tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-violet-600/10 disabled:opacity-50"
          >
            {aiLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                <span>Formulating Stacks...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prompt Plato-AI</span>
              </>
            )}
          </button>
        </div>

        {aiResultContent && (
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4.5 space-y-3 font-mono text-xs text-slate-300 leading-relaxed border-l-4 border-l-violet-500 animate-fade-in text-left whitespace-pre-wrap">
            {aiResultContent}
            <div className="flex justify-end gap-2 text-[10px] font-bold pt-2 font-sans">
              <button 
                onClick={() => {
                  setNewMaterialName(`AI Generated: ${promptTopic}`);
                  setNewMaterialType(aiResultType === "lesson" ? "Revision PDF" : aiResultType === "worksheet" ? "Revision PDF" : "Past Papers");
                  onTriggerNotification("📝 Draft Cached", "Created local file upload stub. Submit form above to publish.");
                }}
                className="px-3.5 py-1.5 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-800 rounded-lg transition"
              >
                Send to local cache
              </button>
              <button 
                onClick={() => {
                  onTriggerNotification("📂 Material Dispatched", `Instantly published ${promptTopic} draft directly to Student study libraries.`);
                  setAiResultContent(null);
                }}
                className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
              >
                Direct Dispatch
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
