/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('co_bookmarks');
      return saved ? JSON.parse(saved) : ['why-do-internet-trends-die-so-quickly'];
    } catch {
      return ['why-do-internet-trends-die-so-quickly'];
    }
  });

  // Keep URL in sync with popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync bookmarks to localStorage
  const handleToggleBookmark = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedSlugs((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((s) => s !== slug);
      } else {
        updated = [...prev, slug];
      }
      try {
        localStorage.setItem('co_bookmarks', JSON.stringify(updated));
      } catch (err) {
        // ignore
      }
      return updated;
    });
  };

  // Navigate function with HTML5 pushState
  const navigateTo = (path: string) => {
    // If it's a hash anchor on the same page
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current view
  let pageContent: React.ReactNode;

  if (currentPath === '/' || currentPath === '') {
    // Homepage SEO
    document.title = 'chronically online — too online to explain | Internet Culture & Trends';
    pageContent = (
      <HomePage
        articles={ARTICLES}
        onNavigate={navigateTo}
        bookmarkedSlugs={bookmarkedSlugs}
        onToggleBookmark={handleToggleBookmark}
      />
    );
  } else if (currentPath.startsWith('/article/')) {
    const slug = currentPath.replace('/article/', '').split('?')[0].split('#')[0];
    const article = ARTICLES.find((a) => a.slug === slug);

    if (article) {
      pageContent = (
        <ArticlePage
          article={article}
          allArticles={ARTICLES}
          onNavigate={navigateTo}
          isBookmarked={bookmarkedSlugs.includes(article.slug)}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    } else {
      pageContent = (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#faf5ff] bg-y2k-pink-grid">
          <div className="max-w-md w-full bg-white border-2 border-black rounded-3xl p-8 y2k-box-shadow space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#ffe4e6] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-8 h-8 text-[#ff1493]" />
            </div>
            <h2 className="text-2xl font-black text-black font-display">404 // Lost in the Feed</h2>
            <p className="text-xs sm:text-sm text-slate-700 font-mono font-medium">
              This transmission has evaporated into the digital slipstream or been purged by the recommendation algorithm.
            </p>
            <button
              onClick={() => navigateTo('/')}
              className="y2k-btn w-full py-3 bg-[#ff1493] text-white text-xs font-pixel font-bold shadow-[3px_3px_0px_#000]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>◄ Return to Magazine Index</span>
            </button>
          </div>
        </div>
      );
    }
  } else if (currentPath.startsWith('/topic/')) {
    const topic = decodeURIComponent(currentPath.replace('/topic/', ''));
    pageContent = (
      <HomePage
        articles={ARTICLES}
        onNavigate={navigateTo}
        bookmarkedSlugs={bookmarkedSlugs}
        onToggleBookmark={handleToggleBookmark}
        activeTopicFilter={topic}
      />
    );
  } else if (currentPath === '/about') {
    document.title = 'About the Collective — chronically online';
    pageContent = <AboutPage onNavigate={navigateTo} />;
  } else if (currentPath === '/contact') {
    document.title = 'Pitch & Contact — chronically online';
    pageContent = <ContactPage onNavigate={navigateTo} />;
  } else {
    pageContent = (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#faf5ff] bg-y2k-pink-grid">
        <div className="max-w-md w-full bg-white border-2 border-black rounded-3xl p-8 y2k-box-shadow space-y-4">
          <h2 className="text-3xl font-black text-black font-display">404 // Lost in the Feed</h2>
          <p className="text-xs sm:text-sm text-slate-700 font-mono font-medium">
            The transmission address you requested is not currently active.
          </p>
          <button
            onClick={() => navigateTo('/')}
            className="y2k-btn w-full py-3 bg-[#0055ff] text-white text-xs font-pixel font-bold shadow-[3px_3px_0px_#000]"
          >
            <span>◄ Return to Magazine Index</span>
          </button>
        </div>
      </div>
    );
  }

  // Bookmarked articles list
  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedSlugs.includes(a.slug));

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-900 flex flex-col selection:bg-[#ff1493] selection:text-white">
      {/* Top Bar Contract Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        bookmarkCount={bookmarkedSlugs.length}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {pageContent}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
        onRemoveBookmark={(slug) => handleToggleBookmark(slug)}
      />
    </div>
  );
}
