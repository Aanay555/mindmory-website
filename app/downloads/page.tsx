"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Laptop,
  CheckCircle2 
} from "lucide-react";

export default function DownloadsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const directDownloads = [
    {
      id: "gk-primary",
      title: "General Knowledge Model Paper (Grades 1-5)",
      desc: "Official printable bilingual question bank with answer keys for primary pupils.",
      type: "PDF Document",
      size: "A4 Printable"
    },
    {
      id: "gk-secondary",
      title: "General Knowledge Model Paper (Grades 6-10 / O Levels)",
      desc: "Analytical speed MCQs, science principles, and world affairs practice paper.",
      type: "PDF Document",
      size: "A4 Printable"
    },
    {
      id: "syllabus-booklet",
      title: "Mindmory Curriculum Outline & Topic Breakdown",
      desc: "Complete syllabus guidelines, division of marks, and jury rubric guidelines.",
      type: "Official Circular",
      size: "Brochure PDF"
    },
    {
      id: "invitation-circular",
      title: "School Principal Invitation & Registration Proposal",
      desc: "Institutional participation protocol, medal breakdown, and fee schedule circular.",
      type: "Secretariat Dispatch",
      size: "Official A4"
    }
  ];

  const handleDirectSave = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      window.print();
    }, 400);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="text-left space-y-1">
          <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-widest block">
            CENTRAL REPOSITORY
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Direct Downloads & Printable Assets
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
            Download model question papers, school circulars, and syllabus guides directly to your computer or mobile in high-resolution A4 printable PDF format.
          </p>
        </div>

        {downloadSuccess && (
          <div className="bg-green-950/80 border border-green-800 text-green-300 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span>Preparing Direct Download & Print Dossier for: "{downloadSuccess}"</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {directDownloads.map((doc) => (
            <div
              key={doc.id}
              className="bg-neutral-950 border border-neutral-850 hover:border-red-900/60 p-6 rounded-3xl space-y-4 transition shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 border border-red-900/60 px-2.5 py-0.5 rounded-full uppercase">
                    {doc.type}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">{doc.size}</span>
                </div>
                <h3 className="text-base font-black text-white">{doc.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{doc.desc}</p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDirectSave(doc.title)}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer shadow-lg shadow-red-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save to Computer (PDF)</span>
                </button>

                <Link
                  href="/paper-pattern"
                  className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Practice Online</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Need Live Computerized Assessment?</h3>
            <p className="text-xs text-neutral-400">
              Students can also take the full practice paper directly in the web browser with instant feedback.
            </p>
          </div>
          <Link
            href="/paper-pattern"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap transition"
          >
            <Laptop className="w-4 h-4 text-red-500" />
            <span>Open Practice Terminal →</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
