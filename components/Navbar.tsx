"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShieldCheck,
  Home,
  Info,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Download,
  Phone,
  UserPlus,
  Laptop,
  Trophy,
  ChevronRight,
} from "lucide-react";

const MAIN_PAGES = [
  { href: "/", label: "Home", icon: Home },
  { href: "/syllabus", label: "Syllabus", icon: BookOpen },
  { href: "/paper-pattern", label: "Model Papers", icon: FileText },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/results", label: "Results", icon: Trophy },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function NavbarBrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 group select-none shrink-0"
    >
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-md group-hover:bg-red-500/30 transition-all duration-300" />
        <div className="relative w-full h-full bg-neutral-950 border border-neutral-800 group-hover:border-red-600 rounded-2xl flex items-center justify-center shadow-inner p-1">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
            aria-hidden="true"
          >
            {/* Left Orange Brain */}
            <path
              d="M30 12C24.5 12 20 15.8 20 21C17.8 22 16.5 24.2 16.5 26.8C16.5 29.8 18.4 32.3 21.1 33.2C22.2 35.8 24.8 37.5 27.8 37.5H30V12Z"
              fill="#F97316"
            />
            <circle cx="23.5" cy="21.5" r="1.6" fill="#0A0A0A" />
            <circle cx="25.5" cy="28" r="1.6" fill="#0A0A0A" />
            <path d="M21 25.5H27" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />

            {/* Right Digital Brain */}
            <path
              d="M34 12C39.5 12 44 15.8 44 21C46.2 22 47.5 24.2 47.5 26.8C47.5 29.8 45.6 32.3 42.9 33.2C41.8 35.8 39.2 37.5 36.2 37.5H34V12Z"
              fill="#38BDF8"
            />
            <rect x="37" y="16" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="41" y="21" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="37" y="26" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="44" y="13" width="2.5" height="2.5" fill="#F97316" />
            <rect x="17" y="13" width="2.5" height="2.5" fill="#38BDF8" />

            {/* Open Book Base */}
            <path
              d="M10 24L30 39V52L10 43V24Z"
              fill="#F97316"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M54 24L34 39V52L54 43V24Z"
              fill="#1E3A8A"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 29V46L30 55M56 29V46L34 55"
              stroke="#F97316"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="text-left leading-tight">
        <div className="font-black tracking-normal text-white text-base sm:text-lg flex items-center font-sans">
          <span>MIND</span>
          <span className="text-red-500 font-extrabold">MORY</span>
        </div>
        <span className="text-[9px] sm:text-[10px] italic tracking-wide text-amber-400/90 block font-medium">
          Where Memories Whisper Loud
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-2.5 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <NavbarBrandLogo onClick={() => setMobileOpen(false)} />

        {/* DESKTOP MENU (Sirf Laptop/Desktop par dikhega) */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-bold">
          {MAIN_PAGES.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition ${
                  active
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : item.href === "/results"
                    ? "text-amber-400 hover:text-amber-300 hover:bg-neutral-900"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/student-login"
            className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ml-1 ${
              isLinkActive("/student-login")
                ? "bg-amber-400 text-black border-amber-300"
                : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-100 hover:text-white"
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-red-500" />
            <span>Candidate Desk</span>
          </Link>

          <Link
            href="/register"
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 shadow-md ml-1 ${
              isLinkActive("/register")
                ? "bg-amber-400 text-black"
                : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
            }`}
          >
            <span>Register</span>
          </Link>
        </nav>

        {/* MOBILE / TABLET HAMBURGER BUTTON (Phone par sirf yeh button dikhega) */}
        <button
          type="button"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="xl:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-red-600 text-white shrink-0 cursor-pointer transition"
        >
          {mobileOpen ? (
            <>
              <X className="w-5 h-5 text-red-500" />
              <span className="text-xs font-bold text-red-400">Close</span>
            </>
          ) : (
            <>
              <Menu className="w-5 h-5 text-white" />
              <span className="text-xs font-bold text-neutral-200">Menu</span>
            </>
          )}
        </button>
      </div>

      {/* MOBILE DRAWER MENU (Har Page Highlight + Browser URL Navigation) */}
      {mobileOpen && (
        <div className="xl:hidden bg-neutral-950 border-t border-neutral-800 mt-2.5 pt-3 pb-5 px-1 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              All Pages
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              Active Page: {pathname}
            </span>
          </div>

          <nav className="space-y-1.5">
            {MAIN_PAGES.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition border ${
                    active
                      ? "bg-red-600/20 border-red-500 text-white shadow-md shadow-red-600/20"
                      : "bg-neutral-900/70 border-neutral-800/80 text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        active
                          ? "bg-red-600 text-white"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="block">{item.label}</span>
                      <span className="text-[10px] font-mono font-normal text-neutral-400">
                        {item.href}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {active && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                        Active
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 ${
                        active ? "text-red-400" : "text-neutral-600"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Candidate Desk & Registration Buttons */}
          <div className="pt-2.5 border-t border-neutral-800 grid grid-cols-2 gap-2.5">
            <Link
              href="/student-login"
              onClick={() => setMobileOpen(false)}
              className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                isLinkActive("/student-login")
                  ? "bg-amber-400 text-black border-amber-300"
                  : "bg-neutral-900 border-neutral-700 text-amber-400"
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Candidate Desk</span>
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                isLinkActive("/register")
                  ? "bg-amber-400 text-black border-amber-300"
                  : "bg-red-600 hover:bg-red-700 border-red-500 text-white"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </Link>
          </div>

          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between border transition ${
              isLinkActive("/admin")
                ? "bg-red-600/20 border-red-500 text-white"
                : "bg-black border-neutral-800 text-neutral-300 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Admin Login</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">/admin</span>
          </Link>
        </div>
      )}
    </header>
  );
}
