"use client";

import Link from "next/link";
import { FlaskConical, Globe, Share2, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Platform: ["Virtual Labs", "AI Tutor", "Notes Library", "Progress Tracking"],
    Labs: ["Automobile Lab", "Electronics Lab", "Civil Engineering", "Physics Lab", "Chemistry Lab"],
    Company: ["About Us", "Blog", "Careers", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer id="about" className="border-t border-white/10 pt-16 pb-8 relative bg-[#000000]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold text-white">
                TechLab <span className="text-zinc-500">360</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">
              The world-class virtual laboratory platform for engineering and technology students.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            © {year} TechLab 360. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm text-zinc-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
