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
    { id: "std-1", name: "Zayd Al-Mansoori", grade: "10 (British)", avatar: "👨‍🎓" },
    { id: "std-2", name: "Sara Al-Hashimi", grade: "12 (A-Level)", avatar: "👩‍🎓" },
    { id: "std-3", name: "Dev Patel", grade: "11 (CBSE)", avatar: "👨‍🎓" },
    { id: "std-4", name: "Chloe Sterling", grade: "10 (British)", avatar: "👩‍🎓" }
  ];

  // Grade Center lists
  const [pendingGrading, setPendingGrading] = useState([
    { id: "grade-1", name: "Dev Patel", subject: "Biology Cell Respiration", type: "Weekly Mock Paper 3" },
    { id: "grade-2", name: "Chloe Sterling", subject: "IGCSE Mathematics Trig", type: "Geometry Quiz" }
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
      "Saved today's checked-in student log parameters into the regional KHDA database tracker."
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
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Dynamic Teacher Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "My Classes Today", value: "4 Tutoring Cycles", color: "text-indigo-400" },
          { label: "Syllabus Compliance", value: "88.2% Completed", color: "text-emerald-400" },
          { label: "NPS Rating", value: "4.82 / 5.0 (Top Standard)", color: "text-amber-500" },
          { label: "Parent Response Score", value: "98% compliance", color: "text-slate-400" }
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex flex-col justify-between">
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">
              {stat.label}
            </span>
            <span className="text-base font-black text-slate-100 mt-1 block">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Dynamic Actions Ribbon */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mr-2">
          Classroom Controls:
        </span>
        <button
          onClick={() => openModal("TEACHER_TAKE_ATTENDANCE")}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
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
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          aria-label="Grade Tests"
        >
          <span>💯 Grade Tests</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Daily classes schedule and AI Lesson generator (8/12 block) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main AI Educator Assistant Module */}
          <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4.5 h-4.5 text-indigo-400" />
                  Plato AI Teaching Assistant
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Generate high-quality comprehensive lessons, worksheets or mcq exams with step-by-step explanations</p>
              </div>
              <Sparkle className="w-5 h-5 text-indigo-400 animate-spin-slow" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <span className="text-[8px] uppercase font-mono font-black text-slate-500">
                    Syllabus Subject Chapter / Topic Input
                  </span>
                  <input
                    type="text"
                    value={promptTopic}
                    onChange={(e) => setPromptTopic(e.target.value)}
                    placeholder="E.g. Electric circuits Parallel vs Series..."
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] uppercase font-mono font-black text-slate-500">
                    Desired Outcome Format
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
                        className={`py-1 text-[9px] font-black rounded-lg uppercase cursor-pointer transition-all ${
                          aiResultType === t.id
                            ? "bg-indigo-500 text-white"
                            : "text-slate-450 hover:text-slate-205"
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
                className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-605 text-[#FFF] text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10"
              >
                {aiLoading ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin text-white" /> Crafting Premium Syllabus Material...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" /> Construct Direct Material with Educational AI
                  </>
                )}
              </button>

              {/* RENDERED AI EXPLICIT OUTLINE RESULTS CARD */}
              {aiResultContent && (
                <div className="p-4 bg-slate-900 border border-slate-855 rounded-2xl text-[10.5px] leading-relaxed font-semibold whitespace-pre-wrap text-slate-300 relative">
                  <span className="absolute top-3 right-3 text-[7.5px] font-mono uppercase bg-emerald-550 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black">
                    AI Engine Output
                  </span>
                  
                  {aiResultContent}

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[9px] text-slate-500">Target Level: High Quality, Curriculum Verified.</span>
                    <button
                      onClick={() => onTriggerNotification("📂 Material Dispatched", "Dispatched this lesson content to student active files successfully.")}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black uppercase tracking-wider text-amber-500 cursor-pointer"
                    >
                      Publish Directly to Students
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Classes Schedule and attendance */}
          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Today's Attendance & Check-ins Register
                </h3>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Daily campus register checklists. Marks absent/present into central ERP</p>
              </div>
              <CheckSquare className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
              {students.map((std) => {
                const isPresent = attendanceToday[std.id] ?? false;
                return (
                  <div 
                    key={std.id}
                    onClick={() => handleToggleAttendance(std.id)}
                    className={`p-3 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isPresent
                        ? "bg-slate-900/60 border-indigo-500/30 text-white"
                        : "bg-slate-950 border-slate-850 text-slate-450"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{std.avatar}</span>
                      <div>
                        <h4 className="text-[11px] font-black">{std.name}</h4>
                        <span className="text-[8.5px] text-slate-550 block">{std.grade}</span>
                      </div>
                    </div>

                    <div className={`p-1 px-2.5 rounded font-black text-[9px] uppercase ${
                      isPresent ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {isPresent ? "Present Checks" : "Toggled Absent"}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSaveAttendance}
              className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10.5px] text-slate-350 hover:text-white uppercase font-black tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Comptroller: Push Attendances to Regional HQ
            </button>
          </div>

        </div>

        {/* Right Section: Pending Grading tasks & lecture uploads (4/12 block) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Homework and exam assessment tracker */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3.5">
            <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-[#f59e0b] uppercase block">
              Grading Queue Pending Review
            </h4>

            {pendingGrading.length === 0 ? (
              <div className="p-4 text-center bg-slate-900/20 rounded-xl border border-slate-850 text-[10px] text-slate-500">
                ⭐ All diagnostic mock papers fully graded!
              </div>
            ) : (
              <div className="space-y-2">
                {pendingGrading.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900/60 border border-slate-855 rounded-xl space-y-2">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-200">{item.name}</h5>
                      <p className="text-[9.5px] text-slate-400 font-semibold">{item.subject}</p>
                      <span className="text-[8px] font-mono uppercase bg-slate-950 border border-slate-850 px-1 py-0.2 rounded text-slate-500 inline-block mt-1">
                        {item.type}
                      </span>
                    </div>

                    <button
                      onClick={() => gradeStudentPaper(item.id, item.name)}
                      className="w-full py-1.5 bg-indigo-500 hover:bg-indigo-605 text-white font-bold text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      Grade Paper
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Classroom Resource Upload Module */}
          <form onSubmit={uploadLectureMaterial} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left space-y-3">
            <h4 className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">
              Syllabus Resource Broadcaster
            </h4>

            <div className="space-y-2 text-[10.5px]">
              <span className="text-[8px] text-slate-500 uppercase font-mono tracking-wide block">PDF Material or MP4 Lecture Name</span>
              <input
                type="text"
                value={activeNoteText}
                onChange={(e) => setActiveNoteText(e.target.value)}
                placeholder="E.g. Thermal equilibrium homework.pdf"
                className="w-full bg-slate-900 border border-slate-800 text-[11px] text-white p-2.5 rounded-xl placeholder-slate-600 font-semibold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-[#FFF] text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Upload & Broadcast
              </button>
            </div>

            <div className="pt-3 border-t border-white/[0.04] space-y-1.5">
              <span className="text-[7.5px] font-mono text-slate-550 uppercase tracking-widest block">PORTAL MATERIALS</span>
              {materials.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px] text-slate-400 font-semibold bg-slate-900/60 p-2 rounded-lg">
                  <span className="truncate max-w-[170px]">{m.title}</span>
                  <span className="text-[8.5px] font-mono text-slate-500 shrink-0">{m.size}</span>
                </div>
              ))}
            </div>
          </form>

          {/* Teacher ranking or NPS details */}
          <TeacherLeaderboard theme={theme} onTriggerNotification={onTriggerNotification} />

        </div>

      </div>

    </div>
  );
}
