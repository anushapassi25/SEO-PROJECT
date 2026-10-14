import React from 'react';
import { Search, Bookmark, Menu, X, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'All Stories', path: '/', badge: 'NEW' },
    { label: 'Trends', path: '/topic/Algorithmic Culture', badge: 'HOT' },
    { label: 'Linguistics', path: '/topic/Digital Linguistics' },
    { label: 'Nostalgia', path: '/topic/Online Nostalgia', badge: 'Y2K' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fff5fa]/95 backdrop-blur-md border-b-2 border-black shadow-[0_3px_0px_#0a0a0a]">
      {/* Retro Mini OS Bar on Top */}
      <div className="bg-gradient-to-r from-[#ff1493] via-[#a855f7] to-[#0055ff] text-white text-[10px] font-mono py-1 px-4 flex items-center justify-between font-bold border-b border-black">
        <div className="flex items-center gap-2">
          <span className="animate-spin text-xs">★</span>
          <span>CHRONICALLY_ONLINE_OS // BUILD.2026.04</span>
          <span className="hidden sm:inline bg-black/30 px-1.5 py-0.2 rounded text-[9px]">DIAL-UP: CONNECTED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#ccff00] text-black px-1.5 py-0.2 rounded font-pixel text-[9px] font-bold">
            100% ORGANIC LORE
          </span>
          <span className="hidden md:inline">TOO ONLINE TO EXPLAIN</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Y2K Scrapbook Character */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff1493] to-[#0055ff] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-white font-black text-sm group-hover:rotate-6 transition-transform">
              co
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-display group-hover:text-[#ff1493] transition-colors whitespace-nowrap">
                  chronically online
                </span>
                <span className="text-[10px] font-pixel font-bold bg-[#ff1493] text-white px-1.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000] -rotate-3 hidden sm:inline-block">
                  MAGAZINE
                </span>
              </div>
              <span className="text-[10px] tracking-wider font-mono text-purple-900 font-bold hidden sm:block">
                too online to explain.
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links with Y2K Badge Motifs */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-bold text-slate-900 font-mono">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`transition-all whitespace-nowrap py-1 px-2.5 rounded-md flex items-center gap-1.5 relative ${
                  isActive
                    ? 'bg-[#0055ff] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-slate-900 hover:text-[#ff1493] hover:bg-pink-100/70'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && !isActive && (
                  <span className={`text-[9px] font-pixel px-1 py-0.2 rounded border border-black font-bold ${
                    link.badge === 'HOT' ? 'bg-[#ff1493] text-white' : link.badge === 'Y2K' ? 'bg-[#ccff00] text-black' : 'bg-purple-200 text-purple-900'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Chunky Y2K Tactical Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 text-black bg-white hover:bg-[#fbcfe8] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer"
            title="Search articles (Ctrl+K)"
            aria-label="Search articles"
          >
            <Search className="w-4 h-4 text-[#ff1493]" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline px-1 py-0.2 text-[9px] bg-slate-100 border border-black rounded text-slate-700">⌘K</kbd>
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative p-2 bg-white hover:bg-[#e9d5ff] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black cursor-pointer"
            title="Saved reading list"
            aria-label="Saved reading list"
          >
            <Bookmark className="w-4 h-4 text-[#0055ff]" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-2 -right-2 px-1.5 py-0.2 bg-[#ff1493] text-white text-[9px] font-pixel font-bold rounded-full border border-black shadow-[1px_1px_0px_#000]">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('/#articles-archive')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-black uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#bbf400] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] whitespace-nowrap cursor-pointer font-mono"
          >
            ★ Read Archive
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-[#fff5fa] px-4 py-4 space-y-2.5 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`block px-3 py-2 rounded-lg text-sm font-bold font-mono border-2 border-black ${
                currentPath === link.path
                  ? 'bg-[#0055ff] text-white shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-slate-900 hover:bg-pink-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('/#articles-archive');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-[#ccff00] rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] font-mono"
            >
              ★ Read Archive
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
