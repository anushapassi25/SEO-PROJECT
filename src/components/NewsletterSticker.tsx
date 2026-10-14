import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send, Star, Zap } from 'lucide-react';

export const NewsletterSticker: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#fce7f3] via-[#ede9fe] to-[#e0e7ff] border-b-2 border-black relative overflow-hidden bg-y2k-checker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-black y2k-box-shadow relative">
          {/* Y2K Fun Stickers with Neon / Metallic pop */}
          <div className="absolute -top-4 right-6 px-4 py-1.5 bg-[#ccff00] text-black text-xs font-pixel font-bold uppercase tracking-wider rounded-lg rotate-3 shadow-[3px_3px_0px_#000] border-2 border-black flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-black" />
            <span>★ 100% UNFILTERED LORE</span>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="sticker sticker-pink">
                WEEKLY SUNDAY DISPATCH
              </span>
              <span className="sticker sticker-blue hidden sm:inline-flex">
                DIAL-UP NEWSLETTER
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight font-display drop-shadow-xs">
              Get the Lore in Your Inbox Before It Dies on TikTok
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              Every Sunday morning: deep-dive anthropological breakdowns of emerging internet slang, subcultural aesthetics, meme mechanics, and online psychology. Zero corporate PR speak.
            </p>

            {submitted ? (
              <div className="mt-6 p-4 rounded-2xl bg-[#ccff00] border-2 border-black flex items-center gap-3 text-black shadow-[3px_3px_0px_#000]">
                <CheckCircle2 className="w-6 h-6 text-black shrink-0" />
                <div>
                  <span className="font-pixel text-xs font-bold block text-black">YOU'RE LOCKED INTO THE DISPATCH WIRE!</span>
                  <span className="text-xs text-slate-800 font-mono font-bold">First briefing drops Sunday at 09:00 AM sharp.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter.your.email@domain.com"
                  required
                  className="flex-1 px-4 py-3.5 rounded-xl bg-[#faf5ff] border-2 border-black text-black placeholder-slate-500 text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] font-mono font-bold"
                />
                <button
                  type="submit"
                  className="y2k-btn px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#ff1493] hover:bg-[#ff007f] shadow-[3px_3px_0px_#000] whitespace-nowrap cursor-pointer font-pixel"
                >
                  <span>★ Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-800">
              <span className="bg-[#fdf4ff] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">No spam ever</span>
              <span>·</span>
              <span className="bg-[#fdf4ff] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">1-click unsubscribe</span>
              <span>·</span>
              <span className="bg-[#0055ff] text-white px-2.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                42,000+ chronically online readers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
