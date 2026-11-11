"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  User, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

// GRADE-SPECIFIC QUESTION BANKS (PURE ENGLISH ONLY)
const gradeQuestionBanks: Record<string, Array<{ id: number; qEn: string; options: string[]; answer: number }>> = {
  "Grade 1": [
    { id: 1, qEn: "What is the national animal of Pakistan?", options: ["Markhor", "Lion", "Bengal Tiger", "Snow Leopard"], answer: 0 },
    { id: 2, qEn: "How many colors are there in the national flag of Pakistan?", options: ["One", "Two", "Three", "Four"], answer: 1 },
    { id: 3, qEn: "Which planet do humans live on?", options: ["Mars", "Venus", "Earth", "Jupiter"], answer: 2 },
    { id: 4, qEn: "How many days make up one complete week?", options: ["5", "6", "7", "8"], answer: 2 },
    { id: 5, qEn: "What provides natural light to the Earth during daytime?", options: ["Moon", "Stars", "Sun", "Clouds"], answer: 2 },
  ],
  "Grade 2": [
    { id: 1, qEn: "What is the federal capital city of Pakistan?", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"], answer: 2 },
    { id: 2, qEn: "How many letters are there in the English alphabet?", options: ["24", "25", "26", "28"], answer: 2 },
    { id: 3, qEn: "Which primary human organ pumps blood throughout the body?", options: ["Lungs", "Heart", "Brain", "Stomach"], answer: 1 },
    { id: 4, qEn: "What is the official national flower of Pakistan?", options: ["Rose", "Jasmine", "Sunflower", "Tulip"], answer: 1 },
    { id: 5, qEn: "How many hours are there in one complete 24-hour cycle?", options: ["12", "20", "24", "48"], answer: 2 },
  ],
  "Grade 3": [
    { id: 1, qEn: "Who is formally recognized as the founding father of Pakistan?", options: ["Allama Iqbal", "Quaid-e-Azam Muhammad Ali Jinnah", "Liaquat Ali Khan", "Sir Syed Ahmed Khan"], answer: 1 },
    { id: 2, qEn: "Which is the largest continent in the world by total land area?", options: ["Africa", "Europe", "Asia", "North America"], answer: 2 },
    { id: 3, qEn: "Which gas is absorbed by plants from the atmosphere during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
    { id: 4, qEn: "What is the standard boiling point of pure water at sea level?", options: ["50°C", "80°C", "100°C", "120°C"], answer: 2 },
    { id: 5, qEn: "Which is the longest river flowing through Pakistan?", options: ["River Ravi", "River Chenab", "River Indus", "River Jhelum"], answer: 2 },
  ],
  "Grade 4": [
    { id: 1, qEn: "Which is the highest mountain peak located in Pakistan?", options: ["Nanga Parbat", "K2 (Godwin Austen)", "Broad Peak", "Tirich Mir"], answer: 1 },
    { id: 2, qEn: "Who composed the official lyrics of the National Anthem of Pakistan?", options: ["Allama Iqbal", "Hafeez Jalandhari", "Faiz Ahmed Faiz", "Josh Malihabadi"], answer: 1 },
    { id: 3, qEn: "Which astronomical body in our solar system is known as the 'Red Planet'?", options: ["Jupiter", "Mars", "Saturn", "Mercury"], answer: 1 },
    { id: 4, qEn: "How many provinces form the administrative territory of Pakistan?", options: ["3", "4", "5", "6"], answer: 1 },
    { id: 5, qEn: "Which essential vitamin is synthesized in the human skin through sunlight exposure?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: 3 },
  ],
  "Grade 5": [
    { id: 1, qEn: "In which year was Pakistan declared an Islamic Republic under its first constitution?", options: ["1947", "1956", "1962", "1973"], answer: 1 },
    { id: 2, qEn: "Which is the largest subtropical desert located in Pakistan?", options: ["Thal", "Cholistan", "Thar", "Kharan"], answer: 2 },
    { id: 3, qEn: "What is the chemical molecular formula for pure water?", options: ["CO2", "H2O", "NaCl", "O2"], answer: 1 },
    { id: 4, qEn: "Which atmospheric layer protects life on Earth from harmful ultraviolet solar radiation?", options: ["Troposphere", "Ozone Layer", "Mesosphere", "Thermosphere"], answer: 1 },
    { id: 5, qEn: "Which coastal metropolis serves as the main financial and maritime shipping hub of Pakistan?", options: ["Lahore", "Islamabad", "Karachi", "Faisalabad"], answer: 2 },
  ],
  "Grade 6": [
    { id: 1, qEn: "The historical Khyber Pass connects Pakistan directly with which neighboring country?", options: ["Iran", "China", "Afghanistan", "India"], answer: 2 },
    { id: 2, qEn: "Which cellular organelle is universally referred to as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], answer: 2 },
    { id: 3, qEn: "Who officially moved the historic Lahore Resolution on 23rd March 1940?", options: ["A.K. Fazlul Huq", "Liaquat Ali Khan", "Chaudhry Khaliquzzaman", "Khawaja Nazimuddin"], answer: 0 },
    { id: 4, qEn: "Which ocean is recognized as the deepest and most expansive on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: 2 },
    { id: 5, qEn: "Which meteorological instrument is engineered to record atmospheric air pressure?", options: ["Thermometer", "Barometer", "Speedometer", "Hygrometer"], answer: 1 },
  ],
  "Grade 7": [
    { id: 1, qEn: "What is the standard International System (SI) unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], answer: 2 },
    { id: 2, qEn: "Which bronze-age civilization flourished across Harappa and Mohenjo-Daro?", options: ["Mesopotamian Civilization", "Indus Valley Civilization", "Egyptian Civilization", "Persian Civilization"], answer: 1 },
    { id: 3, qEn: "Which organ in the human endocrine system produces the hormone insulin?", options: ["Liver", "Pancreas", "Kidneys", "Spleen"], answer: 1 },
    { id: 4, qEn: "Which global charter organization was established on 24th October 1945?", options: ["League of Nations", "United Nations (UN)", "OIC", "SAARC"], answer: 1 },
    { id: 5, qEn: "Sound waves require a physical medium and cannot propagate through which of the following?", options: ["Water", "Steel", "Dense Air", "Vacuum"], answer: 3 },
  ],
  "Grade 8": [
    { id: 1, qEn: "Under which international accord was the distribution of river basins settled in 1960?", options: ["Tashkent Declaration", "Simla Accord", "Indus Waters Treaty", "Delhi Pact"], answer: 2 },
    { id: 2, qEn: "What is the approximate speed of light travelling in a physical vacuum?", options: ["300,000 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"], answer: 0 },
    { id: 3, qEn: "Which human ABO/Rh blood classification is designated as the universal red cell donor?", options: ["A Positive", "B Negative", "AB Positive", "O Negative"], answer: 3 },
    { id: 4, qEn: "The China-Pakistan Economic Corridor (CPEC) links the port of Gwadar with which Chinese region?", options: ["Beijing", "Kashgar, Xinjiang", "Shanghai", "Guangzhou"], answer: 1 },
    { id: 5, qEn: "What is the accepted standard constant for gravitational acceleration on Earth (g)?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "12.0 m/s²"], answer: 1 },
  ],
  "Grade 9": [
    { id: 1, qEn: "According to Newton's Second Law of Motion, what is the fundamental equation for net force?", options: ["F = m / a", "F = m * a", "F = m * v", "F = m + a"], answer: 1 },
    { id: 2, qEn: "Who served as the chief architect and first Prime Minister under the 1973 Constitution of Pakistan?", options: ["Zulfikar Ali Bhutto", "Liaquat Ali Khan", "Muhammad Khan Junejo", "Nawaz Sharif"], answer: 0 },
    { id: 3, qEn: "Which fundamental chemical element occupies atomic number 1 on the periodic table?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], answer: 1 },
    { id: 4, qEn: "Which subcellular structure houses the linear genomic DNA inside eukaryotic cells?", options: ["Cytoplasm", "Nucleus", "Vacuole", "Ribosome"], answer: 1 },
    { id: 5, qEn: "Which city serves as the official administrative capital of the Commonwealth of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
  ],
  "Grade 10": [
    { id: 1, qEn: "In mechanical physics, which derived SI unit is quantified in Joules (J)?", options: ["Power", "Force", "Work and Energy", "Pressure"], answer: 2 },
    { id: 2, qEn: "Which constitutional amendment devolved power to the provinces in Pakistan in 2010?", options: ["17th Amendment", "18th Amendment", "19th Amendment", "21st Amendment"], answer: 1 },
    { id: 3, qEn: "What is the exact pH value of chemically pure neutral water measured at 25°C?", options: ["5.0", "7.0", "9.0", "12.0"], answer: 1 },
    { id: 4, qEn: "Which major overland infrastructure initiative links Central Asia directly with the Arabian Sea?", options: ["CPEC", "TAPI Pipeline", "ECO Highway", "Maritime Silk Route"], answer: 0 },
    { id: 5, qEn: "Which type of optical curved mirror is standardly fitted for vehicle rear-view driving safety?", options: ["Concave Mirror", "Convex Mirror", "Plane Mirror", "Cylindrical Mirror"], answer: 1 },
  ]
};

// Strict Grade Extraction Logic
function parseCleanGrade(raw: string): string {
  if (!raw) return "Grade 1";
  const str = raw.trim().toLowerCase();

  if (str.includes("10") || str.includes("o level")) return "Grade 10";
  if (str.includes("9")) return "Grade 9";
  if (str.includes("8")) return "Grade 8";
  if (str.includes("7")) return "Grade 7";
  if (str.includes("6")) return "Grade 6";
  if (str.includes("5")) return "Grade 5";
  if (str.includes("4")) return "Grade 4";
  if (str.includes("3")) return "Grade 3";
  if (str.includes("2")) return "Grade 2";
  if (str.includes("1")) return "Grade 1";

  return "Grade 1";
}

export default function ExamTerminalPage() {
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [targetGrade, setTargetGrade] = useState("Grade 1");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<{ correct: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    let currentStudent: any = null;

    try {
      const stored = localStorage.getItem("mindmory_current_student");
      if (stored) {
        currentStudent = JSON.parse(stored);
      }
    } catch {}

    if (!currentStudent || !currentStudent.rollNo) {
      currentStudent = {
        rollNo: "MM-2026-1001",
        name: "Verified Candidate",
        grade: "Grade 1",
        category: "General Knowledge",
        school: "Mindmory Assessment Center"
      };
    }

    const resolvedGrade = parseCleanGrade(currentStudent.grade);
    setStudent(currentStudent);
    setTargetGrade(resolvedGrade);

    fetchClassWiseQuestions(resolvedGrade);
  }, []);

  const fetchClassWiseQuestions = async (cleanGrade: string) => {
    let fetchedFromDb = false;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/official_exam_questions?grade=eq.${encodeURIComponent(cleanGrade)}&select=*`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((d: any, index: number) => ({
              id: index + 1,
              qEn: d.question_en,
              options: d.options,
              answer: d.correct_index
            }));
            setQuestions(formatted);
            fetchedFromDb = true;
          }
        }
      } catch (err) {
        console.warn("Database fallback activated:", err);
      }
    }

    if (!fetchedFromDb) {
      const bank = gradeQuestionBanks[cleanGrade] || gradeQuestionBanks["Grade 1"];
      setQuestions(bank);
    }
  };

  useEffect(() => {
    if (isExamCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExamCompleted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isExamCompleted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionIndex
    });
  };

  const handleAutoSubmit = () => {
    let correctCount = 0;
    const totalCount = questions.length;

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalCount) * 100);
    const scoreStr = `${correctCount}/${totalCount}`;

    setFinalScore({
      correct: correctCount,
      total: totalCount,
      percentage
    });
    setIsExamCompleted(true);

    try {
      const stored = localStorage.getItem("mindmory_students");
      if (stored && student?.rollNo) {
        const parsed = JSON.parse(stored);
        const updated = parsed.map((st: any) => {
          if (st.rollNo?.toUpperCase() === student.rollNo.toUpperCase()) {
            return {
              ...st,
              testStatus: "Completed",
              testScore: scoreStr,
              testPercentage: percentage
            };
          }
          return st;
        });
        localStorage.setItem("mindmory_students", JSON.stringify(updated));
      }
    } catch {}
  };

  if (!student || questions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 text-left">
        
        {/* IDENTIFICATION HEADER */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-500 font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{student.name}</span>
                <span className="text-[10px] font-mono bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded font-bold">
                  {student.rollNo}
                </span>
              </div>
              <span className="text-xs text-neutral-400 block mt-0.5">
                {student.school} • <span className="text-amber-400 font-bold">{targetGrade}</span> Assessment Terminal
              </span>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 shrink-0 ${
            timeLeft < 180 ? "bg-red-950/80 border-red-700 text-red-400 animate-pulse" : "bg-neutral-900 border-neutral-800 text-neutral-200"
          }`}>
            <Clock className="w-4 h-4 text-red-500" />
            <div>
              <span className="text-[9px] uppercase font-mono block text-neutral-500 leading-none">Time Remaining</span>
              <span className="text-base font-black font-mono leading-tight">{formatTimer(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* ACTIVE EXAM CONTAINER */}
        {!isExamCompleted ? (
          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-400 bg-red-950 px-2.5 py-1 rounded-lg border border-red-900">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="text-[11px] text-neutral-500">
                  • {answeredCount} Answered
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded-full font-bold">
                {targetGrade} Official Test
              </span>
            </div>

            {/* QUESTION DISPLAY */}
            <div className="space-y-2 py-2">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.qEn}
              </h2>
            </div>

            {/* MULTIPLE CHOICE OPTIONS */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ.options.map((opt: string, optIdx: number) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-red-950/60 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                        : "bg-neutral-900/60 border-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center border ${
                        isSelected 
                          ? "bg-red-600 border-red-500 text-white" 
                          : "bg-neutral-950 border-neutral-850 text-neutral-400"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isSelected && <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* PREVIOUS / NEXT / SUBMIT ACTIONS */}
            <div className="pt-6 border-t border-neutral-900 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => i - 1)}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-850 disabled:opacity-30 border border-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition text-neutral-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAutoSubmit}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-green-600/30 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Exam Now</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-950 border border-green-800 flex items-center justify-center text-green-400 mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest block">
                ASSESSMENT COMPLETE
              </span>
              <h2 className="text-2xl font-black text-white">{targetGrade} Exam Submitted</h2>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
                Paper submitted for Roll Number <strong className="text-red-400">{student.rollNo}</strong> ({student.name}).
              </p>
            </div>

            {finalScore && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto py-2">
                <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">Score</span>
                  <span className="text-xl font-black text-white font-mono">{finalScore.correct} / {finalScore.total}</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">Percentage</span>
                  <span className="text-xl font-black text-green-400 font-mono">{finalScore.percentage}%</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">Status</span>
                  <span className="text-xl font-black text-green-400">Completed</span>
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/student-login"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition"
              >
                Back to Desk
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
