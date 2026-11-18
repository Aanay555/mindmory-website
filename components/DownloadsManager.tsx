"use client";

import React, { useState, useEffect } from "react";
import {
  FileUp,
  Trash2,
  CheckCircle2,
  FolderDown,
  Edit3,
  X,
  FileText,
  RotateCcw,
} from "lucide-react";

export interface CustomDownloadDoc {
  id: string;
  title: string;
  description: string;
  badge: string;
  fileName: string;
  fileDataUrl: string;
  updatedAt: string;
}

export const CORE_DEFAULT_DOCS = [
  {
    id: "default_reg_form",
    title: "Official School Registration Form 2026–27 (PDF)",
    badge: "Institutional Form",
    desc: "Official bulk enrollment form for registered schools (Class 1 to Grade 10 & O Levels). Download, fill candidate details, and submit to MINDMORY Secretariat.",
    fileName: "MINDMORY-School-Registration-Form-2026.pdf",
  },
  {
    id: "default_syllabus",
    title: "Grade-Wise Official Syllabus Circular (Grades 1–10)",
    badge: "Curriculum PDF",
    desc: "Complete English-medium syllabus guidelines for General Knowledge, Science & Discovery, and Art & Creative Expression.",
    fileName: "MINDMORY-Official-Syllabus-2026.pdf",
  },
  {
    id: "default_model_paper",
    title: "Model Papers & 30-MCQ Exam Pattern Guide",
    badge: "Exam Prep PDF",
    desc: "Official computerized test structure, 15-minute timer rules, marking scheme, and sample English-medium MCQs.",
    fileName: "MINDMORY-Model-Paper-Guide-2026.pdf",
  },
  {
    id: "default_awards",
    title: "National Distinction Awards & Honors Criteria",
    badge: "Honors PDF",
    desc: "Official medal thresholds, distinction certificates, and Best Participating School Trophy evaluation criteria.",
    fileName: "MINDMORY-Awards-Criteria-2026.pdf",
  },
];

