import React, { useState } from 'react';
import { Article } from '../types';
import { Bookmark, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onNavigate: (slug: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (slug: string, e: React.MouseEvent) => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onNavigate,
  isBookmarked = false,
  onToggleBookmark,
  variant = 'standard',
}) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(`/article/${article.slug}`);
  };

  // Give cards varied color personalities based on category
  const getThemeByCat = (cat: string) => {
    if (cat.includes('Linguistics') || cat.includes('Slang')) {
      return {
        tagBg: 'bg-[#ff1493] text-white',
        accentBorder: 'hover:border-[#ff1493]',
        headerBg: 'bg-gradient-to-r from-pink-400 to-rose-400 text-black',
        shadowColor: 'hover:shadow-[6px_6px_0px_#ff1493]',
        badge: '★ VIRAL SLANG'
      };
    }
    if (cat.includes('Nostalgia') || cat.includes('Aesthetics')) {
      return {
        tagBg: 'bg-[#a855f7] text-white',
        accentBorder: 'hover:border-[#a855f7]',
        headerBg: 'bg-gradient-to-r from-purple-300 to-indigo-300 text-black',
        shadowColor: 'hover:shadow-[6px_6px_0px_#a855f7]',
        badge: '⚡ Y2K CORE'
      };
    }
    if (cat.includes('Meme') || cat.includes('Culture')) {
      return {
        tagBg: 'bg-[#0055ff] text-white',
        accentBorder: 'hover:border-[#0055ff]',
        headerBg: 'bg-gradient-to-r from-blue-400 to-cyan-300 text-black',
        shadowColor: 'hover:shadow-[6px_6px_0px_#0055ff]',
        badge: '✦ PEAK LORE'
      };
    }
    return {
      tagBg: 'bg-[#ccff00] text-black',
      accentBorder: 'hover:border-[#84cc16]',
      headerBg: 'bg-gradient-to-r from-lime-300 to-emerald-300 text-black',
      shadowColor: 'hover:shadow-[6px_6px_0px_#65a30d]',
      badge: '★ HOT DISPATCH'
    };
  };

  const theme = getThemeByCat(article.category);

  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className="group flex gap-4 p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#ff1493] transition-all cursor-pointer"
      >
        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-black relative border-2 border-black">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#ff1493] text-[10px] font-pixel text-white p-1 text-center font-bold">
              CO//LOG
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <span className={`px-1.5 py-0.2 rounded border border-black text-[10px] font-bold ${theme.tagBg}`}>
                {article.category}
              </span>
              <span className="text-black font-bold">·</span>
              <span className="text-slate-600 font-bold text-[11px]">{article.readTime}</span>
            </div>
            <h4 className="text-sm font-black text-black group-hover:text-[#ff1493] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </div>
          <span className="text-[11px] text-[#0055ff] font-mono font-bold flex items-center gap-1 mt-1 group-hover:underline">
            Read story <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={handleClick}
      className={`group relative flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] ${theme.shadowColor} hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex-1 justify-between`}
    >
      {/* Retro OS Window Top Header Motif */}
      <div className={`h-7 px-3 flex items-center justify-between text-[10px] font-mono border-b-2 border-black ${theme.headerBg}`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black inline-block" />
        </div>
        <span className="truncate max-w-[170px] text-[10px] font-pixel font-bold uppercase tracking-wider text-black">
          {article.category.toLowerCase().replace(/\s+/g, '_')}.log
        </span>
        <span className="font-pixel text-[9px] font-bold bg-white/70 px-1 py-0.2 rounded border border-black">
          2026
        </span>
      </div>

      {/* Visual Anchor Frame */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900 border-b-2 border-black">
        {!imgError ? (
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 p-6 text-center">
            <span className="text-xs font-pixel text-[#ff1493] font-bold">chronically online</span>
            <span className="text-sm font-black text-black mt-1">{article.title}</span>
          </div>
        )}

        {/* Quick action bookmark button */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {onToggleBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.slug, e);
              }}
              className={`p-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-colors ${
                isBookmarked
                  ? 'bg-[#ff1493] text-white'
                  : 'bg-white hover:bg-[#ffb6c1] text-black'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save story'}
              aria-label="Bookmark article"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category sticker badge on the image */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className={`sticker text-[10px] font-pixel py-0.5 px-2 ${theme.tagBg} rotate-[-1deg]`}>
            {theme.badge}
          </span>
        </div>
      </div>

      {/* Card Body with High Contrast & Readability */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono mb-2 text-slate-700 font-bold">
            <span className="text-[#0055ff] font-pixel">{article.category}</span>
            <span className="text-black">·</span>
            <span>{article.publishedAt}</span>
            <span className="text-black">·</span>
            <span className="flex items-center gap-1 text-[#ff1493]">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-lg lg:text-xl font-black text-black group-hover:text-[#ff1493] transition-colors leading-snug line-clamp-2 font-display">
            {article.title}
          </h3>

          <p className="mt-2.5 text-sm text-slate-700 line-clamp-3 leading-relaxed font-medium">
            {article.deck}
          </p>
        </div>

        {/* Card Footer: Author + Read Action */}
        <div className="mt-5 pt-3.5 border-t-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0055ff] border border-black flex items-center justify-center text-[10px] font-black text-white font-mono">
              {article.author.avatar}
            </div>
            <span className="text-xs text-black font-bold font-mono">{article.author.name}</span>
          </div>

          <span className="text-xs font-mono text-black font-black flex items-center gap-1 bg-[#ccff00] px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000] group-hover:bg-[#ff1493] group-hover:text-white transition-colors">
            Read story
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
