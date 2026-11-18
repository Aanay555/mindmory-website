"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent, CompetitionCategory } from "@/data/content";
import {
  Brain,
  Palette,
  Download,
  CheckCircle2,
  Settings,
  Trash2,
  X,
  FileText,
  Info,
  Edit3,
  GraduationCap,
  Printer,
} from "lucide-react";

const GRADES = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10 / O Levels",
];

interface GradeSyllabusDetail {
  title: string;
  topics: string[];
}

type GradeSyllabusMap = Record<string, Record<string, GradeSyllabusDetail>>;

const buildDefaultGradeSyllabuses = (): GradeSyllabusMap => {
  const gkPrimary = [
    "Fascinating facts about science, space, nature & solar system.",
    "World geography, national symbols, flags & landmarks.",
    "History, prominent figures & general awareness.",
    "Analytical reasoning, everyday logic & observation.",
  ];
  const gkSecondary = [
    "Global affairs, international organizations & treaties.",
    "Physical geography, world capitals & modern history.",
    "Scientific breakthroughs, technology, AI & inventions.",
    "Competitive speed MCQs & critical problem-solving.",
  ];
  const artPrimary = [
    "Theme-based sketch rendering and shading fundamentals.",
    "Color blending, perspective perception & canvas storytelling.",
    "Original creative compositions and structured visual balance.",
    "Cultural heritage reflections through fine strokes.",
  ];
  const artSecondary = [
    "Abstract conceptualization and complex themed illustrations.",
    "Multi-medium experimentation (Pastels, Watercolors, Inks).",
    "Anatomy proportions, architectural framing & contrast mastery.",
    "Portfolio evaluation under national jury standards.",
  ];

  const map: GradeSyllabusMap = { gk: {}, art: {} };
  GRADES.forEach((grade, idx) => {
    const isPrimary = idx < 5;
    map.gk[grade] = {
      title: `${grade} — ${
        isPrimary
          ? "Foundational Knowledge & Discovery"
          : "Advanced Intellect & Critical Thinking"
      }`,
      topics: isPrimary ? [...gkPrimary] : [...gkSecondary],
    };
    map.art[grade] = {
      title: `${grade} — ${
        isPrimary
          ? "Visual Imagination & Colors"
          : "Masterstroke Technique & Conceptual Art"
      }`,
      topics: isPrimary ? [...artPrimary] : [...artSecondary],
    };
  });
  return map;
};

