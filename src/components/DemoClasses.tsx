import React, { useState } from "react";
import { 
  BookOpen, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  User, 
  CheckCircle, 
  RotateCcw, 
  Award, 
  BookMarked,
  Zap,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
  HelpCircle
} from "lucide-react";
import { Course } from "../types";

interface DemoClassesProps {
  onAwardXp: (amount: number, badgeId?: string) => void;
  onBookSelectedCourse: (course: Course) => void;
}

interface DemoLesson {
  id: string;
  title: string;
  subject: string;
  curriculum: "CBSE" | "IGCSE";
  grade: "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12";
  instructor: string;
  duration: string;
  xpReward: number;
  badgeId?: string;
  brief: string;
  avatar: string;
}

const DEMO_LESSONS: DemoLesson[] = [
  {
    id: "demo-cbse-10-math",
    title: "Quadratic Equation Roots & Projectile Paths",
    subject: "Mathematics",
    curriculum: "CBSE",
    grade: "Grade 10",
    instructor: "Dr. Satish Kumar (PhD, IIT Alumni)",
    duration: "10 mins interactive",
    xpReward: 60,
    badgeId: "badge-quiz",
    brief: "Master discriminant equations (D = b² - 4ac) and check the flight pathways of projectiles mathematically.",
    avatar: "👨‍🏫"
  },
  {
    id: "demo-igcse-11-phys",
    title: "Electromagnetic Induction & Lenz's Law",
    subject: "Physics",
    curriculum: "IGCSE",
    grade: "Grade 11",
    instructor: "Prof. Alistair Vance (Cambridge certified)",
    duration: "12 mins interactive",
    xpReward: 70,
    badgeId: "badge-quiz",
    brief: "Observe Lenz's law and Fleming's Dynamo rule through a live interactive copper-wire electromagnetic solenoid simulator.",
    avatar: "🧑‍🔬"
  },
  {
    id: "demo-cbse-12-calc",
    title: "Calculus Partitioning (Riemann Sums Integration)",
    subject: "Mathematics",
    curriculum: "CBSE",
    grade: "Grade 12",
    instructor: "Mrs. Meenu Raj (M.Sc. Head of Maths)",
    duration: "15 mins interactive",
    xpReward: 80,
    badgeId: "badge-quiz",
    brief: "Understand definite limits and watch how partition strips approximate area under curves to model aerospace physics.",
    avatar: "👩‍🏫"
  },
  {
    id: "demo-igcse-10-chem",
    title: "Stoichiometry & Mole-Gas Calculations",
    subject: "Chemistry",
    curriculum: "IGCSE",
    grade: "Grade 10",
    instructor: "Dr. Farah Jamil (Senior Chemistry Lead)",
    duration: "8 mins interactive",
    xpReward: 50,
    badgeId: "badge-quiz",
    brief: "Calculate gas volumes at room temperature/pressure and convert complex masses to moles dynamically.",
    avatar: "👩‍🔬"
  }
];

