import React, { useState } from "react";
import { Sparkles, Trophy, Lock, Unlock, Rocket, ChevronRight, X, ShieldAlert, Award } from "lucide-react";

interface Planet {
  id: string;
  name: string;
  icon: string;
  requiredXp: number;
  badge: string;
  rewardText: string;
  aiTool: string;
  specialMission: string;
  certificate: string;
  color: string; // Tailwind bg color class
}

interface PlanetJourneyProps {
  currentXp: number;
  onTriggerNotification: (title: string, desc: string) => void;
  onLaunchMissionXp: (xpAmt: number) => void;
}

export default function PlanetJourney({
  currentXp,
  onTriggerNotification,
  onLaunchMissionXp
}: PlanetJourneyProps) {
    const planets: Planet[] = [
      {
        id: "mercury",
        name: "Mercury Explorer",
        icon: "☄️",
        requiredXp: 50,
        badge: "Quick Thinker ⚡",
        rewardText: "Unlocks standard revision sheets & board question catalogs.",
        aiTool: "Mindy Quick Recall Engine",
        specialMission: "Synthesize basic physics variables formulas",
        certificate: "Planetary Scholar Certificate Part I",
        color: "from-electric-blue to-neo-purple"
      },
      {
        id: "venus",
        name: "Venus Scholar",
        icon: "🔮",
        requiredXp: 150,
        badge: "Scholar Shield 🛡️",
        rewardText: "Unlocks real-time question sheets & CBSE model papers.",
        aiTool: "Plato Auto-Drafting Revision Coach",
        specialMission: "Balance 12 chemical synthesis equations under 3 mins",
        certificate: "Secondary Board Advanced Champion credential",
        color: "from-neo-purple to-neon-cyan"
      },
      {
        id: "earth",
        name: "Earth Achiever",
        icon: "🌍",
        requiredXp: 300,
        badge: "World Topper 🏆",
        rewardText: "Unlocks elite custom doubt solving proxy threads with AI.",
        aiTool: "Interactive PDF Syllabus Search & Highlighter",
        specialMission: "Clear 10 calculus integral papers with A* accuracy",
        certificate: "Dubai Elite Stem Achiever accreditation",
        color: "from-neon-cyan to-neon-mint"
      },
      {
        id: "mars",
        name: "Mars Champion",
        icon: "🔴",
        requiredXp: 500,
        badge: "Mars Conquerer 🛡️",
        rewardText: "Unlocks premium mock examiner report worksheets.",
        aiTool: "Generative Exam Marking Scheme Analyst",
        specialMission: "Verify 15 biological respiration chain sequences",
        certificate: "Mars Space Olympiad honorary credential",
        color: "from-hot-coral to-neo-purple"
      },
      {
        id: "jupiter",
        name: "Jupiter Master",
        icon: "🪐",
        requiredXp: 800,
        badge: "Cosmic Mastermind 🧠",
        rewardText: "Unlocks elite counselor counseling schedules & direct live chat.",
        aiTool: "Full-Stack Mock Exam Predictive Engine",
        specialMission: "Evaluate 8 multi-stage physics circuits questions",
        certificate: "Board Exam Gold Medalist Trophy simulation",
        color: "from-electric-lime to-neon-mint"
      },
      {
        id: "saturn",
        name: "Saturn Elite",
        icon: "🪐",
        requiredXp: 1200,
        badge: "Saturn Ring-Leader Ring 💍",
        rewardText: "Unlocks exclusive private mentor feedback slots.",
        aiTool: "Advanced Cognitive Map & Sync Advisor",
        specialMission: "Draft 5 English critical text literary assessments",
        certificate: "Dubai Youth Research Scholar diploma",
        color: "from-electric-blue to-neon-cyan"
      },
      {
        id: "neptune",
        name: "Neptune Legend",
        icon: "🌀",
        requiredXp: 1800,
        badge: "Deep Ocean Sage 🌊",
        rewardText: "Unlocks final 10-year board paper model reviews.",
        aiTool: "Interactive Mock Exam Simulation Sandbox",
        specialMission: "Perform comprehensive CBSE / Cambridge final rehearsal",
        certificate: "Neptune Elite Academic Badge of Honor",
        color: "from-neon-cyan to-electric-lime"
      },
      {
        id: "pluto",
        name: "Pluto Grand Master",
        icon: "👑",
        requiredXp: 2500,
        badge: "Platonian Monarch 👑",
        rewardText: "Unlocks final board exam peak scholarship and custom references.",
        aiTool: "Infinite Mock Generator & Personal Academic Coach Model",
        specialMission: "Submit comprehensive portfolio to Plato's board of directors",
        certificate: "Plato's Planet Grand Master Lifetime Fellowship Medal",
        color: "from-neo-purple to-hot-coral"
      }
    ];

  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const handleRunMission = (p: Planet) => {
    if (currentXp < p.requiredXp) {
      onTriggerNotification(
        "🔒 Portal Locked",
        `You currently need ${p.requiredXp - currentXp} more XP to unlock the secret missions on ${p.name}.`
      );
      return;
    }
    
    // Converted to reward gain
    onLaunchMissionXp(65);
    onTriggerNotification(
      `🚀 Launched Special Mission: "${p.specialMission}"`,
      `Initializing active recall simulation interface on ${p.name}. Completed mission awards +65 XP!`
    );
    setSelectedPlanet(null);
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl text-left">
      {/* Background glow matrix */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-electric-blue/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-neon-cyan/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <span className="text-[9px] font-mono font-black text-neon-cyan uppercase tracking-[0.25em] block">
            THE SIGNATURE STUDY EXPERIENCE
          </span>
          <h2 className="text-lg font-display font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
            🪐 Planet Learning Journey
          </h2>
          <p className="text-xs text-slate-400">
            Adventure path modeled like a space odyssey. Climb XP ranges to conquer the space map!
          </p>
        </div>

        <div className="bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 font-mono text-xs text-slate-300">
          <span>Your Rank Orbit:</span>
          <strong className="text-neon-cyan font-black">{currentXp} XP</strong>
        </div>
      </div>

      {/* Interactive Map path */}
      <div className="relative py-8 px-4 flex flex-col items-center gap-8 w-full">
        {/* Continuous SVG trajectory path - 2026 Unicorn style */}
        <div className="absolute inset-y-0 w-[3px] bg-gradient-to-b from-electric-blue via-neo-purple to-neon-cyan/20 rounded-full left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(0,242,254,0.4)]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
          {planets.map((planet, index) => {
            const isUnlocked = currentXp >= planet.requiredXp;
            
            return (
              <div
                key={planet.id}
                onClick={() => handlePlanetClick(planet)}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative group ${
                  isUnlocked
                    ? "bg-slate-950/80 border-electric-blue/30 hover:border-electric-blue hover:shadow-lg hover:shadow-electric-blue/10 hover:-translate-y-1.5"
                    : "bg-slate-950/50 border-slate-900 opacity-50 hover:opacity-75 hover:border-slate-800"
                }`}
              >
                {/* Visual Status Indicator */}
                <div className="absolute top-4 right-4">
                  {isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-neon-mint" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>

                {/* Animated graphic icon wrapper */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${planet.color} flex items-center justify-center font-bold text-2.5xl shadow-xl ring-4 ring-slate-900 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {planet.icon}
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xs font-black text-slate-100 group-hover:text-neon-cyan transition-colors">
                    {planet.name}
                  </h3>
                  <span className={`text-[8px] font-mono font-black block border px-2 py-0.5 rounded-full mt-1.5 ${
                    isUnlocked 
                      ? "bg-electric-blue/10 border-electric-blue/20 text-neon-cyan" 
                      : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {planet.requiredXp} XP Needed
                  </span>
                </div>

                {/* Little mini description indicator */}
                <span className="text-[10px] text-slate-400 mt-3.5 font-medium leading-tight">
                  Unlock "{planet.badge.split(" ")[0]} Goal"
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop up Planet Detail Modal when clicked */}
      {selectedPlanet && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left space-y-5 shadow-2xl relative overflow-hidden animate-fade-in">
            {/* Header and close button */}
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedPlanet.color} flex items-center justify-center text-xl shadow-lg`}>
                {selectedPlanet.icon}
              </div>
              <div>
                <h3 className="text-base font-black text-white">{selectedPlanet.name}</h3>
                <span className="text-[10px] font-mono text-neon-cyan font-bold uppercase tracking-wider block">
                  XP threshold status: {currentXp} / {selectedPlanet.requiredXp}
                </span>
              </div>
            </div>

            {/* Unlock indicators block */}
            <div className="space-y-3.5 border-t border-slate-800 pt-4">
              <div className="flex gap-2.5 items-start">
                <span className="text-lg">🏆</span>
                <div>
                  <h4 className="text-xs font-black text-slate-200">Syllabus Badge Unlocked</h4>
                  <p className="text-xs text-slate-400 font-semibold">{selectedPlanet.badge}</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="text-lg">🤖</span>
                <div>
                  <h4 className="text-xs font-black text-slate-200">AI Coaching Tool</h4>
                  <p className="text-xs text-slate-400 font-semibold">{selectedPlanet.aiTool}</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="text-lg">🏅</span>
                <div>
                  <h4 className="text-xs font-black text-slate-200">Academic Credential</h4>
                  <p className="text-xs text-slate-400 font-semibold">{selectedPlanet.certificate}</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="text-lg">🎁</span>
                <div>
                  <h4 className="text-xs font-black text-slate-200">Special Milestone Reward</h4>
                  <p className="text-xs text-slate-400">{selectedPlanet.rewardText}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedPlanet(null)}
                className="flex-1 py-2.5 hover:bg-slate-800 text-xs text-slate-400 hover:text-white font-bold rounded-xl transition-all cursor-pointer"
              >
                Close View
              </button>

              <button
                onClick={() => handleRunMission(selectedPlanet)}
                className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentXp >= selectedPlanet.requiredXp
                    ? "bg-gradient-to-r from-electric-blue to-neo-purple text-white shadow-lg shadow-electric-blue/20 hover:opacity-95"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Rocket className="w-4 h-4 fill-current" />
                <span>Launch Mission</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
