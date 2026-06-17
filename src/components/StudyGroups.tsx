import React, { useState, useEffect, useRef } from "react";
import { StudentProfile, Course } from "../types";
import { PLATO_COURSES } from "../data";
import { 
  Users, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Lock, 
  Unlock, 
  Sparkles, 
  Plus, 
  Trophy, 
  FileText, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  School,
  AlertCircle
} from "lucide-react";
import { getStoredPlatosPlanetConfig } from "../platosPlanetConfig";
import { motion, AnimatePresence } from "motion/react";

interface StudyGroupsProps {
  currentProfile: StudentProfile;
  onUpdateProfile: (newPrf: StudentProfile) => void;
  triggerNotification: (title: string, desc: string) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

interface ServerMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMentor?: boolean;
  school?: string;
}

interface Room {
  id: string;
  title: string;
  courseId: string;
  curriculum: string;
  description: string;
  memberCount: number;
}

export default function StudyGroups({ 
  currentProfile, 
  onUpdateProfile, 
  triggerNotification,
  onAwardXp 
}: StudyGroupsProps) {
  const platosConfig = getStoredPlatosPlanetConfig();
  const branches = platosConfig.officialBranches;
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>("group-cbse-math-10");
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoadingRooms, setIsLoadingRooms] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [shareText, setShareText] = useState<string>("");
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch all study group rooms on load
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/study-groups/rooms");
        if (res.ok) {
          const data = await res.json();
          setRooms(data.rooms || []);
        }
      } catch (err) {
        console.error("Error loading chat rooms:", err);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  // Fetch messages for the active room and pull periodically
  useEffect(() => {
    let active = true;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/study-groups/messages/${activeRoomId}`);
        if (res.ok && active) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    // Real-time server sync polling every 3 seconds to pull peer replies
    const pollInterval = setInterval(() => {
      if (active) fetchMessages();
    }, 3000);

    return () => {
      active = false;
      clearInterval(pollInterval);
    };
  }, [activeRoomId]);

  // Handle scrolling to bottom whenever new messages land
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  // Helper check if student is enrolled/joined in a room
  const isJoined = (room: Room) => {
    return currentProfile.enrolledCourses.includes(room.courseId);
  };

  // Join group handler
  const handleJoinGroup = (room: Room) => {
    if (isJoined(room)) return;

    const updatedCourses = [...currentProfile.enrolledCourses, room.courseId];
    onUpdateProfile({
      ...currentProfile,
      enrolledCourses: updatedCourses
    });

    onAwardXp(40);
    triggerNotification(
      "🔓 Study Group Unlocked!",
      `Subject hub '${room.title}' added to your desk. Collaborating awards +40 XP! 🚀`
    );
  };

  // Send new message
  const handleSendMessage = async (e?: React.FormEvent, customizedText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customizedText || inputText;
    if (!textToSend.trim()) return;

    setIsSending(true);
    try {
      const res = await fetch(`/api/study-groups/messages/${activeRoomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: `${currentProfile.name} (You)`,
          avatar: "⭐",
          text: textToSend.trim(),
          school: `${currentProfile.curriculum} Division`,
          isMentor: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Optimistic append
        setMessages(prev => [...prev, data.message]);
        if (!customizedText) {
          setInputText("");
        }
        // Small XP reward for interactive studying (5 XP per constructive post, max rewards fun)
        onAwardXp(10);
      }
    } catch (err) {
      console.error("Failed to post message:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Automated feature: Peer study simulation stats sharing
  const handleShareFocusStats = () => {
    if (!isJoined(activeRoom)) {
      triggerNotification("⚠️ Room Locked", "Please join this Study Group room to share study reports with classmates.");
      return;
    }
    const shareMessage = `🎯 [FOCUS REPORT] I just finalized a 25-minute Pomodoro study sprint with my Plato tutor! Complete active questions, claim +35 XP and match my streak! Current score: ${currentProfile.xp} XP!`;
    handleSendMessage(undefined, shareMessage);
    triggerNotification("🚀 Focus Stat Shared!", "Classmates have been notified of your focus sprint success!");
  };

  // Automated feature: Ask Mentor Doubt helper
  const handleAskMentorDoubt = () => {
    if (!isJoined(activeRoom)) {
      triggerNotification("⚠️ Room Locked", "Please join this Study Group room to consult our expert mentor.");
      return;
    }
    const questionsPool: Record<string, string> = {
      "group-cbse-math-10": "What is the simplest way to find the nature of roots for board exams when the discriminant is a fractional square value?",
      "group-british-igcse-physics": "Could some mentor explain the exact difference between electromagnetic induction and secondary Lenz's Law?",
      "group-plato-phonics-champions": "What are the three most successful stage posture guidelines to win over mic-shyness?",
      "group-test-prep-neet-jee": "What quick trick allows us to solve projectile trajectory range vectors in under 40 seconds without derivation?",
      "group-british-igcse-math": "What is the fastest way to confirm if a transformation matrix represents a reflection or a shear?",
      "group-british-igcse-chemistry": "How do we derive the empirical formula when we are given percentage by mass instead of grams?",
      "group-cbse-science-10": "What is the difference between a real and virtual image for concave mirror ray diagrams?",
      "group-cbse-math-12": "How do we apply integration by parts (ILATE rule) to solve the integration of ln(x)?"
    };

    const studentDoubt = questionsPool[activeRoomId] || "Can some expert provide a key textbook summary for this curriculum term?";
    
    // Post the question
    handleSendMessage(undefined, `❓ [STUDY HUB QUERY] ${studentDoubt}`);
    
    // Server has standard response timers. We immediately schedule an expert Mentor response from our certified trainer!
    setTimeout(async () => {
      try {
        const res = await fetch(`/api/study-groups/messages/${activeRoomId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: "Trainer Sunil (Plato Senior)",
            avatar: "👨‍🏫",
            text: `📝 [EXPERT INSIGHT] Hello ${currentProfile.name.split(" ")[0]}! Excellent doubt. For CBSE and board patterns, remember to: 1. Always isolate variables early. 2. Write down your formula given parameters list BEFORE crunching numbers to secure part-mark criteria. 3. Double-check units (e.g. converting cm to meters). Slay it! 🚀`,
            school: "Plato Dubai Faculty",
            isMentor: true
          })
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(prev => [...prev, data.message]);
        }
      } catch (err) {
        console.error("Doubt response posting failure", err);
      }
    }, 2100);

    triggerNotification("👨‍🏫 Expert Consulted!", "A Senior Plato Dubai faculty member is drafting a solution for the study room...");
  };

  // Simple active list of simulated online peers in this study room
  const getPeersForRoom = (roomId: string) => {
    const peersLists: Record<string, {name: string, school: string, suffix: string}[]> = {
      "group-robo-astro": [
        { name: "Student 16", school: "GEMS Modern Academy", suffix: "🥇 790 XP" },
        { name: "Student 17", school: branches[0] || "Main Campus", suffix: "👾 580 XP" },
        { name: "Student 18", school: branches[0] || "Main Campus", suffix: "🚀 360 XP" }
      ],
      "group-cbse-math-10": [
        { name: "Student 6", school: "Delhi Private School", suffix: "🥈 720 XP" },
        { name: "Student 19", school: branches[1] || "Supporting Campus", suffix: "✍️ 430 XP" },
        { name: "Student 20", school: "Online Campus", suffix: "🎨 490 XP" }
      ],
      "group-british-igcse-physics": [
        { name: "Student 21", school: "Dubai College", suffix: "🥉 640 XP" },
        { name: "Student 22", school: "Jumeirah College", suffix: "🇬🇧 510 XP" }
      ],
      "group-coding-python-games": [
        { name: "Student 17", school: branches[0] || "Main Campus", suffix: "👾 580 XP" },
        { name: "Student 18", school: branches[0] || "Main Campus", suffix: "🚀 360 XP" }
      ],
      "group-british-igcse-math": [
        { name: "Student 21", school: "Dubai College", suffix: "🥉 640 XP" },
        { name: "Student 22", school: "Jumeirah College", suffix: "🇬🇧 510 XP" }
      ],
      "group-british-igcse-chemistry": [
        { name: "Student 21", school: "Dubai College", suffix: "🥉 640 XP" },
        { name: "Student 22", school: "Jumeirah College", suffix: "🇬🇧 510 XP" }
      ],
      "group-cbse-science-10": [
        { name: "Student 6", school: "Delhi Private School", suffix: "🥈 720 XP" },
        { name: "Student 20", school: "Online Campus", suffix: "🎨 490 XP" },
        { name: "Student 19", school: branches[1] || "Supporting Campus", suffix: "✍️ 430 XP" }
      ],
      "group-cbse-math-12": [
        { name: "Student 6", school: "Delhi Private School", suffix: "🥈 720 XP" },
        { name: "Student 19", school: branches[1] || "Supporting Campus", suffix: "✍️ 430 XP" }
      ]
    };
    return peersLists[roomId] || [
      { name: "Student 23", school: "Online Hub", suffix: "🌌 220 XP" },
      { name: "Student 16", school: "GEMS Modern", suffix: "🥇 790 XP" }
    ];
  };

  const roomOnlinePeers = getPeersForRoom(activeRoomId);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto relative min-h-screen text-slate-100 pb-20">
      
      {/* Title block */}
      <div className="space-y-1">
        <span className="text-[9px] bg-brand-yellow/10 text-brand-yellow font-extrabold px-1.5 py-0.5 rounded border border-brand-yellow/25 uppercase tracking-widest font-mono">
          Interactive Study Rooms
        </span>
        <h2 className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-brand-yellow to-brand-gold flex items-center gap-1.5 leading-none">
          <Users className="w-5 h-5 text-brand-yellow" />
          Plato Peer Circles
        </h2>
        <p className="text-[10px] text-slate-400">
          Sync live, troubleshoot board homework syllabus, and level up together with top Dubai pupils.
        </p>
      </div>

      {/* horizontal visual slider for Rooms selection */}
      <div className="space-y-1.5">
        <span className="text-[8px] font-black uppercase tracking-wider text-slate-500 font-mono block">
          Select Topic Group:
        </span>
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {rooms.map((room) => {
            const hasJoined = isJoined(room);
            const isActive = room.id === activeRoomId;
            return (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                  triggerNotification("💬 Joined Study Group", `Entered ${room.title}`);
                }}
                className={`py-1.5 px-3 rounded-xl border flex-shrink-0 cursor-pointer transition-all text-left max-w-[170px] relative ${
                  isActive 
                    ? "bg-gradient-to-r from-slate-900 to-slate-950 border-brand-yellow shadow-md" 
                    : "bg-slate-955 border-slate-900 hover:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black truncate text-slate-200">
                    {room.title.split(" ")[1] || room.title}
                  </span>
                  {hasJoined && (
                    <CheckCircle className="w-3 h-3 text-emerald-450 fill-emerald-900/20" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5 gap-2">
                  <span className="text-[8px] text-slate-500 font-mono tracking-wider">
                    {room.curriculum === "Creative Arts & Test Prep" ? "Speech & Arts" : room.curriculum}
                  </span>
                  <span className="text-[8px] text-brand-yellow/85 font-mono">
                    👥 {room.memberCount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Room description & Join actions */}
      {activeRoom && (
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-3 space-y-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[35px] opacity-10 font-black tracking-tighter select-none">
            {activeRoom.curriculum === "Creative Arts & Test Prep" ? "Speech & Arts" : activeRoom.curriculum}
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xs font-black text-brand-yellow flex items-center gap-1">
                <span>{activeRoom.title} Group</span>
              </h3>
              <p className="text-[9.5px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                {activeRoom.description}
              </p>
            </div>

            {/* Lock / Unlock UI state */}
            {!isJoined(activeRoom) ? (
              <button
                onClick={() => handleJoinGroup(activeRoom)}
                className="py-1 px-2.5 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[9px] font-black uppercase rounded-lg cursor-pointer transition-all flex items-center gap-1 shadow-md select-none flex-shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>Join Group</span>
              </button>
            ) : (
              <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 rounded-lg text-[8.5px] font-bold font-mono tracking-wider flex items-center gap-1 flex-shrink-0 uppercase">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Connected</span>
              </span>
            )}
          </div>

          {/* Quick collaboration action buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-900/60 scroll-x overflow-auto scrollbar-none">
            <button
              onClick={handleShareFocusStats}
              disabled={!isJoined(activeRoom)}
              className="py-1 px-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 disabled:opacity-40 text-slate-350 hover:text-slate-100 text-[8.5px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap min-w-0"
              title="Share your daily study status report to motivate the room"
            >
              <Trophy className="w-2.5 h-2.5 text-brand-yellow" />
              <span>Share My Focus Status (+10 XP)</span>
            </button>

            <button
              onClick={handleAskMentorDoubt}
              disabled={!isJoined(activeRoom)}
              className="py-1 px-2.5 bg-gradient-to-r from-slate-900 to-slate-950 border border-brand-blue/30 disabled:opacity-40 text-brand-blue hover:text-slate-100 text-[8.5px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0"
              title="Post a doubt into the study group to receive Senior Trainer replies"
            >
              <Sparkles className="w-2.5 h-2.5 text-brand-yellow" />
              <span>Ask Dubai Faculty</span>
            </button>
          </div>
        </div>
      )}

      {/* Main chat layout */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 flex flex-col h-[280px] relative">
        
        {/* Top Active Peers Status Hub */}
        <div className="flex items-center justify-between text-[8px] uppercase tracking-wider font-mono text-slate-500 pb-2 border-b border-slate-900/60 mb-2">
          <span>Peer Study Thread</span>
          <span className="flex items-center gap-1 text-emerald-450 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {roomOnlinePeers.length + 1} ONLINE
          </span>
        </div>

        {/* Dynamic chat thread box */}
        <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-none pr-1">
          {messages.map((msg) => {
            const isMe = msg.sender.includes("(You)") || msg.avatar === "⭐";
            return (
              <div 
                key={msg.id} 
                className={`flex gap-2 text-left ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <div className="w-6.5 h-6.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs flex-shrink-0">
                    {msg.avatar}
                  </div>
                )}

                <div className={`max-w-[78%] flex flex-col gap-0.5`}>
                  {/* Sender Details Header */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9.5px] font-black ${
                      isMe 
                        ? "text-brand-yellow" 
                        : msg.isMentor 
                        ? "text-emerald-400 font-extrabold font-mono" 
                        : "text-slate-300"
                    }`}>
                      {msg.sender}
                    </span>
                    {msg.school && (
                      <span className="text-[7.5px] text-slate-500 font-mono truncate max-w-[80px]">
                        {msg.school.split(" ")[0]}
                      </span>
                    )}
                    <span className="text-[7.5px] text-slate-600 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Bubble text */}
                  <div className={`p-2 rounded-xl text-[10.5px] mt-0.5 leading-relaxed break-words font-sans ${
                    isMe 
                      ? "bg-brand-yellow text-slate-950 font-medium rounded-tr-none" 
                      : msg.isMentor
                      ? "bg-emerald-950/40 border-2 border-emerald-900/65 text-emerald-100 rounded-tl-none font-medium"
                      : "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-850"
                  }`}>
                    {msg.text}
                  </div>
                </div>

                {isMe && (
                  <div className="w-6.5 h-6.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-xs flex-shrink-0">
                    ⭐
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="mt-3 pt-2 border-t border-slate-900/85">
          {isJoined(activeRoom) ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Type board formula doubt, project tips..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/80 rounded-xl py-2 pl-3.5 pr-10 text-[10.5px] text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="absolute right-1 top-1.5 p-1 bg-brand-yellow disabled:bg-slate-900 disabled:text-slate-600 text-slate-950 hover:bg-brand-gold rounded-lg transition-all cursor-pointer shadow"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="py-2.5 px-3 bg-slate-950/80 rounded-xl text-center border border-slate-900 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
              <p className="text-[9.5px] text-slate-500 font-medium">
                Please <strong className="text-brand-yellow hover:underline cursor-pointer" onClick={() => handleJoinGroup(activeRoom)}>Join Group</strong> above to post messages.
              </p>
            </div>
          )}
        </form>

      </div>

      {/* Dubai High-school Active Studying Peers status sidebar */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-900 rounded-2xl p-3.5 space-y-2.5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-200">
          <School className="w-4 h-4 text-brand-yellow" />
          <span>Active Plato Classmates ({roomOnlinePeers.length})</span>
        </div>
        <p className="text-[9px] text-slate-550">
          These top Dubai pupils are currently study-linked to this syllabus subject:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {roomOnlinePeers.map((peer, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-955 p-2 rounded-xl border border-slate-900/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-[9.5px] font-bold text-slate-200 truncate leading-none">
                    {peer.name.split(" ")[0]}
                  </h5>
                  <span className="text-[7.5px] font-mono text-brand-yellow text-right leading-none shrink-0">
                    {peer.suffix.split(" ")[1] || peer.suffix} XP
                  </span>
                </div>
                <span className="text-[8px] text-slate-500 font-mono truncate block mt-1">
                  {peer.school}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic study peer message tip card */}
      <div className="bg-gradient-to-r from-brand-blue-dark/50 to-slate-950 border border-brand-blue/20 p-3 rounded-xl flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-yellow flex-shrink-0 animate-pulse" />
        <p className="text-[9.5px] text-slate-350 leading-relaxed font-sans">
          💡 <strong className="text-brand-yellow font-bold">Group study reward:</strong> Join 3 or more subject groups and collaborate actively to achieve high streak boosts. Peer study increases memory retention by +70%!
        </p>
      </div>

    </div>
  );
}
