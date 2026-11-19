"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GalleryPhotoManager from "@/components/GalleryPhotoManager";
import StudentProgressViewer from "@/components/StudentProgressViewer";
import DownloadsManager from "@/components/DownloadsManager";
import {
  ArrowLeft,
  Users,
  Search,
  Trash2,
  RefreshCw,
  Settings,
  Coins,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Edit3,
  X,
  BookOpen,
  FileUp,
  Upload,
  CheckCircle,
  Eye,
  Sparkles,
  Trophy,
  Download,
} from "lucide-react";

const baseStudentNames = [
  "Muhammad Rayyan", "Ayesha Fatima", "Zaid Ahmed", "Fatima Zahra", "Hamza Ali",
  "Anaya Khan", "Bilal Tariq", "Hania Amir", "Usman Ghani", "Meerab Shah",
  "Syed Daniyal", "Eshal Imran", "Mustafa Kamal", "Dua Malik", "Ayaan Siddiqui",
  "Zainab Bibi", "Hashir Mehmood", "Sarah Naveed", "Saad Rizvi", "Alishba Noor",
  "Umer Farooq", "Bareera Junaid", "Farhan Akhtar", "Kinza Hashmi", "Taha Qureshi",
];

const schoolList = [
  "The City School (PAF Chapter)", "Beaconhouse School System", "Army Public School (APS)",
  "Karachi Grammar School", "Lahore Grammar School", "Habib Public School",
  "Generation's School", "Foundation Public School", "Roots Millennium", "Froebel's International",
];

const categoriesList = [
  "General Knowledge", "Art & Creative Expression", "Science & Discovery", "Mathematics Olympiad",
];

const GRADE_OPTIONS = [
  { id: "grade-1", label: "Grade 1" },
  { id: "grade-2", label: "Grade 2" },
  { id: "grade-3", label: "Grade 3" },
  { id: "grade-4", label: "Grade 4" },
  { id: "grade-5", label: "Grade 5" },
  { id: "grade-6", label: "Grade 6" },
  { id: "grade-7", label: "Grade 7" },
  { id: "grade-8", label: "Grade 8" },
  { id: "grade-9", label: "Grade 9" },
  { id: "grade-10", label: "Grade 10 / O Levels" },
];

interface ParsedMCQ {
  id: number;
  part: string;
  q: string;
  options: string[];
  correct: string;
}

function getInitial100() {
  return Array.from({ length: 100 }, (_, i) => {
    const rollNumber = `MM-2026-${1001 + i}`;
    const name = baseStudentNames[i % baseStudentNames.length] + (i >= 25 ? ` (${Math.floor(i / 25) + 1})` : "");
    const gradeNum = (i % 10) + 1;
    const grade = gradeNum === 10 ? "O Levels / Grade 10" : `Grade ${gradeNum}`;
    const school = schoolList[i % schoolList.length];
    const category = categoriesList[i % categoriesList.length];

    return {
      id: "std_base_" + (1001 + i),
      rollNo: rollNumber,
      name,
      fatherName: "Tariq " + name.split(" ")[0],
      grade,
      category,
      school,
      phone: "+92 300" + String(1000000 + i).slice(0, 7),
      city: "Karachi",
      payment_status: i % 7 === 0 ? "Pending" : i % 15 === 0 ? "Rejected" : "Approved",
      testScore: i % 4 === 0 ? "28/30" : i % 5 === 0 ? "24/30" : null,
      testStatus: i % 4 === 0 || i % 5 === 0 ? "Completed" : "Pending",
      registrationDate: "Base Record",
    };
  });
}

const defaultDisciplines = [
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
    extraNotice: "Paper will be conducted exclusively in English. 30 MCQs with 15 minutes test duration.",
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
    extraNotice: "Drawing sheets will be supplied by Secretariat. Students must bring their own colors and pencil kit.",
  },
];

function parseBulkMCQs(rawText: string, defaultPart: string): ParsedMCQ[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const results: ParsedMCQ[] = [];
  let currentPart = defaultPart || "General Section";
  let currentQ = "";
  let currentOptions: string[] = [];
  let currentCorrect = "";

  const flushQuestion = () => {
    if (currentQ && currentOptions.length >= 2) {
      const normalizedOptions = currentOptions.map((opt, idx) => {
        const clean = opt.replace(/^[\(\[]?[a-dA-D][\)\.\:\]]\s*/, "").trim();
        const letter = String.fromCharCode(97 + idx);
        return `${letter}) ${clean}`;
      });
      const validAns = ["a", "b", "c", "d"].includes(currentCorrect.toLowerCase())
        ? currentCorrect.toLowerCase()
        : "a";

      results.push({
        id: results.length + 1,
        part: currentPart,
        q: currentQ.replace(/^(?:Q\s*\d*[\.\:\)\-]\s*|\d+[\.\:\)\-]\s*)/i, "").trim(),
        options: normalizedOptions,
        correct: validAns,
      });
    }
    currentQ = "";
    currentOptions = [];
    currentCorrect = "";
  };

  for (const line of lines) {
    if (/^(part|section)\s*\d*/i.test(line) && !/^[a-d][\)\.\:]/i.test(line)) {
      flushQuestion();
      currentPart = line;
      continue;
    }

    const ansMatch = line.match(/^(?:ans(?:wer)?|correct(?:\s*answer)?|key)\s*[\:\-\=]\s*[\(\[]?([a-dA-D])/i);
    if (ansMatch) {
      currentCorrect = ansMatch[1].toLowerCase();
      flushQuestion();
      continue;
    }

    const optMatch = line.match(/^[\(\[]?([a-dA-D])[\)\.\:\]]\s+(.+)/);
    if (optMatch && currentQ) {
      currentOptions.push(`${optMatch[1].toLowerCase()}) ${optMatch[2].trim()}`);
      continue;
    }

    if (currentQ && currentOptions.length >= 2) {
      flushQuestion();
    }

    if (!currentQ) {
      currentQ = line;
    } else if (currentOptions.length === 0) {
      currentQ += " " + line;
    }
  }

  flushQuestion();
  return results;
}

