"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: {
    q: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export default function QuizModal({ isOpen, onClose, title, questions }: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore(s => s + 1);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111111]">
          <h2 className="font-bold text-white">{title} — Quiz</h2>
          <button onClick={reset} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!showResult ? (
            <>
              <div className="flex justify-between text-xs font-bold text-zinc-500 mb-6">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-6">
                {questions[currentQ].q}
              </h3>

              <div className="space-y-3 mb-8">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected === i 
                        ? "bg-white text-black border-white" 
                        : "bg-[#111111] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={selected === null}
                  className="btn-primary disabled:opacity-50"
                >
                  {currentQ === questions.length - 1 ? "Finish" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
              <p className="text-zinc-400 mb-8">You scored {score} out of {questions.length}</p>
              
              <div className="flex justify-center gap-4">
                <button onClick={reset} className="btn-secondary">Close</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
