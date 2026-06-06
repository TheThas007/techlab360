"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Search, Download, Bookmark, FileText, Bot, Eye, Maximize2, MoreVertical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NOTES = [
  { id: 1, title: "Thermodynamics Laws", subject: "Physics", pages: 12, rating: 4.8, reads: 1240 },
  { id: 2, title: "IC Engines Architecture", subject: "Automobile", pages: 24, rating: 4.9, reads: 3100 },
  { id: 3, title: "Concrete Mix Design (IS 10262)", subject: "Civil Eng", pages: 18, rating: 4.7, reads: 890 },
  { id: 4, title: "Chemical Kinetics Basics", subject: "Chemistry", pages: 8, rating: 4.5, reads: 650 },
  { id: 5, title: "Fluid Mechanics: Bernoulli's", subject: "Physics", pages: 15, rating: 4.9, reads: 2100 },
  { id: 6, title: "Transmission Systems", subject: "Automobile", pages: 20, rating: 4.6, reads: 1500 },
  { id: 7, title: "Ohm's Law & Circuits", subject: "Electronics", pages: 10, rating: 4.8, reads: 1100 },
];

export default function NotesLibraryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeNote, setActiveNote] = useState<typeof NOTES[0] | null>(null);

  const filteredNotes = NOTES.filter(n => {
    const matchesFilter = filter === "All" || n.subject === filter;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#000000]">
      <DashboardHeader title="Notes Library" subtitle="Premium study materials and reference guides" />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto custom-scrollbar">
              {["All", "Physics", "Automobile", "Civil Eng", "Chemistry", "Electronics"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === f ? "bg-white text-black" : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-5 cursor-pointer flex flex-col h-full"
                onClick={() => setActiveNote(note)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <button className="text-zinc-600 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">{note.title}</h3>
                <p className="text-sm text-zinc-500 mb-6">{note.subject}</p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {note.pages}p</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {note.reads}</span>
                  </div>
                  <span className="flex items-center gap-1 text-white font-medium">
                    ⭐ {note.rating}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Slide-in Reader Panel */}
        <AnimatePresence>
          {activeNote && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-full sm:w-96 shrink-0 border-l border-white/5 bg-[#050505] flex flex-col absolute right-0 top-0 bottom-0 z-20 sm:relative shadow-2xl"
            >
              <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#000000]">
                <h3 className="font-bold text-white truncate pr-4">{activeNote.title}</h3>
                <button onClick={() => setActiveNote(null)} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#111111] border border-white/10 text-white">{activeNote.subject}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#111111] border border-white/10 text-zinc-400">{activeNote.pages} Pages</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#111111] border border-white/10 text-zinc-400">PDF Format</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-primary flex items-center justify-center gap-2 text-sm py-2.5">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                    <Maximize2 className="w-4 h-4" /> Focus Mode
                  </button>
                </div>

                {/* AI Summary Card */}
                <div className="rounded-xl border border-white/10 bg-[#111111] overflow-hidden mt-6">
                  <div className="p-4 border-b border-white/5 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">AI Executive Summary</span>
                  </div>
                  <div className="p-4 text-sm text-zinc-400 leading-relaxed">
                    This document covers the fundamental principles of {activeNote.title}. It includes detailed diagrams, mathematical derivations, and 3 case studies relevant to modern engineering applications. 
                    <br/><br/>
                    <span className="text-white font-medium">Key Concepts:</span>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-1 text-zinc-500">
                      <li>Theoretical Framework</li>
                      <li>Mathematical Modeling</li>
                      <li>Practical Implementation</li>
                    </ul>
                  </div>
                  <button className="w-full p-3 border-t border-white/5 text-xs font-bold text-white hover:bg-white/5 transition-colors">
                    Ask AI Questions About This Note
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
