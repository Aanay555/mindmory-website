"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Trash2, 
  RefreshCw,
  Settings,
  Calendar,
  Coins,
  Phone,
  Save,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  Lock,
  Edit3,
  X,
  BookOpen,
  CheckCircle,
  Download
} from "lucide-react";

const baseStudentNames = [
  "Muhammad Rayyan", "Ayesha Fatima", "Zaid Ahmed", "Fatima Zahra", "Hamza Ali",
  "Anaya Khan", "Bilal Tariq", "Hania Amir", "Usman Ghani", "Meerab Shah",
  "Syed Daniyal", "Eshal Imran", "Mustafa Kamal", "Dua Malik", "Ayaan Siddiqui",
  "Zainab Bibi", "Hashir Mehmood", "Sarah Naveed", "Saad Rizvi", "Alishba Noor",
  "Umer Farooq", "Bareera Junaid", "Farhan Akhtar", "Kinza Hashmi", "Taha Qureshi"
];

const schoolList = [
  "The City School (PAF Chapter)", "Beaconhouse School System", "Army Public School (APS)",
  "Karachi Grammar School", "Lahore Grammar School", "Habib Public School",
  "Generation's School", "Foundation Public School", "Roots Millennium", "Froebel's International"
];

const categoriesList = [
  "General Knowledge", "Art & Creative Expression", "Science & Discovery", "Mathematics Olympiad"
];

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
      fatherName: "Guardian of " + name,
      grade,
      category,
      school,
      phone: "0300" + String(1000000 + i).slice(0, 7),
      city: "Karachi",
      payment_status: i % 7 === 0 ? "Pending" : i % 15 === 0 ? "Rejected" : "Approved",
      testScore: i % 4 === 0 ? "28/30" : i % 5 === 0 ? "24/30" : null,
      testStatus: i % 4 === 0 || i % 5 === 0 ? "Completed" : "Pending",
      registrationDate: "Base Record"
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

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<"students" | "syllabus" | "settings">("students");

  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeeStatus, setFilterFeeStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [editingCandidate, setEditingCandidate] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    fatherName: "",
    school: "",
    grade: "",
    category: "",
    phone: "",
    city: "",
    payment_status: "Pending"
  });

  const [disciplines, setDisciplines] = useState<any[]>(defaultDisciplines);
  const [editingDiscipline, setEditingDiscipline] = useState<any | null>(null);
  const [discForm, setDiscForm] = useState({
    name: "",
    primaryTitle: "",
    primaryPoints: "",
    secondaryTitle: "",
    secondaryPoints: "",
    extraNotice: ""
  });
  const [syllabusSaved, setSyllabusSaved] = useState(false);

  const [deadline, setDeadline] = useState("30 December 2026");
  const [examDate, setExamDate] = useState("15 January 2027");
  const [resultsDate, setResultsDate] = useState("25 January 2027");
  const [fee, setFee] = useState<number>(1100);
  const [whatsapp, setWhatsapp] = useState("923000000000");
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
        if (parsed.fee) setFee(Number(parsed.fee));
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

    loadMergedStudents();
  }, []);

  const loadMergedStudents = () => {
    try {
      const base100 = getInitial100();
      let mainStored: any[] = [];
      let customRegistered: any[] = [];

      const s1 = localStorage.getItem("mindmory_students");
      if (s1) {
        try { mainStored = JSON.parse(s1); } catch {}
      }

      const s2 = localStorage.getItem("mindmory_registered_students");
      if (s2) {
        try { customRegistered = JSON.parse(s2); } catch {}
      }

      const studentsMap = new Map<string, any>();
      base100.forEach((st) => studentsMap.set(st.rollNo.toUpperCase(), st));

      if (Array.isArray(mainStored)) {
        mainStored.forEach((st) => {
          if (st.rollNo) {
            const current = studentsMap.get(st.rollNo.toUpperCase()) || {};
            studentsMap.set(st.rollNo.toUpperCase(), { 
              ...current, 
              ...st, 
              payment_status: st.payment_status || current.payment_status || "Pending" 
            });
          }
        });
      }

      if (Array.isArray(customRegistered)) {
        customRegistered.forEach((st) => {
          if (st.rollNo) {
            const current = studentsMap.get(st.rollNo.toUpperCase()) || {};
            studentsMap.set(st.rollNo.toUpperCase(), { 
              ...current, 
              ...st, 
              payment_status: st.payment_status || current.payment_status || "Pending" 
            });
          }
        });
      }

      const mergedList = Array.from(studentsMap.values());
      mergedList.sort((a, b) => {
        const numA = parseInt(a.rollNo?.replace(/\D/g, "") || "0", 10);
        const numB = parseInt(b.rollNo?.replace(/\D/g, "") || "0", 10);
        return numA - numB;
      });

      setStudents(mergedList);
      localStorage.setItem("mindmory_students", JSON.stringify(mergedList));
    } catch {}
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
      payment_status: student.payment_status || "Pending"
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
          payment_status: editFormData.payment_status
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

  const handleOpenDisciplineEdit = (disc: any) => {
    setEditingDiscipline(disc);
    setDiscForm({
      name: disc.name,
      primaryTitle: disc.primaryTitle,
      primaryPoints: disc.primaryPoints.join("\n"),
      secondaryTitle: disc.secondaryTitle,
      secondaryPoints: disc.secondaryPoints.join("\n"),
      extraNotice: disc.extraNotice || ""
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
          primaryPoints: discForm.primaryPoints.split("\n").map((p) => p.trim()).filter((p) => p.length > 0),
          secondaryTitle: discForm.secondaryTitle.trim(),
          secondaryPoints: discForm.secondaryPoints.split("\n").map((p) => p.trim()).filter((p) => p.length > 0),
          extraNotice: discForm.extraNotice.trim() || undefined
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
      whatsapp: whatsapp.replace(/[^0-9]/g, "")
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
    const matchesSearch = !q || s.name?.toLowerCase().includes(q) || s.rollNo?.toLowerCase().includes(q) || s.school?.toLowerCase().includes(q);
    const matchesCat = filterCategory === "all" || s.category === filterCategory;
    const matchesFee = filterFeeStatus === "all" || s.payment_status?.toLowerCase() === filterFeeStatus.toLowerCase();
    return matchesSearch && matchesCat && matchesFee;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterFeeStatus, filterCategory, pageSize]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  const approvedCount = students.filter((s) => s.payment_status?.toLowerCase() === "approved").length;
  const pendingCount = students.filter((s) => s.payment_status?.toLowerCase() === "pending").length;

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Mindmory Secretariat Admin Dashboard</span>
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
              <RefreshCw className="w-3.5 h-3.5 text-red-500" />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        </div>

        {/* TABS */}
        <div className="flex border-b border-neutral-900 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab("students")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "students" ? "text-red-500 border-b-2 border-red-600" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidates Roster & Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("syllabus")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "syllabus" ? "text-red-500 border-b-2 border-red-600" : "text-neutral-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus & Category Manager ({disciplines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "settings" ? "text-red-500 border-b-2 border-red-600" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Portal Settings & PIN</span>
          </button>
        </div>

        {/* TAB 1: CANDIDATES ROSTER WITH WORKING PAGINATION */}
        {activeTab === "students" && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
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
                  <option value="Art & Creative Expression">Art & Creative Expression</option>
                  <option value="Science & Discovery">Science & Discovery</option>
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

            {/* Table */}
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-850">
                    <tr>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Candidate & Father</th>
                      <th className="py-3 px-4">Class & Discipline</th>
                      <th className="py-3 px-4">School</th>
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
                              <option value="Pending" className="bg-black text-amber-400">⏳ Pending</option>
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
                        <td colSpan={7} className="text-center py-8 text-neutral-500">
                          No candidate records found matching current query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION BAR (PREVIOUS / NEXT) */}
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

        {/* TAB 2: SYLLABUS & CATEGORY MANAGER */}
        {activeTab === "syllabus" && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Curriculum Disciplines & Syllabus Outlines</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Sadaf can edit headings, add points, or revise syllabus criteria for any category here.
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
                <div key={cat.id} className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
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

        {/* TAB 3: PORTAL SETTINGS & PIN */}
        {activeTab === "settings" && (
          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 max-w-2xl space-y-6 text-left shadow-2xl">
            <h2 className="text-xl font-black text-white">Contest Parameters & Security</h2>
            {settingsSaved && (
              <div className="bg-green-950/80 border border-green-800 text-green-300 p-3 rounded-xl text-xs font-bold">
                ✓ Settings & PIN saved!
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
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold block">Primary Division (Grades 1-5)</span>
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
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Secondary Division (Grades 6-10)</span>
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

            {/* EDIT CANDIDATE FORM (WITH FATHER NAME INCLUDED) */}
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
                  <label className="block text-neutral-400 font-bold mb-1">Father / Guardian Name</label>
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
                    <option value="Art & Creative Expression">Art & Creative Expression</option>
                    <option value="Science & Discovery">Science & Discovery</option>
                    <option value="Mathematics Olympiad">Mathematics Olympiad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Contact Phone</label>
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

    </div>
  );
}
