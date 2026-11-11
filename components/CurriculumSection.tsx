"use client";
import React, { useState } from "react";
import { Plus, X, Layers, Check } from "lucide-react";

interface Discipline {
  id: string;
  name: string;
  primaryTitle: string;
  primaryPoints: string[];
  secondaryTitle: string;
  secondaryPoints: string[];
}

export default function CurriculumSection() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([
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
      ]
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
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>("gk");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newId = `cat_${Date.now()}`;
    const newDiscipline: Discipline = {
      id: newId,
      name: newCatName.trim(),
      primaryTitle: `${newCatName.trim()} - Primary Division (Class 1 to 5)`,
      primaryPoints: [
        `Core principles & fundamental foundations of ${newCatName.trim()}.`,
        "Interactive puzzles, observation rounds & thematic identification.",
        "Basic terminology, introductory quizzes and standard concepts.",
        "Activity-based deduction structured for primary grades."
      ],
      secondaryTitle: `${newCatName.trim()} - Secondary Division (Grade 6 to 10)`,
      secondaryPoints: [
        `High-tier analytical reasoning in ${newCatName.trim()}.`,
        "O Levels & Secondary syllabus speed evaluation scenarios.",
        "Competitive problem-solving, deep analysis & national bench-marking.",
        "Real-world application models and high-difficulty MCQs."
      ]
    };

    setDisciplines((prev) => [...prev, newDiscipline]);
    setActiveTab(newId);
    setNewCatName("");
    setShowAddModal(false);
  };

  const current = disciplines.find((d) => d.id === activeTab) || disciplines[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-900">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase block mb-1">
            Curriculum Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Official Disciplines & Criteria
          </h2>
        </div>

        {/* + Add Category Button */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-bold rounded-xl border border-neutral-800 hover:border-red-600 transition shadow-sm cursor-pointer"
        >
          <div className="w-4 h-4 rounded-md bg-red-600 flex items-center justify-center text-white">
            <Plus className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Add Category</span>
        </button>
      </div>

      {/* Clickable Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
        {disciplines.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === cat.id
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content Cards that update instantly on Tab click */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Division Card */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-900/60">
                Class 1 to Grade 5
              </span>
              <span className="text-[11px] font-medium text-neutral-500">Primary Division</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4">
              {current.primaryTitle}
            </h3>
            <ul className="space-y-3">
              {current.primaryPoints.map((pt, i) => (
                <li key={i} className="text-xs text-neutral-400 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-500 font-black mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary Division Card */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-900/60">
                Grade 6 to 10 / O Levels
              </span>
              <span className="text-[11px] font-medium text-neutral-500">Secondary Division</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4">
              {current.secondaryTitle}
            </h3>
            <ul className="space-y-3">
              {current.secondaryPoints.map((pt, i) => (
                <li key={i} className="text-xs text-neutral-400 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-amber-500 font-black mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 text-white relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">DISCIPLINE SETUP</span>
                <h3 className="text-sm font-black">Add New Category</h3>
              </div>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Olympiad, English"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