export default function SyllabusPage() {
  const [categories, setCategories] = useState<CompetitionCategory[]>(
    siteContent.categories
  );
  const [selectedCatId, setSelectedCatId] = useState<string>(
    categories[0]?.id || "gk"
  );
  const [selectedGrade, setSelectedGrade] = useState<string>("Grade 1");
  const [gradeSyllabuses, setGradeSyllabuses] = useState<GradeSyllabusMap>(
    buildDefaultGradeSyllabuses
  );
  const [syllabusDownloaded, setSyllabusDownloaded] = useState(false);

  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatJunior, setNewCatJunior] = useState("");
  const [newCatSenior, setNewCatSenior] = useState("");

  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);
  const [editGradeTitle, setEditGradeTitle] = useState("");
  const [editGradeTopicsText, setEditGradeTopicsText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mindmory_grade_syllabuses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setGradeSyllabuses((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  const currentCategory =
    categories.find((c) => c.id === selectedCatId) || categories[0];

  const isPrimaryGrade = GRADES.indexOf(selectedGrade) < 5;
  const currentGradeDetail: GradeSyllabusDetail = gradeSyllabuses[
    currentCategory.id
  ]?.[selectedGrade] || {
    title: `${selectedGrade} — ${
      isPrimaryGrade ? currentCategory.juniorTitle : currentCategory.seniorTitle
    }`,
    topics: isPrimaryGrade
      ? currentCategory.juniorTopics
      : currentCategory.seniorTopics,
  };

  const handleDownloadSyllabusFile = () => {
    const notice =
      currentCategory.id === "art"
        ? "Drawing sheets will be supplied by Secretariat. Students must bring their own colors and pencil kit."
        : "Paper will be conducted exclusively in English. 30 MCQs with 15 minutes test duration.";

    const content = [
      "MINDMORY — Where Memories Whisper Loud",
      `OFFICIAL CONTEST SYLLABUS (2026–2027)`,
      "================================================================",
      `Discipline: ${currentCategory.name}`,
      `Grade: ${selectedGrade}`,
      `Curriculum Title: ${currentGradeDetail.title}`,
      "",
      "PRESCRIBED TOPICS & GUIDELINES:",
      ...currentGradeDetail.topics.map((t, idx) => `${idx + 1}. ${t}`),
      "",
      "OFFICIAL EXAMINATION NOTICE:",
      notice,
      "",
      "MINDMORY Central Examination Directorate • Karachi, Sindh, Pakistan",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MINDMORY-Syllabus-${currentCategory.id}-${selectedGrade.replace(/[^a-zA-Z0-9]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSyllabusDownloaded(true);
    setTimeout(() => setSyllabusDownloaded(false), 3000);
  };

  const openEditGradeModal = () => {
    setEditGradeTitle(currentGradeDetail.title);
    setEditGradeTopicsText(currentGradeDetail.topics.join("\n"));
    setIsEditGradeOpen(true);
  };

  const handleSaveGradeSyllabus = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedTopics = editGradeTopicsText
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updatedMap: GradeSyllabusMap = {
      ...gradeSyllabuses,
      [currentCategory.id]: {
        ...(gradeSyllabuses[currentCategory.id] || {}),
        [selectedGrade]: {
          title:
            editGradeTitle.trim() ||
            `${selectedGrade} — ${currentCategory.name}`,
          topics:
            cleanedTopics.length > 0
              ? cleanedTopics
              : ["Grade-specific syllabus topics will be updated shortly."],
        },
      },
    };

    setGradeSyllabuses(updatedMap);
    try {
      localStorage.setItem(
        "mindmory_grade_syllabuses",
        JSON.stringify(updatedMap)
      );
    } catch {}
    setIsEditGradeOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newId = newCatName.toLowerCase().replace(/\s+/g, "-");
    const newCategory: CompetitionCategory = {
      id: newId,
      name: newCatName.trim(),
      tagline: "Institutional Academic Competition",
      iconName: "brain",
      juniorGrade: "Grade 1 to Grade 5",
      juniorTitle: newCatJunior || "Foundation Level Topics",
      juniorTopics: [
        "Core fundamental concepts & identification.",
        "Observation reasoning & guided thinking.",
        "Curriculum-matched basic questions.",
      ],
      seniorGrade: "Grade 6 to Grade 10 / O Levels",
      seniorTitle: newCatSenior || "Advanced Level Topics",
      seniorTopics: [
        "Analytical problem solving & critical logic.",
        "Advanced thematic depth & conceptual evaluation.",
        "National competition level benchmarks.",
      ],
    };

    const newCategoryGradeMap: Record<string, GradeSyllabusDetail> = {};
    GRADES.forEach((g, idx) => {
      const prim = idx < 5;
      newCategoryGradeMap[g] = {
        title: `${g} — ${
          prim ? newCategory.juniorTitle : newCategory.seniorTitle
        }`,
        topics: prim ? newCategory.juniorTopics : newCategory.seniorTopics,
      };
    });

    const updatedMap: GradeSyllabusMap = {
      ...gradeSyllabuses,
      [newId]: newCategoryGradeMap,
    };

    setGradeSyllabuses(updatedMap);
    setCategories([...categories, newCategory]);
    setSelectedCatId(newId);
    setNewCatName("");
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

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Pictorial Header Banner */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=95"
          alt="MINDMORY Official Grade-Wise Syllabus"
          className="w-full h-64 sm:h-72 object-cover object-center brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/30 flex items-center justify-center px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest drop-shadow">
              Academic Curriculum &amp; Guidelines
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow">
              Official Grade-Wise Syllabus 2026–27
            </h1>
            <p className="text-neutral-200 text-xs sm:text-sm max-w-2xl mx-auto drop-shadow">
              Select your competition discipline and grade (Grade 1 to Grade 10 / O Levels) to view prescribed English-medium syllabus topics and examination rules.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Category Switcher + Manage Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 flex justify-center items-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCatId(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              selectedCatId === cat.id
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            {cat.id === "gk" ? (
              <Brain className="w-4 h-4" />
            ) : (
              <Palette className="w-4 h-4" />
            )}
            {cat.name}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsManageModalOpen(true)}
          className="px-4 py-3 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-red-400 border border-red-900/60 transition flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          <span>Manage Categories</span>
        </button>
      </div>

      {/* GRADE-WISE SELECTOR TABS */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-mono uppercase font-bold text-neutral-400 px-2 shrink-0 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-red-500" />
            <span>Select Grade:</span>
          </span>
          {GRADES.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => setSelectedGrade(grade)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedGrade === grade
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-black text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Grade-wise Curriculum Breakdown */}
      <section className="max-w-7xl mx-auto px-4 pb-20 pt-2 space-y-6">
        <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6 text-left shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-red-950 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-800">
                  {selectedGrade}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {isPrimaryGrade ? "Primary Division" : "Secondary Division"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {currentGradeDetail.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={openEditGradeModal}
              className="self-start sm:self-auto px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-red-600 text-xs font-bold text-neutral-200 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-red-500" />
              <span>Update {selectedGrade} Syllabus</span>
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              Prescribed Topics &amp; Guidelines ({selectedGrade})
            </span>
            <ul className="text-xs sm:text-sm space-y-3 text-neutral-300">
              {currentGradeDetail.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OFFICIAL EXAMINATION NOTICE */}
        <div className="bg-neutral-950/90 border border-red-950 p-5 rounded-2xl flex items-start gap-3.5 text-left">
          <div className="w-8 h-8 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
              OFFICIAL EXAMINATION NOTICE &amp; INSTRUCTIONS:
            </span>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {currentCategory.id === "art"
                ? "Drawing sheets will be supplied by Secretariat. Students must bring their own colors and pencil kit."
                : "Paper will be conducted exclusively in English. 30 MCQs with 15 minutes test duration."}
            </p>
          </div>
        </div>

        {/* DIRECT DOWNLOAD & PRINT ACTIONS */}
        <div className="pt-6 text-center space-y-4">
          <p className="text-xs text-neutral-400">
            Download or print the prescribed syllabus directly for your school notice board:
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadSyllabusFile}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {syllabusDownloaded
                  ? `Downloaded ${selectedGrade} Syllabus!`
                  : `Download ${selectedGrade} Syllabus`}
              </span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold px-6 py-3.5 rounded-xl transition text-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>

            <Link
              href="/paper-pattern"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold px-6 py-3.5 rounded-xl transition text-sm"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>View Model Papers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* EDIT GRADE SYLLABUS MODAL */}
      {isEditGradeOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl space-y-4 text-left">
            <button
              type="button"
              onClick={() => setIsEditGradeOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
                GRADE-WISE CURRICULUM EDITOR
              </span>
              <h3 className="text-xl font-black mt-1">
                Edit {selectedGrade} ({currentCategory.name})
              </h3>
            </div>

            <form onSubmit={handleSaveGradeSyllabus} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold mb-1">
                  Syllabus Heading
                </label>
                <input
                  type="text"
                  required
                  value={editGradeTitle}
                  onChange={(e) => setEditGradeTitle(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1">
                  Prescribed Topics (1 line = 1 bullet point)
                </label>
                <textarea
                  rows={6}
                  required
                  value={editGradeTopicsText}
                  onChange={(e) => setEditGradeTopicsText(e.target.value)}
                  placeholder="Enter grade-wise syllabus topics here..."
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 font-bold text-xs py-3 rounded-xl transition text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer"
              >
                Save {selectedGrade} Syllabus
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE CATEGORIES MODAL */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 text-left">
            <button
              type="button"
              onClick={() => setIsManageModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
                Category Manager
              </span>
              <h3 className="text-xl font-black mt-1">
                Manage Syllabus Disciplines
              </h3>
              <p className="text-xs text-neutral-400">
                Add new subjects/disciplines or remove existing ones live.
              </p>
            </div>

            <div className="space-y-2 border-y border-neutral-800 py-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Active Disciplines ({categories.length})
              </span>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{cat.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 transition cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                + Add New Discipline
              </span>

              <div>
                <label className="block text-[11px] text-neutral-300 font-semibold mb-1">
                  Discipline Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spelling Bee / Mental Math"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">
                    Primary Grade Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Phonics & Spellings"
                    value={newCatJunior}
                    onChange={(e) => setNewCatJunior(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 mb-1">
                    Secondary Grade Title
                  </label>
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
                className="w-full bg-red-600 hover:bg-red-700 font-bold text-xs py-2.5 rounded-xl transition text-white mt-2 shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer"
              >
                Add Category to Syllabus
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