export default function DownloadsManager() {
  const [docs, setDocs] = useState<CustomDownloadDoc[]>([]);
  const [hiddenDefaultIds, setHiddenDefaultIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("Official PDF Form");
  const [fileName, setFileName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindmory_custom_downloads");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setDocs(parsed);
      }
      const hidden = localStorage.getItem("mindmory_hidden_default_downloads");
      if (hidden) {
        const parsedHidden = JSON.parse(hidden);
        if (Array.isArray(parsedHidden)) setHiddenDefaultIds(parsedHidden);
      }
    } catch {}
  }, []);

  const persistDocs = (updated: CustomDownloadDoc[]) => {
    setDocs(updated);
    try {
      localStorage.setItem("mindmory_custom_downloads", JSON.stringify(updated));
    } catch {
      alert("Browser storage limit reached. Please use a file smaller than 3.5MB.");
    }
  };

  const persistHiddenDefaults = (updatedHidden: string[]) => {
    setHiddenDefaultIds(updatedHidden);
    try {
      localStorage.setItem(
        "mindmory_hidden_default_downloads",
        JSON.stringify(updatedHidden)
      );
    } catch {}
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3.5 * 1024 * 1024) {
      alert("Please select a file smaller than 3.5MB (PDF, DOCX, JPG, or PNG).");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBadge("Official PDF Form");
    setFileName("");
    setFileDataUrl("");
    setEditingId(null);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!editingId && !fileDataUrl) {
      alert("Please upload a PDF, Word, or Image file first.");
      return;
    }

    if (editingId) {
      const updated = docs.map((d) =>
        d.id === editingId
          ? {
              ...d,
              title: title.trim(),
              description: description.trim() || d.description,
              badge: badge.trim() || "Official Document",
              fileName: fileName || d.fileName,
              fileDataUrl: fileDataUrl || d.fileDataUrl,
              updatedAt: new Date().toLocaleDateString(),
            }
          : d
      );
      persistDocs(updated);
    } else {
      const newDoc: CustomDownloadDoc = {
        id: "doc_" + Date.now(),
        title: title.trim(),
        description:
          description.trim() ||
          "Official MINDMORY institutional form & examination circular.",
        badge: badge.trim() || "Official PDF Form",
        fileName: fileName || "mindmory-document.pdf",
        fileDataUrl,
        updatedAt: new Date().toLocaleDateString(),
      };
      persistDocs([newDoc, ...docs]);
    }

    resetForm();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleEditStart = (doc: CustomDownloadDoc) => {
    setEditingId(doc.id);
    setTitle(doc.title);
    setDescription(doc.description);
    setBadge(doc.badge);
    setFileName(doc.fileName);
    setFileDataUrl("");
  };

  const handleDeleteCustom = (id: string) => {
    if (!confirm("Delete this uploaded document permanently?")) return;
    persistDocs(docs.filter((d) => d.id !== id));
    if (editingId === id) resetForm();
  };

  const handleDeleteDefault = (id: string) => {
    if (!confirm("Remove this built-in form from the public Downloads page?")) return;
    if (!hiddenDefaultIds.includes(id)) {
      persistHiddenDefaults([...hiddenDefaultIds, id]);
    }
  };

  const handleRestoreDefaults = () => {
    persistHiddenDefaults([]);
  };

  const activeDefaults = CORE_DEFAULT_DOCS.filter(
    (item) => !hiddenDefaultIds.includes(item.id)
  );

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-xl my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
            <FolderDown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
              SELF-SERVICE DOWNLOADS PUBLISHER
            </span>
            <h2 className="text-lg font-black text-white">
              Add, Edit &amp; Delete Official Forms &amp; Study Material
            </h2>
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Active Files: {docs.length + activeDefaults.length}
        </span>
      </div>

      {/* Upload / Edit Form */}
      <form onSubmit={handleSaveDoc} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold text-neutral-300 mb-1">
            Document / Form Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Official School Registration Form 2026 (PDF)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block font-bold text-neutral-300 mb-1">Category Badge</label>
          <select
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          >
            <option value="Official PDF Form">Official PDF Form</option>
            <option value="Syllabus & Guidelines">Syllabus &amp; Guidelines</option>
            <option value="Past / Model Paper">Past / Model Paper</option>
            <option value="Fee Voucher / Circular">Fee Voucher / Circular</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-bold text-neutral-300 mb-1">
            Short Description / Instructions for Schools
          </label>
          <input
            type="text"
            placeholder="e.g. Download, print, fill candidate details, and forward to Secretariat."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-bold text-neutral-300 mb-1">
            {editingId
              ? `Replace File (Optional — Current: ${fileName})`
              : "Upload File (PDF, DOC/DOCX, JPG, PNG — Max 3.5MB)"}
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFilePick}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-neutral-300 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white cursor-pointer"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </button>
          ) : (
            <span className="text-[11px] text-neutral-500">
              All changes reflect immediately on the public /downloads page.
            </span>
          )}

          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-lg shadow-red-600/30"
          >
            {savedMsg ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                <span>Saved &amp; Live on Downloads!</span>
              </>
            ) : (
              <>
                <FileUp className="w-4 h-4" />
                <span>{editingId ? "Update Document" : "Publish to Downloads"}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 1. Uploaded Custom Documents (Edit + Delete) */}
      {docs.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-neutral-900">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
            Uploaded Custom Documents ({docs.length})
          </h3>
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-black border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-white">{doc.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800 text-amber-300 font-mono">
                      {doc.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{doc.description}</p>
                  <span className="text-[10px] font-mono text-neutral-500">
                    File: {doc.fileName} • Updated: {doc.updatedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEditStart(doc)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCustom(doc.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Built-in Default Forms & Documents (Delete / Restore) */}
      <div className="space-y-2.5 pt-4 border-t border-neutral-900">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">
            Built-in Default Forms &amp; Guides ({activeDefaults.length})
          </h3>
          {hiddenDefaultIds.length > 0 && (
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Removed Defaults ({hiddenDefaultIds.length})</span>
            </button>
          )}
        </div>

        {activeDefaults.length === 0 ? (
          <p className="text-xs text-neutral-500">
            All built-in default forms have been removed from the public Downloads page.
          </p>
        ) : (
          activeDefaults.map((item) => (
            <div
              key={item.id}
              className="bg-black border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteDefault(item.id)}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
