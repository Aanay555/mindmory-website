"use client";
import React, { useState } from "react";
import { Award, Camera, Trophy, Sparkles } from "lucide-react";

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "ceremony" | "art" | "winners">("all");

  const photos = [
    { title: "National Award Distribution", category: "ceremony", url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80" },
    { title: "Gold Medalist Celebration", category: "winners", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" },
    { title: "Creative Art Showcase", category: "art", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80" },
    { title: "Grand Finale Hall", category: "ceremony", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80" },
    { title: "Student Artists at Work", category: "art", url: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&auto=format&fit=crop&q=80" },
    { title: "Trophy & Tablet Presentation", category: "winners", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80" },
  ];

  const filtered = filter === "all" ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Hall of Fame</span>
          <h1 className="text-4xl sm:text-5xl font-black">Moments of Pride & Achievement</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Relive memorable award ceremonies, grand finale moments, and brilliant student artistic expressions.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center gap-2 flex-wrap">
        {[
          { id: "all", label: "All Moments" },
          { id: "ceremony", label: "Ceremonies" },
          { id: "winners", label: "Winners & Medals" },
          { id: "art", label: "Student Artworks" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 group relative">
              <div className="h-64 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-neutral-950 border-t border-neutral-800">
                <p className="text-xs font-bold text-white">{item.title}</p>
                <span className="text-[10px] text-red-500 uppercase font-semibold">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}