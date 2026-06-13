import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Award, 
  Eye, 
  Sparkles, 
  Filter, 
  CornerDownRight,
  Bookmark,
  Share2,
  Calendar
} from "lucide-react";
import { StudentProfile } from "../types";

interface LibraryProps {
  profile: StudentProfile;
  onAwardXp: (xp: number) => void;
  triggerNotification?: (title: string, desc: string) => void;
}

interface LibDoc {
  id: string;
  title: string;
  curriculum: "CBSE" | "IGCSE" | "General";
  subject: string;
  category: "Study Guides" | "Past Papers" | "Worksheets";
  size: string;
  pages: number;
  difficulty: "Foundation" | "Core" | "Extended" | "Boards Level" | "Advanced";
  syllabusCode?: string;
  downloads: number;
  keyPoints: string[];
  sampleQuestions: { q: string; a: string }[];
  examinerTip: string;
}

const LIBRARY_DOCUMENTS: LibDoc[] = [
  {
    id: "igcse-math-trig",
    title: "Cambridge IGCSE Extended Math: Trigonometry & Circle Theorems cheat-sheet",
    curriculum: "IGCSE",
    subject: "Mathematics",
    category: "Study Guides",
    size: "2.4 MB",
    pages: 8,
    difficulty: "Extended",
    syllabusCode: "CIE 0580 / Topic 4.5",
    downloads: 412,
    keyPoints: [
      "Sine rule formula: a / sin(A) = b / sin(B) = c / sin(C) for non-right angles.",
      "Cosine rule: a² = b² + c² - 2bc cos(A) - used when 2 sides and included angle are known.",
      "Angles in the same circle segment are equal (chord symmetry properties).",
      "The angle subtended by an arc at the center is twice that at the circumference."
    ],
    sampleQuestions: [
      {
        q: "In triangle ABC, AB = 7cm, BC = 9cm, and angle B = 64°. Find length AC.",
        a: "Use Cosine Rule: AC² = 7² + 9² - 2(7)(9)cos(64°) ≈ 49 + 81 - 126(0.438) = 74.8. Therefore, AC = √74.8 ≈ 8.65 cm."
      },
      {
        q: "Why is the angle in a semi-circle always 90°?",
        a: "By the center angle theorem, the diameter forms a straight line of 180° at the center. The circumference angle is half of 180°, which makes it exactly 90°."
      }
    ],
    examinerTip: "Cambridge examiners deduct marks if you do not write down the formula clearly before substituting numbers. Circle theorem proofs must specify the full theorem text as reasons."
  },
  {
    id: "igcse-chem-electrolysis",
    title: "IGCSE Chemistry Revision: Electrolysis Preferential Discharge Rules",
    curriculum: "IGCSE",
    subject: "Chemistry",
    category: "Study Guides",
    size: "1.8 MB",
    pages: 12,
    difficulty: "Extended",
    syllabusCode: "CIE 0620 / Topic 5.1",
    downloads: 389,
    keyPoints: [
      "In aqueous solutions, the less reactive cation is always discharged at the cathode (H+ vs metal).",
      "If concentrate halide is present, halogen gas is discharged at anode preferentially over OH-.",
      "In dilute solutions, OH- ions are discharged forming oxygen gas: 4OH- → 2H₂O + O₂ + 4e-.",
      "Inert electrodes (Platinum/Carbon) do NOT react; active copper electrodes dissolve to purify copper."
    ],
    sampleQuestions: [
      {
        q: "Identify the product formed at the anode during the electrolysis of concentrated aqueous NaCl.",
        a: "Chlorine gas (Cl₂) because concentrated chloride ions outcompete hydroxide ions for preferential discharge."
      },
      {
        q: "Write the ionic half-equation for the discharge of copper ions at the cathode.",
        a: "Cu²⁺ (aq) + 2e⁻ → Cu (s) [Reduction process]."
      }
    ],
    examinerTip: "Frequently tested comparison: Concentrated aqueous NaCl produces Chlorine at anode, whereas dilute aqueous NaCl produces Oxygen at anode. Memorize this specific contrast!"
  },
  {
    id: "cbse-math-calculus",
    title: "CBSE Grade 12 Math Heavyweight Calculus Core Formulas",
    curriculum: "CBSE",
    subject: "Mathematics",
    category: "Study Guides",
    size: "3.1 MB",
    pages: 15,
    difficulty: "Boards Level",
    syllabusCode: "CBSE G12 Chapter 7 & 8",
    downloads: 610,
    keyPoints: [
      "Integration by Parts ILATE rule order: Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential.",
      "Properties of Definite Integrals: ∫_{-a}^{a} f(x) dx = 2 ∫_{0}^{a} f(x) dx if f(x) is even, and 0 if odd.",
      "First Order Linear Differential Equation multiplier: IF = e^{∫ P dx}.",
      "Area Under Curve: Evaluated as A = ∫_{a}^{b} y dx between the intervals defined."
    ],
    sampleQuestions: [
      {
        q: "Evaluate the integral: ∫ ln(x) dx.",
        a: "Apply Integration by parts with u = ln(x), dv = dx. Then du = (1/x) dx, v = x. Formula: uv - ∫ v du = x ln(x) - ∫ x(1/x)dx = x ln(x) - x + C."
      }
    ],
    examinerTip: "CBSE Board answers require step-wise evaluation. Specifying the +C constant of integration is worth 1/2 point. Do not skip the general formula line representing the integral property."
  },
  {
    id: "cbse-sci-light",
    title: "CBSE G10 Physics: Mirror & Lens Sign Convention Ray diagrams",
    curriculum: "CBSE",
    subject: "Physics",
    category: "Worksheets",
    size: "1.9 MB",
    pages: 6,
    difficulty: "Boards Level",
    syllabusCode: "CBSE G10 Chapter 10",
    downloads: 504,
    keyPoints: [
      "Concave Mirror and Concave Lens focal length (f) is ALWAYS negative.",
      "Convex Mirror and Convex Lens focal length (f) is ALWAYS positive.",
      "Mirror formula: 1/v + 1/u = 1/f. Magnification m = -v/u.",
      "Lens formula: 1/v - 1/u = 1/f. Magnification m = +v/u."
    ],
    sampleQuestions: [
      {
        q: "An object is placed 15cm in front of a concave mirror of focal length 10cm. Find position v.",
        a: "u = -15 cm, f = -10 cm. Mirror formula: 1/v + 1/-15 = 1/-10 => 1/v = -1/10 + 1/15 = -1/30. Position v = -30 cm (Real, inverted image formed in front)."
      }
    ],
    examinerTip: "Draw lines with arrows representing light rays. Ray diagrams without travel arrows will forfeit 1 mark automatically in CBSE final answer evaluations."
  },
  {
    id: "igcse-math-2025",
    title: "Cambridge IGCSE Mathematics past paper 0580/42 (Fully Solved)",
    curriculum: "IGCSE",
    subject: "Mathematics",
    category: "Past Papers",
    size: "4.2 MB",
    pages: 20,
    difficulty: "Extended",
    syllabusCode: "CIE May/June 2025 Series",
    downloads: 720,
    keyPoints: [
      "Detailed step-wise answers of algebraic simultaneous equation models.",
      "Solved quadratic curvature graphs tracking exact coordinates & tangents.",
      "Statistical median, mean, and interquartile ranges with cumulative frequency graphs.",
      "Scale vector representations from real grid maps."
    ],
    sampleQuestions: [
      {
        q: "Calculate the upper boundary of mass 12.4 kg measured correct to 1 decimal place.",
        a: "The scale division is 0.1 kg. The half step is 0.05. Upper Bound = 12.4 + 0.05 = 12.45 kg."
      }
    ],
    examinerTip: "Keep rounding final values to three significant figures unless specified otherwise (angles must be to 1 decimal place)."
  },
  {
    id: "cbse-chem-boards",
    title: "CBSE G12 Organic Chemistry Conversions Roadmap",
    curriculum: "CBSE",
    subject: "Chemistry",
    category: "Worksheets",
    size: "2.7 MB",
    pages: 10,
    difficulty: "Boards Level",
    syllabusCode: "CBSE Class 12 Chapter 10-13",
    downloads: 480,
    keyPoints: [
      "Sandmeyer's preparation rules for chlorobenzene from aniline.",
      "Aldol condensation vs Cannizzaro chemical reaction pathways.",
      "Clemmensen reduction of aldehydes to hydrocarbons using Zn-Hg/HCl.",
      "Grignard reagent addition steps to synthesize primary, secondary, tertiary alcohols."
    ],
    sampleQuestions: [
      {
        q: "How will you convert Benzoic acid to Benzamide?",
        a: "Treat Benzoic acid with Ammonia (NH₃) and heat key solution intermediates to trigger dehydration forming Benzamide."
      }
    ],
    examinerTip: "Name reactions must be written with correct temperatures and catalysts. Highlighting sub-catalysts such as dry ether is vital for securing absolute marks."
  },
  {
    id: "igcse-phys-electrog",
    title: "CIE IGCSE Physics: Electromagnetic Induction & Lenz's Law",
    curriculum: "IGCSE",
    subject: "Physics",
    category: "Worksheets",
    size: "2.0 MB",
    pages: 8,
    difficulty: "Core",
    syllabusCode: "CIE 0625 / Section 4.5",
    downloads: 320,
    keyPoints: [
      "Electromagnetic Induction occurs when magnetic field lines are cut by a moving wire.",
      "Lenz's Law states direction of induced current opposes the change causing it.",
      "Faraday's Law states magnitude of induced EMF is proportional to rate of cutting lines.",
      "AC Generators use slip rings and carbon brushes to tap turning electrical pulses."
    ],
    sampleQuestions: [
      {
        q: "What happens to the induced current if a stronger magnet is plunged into a coil at double the speed?",
        a: "The current increases because both a stronger magnetic flux and higher velocity speed up the rate of magnetic flux cutting."
      }
    ],
    examinerTip: "Be sure to specify that it is the RATE of flux cutting, not just cutting the fields, that determines high potential difference."
  },
  {
    id: "cbse-bio-lifeproc",
    title: "CBSE G10 Science: Biology Key Life Processes NCERT Solutions",
    curriculum: "CBSE",
    subject: "Biology",
    category: "Past Papers",
    size: "3.5 MB",
    pages: 14,
    difficulty: "Boards Level",
    syllabusCode: "CBSE Class 10 Chapter 6",
    downloads: 512,
    keyPoints: [
      "Double circulation pathway of blood in human hearts with clean chambers.",
      "Nephron filtration, reabsorption, and urine collection tubes.",
      "Photosynthesis light dependent and dark carbon fixation stages.",
      "Aerobic vs Anaerobic respiration pathways in yeast & muscle cells."
    ],
    sampleQuestions: [
      {
        q: "Describe the function of bile juice during digestion.",
        a: "Bile juice emulsifies large fat globules into tiny droplets (increasing surface area) and creates an alkaline medium in the small intestine."
      }
    ],
    examinerTip: "Board evaluations rely heavily on diagram outlines. Neat pencil labeling of the heart chambers and nephron structures yields high scoring ratios."
  }
];

