import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import { Search, X, ArrowRight, Clock, Star, ExternalLink } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.deck.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.primaryKeyword.toLowerCase().includes(q) ||
          a.relatedKeywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 lg:p-20 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_#0a0a0a] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Header */}
        <div className="y2k-window-header px-4 py-2 flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black inline-block" />
            </div>
            <span className="font-pixel text-[11px] text-white">SEARCH_LORE_DATABASE.EXE</span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-white text-black border border-black rounded flex items-center justify-center font-bold hover:bg-[#ff1493] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-black flex items-center gap-3 bg-[#fdf2f8]">
          <Search className="w-5 h-5 text-[#ff1493] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, topic, slang, or keyword..."
            className="flex-1 bg-transparent text-black placeholder-slate-500 text-sm sm:text-base outline-none font-mono font-bold"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-black font-pixel px-2 py-1 bg-white border border-black rounded shadow-[1px_1px_0px_#000]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {query.trim() === '' && (
          <div className="p-5 bg-white">
            <span className="text-xs font-pixel uppercase tracking-wider text-slate-800 font-bold block mb-3">
              ★ POPULAR TOPICS & KEYWORDS:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Brain Rot', 'TikTok Trends', 'Nostalgia', 'Doomscrolling', 'Cancel Culture', 'Internet Aesthetics'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 text-xs font-mono font-bold bg-[#fdf4ff] border-2 border-black hover:bg-[#ff1493] hover:text-white text-black rounded-lg shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black">
              <span className="text-xs font-pixel text-slate-800 uppercase tracking-wider block mb-3 font-bold">
                ⚡ LATEST ARCHIVED ESSAYS:
              </span>
              <div className="space-y-2">
                {articles.slice(0, 3).map((art) => (
                  <button
                    key={art.slug}
                    onClick={() => {
                      if (art.openInNewTab) {
                        window.open(`/article/${art.slug}`, '_blank', 'noopener,noreferrer');
                      } else {
                        onSelectArticle(art.slug);
                      }
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-[#f8fafc] border border-black hover:bg-[#ccff00] flex items-center justify-between text-xs text-black group transition-colors shadow-[1.5px_1.5px_0px_#000]"
                  >
                    <span className="font-bold font-mono truncate pr-4">{art.title}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {art.openInNewTab && (
                        <span className="text-[9px] font-pixel text-[#ff1493] bg-pink-100 border border-pink-400 px-1 py-0.2 rounded flex items-center gap-0.5">
                          NEW TAB <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                      <span className="text-[#0055ff] font-pixel font-bold">{art.readTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() !== '' && (
          <div className="overflow-y-auto p-4 space-y-2 flex-1 bg-[#faf5ff]">
            <div className="text-xs font-pixel text-slate-800 px-2 mb-2 font-bold">
              FOUND {filtered.length} {filtered.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{query}"
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-600 font-mono font-bold text-sm">
                No articles found. Try terms like "memes", "slang", or "nostalgia".
              </div>
            ) : (
              filtered.map((art) => (
                <div
                  key={art.slug}
                  onClick={() => {
                    if (art.openInNewTab) {
                      window.open(`/article/${art.slug}`, '_blank', 'noopener,noreferrer');
                    } else {
                      onSelectArticle(art.slug);
                    }
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-white border-2 border-black hover:bg-[#fbcfe8] cursor-pointer transition-all flex items-start justify-between gap-4 group shadow-[2px_2px_0px_#000]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono mb-1 font-bold">
                      <span className="text-[#0055ff]">{art.category}</span>
                      <span className="text-black">·</span>
                      <span className="text-slate-600">{art.readTime}</span>
                      {art.openInNewTab && (
                        <span className="text-[9px] font-pixel text-black bg-[#ccff00] border border-black px-1 rounded flex items-center gap-0.5">
                          NEW TAB <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-black text-black group-hover:text-[#ff1493] transition-colors leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-700 line-clamp-1 mt-1 font-medium">{art.deck}</p>
                  </div>
                  {art.openInNewTab ? (
                    <ExternalLink className="w-4 h-4 text-[#ff1493] group-hover:scale-110 transition-all shrink-0 mt-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Footer Keybinds */}
        <div className="p-3 bg-[#e2e8f0] border-t-2 border-black flex items-center justify-between text-[11px] font-mono font-bold text-slate-800">
          <span>CO//INDEX READY</span>
          <span>PRESS ESC TO EXIT</span>
        </div>
      </div>
    </div>
  );
};
