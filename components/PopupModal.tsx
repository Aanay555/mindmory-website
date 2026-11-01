"use client";
import React, { useState, useEffect } from "react";
import { siteContent } from "@/data/content";
import { X, Award, Calendar, DollarSign } from "lucide-react";

export default function PopupModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative border-2 border-amber-400">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6 text-white text-center">
          <span className="bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {siteContent.popup.title}
          </span>
          <h3 className="text-xl font-extrabold mt-3">{siteContent.popup.subtitle}</h3>
        </div>

        <div className="p-6 space-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-500" />
            <span><strong>Eligibility:</strong> {siteContent.popup.eligibility}</span>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span><strong>Fee:</strong> {siteContent.popup.fee}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-red-500" />
            <span><strong>Deadline:</strong> {siteContent.popup.deadline}</span>
          </div>

          <a
            href={`https://wa.me/${siteContent.header.whatsapp}?text=I%20want%20to%20register%20for%20Contest`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-md mt-4"
          >
            {siteContent.popup.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}