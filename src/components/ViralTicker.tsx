import React from 'react';
import { Flame, Sparkles, Zap, Star } from 'lucide-react';

export const ViralTicker: React.FC = () => {
  const tickerItems = [
    { tag: 'MEME VELOCITY', text: 'TikTok recommendation shift contracts meme half-life to 36 hours' },
    { tag: 'BRAINROT ALERT', text: '"Skibidi" lexicography enters academic sociolinguistic journals' },
    { tag: 'Y2K REVIVAL', text: '2004 CCD digital cameras surge in secondhand vintage gear shops' },
    { tag: 'STAN OBSESSION', text: 'Parasocial attachments to anime anti-heroes hit all-time high' },
    { tag: 'DOPAMINE TRAP', text: 'Bedtime doomscrolling average reaches 52 minutes nightly' },
    { tag: 'WEIRDCORE', text: 'Liminal space aesthetics gain 120M+ social impressions' },
    { tag: 'SLANG EVOLUTION', text: 'Punctuation in text messages officially decoded as emotional tone' }
  ];

  return (
    <div className="bg-[#ff1493] text-white border-b-2 border-black py-2 px-2 overflow-hidden relative shadow-[0_2px_0px_#000]">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Ticker Badge with Acid-Lime & Black Retro Style */}
        <div className="flex items-center gap-1 px-3 py-1 bg-[#ccff00] text-black font-pixel text-[11px] font-black shrink-0 rounded border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1">
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>VIRAL WIRE</span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-6 text-white font-mono text-xs font-bold">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 shrink-0">
              <span className="text-[#ccff00] text-sm">★</span>
              <span className="px-1.5 py-0.2 bg-black text-[#ccff00] rounded text-[10px] font-pixel border border-black">
                {item.tag}
              </span>
              <span className="hover:text-[#ccff00] transition-colors cursor-default drop-shadow-xs">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Retro Badge Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-pixel text-black bg-white px-2.5 py-1 rounded border-2 border-black shadow-[2px_2px_0px_#000] shrink-0 font-bold rotate-1">
          <span className="animate-pulse">●</span>
          <span>LIVE FEEDS</span>
        </div>
      </div>
    </div>
  );
};
