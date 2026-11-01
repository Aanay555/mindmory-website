"use client";
import React from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { ShieldCheck, Sparkles, Target, Eye, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Safe & Supportive Environment",
      desc: "Providing every school student with an inclusive, encouraging, and pressure-free environment to discover their potential.",
      icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Fair & Transparent Standards",
      desc: "Equal scoring rubrics, impartial academic juries, and 100% merit-based evaluation across all provinces.",
      icon: <Sparkles className="w-8 h-8 text-red-500" />,
    },
    {
      title: "National Recognition",
      desc: "Rewarding brilliance with cash grants, laptops, tablets, shields, and verifiable lifelong certificates.",
      icon: <Award className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">About MINDMORY</span>
          <h1 className="text-4xl sm:text-5xl font-black">Our Journey & Vision</h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
            Where memories whisper loud. Fostering cognitive excellence in General Knowledge and nurturing raw visual imagination in Art across hundreds of participating schools nationwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Our Mission</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Our mission is to provide an intellectual, interactive, and competitive ecosystem for school students from Pre-Level to Grade 10. By organizing nationwide General Knowledge assessments and creative Art competitions, MINDMORY prepares young minds to excel beyond conventional school curriculums.
          </p>
        </div>

        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Our Vision</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            To be Pakistan’s leading school competition authority where academic achievements and creative masterworks become milestone memories. We strive to give teachers, coordinators, and students a transparent stage that honors their hard work.
          </p>
        </div>
      </section>

      {/* Core Values Cards */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Why We Stand Out</span>
          <h2 className="text-3xl font-black mt-1">Guiding Principles</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-red-600 transition space-y-4">
              <div>{v.icon}</div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory & Secretariat Notice */}
      <section className="py-16 px-4 bg-neutral-950 border-t border-neutral-900 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black">Ready to Enroll Your Institute?</h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Join hundreds of institutions already registered for General Knowledge & Art Contests 2026–27.
          </p>
          <a
            href={`https://wa.me/${siteContent.header.whatsapp}?text=Institute%20Registration%20Inquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            <span>Connect with Secretariat</span> <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}