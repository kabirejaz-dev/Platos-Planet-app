import React, { useState } from "react";
import { Course, CurriculumType } from "../types";
import { PLATO_COURSES } from "../data";
import { 
  BookOpen, 
  GraduationCap, 
  Cpu, 
  Mic, 
  Star, 
  ChevronRight, 
  Calendar, 
  Clock, 
  BadgeCheck, 
  Info,
  DollarSign,
  MapPin
} from "lucide-react";

interface CourseCatalogProps {
  onSelectedCourseForEnroll: (course: Course) => void;
}

const CATEGORIES: { type: CurriculumType; label: string; icon: any; color: string; bg: string }[] = [
  { 
    type: "CBSE", 
    label: "CBSE K-12", 
    icon: GraduationCap, 
    color: "text-emerald-400 border-emerald-500/50",
    bg: "bg-emerald-950/30"
  },
  { 
    type: "British", 
    label: "British A* Prep", 
    icon: BookOpen, 
    color: "text-brand-blue-light border-brand-blue-light/50",
    bg: "bg-brand-blue-dark/30"
  },
  { 
    type: "Creative Arts & Test Prep", 
    label: "Test Prep & Speak", 
    icon: Mic, 
    color: "text-brand-red border-brand-red/50",
    bg: "bg-brand-blue-dark/30"
  }
];

export default function CourseCatalog({ onSelectedCourseForEnroll }: CourseCatalogProps) {
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>("CBSE");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>("robo-astro");

  const filteredCourses = PLATO_COURSES.filter(c => c.curriculum === selectedCurriculum);

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Title & Dubai banner */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-yellow via-indigo-200 to-brand-red bg-clip-text text-transparent">
          Explore Curriculums
        </h2>
        <p className="text-xs text-slate-400">
          Curated training streams licensed for top achievement in Dubai schools.
        </p>
      </div>

      {/* Categories Bento Grid Selector */}
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCurriculum === cat.type;
          return (
            <button
              id={`cat-btn-${cat.type.replace(/[^a-zA-Z]/g, "")}`}
              key={cat.type}
              onClick={() => {
                setSelectedCurriculum(cat.type);
                // Auto-expand first course in new category
                const first = PLATO_COURSES.find(c => c.curriculum === cat.type);
                if (first) setExpandedCourseId(first.id);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected 
                  ? `${cat.bg} border-brand-yellow text-slate-100 shadow-[0_0_12px_rgba(253,184,19,0.3)] scale-[1.02]`
                  : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700/60 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5 mb-1.5 transition-transform group-hover:scale-110" />
              <span className="text-[11px] font-bold tracking-tight leading-tight">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Courses Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {filteredCourses.length} Programs Available
          </span>
          <span className="text-[10px] bg-brand-blue-dark/50 text-brand-yellow font-medium px-2 py-0.5 rounded-full border border-brand-blue/30">
            Dubai Centers Only
          </span>
        </div>

        {filteredCourses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          return (
            <div
              id={`course-card-${course.id}`}
              key={course.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? "bg-slate-900 border-brand-blue/80" 
                  : "bg-slate-900/40 border-slate-800/60 hover:border-slate-750"
              }`}
            >
              {/* Header summary row */}
              <button
                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                className="w-full p-3.5 flex items-start justify-between text-left cursor-pointer"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-brand-yellow bg-brand-yellow/10 px-1.5 py-0.2 rounded">
                      {course.gradeLevel}
                    </span>
                    <span className="flex items-center gap-0.5 text-brand-yellow text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {course.rating}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{course.title}</h3>
                </div>
                <div className="p-1 rounded-full bg-slate-800 text-slate-400 mt-1 flex-shrink-0 self-center">
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90 text-brand-yellow" : ""}`} />
                </div>
              </button>

              {/* Extended Details (Collapsible) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800 bg-slate-900/65 space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {course.description}
                  </p>

                  {/* Highlights Bullet block */}
                  <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/40 space-y-2">
                    <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider block">
                      Program Pillars & Takeaways
                    </span>
                    <div className="space-y-1.5">
                      {course.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-slate-300 leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                    <div className="flex items-center gap-1.5 bg-slate-950/40 p-2 rounded border border-slate-800/30">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <div className="truncate">
                        <span className="text-[9px] text-slate-500 block">Timings</span>
                        <span className="text-slate-300 font-medium">{course.schedule.split(" | ")[0]}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/40 p-2 rounded border border-slate-800/30">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <div>
                        <span className="text-[9px] text-slate-500 block">Duration</span>
                        <span className="text-slate-300 font-medium">{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action button */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[9px] text-slate-500 block font-semibold uppercase">Pricing Range</span>
                      <span className="text-xs font-bold text-emerald-400 tracking-tight font-mono">{course.feeRange}</span>
                    </div>
                    <button
                      id={`book-trial-btn-${course.id}`}
                      onClick={() => onSelectedCourseForEnroll(course)}
                      className="px-4 py-2 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow active:scale-95 text-slate-950 font-black text-[11px] rounded-lg shadow-lg shadow-brand-yellow/10 cursor-pointer transition-all uppercase tracking-wider"
                    >
                      Book Royal Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Quick FAQ banner and support details */}
      <div className="bg-gradient-to-r from-brand-blue-dark/30 to-brand-blue/20 border border-brand-blue/30 p-3.5 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-yellow">Have customized school schedules?</span>
          <p className="text-[10px] text-slate-400 leading-normal">
            Plato's Planet offers custom timed batches, private coaching, and hybrid classes matching CBSE holidays or British curriculum study leaves.
          </p>
        </div>
      </div>
    </div>
  );
}
