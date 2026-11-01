"use client";
import React, { useState } from "react";
import { siteContent } from "@/data/content";
import { Search, Trophy, CheckCircle, FileText, Download, Award } from "lucide-react";

export default function ResultsPage() {
  const [rollNo, setRollNo] = useState("");
  const [searched, setSearched] = useState(false);
  const [candidateData, setCandidateData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim()) return;

    setSearched(true);
    // Demo dynamic lookup simulation
    if (rollNo === "10245" || rollNo.toLowerCase() === "demo") {
      setCandidateData({
        found: true,
        name: "Muhammad Ali",
        roll: rollNo,
        grade: "Grade 5 (Junior - II)",
        contest: "General Knowledge 2026–27",
        school: "Beaconhouse School System, Karachi",
        status: "Qualified for Grand Finale",
        score: "96%",
        rank: "National Rank 3rd",
      });
    } else {
      setCandidateData({
        found: false,
        roll: rollNo,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Candidate Verification</span>
          <h1 className="text-4xl sm:text-5xl font-black">Official Results Portal 2026–27</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Search elimination round standing, final marks, and grand finale eligibility by Roll Number or Institute Code.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <form onSubmit={handleSearch} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Enter Roll Number (e.g. 10245)..."
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="flex-1 bg-black border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 font-bold text-sm px-8 py-3 rounded-xl transition text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </form>

        {searched && candidateData && (
          <div className="mt-8">
            {candidateData.found ? (
              <div className="bg-neutral-950 border-2 border-red-600/70 rounded-2xl p-8 space-y-6 shadow-2xl">
                <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-red-500">Candidate Verified</span>
                    <h2 className="text-2xl font-black text-white">{candidateData.name}</h2>
                    <p className="text-xs text-neutral-400">Roll No: {candidateData.roll}</p>
                  </div>
                  <span className="bg-red-950 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full border border-red-800">
                    {candidateData.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-black p-4 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 block">Participating Contest</span>
                    <span className="font-bold text-white text-sm">{candidateData.contest}</span>
                  </div>
                  <div className="bg-black p-4 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 block">Class Level</span>
                    <span className="font-bold text-white text-sm">{candidateData.grade}</span>
                  </div>
                  <div className="bg-black p-4 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 block">School Center</span>
                    <span className="font-bold text-white text-sm">{candidateData.school}</span>
                  </div>
                  <div className="bg-black p-4 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500 block">Total Score</span>
                    <span className="font-extrabold text-red-500 text-sm">{candidateData.score} ({candidateData.rank})</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-neutral-700 transition">
                    <Download className="w-4 h-4" /> Download Official Result Card (PDF)
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center space-y-3">
                <p className="text-sm font-bold text-white">Record Not Found for "{candidateData.roll}"</p>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Please verify your Roll Number with your school coordinator or try typing "10245" to see a sample result card.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}