import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowRight, Clock, Sparkles, Globe, Terminal, Zap, Star } from 'lucide-react';

interface HeroBannerProps {
  featuredArticle: Article;
  onNavigate: (path: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ featuredArticle, onNavigate }) => {
  const [imgSrc, setImgSrc] = useState<string>(featuredArticle.heroImage || featuredArticle.fallbackImage || '');
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  React.useEffect(() => {
    setImgSrc(featuredArticle.heroImage || featuredArticle.fallbackImage || '');
    setHasFailed(false);
  }, [featuredArticle.heroImage, featuredArticle.fallbackImage]);

  const handleImgError = () => {
    if (featuredArticle.fallbackImage && imgSrc !== featuredArticle.fallbackImage) {
      setImgSrc(featuredArticle.fallbackImage);
    } else {
      setHasFailed(true);
    }
  };

  const handleReadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (featuredArticle.openInNewTab) {
      window.open(`/article/${featuredArticle.slug}`, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(`/article/${featuredArticle.slug}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf2f8] via-[#f5f3ff] to-[#eff6ff] border-b-2 border-black pt-8 pb-14 lg:pt-12 lg:pb-16 bg-y2k-pink-grid">
      {/* Decorative Y2K Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Playful Top Scrapbook Sticker Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker sticker-pink -rotate-2">
              ★ ISSUE #04: HYPER-SPEED DIGITAL LORE
            </span>
            <span className="sticker sticker-lime rotate-1 hidden sm:inline-flex">
              ⚡ 100% UNFILTERED CULTURE
            </span>
            <span className="sticker sticker-chrome -rotate-1 hidden md:inline-flex">
              ✦ CHROME EDITION
            </span>
          </div>

          <div className="flex items-center gap-2 font-pixel text-xs text-black bg-[#ffdf00] px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_#000] rotate-1">
            <Star className="w-3.5 h-3.5 fill-black" />
            <span>GEN-Z DIGITAL ARCHIVE</span>
          </div>
        </div>

        {/* BOLD OVERSIZED EDITORIAL MASTHEAD */}
        <div className="text-center my-6 sm:my-10 relative">
          {/* Decorative Corner Stickers */}
          <div className="absolute -top-6 left-2 sm:left-10 z-20 -rotate-12 hidden sm:block">
            <span className="px-3 py-1 bg-[#ccff00] text-black font-pixel text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#000]">
              PEAK LORE!
            </span>
          </div>
          <div className="absolute -top-6 right-2 sm:right-10 z-20 rotate-12 hidden sm:block">
            <span className="px-3 py-1 bg-[#ff1493] text-white font-pixel text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#000]">
              HOT TAKES ONLY
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black font-display tracking-tightest leading-none drop-shadow-[4px_4px_0px_#0a0a0a]">
            <span className="chrome-text">chronically</span>
            <span className="text-[#ff1493] italic block sm:inline sm:ml-4">online</span>
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3 font-mono text-xs sm:text-sm font-bold text-slate-800">
            <span className="bg-white px-3 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
              [ too online to explain. ]
            </span>
            <span className="text-[#ff1493] font-black">★</span>
            <span className="hidden sm:inline text-purple-900 font-bold">
              DIGITAL ANTHROPOLOGY // MEMES // VIRAL BEHAVIOR
            </span>
          </div>
        </div>

        {/* 2-Column Featured Story Marquee (Digital Scrapbook Layout) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Editorial Feature Box */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border-2 border-black rounded-2xl p-6 sm:p-8 y2k-box-shadow relative">
            {/* Top Tape Sticker */}
            <div className="absolute -top-3 left-8 px-4 py-0.5 bg-[#ff1493] text-white font-pixel text-[10px] font-bold uppercase tracking-wider rounded border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1">
              ★ LEAD COVER STORY ★
            </div>

            <div>
              {/* Unboxed Metadata with Y2K Badge Accents */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4 pt-1">
                <span className="px-2 py-0.5 bg-[#0055ff] text-white font-bold rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                  {featuredArticle.category}
                </span>
                <span className="text-black font-bold">·</span>
                <span className="text-slate-700 font-bold">{featuredArticle.publishedAt}</span>
                <span className="text-black font-bold">·</span>
                <span className="flex items-center gap-1 text-[#ff1493] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-display tracking-tight leading-[1.15]">
                {featuredArticle.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {featuredArticle.deck}
              </p>

              {/* Scrapbook Sticky Note: Key Insight */}
              <div className="mt-6 p-4 rounded-xl bg-[#fffbeb] border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-0.5deg]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 bg-[#ff1493] rounded-full inline-block" />
                  <span className="text-xs font-pixel font-bold uppercase text-slate-900 tracking-wider">
                    LORE DISPATCH / CORE THESIS
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono">
                  {featuredArticle.keyTakeaways[0]}
                </p>
              </div>
            </div>

            {/* CTA and Author Lockup */}
            <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
              <a
                href={`/article/${featuredArticle.slug}`}
                onClick={handleReadClick}
                className="y2k-btn px-6 py-3.5 bg-[#ff1493] hover:bg-[#ff007f] text-white text-xs sm:text-sm uppercase tracking-wider font-pixel font-bold shadow-[4px_4px_0px_#000]"
              >
                <span>Read Cover Story</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-3 bg-purple-50 px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="w-8 h-8 rounded-full bg-[#0055ff] border-2 border-black flex items-center justify-center font-bold text-xs text-white">
                  {featuredArticle.author.avatar}
                </div>
                <div>
                  <div className="text-xs font-black text-black font-mono">{featuredArticle.author.name}</div>
                  <div className="text-[10px] text-purple-900 font-mono font-bold">{featuredArticle.author.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Retro Browser Window Media Frame */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="y2k-window rounded-2xl overflow-hidden cursor-pointer group flex-1 flex flex-col justify-between"
              onClick={handleReadClick}
            >
              {/* Retro OS Window Title Bar */}
              <div className="y2k-window-header px-3.5 py-2 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black inline-block" />
                  </div>
                  <span className="font-pixel text-[10px] text-white font-bold ml-1">
                    trend_hyperdrive.exe
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[9px] font-mono">
                  <Globe className="w-3 h-3 text-[#ccff00]" />
                  <span>net://chronicallyonline/c4</span>
                </div>
              </div>

              {/* Graphic Asset Container */}
              <div className="aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full overflow-hidden bg-black relative">
                {!hasFailed && imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={featuredArticle.imageAlt || featuredArticle.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-200 to-blue-200 text-center">
                    <span className="text-xl font-black text-black">chronically online</span>
                    <span className="text-sm font-bold text-slate-800 mt-2">Issue 04 Lead Visual</span>
                  </div>
                )}

                {/* Y2K Holographic Corner Sticker */}
                <div className="absolute top-3 right-3 z-10 rotate-3">
                  <span className="px-2.5 py-1 bg-[#ccff00] text-black font-pixel text-[10px] font-black border-2 border-black shadow-[2px_2px_0px_#000]">
                    ★ VIRAL ALERT
                  </span>
                </div>
              </div>

              {/* Retro Window Bottom Status Bar */}
              <div className="p-3 bg-[#e2e8f0] border-t-2 border-black flex items-center justify-between text-xs font-mono text-black font-bold">
                <span className="flex items-center gap-1.5 text-[#0055ff]">
                  <Terminal className="w-3.5 h-3.5 text-[#ff1493]" />
                  Fig. 01: Algorithmic Obsolescence
                </span>
                <span className="bg-[#ff1493] text-white px-2 py-0.5 rounded text-[10px] font-pixel border border-black shadow-[1px_1px_0px_#000]">
                  CLICK TO LAUNCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
