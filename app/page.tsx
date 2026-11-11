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
  MapPin, 
  Lock,
  Download,
  Menu,
  Trophy as TrophyIcon
} from "lucide-react";

// CUSTOM THEME-MATCHING EMBEDDED LOGO
function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-red-600/40 rounded-2xl blur-md group-hover:bg-red-500/60 transition-all duration-300" />
        <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-black to-neutral-950 border border-red-600/70 group-hover:border-red-500 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:6px_6px] opacity-25" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#dc2626" fillOpacity="0.3" stroke="#ef4444" />
            <path d="M6 9.5v5c0 3 2.686 5.5 6 5.5s6-2.5 6-5.5v-5" stroke="#ef4444" />
            <path d="M22 7v6" stroke="#f59e0b" />
            <circle cx="12" cy="15" r="1.5" fill="#f59e0b" stroke="#f59e0b" />
          </svg>
        </div>
      </div>

      <div className="text-left leading-tight">
        <div className="font-black tracking-wider text-white text-base sm:text-lg flex items-center gap-1 font-sans">
          <span>MIND</span>
          <span className="text-red-500 font-extrabold">MORY</span>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">
          ACADEMIC PORTAL
        </span>
      </div>
    </Link>
  );
}

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
      "Analytical reasoning, everyday logic & observation."
    ],
    secondaryTitle: "Advanced Intellect & Critical Thinking",
    secondaryPoints: [
      "Global affairs, international organizations & treaties.",
      "Physical geography, world capitals & modern history.",
      "Scientific breakthroughs, technology, AI & inventions.",
      "Competitive speed MCQs & critical problem-solving."
    ],
    extraNotice: "Paper will be bilingual (English with Urdu assistance). 30 MCQs with 15 minutes test duration."
  },
  {
    id: "art",
    name: "Art & Creative Expression",
    primaryTitle: "Visual Imagination & Colors",
    primaryPoints: [
      "Theme-based sketch rendering and shading fundamentals.",
      "Color blending, perspective perception & canvas storytelling.",
      "Original creative compositions and structured visual balance.",
      "Cultural heritage reflections through fine strokes."
    ],
    secondaryTitle: "Masterstroke Technique & Conceptual Art",
    secondaryPoints: [
      "Abstract conceptualization and complex themed illustrations.",
      "Multi-medium experimentation (Pastels, Watercolors, Inks).",
      "Anatomy proportions, architectural framing & contrast mastery.",
      "Portfolio evaluation under national jury standards."
    ],
    extraNotice: "Drawing sheets will be supplied by Secretariat. Students must bring their own colors and pencil kit."
  }
];

