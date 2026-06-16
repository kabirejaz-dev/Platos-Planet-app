import React, { useState } from "react";
import { Sparkles, Filter, Download, BookOpen, Layers, CheckSquare, RefreshCw, Star } from "lucide-react";

interface ReferenceDoc {
  id: string;
  title: string;
  curriculum: "IGCSE" | "CBSE";
  subject: string;
  year?: string;
  session?: string;
  variant?: string;
  chapter?: string;
  type: "Past Paper" | "Mark Scheme" | "Examiner Report" | "Flashcards" | "Quick Notes";
  difficulty: "Easy" | "Medium" | "Hard" | "Topper Grade";
  questionsCount?: number;
}

interface RevisionHubProps {
  onTriggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

export default function RevisionHub({
  onTriggerNotification,
  onAwardXp
}: RevisionHubProps) {
  const [curriculumFilter, setCurriculumFilter] = useState<"IGCSE" | "CBSE">("IGCSE");

  // IGCSE filter state
  const [igcseSubject, setIgcseSubject] = useState("Physics");
  const [igcseYear, setIgcseYear] = useState("2024");
  const [igcseSession, setIgcseSession] = useState("May/June");
  const [igcseVariant, setIgcseVariant] = useState("Variant 2");

  // CBSE filter state
  const [cbseChapter, setCbseChapter] = useState("Electricity");
  const [cbseCategory, setCbseCategory] = useState("PYQs");

  // Flashcards block state
  const [activeFlippedCard, setActiveFlippedCard] = useState<number | null>(null);
  const flashcards = [
    {
      q: "What is Snells Law equation representing refraction?",
      a: "n = sin(i) / sin(r), where n represents the refractive index, i is angle of incidence, r is angle of refraction.",
      subject: "Physics Optics"
    },
    {
      q: "State the catalyst and heat conditions required to hydrate Ethene into Ethanol.",
      a: "Solid Phosphoric Acid (H3PO4) catalyst, 300°C heat, and 60 atmospheric pressure (60 atm).",
      subject: "Chemistry Organic"
    },
    {
      q: "Explain the Sign conventions for linear magnification (m) of spherical mirrors.",
      a: "Magnification is negative for real, inverted images and positive for virtual, erect images.",
      subject: "Science Light"
    }
  ];

  // Document database
  const libraryDocs: ReferenceDoc[] = [
    {
      id: "doc-1",
      title: "0625 Physics Variant 2 Structured Theory Past Paper",
      curriculum: "IGCSE",
      subject: "Physics",
      year: "2024",
      session: "May/June",
      variant: "Variant 2",
      type: "Past Paper",
      difficulty: "Topper Grade",
      questionsCount: 12
    },
    {
      id: "doc-2",
      title: "Chemistry esterification functional crack Mark Scheme",
      curriculum: "IGCSE",
      subject: "Chemistry",
      year: "2024",
      session: "May/June",
      variant: "Variant 2",
      type: "Mark Scheme",
      difficulty: "Medium"
    },
    {
      id: "doc-3",
      title: "0625 Physics Variant 2 Examiner Performance Reports",
      curriculum: "IGCSE",
      subject: "Physics",
      year: "2024",
      session: "May/June",
      variant: "Variant 2",
      type: "Examiner Report",
      difficulty: "Hard"
    },
    {
      id: "doc-4",
      title: "Electricity Class 10 Important Competency PYQs",
      curriculum: "CBSE",
      subject: "Science",
      chapter: "Electricity",
      type: "Past Paper",
      difficulty: "Hard",
      questionsCount: 20
    },
    {
      id: "doc-5",
      title: "NCERT Exercises solved & formulas cheat sheet notes",
      curriculum: "CBSE",
      subject: "Science",
      chapter: "Electricity",
      type: "Quick Notes",
      difficulty: "Easy"
    },
    {
      id: "doc-6",
      title: "Magnetism active recall board flashcards collection",
      curriculum: "CBSE",
      subject: "Science",
      chapter: "Electricity",
      type: "Flashcards",
      difficulty: "Medium"
    }
  ];

  // Filter logic
  const filteredDocs = libraryDocs.filter(doc => {
    if (doc.curriculum !== curriculumFilter) return false;
    if (curriculumFilter === "IGCSE") {
      return (
        doc.subject.toLowerCase() === igcseSubject.toLowerCase() &&
        doc.year === igcseYear &&
        doc.session === igcseSession &&
        doc.variant === igcseVariant
      );
    } else {
      return (
        doc.chapter.toLowerCase() === cbseChapter.toLowerCase()
      );
    }
  });

  const triggerDownload = (docTitle: string) => {
    onAwardXp(15, "badge-quiz");
    onTriggerNotification(
      "📥 PDF Resource Synced",
      `Buffered '${docTitle}' successfully to local files. +15 XP awarded.`
    );
  };

  return (
    <div id="revision-hub-container" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
            BOARD BLUEPRINT RESOURCE VAULT
          </span>
          <h2 className="text-base font-black text-white tracking-snug mt-0.5">
            📚 Smart Revision Resource Hub
          </h2>
          <p className="text-xs text-slate-400">
            Instantly download recent past papers, examiner reports, NCERT tasks, and flip active-recall flashcard packages.
          </p>
        </div>

        {/* Curriculum Toggle */}
        <div className="flex gap-1.5 bg-slate-950 p-1 border border-slate-850 rounded-2xl self-start">
          {(["IGCSE", "CBSE"] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurriculumFilter(curr)}
              className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                curriculumFilter === curr
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {curr} System
            </button>
          ))}
        </div>
      </div>

