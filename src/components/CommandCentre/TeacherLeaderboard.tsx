import React, { useState } from "react";
import { 
  Trophy, Star, Award, CheckCircle, ChevronRight, 
  MessageSquare, Sliders, ExternalLink, ThumbsUp, Send 
} from "lucide-react";

interface TeacherData {
  rank: number;
  name: string;
  subject: string;
  students: number;
  rating: number; // out of 5
  attendance: string;
  results: string; // avg grade/score
  badge: "🏆 Platinum" | "🥇 Gold" | "🥈 Silver" | "Bronze";
  avatar: string;
}

export default function TeacherLeaderboard({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);
  const [bonusReason, setBonusReason] = useState("Outstanding lesson engagement scores & complete syllabus compliance");

  const teachers: TeacherData[] = [
    { rank: 1, name: "Dr. Richard Feynman", subject: "physics Mastery", students: 184, rating: 4.95, attendance: "99.2%", results: "95% A-Level Alpha", badge: "🏆 Platinum", avatar: "👨‍🔬" },
    { rank: 2, name: "Prof. Albert Einstein", subject: "Advanced Calculus", students: 165, rating: 4.92, attendance: "98.4%", results: "94.2% Math core", badge: "🥇 Gold", avatar: "👨‍🏫" },
    { rank: 3, name: "Marie Curie", subject: "Nuclear Chemistry", students: 142, rating: 4.90, attendance: "100%", results: "92.8% Chem Grade", badge: "🥇 Gold", avatar: "👩‍🔬" },
    { rank: 4, name: "Ada Lovelace", subject: "Discrete Coding", students: 155, rating: 4.88, attendance: "97.8%", results: "91% Tech Master", badge: "🥈 Silver", avatar: "👩‍💻" },
    { rank: 5, name: "Alan Turing", subject: "Algorithms Spec", students: 130, rating: 4.85, attendance: "96.5%", results: "89% Math Theory", badge: "🥈 Silver", avatar: "👨‍💻" },
    { rank: 6, name: "Stephen Hawking", subject: "Cosmology Core", students: 110, rating: 4.82, attendance: "98.0%", results: "88% Space Certs", badge: "Bronze", avatar: "👨‍🦼" },
    { rank: 7, name: "Isaac Newton", subject: "Classical Mechanics", students: 124, rating: 4.79, attendance: "95.2%", results: "86% IGCSE Base", badge: "Bronze", avatar: "👨‍🎨" },
    { rank: 8, name: "Carl Sagan", subject: "Astronomy Foundation", students: 118, rating: 4.77, attendance: "99.0%", results: "88% Avg Pass", badge: "Bronze", avatar: "👨‍🚀" },
    { rank: 9, name: "Rosalind Franklin", subject: "molecular Biology", students: 95, rating: 4.75, attendance: "97.4%", results: "85% Bio core", badge: "Bronze", avatar: "👩‍⚕️" },
    { rank: 10, name: "Charles Darwin", subject: "Evolutionary Biology", students: 88, rating: 4.72, attendance: "96.1%", results: "84% Avg Grade", badge: "Bronze", avatar: "👨‍🌾" }
  ];

  const handleCommend = (teacher: TeacherData) => {
    onTriggerNotification(
      `💖 Commendation Dispatched`,
      `Official bonus/commendation registered for ${teacher.name}: "${bonusReason}". +500 Plato Reward points.`
    );
    setSelectedTeacher(null);
  };

  const getRankBadgeStyle = (badge: TeacherData["badge"]) => {
    switch (badge) {
      case "🏆 Platinum":
        return "bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-500 border-amber-550/40 font-black";
      case "🥇 Gold":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-extrabold";
      case "🥈 Silver":
        return "bg-slate-300/10 text-slate-300 border-slate-300/20 font-bold";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/10";
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl space-y-4" id="teacher-performance-centre">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
            Teacher Performance Centre & Faculty Grid
          </h3>
          <p className="text-[10px] text-slate-450 mt-0.5">Spotlight on Top 10 faculty leaders tracking satisfaction and mock class outputs</p>
        </div>

        <span className="text-[9.5px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-850">
          Evaluations updated weekly
        </span>
      </div>

      <div className="overflow-x-auto w-full rounded-2xl border border-slate-850/80">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-955 border-b border-slate-850 text-slate-400 font-mono tracking-wider font-extrabold text-[9.5px] uppercase">
              <th className="p-4">Rank & Instructor</th>
              <th className="p-4">Subject Stream</th>
              <th className="p-4">Cohort size</th>
              <th className="p-4">NPS Rating</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">Mock Results</th>
              <th className="p-4">Executive Badge</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-855 text-slate-205">
            {teachers.map((teacher) => (
              <React.Fragment key={teacher.rank}>
                <tr className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-3 font-sans">
                    <span className="text-slate-400 font-mono font-black text-[10px]">#{teacher.rank}</span>
                    <span className="text-lg bg-slate-950 p-1.5 rounded-xl border border-white/[0.03]">
                      {teacher.avatar}
                    </span>
                    <div>
                      <span>{teacher.name}</span>
                      <p className="text-[9px] text-slate-500 font-mono font-normal">Faculty ID: T-{teacher.rank + 900}</p>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-300 capitalize">{teacher.subject}</td>
                  <td className="p-4 font-mono font-black">{teacher.students} <span className="text-[9.5px] text-slate-505 font-medium">Students</span></td>
                  <td className="p-4 text-amber-550 font-bold font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{teacher.rating.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-extrabold text-emerald-400">{teacher.attendance}</td>
                  <td className="p-4 font-bold font-sans text-slate-200">{teacher.results}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-lg border text-[9.5px] font-black ${getRankBadgeStyle(teacher.badge)}`}>
                      {teacher.badge}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => {
                        setSelectedTeacher(selectedTeacher?.rank === teacher.rank ? null : teacher);
                      }}
                      className="p-1 px-3 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 border border-amber-550/20 rounded-xl text-[10.5px] font-black transition-all cursor-pointer"
                    >
                      Commend
                    </button>
                  </td>
                </tr>

                {/* Commend Drawer Modal */}
                {selectedTeacher?.rank === teacher.rank && (
                  <tr>
                    <td colSpan={8} className="p-4 bg-slate-950/70 border-t border-b border-amber-500/20">
                      <div className="space-y-3 max-w-xl text-left">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-350 uppercase font-mono">
                            Authorize Plato's Planet Strategic Bonus for {teacher.name}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <textarea
                            value={bonusReason}
                            onChange={(e) => setBonusReason(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2 rounded-xl focus:outline-none focus:border-amber-500"
                            rows={2}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelectedTeacher(null)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleCommend(teacher)}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              Award Faculty Commendation
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
