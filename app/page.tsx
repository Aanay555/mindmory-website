"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent, CompetitionCategory } from "@/data/content";
import Footer from "@/components/Footer";
import { 
  ArrowUpRight, 
  ArrowRight,
  Sparkles, 
  Brain, 
  Palette, 
  Award, 
  BellRing, 
  Calculator, 
  ChevronDown, 
  PlayCircle, 
  Clock, 
  X, 
  FileText, 
  Download, 
  Trash2, 
  Settings, 
  ShieldCheck,
  BookOpen
} from "lucide-react";

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  date: string;
  desc: string;
  img: string;
  fullContent: {
    intro: string;
    points: { headline: string; detail: string }[];
    conclusion: string;
  };
}

export default function HomePage() {
  const contest = siteContent.contests[0];

  // 1. Dynamic Categories State
  const [categories, setCategories] = useState<CompetitionCategory[]>(siteContent.categories);
  const [selectedCatId, setSelectedCatId] = useState<string>(siteContent.categories[0]?.id || "gk");
  const currentCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  // Manage Categories Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatTagline, setNewCatTagline] = useState("");
  const [newCatJunior, setNewCatJunior] = useState("");
  const [newCatSenior, setNewCatSenior] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newId = newCatName.toLowerCase().replace(/\s+/g, "-");
    const newCategory: CompetitionCategory = {
      id: newId,
      name: newCatName,
      tagline: newCatTagline || "Academic Excellence & Creative Expression",
      iconName: "brain",
      juniorGrade: "Pre-Level to Grade 2",
      juniorTitle: newCatJunior || "Foundation Level Topics",
      juniorTopics: [
        "Core fundamental concepts & identification.",
        "Observation reasoning & guided thinking.",
        "Curriculum-matched basic questions.",
      ],
      seniorGrade: "Grades 3–4 to 9–10",
      seniorTitle: newCatSenior || "Advanced Level Topics",
      seniorTopics: [
        "Analytical problem solving & critical logic.",
        "Advanced thematic depth & conceptual evaluation.",
        "National competition level benchmarks.",
      ],
    };

    setCategories([...categories, newCategory]);
    setSelectedCatId(newId);
    setCandidateCounts((prev) => ({ ...prev, [newId]: 10 }));
    setNewCatName("");
    setNewCatTagline("");
    setNewCatJunior("");
    setNewCatSenior("");
    setIsManageModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (categories.length <= 1) {
      alert("At least one competition category must remain active!");
      return;
    }
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    if (selectedCatId === id) setSelectedCatId(updated[0].id);
  };

  // 2. Interactive Fee & Prize Calculator State
  const [candidateCounts, setCandidateCounts] = useState<{ [key: string]: number }>({
    gk: 15,
    art: 10,
  });

  const handleStudentChange = (id: string, count: number) => {
    setCandidateCounts((prev) => ({
      ...prev,
      [id]: count,
    }));
  };

  const totalStudents = Object.values(candidateCounts).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  const totalBudget = totalStudents * (contest.feePerStudent || 1100);

  // 3. Multi-Question Interactive Live Quiz State
  const quizQuestions = [
    {
      q: "Which celestial body is famously known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: 1,
      category: "General Knowledge (Astronomy)",
    },
    {
      q: "In Fine Arts, which colors are known as Primary Colors?",
      options: [
        "Orange, Green, Violet",
        "Red, Yellow, Blue",
        "Black, White, Grey",
        "Pink, Cyan, Brown",
      ],
      correct: 1,
      category: "Art & Color Theory",
    },
    {
      q: "What is the capital city of Pakistan?",
      options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
      correct: 2,
      category: "General Knowledge (Geography)",
    },
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  const handleQuizAnswer = (optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [currentQuizIndex]: optionIdx,
    }));
  };

  // 4. Sample Paper Modal Drawer State
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);

  // 5. Article Detail Modal State (Option A)
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const articlesData: ArticleItem[] = [
    {
      id: 1,
      title: "How to Ace the General Knowledge Elimination Round",
      category: "Preparation Guide",
      date: "14 Oct 2026",
      desc: "Key study strategies for solar system, world flags, and science logic to secure 90%+ in 20 minutes.",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      fullContent: {
        intro: "The Elimination Round tests your quick analytical thinking and core global knowledge within a strict 20-minute window for 20 questions. Scoring above 90% is essential for qualifying directly to the National Grand Finale.",
        points: [
          {
            headline: "Prioritize Speed with First-Glance Accuracy",
            detail: "Spend no more than 40 seconds per question. If a question feels tricky, mark it lightly and return to it during your final 2-minute review pass."
          },
          {
            headline: "Master Core Observational & Geographic Facts",
            detail: "Focus on capital cities, continental straits, major mountain ranges, and recent space exploration missions as outlined in the official curriculum."
          },
          {
            headline: "No Negative Marking Advantage",
            detail: "Since there is zero negative marking, never leave an MCQ blank. Use intelligent elimination to rule out improbable options."
          }
        ],
        conclusion: "Consistent daily revision of 15 minutes with past specimen papers is proven to boost accuracy by over 35% on test day."
      }
    },
    {
      id: 2,
      title: "Art Contest Rubrics: What the National Jury Looks For",
      category: "Fine Arts Criteria",
      date: "20 Oct 2026",
      desc: "Understanding tonal contrast, paper coverage, and original storytelling under this year's official themes.",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
      fullContent: {
        intro: "MINDMORY evaluates student artworks on independent creative authenticity, technique control, and emotional depth rather than mere photographic replication.",
        points: [
          {
            headline: "Originality & Conceptual Depth (40%)",
            detail: "Avoid cliché copybook illustrations. The jury rewards student-created compositions that authentically interpret the official themes."
          },
          {
            headline: "Medium Handling & Color Harmony (30%)",
            detail: "Whether using acrylics, pastels, or watercolors, ensure clean gradient transitions, strong light-and-shadow contrast, and balanced sheet coverage."
          },
          {
            headline: "Neatness & Presentation Discipline (30%)",
            detail: "Maintain clean borders without smudges, ensure proper sheet dimensions (A3), and verify that the official school seal and desk label are firmly affixed on the reverse."
          }
        ],
        conclusion: "Artwork that whispers a personal story with bold confidence invariably scores highest with the national panel."
      }
    },
    {
      id: 3,
      title: "Recognising Teacher Coordinators: The Pillar of Success",
      category: "Institutional News",
      date: "28 Oct 2026",
      desc: "Details on honorariums, commemorative shields, and certificates awarded to dedicated educators.",
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
      fullContent: {
        intro: "Behind every confident student stands an extraordinary educator. MINDMORY takes immense pride in formally acknowledging school leaders and teachers whose mentorship shapes young brilliance.",
        points: [
          {
            headline: "Honorariums for Dedicated Subject Teachers",
            detail: "Allocated grants are disbursed to school coordinators guiding student groups across elimination and finale stages."
          },
          {
            headline: "National Institutional Commemorative Shields",
            detail: "School Principals whose institutions register active student delegations receive an official commemorative shield of academic distinction."
          },
          {
            headline: "Verifiable Lifelong Certificates of Appreciation",
            detail: "Every participating coordinator and teacher receives a government-recognized credential celebrating their institutional service."
          }
        ],
        conclusion: "We honor the teachers who inspire tomorrow's leaders every step of the journey."
      }
    }
  ];

  // 6. Dynamic Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 7. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can a student participate in both General Knowledge and Art Contests?",
      a: "Yes. Students are eligible to enroll in both competitions. Separate schedule slots and question/canvas submission desk tags will be allocated.",
    },
    {
      q: "What is the minimum cohort requirement for a school registration?",
      a: "An institution requires a minimum delegation of 10 students across all combined categories to be designated as an official testing center.",
    },
    {
      q: "How are original Art contest canvases and drawings collected?",
      a: "Participating institutions collect physical student artwork with official candidate label slips attached on the reverse side, and dispatch them to the MINDMORY Secretariat.",
    },
    {
      q: "What criteria qualify a student for the National Grand Finale?",
      a: "Candidates achieving 90% and higher scores in the campus-level elimination round qualify directly for the National Grand Finale round.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. RUNNING NOTICE TICKER */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white px-4 py-2 text-xs font-bold flex items-center border-b border-red-800 overflow-hidden shadow-inner">
        <div className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-0.5 rounded-md shrink-0 mr-3 shadow-md">
          <BellRing className="w-3.5 h-3.5 animate-bounce" />
          <span>OFFICIAL ANNOUNCEMENT</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden">
          <p className="inline-block animate-pulse text-red-100">
            MINDMORY National Competitions 2026–27 Registrations Open! Final Submission Deadline: {contest.deadline}. Official Annexure Forms available under Downloads.
          </p>
        </div>
      </div>

      {/* 2. HERO SECTION WITH COUNTDOWN TIMER */}
      <section className="relative bg-gradient-to-br from-black via-neutral-950 to-neutral-900 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-2 border-red-950">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-600/60 text-red-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.25)]">
              <Sparkles className="w-4 h-4 text-red-500" />
              {siteContent.header.tagline}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {categories.map((c) => c.name).join(" & ")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
                National Competitions
              </span>
            </h1>
            
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Where memories whisper loud. A prestigious academic arena cultivating critical curiosity, sharp reasoning, and visual artistic expressions for students from Pre-Level to Grade 10 across Pakistan.
            </p>

            {/* Countdown Box */}
            <div className="bg-neutral-900/90 border border-red-900/50 p-4 rounded-2xl max-w-lg space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 font-bold text-red-400 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" /> Registration Closes In:
                </span>
                <span className="text-neutral-300 font-semibold">{contest.deadline}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-black/80 border border-neutral-800 p-2 rounded-xl">
                  <span className="text-lg font-black text-white font-mono">{timeLeft.days}</span>
                  <span className="block text-[10px] text-neutral-500 uppercase">Days</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 p-2 rounded-xl">
                  <span className="text-lg font-black text-white font-mono">{timeLeft.hours}</span>
                  <span className="block text-[10px] text-neutral-500 uppercase">Hours</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 p-2 rounded-xl">
                  <span className="text-lg font-black text-white font-mono">{timeLeft.minutes}</span>
                  <span className="block text-[10px] text-neutral-500 uppercase">Mins</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 p-2 rounded-xl">
                  <span className="text-lg font-black text-red-500 font-mono">{timeLeft.seconds}</span>
                  <span className="block text-[10px] text-neutral-500 uppercase">Secs</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteContent.header.whatsapp}?text=Registration%20Inquiry%20MINDMORY`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-3.5 rounded-xl transition shadow-[0_0_25px_rgba(220,38,38,0.5)] flex items-center gap-2 text-sm"
              >
                <span>Register School via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsSampleModalOpen(true)}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold px-6 py-3.5 rounded-xl transition text-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>Preview Sample Paper</span>
              </button>
            </div>
          </div>

          {/* National Award Pool Box */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-neutral-900/95 via-black to-neutral-950 p-8 rounded-3xl border-2 border-red-600/70 shadow-[0_0_40px_rgba(220,38,38,0.25)] space-y-6">
              <div className="flex items-center gap-4 border-b border-neutral-800 pb-5">
                <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-700 flex items-center justify-center text-red-500">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-red-400 text-xs font-bold uppercase tracking-widest block">National Honor Pool</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{contest.grandPrize}</h3>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-neutral-800/80">
                  <span className="text-neutral-400">2nd Position:</span>
                  <span className="font-bold text-white">Tablets (12 National Awards)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800/80">
                  <span className="text-neutral-400">3rd & 4th Position:</span>
                  <span className="font-bold text-red-400">Cash PKR 20,000 & 15,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Merit Accolades:</span>
                  <span className="font-bold text-white">Gold, Silver & Bronze Medals</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">Institutional Awards:</span>
                  <span className="font-bold text-neutral-300">Principal Shields & Teacher Honorarium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC INTERACTIVE FEE CALCULATOR */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-black p-8 sm:p-10 rounded-3xl border border-red-900/60 shadow-2xl">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Planning & Allocation Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">School Delegation Fee & Awards Calculator</h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Adjust student participation numbers across categories to view registration estimates and eligible institutional awards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-black/80 p-5 rounded-2xl border border-neutral-800 space-y-3">
                  <label className="block text-xs font-bold text-neutral-300 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <span className="text-red-500 font-mono text-sm">{candidateCounts[cat.id] || 0} Candidates</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={candidateCounts[cat.id] || 0} 
                    onChange={(e) => handleStudentChange(cat.id, Number(e.target.value))}
                    className="w-full accent-red-600 bg-neutral-800 cursor-pointer"
                  />
                  <p className="text-[11px] text-neutral-500">{cat.tagline}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 bg-neutral-950 p-7 rounded-2xl border border-red-800/60 text-center space-y-4 shadow-xl">
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Estimated Group Budget</span>
              <div className="text-3xl sm:text-4xl font-black text-red-500 font-mono">
                PKR {totalBudget.toLocaleString()}
              </div>
              
              <div className="text-xs text-neutral-300 space-y-1">
                <p>Total Candidates: <strong>{totalStudents}</strong></p>
                <p className="text-neutral-400 text-[11px]">
                  {totalStudents >= 10 ? (
                    <span className="text-green-400 font-semibold">✓ Center Approved (Shield & Certificates Eligible)</span>
                  ) : (
                    <span className="text-amber-400 font-semibold">⚠ Minimum 10 total candidates required</span>
                  )}
                </p>
              </div>

              <a
                href={`https://wa.me/${siteContent.header.whatsapp}?text=Registration%20Quote:%20Total%20${totalStudents}%20Candidates`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-md uppercase tracking-wider"
              >
                Generate School Invoice Request →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC CATEGORIES TABS */}
      <section id="syllabus" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-red-500 font-extrabold tracking-widest uppercase text-xs">Curriculum Standards</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase mt-1">Official Disciplines & Criteria</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
        </div>

        <div className="flex justify-center items-center gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                selectedCatId === cat.id
                  ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
              }`}
            >
              {cat.id === "gk" ? <Brain className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
              {cat.name}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsManageModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-neutral-800 hover:bg-neutral-700 text-red-400 border border-red-900/60 transition flex items-center gap-1.5 shadow-md"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage Categories</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
            <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{currentCategory.juniorGrade}</span>
            <h3 className="text-xl font-black text-white">{currentCategory.juniorTitle}</h3>
            <ul className="text-xs space-y-2 text-neutral-300 pl-4 list-disc">
              {currentCategory.juniorTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
            <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{currentCategory.seniorGrade}</span>
            <h3 className="text-xl font-black text-white">{currentCategory.seniorTitle}</h3>
            <ul className="text-xs space-y-2 text-neutral-300 pl-4 list-disc">
              {currentCategory.seniorTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. ASSESSMENT FORMAT */}
      <section className="py-14 px-4 sm:px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black p-7 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-white text-lg">Elimination Round — School Assessment</h4>
            <span className="inline-block bg-red-950 text-red-400 border border-red-800 text-xs font-bold px-3 py-1 rounded-full">
              20 Questions / 20 Minutes
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Tests knowledge, understanding, accuracy and the ability to work under time pressure. Students who score above 90% advance to the Grand Finale.
            </p>
          </div>

          <div className="bg-black p-7 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-white text-lg">Grand Finale — Online Assessment</h4>
            <span className="inline-block bg-red-950 text-red-400 border border-red-800 text-xs font-bold px-3 py-1 rounded-full">
              30 MCQs / 20 Minutes
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Both accuracy and time matter. 100% accuracy comes first; among perfect scores, the fastest completion time decides the winner.
            </p>
          </div>

          <div className="bg-black p-7 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-white text-lg">How the Winner is Determined</h4>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-800">100% Accuracy</span>
              <span className="text-neutral-500">→</span>
              <span className="bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-800">Shortest Time</span>
              <span className="text-neutral-500">→</span>
              <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg">Winner</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Accuracy comes first — a winning student must answer every question correctly, with no room for error. If several students score 100%, the one who finishes in the shortest time wins.
            </p>
          </div>

          <div className="bg-black p-7 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-white text-lg">Evaluation — Fair. Transparent. Performance-Based.</h4>
            <ul className="text-xs text-neutral-400 space-y-2 pt-1">
              <li><strong className="text-white">• Reliable Scoring</strong> — A robust system records responses and calculates scores accurately.</li>
              <li><strong className="text-white">• Equal Standards</strong> — All participants are evaluated on the same criteria — a level playing field.</li>
              <li><strong className="text-white">• Performance-Based Results</strong> — Results are decided by contest performance alone.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. TIMELINE TABLE */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-extrabold tracking-widest uppercase text-xs">Official Schedule</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase mt-1">Calendar & Deadlines</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
        </div>

        <div className="bg-neutral-950 rounded-2xl shadow-md border border-neutral-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-950 text-white text-xs sm:text-sm border-b border-red-800">
                <th className="py-4 px-6 font-bold uppercase tracking-wider">Milestone Event</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-right">Scheduled Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-xs sm:text-sm">
              {contest.milestones.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-neutral-950" : "bg-black"}>
                  <td className="py-3.5 px-6 font-medium text-neutral-300">{item.title}</td>
                  <td className="py-3.5 px-6 text-right font-bold text-red-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. AWARDS & RECOGNISING EDUCATORS */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-black rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="bg-red-950 text-white p-4 flex justify-between text-xs sm:text-sm font-bold uppercase tracking-wider border-b border-red-800">
              <span>Position</span>
              <span>National Award</span>
            </div>
            <div className="divide-y divide-neutral-900 text-xs sm:text-sm p-4 space-y-3">
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">Grand Prize</span><span className="font-extrabold text-red-500">PKR 300,000 (Two Awards)</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">2nd Prize</span><span className="font-extrabold text-red-400">Tablet (12 Awards)</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">3rd Prize</span><span className="font-extrabold text-red-400">PKR 20,000 (12 Awards)</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">4th Prize</span><span className="font-extrabold text-neutral-200">PKR 15,000 (12 Awards)</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">5th Prize</span><span className="font-extrabold text-neutral-200">PKR 5,000</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">6th–8th Prize</span><span className="font-extrabold text-amber-500">Gold, Silver & Bronze Medals</span></div>
              <div className="flex justify-between py-1"><span className="font-bold text-neutral-300">9th Prize</span><span className="font-bold text-neutral-400">Exciting Giveaways</span></div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-black rounded-2xl border border-neutral-800 p-7 space-y-4">
            <h4 className="text-xl font-black text-white">Recognising the Educators</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Teachers, coordinators and principals make the contest possible. MINDMORY recognises their role with:
            </p>
            <ul className="text-xs text-neutral-300 space-y-2.5 pt-1">
              <li>• Honorarium for dedicated teachers</li>
              <li>• Commemorative Shields for Principals</li>
              <li>• Certificates of Appreciation for Principals</li>
              <li>• Certificates of Appreciation for Coordinators</li>
              <li>• Certificates of Appreciation for Teachers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. AT A GLANCE, HOW TO REGISTER & BANK DETAILS */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-950 p-7 rounded-2xl border border-neutral-800 space-y-3">
            <h4 className="font-extrabold text-white text-lg">At a Glance</h4>
            <ul className="text-xs text-neutral-300 space-y-2.5 pt-1">
              <li>• <strong>Who can participate:</strong> Pre-Level to Grade 10</li>
              <li>• <strong>Registration fee:</strong> Rs. 1,100 per student</li>
              <li>• <strong>Last date to register:</strong> 05 October 2026</li>
              <li>• <strong>Participation:</strong> Through schools / institutes</li>
            </ul>
          </div>

          <div className="bg-red-950/20 p-7 rounded-2xl border border-red-900/50 space-y-3">
            <h4 className="font-extrabold text-white text-lg">How to Register</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Complete the school registration form (also available under downloads), pay via bank transfer or JazzCash (minimum 10 students per group), and submit deposit slip copy.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-neutral-400 block uppercase">Registration & queries:</span>
              <a href={`https://wa.me/${siteContent.header.whatsapp}`} className="font-bold text-red-400 text-sm hover:underline">
                📞 {siteContent.header.whatsapp}
              </a>
            </div>
          </div>

          <div className="bg-neutral-950 p-7 rounded-2xl border border-neutral-800 space-y-3">
            <h4 className="font-extrabold text-white text-lg">For Online Payment</h4>
            <ul className="text-xs text-neutral-300 space-y-2 pt-1">
              <li>• <strong>Account Title:</strong> {contest.bankDetails.title}</li>
              <li>• <strong>Account No:</strong> {contest.bankDetails.accNo}</li>
              <li>• <strong>IBAN:</strong> {contest.bankDetails.iban}</li>
              <li>• <strong>Bank:</strong> {contest.bankDetails.bank}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. ABOUT US */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-red-500 font-extrabold text-xs uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Our Journey and Vision</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Our Mission Is To Provide The Intellectual, Interactive And Competitive Environment To Our Young Generation. By Organizing Competitions And Extracurricular Activities, MINDMORY Focuses On Preparing Students For Careers In This Rapidly Expanding Era.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-center gap-3 p-3 bg-black rounded-xl border border-neutral-800">
                <ShieldCheck className="w-6 h-6 text-red-500" />
                <span className="text-xs font-bold text-white">SAFE & SUPPORTIVE ENVIRONMENT</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black rounded-xl border border-neutral-800">
                <Sparkles className="w-6 h-6 text-red-500" />
                <span className="text-xs font-bold text-white">WIDE RANGE OF COMPETITIONS</span>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
              >
                <span>ABOUT US</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80" 
              alt="MINDMORY Vision" 
              className="w-72 sm:w-88 rounded-3xl border-4 border-neutral-800 shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80" 
              alt="Why Choose Us" 
              className="w-72 sm:w-88 rounded-3xl border-4 border-red-900/60 shadow-2xl object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <span className="text-red-500 font-extrabold text-xs uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Discover Why We’re the Best</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              At MINDMORY, we believe that every event should be a memorable experience. Where memories whisper loud — here are just a few reasons why we are the preferred choice for academic events:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl font-bold text-xs text-white">
                SAFE & SUPPORTIVE ENVIRONMENT
              </div>
              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl font-bold text-xs text-white">
                WIDE RANGE OF COMPETITIONS
              </div>
              <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl font-bold text-xs text-white">
                EXTRA CURRICULAR ACTIVITIES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INTERACTIVE LIVE QUIZ SPECIMEN */}
      <section className="py-14 px-4 sm:px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
              <PlayCircle className="w-4 h-4" /> Interactive Test Simulation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">Experience the Test Difficulty</h3>
            <p className="text-xs text-neutral-400">Attempt this 3-question live test sample to preview paper standards.</p>
          </div>

          <div className="bg-black p-8 rounded-3xl border border-neutral-800 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-800 pb-3">
              <span>Section: {quizQuestions[currentQuizIndex].category}</span>
              <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              Q{currentQuizIndex + 1}. {quizQuestions[currentQuizIndex].q}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizQuestions[currentQuizIndex].options.map((opt, i) => {
                const isSelected = selectedQuizAnswers[currentQuizIndex] === i;
                const isCorrect = i === quizQuestions[currentQuizIndex].correct;
                const answered = selectedQuizAnswers[currentQuizIndex] !== undefined;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuizAnswer(i)}
                    className={`p-3.5 rounded-xl text-xs font-semibold text-left transition border ${
                      answered
                        ? isSelected
                          ? isCorrect
                            ? "bg-green-950/80 border-green-600 text-green-300"
                            : "bg-red-950/80 border-red-600 text-red-300"
                          : isCorrect
                          ? "bg-green-950/40 border-green-800 text-green-400"
                          : "bg-neutral-900 border-neutral-800 text-neutral-400"
                        : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300"
                    }`}
                  >
                    <span className="font-mono text-neutral-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                disabled={currentQuizIndex === 0}
                onClick={() => setCurrentQuizIndex((prev) => prev - 1)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-xs font-bold rounded-xl text-white transition border border-neutral-800"
              >
                ← Previous
              </button>

              {currentQuizIndex < quizQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuizIndex((prev) => prev + 1)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold rounded-xl text-white transition"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuizResult(true)}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-xs font-bold rounded-xl text-white transition"
                >
                  Show Score Summary
                </button>
              )}
            </div>

            {showQuizResult && (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-center space-y-1">
                <p className="font-bold text-white text-sm">
                  Simulation Finished!
                </p>
                <p className="text-neutral-300">
                  You answered {Object.keys(selectedQuizAnswers).length} out of {quizQuestions.length} questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 12. READY TO TAKE THE CHALLENGE */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-neutral-950 via-red-950 to-neutral-950 text-white text-center border-y-2 border-red-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black">Ready to Take the Challenge?</h2>
          <p className="text-neutral-300 text-sm">Register your eligible students before {contest.deadline}.</p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="bg-black/80 border border-neutral-800 px-5 py-2.5 rounded-xl text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Registration Fee</span>
              <span className="font-extrabold text-red-500">Rs. {contest.feePerStudent || 1100} per student</span>
            </div>
            <div className="bg-black/80 border border-neutral-800 px-5 py-2.5 rounded-xl text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Eligibility</span>
              <span className="font-bold text-white">{contest.eligibility}</span>
            </div>
            <div className="bg-black/80 border border-neutral-800 px-5 py-2.5 rounded-xl text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">WhatsApp</span>
              <span className="font-mono font-bold text-white">{siteContent.header.whatsapp}</span>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={`https://wa.me/${siteContent.header.whatsapp}?text=I%20want%20to%20register%20my%20school%20now`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition transform hover:-translate-y-0.5 text-sm uppercase"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 13. RECENT BLOGS & PREPARATION ARTICLES WITH MODAL POPUP (OPTION A) */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-extrabold tracking-widest uppercase text-xs">
            Academic Insights & Guides
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase mt-1">
            Latest News & Contest Tips
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articlesData.map((blog) => (
            <div
              key={blog.id}
              className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden hover:border-red-600 transition group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-red-950/90 border border-red-600 text-red-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 space-y-2.5">
                  <span className="text-[10px] text-neutral-500 font-semibold">{blog.date}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setActiveArticle(blog)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-400 transition"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. FAQS ACCORDION */}
      <section className="py-16 px-4 sm:px-6 bg-black border-t border-neutral-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Clarifications</span>
            <h3 className="text-2xl sm:text-4xl font-black">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400">Everything schools and coordinators need to know.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left text-xs sm:text-sm font-bold text-white flex justify-between items-center hover:text-red-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === idx ? "rotate-180 text-red-500" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL 1: ARTICLE DETAIL MODAL (OPTION A) */}
      {activeArticle && (
        <div className="fixed inset-0 z-[130] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> {activeArticle.category} • {activeArticle.date}
              </span>
              <h3 className="text-2xl font-black text-white">{activeArticle.title}</h3>
            </div>

            <div className="h-56 overflow-hidden rounded-2xl border border-neutral-800">
              <img
                src={activeArticle.img}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <p className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-neutral-200 font-medium">
                {activeArticle.fullContent.intro}
              </p>

              <div className="space-y-3 pt-2">
                {activeArticle.fullContent.points.map((pt, pIdx) => (
                  <div key={pIdx} className="bg-black p-4 rounded-xl border border-neutral-800 space-y-1">
                    <h4 className="font-bold text-red-400 text-xs sm:text-sm">{pt.headline}</h4>
                    <p className="text-xs text-neutral-400">{pt.detail}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-neutral-400 italic pt-2 border-t border-neutral-900">
                📌 {activeArticle.fullContent.conclusion}
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs border border-neutral-700"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ON-SCREEN "MANAGE / ADD CATEGORIES" MODAL */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <button
              type="button"
              onClick={() => setIsManageModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
                Category Manager (Admin Mode)
              </span>
              <h3 className="text-xl font-black mt-1">Manage Contest Categories</h3>
              <p className="text-xs text-neutral-400">
                Add new disciplines or remove existing ones live on this screen.
              </p>
            </div>

            <div className="space-y-2 border-y border-neutral-800 py-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Active Categories ({categories.length})
              </span>
              {categories.map((cat) => (
                <div key={cat.id} className="flex justify-between items-center p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                  <div>
                    <span className="font-bold text-white block">{cat.name}</span>
                    <span className="text-[10px] text-neutral-500">{cat.tagline}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 transition"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                + Add New Category
              </span>

              <div>
                <label className="block text-[11px] text-neutral-300 font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spelling Bee / Mental Math"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-300 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Vocabulary & Linguistic Speed"
                  value={newCatTagline}
                  onChange={(e) => setNewCatTagline(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">Junior Grade Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Phonics & Spellings"
                    value={newCatJunior}
                    onChange={(e) => setNewCatJunior(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">Senior Grade Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Etymology & Advanced Vocab"
                    value={newCatSenior}
                    onChange={(e) => setNewCatSenior(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 font-bold text-xs py-2.5 rounded-xl transition text-white mt-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                Add Category to Website
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SAMPLE PAPER PREVIEW MODAL DRAWER */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setIsSampleModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
                Official Specimen Preview
              </span>
              <h3 className="text-2xl font-black">Examination Papers & Canvas Guidelines</h3>
              <p className="text-xs text-neutral-400">
                Specimen format for Elimination Round (20 Questions / Artwork Guidelines)
              </p>
            </div>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                <h4 className="font-bold text-red-400 text-sm">General Knowledge Structure:</h4>
                <p>• 20 Total Questions (Objective MCQs + One-word identification blanks).</p>
                <p>• Time Allocated: 20 Minutes under campus invigilation.</p>
                <p>• Negative Marking: None. 1 mark per accurate response.</p>
              </div>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                <h4 className="font-bold text-red-400 text-sm">Art & Creative Storytelling Criteria:</h4>
                <p>• Sheet Dimensions: Standard A3 / Quarter Imperial Sheet.</p>
                <p>• Medium Allowed: Crayons, pastels, watercolors, acrylics, or mixed media.</p>
                <p>• Mandatory: School rubber stamp and candidate desk slip affixed on reverse.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${siteContent.header.whatsapp}?text=Please%20send%20complete%20sample%20papers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-center text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Request PDF Bundle via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsSampleModalOpen(false)}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs border border-neutral-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. REUSABLE FOOTER COMPONENT */}
      <Footer />
    </div>
  );
}