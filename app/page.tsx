"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Award,
  Calendar,
  Coins,
  Phone,
  ArrowRight,
  Sparkles,
  Plus,
  FileText,
  Clock,
  Trash2,
  X,
  CheckCircle2,
  Edit3,
  Info,
  ShieldCheck,
  CheckCircle,
  Laptop,
  Mail,
  Send,
  PlayCircle,
  Search,
  Camera,
} from "lucide-react";

interface Discipline {
  id: string;
  name: string;
  primaryTitle: string;
  primaryPoints: string[];
  secondaryTitle: string;
  secondaryPoints: string[];
  extraNotice?: string;
}

const defaultDisciplines: Discipline[] = [
  {
    id: "gk",
    name: "General Knowledge",
    primaryTitle: "Foundational Knowledge & Discovery",
    primaryPoints: [
      "Fascinating facts about science, space, nature & solar system.",
      "World geography, national symbols, flags & landmarks.",
      "History, prominent figures & global affairs.",
      "Analytical reasoning, everyday logic & observation.",
    ],
    secondaryTitle: "Advanced Intellect & Critical Thinking",
    secondaryPoints: [
      "Global affairs, international organizations & treaties.",
      "Physical geography, world capitals & modern history.",
      "Scientific breakthroughs, technology, AI & inventions.",
      "Competitive speed MCQs & critical problem-solving.",
    ],
    extraNotice:
      "Paper will be conducted exclusively in English. 30 MCQs with 15 minutes test duration.",
  },
  {
    id: "art",
    name: "Art & Creative Expression",
    primaryTitle: "Visual Imagination & Colors",
    primaryPoints: [
      "Theme-based sketch rendering and shading fundamentals.",
      "Color blending, perspective perception & canvas storytelling.",
      "Original creative compositions and structured visual balance.",
      "Cultural heritage reflections through fine strokes.",
    ],
    secondaryTitle: "Masterstroke Technique & Conceptual Art",
    secondaryPoints: [
      "Abstract conceptualization and complex themed illustrations.",
      "Multi-medium experimentation (Pastels, Watercolors, Inks).",
      "Anatomy proportions, architectural framing & contrast mastery.",
      "Portfolio evaluation under national jury standards.",
    ],
    extraNotice:
      "Drawing sheets will be supplied by Secretariat. Students must bring their own colors and pencil kit.",
  },
];

const pictorialHighlights = [
  {
    title: "Nationwide School Examination Halls",
    subtitle: "Class 1 to Grade 10 & O Levels",
    badge: "Academic Excellence",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=95",
  },
  {
    title: "Art & Creative Expression Studio",
    subtitle: "Theme-Based Sketching & Painting",
    badge: "Creative Jury",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=95",
  },
  {
    title: "Digital Computerized Exam Terminal",
    subtitle: "15-Minute Anti-Cheat Timed Assessment",
    badge: "Live Testing",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=95",
  },
  {
    title: "National Gold, Silver & Bronze Medals",
    subtitle: "Distinction Honors & School Trophies",
    badge: "National Honors",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=95",
  },
  {
    title: "General Knowledge & Science Discovery",
    subtitle: "Curiosity Beyond Classroom Textbooks",
    badge: "STEM & GK",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=95",
  },
  {
    title: "Annual Prize Distribution & Grand Finale",
    subtitle: "Celebrating Top Performing Institutions",
    badge: "Grand Ceremony",
    img: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=95",
  },
];

