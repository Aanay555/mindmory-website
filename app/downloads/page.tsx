"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  BookOpen,
  Award,
  Building2,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import type { CustomDownloadDoc } from "@/components/DownloadsManager";

interface DefaultDocItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
  fileName: string;
  iconType: "form" | "syllabus" | "paper" | "awards";
  printableSections: { heading: string; points: string[] }[];
}

const DEFAULT_DOCS: DefaultDocItem[] = [
  {
    id: "default_reg_form",
    title: "Official School Registration Form 2026–27 (PDF)",
    badge: "Institutional Form",
    desc: "Official bulk enrollment form for registered schools (Class 1 to Grade 10 & O Levels). Download, fill candidate details, and submit to MINDMORY Secretariat.",
    fileName: "MINDMORY-School-Registration-Form-2026.pdf",
    iconType: "form",
    printableSections: [
      {
        heading: "1. INSTITUTIONAL DETAILS (TO BE FILLED BY SCHOOL PRINCIPAL / COORDINATOR)",
        points: [
          "School / Institution Name: ________________________________________________",
          "Campus Address & City: ___________________________________________________",
          "Principal / Coordinator Name: _____________________________________________",
          "Official School WhatsApp & Phone: _________________________________________",
          "Official School Email Address: ____________________________________________",
        ],
      },
      {
        heading: "2. CANDIDATE ENROLLMENT ROSTER (PKR 1,100 PER CANDIDATE)",
        points: [
          "Candidate 01 | Full Name: _______________________ | Father Name: _______________________ | Grade: _____ | Category: _______________",
          "Candidate 02 | Full Name: _______________________ | Father Name: _______________________ | Grade: _____ | Category: _______________",
          "Candidate 03 | Full Name: _______________________ | Father Name: _______________________ | Grade: _____ | Category: _______________",
          "Candidate 04 | Full Name: _______________________ | Father Name: _______________________ | Grade: _____ | Category: _______________",
          "Candidate 05 | Full Name: _______________________ | Father Name: _______________________ | Grade: _____ | Category: _______________",
        ],
      },
      {
        heading: "3. FEE DEPOSIT & SECRETARIAT SUBMISSION INSTRUCTIONS",
        points: [
          "Entry Fee: PKR 1,100 per candidate (Institutional school-based enrollment only; individual home applications are not permitted).",
          "Attach Bank Deposit Slip copy with this signed & stamped form and forward to MINDMORY Central Secretariat.",
          "Principal Signature & Official School Stamp: _______________________________   Date: _______________",
        ],
      },
    ],
  },
  {
    id: "default_syllabus",
    title: "Grade-Wise Official Syllabus Circular (Grades 1–10)",
    badge: "Curriculum PDF",
    desc: "Complete English-medium syllabus guidelines for General Knowledge, Science & Discovery, and Art & Creative Expression.",
    fileName: "MINDMORY-Official-Syllabus-2026.pdf",
    iconType: "syllabus",
    printableSections: [
      {
        heading: "JUNIOR DIVISION (GRADES 1 – 3)",
        points: [
          "General Knowledge: Basic Science, Plants & Animals, Solar System, Pakistan National Symbols, Good Habits & Everyday Awareness.",
          "Art & Creative Expression: My Favorite Season, Nature & Wildlife, My Dream School (Crayons, Color Pencils, Watercolors).",
        ],
      },
      {
        heading: "ELEMENTARY DIVISION (GRADES 4 – 6)",
        points: [
          "General Knowledge: World Geography, Famous Inventions, Human Body, Space Exploration, Islamic & Pakistan History, Current Affairs.",
          "Art & Creative Expression: Save Planet Earth, Cultural Heritage of Pakistan, Science & Future Innovation.",
        ],
      },
      {
        heading: "SENIOR DIVISION (GRADES 7 – 10 & O LEVELS)",
        points: [
          "General Knowledge: Global Affairs, Modern Science & AI, World Economy, Environmental Challenges, Analytical & Logical Reasoning.",
          "Art & Creative Expression: Sustainable Future, Peace & Unity, Digital World vs. Nature (Multi-Medium Sketching & Painting).",
        ],
      },
    ],
  },
  {
    id: "default_model_paper",
    title: "Model Papers & 30-MCQ Exam Pattern Guide",
    badge: "Exam Prep PDF",
    desc: "Official computerized test structure, 15-minute timer rules, marking scheme, and sample English-medium MCQs.",
    fileName: "MINDMORY-Model-Paper-Guide-2026.pdf",
    iconType: "paper",
    printableSections: [
      {
        heading: "EXAMINATION STRUCTURE & MARKING SCHEME",
        points: [
          "Medium of Examination: English Only | Total Questions: 30 Objective MCQs | Total Time: 15 Minutes.",
          "Scoring Rule: +1 Mark for each correct answer | Zero negative marking | Auto-submission upon timer expiry.",
          "Anti-Cheat Protocol: Tab switching or window minimization is strictly monitored during live online assessment.",
        ],
      },
      {
        heading: "SAMPLE PRACTICE MCQs",
        points: [
          "Q1. Which planet in our solar system is known as the Red Planet? (A) Venus  (B) Mars [Correct]  (C) Jupiter  (D) Saturn",
          "Q2. Who designed the national flag of Pakistan? (A) Allama Iqbal  (B) Amiruddin Kidwai [Correct]  (C) Liaquat Ali Khan  (D) Hafeez Jullundhri",
          "Q3. Which gas do plants absorb from the atmosphere during photosynthesis? (A) Oxygen  (B) Nitrogen  (C) Carbon Dioxide [Correct]  (D) Hydrogen",
        ],
      },
    ],
  },
  {
    id: "default_awards",
    title: "National Distinction Awards & Honors Criteria",
    badge: "Honors PDF",
    desc: "Official medal thresholds, distinction certificates, and Best Participating School Trophy evaluation criteria.",
    fileName: "MINDMORY-Awards-Criteria-2026.pdf",
    iconType: "awards",
    printableSections: [
      {
        heading: "STUDENT MEDALS & MERIT CERTIFICATES",
        points: [
          "National Gold Medal + Gold Distinction Certificate: 85% and above score (Top National Rankers).",
          "National Silver Medal + Silver Distinction Certificate: 70% to 84% score.",
          "National Bronze Medal + Bronze Merit Certificate: 55% to 69% score.",
          "Official Participation Certificate: Awarded to every verified candidate appearing in the examination.",
        ],
      },
      {
        heading: "INSTITUTIONAL HONORS",
        points: [
          "Best Participating School Trophy: Awarded to institutions with highest student participation and top cumulative merit scores.",
          "Principal & Coordinator Honor Shields: Official institutional recognition awarded at the Annual Prize Distribution Ceremony.",
        ],
      },
    ],
  },
];

