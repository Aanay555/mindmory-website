"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export default function Logo({ size = "md", withText = true }: LogoProps) {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  }[size];

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-red-600/30 rounded-2xl blur-md group-hover:bg-red-500/50 transition-all duration-300" />
        <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-black to-neutral-950 border border-red-600/60 group-hover:border-red-500 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:6px_6px] opacity-20" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#dc2626" fillOpacity="0.25" stroke="#ef4444" />
            <path d="M6 9.5v5c0 3 2.686 5.5 6 5.5s6-2.5 6-5.5v-5" stroke="#ef4444" />
            <path d="M22 7v6" stroke="#f59e0b" />
            <circle cx="12" cy="15" r="1.5" fill="#f59e0b" stroke="#f59e0b" />
          </svg>
        </div>
      </div>

      {withText && (
        <div className="text-left leading-tight">
          <div className="font-black tracking-wider text-white text-base sm:text-lg flex items-center gap-1 font-sans">
            <span>MIND</span>
            <span className="text-red-500 font-extrabold">MORY</span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">
            ACADEMIC PORTAL
          </span>
        </div>
      )}
    </Link>
  );
}
