"use client";

import { motion } from "framer-motion";
import { X, Award, Download } from "lucide-react";
import { useRef } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  studentName: string;
  date: string;
}

export default function CertificateModal({ isOpen, onClose, courseName, studentName, date }: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:bg-white print:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col print:border-none print:shadow-none print:w-full print:h-full print:rounded-none"
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111111] print:hidden">
          <h2 className="font-bold text-white">Certificate of Completion</h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="btn-secondary py-1.5 px-3 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> Save / Print
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 print:p-0 bg-white" ref={certRef}>
          {/* Actual Certificate Design (B&W) */}
          <div className="border-[12px] border-black p-1">
            <div className="border-4 border-black p-12 md:p-20 text-center relative overflow-hidden bg-white">
              
              {/* Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Award className="w-96 h-96 text-black" />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto border-4 border-black flex items-center justify-center rounded-full mb-8">
                  <span className="font-black text-2xl text-black">T360</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-black tracking-widest uppercase mb-4 font-serif">
                  Certificate of Completion
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 uppercase tracking-widest font-medium">
                  This is to certify that
                </p>
                
                <div className="text-3xl md:text-4xl font-bold text-black border-b-2 border-black inline-block px-12 pb-2 mb-8 font-serif">
                  {studentName}
                </div>
                
                <p className="text-lg text-gray-600 mb-8 uppercase tracking-widest font-medium max-w-2xl mx-auto leading-relaxed">
                  has successfully completed the practical requirements and theoretical assessments for
                </p>
                
                <div className="text-2xl font-bold text-black mb-16 uppercase tracking-wider">
                  {courseName}
                </div>

                <div className="flex justify-between items-end max-w-2xl mx-auto mt-16 px-4">
                  <div className="text-center w-48">
                    <div className="border-b-2 border-black pb-2 mb-2 text-black font-bold font-serif">{date}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Date of Issue</div>
                  </div>
                  
                  <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center rotate-12">
                    <div className="text-center">
                      <div className="font-black text-xs uppercase text-black">Verified</div>
                      <div className="font-black text-xs text-black">TECHLAB 360</div>
                    </div>
                  </div>

                  <div className="text-center w-48">
                    <div className="border-b-2 border-black pb-2 mb-2">
                      {/* Fake signature */}
                      <span className="font-serif text-2xl italic text-black">TechLab 360</span>
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Authorized Signatory</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