export default function DownloadsPage() {
  const [customDocs, setCustomDocs] = useState<CustomDownloadDoc[]>([]);
  const [previewDoc, setPreviewDoc] = useState<DefaultDocItem | null>(null);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindmory_custom_downloads");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCustomDocs(parsed);
      }
      const hidden = localStorage.getItem("mindmory_hidden_default_downloads");
      if (hidden) {
        const parsedHidden = JSON.parse(hidden);
        if (Array.isArray(parsedHidden)) setHiddenIds(parsedHidden);
      }
    } catch {}
  }, []);

  const renderIcon = (type: DefaultDocItem["iconType"]) => {
    switch (type) {
      case "form":
        return <Building2 className="w-5 h-5 text-red-500" />;
      case "syllabus":
        return <BookOpen className="w-5 h-5 text-amber-400" />;
      case "paper":
        return <FileText className="w-5 h-5 text-green-400" />;
      case "awards":
        return <Award className="w-5 h-5 text-red-400" />;
    }
  };

  const handleOpenPrintablePdf = (doc: DefaultDocItem) => {
    setPreviewDoc(doc);
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pb-20">
      {/* Pictorial Banner */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=95"
          alt="MINDMORY Official Downloads Center"
          className="w-full h-60 sm:h-72 object-cover object-center brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 flex items-center justify-center px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest drop-shadow">
              SECRETARIAT RESOURCE DESK • 2026–2027
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow">
              Official Downloads &amp; Forms
            </h1>
            <p className="text-neutral-200 text-xs sm:text-sm max-w-2xl mx-auto drop-shadow">
              Direct PDF downloads for institutional registration forms, syllabus circulars, model papers, and national awards criteria.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 text-left">
        {/* Top Action Bar with Direct Link to Admin Publisher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3.5">
          <p className="text-xs text-neutral-300">
            Click <strong className="text-white">Download PDF</strong> on any document below to save or print its official A4 PDF copy.
          </p>
          <Link
            href="/admin"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-red-600 rounded-xl text-xs font-bold text-amber-400 transition shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin: Add / Edit PDFs</span>
          </Link>
        </div>

        {/* ADMIN-UPLOADED LIVE DOCUMENTS (SHOWN FIRST WHEN AVAILABLE) */}
        {customDocs.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-black uppercase tracking-wider text-amber-400">
                Latest Official Releases &amp; Uploaded PDFs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {customDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-gradient-to-br from-neutral-950 to-red-950/20 border border-red-900/60 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-300">
                        {doc.badge}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Updated: {doc.updatedAt}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white">{doc.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">{doc.description}</p>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3 border-t border-neutral-900">
                    <span className="text-[11px] font-mono text-neutral-400 truncate">
                      {doc.fileName}
                    </span>
                    <a
                      href={doc.fileDataUrl}
                      download={doc.fileName}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shrink-0 shadow-lg shadow-red-600/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4 CORE OFFICIAL DOCUMENTS — ALL DIRECT PDF DOWNLOADS */}
        <section className="space-y-4">
          <h2 className="text-lg font-black text-white">
            Core Competition Forms &amp; Official Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEFAULT_DOCS.filter((d) => !hiddenIds.includes(d.id)).map((item) => (
              <div
                key={item.id}
                className="bg-neutral-950 border border-neutral-850 hover:border-red-600 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      {renderIcon(item.iconType)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-neutral-500 truncate">
                    {item.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenPrintablePdf(item)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shrink-0 shadow-lg shadow-red-600/30"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PRINTABLE A4 DOCUMENT MODAL (AUTO-TRIGGERS SAVE AS PDF) */}
      {previewDoc && (
        <div
          onClick={() => setPreviewDoc(null)}
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-neutral-900 rounded-2xl max-w-3xl w-full p-8 shadow-2xl relative space-y-6 my-8 text-left"
          >
            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              className="print:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 hover:bg-red-600 hover:text-white text-neutral-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b-2 border-red-600 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 block">
                  MINDMORY NATIONAL ACADEMIC CONTEST • PAKISTAN
                </span>
                <h2 className="text-xl font-black text-black mt-0.5">{previewDoc.title}</h2>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-neutral-100 border border-neutral-300 rounded">
                SESSION 2026–27
              </span>
            </div>

            <div className="space-y-5">
              {previewDoc.printableSections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1.5 rounded">
                    {sec.heading}
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-800 pl-2">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed border-b border-neutral-100 pb-1.5">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-300 flex items-center justify-between text-[11px] text-neutral-600">
              <span>MINDMORY Central Enrollment Secretariat • Where Memories Whisper Loud</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="print:hidden px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Save / Print PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
