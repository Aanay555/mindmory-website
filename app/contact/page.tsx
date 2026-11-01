"use client";
import React, { useState } from "react";
import { siteContent } from "@/data/content";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black py-16 px-4 border-b border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-black">Contact MINDMORY Secretariat</h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Have questions regarding student eligibility, school registration fee, or contest scheduling? Our facilitation team is here to assist.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-4">Secretariat Information</h2>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-400">Main Office Address</p>
                <p className="text-sm font-semibold text-white">{siteContent.header.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-400">Helpline / Support</p>
                <p className="text-sm font-semibold text-white">{siteContent.header.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-400">Email Inquiries</p>
                <p className="text-sm font-semibold text-white">{siteContent.header.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-400">Official WhatsApp Direct</p>
                <a 
                  href={`https://wa.me/${siteContent.header.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-bold text-red-400 hover:underline"
                >
                  +{siteContent.header.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-neutral-950 p-8 rounded-2xl border border-neutral-800">
          <h2 className="text-xl font-bold text-white mb-2">Send an Official Message</h2>
          <p className="text-xs text-neutral-400 mb-6">Our coordinator desk will respond within 24 business hours.</p>

          {submitted ? (
            <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-center space-y-2">
              <p className="text-base font-bold text-white">Thank you! Your message has been received.</p>
              <p className="text-xs text-neutral-300">A representative will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Principal / Coordinator Name"
                    className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">School / Institute</label>
                  <input
                    type="text"
                    required
                    placeholder="Institute Full Name"
                    className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@school.com"
                    className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="0300-1234567"
                    className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Message / Question</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about student count, required syllabus, or registration queries..."
                  className="w-full bg-black border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 font-bold text-xs px-8 py-3.5 rounded-xl transition text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}