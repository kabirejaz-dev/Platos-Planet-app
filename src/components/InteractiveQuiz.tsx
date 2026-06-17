import React, { useState } from "react";
import { QuizQuestion, StudentProfile } from "../types";
import { Check, X, Award, HelpCircle, Loader2, Play, RefreshCw, Trophy, ArrowRight } from "lucide-react";

interface InteractiveQuizProps {
  profile: StudentProfile;
  onAwardXp: (amount: number, badgeId?: string) => void;
}

const POPULAR_QUIZ_TOPICS = [
  { label: "IGCSE Physics", query: "CIE Physics" },
  { label: "CBSE Science", query: "CBSE Science" },
  { label: "CBSE Quadratic Forms", query: "CBSE Mathematics" },
  { label: "Dubai Landmarks", query: "Dubai Science" }
];

export default function InteractiveQuiz({ profile, onAwardXp }: InteractiveQuizProps) {
  const [topic, setTopic] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Grade 8");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  // Game states
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuizGeneration = async (topicQuery: string) => {
    if (!topicQuery.trim()) return;
    setLoading(true);
    setQuestions([]);
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);

    try {
      const response = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicQuery, gradeLevel })
      });
      const data = await response.json();
      if (data.quiz && data.quiz.length > 0) {
        setQuestions(data.quiz);
      } else {
        throw new Error("Empty quiz returned");
      }
    } catch (err) {
      console.error("Quiz API Error:", err);
      // Hardcoded high-quality safe fallback if server fails
      setQuestions([
        {
          question: "Which keyword is used in Python to define a reusable block of statements?",
          options: ["function", "def", "method", "class"],
          correctAnswerIndex: 1,
          explanation: "In Python, 'def' stands for define, and is the official keyword used to initialize custom functions."
        },
        {
          question: "Which of the following mirror types possesses a negative focal length under Cartesian sign conventions?",
          options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic convex mirror"],
          correctAnswerIndex: 0,
          explanation: "Under standard Cartesian sign conventions, concave optical systems (both mirrors and lenses) have a negative focal length."
        },
        {
          question: "What is the highest point on earth relative to sea level, similar to reaching apex scores?",
          options: ["Burj Khalifa Peak", "Mount Everest", "K2 Summit", "Deep Dive Dubai Floor"],
          correctAnswerIndex: 1,
          explanation: "Mount Everest towers at 8,848 meters, while Burj Khalifa is the tallest custom building at 828 meters!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (optIdx: number) => {
    if (submitted) return;
    setSelectedOptIdx(optIdx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOptIdx === null || submitted) return;
    setSubmitted(true);
    const isCorrect = selectedOptIdx === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptIdx(null);
      setSubmitted(false);
    } else {
      // Completed last question
      setQuizFinished(true);
      const finalScore = score;
      const historyItem = {
        topic: topic || "STEM General Practice",
        score: finalScore,
        total: questions.length,
        date: new Date().toDateString(),
        gradeLevel: gradeLevel
      };
      try {
        const stored = localStorage.getItem(`plato_quiz_history_${profile.name}`);
        const list = stored ? JSON.parse(stored) : [];
        list.push(historyItem);
        localStorage.setItem(`plato_quiz_history_${profile.name}`, JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }

      // If 100% score (3/3), award "Quiz Conqueror" badge + massive bonus XP
      if (score + (selectedOptIdx === currentQuestion.correctAnswerIndex ? 1 : 0) === questions.length) {
        onAwardXp(100, "badge-quiz");
      } else {
        onAwardXp(30); // regular practice participation points
      }
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Intro section */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-yellow via-indigo-200 to-brand-red bg-clip-text text-transparent">
          STEM Interactive Challenge
        </h2>
        <p className="text-xs text-slate-400">
          Prepare for exams with personalized, instant practice tests generated on-demand.
        </p>
      </div>

      {questions.length === 0 && !loading && (
        /* Quiz Configuration Screen */
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Choose Mock Grade Target</label>
            <div className="grid grid-cols-3 gap-2">
              {["Grade 6-8", "Grade 9-10", "Grade 11-12"].map((g) => (
                <button
                  id={`grade-select-btn-${g.replace(/\s+/g, "")}`}
                  key={g}
                  onClick={() => setGradeLevel(g)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    gradeLevel === g
                      ? "bg-brand-blue-dark/50 border-brand-yellow text-brand-yellow"
                      : "bg-slate-950 border-slate-800/70 text-slate-500"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Custom Subject / Topic</label>
            <div className="flex gap-2">
              <input
                id="quiz-topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. CBSE Geometry, IGCSE Physics, Trigonometry..."
                className="flex-1 bg-slate-950 border border-slate-850 px-3 py-2 text-xs text-slate-200 rounded-lg focus:outline-none focus:border-brand-yellow placeholder-slate-600"
              />
              <button
                id="generate-quiz-btn"
                onClick={() => startQuizGeneration(topic)}
                disabled={!topic.trim()}
                className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:from-brand-blue-light hover:to-brand-blue font-extrabold text-xs text-slate-100 rounded-lg disabled:opacity-40 cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch</span>
              </button>
            </div>
          </div>

          {/* Quick-select chips */}
          <div className="space-y-2 pt-2 border-t border-slate-850/50">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Popular Dubai Revision Topics</span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_QUIZ_TOPICS.map((pt, i) => (
                <button
                  id={`pt-chip-${i}`}
                  key={i}
                  onClick={() => {
                    setTopic(pt.query);
                    startQuizGeneration(pt.query);
                  }}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full text-[11px] text-slate-300 transition-all hover:border-brand-yellow/45 cursor-pointer"
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        /* Dynamic loader representing server connection */
        <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-yellow animate-spin" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-200 block">Sourcing Planetary Intelligence</span>
            <p className="text-[10px] text-slate-500 max-w-[200px] leading-relaxed">
              Generating challenging MCQ test suite matched precisely with official curriculum specifications...
            </p>
          </div>
        </div>
      )}

      {questions.length > 0 && !quizFinished && (
        /* Live question solver widget */
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 space-y-4 relative">
          {/* Top Progress Header */}
          <div className="flex justify-between items-center text-[10px] font-bold text-brand-yellow font-mono tracking-widest uppercase border-b border-slate-800 pb-2">
            <span>PLATO TESTING AGENT</span>
            <span>Question {currentIdx + 1} of {questions.length}</span>
          </div>

          {/* Question Label */}
          <h3 className="text-sm font-semibold text-slate-100 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options Rows */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOptIdx === idx;
              let btnClass = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
              
              if (isSelected) {
                btnClass = "bg-brand-blue-dark/50 border-brand-yellow text-brand-yellow font-bold shadow-sm";
              }

              if (submitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  btnClass = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-950/50 border-rose-500 text-rose-300 font-bold";
                } else {
                  btnClass = "bg-slate-950/30 border-slate-900 text-slate-600 pointer-events-none";
                }
              }

              return (
                <button
                  id={`quiz-option-${idx}`}
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={submitted}
                  className={`w-full p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{option}</span>
                  {submitted && idx === currentQuestion.correctAnswerIndex && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                  {submitted && isSelected && idx !== currentQuestion.correctAnswerIndex && (
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation drawer if submitted */}
          {submitted && (
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800/40 space-y-1 animate-fade-in text-[11px] leading-relaxed">
              <span className="font-extrabold text-amber-400 block uppercase tracking-wide">Trainer Insight</span>
              <p className="text-slate-300 font-light">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Bottom control row */}
          <div className="flex justify-end pt-2 border-t border-slate-800">
            {!submitted ? (
              <button
                id="submit-answer-btn"
                onClick={handleAnswerSubmit}
                disabled={selectedOptIdx === null}
                className="px-4 py-2 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-slate-950 font-black text-xs rounded-lg disabled:opacity-40 transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={handleNextStep}
                className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:from-brand-red hover:to-brand-red-hover text-slate-100 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {quizFinished && (
        /* Quiz Finished Final Score Board */
        <div className="bg-slate-900 border border-brand-yellow/40 rounded-xl p-6 text-center space-y-5 animate-pulse-once">
          <div className="w-16 h-16 bg-gradient-to-b from-brand-yellow to-brand-gold rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-brand-yellow">
            <Trophy className="w-8 h-8 text-slate-950 fill-current" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-black text-slate-100 tracking-tight">Challenge Cleared!</h3>
            <p className="text-xs text-slate-400">
              Your overall evaluated scores on this revision topic:
            </p>
            <div className="text-3xl font-black text-brand-yellow font-mono py-1">
              {score} <span className="text-sm font-bold text-slate-500">/ {questions.length} Correct</span>
            </div>
          </div>

          {/* XP details feedback card */}
          <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-800 max-w-xs mx-auto text-xs space-y-1">
            {score === questions.length ? (
              <p className="text-emerald-400 font-bold">🎉 Flawless Score! +100 XP and Badge awarded!</p>
            ) : (
              <p className="text-brand-yellow">Nice attempt! +30 XP revision point added to your profile.</p>
            )}
            <p className="text-[10px] text-slate-500">Every daily quiz attempts bring you closer to Burj Peak!</p>
          </div>

          <div>
            <button
              id="quiz-restart-btn"
              onClick={() => {
                setQuestions([]);
                setTopic("");
                setQuizFinished(false);
              }}
              className="px-6 py-2.5 bg-slate-950 border border-slate-850 hover:border-brand-yellow text-brand-yellow hover:text-brand-gold font-extrabold text-xs rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse" />
              <span>Retry / New Challenge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
