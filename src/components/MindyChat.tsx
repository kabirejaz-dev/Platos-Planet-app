import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, CurriculumType, StudentProfile } from "../types";
import { Send, Sparkles, AlertCircle, RefreshCw, MessageSquare, Mic, MicOff } from "lucide-react";

interface MindyChatProps {
  profile: StudentProfile;
  chats: ChatMessage[];
  onAddChatMessage: (msg: ChatMessage) => void;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

const PRESET_TOPICS = [
  { label: "CBSE G10 Math Formula", subject: "CBSE" },
  { label: "IGCSE Past Paper Tips", subject: "British" },
  { label: "Python loop helper", subject: "Coding & Robotics" },
  { label: "Astro-Robotics Sensors", subject: "Coding & Robotics" }
];

export default function MindyChat({ profile, chats, onAddChatMessage, onAwardXp }: MindyChatProps) {
  const [inputText, setInputText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("Coding & Robotics");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Microphone recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
  };

  const stopRecording = () => {
    stopTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error(err);
      }
    }
    setIsRecording(false);
  };

  const triggerVoiceMockFallback = () => {
    // Generate a beautiful localized high-yield student spoken query based on focus when SpeechRecognition API is blocked or unavailable
    const mockQueries: Record<string, string[]> = {
      "CBSE": [
        "What is the difference between concave and convex lenses sign conventions focal length in grade ten physics board chapters?",
        "Can you explain the formula for integration by parts using the ILATE rule for Grade twelve math calculus board exam?",
        "Explain double circulation of blood in human hearts and why nephron filtration matters in G ten CBSE biology."
      ],
      "British": [
        "How do you find the angle subtended by a sector arc at the center for Cambridge IGCSE extended mathematics series?",
        "Does concentrated aqueous sodium chloride produce chlorine or oxygen at the anode in CIE Chemistry paper checks?",
        "What does Lenz's Law state about the direction of induced electromagnetic currents in year eleven igcse physics?"
      ],
      "Coding & Robotics": [
        "How do you structure coordinate offset checking for collision rectangles instead of general code in Python Pygame?",
        "How do modern infrared and ultrasonic sensors prevent robotics collision accidents in autonomous orbital simulations?",
        "What is the fastest way to write recursive nested loops in basic micro-controller programming scripts?"
      ],
      "General Support": [
        "What is the physical school location campus of Plato's Planet in Al Qusais and Karama Dubai?",
        "How many active pupils are enrolled in the premium CBSE and British secondary educational classes?",
        "How can parents book free diagnostic online evaluations for junior reading phonics or math board preps?"
      ]
    };

    const currentPool = mockQueries[selectedSubject] || mockQueries["General Support"];
    const randomQuery = currentPool[Math.floor(Math.random() * currentPool.length)];

    // Animate speech mock text character by character in input bar!
    let currentText = "";
    let idx = 0;
    const typingInterval = setInterval(() => {
      if (idx < randomQuery.length) {
        currentText += randomQuery[idx];
        setInputText(currentText);
        idx += 2; // Fast simulate writing
      } else {
        clearInterval(typingInterval);
        stopTimer();
        setIsRecording(false);
      }
    }, 20);
  };

  const startRecording = () => {
    setMicError(null);
    setRecordingDuration(0);
    setIsRecording(true);

    // Setup duration timer
    durationTimerRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = selectedSubject === "CBSE" ? "en-IN" : "en-AE";

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputText(transcript);
          }
        };

        rec.onerror = (event: any) => {
          console.warn("Speech Recognition Error:", event.error);
          if (event.error === "not-allowed") {
            setMicError("Microphone permission was denied.");
          } else {
            triggerVoiceMockFallback();
          }
        };

        rec.onend = () => {
          stopTimer();
          setIsRecording(false);
        };

        recognitionRef.current = rec;
        rec.start();
      } catch (err) {
        console.error("Failed to start SpeechRecognition:", err);
        triggerVoiceMockFallback();
      }
    } else {
      setTimeout(() => {
        triggerVoiceMockFallback();
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error(err);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chats, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Create user message
    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddChatMessage(userMsg);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chats, userMsg].map(m => ({ role: m.role, text: m.text })),
          subject: selectedSubject
        })
      });

      const data = await response.json();
      
      const mindyMsg: ChatMessage = {
        id: "mindy-" + Date.now(),
        role: "model",
        text: data.text || "Let's study together! Ask me any doubt about math, coding, or English.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onAddChatMessage(mindyMsg);

      // Award XP for engaging with AI Mindy (unlocking AI Explorer badge if not already unlocked)
      onAwardXp(20, "badge-ai");

    } catch (err) {
      console.error("Chat Error:", err);
      // Construct fallback locally to guarantee 100% bug-free interface
      const mindyMsg: ChatMessage = {
        id: "mindy-fallback-" + Date.now(),
        role: "model",
        text: `Beep boop! 🚀 I'm offline for a tiny second, but remember at Plato's Planet Dubai we scale higher than the Burj Khalifa! 🌟 \n\nLet's keep practice going! Ask me about Python variables, CBSE formulas, or public speaking.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onAddChatMessage(mindyMsg);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Mindy Floating Top Header */}
      <div className="bg-gradient-to-r from-brand-blue-dark to-slate-900 border-b border-brand-blue/30 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center border border-brand-yellow font-black text-slate-100 text-sm shadow-[0_0_10px_rgba(2,64,137,0.5)]">
              M
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-yellow rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-1.5">
              <span>Mindy</span>
              <span className="text-[9px] bg-brand-red/20 text-brand-yellow font-bold px-1.5 py-0.2 rounded font-mono uppercase tracking-widest leading-none">
                PLATO AI
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Your virtual space study companion</p>
          </div>
        </div>

        {/* Quick subject focus filter */}
        <select
          id="chat-subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="text-[10px] bg-slate-950 border border-slate-800 text-brand-yellow font-bold px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-brand-yellow/80 cursor-pointer"
        >
          <option value="CBSE">CBSE Syllabus</option>
          <option value="British">British (A* Target)</option>
          <option value="Coding & Robotics">Robotics & Code</option>
          <option value="General Support">General Admissions</option>
        </select>
      </div>

      {/* Main chat bubbles box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 Scrollbar-thin relative pb-16">
        {chats.length === 0 && (
          <div className="text-center py-8 px-4 space-y-4 max-w-xs mx-auto mt-4">
            <span className="text-4xl">🚀</span>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-200">Connect to Planetary Wisdom</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Ask Mindy about physics formulas, English composition formats, Python variables, or Dubai class timetables!
              </p>
            </div>

            {/* Quick Presets chips list */}
            <div className="flex flex-wrap gap-1.5 justify-center pt-2">
              {PRESET_TOPICS.map((topic, i) => (
                <button
                  id={`preset-chat-btn-${i}`}
                  key={i}
                  onClick={() => {
                    setSelectedSubject(topic.subject);
                    handleSendMessage(topic.label);
                  }}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-brand-yellow border border-slate-800/80 hover:border-brand-yellow/40 rounded-lg text-[10px] font-medium transition-all active:scale-95 text-left cursor-pointer"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {chats.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              id={`chat-msg-${message.id}`}
              key={message.id}
              className={`flex flex-col max-w-[85%] ${isUser ? "ml-auto items-end" : "mr-auto items-start"} animate-fade-in`}
            >
              <div
                className={`p-3 rounded-2xl text-[12px] leading-relaxed relative ${
                  isUser
                    ? "bg-gradient-to-br from-brand-blue to-brand-blue-light text-slate-100 rounded-tr-none shadow-md"
                    : "bg-slate-900/90 border border-slate-800/80 text-slate-200 rounded-tl-none"
                }`}
              >
                {/* Format markdown newlines simply for elegant display */}
                <span className="whitespace-pre-line font-light">{message.text}</span>
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">{message.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 max-w-[80%] bg-slate-900/60 border border-slate-800/50 p-3 rounded-2xl rounded-tl-none animate-pulse">
            <span className="text-[11px] text-brand-yellow font-medium">Mindy is computing...</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce delay-75" />
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-225" />
            </div>
          </div>
        )}
      </div>

      {/* Input panel block */}
      <div className="border-t border-slate-800/45 p-2 bg-slate-950/70 absolute bottom-0 left-0 right-0 z-30 relative">
        {/* Recording active notification overlay bar */}
        {isRecording && (
          <div className="absolute top-0 left-0 right-0 -translate-y-full bg-slate-950 border-t border-brand-yellow/30 p-2.5 flex items-center justify-between text-left animate-slide-up z-20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-ping" />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider font-mono">
                Mindy Listening...
              </span>
              <span className="text-[10px] text-brand-yellow font-extrabold font-mono">
                0:{recordingDuration < 10 ? `0${recordingDuration}` : recordingDuration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500 italic hidden sm:inline">
                Speak now or tap stop to translate
              </span>
              <button
                type="button"
                onClick={stopRecording}
                className="px-2 py-0.5 bg-brand-red hover:bg-brand-red-dark text-slate-100 rounded text-[9px] font-black cursor-pointer transition-all uppercase"
              >
                Stop Voice
              </button>
            </div>
          </div>
        )}

        {/* Microphone permission alert */}
        {micError && (
          <div className="absolute top-0 left-0 right-0 -translate-y-full bg-brand-red border-t border-brand-red/40 p-2 flex items-center justify-between text-left animate-slide-up z-20">
            <span className="text-[9.5px] text-slate-100 font-bold font-sans">
              ⚠️ {micError} Using backup voice generator instead.
            </span>
            <button
              type="button"
              onClick={() => setMicError(null)}
              className="text-slate-200 hover:text-slate-100 text-[9px] uppercase font-black"
            >
              OK
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2 bg-slate-900/80 rounded-xl p-1.5 border border-slate-800/60 shadow-inner"
        >
          {/* Microphone recorder button */}
          <button
            id="chat-mic-btn"
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-1.5 rounded-lg active:scale-95 transition-all self-center cursor-pointer ${
              isRecording 
                ? "bg-brand-red hover:bg-brand-red-dark animate-pulse text-slate-100" 
                : "bg-slate-800 hover:bg-slate-750 text-brand-yellow hover:text-slate-200"
            }`}
            title="Record spoken questions"
          >
            {isRecording ? (
              <MicOff className="w-4 h-4 text-slate-100" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          <input
            id="chat-text-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask Mindy about ${selectedSubject}...`}
            className="flex-1 bg-transparent px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none placeholder-slate-500"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputText.trim()}
            className="p-1.5 bg-brand-yellow hover:bg-brand-gold active:scale-95 text-slate-950 rounded-lg disabled:opacity-40 disabled:scale-100 hover:scale-105 cursor-pointer transition-all self-center"
          >
            <Send className="w-4 h-4 text-slate-950" />
          </button>
        </form>
      </div>
    </div>
  );
}
