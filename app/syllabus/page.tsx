"use client";
import React, { useState } from "react";
import Link from "next/link";
import { siteContent, CompetitionCategory } from "@/data/content";
import { 
  Brain, 
  Palette, 
  Download, 
  CheckCircle2, 
  Settings, 
  PlusCircle, 
  Trash2, 
  X,
  FileText
} from "lucide-react";

export default function SyllabusPage() {
  const [categories, setCategories] = useState<CompetitionCategory[]>(siteContent.categories);
  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || "gk");
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

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            Academic Curriculum & Guidelines
          </span>
          <h1 className="text-4xl sm:text-5xl font-black">Official Contest Syllabus 2026–27</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Comprehensive curriculum criteria, medium guidelines, and age-appropriate topics structured for Pre-Level to Grade 10 students across all disciplines.
          </p>
        </div>
      </section>

      {/* Dynamic Category Switcher + Manage Button */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCatId(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              selectedCatId === cat.id
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            {cat.id === "gk" ? <Brain className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
            {cat.name}
          </button>
        ))}

        {/* Manage / Add Category Button for Syllabus Page */}
        <button
          type="button"
          onClick={() => setIsManageModalOpen(true)}
          className="px-4 py-3 rounded-xl font-bold text-xs bg-neutral-800 hover:bg-neutral-700 text-red-400 border border-red-900/60 transition flex items-center gap-1.5 shadow-md"
        >
          <Settings className="w-4 h-4" />
          <span>Manage Categories</span>
        </button>
      </div>

      {/* Grade-wise Curriculum Breakdown */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Junior Grade Card */}
          <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="inline-block bg-red-950 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-800 mb-2">
                {currentCategory.juniorGrade}
              </span>
              <h2 className="text-2xl font-black text-white">{currentCategory.juniorTitle}</h2>
              <p className="text-xs text-neutral-400 mt-1">{currentCategory.tagline}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                Prescribed Topics & Guidelines
              </span>
              <ul className="text-xs space-y-3 text-neutral-300">
                {currentCategory.juniorTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Senior Grade Card */}
          <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="inline-block bg-red-950 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-800 mb-2">
                {currentCategory.seniorGrade}
              </span>
              <h2 className="text-2xl font-black text-white">{currentCategory.seniorTitle}</h2>
              <p className="text-xs text-neutral-400 mt-1">{currentCategory.tagline}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                Prescribed Topics & Guidelines
              </span>
              <ul className="text-xs space-y-3 text-neutral-300">
                {currentCategory.seniorTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Link to Downloads */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-xs text-neutral-400">
            Looking for printable registration sheets and previous specimen papers?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`https://wa.me/${siteContent.header.whatsapp}?text=Please%20send%20complete%20PDF%20Syllabus%20for%20${encodeURIComponent(currentCategory.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            >
              <Download className="w-4 h-4" /> Download Official {currentCategory.name} PDF
            </a>
            <Link
              href="/paper-pattern"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold px-6 py-3.5 rounded-xl transition text-sm"
            >
              <FileText className="w-4 h-4 text-red-500" /> View Paper Pattern & Rubrics
            </Link>
          </div>
        </div>
      </section>

      {/* MANAGE CATEGORIES MODAL (Syllabus Page) */}
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
                Category Manager
              </span>
              <h3 className="text-xl font-black mt-1">Manage Syllabus Disciplines</h3>
              <p className="text-xs text-neutral-400">
                Add new subjects/disciplines or remove existing ones live.
              </p>
            </div>

            {/* List Active Categories */}
            <div className="space-y-2 border-y border-neutral-800 py-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Active Disciplines ({categories.length})
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

            {/* Form */}
            <form onSubmit={handleAddCategory} className="space-y-3">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                + Add New Discipline
              </span>

              <div>
                <label className="block text-[11px] text-neutral-300 font-semibold mb-1">Discipline Name</label>
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
                Add Category to Syllabus
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}