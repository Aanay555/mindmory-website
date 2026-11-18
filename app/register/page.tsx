"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserCheck,
  ShieldAlert,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  User,
  Printer,
  PlusCircle,
  MessageCircle,
  Upload,
  FileCheck2,
  Laptop,
  Download,
  FileText,
} from "lucide-react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [issuedRollNo, setIssuedRollNo] = useState("");
  const [whatsappHelpline, setWhatsappHelpline] = useState("923333400000");
  const [feeAmount, setFeeAmount] = useState(1100);

  const [formData, setFormData] = useState({
    candidateName: "",
    fatherName: "",
    schoolName: "",
    grade: "Grade 1",
    discipline: "General Knowledge",
    countryCode: "+92",
    schoolPhone: "",
    schoolEmail: "",
    city: "Karachi",
  });

  const [depositSlipName, setDepositSlipName] = useState<string>("");
  const [depositSlipData, setDepositSlipData] = useState<string>("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindmory_site_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.whatsapp) setWhatsappHelpline(parsed.whatsapp.replace(/[^0-9]/g, ""));
        if (parsed.fee) {
          const parsedFee = Number(parsed.fee);
          setFeeAmount(parsedFee === 1500 ? 1100 : parsedFee);
        }
      }
    } catch {}
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setDepositSlipName("");
      setDepositSlipData("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload a Bank Deposit Slip smaller than 5MB (JPG, PNG, or PDF).");
      e.target.value = "";
      return;
    }

    setDepositSlipName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDepositSlipData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetFormForNext = () => {
    setFormData({
      candidateName: "",
      fatherName: "",
      schoolName: "",
      grade: "Grade 1",
      discipline: "General Knowledge",
      countryCode: "+92",
      schoolPhone: "",
      schoolEmail: "",
      city: "Karachi",
    });
    setDepositSlipName("");
    setDepositSlipData("");
    setSubmitted(false);
    setIssuedRollNo("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let allStudents: any[] = [];
    try {
      const stored = localStorage.getItem("mindmory_students");
      if (stored) allStudents = JSON.parse(stored);
    } catch {}

    let maxNum = 1100;
    if (Array.isArray(allStudents) && allStudents.length > 0) {
      allStudents.forEach((st: any) => {
        const m = st.rollNo?.match(/MM-2026-(\d+)/);
        if (m) {
          const n = parseInt(m[1], 10);
          if (n > maxNum) maxNum = n;
        }
      });
    }

    const nextRollNumber = `MM-2026-${maxNum + 1}`;
    const fullSchoolWhatsApp = `${formData.countryCode} ${formData.schoolPhone.trim()}`;

    const newStudentProfile = {
      id: "std_" + Date.now(),
      rollNo: nextRollNumber,
      name: formData.candidateName.trim(),
      fatherName: formData.fatherName.trim(),
      grade: formData.grade,
      category: formData.discipline,
      school: formData.schoolName.trim(),
      phone: fullSchoolWhatsApp,
      email: formData.schoolEmail.trim(),
      city: formData.city.trim(),
      depositSlipName: depositSlipName || "Not Uploaded",
      depositSlipData: depositSlipData || null,
      payment_status: "Pending",
      testScore: null,
      testStatus: "Pending",
      registrationDate: new Date().toLocaleDateString(),
    };

    allStudents.push(newStudentProfile);

    try {
      localStorage.setItem("mindmory_students", JSON.stringify(allStudents));
    } catch {}

    setIssuedRollNo(nextRollNumber);
    setSubmitted(true);
  };

  const waMessage = `Hello MINDMORY Secretariat, our institution has registered a candidate:
Candidate Name: ${formData.candidateName}
Father Name: ${formData.fatherName}
Roll Number: ${issuedRollNo}
Discipline: ${formData.discipline} (${formData.grade})
School: ${formData.schoolName}
School WhatsApp: ${formData.countryCode}${formData.schoolPhone}
Fee Amount: PKR ${feeAmount}
Bank Deposit Slip: ${depositSlipName ? `Attached (${depositSlipName})` : "Attaching via WhatsApp"}`;

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pb-20">
      {/* PICTORIAL HEADER BANNER */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=95"
          alt="MINDMORY School Institutional Registration"
          className="w-full h-56 sm:h-64 object-cover object-center brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 flex items-center">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-2 text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-red-400 transition mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-300 uppercase block drop-shadow">
              CENTRAL ENROLLMENT SECRETARIAT • INSTITUTIONAL PORTAL
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow">
              Candidate Competition Registration
            </h1>
            <p className="text-xs text-neutral-200 leading-relaxed max-w-2xl drop-shadow">
              Institutional enrollment only — individual applications from home are not permitted.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* IKLC / HRCA STYLE OFFICIAL REGISTRATION FORM PDF DOWNLOAD CARD */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-red-950/30 border border-neutral-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL OFFLINE / BULK SCHOOL FORM</span>
            </span>
            <h2 className="text-sm sm:text-base font-black text-white">
              Download MINDMORY Registration Form (PDF)
            </h2>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Schools registering multiple students can download the official registration form, fill it out, and send it via WhatsApp or Secretariat mailing address.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="/mindmory-registration-form.pdf"
              download="MINDMORY-Registration-Form-2026.pdf"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-red-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Form (PDF)</span>
            </a>
            <Link
              href="/downloads"
              className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold rounded-xl text-xs transition"
            >
              All Downloads
            </Link>
          </div>
        </div>

        {/* ONLINE INSTITUTIONAL ENROLLMENT FORM */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="space-y-6 text-left">
              <div className="bg-green-950/40 border border-green-800 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-950 border border-green-700 text-green-400 rounded-xl flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                      SEAT RESERVED • VERIFICATION PENDING
                    </span>
                    <h3 className="text-base font-black text-white">
                      Candidate Provisional Slip Issued
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>

              {/* SLIP CARD */}
              <div className="bg-black border border-neutral-800 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-neutral-900 pb-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-mono">
                      OFFICIAL ROLL NUMBER
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-red-500 tracking-wider">
                      {issuedRollNo}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-amber-950/80 border border-amber-800 text-amber-400 text-[10px] font-bold uppercase rounded-full">
                    Awaiting Fee Approval
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Candidate Name:</span>
                    <span className="font-bold text-white text-sm">{formData.candidateName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Father Name:</span>
                    <span className="font-bold text-neutral-200">{formData.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Institution / School:</span>
                    <span className="font-bold text-neutral-200">{formData.schoolName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Class &amp; Category:</span>
                    <span className="font-bold text-amber-400">
                      {formData.grade} — {formData.discipline}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">School WhatsApp:</span>
                    <span className="font-bold text-neutral-200">
                      {formData.countryCode} {formData.schoolPhone}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Bank Deposit Slip:</span>
                    <span className="font-bold text-green-400">
                      {depositSlipName || "Submitted / Pending WhatsApp"}
                    </span>
                  </div>
                </div>
              </div>

              {/* FEE INSTRUCTIONS */}
              <div className="bg-neutral-900/70 border border-neutral-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <FileCheck2 className="w-4 h-4 text-red-500" />
                  <span>Next Step: Secretariat Fee Verification</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Entry fee per candidate is <strong className="text-white">PKR {feeAmount}</strong>. Forward your filled form or bank deposit slip directly to our official Secretariat WhatsApp desk or mailing address for verification:
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${whatsappHelpline}?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-green-600/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Deposit Slip on WhatsApp →</span>
                  </a>

                  <Link
                    href="/student-login"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-200 rounded-xl text-xs font-bold transition"
                  >
                    <Laptop className="w-4 h-4 text-red-500" />
                    <span>Go to Candidate Portal</span>
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetFormForNext}
                  className="px-5 py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-green-400" />
                  <span>Register Another School Candidate</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    <span>Candidate Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    placeholder="e.g. Muhammad Rayyan"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5">Father Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>School / Institution Name</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  placeholder="e.g. Beaconhouse / The City School / Army Public School"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5">
                    Candidate Class/Grade
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-600"
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
                  <label className="block text-neutral-300 font-bold mb-1.5">
                    Competition Category
                  </label>
                  <select
                    name="discipline"
                    value={formData.discipline}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Art & Creative Expression">Art &amp; Creative Expression</option>
                    <option value="Science & Discovery">Science &amp; Discovery</option>
                    <option value="Mathematics Olympiad">Mathematics Olympiad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Karachi / Lahore / Islamabad"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* SCHOOL-ONLY CONTACT FIELDS WITH COUNTRY CODE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-green-500" />
                    <span>School WhatsApp Number</span>
                  </label>
                  <div className="flex items-center">
                    <select
                      name="countryCode"
                      aria-label="Country Code"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="bg-neutral-900 border border-neutral-800 border-r-0 rounded-l-xl px-2.5 py-2.5 text-white font-mono focus:outline-none focus:border-red-600"
                    >
                      <option value="+92">+92 (PK)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+966">+966 (KSA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+1">+1 (US)</option>
                    </select>
                    <input
                      type="tel"
                      name="schoolPhone"
                      required
                      placeholder="3001234567"
                      value={formData.schoolPhone}
                      onChange={handleChange}
                      className="w-full bg-black border border-neutral-800 rounded-r-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>School Email</span>
                  </label>
                  <input
                    type="email"
                    name="schoolEmail"
                    required
                    placeholder="school@domain.com"
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* BANK DEPOSIT SLIP UPLOAD */}
              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-amber-500" />
                  <span>Bank Deposit Slip Upload (JPG, PNG, or PDF)</span>
                </label>
                <div className="bg-black border border-dashed border-neutral-700 hover:border-red-600 rounded-xl p-4 transition">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleSlipUpload}
                    className="w-full text-xs text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer cursor-pointer"
                  />
                  {depositSlipName && (
                    <p className="mt-2 text-[11px] text-green-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selected file: {depositSlipName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-850 p-4 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Fee per candidate is <span className="text-white font-bold">PKR {feeAmount}</span>. Submission generates an official candidate slip in Pending status. Once verified by Admin, test access is enabled.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirm &amp; Generate Candidate Roll Number</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
