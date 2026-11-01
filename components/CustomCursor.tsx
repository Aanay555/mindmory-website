"use client";
import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "A" || el.tagName === "BUTTON" || el.closest("a") || el.closest("button")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-transform duration-100 ease-out border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] hidden md:block"
        style={{
          width: hovered ? "48px" : "26px",
          height: hovered ? "48px" : "26px",
          transform: `translate3d(${pos.x - (hovered ? 24 : 13)}px, ${pos.y - (hovered ? 24 : 13)}px, 0)`,
          backgroundColor: hovered ? "rgba(220, 38, 38, 0.2)" : "transparent",
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444] hidden md:block"
        style={{ transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)` }}
      />
    </>
  );
}