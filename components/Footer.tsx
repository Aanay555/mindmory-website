"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Lock,
  Loader2
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [liveWhatsapp, setLiveWhatsapp] = useState("923097864722");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.whatsapp) setLiveWhatsapp(data.whatsapp);
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // Fallback
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "YouTube", href: "https://youtube.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-black text-neutral-300 font-sans border-t border-neutral-900">
      {/* 1. DYNAMIC SUBSCRIBER BANNER */}
      <div className="bg-gradient-to-r from-neutral-950 via-red-950/60 to-neutral-950 border-b border-red-900/50 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <span className="text-red-500 font-extrabold uppercase text-xs tracking-widest block">
              Stay Informed
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Subscribe for Competition Alerts & Circulars
            </h3>
            <p className="text-xs text-neutral-400">
              Get official dispatch updates, syllabus circulars, and Grand Finale schedules directly in your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-600 px-6 py-3 rounded-xl text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Thank you! Your email is registered for official MINDMORY circulars.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter school or coordinator email..."
                  className="bg-black/90 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-600 sm:w-80"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 font-bold text-xs px-6 py-3 rounded-xl transition text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{submitting ? "Saving..." : "Subscribe"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-xs">
        <div className="lg:col-span-4 space-y-4">
          <Link href="/" className="inline-block font-black text-2xl tracking-wider text-white">
            MIND<span className="text-red-600">MORY</span>
          </Link>
          <p className="text-neutral-400 leading-relaxed text-xs">
            Where memories whisper loud. Pakistan’s premier academic platform organizing transparent, merit-based school competitions in General Knowledge and Creative Arts.
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2.5">
              Official Social Channels:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-600 hover:bg-red-950/60 transition text-xs font-semibold"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-neutral-800 pb-2">
            Navigation
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li><Link href="/" className="hover:text-red-400 transition">Home Portal</Link></li>
            <li><Link href="/about" className="hover:text-red-400 transition">About Our Vision</Link></li>
            <li><Link href="/#syllabus" className="hover:text-red-400 transition">Syllabus Breakdown</Link></li>
            <li><Link href="/#register" className="hover:text-red-400 transition">Registration & Fee</Link></li>
            <li><Link href="/exam" className="hover:text-red-400 transition">Online Exam Desk</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-neutral-800 pb-2">
            Downloads & Forms
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li><a href={`https://wa.me/${liveWhatsapp}?text=Please%20send%20School%20Registration%20Form%20PDF`} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-red-500" /> School Registration Form</a></li>
            <li><a href={`https://wa.me/${liveWhatsapp}?text=Please%20send%20Desk%20Labels%20PDF`} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-red-500" /> Desk Labels Slip (Annexure-2)</a></li>
            <li><a href={`https://wa.me/${liveWhatsapp}?text=Please%20send%20General%20Knowledge%20Syllabus%20PDF`} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-red-500" /> GK Official Sample Papers</a></li>
            <li><a href={`https://wa.me/${liveWhatsapp}?text=Please%20send%20Art%20Contest%20Guidelines%20PDF`} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-red-500" /> Art Contest Guidelines</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-neutral-800 pb-2">
            Secretariat Desk
          </h4>
          <div className="space-y-2.5 text-neutral-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Office # 402, Executive Heights, Gulberg III, Lahore, Pakistan</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span className="font-mono">+{liveWhatsapp}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>info@mindmory.org</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. COPYRIGHT STRIP */}
      <div className="border-t border-neutral-900 py-6 px-4 text-[11px] text-neutral-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 MINDMORY Competitions. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <p className="text-neutral-500 hidden sm:block">Where memories whisper loud.</p>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-red-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-neutral-900 font-semibold"
            >
              <Lock className="w-3 h-3 text-neutral-500" />
              <span>Staff & Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