      {/* Filters Box */}
      <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
        <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-amber-500" /> Filter Revision Directory
        </h3>

        {curriculumFilter === "IGCSE" ? (
          /* IGCSE Dropdowns */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Subject:</span>
              <select
                value={igcseSubject}
                onChange={(e) => setIgcseSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-200 p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Year:</span>
              <select
                value={igcseYear}
                onChange={(e) => setIgcseYear(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-200 p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer outline-none"
              >
                <option value="2024">2024 Series</option>
                <option value="2023">2023 Series</option>
                <option value="2022">2022 Series</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Session:</span>
              <select
                value={igcseSession}
                onChange={(e) => setIgcseSession(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-Zinc p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer outline-none"
              >
                <option value="May/June">May / June (Summer)</option>
                <option value="Oct/Nov">Oct / Nov (Winter)</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Variant:</span>
              <select
                value={igcseVariant}
                onChange={(e) => setIgcseVariant(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-200 p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer outline-none"
              >
                <option value="Variant 1">Variant 1</option>
                <option value="Variant 2">Variant 2 (GCC core)</option>
                <option value="Variant 3">Variant 3</option>
              </select>
            </div>
          </div>
        ) : (
          /* CBSE Dropdowns */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Chapter Topic:</span>
              <select
                value={cbseChapter}
                onChange={(e) => setCbseChapter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-200 p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer outline-none"
              >
                <option value="Electricity">Electricity & Resistors</option>
                <option value="Carbon">Carbon Compounds</option>
                <option value="Light">Light Sign Conventions</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">Revision format category:</span>
              <select
                value={cbseCategory}
                onChange={(e) => setCbseCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-zinc-200 p-2 rounded-xl focus:border-amber-500 font-bold cursor-pointer"
              >
                <option value="NCERT">NCERT NCERT Solutions</option>
                <option value="Competency">Competency-Based Questions</option>
                <option value="PYQs">Previous Year Board Past Papers</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid display of filtered files */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Results Files Lists - Col 8 */}
        <div className="lg:col-span-8 space-y-3">
          <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Available resource files ({filteredDocs.length})
          </h4>

          {filteredDocs.length > 0 ? (
            <div className="space-y-2.5">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-slate-950/85 border border-slate-855 hover:border-slate-800 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded ${
                        doc.type === "Past Paper" 
                          ? "bg-amber-500/10 text-amber-500" 
                          : doc.type === "Mark Scheme" 
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-emerald-500/10 text-emerald-450"
                      }`}>
                        {doc.type}
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 font-bold">
                        {doc.difficulty} Level
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-500 transition-colors truncate">
                      {doc.title}
                    </h5>
                    <p className="text-[9.5px] text-slate-500">
                      Syllabus Section Matched: {doc.curriculum} • {doc.questionsCount || 10} core exercises included
                    </p>
                  </div>

                  <button
                    onClick={() => triggerDownload(doc.title)}
                    className="p-3 bg-slate-900 hover:bg-amber-500 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-slate-95a rounded-2xl transition shadow-md shrink-0"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center border-2 border-dashed border-slate-850 rounded-2xl text-slate-550">
              <Layers className="w-8 h-8 mx-auto text-slate-650 opacity-52 mb-2 animate-pulse" />
              <p className="text-xs font-semibold">No GCC-specific files staged matching exact query</p>
              <p className="text-[10px] text-slate-600 mt-0.5">Please modify your subject variants parameters or year session.</p>
            </div>
          )}
        </div>

        {/* Interactive Active Recall Flashcard Deck - Col 4 */}
        <div className="lg:col-span-4 p-4 bg-slate-955/40 border border-slate-850 rounded-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" /> Active Recall Flashcards
            </h4>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Flipping cards reinforces concepts directly before exam days.
            </p>
          </div>

          {/* Flashcards block list */}
          <div className="space-y-2.5 my-4">
            {flashcards.map((f, idx) => {
              const isFlipped = activeFlippedCard === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveFlippedCard(isFlipped ? null : idx);
                    if (!isFlipped) onAwardXp(10);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-300 transform rounded-2xl text-center flex flex-col justify-center min-h-[96px] ${
                    isFlipped
                      ? "bg-indigo-950/80 border-indigo-500/40 text-indigo-350 font-bold rotate-y-180"
                      : "bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-300"
                  }`}
                >
                  {isFlipped ? (
                    <div className="space-y-1 text-left animate-fade-in text-[10.5px]">
                      <span className="text-[8px] bg-indigo-500/15 text-indigo-400 font-mono font-bold block mb-1">REASONING:</span>
                      <p className="leading-relaxed leading-snug">{f.a}</p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center animate-fade-in">
                      <span className="text-[8px] font-mono font-black text-slate-500 block uppercase">{f.subject} CHALLENGE</span>
                      <p className="text-xs font-extrabold leading-snug mt-1.5 text-white">{f.q}</p>
                      <span className="text-[7.5px] text-amber-500 block font-mono font-bold uppercase mt-1 leading-none tracking-widest">
                        ⭐ Tap to flip (+10 XP)
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-[9.2px] text-slate-505 font-medium leading-normal bg-slate-950 p-2.5 rounded-xl border border-slate-850">
            💡 <strong>Recall tip:</strong> 15 minutes of flashcards before sleep increases memory retention by 41%!
          </div>
        </div>
      </div>
    </div>
  );
}
