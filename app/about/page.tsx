"use client";
import React from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { ShieldCheck, Sparkles, Target, Eye, Award, CheckCircle2, ArrowRight, Laptop } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "100% Online & Accessible",
      desc: "Empowering students to compete conveniently from home via digital assessment links, ensuring an accessible and pressure-free environment.",
      icon: <Laptop className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Fair & Merit-Driven Evaluation",
      desc: "Standardized objective assessment rubrics and impartial evaluations ensuring equal opportunity for candidates across Pakistan.",
      icon: <Sparkles className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Prestigious National Rewards",
      desc: "Honoring academic excellence with Smart Tablets, Cash Prizes, Gold, Silver & Bronze Medals, and official certificates.",
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
            Where memories whisper loud. Fostering cognitive excellence in General Knowledge and inspiring young minds from Class 1 to Grade 10 / O Levels across Pakistan.
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
            Our mission is to cultivate lifelong curiosity and critical thinking by organizing accessible, premier online General Knowledge and creative academic contests. We empower students from Class 1 through Grade 10 & O Levels to learn beyond textbooks and celebrate intellectual discovery.
          </p>
        </div>

        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Our Vision</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            To create an empowering national platform where young talent is recognized and rewarded. We envision a generation of curious thinkers equipped with global awareness, analytical skills, and confidence to make milestone memories on a prestigious stage.
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
          <h3 className="text-2xl font-black">Ready to Register for Mindmory 2026?</h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Enrolments are open for candidates from Class 1 to Grade 10 & O Levels. Take the exam conveniently from home.
          </p>
          <a
            href={`https://wa.me/${siteContent.header.whatsapp}?text=Mindmory%20Contest%20Registration%20Inquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            <span>Register via WhatsApp</span> <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}