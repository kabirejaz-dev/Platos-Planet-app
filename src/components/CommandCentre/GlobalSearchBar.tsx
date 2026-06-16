import React, { useState, useRef, useEffect } from "react";
import { Search, Sparkles, User, FileText, MapPin, Layers, Users, BookOpen, X, ArrowRight } from "lucide-react";

interface SearchResult {
  id: string;
  type: "Student" | "Parent" | "Teacher" | "Invoice" | "Lead" | "Branch" | "Batch" | "Course";
  title: string;
  subtitle: string;
  meta: string;
  status?: string;
}

const sampleResults: SearchResult[] = [
  { id: "S1", type: "Student", title: "Fatima Al-Suwaidi", subtitle: "Grade 10 • IGCSE", meta: "Dubai Marina Campus", status: "Active" },
  { id: "S2", type: "Student", title: "Dev Patel", subtitle: "Grade 11 • CBSE", meta: "Jumeirah Campus", status: "At Risk" },
  { id: "P1", type: "Parent", title: "Sayed Ahmad", subtitle: "Father of Fatima Ahmad", meta: "+971 50 123 4567", status: "Verified" },
  { id: "T1", type: "Teacher", title: "Dr. Richard Feynman", subtitle: "Advanced Physics • Teacher ID: PH-90", meta: "Dubai Marina Campus", status: "Top Rated" },
  { id: "I1", type: "Invoice", title: "INV-2026-8902", subtitle: "Dev Patel Outstanding Fees", meta: "AED 12,400 Due", status: "Unpaid" },
  { id: "L1", type: "Lead", title: "Aarav Sharma", subtitle: "Mathematics Trial Batch", meta: "Hot Lead • Score: 94%", status: "Trial Scheduled" },
  { id: "B1", type: "Branch", title: "Dubai Marina Campus", subtitle: "Primary Hub UAE", meta: "2,350 Students enrolled", status: "Healthy" },
  { id: "B2", type: "Branch", title: "Jumeirah Campus", subtitle: "Secondary Hub UAE", meta: "1,840 Students enrolled", status: "Monitor" },
  { id: "A1", type: "Batch", title: "IGCSE Math Batch delta", subtitle: "Tuesdays & Thursdays", meta: "Room 102", status: "Full" },
  { id: "C1", type: "Course", title: "A-Level Electromagnetism Mastery", subtitle: "24 modules", meta: "Physics Curriculum", status: "Syllabus Match" }
];

interface GlobalSearchBarProps {
  theme: "dark" | "light";
  onSelectResult: (type: string, id: string) => void;
}

export default function GlobalSearchBar({ theme, onSelectResult }: GlobalSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = sampleResults.filter((item) => {
    const matchesQuery = 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase());
    
    if (filterType === "All") return matchesQuery;
    return matchesQuery && item.type === filterType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "Student": return <User className="w-4 h-4 text-emerald-400" />;
      case "Parent": return <Users className="w-4 h-4 text-sky-400" />;
      case "Teacher": return <User className="w-4 h-4 text-purple-400 font-bold" />;
      case "Invoice": return <FileText className="w-4 h-4 text-amber-400" />;
      case "Lead": return <Sparkles className="w-4 h-4 text-pink-400" />;
      case "Branch": return <MapPin className="w-4 h-4 text-rose-400" />;
      case "Batch": return <Layers className="w-4 h-4 text-indigo-400" />;
      case "Course": return <BookOpen className="w-4 h-4 text-yellow-450" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl" id="global-search-bar-container">
      <div 
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-250 shadow-md ${
          theme === "light" 
            ? "bg-white border-slate-200 text-slate-900 focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-500" 
            : "bg-slate-900/90 border-slate-800 text-slate-100 focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-500/80"
        }`}
      >
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="AI-powered Executive Search (Student, Parent, Teacher, Invoice, Lead)..."
          className="w-full bg-transparent border-none text-xs font-bold focus:outline-none focus:ring-0 placeholder-slate-400 text-left outline-none"
        />
        {query && (
          <button 
            type="button" 
            onClick={() => { setQuery(""); setIsOpen(false); }}
            className="p-1 hover:bg-slate-800/10 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-450" />
          </button>
        )}
        <div className="flex items-center gap-1 shrink-0 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase font-mono">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Plato AI</span>
        </div>
      </div>

      {isOpen && (
        <div 
          className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl z-50 overflow-hidden text-left max-h-[420px] flex flex-col ${
            theme === "light" 
              ? "bg-white border-slate-200 shadow-slate-300" 
              : "bg-slate-950 border-slate-800 shadow-black/80"
          }`}
          id="global-search-results-dropdown"
        >
          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 p-2 border-b border-slate-150 dark:border-slate-850/60 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-500/5">
            {["All", "Student", "Parent", "Teacher", "Lead", "Invoice", "Branch", "Batch"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 cursor-pointer ${
                  filterType === t
                    ? "bg-amber-500 text-white shadow-sm"
                    : `${theme === "light" ? "text-slate-600 hover:bg-slate-100" : "text-slate-450 hover:bg-slate-800"}`
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-150 dark:divide-slate-855">
            {filteredResults.length === 0 ? (
              <div className="p-8 text-center text-slate-450 space-y-1">
                <Search className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs font-semibold">No records matches "{query}"</p>
                <p className="text-[10px] opacity-70">Try searching for other name, curriculum, or invoices.</p>
              </div>
            ) : (
              filteredResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item.type, item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 flex items-center justify-between transition-colors text-left font-sans ${
                    theme === "light" ? "hover:bg-slate-50" : "hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-500/10 rounded-xl shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold ${theme === "light" ? "text-slate-900" : "text-slate-150"}`}>
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono opacity-60 bg-slate-500/10 px-1 py-0.1 rounded uppercase tracking-wider">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</p>
                      <p className="text-[9px] text-slate-500 font-medium mt-0.5">{item.meta}</p>
                    </div>
                  </div>

                  {item.status && (
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-lg ${
                        item.status.includes("At Risk") || item.status.includes("Unpaid")
                          ? "bg-rose-500/10 text-rose-500 border border-rose-500/10"
                          : item.status.includes("Active") || item.status.includes("Healthy") || item.status.includes("Top Rated")
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-505/10"
                          : "bg-amber-500/10 text-amber-500 border border-amber-505/10"
                      }`}>
                        {item.status}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-450 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Prompt Suggestion Footer */}
          <div className="p-2 border-t border-slate-150 dark:border-slate-850/60 bg-slate-500/5 text-[9.5px] text-slate-400 text-center font-mono">
            💡 Type commands like <span className="text-amber-500 font-semibold">'invoice unpaid'</span> or <span className="text-amber-500 font-semibold">'at risk'</span> for automated filter mapping
          </div>
        </div>
      )}
    </div>
  );
}
