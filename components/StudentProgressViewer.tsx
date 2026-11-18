"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileBarChart2,
  CheckCircle2,
  XCircle,
  X,
  Search,
  Printer,
  Award,
  Clock,
  HelpCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AnswerRecord {
  question?: string;
  selectedOption?: string;
  correctOption?: string;
  isCorrect?: boolean;
}

interface StudentProgress {
  id?: string;
  rollNo: string;
  name: string;
  fatherName?: string;
  school?: string;
  grade?: string;
  category?: string;
  city?: string;
  payment_status?: string;
  testStatus?: string;
  testScore?: number | string | null;
  score?: number | string | null;
  marks?: number | string | null;
  obtainedMarks?: number | string | null;
  result?: number | string | null;
  totalQuestions?: number;
  totalMarks?: number;
  correctCount?: number;
  correctAnswers?: number;
  wrongCount?: number;
  wrongAnswers?: number;
  skippedCount?: number;
  timeTaken?: string;
  submittedAt?: string;
  answers?: AnswerRecord[];
  responses?: AnswerRecord[];
  attemptDetails?: AnswerRecord[];
  [key: string]: any;
}

const ITEMS_PER_PAGE = 10;

function extractNumericScore(rawVal: unknown): number | null {
  if (rawVal === null || rawVal === undefined || rawVal === "") return null;
  if (typeof rawVal === "number" && !Number.isNaN(rawVal)) return rawVal;
  if (typeof rawVal === "string") {
    const slashMatch = rawVal.match(/(\d+)\s*\/\s*(\d+)/);
    if (slashMatch) return parseInt(slashMatch[1], 10);
    const numMatch = rawVal.match(/(\d+)/);
    if (numMatch) return parseInt(numMatch[1], 10);
  }
  return null;
}

function extractTotalFromRaw(rawVal: unknown): number | null {
  if (typeof rawVal === "string") {
    const slashMatch = rawVal.match(/(\d+)\s*\/\s*(\d+)/);
    if (slashMatch) return parseInt(slashMatch[2], 10);
  }
  return null;
}

