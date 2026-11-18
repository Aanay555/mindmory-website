"use client";

import React, { useState, useEffect } from "react";
import { ImagePlus, Trash2, CheckCircle2, Camera } from "lucide-react";

interface CustomPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: "ceremony" | "art" | "winners" | "exams";
  url: string;
  isCustom: boolean;
}

export default function GalleryPhotoManager() {
  const [photos, setPhotos] = useState<CustomPhoto[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState<CustomPhoto["category"]>("ceremony");
  const [previewUrl, setPreviewUrl] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindmory_custom_gallery");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setPhotos(parsed);
      }
    } catch {}
  }, []);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Please select an image smaller than 4MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !previewUrl) {
      alert("Please enter Photo Title and select an image file.");
      return;
    }

    const newItem: CustomPhoto = {
      id: "gal_" + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || "MINDMORY Official Event",
      category,
      url: previewUrl,
      isCustom: true,
    };

    const updated = [newItem, ...photos];
    setPhotos(updated);
    try {
      localStorage.setItem("mindmory_custom_gallery", JSON.stringify(updated));
    } catch {
      alert("Storage limit reached. Please delete an old photo first.");
      return;
    }

    setTitle("");
    setSubtitle("");
    setPreviewUrl("");
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    try {
      localStorage.setItem("mindmory_custom_gallery", JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-xl my-8">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
              LIVE GALLERY PUBLISHER
            </span>
            <h2 className="text-lg font-black text-white">
              Upload Real Event &amp; Competition Photos
            </h2>
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Uploaded: {photos.length}
        </span>
      </div>

      <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold text-neutral-300 mb-1">Photo Title</label>
          <input
            type="text"
            required
            placeholder="e.g. MINDMORY Karachi Grand Finale 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block font-bold text-neutral-300 mb-1">Subtitle / Venue</label>
          <input
            type="text"
            placeholder="e.g. Annual Award Distribution Ceremony"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block font-bold text-neutral-300 mb-1">Gallery Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CustomPhoto["category"])}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-600"
          >
            <option value="ceremony">Award Ceremonies</option>
            <option value="winners">Winners &amp; Trophies</option>
            <option value="exams">Exam &amp; Quiz Halls</option>
            <option value="art">Student Artworks</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-neutral-300 mb-1">
            Select Photo (JPG, PNG, WebP)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagePick}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2 text-neutral-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white cursor-pointer"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-16 w-28 object-cover rounded-xl border border-neutral-700"
            />
          ) : (
            <span className="text-[11px] text-neutral-500">
              Selected photo will appear immediately on /gallery page.
            </span>
          )}

          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-lg shadow-red-600/30"
          >
            {savedMsg ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                <span>Published to Gallery!</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-4 h-4" />
                <span>Publish Photo to Gallery</span>
              </>
            )}
          </button>
        </div>
      </form>

      {photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
          {photos.map((item) => (
            <div
              key={item.id}
              className="bg-black border border-neutral-800 rounded-2xl overflow-hidden flex items-center justify-between p-3 gap-3"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-16 h-14 object-cover rounded-lg shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{item.title}</p>
                <span className="text-[10px] text-amber-400 uppercase font-mono">
                  {item.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                title="Delete Photo"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