export default function Library({ profile, onAwardXp, triggerNotification }: LibraryProps) {
  // Navigation filters
  const [curriculumFilter, setCurriculumFilter] = useState<"ALL" | "CBSE" | "IGCSE">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "Study Guides" | "Past Papers" | "Worksheets">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive preview drawer state
  const [selectedDoc, setSelectedDoc] = useState<LibDoc | null>(null);
  
  // Download simulation state
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedDocIds, setDownloadedDocIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`plato_library_downloads_${profile.name}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleStartDownload = (doc: LibDoc) => {
    if (isDownloading) return;
    
    setIsDownloading(doc.id);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(null);
            
            // Log as downloaded
            const newlyDownloaded = [...downloadedDocIds];
            if (!newlyDownloaded.includes(doc.id)) {
              newlyDownloaded.push(doc.id);
              setDownloadedDocIds(newlyDownloaded);
              try {
                localStorage.setItem(
                  `plato_library_downloads_${profile.name}`, 
                  JSON.stringify(newlyDownloaded)
                );
              } catch (err) {
                console.error(err);
              }
              
              // Claim XP points
              onAwardXp(15);
              if (triggerNotification) {
                triggerNotification(
                  "📚 Study Resource Ready!", 
                  `Completed download of '${doc.title}'. Awarded +15 XP!`
                );
              }
            } else {
              if (triggerNotification) {
                triggerNotification(
                  "📥 Redownload Complete", 
                  `Downloaded '${doc.title}' successfully.`
                );
              }
            }
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  // Filtered list
  const filteredDocs = LIBRARY_DOCUMENTS.filter((doc) => {
    const matchesCurriculum = curriculumFilter === "ALL" || doc.curriculum === curriculumFilter;
    const matchesCategory = categoryFilter === "ALL" || doc.category === categoryFilter;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.syllabusCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyPoints.some(pt => pt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCurriculum && matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col p-4 space-y-4 text-left">
      {/* UAE Library Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/20 px-1.5 py-0.5 rounded font-extrabold uppercase font-mono tracking-widest">
            Dubai Syllabus Vault
          </span>
          <span className="text-[8px] bg-slate-950 text-slate-400 border border-slate-850 px-1.5 py-0.5 rounded font-mono">
            KHDA Compliant
          </span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-brand-yellow to-emerald-400 bg-clip-text text-transparent flex items-center gap-1.5 leading-none">
          <BookOpen className="w-5 h-5 text-brand-yellow" />
          <span>Plato Board Archive</span>
        </h2>
        <p className="text-[10px] text-slate-400">
          Instant offline access to structured NCERT exemplars, CIE past series papers, and student checklists.
        </p>
      </div>

      {/* Dynamic Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search equations, revision formulas, syllabus codes..."
          className="w-full bg-slate-950 border border-slate-850 focus:border-brand-yellow/60 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Options Hub */}
      <div className="space-y-2">
        {/* Curriculum tabs */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-slate-950 p-0.5 border border-slate-900 rounded-xl">
            {(["ALL", "CBSE", "IGCSE"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurriculumFilter(curr)}
                className={`px-3 py-1 text-[9.5px] font-black rounded-lg transition-all cursor-pointer ${
                  curriculumFilter === curr
                    ? "bg-brand-yellow text-slate-950 tracking-wide font-black"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {curr === "ALL" ? "All Boards" : curr}
              </button>
            ))}
          </div>

          <span className="text-[9px] text-slate-500 font-mono font-bold">
            {filteredDocs.length} items found
          </span>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {(["ALL", "Study Guides", "Past Papers", "Worksheets"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-slate-900 border-teal-500/40 text-teal-300"
                  : "bg-slate-950/60 border-slate-900 text-slate-450 hover:text-slate-350 hover:border-slate-800"
              }`}
            >
              {cat === "ALL" ? "🗂️ All Formats" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid List */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => {
            const isCompleted = downloadedDocIds.includes(doc.id);
            const activeDownloading = isDownloading === doc.id;
            
            return (
              <div
                key={doc.id}
                id={`lib-doc-${doc.id}`}
                className="bg-slate-950 hover:bg-slate-900/60 border border-slate-850 p-3 rounded-2xl flex flex-col justify-between gap-3 transition-colors text-left"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold tracking-wider ${
                        doc.curriculum === "CBSE" 
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                          : "bg-cyan-950 text-cyan-400 border border-cyan-900"
                      }`}>
                        {doc.curriculum}
                      </span>
                      <span className="text-[8px] bg-slate-900 text-slate-400 border border-slate-800 px-1 py-0.5 rounded uppercase font-mono">
                        {doc.category}
                      </span>
                    </div>

                    <span className="text-[9px] text-slate-500 font-mono font-bold">
                      {doc.size} • {doc.pages} Pages
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 leading-snug">
                    {doc.title}
                  </h3>

                  {doc.syllabusCode && (
                    <p className="text-[9px] text-slate-450 font-mono flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-md inline-block w-fit">
                      <CornerDownRight className="w-2.5 h-2.5 text-brand-yellow" />
                      <span>Syllabus: <strong>{doc.syllabusCode}</strong> • {doc.difficulty} level</span>
                    </p>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center gap-2 pt-1">
                  {/* View Preview Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="flex-1 py-1 px-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-[9.5px] font-extrabold text-slate-300 hover:text-slate-100 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3 h-3 text-brand-yellow" />
                    <span>Quick Study</span>
                  </button>

                  {/* Download Action with Progress integration */}
                  <button
                    type="button"
                    disabled={activeDownloading}
                    onClick={() => handleStartDownload(doc)}
                    className={`flex-1 py-1 px-2 text-[9.5px] font-black rounded-lg flex items-center justify-center gap-1 cursor-pointer overflow-hidden relative transition-all ${
                      isCompleted
                        ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400"
                        : "bg-brand-yellow hover:bg-brand-gold text-slate-950"
                    }`}
                  >
                    {activeDownloading ? (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                        <div 
                          className="absolute left-0 bottom-0 top-0 bg-brand-yellow/35 transition-all duration-150" 
                          style={{ width: `${downloadProgress}%` }}
                        />
                        <span className="text-[8px] font-mono text-slate-200 z-10 font-black animate-pulse">
                          Syncing {downloadProgress}%
                        </span>
                      </div>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle className="w-3" />
                        <span>Ready Offline</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3" />
                        <span>Download (+15 XP)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 space-y-2 border border-dashed border-slate-800/80 rounded-2xl bg-slate-950/20">
            <span className="text-xl block">📂</span>
            <p className="text-xs text-slate-550 font-bold">No Syllabus Items Match Your Filters</p>
            <p className="text-[10px] text-slate-600">Try cleaning your search string or toggling different boards!</p>
          </div>
        )}
      </div>

      {/* Daily Challenge Promo Checkpoint */}
      <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl flex items-center justify-between gap-3 text-left">
        <div className="space-y-0.5">
          <h4 className="text-[11px] font-black text-slate-200 flex items-center gap-1 leading-none">
            <Sparkles className="w-3 h-3 text-brand-yellow animate-bounce" />
            <span>KHDA Exam Prep Target</span>
          </h4>
          <p className="text-[9px] text-slate-400">
            Completed revision guides sync with Mindy AI to automatically unlock localized mock boards.
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-[9px] bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/20 px-1.5 py-0.5 rounded font-black font-mono">
            ✨ PREP BONUS
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* REAL-TIME INTERACTIVE SYLLABUS DOC PREVIEW MODAL      */}
      {/* ======================================================= */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative overflow-hidden text-left max-h-[85vh] overflow-y-auto">
            <div className="absolute -right-16 -top-16 w-36 h-36 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header info */}
            <div className="space-y-1 border-b border-slate-850 pb-3">
              <div className="flex items-center gap-1.5">
                <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded uppercase ${
                  selectedDoc.curriculum === "CBSE" ? "bg-emerald-950 text-emerald-400" : "bg-cyan-950 text-cyan-400"
                }`}>
                  {selectedDoc.curriculum}
                </span>
                <span className="text-[8px] bg-slate-950 text-slate-450 border border-slate-850 px-1.5 py-0.5 rounded font-mono uppercase">
                  {selectedDoc.category}
                </span>
              </div>
              
              <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5 mt-1 leading-tight">
                <FileText className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span>{selectedDoc.title}</span>
              </h3>
              
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono font-bold pt-1">
                <span>Code: {selectedDoc.syllabusCode || "N/A"}</span>
                <span>Type: {selectedDoc.difficulty}</span>
              </div>
            </div>

            {/* Comprehensive Syllabus Guidelines section */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-brand-yellow uppercase tracking-wider block font-mono">
                📝 Syllabus Master Summary:
              </span>
              <ul className="space-y-1.5 text-[10px] text-slate-300 leading-relaxed pl-1">
                {selectedDoc.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-400 flex-shrink-0 mt-0.5">✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simulated Live Question Section */}
            {selectedDoc.sampleQuestions && selectedDoc.sampleQuestions.length > 0 && (
              <div className="space-y-2 bg-slate-955 p-3 rounded-2xl border border-slate-850/60">
                <span className="text-[9px] font-bold text-teal-400 uppercase tracking-wider block font-mono">
                  ✏️ High-Yield Examiner Practice:
                </span>
                {selectedDoc.sampleQuestions.map((sq, i) => (
                  <div key={i} className="space-y-1 font-sans">
                    <p className="text-[9.5px] font-extrabold text-slate-200">
                      Q: {sq.q}
                    </p>
                    <p className="text-[9.5px] text-slate-400 leading-normal border-l border-teal-500/30 pl-2 italic">
                      A: {sq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Examiner warnings segment */}
            <div className="space-y-1.5 bg-brand-red/5 p-3 rounded-2xl border border-brand-red/25">
              <span className="text-[9px] font-black text-brand-red uppercase tracking-wide block font-mono flex items-center gap-1">
                ⚠️ Common Examiner Trap Tip:
              </span>
              <p className="text-[9.5px] text-slate-350 leading-normal italic font-sans pl-1">
                "{selectedDoc.examinerTip}"
              </p>
            </div>

            {/* Footer buttons row */}
            <div className="flex gap-2 pt-1 border-t border-slate-850 pt-3">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="flex-1 py-2 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-slate-100 text-[10px] font-bold uppercase rounded-xl transition-all cursor-pointer text-center"
              >
                Close Preview
              </button>
              
              <button
                type="button"
                onClick={() => {
                  const doc = selectedDoc;
                  setSelectedDoc(null);
                  handleStartDownload(doc);
                }}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer text-center shadow-md active:scale-95 ${
                  downloadedDocIds.includes(selectedDoc.id)
                    ? "bg-slate-900 border border-slate-800 text-slate-400"
                    : "bg-teal-500 hover:bg-teal-400 text-slate-950"
                }`}
              >
                {downloadedDocIds.includes(selectedDoc.id) ? "Downloaded & Ready" : "Sync Offline (+15 XP)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
