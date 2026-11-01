"use client";
import React from "react";
import { siteContent } from "@/data/content";
import { Clock, CheckSquare, Award, AlertCircle, ArrowRight } from "lucide-react";

export default function PaperPatternPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Marking Rubrics</span>
          <h1 className="text-4xl sm:text-5xl font-black">Contest Paper Pattern & Structure</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Standardized evaluation systems ensuring 100% fair and transparent assessment for General Knowledge papers and Art jury rubrics.
          </p>
        </div>
      </section>

      {/* 2 Rounds Detail Cards */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Round 1 */}
        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase text-red-500">Stage 01</span>
              <h2 className="text-2xl font-black text-white mt-1">Elimination Round (School Level)</h2>
            </div>
            <span className="bg-red-950 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-800">
              Handwritten / Campus Test
            </span>
          </div>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Total Questions:</span>
              <span className="font-bold text-white">20 Questions (MCQs & Blanks)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Total Time Allowed:</span>
              <span className="font-bold text-white">20 Minutes</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Marking Scheme:</span>
              <span className="font-bold text-white">1 Mark per correct answer (No negative marking)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Advancement Threshold:</span>
              <span className="font-bold text-red-400">Students scoring 90% and above advance to Finale</span>
            </div>
          </div>
        </div>

        {/* Round 2 */}
        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase text-red-500">Stage 02</span>
              <h2 className="text-2xl font-black text-white mt-1">National Grand Finale</h2>
            </div>
            <span className="bg-red-950 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-800">
              Speed & Precision Final
            </span>
          </div>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Total Questions:</span>
              <span className="font-bold text-white">30 Rapid MCQs</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Total Time Allowed:</span>
              <span className="font-bold text-white">20 Minutes</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Trophy Deciding Formula:</span>
              <span className="font-bold text-red-400">100% Accuracy + Fastest Time Submission</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Art Finale Evaluation:</span>
              <span className="font-bold text-white">Originality (40%), Technique (30%), Storytelling (30%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Box */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
            <AlertCircle className="w-5 h-5" /> Important Instructions for Invigilators & Students
          </div>
          <ul className="text-xs text-neutral-400 space-y-2 list-disc pl-5">
            <li>Question papers and answer sheets will be dispatched to registered centers 10 days prior to the test date.</li>
            <li>All Art submissions must be original, unstamped student work verified with the official school stamp on the reverse side.</li>
            <li>No electronic devices, calculators, or supplementary reference material are permitted in the examination room.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}