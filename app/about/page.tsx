"use client";
import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Eye,
  Award,
  ArrowRight,
  Building2,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Institutional School-Based Enrollment",
      desc: "Partnering exclusively with registered schools and academic institutions across Pakistan to ensure verified candidate participation and structured mentorship.",
      icon: <Building2 className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Fair & Merit-Driven Evaluation",
      desc: "Standardized English-medium objective assessment rubrics and anti-cheating exam protocols ensuring equal opportunity for every candidate.",
      icon: <Sparkles className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Prestigious National Rewards",
      desc: "Honoring academic excellence with Gold, Silver & Bronze Medals, official distinction certificates, and the Best Participating School Trophy.",
      icon: <Award className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            About MINDMORY • Where Memories Whisper Loud
          </span>
          <h1 className="text-4xl sm:text-5xl font-black">Our Journey &amp; Vision</h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Where memories whisper loud. Fostering cognitive excellence in General Knowledge and creative expression for school students from Class 1 to Grade 10 / O Levels across Pakistan.
          </p>
        </div>
      </section>

      {/* Ultra-Crisp High-Resolution Campus & Scholars Banner */}
      <section className="pt-12 px-4 max-w-7xl mx-auto">
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=95"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=95";
            }}
            alt="MINDMORY Nationwide School Academic Competition"
            className="w-full h-full object-cover object-center brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block drop-shadow">
              NATIONWIDE ACADEMIC INITIATIVE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 drop-shadow">
              Empowering Registered Schools &amp; Young Scholars Across Pakistan
            </h2>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Our Mission</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Our mission is to cultivate lifelong curiosity and critical thinking by organizing structured, premier English-medium General Knowledge and creative academic contests through registered schools. We empower students from Class 1 through Grade 10 &amp; O Levels to learn beyond textbooks and celebrate intellectual discovery.
          </p>
        </div>

        <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Our Vision</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            To create an empowering national platform where young talent is recognized and rewarded. We envision a generation of curious thinkers equipped with global awareness, analytical skills, and confidence to make milestone memories on a prestigious institutional stage.
          </p>
        </div>
      </section>

      {/* Core Values Cards */}
      <section className="py-12 px-4 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Why We Stand Out</span>
          <h2 className="text-3xl font-black mt-1">Guiding Principles</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-red-600 transition space-y-4"
            >
              <div>{v.icon}</div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Enrollment CTA */}
      <section className="py-16 px-4 bg-neutral-950 border-t border-neutral-900 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black">Ready to Register for MINDMORY 2026?</h3>
          <p className="text-xs sm:text-sm text-neutral-300">
            Enrollments are open exclusively through registered schools &amp; institutions for candidates from Class 1 to Grade 10 &amp; O Levels. Individual applications from home are not permitted.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            >
              <span>School Enrollment Portal</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm"
            >
              <span>Contact Secretariat</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
