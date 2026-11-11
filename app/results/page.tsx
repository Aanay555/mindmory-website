"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Award, 
  Search, 
  Trophy, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Calendar,
  Building2,
  GraduationCap,
  Clock,
  PlayCircle
} from "lucide-react";

const baseStudentNames = [
  "Muhammad Rayyan", "Ayesha Fatima", "Zaid Ahmed", "Fatima Zahra", "Hamza Ali",
  "Anaya Khan", "Bilal Tariq", "Hania Amir", "Usman Ghani", "Meerab Shah",
  "Syed Daniyal", "Eshal Imran", "Mustafa Kamal", "Dua Malik", "Ayaan Siddiqui",
  "Zainab Bibi", "Hashir Mehmood", "Sarah Naveed", "Saad Rizvi", "Alishba Noor",
  "Umer Farooq", "Bareera Junaid", "Farhan Akhtar", "Kinza Hashmi", "Taha Qureshi"
];

const schoolList = [
  "The City School (PAF Chapter)", "Beaconhouse School System", "Army Public School (APS)",
  "Karachi Grammar School", "Lahore Grammar School", "Habib Public School",
  "Generation's School", "Foundation Public School", "Roots Millennium", "Froebel's International"
];

const categoriesList = [
  "General Knowledge", "Art & Creative Expression", "Science & Discovery", "Mathematics Olympiad"
];

// Fallback base 100 students
function getInitial100() {
  return Array.from({ length: 100 }, (_, i) => {
    const rollNumber = `MM-2026-${1001 + i}`;
    const name = baseStudentNames[i % baseStudentNames.length] + (i >= 25 ? ` (${Math.floor(i / 25) + 1})` : "");
    const gradeNum = (i % 10) + 1;
    const grade = gradeNum === 10 ? "O Levels / Grade 10" : `Grade ${gradeNum}`;
    const school = schoolList[i % schoolList.length];
    const category = categoriesList[i % categoriesList.length];

    return {
      rollNo: rollNumber,
      name,
      fatherName: "Guardian of " + name,
      grade,
      category,
      school,
      payment_status: "approved",
      testScore: i % 4 === 0 ? "5/5" : i % 5 === 0 ? "4/5" : null,
      testPercentage: i % 4 === 0 ? 100 : i % 5 === 0 ? 80 : null,
      testStatus: i % 4 === 0 || i % 5 === 0 ? "Completed" : "Pending"
    };
  });
}

