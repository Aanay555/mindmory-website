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
  CreditCard,
  Laptop
} from "lucide-react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [issuedRollNo, setIssuedRollNo] = useState("");
  const [whatsappHelpline, setWhatsappHelpline] = useState("923000000000");
  const [feeAmount, setFeeAmount] = useState(1100);

  const [formData, setFormData] = useState({
    candidateName: "",
    fatherName: "",
    schoolName: "",
    grade: "Grade 1",
    discipline: "General Knowledge",
    parentPhone: "",
    parentEmail: "",
    city: "Karachi",
    trxId: ""
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindmory_site_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.whatsapp) setWhatsappHelpline(parsed.whatsapp.replace(/[^0-9]/g, ""));
        if (parsed.fee) setFeeAmount(Number(parsed.fee));
      }
    } catch {}
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFormForNext = () => {
    setFormData({
      candidateName: "",
      fatherName: "",
      schoolName: "",
      grade: "Grade 1",
      discipline: "General Knowledge",
      parentPhone: "",
      parentEmail: "",
      city: "Karachi",
      trxId: ""
    });
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

    const newStudentProfile = {
      id: "std_" + Date.now(),
      rollNo: nextRollNumber,
      name: formData.candidateName.trim(),
      fatherName: formData.fatherName.trim(),
      grade: formData.grade,
      category: formData.discipline,
      school: formData.schoolName.trim(),
      phone: formData.parentPhone.trim(),
      email: formData.parentEmail.trim(),
      city: formData.city.trim(),
      trxId: formData.trxId.trim() || "Not Provided",
      payment_status: "Pending",
      testScore: null,
      testStatus: "Pending",
      registrationDate: new Date().toLocaleDateString()
    };

    allStudents.push(newStudentProfile);

    try {
      localStorage.setItem("mindmory_students", JSON.stringify(allStudents));
    } catch {}

    setIssuedRollNo(nextRollNumber);
    setSubmitted(true);
  };

  const waMessage = `Hello Mindmory Secretariat, I have registered candidate:
Name: ${formData.candidateName}
Roll Number: ${issuedRollNo}
Discipline: ${formData.discipline} (${formData.grade})
School: ${formData.schoolName}
Fee Amount: PKR ${feeAmount}
Transaction Reference: ${formData.trxId || "Proof Attached via Screenshot"}`;

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pt-10 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-red-500 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-2 text-left">
          <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase block">
            CENTRAL ENROLLMENT SECRETARIAT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Candidate Competition Registration
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Fill the enrollment form below. Candidate Roll Number will be generated immediately and registered in Pending Fee status.
          </p>
        </div>

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
                    <h3 className="text-base font-black text-white">Candidate Provisional Slip Issued</h3>
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
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-mono">OFFICIAL ROLL NUMBER</span>
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
                    <span className="text-neutral-500 block">Father / Guardian:</span>
                    <span className="font-bold text-neutral-200">{formData.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Institution / School:</span>
                    <span className="font-bold text-neutral-200">{formData.schoolName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Class & Category:</span>
                    <span className="font-bold text-amber-400">{formData.grade} • {formData.discipline}</span>
                  </div>
                </div>
              </div>

              {/* FEE INSTRUCTIONS */}
              <div className="bg-neutral-900/70 border border-neutral-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <CreditCard className="w-4 h-4 text-red-500" />
                  <span>Next Step: Complete Payment Verification</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Deposit entry fee of <strong className="text-white">PKR {feeAmount}</strong> via JazzCash, EasyPaisa, or Online Bank Transfer. After transferring, send your receipt screenshot to our official WhatsApp desk:
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${whatsappHelpline}?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-green-600/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Payment Proof to Secretariat →</span>
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
                  <span>Register Another Candidate</span>
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
                  <label className="block text-neutral-300 font-bold mb-1.5">Father / Guardian Name</label>
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
                  <label className="block text-neutral-300 font-bold mb-1.5">Candidate Class/Grade</label>
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
                  <label className="block text-neutral-300 font-bold mb-1.5">Competition Category</label>
                  <select
                    name="discipline"
                    value={formData.discipline}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Art & Creative Expression">Art & Creative Expression</option>
                    <option value="Science & Discovery">Science & Discovery</option>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-green-500" />
                    <span>Parent WhatsApp Number</span>
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    required
                    placeholder="03001234567"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Parent / School Email</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    required
                    placeholder="parent@domain.com"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                  <span>Payment Transaction ID / Reference (Optional)</span>
                </label>
                <input
                  type="text"
                  name="trxId"
                  placeholder="e.g. JazzCash / Bank TID (leave empty if paying later)"
                  value={formData.trxId}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
                />
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
                <span>Confirm & Generate Candidate Roll Number</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