export default function HomePage() {
  const [deadline, setDeadline] = useState("30 December 2026");
  const [examDate, setExamDate] = useState("15 January 2027");
  const [fee, setFee] = useState<number>(1100);
  const [whatsapp, setWhatsapp] = useState("923000000000");

  const [disciplines, setDisciplines] = useState<Discipline[]>(defaultDisciplines);
  const [activeTab, setActiveTab] = useState<string>("gk");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [primaryPointsText, setPrimaryPointsText] = useState("");
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const [secondaryPointsText, setSecondaryPointsText] = useState("");
  const [extraNotice, setExtraNotice] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("mindmory_site_settings");
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed.deadline) setDeadline(parsed.deadline);
        if (parsed.examDate) setExamDate(parsed.examDate);
        if (parsed.fee) setFee(Number(parsed.fee));
        if (parsed.whatsapp) setWhatsapp(parsed.whatsapp.replace(/[^0-9]/g, ""));
      }
    } catch {}

    try {
      const stored = localStorage.getItem("mindmory_disciplines");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDisciplines(parsed);
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
    setExtraNotice("Calculators are strictly prohibited. Assessment complies with Mindmory standard marking rubric.");
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const trimmedName = catName.trim();
    const newId = "cat_" + Date.now();

    const pPoints = primaryPointsText.split("\n").map((p) => p.trim()).filter((p) => p.length > 0);
    const sPoints = secondaryPointsText.split("\n").map((p) => p.trim()).filter((p) => p.length > 0);

    const newCategory: Discipline = {
      id: newId,
      name: trimmedName,
      primaryTitle: primaryTitle.trim() || `Foundations of ${trimmedName}`,
      primaryPoints: pPoints.length > 0 ? pPoints : [`Core concepts and basic knowledge of ${trimmedName}.`],
      secondaryTitle: secondaryTitle.trim() || `Advanced ${trimmedName} Excellence`,
      secondaryPoints: sPoints.length > 0 ? sPoints : [`Critical thinking and advanced challenges in ${trimmedName}.`],
      extraNotice: extraNotice.trim() || undefined
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

  const currentDiscipline = disciplines.find((d) => d.id === activeTab) || disciplines[0] || defaultDisciplines[0];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between">
      
      {/* 1. RELIABLE NAVBAR (ALL MENUS ALWAYS VISIBLE) */}
      
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />

          {/* DESKTOP MENU - TAMAM OFFICIAL LINKS */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold">
            <Link
              href="/syllabus"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
            >
              Syllabus
            </Link>

            <Link
              href="/paper-pattern"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>Model Papers</span>
            </Link>

            <Link
              href="/downloads"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Downloads</span>
            </Link>

            <Link
              href="/gallery"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
            >
              Gallery
            </Link>

            <Link
              href="/about"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
            >
              Contact
            </Link>

            <Link
              href="/results"
              className="px-3 py-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-neutral-900 transition flex items-center gap-1"
            >
              <TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Results</span>
            </Link>

            <Link
              href="/student-login"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-100 hover:text-white transition flex items-center gap-1.5 ml-1"
            >
              <Laptop className="w-3.5 h-3.5 text-red-500" />
              <span>Candidate Desk</span>
            </Link>

            <Link
              href="/admin"
              className="px-2.5 py-1.5 rounded-lg text-neutral-500 hover:text-red-400 transition flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>

            <Link
              href="/register"
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-1 shadow-md shadow-red-600/30 ml-1"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* TABLET & MOBILE TOGGLE BUTTON */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/register"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-neutral-900 mt-3 pt-3 pb-2 space-y-1 text-left text-xs font-bold">
            <Link
              href="/syllabus"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <span>Syllabus Breakdown</span>
            </Link>

            <Link
              href="/paper-pattern"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>Model Papers (Grades 1-10)</span>
            </Link>

            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>Direct PDF Downloads</span>
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <span>Event Gallery</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <span>About Us</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900"
            >
              <span>Contact Secretariat</span>
            </Link>

            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-amber-400 hover:bg-neutral-900"
            >
              <TrophyIcon className="w-4 h-4 text-amber-500" />
              <span>Results & Merit Gazette</span>
            </Link>

            <Link
              href="/student-login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white mt-1"
            >
              <Laptop className="w-4 h-4 text-red-500" />
              <span>Candidate Desk (Login)</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-500 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Access</span>
            </Link>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <main className="flex-grow">
        <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-950/40">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Annual Nationwide Academic Competition • Session 2026-2027</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Where Young Minds Excel, <br />
                <span className="text-red-600">Compete & Shine Nationally</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
                Mindmory provides standard cognitive benchmarks and recognition for school students across Pakistan.
                Take the challenge, earn prestigious distinction medals, and showcase institutional excellence.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/register"
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(220,38,38,0.5)] cursor-pointer"
                >
                  <span>Register Candidate Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/student-login"
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-red-900/60 text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Laptop className="w-4 h-4 text-red-500" />
                  <span>Candidate Portal</span>
                </Link>

                <Link
                  href="/paper-pattern"
                  className="px-5 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>Model Papers (Grades 1-10)</span>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-400 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Certified Assessment Rubric</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Nationwide School Participation</span>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-widest block">
                      SESSION DOSSIER
                    </span>
                    <h3 className="text-base font-black text-white mt-0.5">Official Contest Timeline</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-950 border border-green-800 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    Open
                  </span>
                </div>

                <div className="space-y-3">
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

                  <div className="bg-black/80 border border-neutral-850 p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-green-500" />
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">Secretariat Helpline</span>
                        <span className="text-xs font-mono font-bold text-green-400">+{whatsapp}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">
                      Official Support
                    </span>
                  </div>
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
        </section>

        {/* 3. CANDIDATE DESK BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-900">
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-red-950/40 border border-neutral-850 hover:border-red-900/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                  OFFICIAL CANDIDATE DESK
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Candidate Dossier, Fee Clearance & Examination Desk
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enrolled students can enter their assigned Roll Number to verify payment clearance, view candidate dossier, and launch the computerized exam hall.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/student-login"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <Laptop className="w-4 h-4" />
                <span>Access Candidate Desk →</span>
              </Link>

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
              <h3 className="text-sm font-bold text-white">Online Candidate Enrollment</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Register student online. System automatically generates your official Roll Number slip and instructions.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-3">
              <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h3 className="text-sm font-bold text-white">Fee Clearance & Model Paper</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Verify payment clearance and prepare using our Grade 1 to 10 past model MCQs directly in browser.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl space-y-3">
              <span className="w-7 h-7 rounded-lg bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h3 className="text-sm font-bold text-white">Test Day & Merit Honors</h3>
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
                Official Disciplines & Criteria
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
                    <li key={i} className="text-xs text-neutral-400 flex items-start gap-2.5 leading-relaxed">
                      <span className="text-red-500 font-black mt-0.5">•</span>
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
                    <li key={i} className="text-xs text-neutral-400 flex items-start gap-2.5 leading-relaxed">
                      <span className="text-amber-500 font-black mt-0.5">•</span>
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
                  Official Examination Notice & Instructions:
                </span>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {currentDiscipline.extraNotice}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 6. AWARDS RECOGNITION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-900 text-left">
          <div className="bg-gradient-to-r from-red-950/40 via-neutral-950 to-neutral-950 border border-red-900/50 rounded-3xl p-6 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-950 border border-red-800 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" /> Recognition Scheme
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">National Distinction Awards & Certificates</h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Every candidate receives official appraisal. High achievers are decorated with Gold, Silver, and Bronze Medals,
              while institutional mentors receive the Best Participating School Trophy.
            </p>
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
              Subscribe to Contest Gazettes & Schedules
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto mt-2 leading-relaxed">
              Get instant circulars on syllabus amendments, printable sample papers, medal ceremonies, and roll number slip releases directly in your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="mt-6 bg-green-950/80 border border-green-800 text-green-300 p-4 rounded-2xl text-xs font-bold inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Thank you! Your email has been added to the Mindmory Dispatch List.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter parent or coordinator email..."
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
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950/80 pt-16 pb-12 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900 text-left">
            
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo />
              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                Mindmory Central Secretariat administers certified nationwide academic competitions, standardizing cognitive benchmarks across primary, secondary, and O Levels institutions in Pakistan.
              </p>
              <div className="space-y-2 pt-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Central Examination Directorate • Karachi, Sindh, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Competitions</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/paper-pattern" className="hover:text-red-400 transition">Model Papers (Grades 1-10)</Link></li>
                <li><Link href="/downloads" className="hover:text-red-400 transition">Direct PDF Downloads</Link></li>
                <li><Link href="/results" className="hover:text-red-400 transition">Results & Marksheet</Link></li>
                <li><Link href="/register" className="hover:text-red-400 transition">Candidate Enrollment</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Disciplines</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/paper-pattern" className="hover:text-neutral-200 transition">General Knowledge</Link></li>
                <li><Link href="/syllabus" className="hover:text-neutral-200 transition">Art & Creative Expression</Link></li>
                <li><Link href="/syllabus" className="hover:text-neutral-200 transition">Science & Discovery</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Candidate Desk</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/student-login" className="hover:text-red-400 transition flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-red-500" /><span>Candidate Portal</span></Link></li>
                <li><Link href="/results" className="hover:text-red-400 transition">Roll No Gazette</Link></li>
                <li><Link href="/register" className="hover:text-red-400 transition">Register Candidate</Link></li>
                <li><Link href="/contact" className="hover:text-red-400 transition">Secretariat Helpdesk</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © 2026-2027 Mindmory Educational Assessments. All rights reserved. Registered under National Academic Contest Standards.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-neutral-600 hover:text-red-400 flex items-center gap-1 transition">
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. MODAL: ADD CUSTOM CURRICULUM DISCIPLINE */}
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
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">CURRICULUM ARCHITECT</span>
                <h3 className="text-base font-black">Add Category & Guidelines</h3>
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
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">Class 1 to Grade 5 Syllabus</span>
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
                  <label className="block text-neutral-400 mb-1">Syllabus Points (1 line = 1 bullet)</label>
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
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Grade 6 to 10 Syllabus</span>
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
                  <label className="block text-neutral-400 mb-1">Syllabus Points (1 line = 1 bullet)</label>
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
                <span>Save & Publish to Curriculum</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