export default function ResultsPage() {
  const [searchRoll, setSearchRoll] = useState("");
  const [searchError, setSearchError] = useState("");
  const [candidateResult, setCandidateResult] = useState<any>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setCandidateResult(null);

    let cleanRoll = searchRoll.trim().toUpperCase();
    if (/^\d{4}$/.test(cleanRoll)) {
      cleanRoll = `MM-2026-${cleanRoll}`;
    }

    if (!cleanRoll) {
      setSearchError("Please enter candidate Roll Number.");
      return;
    }

    // 1. Gather all candidates from Admin & Registration localStorage
    let allCandidates: any[] = [];
    const base100 = getInitial100();
    const map = new Map<string, any>();

    base100.forEach((st) => map.set(st.rollNo.toUpperCase(), st));

    if (typeof window !== "undefined") {
      try {
        const s1 = localStorage.getItem("mindmory_students");
        if (s1) {
          const list1 = JSON.parse(s1);
          if (Array.isArray(list1)) {
            list1.forEach((st: any) => {
              if (st.rollNo) map.set(st.rollNo.toUpperCase(), { ...map.get(st.rollNo.toUpperCase()), ...st });
            });
          }
        }

        const s2 = localStorage.getItem("mindmory_registered_students");
        if (s2) {
          const list2 = JSON.parse(s2);
          if (Array.isArray(list2)) {
            list2.forEach((st: any) => {
              if (st.rollNo) map.set(st.rollNo.toUpperCase(), { ...map.get(st.rollNo.toUpperCase()), ...st });
            });
          }
        }
      } catch {}
    }

    allCandidates = Array.from(map.values());

    // 2. Find Candidate
    const found = allCandidates.find((c) => c.rollNo?.toUpperCase() === cleanRoll);

    if (found) {
      setCandidateResult(found);
    } else {
      setSearchError(`No registration found with Roll Number "${cleanRoll}". Please check your slip and try again.`);
    }
  };

  const getAward = (pct: number) => {
    if (pct >= 90) return { title: "National Gold Distinction Medalist", badge: "bg-amber-950 border-amber-800 text-amber-300" };
    if (pct >= 75) return { title: "Silver Merit Distinction Certificate", badge: "bg-slate-900 border-slate-700 text-slate-200" };
    if (pct >= 50) return { title: "Bronze Achiever Certificate", badge: "bg-neutral-900 border-neutral-700 text-amber-500" };
    return { title: "Official Certificate of Participation", badge: "bg-neutral-900 border-neutral-800 text-neutral-400" };
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-red-500 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>Central Assessment Directorate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Official Competition Results Gazette
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Verify official test scores, marksheet appraisal, and national merit standing for Session 2026-2027.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-7 shadow-2xl text-left space-y-4">
          <form onSubmit={handleLookup} className="space-y-3">
            <label className="block text-xs font-bold text-neutral-300 flex justify-between">
              <span>Candidate Roll Number</span>
              <span className="text-[10px] text-neutral-500 font-mono">e.g. MM-2026-1101 ya 1101</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="Enter Roll Number (e.g. 1001, 1101, 1102)..."
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white tracking-widest uppercase focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search Gazette</span>
              </button>
            </div>
          </form>

          {searchError && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* RESULT CARD IF FOUND */}
        {candidateResult && (
          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-left animate-in fade-in duration-200">
            
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-900 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-500 flex items-center justify-center font-bold">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest block">
                    AUTHENTICATED CANDIDATE RECORD
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{candidateResult.name}</h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Marksheet</span>
              </button>
            </div>

            {/* Candidate Metadata Strip */}
            <div className="bg-black border border-neutral-850 p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Roll Number</span>
                <span className="font-mono font-bold text-red-400 block text-sm">{candidateResult.rollNo}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Class Division</span>
                <span className="font-bold text-white block">{candidateResult.grade}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Category</span>
                <span className="font-bold text-amber-400 block">{candidateResult.category}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Institution</span>
                <span className="font-bold text-neutral-300 truncate block">{candidateResult.school}</span>
              </div>
            </div>

            {/* If test was completed */}
            {candidateResult.testStatus === "Completed" && candidateResult.testScore ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black border border-neutral-850 p-4 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Marks Secured</span>
                    <span className="text-3xl font-black font-mono text-red-500">{candidateResult.testScore}</span>
                    <span className="text-[11px] text-neutral-400 block">Marks Obtained</span>
                  </div>

                  <div className="bg-black border border-neutral-850 p-4 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Performance Rate</span>
                    <span className="text-3xl font-black font-mono text-green-400">
                      {candidateResult.testPercentage || Math.round((parseInt(candidateResult.testScore) / 5) * 100)}%
                    </span>
                    <span className="text-[11px] text-neutral-400 block">Accuracy</span>
                  </div>

                  <div className="bg-black border border-neutral-850 p-4 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Secretariat Status</span>
                    <span className="text-base font-black text-white pt-2 block">Officially Verified</span>
                    <span className="text-[11px] text-green-400 block">Gazette Recorded</span>
                  </div>
                </div>

                {/* Appraisal Badge */}
                {(() => {
                  const pct = candidateResult.testPercentage || Math.round((parseInt(candidateResult.testScore) / 5) * 100);
                  const aw = getAward(pct);
                  return (
                    <div className={`p-4 rounded-2xl border flex items-center justify-between ${aw.badge}`}>
                      <div className="flex items-center gap-2.5">
                        <Award className="w-5 h-5 shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase font-mono font-bold block">HONOR & APPRAISAL STATUS</span>
                          <span className="text-sm font-black text-white">{aw.title}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded">
                        CONFERRED
                      </span>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* If Candidate is registered but hasn't taken exam yet */
              <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Candidate is Registered • Examination Paper Pending</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Candidate record is verified in the central registry. However, the online computerized exam has not been attempted or submitted yet.
                </p>
                <div className="pt-2">
                  <Link
                    href={`/exam-terminal?roll=${encodeURIComponent(candidateResult.rollNo)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Attempt Online Test Now →</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
