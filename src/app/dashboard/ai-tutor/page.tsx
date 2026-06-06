"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Send, Bot, User, Sparkles, BookOpen, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SUBJECTS = [
  { id: "general", label: "General Questions", icon: Sparkles },
  { id: "automobile", label: "Automobile Lab", icon: BrainCircuit },
  { id: "civil", label: "Civil Engineering", icon: BookOpen },
  { id: "physics", label: "Physics Concepts", icon: Sparkles },
  { id: "chemistry", label: "Chemistry Reactions", icon: BookOpen },
  { id: "electronics", label: "Electronics Circuits", icon: BrainCircuit },
];

const QUICK_QUESTIONS = [
  "Explain the 4-stroke engine cycle simply",
  "How do I calculate beam deflection?",
  "What is the Arrhenius equation?",
  "Explain Ohm's Law with an example",
  "Generate study notes for thermodynamics",
  "Create a 5-question quiz on mechanics"
];

export default function AITutorPage() {
  const { language } = useLanguage();
  
  // Set initial greeting based on language
  const getGreeting = () => {
    if (language === 'ta') return "வணக்கம் தஸ்மிலன்! நான் உங்கள் AI ஆய்வக உதவியாளர். உங்கள் பொறியியல் ஆய்வுகளில் இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்? நான் கருத்துக்களை விளக்கலாம், கணக்கீடுகளுக்கு உதவலாம் அல்லது ஆய்வு குறிப்புகளை உருவாக்கலாம்.";
    if (language === 'si') return "ආයුබෝවන් තස්මිලන්! මම ඔබේ AI විද්‍යාගාර සහයක. අද ඔබේ ඉංජිනේරු අධ්‍යයනයට මම ඔබට උදව් කරන්නේ කෙසේද? මට සංකල්ප පැහැදිලි කිරීමට, ගණනය කිරීම්වලට උදව් කිරීමට හෝ අධ්‍යයන සටහන් ජනනය කිරීමට හැකිය.";
    return "Hello Thasmilan! I'm your AI Lab Assistant. How can I help you with your engineering studies today? I can explain concepts, help with calculations, or generate study notes.";
  };

  const [messages, setMessages] = useState([{ role: "ai", content: getGreeting() }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSubject, setActiveSubject] = useState("general");

  // Update greeting if it's the only message and language changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ role: "ai", content: getGreeting() }]);
    }
  }, [language]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay with translated text
    setTimeout(() => {
      let aiResponse = "";
      
      if (language === 'ta') {
        aiResponse = `இதோ "${text}" தொடர்பான விரிவான விளக்கம்.\n\nபொறியியலில், அடிப்படை கொள்கைகளை பகுப்பாய்வு செய்வதன் மூலம் இதை அணுகுகிறோம். எடுத்துக்காட்டாக, கோட்பாட்டு கட்டமைப்பை நாம் கருதினால், முக்கிய மாறிகள் நிலையான விதிகளின்படி கணிக்கக்கூடிய வகையில் தொடர்பு கொள்கின்றன.\n\n**முக்கிய குறிப்புகள்:**\n• முதல் கொள்கை பகுப்பாய்வு\n• கணினி கட்டுப்பாடுகள்\n• செயல்திறன் மேம்படுத்தல்\n\nஇந்த தலைப்பில் பயிற்சி வினாடி வினாவை நான் உருவாக்க விரும்புகிறீர்களா?`;
      } else if (language === 'si') {
        aiResponse = `මෙන්න "${text}" පිළිබඳ සවිස්තරාත්මක පැහැදිලි කිරීමක්.\n\nඉංජිනේරු විද්‍යාවේදී, අපි මූලික මූලධර්ම විශ්ලේෂණය කිරීමෙන් මෙය ප්‍රවේශ කරමු. උදාහරණයක් ලෙස, අපි න්‍යායික රාමුව සලකා බැලුවහොත්, ප්‍රධාන විචල්‍යයන් සම්මත නීතිවලට අනුකූලව පුරෝකථනය කළ හැකි ආකාරයෙන් අන්තර්ක්‍රියා කරයි.\n\n**ප්‍රධාන කරුණු:**\n• පළමු මූලධර්ම විශ්ලේෂණය\n• පද්ධති සීමාවන්\n• කාර්ය සාධනය ප්‍රශස්ත කිරීම\n\nමෙම මාතෘකාව පිළිබඳ පුහුණු ප්‍රශ්නාවලියක් මා විසින් ජනනය කරනවාට ඔබ කැමතිද?`;
      } else {
        aiResponse = `Here is a detailed explanation regarding "${text}".\n\nIn engineering, we approach this by analyzing the fundamental principles. For instance, if we consider the theoretical framework, the key variables interact predictably according to standard laws.\n\n**Key Points:**\n• First principle analysis\n• System constraints\n• Performance optimization\n\nWould you like me to generate a practice quiz on this topic?`;
      }

      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#000000]">
      <DashboardHeader title="AI Study Assistant" subtitle="Powered by advanced engineering models" />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Subjects & History */}
        <div className="w-64 shrink-0 border-r border-white/5 bg-[#050505] hidden md:flex flex-col">
          <div className="p-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Subjects</h3>
            <div className="space-y-1">
              {SUBJECTS.map((sub) => {
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubject(sub.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSubject === sub.id
                        ? "bg-white text-black font-medium"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-4 border-t border-white/5 mt-auto">
            <div className="p-4 rounded-xl bg-[#111111] border border-white/10 text-center">
              <Sparkles className="w-5 h-5 text-zinc-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Upgrade to Pro</div>
              <div className="text-xs text-zinc-500 mb-3">Get GPT-4 access and unlimited notes.</div>
              <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-[#0A0A0A]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
            {messages.length === 1 && (
              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-8 mt-4">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="p-4 text-left rounded-xl bg-[#111111] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
                  >
                    <p className="text-sm text-zinc-400 group-hover:text-white transition-colors">{q}</p>
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 max-w-4xl mx-auto ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === "ai" 
                      ? "bg-white text-black" 
                      : "bg-[#222222] text-white border border-white/10"
                  }`}>
                    {msg.role === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-[#222222] border border-white/10 text-white"
                      : "bg-[#111111] border border-white/5 text-zinc-300"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 max-w-4xl mx-auto"
              >
                <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-white text-black">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-[#111111] border border-white/5 flex items-center gap-1.5">
                  <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-[#000000] border-t border-white/5 shrink-0">
            <div className="max-w-4xl mx-auto relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your engineering labs..."
                className="w-full bg-[#111111] border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 shadow-xl"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-zinc-600 mt-3">
              AI Tutor can make mistakes. Always verify engineering formulas and safety calculations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
