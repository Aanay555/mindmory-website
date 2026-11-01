"use client";
import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { Mail, Phone, MapPin, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<"login" | "signup" | null>(null);

  // Sabhi links ko seedha actual page routes par set kiya hai
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Syllabus", href: "/syllabus", isSpecial: true },
    { name: "Paper Pattern", href: "/paper-pattern" },
    { name: "Gallery", href: "/gallery" },
    { name: "Results", href: "/results", isSpecial: true },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="w-full bg-neutral-950 text-white shadow-xl sticky top-0 z-50 border-b border-neutral-800">
        {/* Top Mini Contact Bar */}
        <div className="bg-black text-neutral-400 text-xs py-2 px-4 border-b border-neutral-900">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="flex items-center gap-1.5 hover:text-red-400 transition">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                {siteContent.header.email}
              </span>
              <span className="flex items-center gap-1.5 hover:text-red-400 transition">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                {siteContent.header.phone}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {siteContent.header.address}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5 font-black text-2xl tracking-wider shrink-0">
            <span className="text-white">MIND<span className="text-red-600">MORY</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 font-semibold text-xs 2xl:text-sm text-neutral-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-1 group flex items-center gap-1.5 hover:text-white transition-colors"
              >
                {link.name}
                {link.isSpecial && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 red-blink-dot" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Login / Signup Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowAuthModal("login")}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-4 py-2 rounded-full transition border border-neutral-700"
            >
              LOGIN
            </button>
            <button
              onClick={() => setShowAuthModal("signup")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-full transition shadow-[0_0_12px_rgba(220,38,38,0.5)] border border-red-500"
            >
              SIGNUP
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="xl:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="xl:hidden bg-neutral-900 border-t border-neutral-800 px-6 py-5 space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2 border-b border-neutral-800 text-neutral-300 hover:text-red-400"
              >
                <span>{link.name}</span>
                {link.isSpecial && <span className="w-2 h-2 rounded-full bg-red-600 red-blink-dot" />}
              </Link>
            ))}

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowAuthModal("login");
                }}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs py-2.5 rounded-xl border border-neutral-700 text-center"
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowAuthModal("signup");
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl text-center"
              >
                SIGNUP
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login & Signup Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-neutral-900 border-2 border-red-600 rounded-2xl max-w-md w-full p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setShowAuthModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 mb-6">
              <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest">
                School & Candidate Portal
              </span>
              <h3 className="text-2xl font-black">
                {showAuthModal === "login" ? "Welcome Back" : "Register School"}
              </h3>
              <p className="text-xs text-neutral-400">
                {showAuthModal === "login" 
                  ? "Sign in to access candidate gazette and enrollment records" 
                  : "Create school administrator credentials"}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Portal active. Credentials verified!"); setShowAuthModal(null); }} className="space-y-3.5">
              {showAuthModal === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">School / Institute Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Institute Name"
                    className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Center Code / Email</label>
                <input
                  type="email"
                  required
                  placeholder="admin@school.edu.pk"
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 font-bold text-xs py-3 rounded-xl transition text-white mt-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                {showAuthModal === "login" ? "LOG IN" : "CREATE ACCOUNT"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-neutral-400">
              {showAuthModal === "login" ? (
                <p>
                  New institute?{" "}
                  <button onClick={() => setShowAuthModal("signup")} className="text-red-400 font-bold hover:underline">
                    Create account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button onClick={() => setShowAuthModal("login")} className="text-red-400 font-bold hover:underline">
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}