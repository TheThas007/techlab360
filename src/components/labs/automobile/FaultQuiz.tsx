"use client";

import { useState } from "react";

export default function FaultQuiz() {
  const [quizState, setQuizState] = useState(0);

  return (
    <div className="w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Fault Detection Quiz</h2>
      
      {quizState === 0 && (
        <div>
          <p className="text-zinc-300 mb-6 text-lg">Scenario: The engine cranks (turns over) but will not start. What is the most likely cause?</p>
          <div className="space-y-3">
            <button onClick={() => setQuizState(1)} className="w-full p-4 text-left border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all">A. Dead battery</button>
            <button onClick={() => setQuizState(2)} className="w-full p-4 text-left border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all">B. Faulty fuel pump / No fuel</button>
            <button onClick={() => setQuizState(1)} className="w-full p-4 text-left border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all">C. Bad starter motor</button>
          </div>
        </div>
      )}

      {quizState === 1 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-xl font-bold text-white mb-2">Incorrect</h3>
          <p className="text-zinc-400 mb-6">If the battery or starter motor were bad, the engine would not crank at all. Since it cranks, the electrical starting system is working.</p>
          <button onClick={() => setQuizState(0)} className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all">Try Again</button>
        </div>
      )}

      {quizState === 2 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-white mb-2">Correct!</h3>
          <p className="text-zinc-400 mb-6">Since the engine is cranking, the starting system (battery, starter) is fine. The lack of starting is likely due to no fuel reaching the cylinders (fuel pump issue) or no spark.</p>
          <button onClick={() => setQuizState(0)} className="px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-all">Restart Quiz</button>
        </div>
      )}
    </div>
  );
}
