import React, { useState, useEffect } from "react";
import { StudentProfile } from "../types";
import { Trophy, Sparkles, RefreshCw, Search, School, Award, Medal, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LeaderboardProps {
  currentProfile: StudentProfile;
}

interface LeaderboardUser {
  id: string;
  name: string;
  school: string;
  curriculum: string;
  xp: number;
  avatar: string;
  badge: string;
}

export default function Leaderboard({ currentProfile }: LeaderboardProps) {
  const [dbStudents, setDbStudents] = useState<LeaderboardUser[]>([]);
  const [filterCurriculum, setFilterCurriculum] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<string>("");

  // Fetch from our real-time board API
  const fetchLeaderboard = async (showNotification = false) => {
    setIsRefreshing(true);
    setErrorStatus("");
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) {
        throw new Error("Could not contact high-school server hub");
      }
      const data = await res.json();
      if (data.leaderboard && Array.isArray(data.leaderboard)) {
        setDbStudents(data.leaderboard);
        setLastRefreshed(data.lastUpdated || new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      console.error("Leaderboard component fetch failure:", err);
      setErrorStatus("Using offline school cache.");
      // Soft local fallback if endpoint is somehow blocked
      const fallback = [
        { id: "leader_1", name: "Mira Al-Mheiri", school: "GEMS Modern Academy", curriculum: "CBSE", xp: 790, avatar: "🥇", badge: "Math Prodigy" },
        { id: "leader_2", name: "Aarav Sharma", school: "Delhi Private School", curriculum: "CBSE", xp: 720, avatar: "🥈", badge: "Science Topper" },
        { id: "leader_3", name: "Sarah Higgins", school: "Dubai College", curriculum: "British", xp: 640, avatar: "🥉", badge: "A* Physics" },
        { id: "leader_4", name: "Khaled Al-Marri", school: "Silicon Oasis Hub", curriculum: "British", xp: 580, avatar: "👾", badge: "Chemistry Wiz" },
        { id: "leader_5", name: "Ryan Parker", school: "Jumeirah College", curriculum: "British", xp: 510, avatar: "🇬🇧", badge: "IGCSE Champ" },
        { id: "leader_6", name: "Diya Narayanan", school: "Al Qusais Centre", curriculum: "Creative Arts & Test Prep", xp: 490, avatar: "🎨", badge: "Public Speaking" },
        { id: "leader_7", name: "Arjun Verma", school: "Sharjah Campus", curriculum: "CBSE", xp: 430, avatar: "✍️", badge: "Speed Maths" },
        { id: "leader_8", name: "Maria Fedorova", school: "Silicon Oasis Hub", curriculum: "Creative Arts & Test Prep", xp: 360, avatar: "🚀", badge: "Oratory Star" },
        { id: "leader_9", name: "Zainab Rashid", school: "Online Hub", curriculum: "British", xp: 220, avatar: "🌌", badge: "Astro Scholar" }
      ];
      setDbStudents(fallback);
      setLastRefreshed(new Date().toLocaleTimeString());
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 600);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Standard interactive student entry representation
  const activeStudentInLeaderboard: LeaderboardUser = {
    id: "active_user_id",
    name: `${currentProfile.name} (You)`,
    school: `${currentProfile.curriculum} Term Student`,
    curriculum: currentProfile.curriculum,
    xp: currentProfile.xp,
    avatar: "⭐",
    badge: `Streak: ${currentProfile.streak} Days`
  };

  // Combine and sort list based on real score
  const combinedListRaw: LeaderboardUser[] = [...dbStudents];
  const activeUserIndexInDb = combinedListRaw.findIndex(s => s.name.includes("(You)") || s.id === "active_user_id");
  if (activeUserIndexInDb === -1) {
    combinedListRaw.push(activeStudentInLeaderboard);
  } else {
    combinedListRaw[activeUserIndexInDb].xp = currentProfile.xp;
  }

  // Filter based on curriculum and search
  const filteredList = combinedListRaw
    .filter(student => {
      // Curriculum filter
      if (filterCurriculum !== "All") {
        return student.curriculum === filterCurriculum;
      }
      return true;
    })
    .filter(student => {
      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(q) ||
        student.school.toLowerCase().includes(q) ||
        student.curriculum.toLowerCase().includes(q) ||
        student.badge.toLowerCase().includes(q)
      );
    })
    // Sort descending by XP
    .sort((a, b) => b.xp - a.xp)
    // Limit to top 10
    .slice(0, 10);

  // Generate podium elements (strictly from top 3 of ALL or current filters)
  const sortedCompleteList = [...combinedListRaw].sort((a, b) => b.xp - a.xp);
  const topThree = sortedCompleteList.slice(0, 3);
  
  // Re-order top3 to elegant standard 2nd, 1st, 3rd visualization layout
  const podiumLayout = [];
  if (topThree[1]) podiumLayout.push({ ...topThree[1], rank: 2, heightClass: "h-20", color: "from-slate-700 to-slate-800", text: "text-slate-300" });
  if (topThree[0]) podiumLayout.push({ ...topThree[0], rank: 1, heightClass: "h-24", color: "from-brand-yellow via-brand-gold to-yellow-600 animate-pulse-once", text: "text-slate-950" });
  if (topThree[2]) podiumLayout.push({ ...topThree[2], rank: 3, heightClass: "h-16", color: "from-amber-700 to-amber-900 border-amber-800", text: "text-amber-200" });

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto relative min-h-screen text-slate-100 pb-20">
      
      {/* Visual Title Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] bg-brand-yellow/10 text-brand-yellow font-extrabold px-1.5 py-0.5 rounded border border-brand-yellow/25 uppercase tracking-widest font-mono">
              Plato's Star Pupils
            </span>
            {errorStatus && (
              <span className="text-[8px] bg-red-950 text-red-300 px-1 py-0.5 rounded border border-red-900 font-mono">
                {errorStatus}
              </span>
            )}
          </div>
          <h2 className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-105 via-brand-yellow to-brand-gold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-yellow" />
            <span>Dubai Toppers Board</span>
          </h2>
          <p className="text-[10px] text-slate-400">
            Compete live with CBSE, British & STEM students across Dubai Centres.
          </p>
        </div>

        <button
          onClick={() => fetchLeaderboard(true)}
          disabled={isRefreshing}
          className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all text-slate-400 hover:text-brand-yellow cursor-pointer disabled:opacity-40"
          title="Force refresh student rankings"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-brand-yellow" : ""}`} />
        </button>
      </div>

      {/* Decorative Interactive Podium block for Top 3 */}
      {podiumLayout.length > 0 && (
        <div className="bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-900 p-3 rounded-2xl space-y-3.5 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-900/40">
            <span className="font-bold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-brand-yellow fill-current" />
              <span>Plato Glory Podium</span>
            </span>
            {lastRefreshed && (
              <span className="text-[8.5px] text-slate-500 font-mono">
                Sync: {lastRefreshed}
              </span>
            )}
          </div>

          <div className="flex items-end justify-center gap-2.5 pt-4 pb-2">
            {podiumLayout.map((student) => {
              const isCurrentUser = student.id === "active_user_id" || student.name.includes("(You)");
              return (
                <div key={student.id} className="flex flex-col items-center flex-1 max-w-[110px] text-center">
                  
                  {/* Floating Avatar Sphere */}
                  <div className="relative mb-1">
                    <span className="text-2xl filter drop-shadow">{student.avatar}</span>
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-slate-900 border border-slate-800 text-[8px] font-bold flex items-center justify-center text-brand-yellow font-mono">
                      #{student.rank}
                    </span>
                  </div>

                  {/* Student Title snippet */}
                  <span className={`text-[10px] font-black truncate max-w-full block ${isCurrentUser ? "text-brand-yellow font-extrabold" : "text-slate-200"}`}>
                    {student.name.split(" ")[0]}
                  </span>
                  
                  <span className="text-[8px] text-slate-500 truncate max-w-[90px] block font-mono">
                    {student.school.split(" ")[0]}
                  </span>

                  {/* Vertical Column */}
                  <div className={`w-full ${student.heightClass} bg-gradient-to-b ${student.color} rounded-t-xl mt-2 relative flex flex-col justify-end p-2 border-t border-x border-slate-800/80`}>
                    <span className={`text-[11px] font-extrabold block font-mono leading-none ${student.rank === 1 ? 'text-slate-950 font-black' : 'text-slate-200'}`}>
                      {student.xp}
                    </span>
                    <span className={`text-[7px] font-bold uppercase tracking-widest block font-mono ${student.rank === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                      XP
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Query bar block */}
      <div className="space-y-2">
        {/* Horizontal scroll curriculum slider */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {["All", "CBSE", "British", "Creative Arts & Test Prep"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterCurriculum(tab)}
              className={`py-1.5 px-3 text-[9.5px] font-extrabold rounded-lg border transition-all cursor-pointer flex-shrink-0 font-mono uppercase tracking-wider ${
                filterCurriculum === tab
                  ? "bg-brand-yellow text-slate-950 border-brand-yellow shadow-md"
                  : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800"
              }`}
            >
              {tab === "Creative Arts & Test Prep" ? "Speech & Arts" : tab}
            </button>
          ))}
        </div>

        {/* Live Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search school toppers, subjects or badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/80 rounded-xl py-2 pl-8.5 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-350 text-[10px] font-mono p-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* List view of top 10 Students */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider font-mono text-slate-500 px-2">
          <span>Planet Student Rank</span>
          <span>Competitive XP</span>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-1.5">
            {filteredList.map((student, i) => {
              // Calculate precise global ranking sorted position
              const globalIndex = sortedCompleteList.findIndex(x => x.id === student.id || x.name === student.name);
              const rank = globalIndex === -1 ? i + 1 : globalIndex + 1;
              const isCurrentUser = student.id === "active_user_id" || student.name.includes("(You)");

              return (
                <motion.div
                  key={student.id}
                  layout
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-slate-950 rounded-xl p-2.5 flex items-center justify-between gap-3 border transition-all ${
                    isCurrentUser 
                      ? "border-brand-yellow bg-gradient-to-r from-brand-yellow/10 via-slate-950 to-slate-950 shadow-md ring-1 ring-brand-yellow/20" 
                      : "border-slate-900 hover:border-slate-850"
                  }`}
                >
                  
                  {/* Left part rank info & school */}
                  <div className="flex items-center gap-2 min-w-0">
                    
                    {/* Rank index bullet */}
                    <div className={`w-6 h-6 rounded-lg text-[10.5px] font-black font-mono flex items-center justify-center flex-shrink-0 ${
                      rank === 1 
                        ? "bg-brand-yellow text-slate-950" 
                        : rank === 2 
                        ? "bg-slate-800 text-slate-100" 
                        : rank === 3 
                        ? "bg-amber-900/60 text-amber-100" 
                        : "bg-slate-900 text-slate-400"
                    }`}>
                      {rank}
                    </div>

                    {/* Avatar circle */}
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-base shadow-inner">
                      {student.avatar}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`text-xs font-bold truncate leading-tight ${isCurrentUser ? 'text-brand-yellow font-black' : 'text-slate-100'}`}>
                          {student.name}
                        </h4>
                        
                        {isCurrentUser && (
                          <span className="text-[7.5px] bg-brand-yellow/15 text-brand-yellow font-black uppercase tracking-wider px-1 py-0.2 rounded border border-brand-yellow/20 font-mono animate-pulse">
                            YOU
                          </span>
                        )}
                      </div>

                      {/* Details of School & Curriculum type */}
                      <p className="text-[9.5px] text-slate-400 truncate flex items-center gap-1 font-sans">
                        <School className="w-3 h-3 text-slate-500 inline flex-shrink-0" />
                        <span className="truncate pr-1">{student.school}</span>
                        <strong className="text-slate-500 font-mono font-bold uppercase text-[8px] tracking-wide border-l border-slate-800 pl-1.5 flex-shrink-0 inline">
                          {student.curriculum === "Creative Arts & Test Prep" ? "Speech & Arts" : student.curriculum}
                        </strong>
                      </p>
                    </div>

                  </div>

                  {/* Right part: XP points & Badge */}
                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-1 font-mono">
                    <span className={`text-[12.5px] font-black ${isCurrentUser ? "text-brand-yellow animate-pulse" : "text-slate-100"}`}>
                      {student.xp} <strong className="text-[8px] font-bold text-slate-500">XP</strong>
                    </span>
                    <span className="text-[8px] text-brand-gold/85 bg-brand-gold/5 border border-brand-gold/15 rounded px-1.5 py-0.5 leading-none tracking-tight font-sans">
                      {student.badge}
                    </span>
                  </div>

                </motion.div>
              );
            })}

            {filteredList.length === 0 && (
              <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-900 space-y-2">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">No matching students found</p>
                <p className="text-[10px] text-slate-600 max-w-xs mx-auto">
                  Try clearing the search box or shifting curriculum category filter tabs as CBSE/British!
                </p>
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Encouraging competitive footer motto */}
      <div className="bg-gradient-to-r from-brand-blue-dark/50 to-slate-950 border border-brand-blue/20 p-3 rounded-xl flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-brand-yellow flex-shrink-0 animate-pulse" />
        <p className="text-[9.5px] text-slate-350 leading-relaxed font-sans">
          🔥 <strong className="text-brand-yellow font-bold">Plato Strategy:</strong> Complete interactive challenges, ask Mindy tutor doubts, or stay consistently in the 25-minute Pomodoro zones to gain more XP and dominate!
        </p>
      </div>

    </div>
  );
}
