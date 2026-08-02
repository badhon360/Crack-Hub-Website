import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu, Heart, Globe } from 'lucide-react';
export default function Footer() {

  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-white/10 text-slate-400 font-sans mt-12 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00ff41] p-0.5 shadow-md shadow-[#00ff41]/20 flex-shrink-0">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#00ff41]" />
                </div>
              </div>

              <span className="font-orbitron font-bold text-lg text-white tracking-wider">
                BADHON'S <span className="text-[#00ff41]">CRACK HUB</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              Android Apps & Games distribution portal. Clean, accessible APK downloads.
            </p>
          </div>

          {/* Legal / Disclaimer */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-[#00ff41] uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5" />
              <span>LEGAL DISCLAIMER</span>
            </h4>
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
              Badhon's Crack Hub is an educational showcase repository. Respect original game developers and software creators.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
