import React from 'react';
import { ArrowLeft, BookOpen, Terminal, Sparkles, CheckCircle2, ShieldCheck, HelpCircle, Star, Zap } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-900 py-12 bg-y2k-pink-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation back */}
        <button
          onClick={() => onNavigate('/')}
          className="y2k-btn px-4 py-2 bg-white hover:bg-[#ccff00] text-black text-xs font-pixel mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>◄ Back to Magazine</span>
        </button>

        {/* Header */}
        <header className="pb-8 border-b-2 border-black space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker sticker-pink">
              ★ EDITORIAL MASTHEAD
            </span>
            <span className="sticker sticker-lime">
              DIGITAL ANTHROPOLOGY
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight drop-shadow-xs">
            About "chronically online"
          </h1>
          <p className="text-lg text-purple-900 font-mono font-bold">
            Tagline: <span className="bg-[#ccff00] text-black px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">"too online to explain."</span>
          </p>
        </header>

        {/* Narrative & Manifesto */}
        <div className="py-10 space-y-10 text-slate-800 leading-relaxed text-sm sm:text-base">
          <section className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border-2 border-black y2k-box-shadow">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#ff1493] fill-[#ff1493]" />
              <span>The Mission: Why We Build for the Digital Slipstream</span>
            </h2>
            <p className="font-medium">
              <em>chronically online</em> was founded in 2026 as an independent, student-led digital publication dedicated to treating internet culture, memes, viral slang, and online behaviors with the critical seriousness, sociological depth, and visual artistry they deserve.
            </p>
            <p className="font-medium">
              For decades, mainstream legacy media treated online trends as frivolous novelties—dismissing viral videos as "silly cat dances" and youth vernacular as "lazy texting." Today, however, internet culture <em>is</em> culture. Viral soundbites shape global music charts; TikTok algorithms dictate billion-dollar fashion supply chains; and online communities mobilize political movements in real time.
            </p>
          </section>

          {/* Core Editorial Principles */}
          <section id="ethics" className="p-6 sm:p-8 rounded-3xl bg-[#ffe4e6] border-2 border-black space-y-6 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center gap-2 text-black font-black text-xl font-display">
              <ShieldCheck className="w-6 h-6 text-[#0055ff]" />
              <h3>Our Editorial Standards & Code of Ethics</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2 bg-white p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <strong className="text-black block font-pixel text-xs">1. ZERO FABRICATED CLAIMS</strong>
                <p className="text-slate-700 font-mono">
                  We never invent statistics or present casual social theories as verified empirical facts. We distinguish clearly between sociological analysis and cultural commentary.
                </p>
              </div>
              <div className="space-y-2 bg-white p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <strong className="text-black block font-pixel text-xs">2. CULTURAL LINEAGE & CREDIT</strong>
                <p className="text-slate-700 font-mono">
                  We actively trace vernacular back to its roots—acknowledging African American Vernacular English (AAVE), LGBTQ+ ballroom dialect, and underground forums before viral dilution.
                </p>
              </div>
              <div className="space-y-2 bg-white p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <strong className="text-black block font-pixel text-xs">3. ANTI-CORP ASTROTURFING</strong>
                <p className="text-slate-700 font-mono">
                  We do not publish sponsored brand "trend reports" or pay-for-play PR placement. If a meme is manufactured corporate cringe, we call it out.
                </p>
              </div>
              <div className="space-y-2 bg-white p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <strong className="text-black block font-pixel text-xs">4. HUMAN WRITING ONLY</strong>
                <p className="text-slate-700 font-mono">
                  Every essay is written, researched, and structured with distinct human perspective, authentic humor, and accessible reading cadences.
                </p>
              </div>
            </div>
          </section>

          {/* Student Editorial Board */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
              Editorial Collective & Contributors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border-2 border-black space-y-2 shadow-[4px_4px_0px_#ff1493] rotate-[-1deg]">
                <div className="w-12 h-12 rounded-full bg-[#ff1493] border-2 border-black flex items-center justify-center font-black text-sm text-white font-mono">
                  KV
                </div>
                <h4 className="text-base font-black text-black font-display">Kai Vance</h4>
                <div className="text-xs font-pixel text-[#ff1493] font-bold">CULTURE EDITOR</div>
                <p className="text-xs text-slate-700 font-mono">
                  Focusing on algorithmic velocity, recommendation systems, and digital anthropology.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-black space-y-2 shadow-[4px_4px_0px_#7c3aed] rotate-[1deg]">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] border-2 border-black flex items-center justify-center font-black text-sm text-white font-mono">
                  MC
                </div>
                <h4 className="text-base font-black text-black font-display">Maya Chen</h4>
                <div className="text-xs font-pixel text-purple-700 font-bold">SOCIOLINGUISTICS FELLOW</div>
                <p className="text-xs text-slate-700 font-mono">
                  Investigating internet dialects, brain rot syntax, and the evolution of spoken text.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-black space-y-2 shadow-[4px_4px_0px_#0055ff] rotate-[-1deg]">
                <div className="w-12 h-12 rounded-full bg-[#0055ff] border-2 border-black flex items-center justify-center font-black text-sm text-white font-mono">
                  ER
                </div>
                <h4 className="text-base font-black text-black font-display">Elena Rostova</h4>
                <div className="text-xs font-pixel text-[#0055ff] font-bold">ARCHIVE & AESTHETICS</div>
                <p className="text-xs text-slate-700 font-mono">
                  Archiving Y2K webcore, retro tech anemoia, and internet subcultures.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Slang Glossary */}
          <section id="glossary" className="space-y-4 pt-6 border-t-2 border-black">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display">
              Internet Slang Quick Glossary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <strong className="text-[#ff1493] block text-sm font-pixel font-bold">Chronically Online</strong>
                <span className="text-slate-700 mt-1 block font-medium">Someone whose reality and vocabulary are entirely mediated by social feeds.</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <strong className="text-[#0055ff] block text-sm font-pixel font-bold">Brain Rot</strong>
                <span className="text-slate-700 mt-1 block font-medium">Surreal, hyper-referential slang emerging from live streams and short-form algorithms.</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <strong className="text-black block text-sm font-pixel font-bold">Doomscrolling</strong>
                <span className="text-slate-700 mt-1 block font-medium">The compulsive habit of continuing to scroll through distressing news feeds.</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <strong className="text-purple-700 block text-sm font-pixel font-bold">Anemoia</strong>
                <span className="text-slate-700 mt-1 block font-medium">A profound nostalgic longing for a historical period one has never personally experienced.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
