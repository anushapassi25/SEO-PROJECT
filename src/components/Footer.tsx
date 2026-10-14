import React from 'react';
import { ArrowUp, Terminal, Sparkles, Heart, Star, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topics = [
    { label: 'Algorithmic Culture', path: '/topic/Algorithmic Culture' },
    { label: 'Digital Linguistics', path: '/topic/Digital Linguistics' },
    { label: 'Meme Ecology', path: '/topic/Meme Ecology' },
    { label: 'Online Nostalgia', path: '/topic/Online Nostalgia' },
    { label: 'Social Anthropology', path: '/topic/Social Anthropology' },
    { label: 'Subcultures & Aesthetics', path: '/topic/Subcultures & Aesthetics' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-slate-200 border-t-4 border-[#ff1493] text-sm relative overflow-hidden">
      {/* Top Graphic Tape */}
      <div className="bg-[#ccff00] text-black font-pixel text-[11px] font-black py-1.5 px-4 flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-4">
          <span>★ CHRONICALLY ONLINE MAGAZINE ★</span>
          <span className="hidden sm:inline">ISSUE 04.2026</span>
          <span className="hidden md:inline">PEER-REVIEWED INTERNET LORE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>VISITOR_NO: 00482918</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff1493] to-[#0055ff] border-2 border-white shadow-[2px_2px_0px_#fff] flex items-center justify-center text-white font-black text-sm">
                co
              </div>
              <span className="text-2xl font-black text-white font-display tracking-tight">
                chronically online
              </span>
            </div>
            <p className="text-xs font-mono text-[#ccff00] font-black tracking-wider">
              "too online to explain."
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-mono">
              An independent student editorial magazine interrogating the weird, fast-decaying, hyper-referential reality of internet culture, memes, viral slang, and online psychology.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 bg-[#ff1493] text-white rounded font-pixel text-[10px] font-bold border border-white">
                ★ EST. 2026
              </span>
              <span>·</span>
              <span className="px-2.5 py-0.5 bg-[#0055ff] text-white rounded font-pixel text-[10px] font-bold border border-white">
                GEN Z ARCHIVE
              </span>
              <span>·</span>
              <span className="px-2.5 py-0.5 bg-[#ccff00] text-black rounded font-pixel text-[10px] font-bold border border-black">
                NETSCAPE COMPATIBLE
              </span>
            </div>
          </div>

          {/* Column 2: Department Topics */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <h4 className="text-xs font-pixel uppercase tracking-wider text-[#ccff00] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RESEARCH DEPARTMENTS</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {topics.map((t) => (
                <li key={t.label}>
                  <button
                    onClick={() => onNavigate(t.path)}
                    className="hover:text-[#ff1493] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span className="text-[#0055ff]">►</span>
                    <span>{t.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Publication & Contact */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs font-pixel uppercase tracking-wider text-[#ff1493] font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>TRANSMISSIONS</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#ccff00] transition-colors text-left"
                >
                  About the Collective
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#ccff00] transition-colors text-left"
                >
                  Editorial Inquiries & Pitches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about#ethics')}
                  className="hover:text-[#ccff00] transition-colors text-left"
                >
                  Ethical Guidelines & Sourcing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about#glossary')}
                  className="hover:text-[#ccff00] transition-colors text-left"
                >
                  Internet Slang Lexicon
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="y2k-btn px-4 py-2 bg-white hover:bg-[#ccff00] text-black text-xs font-pixel font-bold shadow-[2px_2px_0px_#ff1493]"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#ff1493]" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Editorial Note */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 chronically online Magazine. All original editorial rights reserved.
          </div>
          <div className="flex items-center gap-2 text-white font-bold font-pixel text-[10px]">
            <span>MADE FOR SCREENS // TOUCH GRASS RESPONSIBLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