export default function StudentProgressViewer() {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [extraResultsByRoll, setExtraResultsByRoll] = useState<Record<string, any>>({});
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshedBadge, setRefreshedBadge] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

  const loadStudents = useCallback((showFeedback = false) => {
    if (showFeedback) setIsRefreshing(true);

    try {
      // 1. Scan all localStorage keys for student & result records
      const resultMap: Record<string, any> = {};
      let foundStudents: StudentProgress[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const val = localStorage.getItem(key);
        if (!val) continue;

        if (key === "mindmory_students") {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) foundStudents = parsed;
          } catch {}
        } else if (
          key.toLowerCase().includes("result") ||
          key.toLowerCase().includes("submission") ||
          key.toLowerCase().includes("exam") ||
          key.toLowerCase().includes("test")
        ) {
          try {
            const parsedRes = JSON.parse(val);
            if (Array.isArray(parsedRes)) {
              parsedRes.forEach((r: any) => {
                const roll = String(r?.rollNo || r?.rollNumber || "").trim().toUpperCase();
                if (roll) resultMap[roll] = { ...(resultMap[roll] || {}), ...r };
              });
            } else if (parsedRes && typeof parsedRes === "object") {
              const singleRoll = String(
                parsedRes.rollNo || parsedRes.rollNumber || ""
              )
                .trim()
                .toUpperCase();
              if (singleRoll) {
                resultMap[singleRoll] = { ...(resultMap[singleRoll] || {}), ...parsedRes };
              } else {
                Object.entries(parsedRes).forEach(([k, v]) => {
                  if (v && typeof v === "object") {
                    resultMap[k.trim().toUpperCase()] = {
                      ...(resultMap[k.trim().toUpperCase()] || {}),
                      ...(v as Record<string, any>),
                    };
                  }
                });
              }
            }
          } catch {}
        }
      }

      setStudents([...foundStudents]);
      setExtraResultsByRoll({ ...resultMap });
    } catch {}

    if (showFeedback) {
      setTimeout(() => {
        setIsRefreshing(false);
        setRefreshedBadge(true);
        setTimeout(() => setRefreshedBadge(false), 2000);
      }, 300);
    }
  }, []);

  useEffect(() => {
    loadStudents(false);

    const handleStorageSync = () => loadStudents(false);
    window.addEventListener("storage", handleStorageSync);
    window.addEventListener("focus", handleStorageSync);
    return () => {
      window.removeEventListener("storage", handleStorageSync);
      window.removeEventListener("focus", handleStorageSync);
    };
  }, [loadStudents]);

  // Reset to Page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filtered = students.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (s.name || "").toLowerCase().includes(q) ||
      (s.rollNo || "").toLowerCase().includes(q) ||
      (s.school || "").toLowerCase().includes(q)
    );
  });

  // Pagination Calculations (10 records per page)
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getBreakdown = (st: StudentProgress) => {
    const rollKey = String(st.rollNo || "").trim().toUpperCase();
    const extra = extraResultsByRoll[rollKey] || {};
    const merged = { ...extra, ...st };

    const rawCandidates = [
      merged.testScore,
      merged.score,
      merged.marks,
      merged.obtainedMarks,
      merged.correctCount,
      merged.correctAnswers,
      merged.result,
      extra.score,
      extra.testScore,
      extra.marks,
      extra.obtainedMarks,
    ];

    let detectedScore: number | null = null;
    let detectedTotal: number | null = null;

    for (const val of rawCandidates) {
      if (detectedScore === null) {
        const parsed = extractNumericScore(val);
        if (parsed !== null) detectedScore = parsed;
      }
      if (detectedTotal === null) {
        const tot = extractTotalFromRaw(val);
        if (tot !== null) detectedTotal = tot;
      }
    }

    const answerList: any[] =
      (Array.isArray(merged.answers) && merged.answers.length > 0 && merged.answers) ||
      (Array.isArray(merged.responses) && merged.responses.length > 0 && merged.responses) ||
      (Array.isArray(merged.attemptDetails) &&
        merged.attemptDetails.length > 0 &&
        merged.attemptDetails) ||
      (Array.isArray(extra.answers) && extra.answers.length > 0 && extra.answers) ||
      [];

    const total =
      merged.totalQuestions ||
      merged.totalMarks ||
      detectedTotal ||
      (answerList.length > 0 ? answerList.length : 30);

    const correctFromAnswers =
      answerList.length > 0
        ? answerList.filter(
            (a) =>
              a.isCorrect === true ||
              (a.selectedOption &&
                a.correctOption &&
                String(a.selectedOption).trim() === String(a.correctOption).trim())
          ).length
        : null;

    const correct =
      typeof merged.correctCount === "number"
        ? merged.correctCount
        : typeof merged.correctAnswers === "number"
        ? merged.correctAnswers
        : detectedScore !== null
        ? detectedScore
        : correctFromAnswers !== null
        ? correctFromAnswers
        : 0;

    const skipped = typeof merged.skippedCount === "number" ? merged.skippedCount : 0;
    const wrong =
      typeof merged.wrongCount === "number"
        ? merged.wrongCount
        : typeof merged.wrongAnswers === "number"
        ? merged.wrongAnswers
        : Math.max(0, total - correct - skipped);

    const isDone =
      merged.testStatus === "Completed" ||
      merged.status === "Completed" ||
      detectedScore !== null ||
      answerList.length > 0;

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, wrong, skipped, pct, isDone, answerList, merged };
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-xl my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
            <FileBarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
              EXAMINATION ANALYTICS &amp; ANSWER SHEETS
            </span>
            <h2 className="text-lg font-black text-white">
              Individual Student Progress &amp; MCQ Breakdown
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Roll No, Name, School..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-black border border-neutral-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <button
            type="button"
            onClick={() => loadStudents(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-red-600 rounded-xl text-xs font-bold text-neutral-200 cursor-pointer transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-red-500 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{refreshedBadge ? "Updated!" : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Students Table (10 Records Per Page) */}
      {paginatedStudents.length === 0 ? (
        <p className="text-xs text-neutral-500 py-6 text-center">
          No candidate records found yet. Once students register or submit their 30-MCQ test, their complete progress cards will appear here.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] uppercase font-mono text-neutral-400">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-3">Candidate &amp; School</th>
                  <th className="py-3 px-3">Grade / Subject</th>
                  <th className="py-3 px-3">Exam Status</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3 text-right">Complete Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {paginatedStudents.map((st, index) => {
                  const { total, correct, pct, isDone } = getBreakdown(st);
                  const serialNo = startIndex + index + 1;

                  return (
                    <tr
                      key={st.id || st.rollNo || serialNo}
                      className="hover:bg-neutral-900/40 transition"
                    >
                      <td className="py-3 px-3 font-mono text-neutral-500">{serialNo}</td>
                      <td className="py-3 px-3 font-mono font-bold text-red-400">{st.rollNo}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-white block">{st.name}</span>
                        <span className="text-[11px] text-neutral-500">{st.school}</span>
                      </td>
                      <td className="py-3 px-3 text-neutral-300">
                        {st.grade} • <span className="text-amber-400">{st.category}</span>
                      </td>
                      <td className="py-3 px-3">
                        {isDone ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-green-950/80 border border-green-700 text-green-400 text-[10px] font-bold uppercase">
                            Submitted
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 text-[10px] font-bold uppercase">
                            Pending Test
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">
                        {isDone ? `${correct} / ${total} (${pct}%)` : "—"}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(st)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-[11px] transition cursor-pointer shadow-md shadow-red-600/20"
                        >
                          <FileBarChart2 className="w-3.5 h-3.5" />
                          <span>View Progress</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS (10 PER PAGE) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-900 text-xs">
            <span className="text-neutral-400 font-mono text-[11px]">
              Showing <strong className="text-white">{startIndex + 1}</strong>–
              <strong className="text-white">
                {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
              </strong>{" "}
              of <strong className="text-white">{filtered.length}</strong> candidates (10 per page)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-600 cursor-pointer transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl font-mono font-bold text-xs transition cursor-pointer ${
                    safePage === pageNum
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-600 cursor-pointer transition"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* COMPLETE STUDENT PROGRESS REPORT MODAL */}
      {selectedStudent &&
        (() => {
          const { total, correct, wrong, pct, isDone, answerList, merged } =
            getBreakdown(selectedStudent);

          return (
            <div
              onClick={() => setSelectedStudent(null)}
              className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-950 border-2 border-red-600 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-white relative shadow-2xl space-y-6 my-8 text-left max-h-[90vh] overflow-y-auto"
              >
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Student Profile */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 pr-8">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 block">
                      CANDIDATE COMPLETE PROGRESS DOSSIER
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      {selectedStudent.name}{" "}
                      <span className="text-sm font-mono text-amber-400">
                        ({selectedStudent.rollNo})
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {selectedStudent.school} • {selectedStudent.grade} •{" "}
                      {selectedStudent.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="self-start px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print Report</span>
                  </button>
                </div>

                {/* 4 KPI Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-black border border-neutral-800 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                      Final Score
                    </span>
                    <span className="text-xl font-black text-white mt-1 block">
                      {isDone ? `${correct} / ${total}` : "Not Attempted"}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">
                      {isDone ? `${pct}% Accuracy` : "Awaiting Test"}
                    </span>
                  </div>

                  <div className="bg-green-950/30 border border-green-800/70 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-mono text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                    <span className="text-2xl font-black text-green-400 mt-1 block">
                      {isDone ? correct : 0}
                    </span>
                    <span className="text-[11px] text-neutral-400">Right Answers</span>
                  </div>

                  <div className="bg-red-950/30 border border-red-800/70 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-mono text-red-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Wrong
                    </span>
                    <span className="text-2xl font-black text-red-400 mt-1 block">
                      {isDone ? wrong : 0}
                    </span>
                    <span className="text-[11px] text-neutral-400">Incorrect Answers</span>
                  </div>

                  <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Status
                    </span>
                    <span className="text-sm font-black text-white mt-1.5 block">
                      {merged.timeTaken || (isDone ? "Completed" : "Pending")}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Fee: {selectedStudent.payment_status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                {isDone && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-300 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>
                          Merit Standing:{" "}
                          {pct >= 85
                            ? "Gold Distinction Eligible"
                            : pct >= 70
                            ? "Silver Distinction Eligible"
                            : pct >= 55
                            ? "Bronze Merit Eligible"
                            : "Participation Certificate"}
                        </span>
                      </span>
                      <span className="text-white font-mono">{pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden flex border border-neutral-800">
                      <div
                        style={{ width: `${(correct / total) * 100}%` }}
                        className="bg-green-500 h-full"
                        title={`Correct: ${correct}`}
                      />
                      <div
                        style={{ width: `${(wrong / total) * 100}%` }}
                        className="bg-red-600 h-full"
                        title={`Wrong: ${wrong}`}
                      />
                    </div>
                  </div>
                )}

                {/* Question-by-Question Answer Sheet */}
                <div className="space-y-3 border-t border-neutral-800 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-red-500" />
                    <span>Question-by-Question Attempt Breakdown</span>
                  </h4>

                  {answerList.length > 0 ? (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {answerList.map((ans: any, index: number) => {
                        const isRight =
                          ans.isCorrect === true ||
                          (ans.selectedOption &&
                            ans.correctOption &&
                            String(ans.selectedOption).trim() ===
                              String(ans.correctOption).trim());

                        return (
                          <div
                            key={index}
                            className={`p-3.5 rounded-2xl border text-xs ${
                              isRight
                                ? "bg-green-950/20 border-green-800/60"
                                : "bg-red-950/20 border-red-800/60"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-bold text-white">
                                Q{index + 1}.{" "}
                                {ans.question || ans.q || `Question #${index + 1}`}
                              </p>
                              {isRight ? (
                                <span className="text-[10px] font-bold text-green-400 uppercase shrink-0">
                                  ✓ Correct
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-red-400 uppercase shrink-0">
                                  ✗ Wrong
                                </span>
                              )}
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-4 text-[11px]">
                              <span className="text-neutral-300">
                                Student Answer:{" "}
                                <strong className={isRight ? "text-green-400" : "text-red-400"}>
                                  {ans.selectedOption || ans.userAnswer || "Not Answered"}
                                </strong>
                              </span>
                              {!isRight && (ans.correctOption || ans.correctAnswer) && (
                                <span className="text-neutral-300">
                                  Correct Answer:{" "}
                                  <strong className="text-green-400">
                                    {ans.correctOption || ans.correctAnswer}
                                  </strong>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-black border border-neutral-800 p-4 rounded-2xl text-xs text-neutral-400">
                      {isDone
                        ? `Summary recorded: ${correct} Correct out of ${total} MCQs (${wrong} Wrong, ${pct}% Accuracy).`
                        : "Candidate has not submitted the online exam yet."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
