import React from 'react';
import { Article } from '../types';
import { Bookmark, X, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (slug: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_#0a0a0a] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Header */}
        <div className="y2k-window-header px-4 py-2 flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black inline-block" />
            </div>
            <span className="font-pixel text-[11px] text-white">OFFLINE_READING_STASH.LOG ({bookmarkedArticles.length})</span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-white text-black border border-black rounded flex items-center justify-center font-bold hover:bg-[#ff1493] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-3 flex-1 bg-[#faf5ff]">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Bookmark className="w-12 h-12 text-[#ff1493] mx-auto mb-3" />
              <p className="text-base text-black font-pixel font-bold">STASH IS CURRENTLY EMPTY</p>
              <p className="text-xs text-slate-700 mt-1 font-mono font-medium">
                Click the bookmark button on any article to store it for offline late-night rabbit holes.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.slug}
                className="p-3.5 rounded-xl bg-white border-2 border-black hover:border-[#ff1493] flex items-start justify-between gap-3 group transition-all shadow-[3px_3px_0px_#000]"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-pixel text-[#0055ff] font-bold block mb-1">{art.category}</span>
                  <h4 className="text-sm font-black text-black group-hover:text-[#ff1493] transition-colors leading-snug">
                    {art.title}
                  </h4>
                  <span className="text-xs text-slate-600 font-mono mt-1 block font-bold">{art.readTime}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 pt-1">
                  <button
                    onClick={() => onRemoveBookmark(art.slug)}
                    className="p-2 text-slate-600 hover:text-white hover:bg-rose-600 rounded-lg border border-black shadow-[1px_1px_0px_#000] transition-colors"
                    title="Remove from reading list"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-[#e2e8f0] border-t-2 border-black text-center text-xs font-mono font-bold text-slate-800">
          SAVED LOCALLY IN LOCALSTORAGE CACHE
        </div>
      </div>
    </div>
  );
};
