import React, { useState } from 'react';
import { HOMEPAGE_AEO_FAQS } from '../data/articles';
import { ChevronDown, HelpCircle, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export const AeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#f3e8ff] via-[#fae8ff] to-[#fce7f3] border-y-2 border-black relative bg-y2k-dots">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Y2K Scrapbook Character */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="sticker sticker-pink rotate-[-1deg]">
              ★ DIGITAL LORE DOSSIER
            </span>
            <span className="sticker sticker-lime rotate-[2deg]">
              ⚡ AEO FAST ANSWERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-display drop-shadow-[2px_2px_0px_#fff]">
            Internet Culture Decoded
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-800 font-medium leading-relaxed font-mono">
            Direct, definitive answers to the questions defining modern digital existence. Formatted for human clarity and AI engine summaries.
          </p>
        </div>

        {/* Q&A Accordion Stack */}
        <div className="space-y-4">
          {HOMEPAGE_AEO_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 border-black transition-all duration-200 overflow-hidden bg-white ${
                  isOpen
                    ? 'shadow-[6px_6px_0px_#ff1493]'
                    : 'shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 bg-[#0055ff] text-white rounded text-[10px] font-pixel font-bold border border-black shadow-[1px_1px_0px_#000]">
                        QUERY_0{index + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#ff1493]">VERIFIED TOPIC</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-black leading-snug font-display">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-lg border-2 border-black transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#ccff00] text-black shadow-[1px_1px_0px_#000]' : 'bg-slate-100 text-black'}`}>
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t-2 border-black bg-[#fdf4ff]/40">
                    {/* Direct Concise Answer (AEO Snippet) in Acid-Lime Frame */}
                    <div className="p-4 rounded-xl bg-[#ccff00]/30 border-2 border-black text-black text-sm leading-relaxed mb-4 flex items-start gap-3 shadow-[2px_2px_0px_#000]">
                      <Zap className="w-5 h-5 text-black fill-black shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-black block mb-0.5 font-pixel text-xs uppercase tracking-wide">
                          DIRECT ANSWER // THE TL;DR:
                        </strong>
                        <span className="font-bold text-slate-900">{faq.shortAnswer}</span>
                      </div>
                    </div>

                    {/* Extended In-Depth Explanation */}
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono">
                      {faq.details}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
