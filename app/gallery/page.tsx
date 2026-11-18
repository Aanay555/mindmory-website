"use client";
import React, { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

interface PhotoItem {
  id?: string;
  title: string;
  subtitle: string;
  category: "ceremony" | "art" | "winners" | "exams";
  url: string;
  isCustom?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=95";

const defaultPhotos: PhotoItem[] = [
  // ================= 1. EXAM & QUIZ HALLS (6 IMAGES) =================
  {
    title: "Nationwide School Assessment Hall",
    subtitle: "Standardized English-Medium Examination • Grades 1–10",
    category: "exams",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Digital Computerized Quiz Terminal",
    subtitle: "15-Minute Timed Assessment & Cognitive Benchmark",
    category: "exams",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "General Knowledge & Reading Preparation",
    subtitle: "Young Scholars Focused Study Session",
    category: "exams",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Science & Discovery Olympiad Prep",
    subtitle: "Analytical Reasoning & STEM Curiosity",
    category: "exams",
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "School Library Reference & Trivia Round",
    subtitle: "World Geography, Space & History Mastery",
    category: "exams",
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Supervised Institutional Exam Desk",
    subtitle: "Strict Integrity & Merit-Based Testing",
    category: "exams",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=95",
  },

  // ================= 2. WINNERS & TROPHIES (6 IMAGES) =================
  {
    title: "National Gold Trophy & Distinction Honors",
    subtitle: "Merit Awards for Top School Achievers",
    category: "winners",
    url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Gold Medalist Scholars Celebration",
    subtitle: "Top Performing School Champions",
    category: "winners",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Best Participating School Trophy Showcase",
    subtitle: "Institutional Honors & Mentorship Shields",
    category: "winners",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "National Distinction Medals & Ribbons",
    subtitle: "Gold, Silver & Bronze Academic Recognition",
    category: "winners",
    url: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Official Merit Certificates & Appraisal",
    subtitle: "Certified Academic Achievement Dossier",
    category: "winners",
    url: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Inter-School Champion Squad",
    subtitle: "Celebrating National Top Rankers",
    category: "winners",
    url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=95",
  },

  // ================= 3. AWARD CEREMONIES (6 IMAGES) =================
  {
    title: "Annual Award Distribution Ceremony",
    subtitle: "National Academic Recognition • Pakistan",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Grand Finale Convention Auditorium",
    subtitle: "Principals, Mentors & Institutional Coordinators",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "National Conference & Academic Seminar",
    subtitle: "Educational Leadership Across Pakistan",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Keynote Address & Secretariat Briefing",
    subtitle: "Honoring Participating Schools & Educators",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Prize Distribution Stage Applause",
    subtitle: "Celebrating Student & Mentor Milestones",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Institutional Delegation & Gala Hall",
    subtitle: "Nationwide School Coordinators Gathering",
    category: "ceremony",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=95",
  },

  // ================= 4. STUDENT ARTWORKS (6 IMAGES) =================
  {
    title: "Creative Art & Painting Showcase",
    subtitle: "Primary & Secondary Theme-Based Entries",
    category: "art",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Student Artists Live Sketching Round",
    subtitle: "Visual Imagination & Color Composition",
    category: "art",
    url: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Watercolor & Pastel Canvas Expression",
    subtitle: "Multi-Medium Creative Jury Evaluation",
    category: "art",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "Fine Pencil Shading & Illustration",
    subtitle: "Grade 6 to 10 Conceptual Art Portfolio",
    category: "art",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=95&sat=15",
  },
  {
    title: "Young Painters Color Palette Studio",
    subtitle: "Primary Division Creative Storytelling",
    category: "art",
    url: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=95",
  },
  {
    title: "National Art Exhibition Wall",
    subtitle: "Selected Winning Artworks on Display",
    category: "art",
    url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1600&q=95",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "ceremony" | "art" | "winners" | "exams">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [customPhotos, setCustomPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mindmory_custom_gallery");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomPhotos(parsed);
        }
      }
    } catch {}
  }, []);

  const allPhotos = [...customPhotos, ...defaultPhotos];
  const filtered = filter === "all" ? allPhotos : allPhotos.filter((p) => p.category === filter);

  const countByCat = (cat: PhotoItem["category"]) =>
    allPhotos.filter((p) => p.category === cat).length;

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            Hall of Fame • Where Memories Whisper Loud
          </span>
          <h1 className="text-4xl sm:text-5xl font-black">
            Moments of Pride &amp; Achievement
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl mx-auto">
            Relive memorable school examination halls, national trophy ceremonies, grand finale moments, and brilliant student artistic expressions.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center gap-2 flex-wrap">
        {[
          { id: "all", label: `All Moments (${allPhotos.length})` },
          { id: "exams", label: `Exam & Quiz Halls (${countByCat("exams")})` },
          { id: "winners", label: `Winners & Trophies (${countByCat("winners")})` },
          { id: "ceremony", label: `Award Ceremonies (${countByCat("ceremony")})` },
          { id: "art", label: `Student Artworks (${countByCat("art")})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as any)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedPhoto(item)}
              className="bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600 group relative cursor-pointer transition shadow-xl"
            >
              <div className="h-64 overflow-hidden relative bg-neutral-900">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                {item.isCustom && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-950/90 border border-green-600 text-green-300 text-[10px] font-bold uppercase">
                    Official Event Photo
                  </span>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/85 border border-neutral-700 text-white text-xs font-bold flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-red-500" />
                    <span>View Full HD Photo</span>
                  </span>
                </div>
              </div>
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-neutral-400">{item.subtitle}</p>
                </div>
                <span className="text-[10px] text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded uppercase font-semibold shrink-0">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-left"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 border border-neutral-700 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full max-h-[75vh] object-cover brightness-105 contrast-105"
            />
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">{selectedPhoto.title}</h3>
                <p className="text-xs text-neutral-400">{selectedPhoto.subtitle}</p>
              </div>
              <span className="text-xs font-bold uppercase text-amber-400">
                MINDMORY Gallery
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
