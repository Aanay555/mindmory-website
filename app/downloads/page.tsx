"use client";
import React from "react";
import { siteContent } from "@/data/content";
import { FileText, Download, CheckCircle2, ArrowRight } from "lucide-react";

export default function DownloadsPage() {
  const documents = [
    { title: "School Registration Form (Annexure - 1)", type: "Official Form", size: "480 KB", desc: "Required form for school details, coordinator contacts, and student lists." },
    { title: "Student Desk Labels Form (Annexure - 2)", type: "Official Form", size: "320 KB", desc: "Printable roll number desk slip labels for examination centers." },
    { title: "General Knowledge Detailed Syllabus 2026–27", type: "Curriculum PDF", size: "1.4 MB", desc: "Complete topic list, learning benchmarks, and question breakdown." },
    { title: "Art Contest Official Themes & Canvas Guidelines", type: "Curriculum PDF", size: "1.1 MB", desc: "Medium specifications, allowed sizes, and judging rubrics." },
    { title: "Sample Model Question Paper (GK)", type: "Past Paper", size: "650 KB", desc: "Specimen paper showing format, difficulty level, and answer keys." },
    { title: "Winners Honorarium & Shield Claim Form", type: "Official Form", size: "290 KB", desc: "Institutional award claim form for Principals and Coordinators." },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Resource Secretariat</span>
          <h1 className="text-4xl sm:text-5xl font-black">Official Forms & Syllabus Downloads</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Directly download official Annexure documents, syllabi, past sample papers, and guidelines for candidates and institutions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <div key={idx} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex justify-between items-center gap-4 hover:border-red-600 transition">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-red-950 text-red-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border border-red-800">
                    {doc.type}
                  </span>
                  <span className="text-neutral-500 text-xs">{doc.size}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">{doc.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{doc.desc}</p>
              </div>

              <a
                href={`https://wa.me/${siteContent.header.whatsapp}?text=Please%20send%20file:%20${encodeURIComponent(doc.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                title="Download Document"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}