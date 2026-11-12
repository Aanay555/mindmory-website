"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, User, School, CheckCircle2, AlertCircle, Laptop, ShieldCheck } from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const [rollInput, setRollInput] = useState("");
  const [candidate, setCandidate] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const roll = new URLSearchParams(window.location.search).get("roll");
    if (roll) setRollInput(roll);
  }, []);

  const handleSearchRoll = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setCandidate(null);

    const query = rollInput.trim().toUpperCase();
    if (!query) return;

    try {
      // 1. Check primary roster
      let allStudents: any[] = [];
      const s1 = localStorage.getItem("mindmory_students");
      if (s1) {
        try { allStudents = JSON.parse(s1); } catch {}
      }

      // 2. Check registered candidates
      const s2 = localStorage.getItem("mindmory_registered_students");
      if (s2) {
        try { 
          const custom = JSON.parse(s2);
          allStudents = [...allStudents, ...custom];
        } catch {}
      }

      // Find candidate by Roll No
      const found = allStudents.find((st: any) => 
        st.rollNo?.toUpperCase() === query || 
        st.rollNo?.replace(/\D/g, "") === query.replace(/\D/g, "")
      );

      if (found) {
        setCandidate(found);
      } else {
        setErrorMsg(`Roll Number "${query}" not found in current session database. Please check your slip.`);
      }
    } catch {
      setErrorMsg("Error accessing candidate registry.");
    }
  };

  const handleLaunchExam = () => {
    if (!candidate) return;

    // SAVE COMPLETE CANDIDATE WITH PROPER GRADE
    const candidateSession = {
      rollNo: candidate.rollNo,
      name: candidate.name,
      fatherName: candidate.fatherName || "",
      grade: candidate.grade || "Grade 1",
      category: candidate.category || "General Knowledge",
      school: candidate.school || "Registered School",
      payment_status: candidate.payment_status || "Approved"
    };

    localStorage.setItem("mindmory_current_student", JSON.stringify(candidateSession));
    router.push("/exam-terminal");
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8 text-left">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div>
          <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-widest block">
            OFFICIAL CANDIDATE TERMINAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Candidate Desk & Exam Launch
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Enter your allotted Roll Number to verify your registration, view enrolled grade, and begin online assessment.
          </p>
        </div>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearchRoll} className="space-y-3">
          <label className="block text-xs font-bold text-neutral-300">
            Candidate Roll Number (e.g. MM-2026-1001, 1002, 1005)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Enter Roll Number..."
              value={rollInput}
              onChange={(e) => setRollInput(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-red-600"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-lg shadow-red-600/30"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-800 text-red-300 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* CANDIDATE VERIFIED CARD */}
        {candidate && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Official Candidate Record</span>
              </div>
              <span className="font-mono text-xs font-black text-red-400 bg-red-950 border border-red-900 px-2.5 py-1 rounded-lg">
                {candidate.rollNo}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Candidate Name</span>
                <span className="font-bold text-white text-sm">{candidate.name}</span>
                <span className="text-neutral-400 block text-[11px]">{candidate.fatherName || "—"}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Allocated Grade & Subject</span>
                <span className="font-bold text-amber-400 text-sm">{candidate.grade}</span>
                <span className="text-neutral-400 block text-[11px]">{candidate.category}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">School / Institution</span>
                <span className="text-neutral-300 font-medium">{candidate.school}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Fee Clearance Status</span>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  (candidate.payment_status || "").toLowerCase() === "approved"
                    ? "bg-green-950 text-green-400 border border-green-800"
                    : "bg-amber-950 text-amber-400 border border-amber-800"
                }`}>
                  {candidate.payment_status || "Approved"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-900">
              <button
                type="button"
                onClick={handleLaunchExam}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 cursor-pointer"
              >
                <Laptop className="w-4 h-4" />
                <span>Launch {candidate.grade} Online Exam Terminal →</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