export default function DemoClasses({ onAwardXp, onBookSelectedCourse }: DemoClassesProps) {
  const [selectedCurriculum, setSelectedCurriculum] = useState<"ALL" | "CBSE" | "IGCSE">("ALL");
  const [selectedGrade, setSelectedGrade] = useState<string>("ALL");
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Simulation player states
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Concept, 1: Live Simulator, 2: Challenge Quiz, 3: Completed
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // 1. Quadratic Equation Simulator States
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-4);
  const [coeffC, setCoeffC] = useState<number>(4);

  // 2. Solenoid Physics Simulator States
  const [magnetDistance, setMagnetDistance] = useState<number>(100); // 0 (inside) to 200 (far)
  const [magnetDraggable, setMagnetDraggable] = useState<number>(170);
  const [galvanometerRead, setGalvanometerRead] = useState<number>(0);
  const [coilTurns, setCoilTurns] = useState<number>(5);

  // 3. Riemann Definite Integrals States
  const [intervals, setIntervals] = useState<number>(5); // 2 to 40 strips

  // 4. Stoichiometry Chem States
  const [chemicalCompound, setChemicalCompound] = useState<string>("CO2");
  const [gramsValue, setGramsValue] = useState<string>("44");
  
  // Custom interactive quiz replies
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Filtered lists
  const filteredLessons = DEMO_LESSONS.filter(l => {
    const curMatch = selectedCurriculum === "ALL" || l.curriculum === selectedCurriculum;
    const gradeMatch = selectedGrade === "ALL" || l.grade === selectedGrade;
    return curMatch && gradeMatch;
  });

  const activeLesson = DEMO_LESSONS.find(l => l.id === activeLessonId);

  // Handle slide/step navigate
  const handleNextStep = () => {
    if (currentStep === 2) {
      // Complete lesson!
      if (activeLessonId) {
        if (!completedLessons.includes(activeLessonId)) {
          setCompletedLessons(prev => [...prev, activeLessonId]);
          onAwardXp(activeLesson?.xpReward || 50);
        }
      }
      setCurrentStep(3);
    } else {
      setCurrentStep(prev => prev + 1);
    }
    // reset question stuff
    if (currentStep === 1) {
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const handleResetLesson = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  // Solenoid magnetic drag simulator behavior
  const triggerMagnetPush = (direction: "push" | "pull") => {
    let reading = 0;
    if (direction === "push") {
      setMagnetDraggable(50);
      reading = coilTurns * 4.8; // Induced direct EMF positive push
    } else {
      setMagnetDraggable(180);
      reading = -coilTurns * 4.8; // Induced opposite current
    }
    setGalvanometerRead(reading);
    setTimeout(() => {
      setGalvanometerRead(0);
    }, 900);
  };

  // Convert Chemical moles multiplier
  const getMolecularWeight = (compound: string) => {
    if (compound === "CO2") return 44; // C=12, O=16*2
    if (compound === "H2O") return 18; // H=1*2, O=16
    if (compound === "NaCl") return 58.5; // Na=23, Cl=35.5
    if (compound === "CH4") return 16; // C=12, H=4
    return 1;
  };

  const calculateMoles = () => {
    const wt = getMolecularWeight(chemicalCompound);
    const grams = parseFloat(gramsValue) || 0;
    return (grams / wt).toFixed(3);
  };

  // Compute Quadratic Info
  const discVal = (coeffB * coeffB) - (4 * coeffA * coeffC);
  const getNatureOfRoots = () => {
    if (discVal > 0) return { label: "Real & Distinct Roots", desc: "Symmetrical projectile intersects ground x-axis twice", color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20" };
    if (discVal === 0) return { label: "Real & Equal Roots", desc: "Apex or launch pad perfectly tangents line", color: "text-brand-yellow border-brand-yellow/20 bg-brand-yellow/10" };
    return { label: "Imaginary Roots (D < 0)", desc: "The projectile does not touch ground or represents unreached altitude", color: "text-brand-red border-brand-red/20 bg-brand-red/10" };
  };

  // Simulated Quiz details per lesson
  const getQuizData = (lessonId: string) => {
    switch (lessonId) {
      case "demo-cbse-10-math":
        return {
          question: "For a projectile path height equation -3x² + 6x + c = 0, what value of 'c' gives real-and-equal solutions?",
          options: [
            "c = -3 (Discriminant formula check)",
            "c = 6",
            "c = -1",
            "c = 3 (Makes D = 0)"
          ],
          correctIdx: 0,
          explanation: "Discriminant D = b² - 4ac. Here b=6, a=-3. So 36 - 4(-3)c = 0 => 36 + 12c = 0 => c = -3. Fully compliant with Board grading!"
        };
      case "demo-igcse-11-phys":
        return {
          question: "What happens to the magnitude of induced current if the speed of magnet entering the coil of wire is doubled?",
          options: [
            "It drops to zero because of Lenz polarity block",
            "It also exactly doubles because rate of flux cutting doubles",
            "It remains exactly constant as electromagnetic lines do not alter",
            "It reduces by half"
          ],
          correctIdx: 1,
          explanation: "According to Faraday's Law, the induced e.m.f is directly proportional to the rate of change of magnetic flux cutting. Double the speed = double the induced voltage!"
        };
      case "demo-cbse-12-calc":
        return {
          question: "As the number of analytical strips 'n' (intervals) under a trajectory curves approaches infinity (∞):",
          options: [
            "Riemann summation converges precisely to the Definite Integral",
            "The calculation crashes due to mathematical divergence",
            "The value of absolute area becomes zero",
            "It forms a discrete geometric line"
          ],
          correctIdx: 0,
          explanation: "In mathematics, taking the limit as n -> ∞ of Riemann Sums provides the exact area, defined precisely as the definite integration under curve boundary points."
        };
      case "demo-igcse-10-chem":
        default:
        return {
          question: "Under standard Room Temperature & Pressure (r.t.p.), what volume does 2.0 moles of CO₂ gas occupy?",
          options: [
            "22.4 dm³ (Only valid at s.t.p)",
            "48.0 dm³ (Dynamic calculation: 2 moles × 24 dm³)",
            "24.0 dm³",
            "12.0 dm³"
          ],
          correctIdx: 1,
          explanation: "1 mole of any gas occupies exactly 24 dm³ at room temperature and pressure. Therefore, 2.0 moles occupies 48.0 dm³."
        };
    }
  };

  const handleLaunchLesson = (id: string) => {
    setActiveLessonId(id);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const convertLevelToClass = (lesson: DemoLesson) => {
    const mappedCourse: Course = {
      id: lesson.id,
      title: `${lesson.curriculum} ${lesson.grade} - ${lesson.title}`,
      curriculum: lesson.curriculum === "CBSE" ? "CBSE" : "British",
      gradeLevel: `${lesson.grade} Student`,
      description: `Book high-intensity trial classes with trainer ${lesson.instructor}.`,
      highlights: ["Personalized syllabus matching school guidelines", "Instant mock testing sheets", "Weekly diagnostic board assessments"],
      feeRange: "AED 350 - 550 per month",
      schedule: "Contact Hub coordinates for optimized custom timings",
      duration: "Full Year Academics",
      rating: 4.9
    };
    return mappedCourse;
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Dynamic Header Block */}
      {!activeLessonId ? (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] bg-brand-red text-white font-black px-2 py-0.5 rounded-sm tracking-widest uppercase">
                9-12 HUB
              </span>
              <span className="text-[10px] bg-brand-blue border border-brand-yellow/30 text-brand-yellow font-bold px-1.5 py-0.2 rounded-sm rounded-tr-lg">
                LIVE SIMULATOR
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-yellow via-indigo-200 to-brand-red bg-clip-text text-transparent">
              Board & Year Grade 9-12 Demo Lab
            </h2>
            <p className="text-xs text-slate-400">
              Interactive high-fidelity digital mock lessons representing Dubai's best study classes. Learn dynamically, solve challenges, and win XP points instantly!
            </p>
          </div>

          {/* Curriculum Controls Selector */}
          <div className="flex flex-col gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Filter Syllabus Stream</span>
              <span>Select Study Level</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(["ALL", "CBSE", "IGCSE"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurriculum(curr)}
                  className={`py-1.5 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                    selectedCurriculum === curr
                      ? "bg-brand-blue-dark border-brand-yellow text-brand-yellow py-2 shadow-sm"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {curr === "ALL" ? "All Systems" : curr === "CBSE" ? "CBSE India" : "British IGCSE"}
                </button>
              ))}
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 mt-1 scrollbar-thin">
              {["ALL", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((gr) => (
                <button
                  key={gr}
                  onClick={() => setSelectedGrade(gr)}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-full border whitespace-nowrap cursor-pointer transition-colors ${
                    selectedGrade === gr
                      ? "bg-brand-red/90 border-brand-red text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {gr === "ALL" ? "All Grades (9-12)" : gr}
                </button>
              ))}
            </div>
          </div>

          {/* Sourced mock list */}
          <div className="space-y-3">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);
                return (
                  <div 
                    key={lesson.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3 hover:border-brand-blue/40 transition-all duration-300 relative group overflow-hidden"
                  >
                    {isCompleted && (
                      <div className="absolute top-0 right-0 bg-brand-yellow/20 border-l border-b border-brand-yellow px-2 py-0.5 rounded-bl-lg text-[9px] font-black text-brand-yellow flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-brand-yellow" />
                        COMPLETED
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                        {lesson.avatar}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-mono font-extrabold tracking-wider text-brand-yellow bg-brand-yellow/10 px-1.5 py-0.2 rounded">
                            {lesson.curriculum} {lesson.grade}
                          </span>
                          <span className="text-[9px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-slate-500" />
                            {lesson.duration}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-100 group-hover:text-brand-yellow transition-colors leading-snug">
                          {lesson.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-light leading-normal line-clamp-2">
                          {lesson.brief}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px]">
                      <div className="text-slate-500 font-light">
                        Led by: <span className="text-slate-350 font-medium">{lesson.instructor}</span>
                      </div>
                      <button
                        onClick={() => handleLaunchLesson(lesson.id)}
                        className="px-3 py-1.5 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-slate-950 font-black rounded-lg transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-md shadow-brand-yellow/5"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Launch Demo</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 bg-slate-900/30 border border-dashed border-slate-800 rounded-xl text-center text-slate-500">
                <BookMarked className="w-8 h-8 text-slate-650 mx-auto mb-2 animate-pulse" />
                <p className="text-xs">No active demo classes found for the filters selected.</p>
                <button 
                  onClick={() => { setSelectedCurriculum("ALL"); setSelectedGrade("ALL"); }}
                  className="mt-2 text-[10px] text-brand-yellow font-extrabold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          <div className="bg-brand-blue-dark/25 border border-brand-blue/30 rounded-xl p-3.5 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0 animate-pulse" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-200">How Plato's Dubai Demos work:</span>
              <p className="text-[10px] text-slate-400 leading-normal">
                These dynamic simulator worksheets allow students to preview the curriculum boards they study at school. Unlocking all mini-demos earns you special credentials and automatic trial slots in Dubai.
              </p>
            </div>
          </div>
        </>
      ) : (
        /* High fidelity simulated interactive video lesson environment */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 relative overflow-hidden">
          {/* Subtle glowing halo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />

          {/* Lesson Header Navigation */}
          <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
            <button 
              onClick={() => setActiveLessonId(null)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer font-bold transition-all hover:-translate-x-0.5"
            >
              ← Back to Lab
            </button>
            <div className="text-[9px] bg-brand-yellow/10 text-brand-yellow font-black px-2 py-0.5 rounded border border-brand-yellow/20 font-mono flex items-center gap-1 animate-pulse">
              <Zap className="w-2.5 h-2.5 text-brand-yellow fill-current" />
              <span>+{activeLesson?.xpReward} XP TARGETED</span>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block font-mono">
              {activeLesson?.curriculum} | {activeLesson?.grade} LESSON SIMULATOR
            </span>
            <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5 leading-snug">
              <span>{activeLesson?.title}</span>
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>Teacher: <strong className="text-slate-300 font-medium">{activeLesson?.instructor}</strong></span>
            </div>
          </div>

          {/* Horizontal Step Indicator (Piles) */}
          <div className="grid grid-cols-4 gap-1.5 py-1">
            {["1. Concept Sheet", "2. Lab Sim", "3. Checkpoint", "4. Mastery"].map((stLabel, idx) => {
              const bgClass = currentStep >= idx 
                ? idx === 3 ? "bg-brand-red" : "bg-brand-yellow" 
                : "bg-slate-800";
              const opacityClass = currentStep === idx ? "opacity-100 font-bold text-slate-200" : "opacity-35 text-slate-450";
              return (
                <div key={stLabel} className="space-y-1">
                  <div className={`h-1.5 rounded-full ${bgClass} transition-all duration-300`} />
                  <span className={`text-[8px] sm:text-[9px] block text-center truncate ${opacityClass}`}>
                    {stLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Step Panel Render */}
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl min-h-[290px] flex flex-col justify-between space-y-3">
            
            {/* STEP 0: CONCEPT DEFINITIONS */}
            {currentStep === 0 && (
              <div className="space-y-3 flex-1">
                <div className="text-[10px] bg-brand-blue-dark/50 border border-brand-blue/30 p-2.5 rounded-lg text-slate-300 space-y-1 leading-relaxed">
                  <span className="text-[9px] text-brand-yellow font-black uppercase tracking-wider block font-mono">
                    Core Syllabus Fundamentals
                  </span>
                  {activeLessonId === "demo-cbse-10-math" && (
                    <div className="space-y-1 text-xs">
                      <p>The standard quadratic equation is <strong className="text-brand-yellow font-mono">ax² + bx + c = 0</strong>.</p>
                      <p>The **Discriminant (D)** determines roots' nature:</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                        <li><strong className="text-slate-300 font-mono">D &gt; 0</strong>: Two Real & Distinct Roots.</li>
                        <li><strong className="text-slate-300 font-mono">D = 0</strong>: Two Real & Equal Roots (Perfect tangent path).</li>
                        <li><strong className="text-slate-300 font-mono">D &lt; 0</strong>: Imaginary Roots (Path does not reach ground).</li>
                      </ul>
                    </div>
                  )}
                  {activeLessonId === "demo-igcse-11-phys" && (
                    <div className="space-y-1 text-xs">
                      <p>When a conductor cuts magnetic field lines, an **electromotive force (e.m.f)** is induced, driving current.</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                        <li><strong>Faraday's Law</strong>: Induced current value is proportional to the speed of flux cutting.</li>
                        <li><strong>Lenz's Law</strong>: The directed current always opposes the active change that caused it.</li>
                      </ul>
                    </div>
                  )}
                  {activeLessonId === "demo-cbse-12-calc" && (
                    <div className="space-y-1 text-xs">
                      <p>Integrating represents computing the exact area under curves between intervals [<strong className="text-brand-yellow">a, b</strong>].</p>
                      <p>We divide the area into <strong>n partitions</strong>. Summing up finite rectangle areas yields approximate metrics. Perfect limit-sum definition mimics aerospace curves.</p>
                    </div>
                  )}
                  {activeLessonId === "demo-igcse-10-chem" && (
                    <div className="space-y-1 text-xs">
                      <p>The chemical **Mole** links microscopic atoms with physical laboratory masses.</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                        <li><strong>Mass to Moles</strong>: moles = grams / Molecular Weight (Ar/Mr).</li>
                        <li><strong>Standard r.t.p. Gas Law</strong>: 1.0 mole of any gas occupies exactly <strong className="text-brand-yellow font-mono">24.0 dm³</strong>.</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-2 border border-slate-850 rounded-lg text-[10px] text-slate-400 italic">
                  📝 {activeLessonId === "demo-cbse-10-math" ? "Did you know? Projectile parabolas like rockets or football arcs solve as standard negative quadratic parabolas with Board precision!" :
                     activeLessonId === "demo-igcse-11-phys" ? "Real world use: Electrical power plants globally generate electricity solely relying on electromagnetic induction coils!" :
                     activeLessonId === "demo-cbse-12-calc" ? "Riemann integrals allow calculations of changing shapes, vital inside Dubai architectural structures like the Museum of the Future!" :
                     "This calculation forms the basis of critical industrial pharmaceutical formulations!"}
                </div>
              </div>
            )}

            {/* STEP 1: INTERACTIVE LAB SIMULATORS */}
            {currentStep === 1 && (
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                
                {/* Visual Math Quadratic project graph */}
                {activeLessonId === "demo-cbse-10-math" && (
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-black tracking-widest text-[#FFF] uppercase block text-center">
                      Interactive Projectile & Discriminant Explorer
                    </span>
                    <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-[8px] text-slate-500 block">Coeff a (Shape)</span>
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => setCoeffA(v => Math.max(-2, v - 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">-</button>
                          <span className="text-xs font-bold text-slate-300 px-1 font-mono">{coeffA}</span>
                          <button onClick={() => setCoeffA(v => Math.min(2, v + 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">+</button>
                        </div>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 block">Coeff b (Slope)</span>
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => setCoeffB(v => Math.max(-8, v - 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">-</button>
                          <span className="text-xs font-bold text-slate-300 px-1 font-mono">{coeffB}</span>
                          <button onClick={() => setCoeffB(v => Math.min(8, v + 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">+</button>
                        </div>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 block">Coeff c (Height)</span>
                        <div className="flex gap-1 mt-1">
                          <button onClick={() => setCoeffC(v => Math.max(-8, v - 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">-</button>
                          <span className="text-xs font-bold text-slate-300 px-1 font-mono">{coeffC}</span>
                          <button onClick={() => setCoeffC(v => Math.min(10, v + 1))} className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] px-1 rounded-sm cursor-pointer">+</button>
                        </div>
                      </div>
                    </div>

                    {/* Quadratic Graph Board */}
                    <div className="h-20 bg-slate-900 border border-slate-850 rounded-lg relative overflow-hidden flex flex-col justify-between p-2">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                        <span>Equation: {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}` : `${coeffB}`}x {coeffC >= 0 ? `+ ${coeffC}` : `${coeffC}`} = 0</span>
                        <span>D = <strong className={discVal >= 0 ? "text-emerald-400" : "text-brand-red"}>{discVal}</strong></span>
                      </div>
                      
                      {/* Interactive Parabola Representation using SVG */}
                      <div className="w-full flex-1 relative flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 40">
                          {/* x-axis */}
                          <line x1="0" y1="20" x2="200" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="2" />
                          
                          {/* Quadratic Curve based on inputs */}
                          <path 
                            d={`M 10,${20 - (coeffA * 0.5 * -9 * -9 + coeffB * 0.5 * -9 + coeffC * 1.5)} 
                                Q 100,${20 + (coeffC * 1.5) - (coeffB * 1.5)} 
                                190,${20 - (coeffA * 0.5 * 9 * 9 + coeffB * 0.5 * 9 + coeffC * 1.5)}`} 
                            fill="none" 
                            stroke={discVal > 0 ? "#10b981" : discVal === 0 ? "#eab308" : "#f43f5e"} 
                            strokeWidth="2.5" 
                            className="transition-all duration-300" 
                          />
                        </svg>
                      </div>

                      <div className={`text-[9px] p-1 border rounded font-mono text-center leading-none mt-1 ${getNatureOfRoots().color}`}>
                        {getNatureOfRoots().label}: {getNatureOfRoots().desc}
                      </div>
                    </div>
                  </div>
                )}

                {/* Faraday Coil Physics Simulator */}
                {activeLessonId === "demo-igcse-11-phys" && (
                  <div className="space-y-3">
                    <span className="text-[9px] font-black tracking-widest text-[#FFF] uppercase block text-center">
                      Live Faraday Solenoid Electromagnetic Core
                    </span>
                    
                    <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex flex-col items-center justify-start relative h-36">
                      
                      {/* Galvanometer Screen Meter */}
                      <div className="w-full bg-slate-950 p-1.5 rounded border border-slate-800 flex justify-between items-center text-[8px] font-mono mb-1">
                        <span className="text-slate-500">Galvanometer Reading:</span>
                        <span className={`font-bold ${galvanometerRead > 0 ? "text-emerald-400" : galvanometerRead < 0 ? "text-brand-red animate-pulse" : "text-yellow-500"}`}>
                          {galvanometerRead > 0 ? `+${galvanometerRead.toFixed(1)} mV (Right)` : 
                           galvanometerRead < 0 ? `${galvanometerRead.toFixed(1)} mV (Left)` : "0.0 mV (Idle)"}
                        </span>
                      </div>

                      {/* Moving elements representing loops & solenoid */}
                      <div className="w-full flex-1 flex items-center justify-between px-3 relative mt-1">
                        
                        {/* Magnet Element */}
                        <div 
                          className="bg-gradient-to-r from-red-600 to-blue-600 text-[10px] text-white font-black px-2 py-1 rounded shadow-md border border-slate-800 transition-all duration-300 flex select-none"
                          style={{ transform: `translateX(${magnetDraggable - 120}px)` }}
                        >
                          <span className="text-[8px] text-white/80 pr-1 border-r border-white/20">N</span>
                          <span className="text-[8px] text-white/80 pl-1">S</span>
                        </div>

                        {/* Coils solenoids */}
                        <div className="relative flex items-center gap-1.5 h-12 py-1 select-none border-l-2 border-r-2 border-dashed border-sky-400/30 px-3">
                          <span className="text-[8px] absolute -top-1 opacity-70 text-slate-500 font-mono left-1">COIL WIRE loops</span>
                          
                          {/* Solenoid Rings */}
                          {Array.from({ length: coilTurns }).map((_, i) => (
                            <div key={i} className="w-2.5 h-10 border-2 border-brand-yellow/60 rounded-full animate-pulse flex-shrink-0" />
                          ))}
                        </div>

                      </div>

                      {/* Custom controls */}
                      <div className="w-full flex justify-between items-center bg-slate-950/80 p-2 rounded border border-slate-850 mt-1">
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                          <span>Set Loops:</span>
                          <button onClick={() => setCoilTurns(v => Math.max(3, v - 1))} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] cursor-pointer font-bold">-</button>
                          <span className="text-white font-mono font-bold font-mono">{coilTurns}</span>
                          <button onClick={() => setCoilTurns(v => Math.min(8, v + 1))} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] cursor-pointer font-bold">+</button>
                        </div>
                        
                        <div className="flex gap-1">
                          <button
                            onClick={() => triggerMagnetPush("push")}
                            className="px-2 py-1 text-[9px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded cursor-pointer"
                          >
                            Push Magnet In
                          </button>
                          <button
                            onClick={() => triggerMagnetPush("pull")}
                            className="px-2 py-1 text-[9px] bg-red-500 hover:bg-red-400 text-white font-black rounded cursor-pointer"
                          >
                            Pull Magnet Out
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Calculus Riemann Integrations Slider */}
                {activeLessonId === "demo-cbse-12-calc" && (
                  <div className="space-y-3">
                    <span className="text-[9px] font-black tracking-widest text-[#FFF] uppercase block text-center">
                      Riemann Sum Partitions Explorer (Area Approximation)
                    </span>

                    <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex flex-col justify-between h-36">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>Number of subintervals (n): <strong className="text-brand-yellow font-mono">{intervals}</strong></span>
                        <span>Estimated Area: <strong className="text-brand-yellow font-mono">{(3.333 * (1 + (1/intervals) * 0.15)).toFixed(4)} u²</strong></span>
                      </div>

                      {/* Mathematical Area Grid Simulation */}
                      <div className="w-full flex-1 border-b border-l border-slate-700 relative overflow-hidden flex items-end">
                        
                        {/* Function Curve: f(x) = x² under [0,2] using absolute SVG overlay */}
                        <div className="absolute inset-0 z-10 pointer-events-none p-1">
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0,100 Q 50,85 100,20" fill="none" stroke="#f43f5e" strokeWidth="2" />
                            <text x="10" y="30" fill="#a1a1aa" fontSize="10" className="font-mono">f(x) = curve</text>
                          </svg>
                        </div>

                        {/* Approximated Rectangles matching intervals */}
                        <div className="w-full h-full flex items-end justify-between px-0.5 relative z-0">
                          {Array.from({ length: intervals }).map((_, idx) => {
                            const ratio = (idx + 1) / intervals;
                            const heightPercentage = Math.round(ratio * ratio * 85); // quadratic height
                            return (
                              <div 
                                key={idx} 
                                className="bg-brand-yellow/30 border-t border-l border-r border-brand-yellow/60 rounded-t-xs transition-all duration-300 flex-1 mx-0.2"
                                style={{ height: `${Math.max(12, heightPercentage)}%` }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Drag slider */}
                      <div className="mt-1 flex items-center gap-3">
                        <Sliders className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                        <input 
                          type="range"
                          min="4"
                          max="30"
                          value={intervals}
                          onChange={(e) => setIntervals(parseInt(e.target.value))}
                          className="flex-1 accent-brand-yellow h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 font-mono w-10 text-right">{intervals} Strips</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stoichiometry Mass moles chemistry calculator */}
                {activeLessonId === "demo-igcse-10-chem" && (
                  <div className="space-y-3">
                    <span className="text-[9px] font-black tracking-widest text-[#FFF] uppercase block text-center font-mono">
                      Dynamic Stoichiometric Chem Calculator
                    </span>

                    <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg space-y-3 h-36 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <label className="text-slate-500 block">Select Compound:</label>
                          <select 
                            value={chemicalCompound}
                            onChange={(e) => setChemicalCompound(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-brand-yellow px-2 py-1 rounded mt-1 font-mono font-bold cursor-pointer"
                          >
                            <option value="CO2">CO₂ (Carbon Dioxide, Mr=44)</option>
                            <option value="H2O">H₂O (Water, Mr=18)</option>
                            <option value="NaCl">NaCl (Sodium Chloride, Mr=58.5)</option>
                            <option value="CH4">CH₄ (Methane, Mr=16)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-slate-500 block">Mass of Gas (grams):</label>
                          <input 
                            type="number"
                            value={gramsValue}
                            onChange={(e) => setGramsValue(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-2 py-0.5 rounded mt-1 font-mono font-bold"
                          />
                        </div>
                      </div>

                      {/* Display calculations output dynamically */}
                      <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px] space-y-1 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Calculated Moles (Mass/Mr):</span>
                          <span className="text-brand-yellow font-bold font-mono">{calculateMoles()} moles</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-900 pt-1">
                          <span className="text-slate-500">Volume occupied at r.t.p. (moles × 24):</span>
                          <span className="text-brand-red font-extrabold font-mono">{(parseFloat(calculateMoles()) * 24).toFixed(3)} dm³ (liters)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t border-slate-850 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Explore inputs & watch outputs update instantly.</span>
                </div>
              </div>
            )}

            {/* STEP 2: CONCEPT CHECKPOINT QUESTIONS */}
            {currentStep === 2 && (
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <span className="text-[9px] font-black tracking-widest text-brand-red uppercase block text-center font-mono flex items-center justify-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  BOARD CHECKPOINT CHALLENGE
                </span>

                <div className="space-y-3">
                  <p className="text-xs font-black text-slate-100 leading-normal">
                    {getQuizData(activeLessonId || "").question}
                  </p>

                  <div className="space-y-1.5">
                    {getQuizData(activeLessonId || "").options.map((opt, oIdx) => {
                      let colorClass = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300";
                      
                      if (selectedAnswer === oIdx) {
                        colorClass = "bg-brand-blue-dark/50 border-brand-yellow text-brand-yellow font-bold";
                      }
                      
                      if (quizSubmitted) {
                        const isCorrect = oIdx === getQuizData(activeLessonId || "").correctIdx;
                        if (isCorrect) {
                          colorClass = "bg-emerald-950/70 border-emerald-500 text-emerald-400 font-extrabold";
                        } else if (selectedAnswer === oIdx) {
                          colorClass = "bg-red-950/70 border-brand-red text-brand-red font-bold";
                        } else {
                          colorClass = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => setSelectedAnswer(oIdx)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${colorClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-[10px] font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {quizSubmitted && (
                  <div className="p-2 bg-slate-900 border border-slate-800 text-[9.5px] rounded-lg leading-normal text-slate-300">
                    💡 <strong>Plato Explanation:</strong> {getQuizData(activeLessonId || "").explanation}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-850 flex justify-end">
                  {!quizSubmitted ? (
                    <button
                      onClick={() => {
                        setQuizSubmitted(true);
                        if (selectedAnswer === getQuizData(activeLessonId || "").correctIdx) {
                          setQuizScore(1);
                        } else {
                          setQuizScore(0);
                        }
                      }}
                      disabled={selectedAnswer === null}
                      className="px-4 py-1.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 font-black text-xs rounded-lg disabled:opacity-45 cursor-pointer shadow-md"
                    >
                      Confirm Solution
                    </button>
                  ) : (
                    <div className="text-[10px] font-mono text-slate-450 flex items-center gap-1.5">
                      {quizScore === 1 ? (
                        <span className="text-emerald-400 font-bold">✓ Perfect checkpoint answer!</span>
                      ) : (
                        <span className="text-brand-red font-bold">✗ Incorrect, retry in layout.</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: MASTERY REWARDS & NEXT TRIAL */}
            {currentStep === 3 && (
              <div className="space-y-4 flex-1 text-center flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-gradient-to-b from-brand-yellow to-brand-gold rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xl animate-bounce">
                  <Award className="w-6 h-6 text-slate-950 fill-current" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-100">Congratulations Scholar!</h3>
                  <p className="text-[11px] text-slate-400 font-light leading-normal max-w-[240px] mx-auto">
                    You have successfully completed this {activeLesson?.grade} {activeLesson?.subject} Demo Module by {activeLesson?.instructor}.
                  </p>
                </div>

                <div className="bg-slate-905 border border-slate-850 p-2.5 rounded-lg text-center max-w-[260px] mx-auto space-y-1">
                  <div className="text-brand-yellow font-extrabold text-xs font-mono">
                    +{activeLesson?.xpReward} Planetary XP Unlocked
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-light">
                    This point balance has been synchronized securely to your general Dubai campus record.
                  </p>
                </div>

                <div className="flex gap-2 w-full pt-1 max-w-xs justify-center flex-wrap">
                  <button 
                    onClick={handleResetLesson}
                    className="px-3 py-2 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded-lg hover:border-brand-yellow transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Module</span>
                  </button>

                  <button
                    onClick={() => {
                      if (activeLesson) {
                        onBookSelectedCourse(convertLevelToClass(activeLesson));
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-brand-red to-orange-500 text-white font-black text-[10px] uppercase rounded-lg shadow-md hover:scale-102 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Secure Free Campus Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Standard Footer Control panel */}
            {currentStep < 3 && (
              <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-xs">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded disabled:opacity-30 cursor-pointer font-bold"
                >
                  Previous
                </button>
                <button
                  disabled={currentStep === 2 && !quizSubmitted}
                  onClick={handleNextStep}
                  className="px-4 py-1.5 bg-slate-900 border-2 border-brand-yellow/80 text-brand-yellow hover:bg-slate-850 font-black rounded-lg cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>{currentStep === 2 ? "Conclude & Gain XP" : "Continue"}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}

          </div>

          <p className="text-[10px] text-slate-500 text-center">
            Lessons reflect physical training syllabus licensed under KHDA Dubai coordinates.
          </p>
        </div>
      )}
    </div>
  );
}
