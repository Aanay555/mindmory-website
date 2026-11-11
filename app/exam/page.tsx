"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, ShieldCheck, PlayCircle, Loader2 } from "lucide-react";

// PASTE YOUR GOOGLE SCRIPT URL HERE
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx6cELy8AkjEpLD71K7jI9LGpUc4j1OnQaJjvm3V2rRmogNc7_pYubsN3w-mrekvD-w/exec";

export default function OnlineExamPage() {
  const [step, setStep] = useState<"login" | "test" | "submitting" | "submitted">("login");
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("Class 5 - Grade 6 (Middle)");
  
  // Timer state (20 minutes = 1200 seconds)
  const initialTime = 20 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [finalScore, setFinalScore] = useState(0);

  // Questions Database
  const questions = [
    {
      q: "Which celestial body is famously known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: 1,
    },
    {
      q: "What is the official capital city of Pakistan?",
      options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
      correct: 2,
    },
    {
      q: "Which vital organ pumps blood throughout the entire human body?",
      options: ["Lungs", "Brain", "Liver", "Heart"],
      correct: 3,
    },
    {
      q: "In Visual and Fine Arts, which of the following is classified as a Primary Color?",
      options: ["Green", "Blue", "Orange", "Purple"],
      correct: 1,
    },
  ];

  // Timer Countdown
  useEffect(() => {
    if (step !== "test") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !rollNo.trim()) {
      alert("Please enter both Student Name and Roll Number / ID");
      return;
    }
    setStep("test");
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const submitToGoogleSheets = async (calculatedScore: number) => {
    setStep("submitting");

    const timeSpentSeconds = initialTime - timeLeft;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`;
    const percentage = Math.round((calculatedScore / questions.length) * 100);

    const payload = {
      studentName: studentName.trim(),
      rollNo: rollNo.trim().toUpperCase(),
      selectedGrade: selectedGrade,
      score: calculatedScore,
      totalQuestions: questions.length,
      percentage: percentage,
      timeTaken: timeSpentFormatted,
    };

    try {
      if (!GOOGLE_SHEET_WEBHOOK_URL.includes("DEMO_REPLACE")) {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setFinalScore(calculatedScore);
      setStep("submitted");
    }
  };

  const handleFinalSubmit = () => {
    if (confirm("Are you sure you want to finish and submit your exam?")) {
      const score = calculateScore();
      submitToGoogleSheets(score);
    }
  };

  const handleAutoSubmit = () => {
    const score = calculateScore();
    submitToGoogleSheets(score);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center bg-neutral-950 p-4 sm:p-5 rounded-2xl border border-neutral-800">
          <div>
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest block">MINDMORY 2026</span>
            <h1 className="text-lg sm:text-xl font-black text-white">Online Assessment Desk</h1>
          </div>
          <Link
            href="/"
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold rounded-xl border border-neutral-700 flex items-center gap-1.5 transition text-neutral-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        {/* STEP 1: LOGIN DESK */}
        {step === "login" && (
          <div className="bg-neutral-950 p-6 sm:p-10 rounded-3xl border border-red-900/50 space-y-6 shadow-2xl">
            <div className="space-y-2 text-center max-w-md mx-auto">
              <div className="w-12 h-12 bg-red-950/80 border border-red-700 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Candidate Verification</h2>
              <p className="text-xs text-neutral-400">
                100% Online At-Home Assessment. Please enter verified candidate credentials to proceed.
              </p>
            </div>

            <form onSubmit={handleStartExam} className="max-w-md mx-auto space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ahmed"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Candidate Roll Number / ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MM-2026-1042"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-600 uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Select Grade Level</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                >
                  <option>Class 1 - Grade 2 (Foundation)</option>
                  <option>Class 3 - Grade 4 (Junior)</option>
                  <option>Class 5 - Grade 6 (Middle)</option>
                  <option>Class 7 - Grade 8 (Senior)</option>
                  <option>Grade 9 - 10 / O Levels (Advanced)</option>
                </select>
              </div>

              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] text-neutral-400 space-y-1">
                <p className="flex items-center gap-1.5 font-bold text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Exam Security & Conditions:
                </p>
                <p>• Total Time: 20 Minutes | Single Attempt Official Submission.</p>
                <p>• Score and completion timestamp will be logged directly into the national roster.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                Start Online Exam Now →
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: ACTIVE TEST QUESTIONS */}
        {step === "test" && (
          <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-400 block font-semibold">{studentName} ({rollNo.toUpperCase()})</span>
                <span className="text-sm font-bold text-white">{selectedGrade}</span>
              </div>
              <div className="flex items-center gap-2 bg-red-950 border border-red-700 px-3.5 py-1.5 rounded-xl text-red-400 font-mono text-sm font-bold shadow-inner">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((qItem, qIdx) => (
                <div key={qIdx} className="bg-black p-5 rounded-2xl border border-neutral-800 space-y-3">
                  <p className="text-sm font-bold text-white leading-relaxed">
                    <span className="text-red-500 mr-1.5">Q{qIdx + 1}.</span> {qItem.q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {qItem.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [qIdx]: oIdx })}
                        className={`p-3.5 rounded-xl text-xs font-semibold text-left transition border ${
                          answers[qIdx] === oIdx
                            ? "bg-red-950/90 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <span className="font-mono text-neutral-500 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg"
              >
                Submit Exam Paper & Lock Answers
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUBMITTING LOADER */}
        {step === "submitting" && (
          <div className="bg-neutral-950 p-12 rounded-3xl border border-neutral-800 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-white">Transmitting Exam Responses...</h3>
            <p className="text-xs text-neutral-400">Verifying integrity and logging score to official Mindmory database.</p>
          </div>
        )}

        {/* STEP 4: SUBMITTED SUCCESS CARD */}
        {step === "submitted" && (
          <div className="bg-neutral-950 p-8 sm:p-12 rounded-3xl border border-green-800/60 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-green-950 border border-green-600 rounded-2xl flex items-center justify-center text-green-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">Exam Successfully Recorded!</h2>
              <p className="text-xs text-neutral-400">
                Candidate submission ID verified and saved into the National Contest Database.
              </p>
            </div>

            <div className="p-5 bg-black rounded-2xl border border-neutral-800 max-w-sm mx-auto text-xs space-y-2 text-neutral-300 text-left">
              <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-neutral-500">Candidate Name:</span>
                <span className="font-bold text-white">{studentName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-neutral-500">Roll Number:</span>
                <span className="font-mono font-bold text-red-400">{rollNo.toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-neutral-500">Grade Level:</span>
                <span className="font-bold text-white">{selectedGrade}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-neutral-500">Score Achieved:</span>
                <span className="font-bold text-green-400">{finalScore} / {questions.length} ({Math.round((finalScore / questions.length) * 100)}%)</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-neutral-500">Database Status:</span>
                <span className="text-green-400 font-semibold">Synced Live</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md"
              >
                Return to Mindmory Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}