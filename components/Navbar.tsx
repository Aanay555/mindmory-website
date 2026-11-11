"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Award, 
  Menu, 
  X, 
  Laptop, 
  ArrowRight,
  Phone,
  Calendar,
  Clock,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live dynamic settings from Admin API
  const [liveDeadline, setLiveDeadline] = useState("30 December 2026");
  const [liveExamDate, setLiveExamDate] = useState("15 January 2027");
  const [liveResultsDate, setLiveResultsDate] = useState("25 January 2027");
  const [liveFee, setLiveFee] = useState<number>(1100);
  const [whatsappNum, setWhatsappNum] = useState("923000000000");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.deadline) setLiveDeadline(data.deadline);
          if (data.examDate) setLiveExamDate(data.examDate);
          if (data.resultsDate) setLiveResultsDate(data.resultsDate);
          if (data.fee) setLiveFee(Number(data.fee));
          if (data.whatsapp) setWhatsappNum(data.whatsapp.replace(/[^0-9]/g, ""));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 bg-neutral-950/90 border-b border-neutral-900 backdrop-blur-md sticky top-0 z-50">
        
        {/* 1. BRAND LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            M
          </span>
          <span className="font-black text-lg tracking-wider text-white">
            MIND<span className="text-red-500">MORY</span>
          </span>
        </Link>

        {/* 2. ALL MAIN MENU LINKS (SEPARATE DEDICATED PAGES - NO POPUP MODALS) */}
        <div className="hidden xl:flex items-center gap-5 text-xs font-bold text-neutral-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-white transition">
            About Us
          </Link>

          <Link href="/paper-pattern" className="hover:text-red-400 transition">
            Paper Pattern
          </Link>

          <Link href="/syllabus" className="hover:text-white transition">
            Syllabus
          </Link>

          <Link href="/downloads" className="hover:text-white transition">
            Downloads
          </Link>

          <Link href="/gallery" className="hover:text-white transition">
            Gallery
          </Link>

          <Link href="/results" className="hover:text-red-400 transition flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>Results</span>
          </Link>

          <Link href="/contact" className="hover:text-white transition">
            Contact Us
          </Link>
        </div>

        {/* 3. RIGHT SIDE ACTIONS (STUDENT LOGIN & REGISTRATION) */}
        <div className="flex items-center gap-3">
          
          {/* Direct Link to Student Login Page (No Popup, No PIN) */}
          <Link
            href="/student-login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-neutral-200 hover:text-white transition cursor-pointer"
          >
            <Laptop className="w-3.5 h-3.5 text-red-500" />
            <span>Student Login</span>
          </Link>

          {/* Register Candidate CTA Button */}
          <Link
            href="/register"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </nav>

      {/* 4. RESPONSIVE MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[57px] bg-neutral-950 border-b border-neutral-850 p-5 space-y-3 z-40 shadow-2xl text-xs font-bold animate-in fade-in duration-150">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            About Us
          </Link>
          <Link 
            href="/paper-pattern" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-red-400 hover:text-red-300"
          >
            Paper Pattern
          </Link>
          <Link 
            href="/syllabus" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            Syllabus
          </Link>
          <Link 
            href="/downloads" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            Downloads
          </Link>
          <Link 
            href="/gallery" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            Gallery
          </Link>
          <Link 
            href="/results" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-red-400 hover:text-red-300 flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>Results</span>
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-neutral-300 hover:text-white"
          >
            Contact Us
          </Link>
          <Link 
            href="/student-login" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 text-white border-t border-neutral-900 pt-3 flex items-center gap-2"
          >
            <Laptop className="w-3.5 h-3.5 text-red-500" />
            <span>Student Login</span>
          </Link>
        </div>
      )}
    </>
  );
}