export default function AdminPortalPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "students" | "results-sheet" | "paper-uploader" | "syllabus" | "settings"
  >("students");

  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeeStatus, setFilterFeeStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [resultFilterStatus, setResultFilterStatus] = useState<"completed" | "all">("completed");
  const [resultSearch, setResultSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [viewingSlip, setViewingSlip] = useState<any | null>(null);

  const [editingCandidate, setEditingCandidate] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    fatherName: "",
    school: "",
    grade: "",
    category: "",
    phone: "",
    city: "",
    payment_status: "Pending",
  });

  // REAL-PAPER & 100-MCQ BULK UPLOADER STATE
  const [selectedUploadGrade, setSelectedUploadGrade] = useState("grade-1");
  const [uploadSubject, setUploadSubject] = useState("General Knowledge");
  const [uploadDuration, setUploadDuration] = useState("15 minutes");
  const [uploadMode, setUploadMode] = useState<"replace" | "append">("replace");
  const [rawMcqText, setRawMcqText] = useState("");
  const [parsedPreview, setParsedPreview] = useState<ParsedMCQ[]>([]);
  const [customPapersMap, setCustomPapersMap] = useState<Record<string, any>>({});
  const [paperUploadSuccess, setPaperUploadSuccess] = useState("");

  const [disciplines, setDisciplines] = useState<any[]>(defaultDisciplines);
  const [editingDiscipline, setEditingDiscipline] = useState<any | null>(null);
  const [discForm, setDiscForm] = useState({
    name: "",
    primaryTitle: "",
    primaryPoints: "",
    secondaryTitle: "",
    secondaryPoints: "",
    extraNotice: "",
  });
  const [syllabusSaved, setSyllabusSaved] = useState(false);

  const [deadline, setDeadline] = useState("30 December 2026");
  const [examDate, setExamDate] = useState("15 January 2027");
  const [resultsDate, setResultsDate] = useState("25 January 2027");
  const [fee, setFee] = useState<number>(1100);
  const [whatsapp, setWhatsapp] = useState("923333400000");
  const [adminPin, setAdminPin] = useState("1234");
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("mindmory_site_settings");
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed.deadline) setDeadline(parsed.deadline);
        if (parsed.examDate) setExamDate(parsed.examDate);
        if (parsed.resultsDate) setResultsDate(parsed.resultsDate);
        if (parsed.fee) {
          const parsedFee = Number(parsed.fee);
          setFee(parsedFee === 1500 ? 1100 : parsedFee);
        }
        if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
      }
      const savedPin = localStorage.getItem("mindmory_admin_pin");
      if (savedPin) setAdminPin(savedPin);
    } catch {}

    try {
      const storedDisc = localStorage.getItem("mindmory_disciplines");
      if (storedDisc) {
        const parsed = JSON.parse(storedDisc);
        if (Array.isArray(parsed) && parsed.length > 0) setDisciplines(parsed);
      }
    } catch {}

    try {
      const savedPapers = localStorage.getItem("mindmory_custom_papers");
      if (savedPapers) {
        setCustomPapersMap(JSON.parse(savedPapers));
      }
    } catch {}

    loadMergedStudents();
  }, []);

  const loadMergedStudents = async () => {
    setIsRefreshing(true);
    try {
      const base100 = getInitial100();
      let mainStored: any[] = [];
      let customRegistered: any[] = [];
      let apiStudents: any[] = [];
      let apiResults: any[] = [];
      let localResults: any[] = [];

      try {
        const res = await fetch("/api/admin/students", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) apiStudents = data;
          else if (Array.isArray(data?.students)) apiStudents = data.students;
        }
      } catch {}

      try {
        const resR = await fetch("/api/results", { cache: "no-store" });
        if (resR.ok) {
          const dataR = await resR.json();
          if (Array.isArray(dataR)) apiResults = dataR;
          else if (Array.isArray(dataR?.results)) apiResults = dataR.results;
        }
      } catch {}

      const s1 = localStorage.getItem("mindmory_students");
      if (s1) {
        try {
          mainStored = JSON.parse(s1);
        } catch {}
      }

      const s2 = localStorage.getItem("mindmory_registered_students");
      if (s2) {
        try {
          customRegistered = JSON.parse(s2);
        } catch {}
      }

      const s3 = localStorage.getItem("mindmory_exam_results");
      if (s3) {
        try {
          localResults = JSON.parse(s3);
        } catch {}
      }

      const studentsMap = new Map<string, any>();
      base100.forEach((st) => studentsMap.set(st.rollNo.toUpperCase(), st));

      [mainStored, customRegistered, apiStudents].forEach((list) => {
        if (Array.isArray(list)) {
          list.forEach((st) => {
            const rNo = st.rollNo || st.roll_no;
            if (rNo) {
              const key = String(rNo).toUpperCase();
              const current = studentsMap.get(key) || {};
              studentsMap.set(key, {
                ...current,
                ...st,
                rollNo: rNo,
                fatherName: st.fatherName || st.father_name || current.fatherName || "",
                payment_status: st.payment_status || current.payment_status || "Pending",
              });
            }
          });
        }
      });

      // Merge submitted exam results into master roster
      [localResults, apiResults].forEach((resList) => {
        if (Array.isArray(resList)) {
          resList.forEach((r) => {
            const rNo = r.rollNo || r.roll_no;
            if (rNo) {
              const key = String(rNo).toUpperCase();
              const current = studentsMap.get(key) || {
                rollNo: rNo,
                name: r.name || "Candidate",
                fatherName: r.fatherName || "",
                grade: r.grade || "Grade 1",
                category: r.category || "General Knowledge",
                school: r.school || "Registered School",
                payment_status: "Approved",
              };
              const scoreDisplay =
                r.scoreText ||
                (r.score !== undefined && r.total !== undefined
                  ? `${r.score}/${r.total}`
                  : current.testScore);
              studentsMap.set(key, {
                ...current,
                testStatus: "Completed",
                testScore: scoreDisplay,
                testPercentage: r.percentage ?? current.testPercentage,
                submittedAt: r.submittedAt || current.submittedAt,
              });
            }
          });
        }
      });

      const mergedList = Array.from(studentsMap.values());
      mergedList.sort((a, b) => {
        const numA = parseInt(a.rollNo?.replace(/\D/g, "") || "0", 10);
        const numB = parseInt(b.rollNo?.replace(/\D/g, "") || "0", 10);
        return numA - numB;
      });

      setStudents(mergedList);
      localStorage.setItem("mindmory_students", JSON.stringify(mergedList));
    } catch {
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  const handleUpdateFeeStatus = (rollNo: string, newStatus: string) => {
    const updated = students.map((st) => {
      if (st.rollNo.toUpperCase() === rollNo.toUpperCase()) {
        return { ...st, payment_status: newStatus };
      }
      return st;
    });
    setStudents(updated);
    try {
      localStorage.setItem("mindmory_students", JSON.stringify(updated));
    } catch {}
  };

  const handleOpenEdit = (student: any) => {
    setEditingCandidate(student);
    setEditFormData({
      name: student.name || "",
      fatherName: student.fatherName || "",
      school: student.school || "",
      grade: student.grade || "Grade 1",
      category: student.category || "General Knowledge",
      phone: student.phone || "",
      city: student.city || "Karachi",
      payment_status: student.payment_status || "Pending",
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;

    const updated = students.map((st) => {
      if (st.rollNo === editingCandidate.rollNo) {
        return {
          ...st,
          name: editFormData.name.trim(),
          fatherName: editFormData.fatherName.trim(),
          school: editFormData.school.trim(),
          grade: editFormData.grade,
          category: editFormData.category,
          phone: editFormData.phone.trim(),
          city: editFormData.city.trim(),
          payment_status: editFormData.payment_status,
        };
      }
      return st;
    });

    setStudents(updated);
    try {
      localStorage.setItem("mindmory_students", JSON.stringify(updated));
    } catch {}
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = (rollNo: string) => {
    if (!confirm(`Are you sure you want to delete candidate ${rollNo}?`)) return;
    const updated = students.filter((s) => s.rollNo !== rollNo);
    setStudents(updated);
    try {
      localStorage.setItem("mindmory_students", JSON.stringify(updated));
    } catch {}
  };

  const handleExportMasterResultsCSV = (records: any[]) => {
    const headers = [
      "Roll Number",
      "Candidate Name",
      "Father Name",
      "Grade",
      "Discipline",
      "School",
      "Score",
      "Percentage",
      "Status",
    ];
    const rows = records.map((r) => {
      let pct = r.testPercentage;
      if (pct === undefined && typeof r.testScore === "string" && r.testScore.includes("/")) {
        const [c, t] = r.testScore.split("/").map(Number);
        if (t > 0) pct = Math.round((c / t) * 100);
      }
      return [
        `"${r.rollNo || ""}"`,
        `"${r.name || ""}"`,
        `"${r.fatherName || ""}"`,
        `"${r.grade || ""}"`,
        `"${r.category || ""}"`,
        `"${r.school || ""}"`,
        `"${r.testScore || "Pending"}"`,
        `"${pct !== undefined ? pct + "%" : "-"}"`,
        `"${r.testScore ? "Completed" : "Pending"}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MINDMORY_Master_Results_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // BULK MCQ UPLOAD HANDLERS
  const handleFileUploadTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setRawMcqText(reader.result);
        const parsed = parseBulkMCQs(reader.result, `${uploadSubject} — General`);
        setParsedPreview(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleTemplate = () => {
    const sample = `Part 1: General Science & World
1. Which planet is closest to the Sun?
a) Venus
b) Mercury
c) Mars
Ans: b

2. How many continents are there on Earth?
a) 5
b) 6
c) 7
Ans: c

3. What is the national flower of Pakistan?
a) Rose
b) Jasmine
c) Tulip
Ans: b`;
    setRawMcqText(sample);
    setParsedPreview(parseBulkMCQs(sample, `${uploadSubject} — Section A`));
  };

  const handlePreviewMCQs = () => {
    const parsed = parseBulkMCQs(rawMcqText, `${uploadSubject} — Section A`);
    setParsedPreview(parsed);
    if (parsed.length === 0) {
      alert(
        "No valid MCQs detected. Please ensure each question has options a), b), c) and an 'Ans: a/b/c' line."
      );
    }
  };

  const handlePublishPaper = () => {
    const parsed = parsedPreview.length > 0 ? parsedPreview : parseBulkMCQs(rawMcqText, `${uploadSubject} — Section A`);
    if (parsed.length === 0) {
      alert("Please paste or upload valid MCQs first.");
      return;
    }

    const gradeObj = GRADE_OPTIONS.find((g) => g.id === selectedUploadGrade) || GRADE_OPTIONS[0];
    const existingQuestions: ParsedMCQ[] =
      uploadMode === "append" && customPapersMap[selectedUploadGrade]?.questions
        ? customPapersMap[selectedUploadGrade].questions
        : [];

    const combined = [...existingQuestions, ...parsed].map((item, idx) => ({
      ...item,
      id: idx + 1,
    }));

    const updatedPapers = {
      ...customPapersMap,
      [selectedUploadGrade]: {
        gradeId: selectedUploadGrade,
        gradeTitle: gradeObj.label,
        subject: uploadSubject,
        duration: uploadDuration,
        totalMarks: combined.length,
        questions: combined,
        updatedAt: new Date().toLocaleString(),
      },
    };

    setCustomPapersMap(updatedPapers);
    try {
      localStorage.setItem("mindmory_custom_papers", JSON.stringify(updatedPapers));
    } catch {}

    setPaperUploadSuccess(
      `Published ${combined.length} MCQs for ${gradeObj.label} (${uploadSubject})! Live on Model Papers & Exam Terminal.`
    );
    setRawMcqText("");
    setParsedPreview([]);
    setTimeout(() => setPaperUploadSuccess(""), 5000);
  };

  const handleResetGradePaper = (gradeId: string) => {
    if (!confirm("Reset this grade back to the default 30 sample MCQs?")) return;
    const copy = { ...customPapersMap };
    delete copy[gradeId];
    setCustomPapersMap(copy);
    try {
      localStorage.setItem("mindmory_custom_papers", JSON.stringify(copy));
    } catch {}
  };

  const handleOpenDisciplineEdit = (disc: any) => {
    setEditingDiscipline(disc);
    setDiscForm({
      name: disc.name,
      primaryTitle: disc.primaryTitle,
      primaryPoints: disc.primaryPoints.join("\n"),
      secondaryTitle: disc.secondaryTitle,
      secondaryPoints: disc.secondaryPoints.join("\n"),
      extraNotice: disc.extraNotice || "",
    });
  };

  const handleSaveDiscipline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDiscipline) return;

    const updated = disciplines.map((d) => {
      if (d.id === editingDiscipline.id) {
        return {
          ...d,
          name: discForm.name.trim(),
          primaryTitle: discForm.primaryTitle.trim(),
          primaryPoints: discForm.primaryPoints
            .split("\n")
            .map((p) => p.trim())
            .filter((p) => p.length > 0),
          secondaryTitle: discForm.secondaryTitle.trim(),
          secondaryPoints: discForm.secondaryPoints
            .split("\n")
            .map((p) => p.trim())
            .filter((p) => p.length > 0),
          extraNotice: discForm.extraNotice.trim() || undefined,
        };
      }
      return d;
    });

    setDisciplines(updated);
    try {
      localStorage.setItem("mindmory_disciplines", JSON.stringify(updated));
    } catch {}

    setEditingDiscipline(null);
    setSyllabusSaved(true);
    setTimeout(() => setSyllabusSaved(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      deadline,
      examDate,
      resultsDate,
      fee,
      whatsapp: whatsapp.replace(/[^0-9]/g, ""),
    };
    try {
      localStorage.setItem("mindmory_site_settings", JSON.stringify(config));
      localStorage.setItem("mindmory_admin_pin", adminPin.trim());
    } catch {}
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.rollNo?.toLowerCase().includes(q) ||
      s.school?.toLowerCase().includes(q);
    const matchesCat = filterCategory === "all" || s.category === filterCategory;
    const matchesFee =
      filterFeeStatus === "all" ||
      s.payment_status?.toLowerCase() === filterFeeStatus.toLowerCase();
    return matchesSearch && matchesCat && matchesFee;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterFeeStatus, filterCategory, pageSize]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  const approvedCount = students.filter(
    (s) => s.payment_status?.toLowerCase() === "approved"
  ).length;
  const pendingCount = students.filter(
    (s) => s.payment_status?.toLowerCase() === "pending"
  ).length;
  const completedExamsCount = students.filter((s) => Boolean(s.testScore)).length;

  const masterResultRecords = students.filter((s) => {
    const matchesStatus =
      resultFilterStatus === "all" ? true : Boolean(s.testScore);
    const rq = resultSearch.trim().toLowerCase();
    const matchesSearch =
      !rq ||
      s.name?.toLowerCase().includes(rq) ||
      s.rollNo?.toLowerCase().includes(rq) ||
      s.school?.toLowerCase().includes(rq) ||
      s.grade?.toLowerCase().includes(rq);
    return matchesStatus && matchesSearch;
  });

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-950 border border-neutral-850 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Admin Portal Locked</h1>
            <p className="text-xs text-neutral-400">
              Enter Secretariat Security PIN to access candidate records, master results, bulk MCQ uploader, and settings.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pinInput.trim() === adminPin) {
                setIsUnlocked(true);
                setPinError("");
              } else {
                setPinError("Invalid PIN. Please enter the correct admin PIN.");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter Admin PIN"
              autoFocus
              className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-mono text-white focus:outline-none focus:border-red-600"
            />
            {pinError && (
              <p className="text-xs text-red-400 text-center font-semibold">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Unlock Admin Dashboard
            </button>
          </form>
          <div className="text-center">
            <Link href="/" className="text-xs text-neutral-500 hover:text-white underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>MINDMORY Secretariat Admin Dashboard</span>
              <span className="text-[10px] font-mono font-bold uppercase bg-red-950 border border-red-800 text-red-400 px-2.5 py-0.5 rounded-full">
                Active Controller
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadMergedStudents}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition text-neutral-300 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-red-500 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-950 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Roster</span>
              <span className="text-2xl font-black text-white">{students.length} Candidates</span>
            </div>
            <Users className="w-7 h-7 text-red-500" />
          </div>

          <div className="bg-neutral-950 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-mono text-green-500 uppercase block">Fee Approved</span>
              <span className="text-2xl font-black text-green-400">{approvedCount}</span>
            </div>
            <ShieldCheck className="w-7 h-7 text-green-500" />
          </div>

          <div className="bg-neutral-950 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-mono text-amber-500 uppercase block">Fee Pending</span>
              <span className="text-2xl font-black text-amber-400">{pendingCount}</span>
            </div>
            <Coins className="w-7 h-7 text-amber-500" />
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("results-sheet")}
            className="bg-neutral-950 border border-neutral-850 hover:border-amber-500 p-5 rounded-2xl flex items-center justify-between shadow-lg text-left transition cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase block">Exams Attempted</span>
              <span className="text-2xl font-black text-white">{completedExamsCount} Results</span>
            </div>
            <Trophy className="w-7 h-7 text-amber-400" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex overflow-x-auto border-b border-neutral-900 gap-6 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => setActiveTab("students")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "students"
                ? "text-red-500 border-b-2 border-red-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidates Roster &amp; Slip Verification</span>
          </button>

          <button
            onClick={() => setActiveTab("results-sheet")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "results-sheet"
                ? "text-amber-400 border-b-2 border-amber-500"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Master Results &amp; Backup Sheet ({completedExamsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("paper-uploader")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "paper-uploader"
                ? "text-red-500 border-b-2 border-red-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileUp className="w-4 h-4 text-amber-400" />
            <span>Bulk Paper &amp; 100-MCQ Uploader</span>
          </button>

          <button
            onClick={() => setActiveTab("syllabus")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "syllabus"
                ? "text-red-500 border-b-2 border-red-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus &amp; Category Manager ({disciplines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "settings"
                ? "text-red-500 border-b-2 border-red-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Portal Settings &amp; PIN</span>
          </button>
        </div>

        {/* TAB 1: CANDIDATES ROSTER */}
        {activeTab === "students" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-neutral-950 border border-neutral-850 p-4 rounded-2xl">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search candidate name or roll..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterFeeStatus}
                  onChange={(e) => setFilterFeeStatus(e.target.value)}
                  className="bg-black border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="all">All Fees</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-black border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="all">All Disciplines</option>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Art & Creative Expression">Art &amp; Creative Expression</option>
                  <option value="Science & Discovery">Science &amp; Discovery</option>
                  <option value="Mathematics Olympiad">Mathematics Olympiad</option>
                </select>

                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-black border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                >
                  <option value={10}>10 per page</option>
                  <option value={15}>15 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-850">
                    <tr>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Candidate &amp; Father</th>
                      <th className="py-3 px-4">Class &amp; Discipline</th>
                      <th className="py-3 px-4">School</th>
                      <th className="py-3 px-4 text-center">Bank Slip</th>
                      <th className="py-3 px-4 text-center">Fee Status</th>
                      <th className="py-3 px-4 text-center">Exam Result</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {paginatedStudents.length > 0 ? (
                      paginatedStudents.map((st) => (
                        <tr key={st.id || st.rollNo} className="hover:bg-neutral-900/40 transition">
                          <td className="py-3 px-4 font-mono font-bold text-red-400 whitespace-nowrap">
                            {st.rollNo}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-bold text-white block">{st.name}</span>
                            <span className="text-[11px] text-neutral-500 block">{st.fatherName || "—"}</span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-neutral-400">{st.grade} • </span>
                            <span className="text-amber-400 font-semibold">{st.category}</span>
                          </td>
                          <td className="py-3 px-4 text-neutral-400 truncate max-w-xs">{st.school}</td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            {st.depositSlipData ? (
                              <button
                                type="button"
                                onClick={() => setViewingSlip(st)}
                                className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-amber-400 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View Slip</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-neutral-600">
                                {st.depositSlipName || "No Slip"}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <select
                              value={st.payment_status || "Pending"}
                              onChange={(e) => handleUpdateFeeStatus(st.rollNo, e.target.value)}
                              className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 border transition cursor-pointer ${
                                (st.payment_status || "").toLowerCase() === "approved"
                                  ? "bg-green-950/80 text-green-400 border-green-800"
                                  : (st.payment_status || "").toLowerCase() === "rejected"
                                  ? "bg-red-950/80 text-red-400 border-red-800"
                                  : "bg-amber-950/80 text-amber-400 border-amber-800"
                              }`}
                            >
                              <option value="Approved" className="bg-black text-green-400">✓ Approved</option>
                              <option value="Pending" className="bg-black text-amber-400">Pending</option>
                              <option value="Rejected" className="bg-black text-red-400">✗ Rejected</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap font-mono font-bold">
                            {st.testScore ? (
                              <span className="text-green-400 bg-green-950/60 border border-green-900 px-2 py-0.5 rounded">
                                {st.testScore}
                              </span>
                            ) : (
                              <span className="text-neutral-600 text-[11px]">Pending</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(st)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 cursor-pointer"
                                title="Edit Candidate Details"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCandidate(st.rollNo)}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-850 cursor-pointer"
                                title="Delete Candidate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-neutral-500">
                          No candidate records found matching current query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-neutral-900/50 border-t border-neutral-900 px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400">
                  Showing <span className="font-bold text-white">{totalItems === 0 ? 0 : startIndex + 1}</span> to{" "}
                  <span className="font-bold text-white">{Math.min(startIndex + pageSize, totalItems)}</span> of{" "}
                  <span className="font-bold text-white">{totalItems}</span> candidates
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-850 disabled:opacity-30 border border-neutral-800 text-white rounded-xl font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="px-3 py-1 bg-black border border-neutral-800 text-neutral-300 font-mono rounded-lg">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-850 disabled:opacity-30 border border-neutral-800 text-white rounded-xl font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MASTER RESULTS & BACKUP SHEET (ALL ATTEMPTED STUDENTS IN ONE PLACE) */}
        {activeTab === "results-sheet" && (
          <div className="space-y-4 text-left">
            <div className="bg-neutral-950 border border-neutral-850 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest block">
                  CENTRAL EXAMINATION BACKUP
                </span>
                <h2 className="text-lg font-black text-white mt-0.5">
                  Master Candidate Results Sheet ({masterResultRecords.length} Records)
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Every candidate who completes the online exam is automatically logged here with score, percentage, and school details.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-60">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Filter by name, roll, school..."
                    value={resultSearch}
                    onChange={(e) => setResultSearch(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={resultFilterStatus}
                  onChange={(e) => setResultFilterStatus(e.target.value as "completed" | "all")}
                  className="bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
                >
                  <option value="completed">Completed Only ({completedExamsCount})</option>
                  <option value="all">All Enrolled ({students.length})</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleExportMasterResultsCSV(masterResultRecords)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-green-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV / Excel</span>
                </button>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-850">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Roll No</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">School / Institute</th>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4 text-center">Score</th>
                      <th className="py-3 px-4 text-center">Percentage</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {masterResultRecords.length > 0 ? (
                      masterResultRecords.map((r, idx) => {
                        let pct = r.testPercentage;
                        if (
                          pct === undefined &&
                          typeof r.testScore === "string" &&
                          r.testScore.includes("/")
                        ) {
                          const [c, t] = r.testScore.split("/").map(Number);
                          if (t > 0) pct = Math.round((c / t) * 100);
                        }

                        return (
                          <tr key={r.rollNo + "_" + idx} className="hover:bg-neutral-900/40 transition">
                            <td className="py-3 px-4 font-mono text-neutral-500">{idx + 1}</td>
                            <td className="py-3 px-4 font-mono font-bold text-red-400 whitespace-nowrap">
                              {r.rollNo}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="font-bold text-white block">{r.name}</span>
                              <span className="text-[10px] text-neutral-500">{r.category}</span>
                            </td>
                            <td className="py-3 px-4 text-neutral-300 truncate max-w-xs">{r.school}</td>
                            <td className="py-3 px-4 text-amber-400 font-semibold whitespace-nowrap">
                              {r.grade}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-black text-white whitespace-nowrap">
                              {r.testScore || "—"}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold whitespace-nowrap">
                              {pct !== undefined ? (
                                <span
                                  className={`px-2 py-0.5 rounded border ${
                                    pct >= 70
                                      ? "bg-green-950/70 border-green-800 text-green-400"
                                      : pct >= 40
                                      ? "bg-amber-950/70 border-amber-800 text-amber-400"
                                      : "bg-red-950/70 border-red-800 text-red-400"
                                  }`}
                                >
                                  {pct}%
                                </span>
                              ) : (
                                <span className="text-neutral-600">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center whitespace-nowrap">
                              {r.testScore ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-green-950 border border-green-800 text-green-400 text-[10px] font-bold uppercase">
                                  Completed
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 text-[10px] font-bold uppercase">
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-10 text-neutral-500">
                          No completed exam records match your filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BULK REAL-PAPER & 100-MCQ UPLOADER */}
        {activeTab === "paper-uploader" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            <div className="lg:col-span-8 bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-900 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest block">
                    SELF-SERVICE CONTENT MANAGER
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    Bulk Upload 100 MCQs / Preparation Material
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleTemplate}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-amber-400 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Format Example</span>
                </button>
              </div>

              {paperUploadSuccess && (
                <div className="bg-green-950/80 border border-green-700 text-green-300 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <span>{paperUploadSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Target Grade</label>
                  <select
                    value={selectedUploadGrade}
                    onChange={(e) => setSelectedUploadGrade(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:border-red-600 focus:outline-none"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Subject / Discipline</label>
                  <select
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Art & Creative Expression">Art &amp; Creative Expression</option>
                    <option value="Science & Discovery">Science &amp; Discovery</option>
                    <option value="Mathematics Olympiad">Mathematics Olympiad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Exam Duration</label>
                  <input
                    type="text"
                    value={uploadDuration}
                    onChange={(e) => setUploadDuration(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Upload Mode</label>
                  <select
                    value={uploadMode}
                    onChange={(e) => setUploadMode(e.target.value as "replace" | "append")}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="replace">Replace Grade Paper</option>
                    <option value="append">Append to Existing</option>
                  </select>
                </div>
              </div>

              {/* Optional .TXT File Import */}
              <div className="bg-black border border-dashed border-neutral-800 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-red-500" />
                  <span>Upload a .TXT file or paste 100 MCQs directly below:</span>
                </span>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUploadTxt}
                  className="text-xs text-neutral-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-neutral-800 file:text-white hover:file:bg-red-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Paste 100 Questions with Options &amp; Answer Key (English Only)
                </label>
                <textarea
                  rows={12}
                  value={rawMcqText}
                  onChange={(e) => setRawMcqText(e.target.value)}
                  placeholder={`Paste your 100 MCQs here in this format:\n\n1. What is the capital of Pakistan?\na) Karachi\nb) Islamabad\nc) Lahore\nAns: b\n\n2. How many provinces are in Pakistan?\na) 3\nb) 4\nc) 5\nAns: b`}
                  className="w-full bg-black border border-neutral-800 rounded-2xl p-4 text-xs font-mono text-neutral-100 focus:outline-none focus:border-red-600 leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePreviewMCQs}
                  className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Validate &amp; Preview ({parseBulkMCQs(rawMcqText, "").length} Detected)
                </button>

                <button
                  type="button"
                  onClick={handlePublishPaper}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Paper to Website</span>
                </button>
              </div>

              {parsedPreview.length > 0 && (
                <div className="bg-black border border-neutral-800 rounded-2xl p-4 space-y-2 max-h-60 overflow-y-auto">
                  <span className="text-[11px] font-bold text-green-400 uppercase block">
                    Previewing {parsedPreview.length} Validated Questions:
                  </span>
                  {parsedPreview.slice(0, 10).map((item) => (
                    <div key={item.id} className="text-xs border-b border-neutral-900 pb-2">
                      <p className="font-bold text-white">
                        {item.id}. {item.q}
                      </p>
                      <p className="text-neutral-400">
                        {item.options.join(" | ")} —{" "}
                        <span className="text-green-400 font-bold uppercase">Ans: {item.correct}</span>
                      </p>
                    </div>
                  ))}
                  {parsedPreview.length > 10 && (
                    <p className="text-[11px] text-neutral-500">
                      ...and {parsedPreview.length - 10} more questions ready to publish.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: PUBLISHED CUSTOM PAPERS STATUS */}
            <div className="lg:col-span-4 bg-neutral-950 border border-neutral-850 rounded-3xl p-6 space-y-4 shadow-2xl h-fit">
              <h3 className="text-base font-black text-white border-b border-neutral-900 pb-3">
                Grade-Wise Active Question Banks
              </h3>
              <p className="text-xs text-neutral-400">
                By default each grade has 30 sample MCQs. When you publish 100 MCQs for a grade, it updates live on the Model Papers page.
              </p>

              <div className="space-y-2">
                {GRADE_OPTIONS.map((g) => {
                  const custom = customPapersMap[g.id];
                  return (
                    <div
                      key={g.id}
                      className="bg-black border border-neutral-850 rounded-xl p-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{g.label}</span>
                        <span className="text-[11px] text-neutral-400">
                          {custom
                            ? `${custom.questions.length} Custom MCQs Published`
                            : "30 Default Sample MCQs"}
                        </span>
                      </div>
                      {custom ? (
                        <button
                          type="button"
                          onClick={() => handleResetGradePaper(g.id)}
                          className="text-[10px] font-bold text-red-400 hover:text-red-300 underline cursor-pointer"
                        >
                          Reset
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-500">Default</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SYLLABUS & CATEGORY MANAGER */}
        {activeTab === "syllabus" && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  Curriculum Disciplines &amp; Syllabus Outlines
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Edit headings, add points, or revise syllabus criteria for any category here.
                </p>
              </div>

              {syllabusSaved && (
                <span className="text-xs text-green-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Syllabus Updated Successfully!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {disciplines.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                      <h3 className="text-base font-black text-white">{cat.name}</h3>
                      <button
                        type="button"
                        onClick={() => handleOpenDisciplineEdit(cat)}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-amber-400 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Syllabus</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase font-bold block mb-1">
                        Primary Division (Grades 1-5): {cat.primaryTitle}
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-400 list-disc pl-4">
                        {cat.primaryPoints.slice(0, 3).map((pt: string, idx: number) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-neutral-900">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        Secondary Division (Grades 6-10): {cat.secondaryTitle}
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-400 list-disc pl-4">
                        {cat.secondaryPoints.slice(0, 3).map((pt: string, idx: number) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PORTAL SETTINGS & PIN */}
        {activeTab === "settings" && (
          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 max-w-2xl space-y-6 text-left shadow-2xl">
            <h2 className="text-xl font-black text-white">Contest Parameters &amp; Security</h2>
            {settingsSaved && (
              <div className="bg-green-950/80 border border-green-800 text-green-300 p-3 rounded-xl text-xs font-bold">
                ✓ Settings &amp; PIN saved!
              </div>
            )}
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Registration Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Examination Date</label>
                  <input
                    type="text"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Entry Fee (PKR)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Admin Access PIN</label>
                  <input
                    type="text"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* VIEW BANK DEPOSIT SLIP MODAL */}
      {viewingSlip && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 max-w-lg w-full space-y-4 text-white relative shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setViewingSlip(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-black">
              Bank Deposit Slip — {viewingSlip.rollNo} ({viewingSlip.name})
            </h3>
            <p className="text-xs text-neutral-400">File: {viewingSlip.depositSlipName}</p>
            {viewingSlip.depositSlipData?.startsWith("data:image") ? (
              <img
                src={viewingSlip.depositSlipData}
                alt="Bank Deposit Slip"
                className="w-full max-h-96 object-contain rounded-xl border border-neutral-800 bg-black"
              />
            ) : (
              <a
                href={viewingSlip.depositSlipData}
                download={viewingSlip.depositSlipName || "deposit-slip.pdf"}
                className="inline-block px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Download Deposit Slip File
              </a>
            )}
          </div>
        </div>
      )}

      {/* EDIT SYLLABUS MODAL */}
      {editingDiscipline && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-white relative shadow-2xl text-left my-8">
            <button
              type="button"
              onClick={() => setEditingDiscipline(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black">Edit Syllabus: {editingDiscipline.name}</h3>

            <form onSubmit={handleSaveDiscipline} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-300 mb-1">Discipline Name</label>
                <input
                  type="text"
                  required
                  value={discForm.name}
                  onChange={(e) => setDiscForm({ ...discForm, name: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-850 space-y-2">
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">
                  Primary Division (Grades 1-5)
                </span>
                <input
                  type="text"
                  placeholder="Primary Title"
                  value={discForm.primaryTitle}
                  onChange={(e) => setDiscForm({ ...discForm, primaryTitle: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white"
                />
                <textarea
                  rows={3}
                  placeholder="Points (1 line = 1 point)"
                  value={discForm.primaryPoints}
                  onChange={(e) => setDiscForm({ ...discForm, primaryPoints: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white resize-none"
                />
              </div>

              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-850 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                  Secondary Division (Grades 6-10)
                </span>
                <input
                  type="text"
                  placeholder="Secondary Title"
                  value={discForm.secondaryTitle}
                  onChange={(e) => setDiscForm({ ...discForm, secondaryTitle: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white"
                />
                <textarea
                  rows={3}
                  placeholder="Points (1 line = 1 point)"
                  value={discForm.secondaryPoints}
                  onChange={(e) => setDiscForm({ ...discForm, secondaryPoints: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDiscipline(null)}
                  className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Syllabus Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CANDIDATE MODAL */}
      {editingCandidate && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 text-white relative shadow-2xl text-left my-8">
            <button
              type="button"
              onClick={() => setEditingCandidate(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black">Edit Candidate: {editingCandidate.rollNo}</h3>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Candidate Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Father Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.fatherName}
                    onChange={(e) => setEditFormData({ ...editFormData, fatherName: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-bold mb-1">School / Institution</label>
                <input
                  type="text"
                  required
                  value={editFormData.school}
                  onChange={(e) => setEditFormData({ ...editFormData, school: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Grade / Class</label>
                  <select
                    value={editFormData.grade}
                    onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="O Levels">O Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Discipline Category</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Art & Creative Expression">Art &amp; Creative Expression</option>
                    <option value="Science & Discovery">Science &amp; Discovery</option>
                    <option value="Mathematics Olympiad">Mathematics Olympiad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">School WhatsApp</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Fee Status</label>
                  <select
                    value={editFormData.payment_status}
                    onChange={(e) => setEditFormData({ ...editFormData, payment_status: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-red-600 font-bold"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-10 space-y-10">
        <GalleryPhotoManager />
        <StudentProgressViewer />
        <DownloadsManager />
      </div>
    </div>
  );
}