export default function HomePage() {
  const [deadline, setDeadline] = useState("30 December 2026");
  const [examDate, setExamDate] = useState("15 January 2027");
  const [fee, setFee] = useState<number>(1100);
  const [whatsapp, setWhatsapp] = useState("923333400000");

  const [disciplines, setDisciplines] = useState<Discipline[]>(defaultDisciplines);
  const [activeTab, setActiveTab] = useState<string>("gk");

  const [showAddModal, setShowAddModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [primaryPointsText, setPrimaryPointsText] = useState("");
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const [secondaryPointsText, setSecondaryPointsText] = useState("");
  const [extraNotice, setExtraNotice] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const [showTestModal, setShowTestModal] = useState(false);
  const [testRoll, setTestRoll] = useState("");

  useEffect(() => {
    const applySettings = (data: {
      deadline?: string;
      examDate?: string;
      fee?: number | string;
      whatsapp?: string;
    }) => {
      if (!data) return;
      if (data.deadline) setDeadline(data.deadline);
      if (data.examDate) setExamDate(data.examDate);
      if (data.fee !== undefined && data.fee !== null && data.fee !== "") {
        const parsedFee = Number(data.fee);
        setFee(parsedFee === 1500 ? 1100 : parsedFee);
      }
      if (data.whatsapp) setWhatsapp(String(data.whatsapp).replace(/[^0-9]/g, ""));
    };

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => applySettings(data))
      .catch(() => {
        try {
          const storedSettings = localStorage.getItem("mindmory_site_settings");
          if (storedSettings) applySettings(JSON.parse(storedSettings));
        } catch {}
      });

    try {
      const stored = localStorage.getItem("mindmory_disciplines");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((d: Discipline) =>
            d.id === "gk"
              ? {
                  ...d,
                  extraNotice:
                    "Paper will be conducted exclusively in English. 30 MCQs with 15 minutes test duration.",
                }
              : d
          );
          const hasGk = sanitized.some((d: Discipline) => d.id === "gk");
          const hasArt = sanitized.some((d: Discipline) => d.id === "art");

          const consolidated = [...sanitized];
          if (!hasGk) consolidated.unshift(defaultDisciplines[0]);
          if (!hasArt) {
            const gkIndex = consolidated.findIndex((d: Discipline) => d.id === "gk");
            consolidated.splice(Math.max(gkIndex, 0) + 1, 0, defaultDisciplines[1]);
          }

          setDisciplines(consolidated);
          return;
        }
      }
    } catch {}
    setDisciplines(defaultDisciplines);
  }, []);

  const handleAutoFill = () => {
    if (!catName.trim()) {
      alert("Please enter Category Name first.");
      return;
    }
    const name = catName.trim();
    setPrimaryTitle(`Foundations of ${name}`);
    setPrimaryPointsText(
      `Core concepts and basic principles of ${name}.\n` +
        `Interactive identification exercises and foundation trivia.\n` +
        `Essential terminology and observational reasoning.\n` +
        `Everyday applications tailored for primary grade pupils.`
    );
    setSecondaryTitle(`Advanced Analytical ${name}`);
    setSecondaryPointsText(
      `In-depth study, modern applications and advanced theory in ${name}.\n` +
        `Critical thinking scenarios, real-world case studies and logic tests.\n` +
        `O Levels and Matriculation competitive standard benchmark.\n` +
        `Speed MCQs and high-tier conceptual assessment.`
    );
    setExtraNotice(
      "Calculators are strictly prohibited. Assessment complies with MINDMORY standard marking rubric."
    );
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const trimmedName = catName.trim();
    const newId = "cat_" + Date.now();

    const pPoints = primaryPointsText
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    const sPoints = secondaryPointsText
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const newCategory: Discipline = {
      id: newId,
      name: trimmedName,
      primaryTitle: primaryTitle.trim() || `Foundations of ${trimmedName}`,
      primaryPoints:
        pPoints.length > 0 ? pPoints : [`Core concepts and basic knowledge of ${trimmedName}.`],
      secondaryTitle: secondaryTitle.trim() || `Advanced ${trimmedName} Excellence`,
      secondaryPoints:
        sPoints.length > 0
          ? sPoints
          : [`Critical thinking and advanced challenges in ${trimmedName}.`],
      extraNotice: extraNotice.trim() || undefined,
    };

    const updated = [...disciplines, newCategory];
    setDisciplines(updated);
    setActiveTab(newId);

    try {
      localStorage.setItem("mindmory_disciplines", JSON.stringify(updated));
    } catch {}

    setCatName("");
    setPrimaryTitle("");
    setPrimaryPointsText("");
    setSecondaryTitle("");
    setSecondaryPointsText("");
    setExtraNotice("");
    setShowAddModal(false);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (id === "gk" || id === "art") {
      alert("General Knowledge and Art are core curriculum disciplines and cannot be removed.");
      return;
    }
    if (!confirm(`Are you sure you want to delete "${name}" category?`)) return;

    const filtered = disciplines.filter((d) => d.id !== id);
    setDisciplines(filtered);
    setActiveTab("gk");

    try {
      localStorage.setItem("mindmory_disciplines", JSON.stringify(filtered));
    } catch {}
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  const currentDiscipline =
    disciplines.find((d) => d.id === activeTab) || disciplines[0] || defaultDisciplines[0];

  return (
    <main className="bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-950/40">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Where Memories Whisper Loud • Session 2026-2027</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Where Young Minds Excel, <br />
              <span className="text-red-600">Compete &amp; Shine Nationally</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
              MINDMORY provides standard cognitive benchmarks and recognition for school students across Pakistan.
              Take the challenge through your registered institution, earn prestigious distinction medals, and showcase academic excellence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/register"
                className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(220,38,38,0.5)] cursor-pointer"
              >
                <span>Register Candidate Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setShowTestModal(true)}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-850 border border-red-900/60 hover:border-red-600 text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Laptop className="w-4 h-4 text-red-500 animate-pulse" />
                <span>Take Online Test</span>
              </button>

              <Link
                href="/downloads"
                className="px-5 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download Form PDF</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-300 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Certified English Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-500" />
                <span>Institutional Enrollments Only</span>
              </div>
            </div>
          </div>

          {/* Timeline Card with Crisp Bright Header Photo */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=95"
                  alt="MINDMORY Academic Competition Pakistan"
                  className="w-full h-full object-cover object-center brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-widest block drop-shadow">
                      SESSION DOSSIER
                    </span>
                    <h3 className="text-base font-black text-white drop-shadow">
                      Official Contest Timeline
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-950/90 border border-green-600 text-green-300 text-[10px] font-bold uppercase tracking-wider">
                    Open
                  </span>
                </div>
              </div>

              <div className="p-6 pt-4 space-y-3">
                <div className="bg-black/80 border border-neutral-850 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Registration Deadline</span>
                      <span className="text-xs font-bold text-white">{deadline}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-red-400 font-mono font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    Final Date
                  </span>
                </div>

                <div className="bg-black/80 border border-neutral-850 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Examination Date</span>
                      <span className="text-xs font-bold text-white">{examDate}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    Exam Hall
                  </span>
                </div>

                <div className="bg-black/80 border border-neutral-850 p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coins className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Entry Fee / Candidate</span>
                      <span className="text-xs font-mono font-black text-red-400">PKR {fee.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    Standard
                  </span>
                </div>


                <div className="bg-black/80 border border-neutral-850 p-3.5 rounded-2xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-500 block uppercase">Secretariat Helpline</span>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-amber-400">
                      🇵🇰 +{whatsapp.slice(0, 2)}
                    </span>
                    <span className="text-xs font-mono font-bold text-green-400">
                      {whatsapp.slice(2, 5)} {whatsapp.slice(5)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="text-[10px] font-bold text-amber-400 hover:text-amber-300 underline shrink-0"
              >
                Secretariat Desk
              </Link>
            </div>



                <div className="pt-1">
                  <Link
                    href="/register"
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-red-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <span>Begin Online Enrollment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PICTORIAL COMPETITION HIGHLIGHTS SHOWCASE (6 SHARP HIGH-RES CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase block">
              VISUAL GLIMPSE • MINDMORY IN ACTION
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Academic Excellence &amp; Creative Expression
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            <Camera className="w-4 h-4" />
            <span>Explore Full Photo Gallery →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {pictorialHighlights.map((card, index) => (
            <div
              key={index}
              className="bg-neutral-950 border border-neutral-800 hover:border-red-600 rounded-2xl overflow-hidden group transition shadow-xl"
            >
              <div className="relative h-56 overflow-hidden bg-neutral-900">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-neutral-700 text-[10px] font-bold text-amber-300">
                  {card.badge}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-sm font-black text-white">{card.title}</h3>
                <p className="text-xs text-neutral-400">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CANDIDATE DESK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-900">
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-red-950/40 border border-neutral-850 hover:border-red-900/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                LIVE DIGITAL TESTING PORTAL
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Online Candidate Examination &amp; Mock Test Portal
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Registered school candidates can enter their official Roll Number to open the candidate desk and start the computerized paper, or practice with the Grade 1 to 10 model tests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowTestModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Start Online Test</span>
            </button>

            <Link
              href="/paper-pattern"
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-red-400" />
              <span>Practice Model Papers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-900">
        <div className="text-left mb-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase block">
            HOW IT WORKS
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Three Steps to Competition Day
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-3">
            <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h3 className="text-sm font-bold text-white">Institutional Enrollment</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Schools register candidates online or download the official Registration Form PDF and submit via WhatsApp or Secretariat mailing desk.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-3">
            <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h3 className="text-sm font-bold text-white">Fee Verification &amp; Model Papers</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Once Admin verifies the deposit slip, test access is enabled. Students prepare using our Grade 1 to 10 English model MCQs.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-3">
            <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h3 className="text-sm font-bold text-white">Test Day &amp; Merit Honors</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Attempt the central assessment in the exam terminal and qualify for national Gold, Silver, and Bronze distinction honors.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CURRICULUM STANDARDS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-900">
          <div className="text-left">
            <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase block mb-1">
              Curriculum Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Official Disciplines &amp; Criteria
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-bold rounded-xl border border-neutral-800 hover:border-red-600 transition shadow-sm cursor-pointer"
          >
            <div className="w-4 h-4 rounded-md bg-red-600 text-white flex items-center justify-center">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Add Category</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {disciplines.map((cat) => {
            const canDelete = cat.id !== "gk" && cat.id !== "art";

            return (
              <div key={cat.id} className="relative flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === cat.id
                      ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                      : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-700"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>

                {canDelete && (
                  <button
                    type="button"
                    title={`Delete ${cat.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat.id, cat.name);
                    }}
                    className="ml-1 p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950 border border-neutral-800 hover:border-red-700 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-900/60">
                  Class 1 to Grade 5
                </span>
                <span className="text-[11px] font-medium text-neutral-500">Primary Division</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mb-4">
                {currentDiscipline.primaryTitle}
              </h3>
              <ul className="space-y-3">
                {currentDiscipline.primaryPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-900/60">
                  Grade 6 to 10 / O Levels
                </span>
                <span className="text-[11px] font-medium text-neutral-500">Secondary Division</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mb-4">
                {currentDiscipline.secondaryTitle}
              </h3>
              <ul className="space-y-3">
                {currentDiscipline.secondaryPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {currentDiscipline.extraNotice && (
          <div className="mt-6 bg-neutral-950/90 border border-red-950 p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
                Official Examination Notice &amp; Instructions:
              </span>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                {currentDiscipline.extraNotice}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 6. PICTORIAL AWARDS RECOGNITION & INSTITUTIONAL-ONLY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-900 text-left space-y-6">
        <div className="bg-gradient-to-r from-red-950/40 via-neutral-950 to-neutral-950 border border-red-900/50 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-950 border border-red-800 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" /> Recognition Scheme
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              National Distinction Awards &amp; Certificates
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Every candidate receives official appraisal. High achievers are decorated with Gold, Silver, and Bronze Medals,
              while institutional mentors receive the Best Participating School Trophy.
            </p>
          </div>
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1400&q=95"
              alt="MINDMORY National Award Ceremony"
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
          </div>
        </div>

        {/* INSTITUTIONAL-ONLY ENROLLMENT NOTICE */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Register for MINDMORY 2026?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Enrollments are open exclusively through registered schools &amp; institutions for candidates from Class 1 to Grade 10 &amp; O Levels. Individual applications from home are not permitted.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-xs sm:text-sm transition inline-flex items-center gap-2 shadow-lg shadow-red-600/30"
            >
              <span>School Registration Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/downloads"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold rounded-full text-xs sm:text-sm transition inline-flex items-center gap-2"
            >
              <span>Download Registration Form (PDF)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-neutral-900">
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900/40 to-neutral-950 border border-neutral-800 p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest block mb-1">
            SECRETARIAT DISPATCH
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Subscribe to Contest Gazettes &amp; Schedules
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto mt-2 leading-relaxed">
            Get instant circulars on syllabus amendments, printable sample papers, medal ceremonies, and roll number slip releases directly in your school inbox.
          </p>

          {newsletterSubscribed ? (
            <div className="mt-6 bg-green-950/80 border border-green-800 text-green-300 p-4 rounded-2xl text-xs font-bold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Thank you! Your school email has been added to the MINDMORY Dispatch List.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter school coordinator email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shrink-0 cursor-pointer shadow-lg shadow-red-600/30"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* TEST MODAL */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-white relative shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowTestModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest block">
                  EXAMINATION DESK
                </span>
                <h3 className="text-base font-black">Enter Examination Hall</h3>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Enter your assigned Roll Number to open the candidate desk, or leave it blank to practice with the model papers.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const roll = testRoll.trim();
                if (!roll) {
                  window.location.href = "/paper-pattern";
                } else {
                  window.location.href = `/student-login?roll=${encodeURIComponent(roll)}`;
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                  Candidate Roll Number
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="e.g. MM-2026-1001 (or leave blank for practice)"
                    value={testRoll}
                    onChange={(e) => setTestRoll(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white tracking-widest uppercase focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Launch Test Terminal</span>
              </button>
            </form>

            <div className="border-t border-neutral-900 pt-3 text-center">
              <Link
                href="/paper-pattern"
                onClick={() => setShowTestModal(false)}
                className="text-[11px] text-red-400 hover:text-red-300 font-semibold"
              >
                Or view model papers and the printable version
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM CURRICULUM DISCIPLINE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-white relative shadow-2xl my-8 text-left">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">
                  CURRICULUM ARCHITECT
                </span>
                <h3 className="text-base font-black">Add Category &amp; Guidelines</h3>
              </div>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-neutral-300">Category Name</label>
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" /> Auto-Fill Template Suggestions
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science & Coding"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-850 space-y-2">
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">
                  Class 1 to Grade 5 Syllabus
                </span>
                <div>
                  <label className="block text-neutral-400 mb-1">Card Heading Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science - Foundational Concepts"
                    value={primaryTitle}
                    onChange={(e) => setPrimaryTitle(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">
                    Syllabus Points (1 line = 1 bullet)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Hardware basics: Monitor, CPU, Mouse&#10;Input vs Output devices&#10;Paint and basic keyboard skills&#10;Safe internet habits for kids"
                    value={primaryPointsText}
                    onChange={(e) => setPrimaryPointsText(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-red-600 text-xs resize-none"
                  />
                </div>
              </div>

              <div className="bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-850 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                  Grade 6 to 10 Syllabus
                </span>
                <div>
                  <label className="block text-neutral-400 mb-1">Card Heading Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Advanced Computing & Logic Thinking"
                    value={secondaryTitle}
                    onChange={(e) => setSecondaryTitle(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">
                    Syllabus Points (1 line = 1 bullet)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Binary logic, algorithms and flowcharts&#10;Introduction to Python / Scratch programming&#10;Cybersecurity and network fundamentals&#10;Emerging Tech: AI, Cloud and Database models"
                    value={secondaryPointsText}
                    onChange={(e) => setSecondaryPointsText(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-red-600 text-xs resize-none"
                  />
                </div>
              </div>

              <div className="bg-neutral-900/40 p-3 rounded-2xl border border-neutral-850">
                <label className="block font-bold text-neutral-300 mb-1">
                  Additional Rules / Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Test duration is 30 mins. Bring 2B pencils & erasers."
                  value={extraNotice}
                  onChange={(e) => setExtraNotice(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-600 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save &amp; Publish to Curriculum</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
