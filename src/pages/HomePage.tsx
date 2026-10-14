import React, { useState } from 'react';
import { Article } from '../types';
import { HeroBanner } from '../components/HeroBanner';
import { ViralTicker } from '../components/ViralTicker';
import { ArticleCard } from '../components/ArticleCard';
import { AeoFaqSection } from '../components/AeoFaqSection';
import { NewsletterSticker } from '../components/NewsletterSticker';
import { TOPICS } from '../data/articles';
import { TrendingUp, Layers, ArrowRight, Sparkles, Star, Zap, ExternalLink } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
  bookmarkedSlugs: string[];
  onToggleBookmark: (slug: string, e: React.MouseEvent) => void;
  activeTopicFilter?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onNavigate,
  bookmarkedSlugs,
  onToggleBookmark,
  activeTopicFilter,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(activeTopicFilter || 'All Lore');

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const secondaryFeatures = articles.filter((a) => a.slug !== featuredArticle.slug).slice(0, 3);

  // Filter articles based on topic
  const filteredArticles = selectedTopic === 'All Lore'
    ? articles
    : articles.filter((a) => a.category === selectedTopic);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf5ff]">
      {/* 1. Live Lore News Ticker (Hot Pink & Acid Lime) */}
      <ViralTicker />

      {/* 2. Editorial Cover Hero Banner with Bold Masthead & Retro Browser Window */}
      <HeroBanner featuredArticle={featuredArticle} onNavigate={onNavigate} />

      {/* 3. Alternating Section: Trending Dispatch Grid (Bubblegum Pink & Lavender Backing) */}
      <section className="py-14 border-b-2 border-black bg-[#ffe4e6] bg-y2k-stripes relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ff1493] rounded-full border border-black animate-ping" />
              <TrendingUp className="w-5 h-5 text-black" />
              <h2 className="text-base sm:text-lg font-pixel uppercase tracking-wider text-black font-black">
                ★ TRENDING DIGITAL DISPATCHES ★
              </h2>
              <span className="sticker sticker-lime rotate-1 hidden sm:inline-flex">
                HOT VELOCITY
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-purple-900 bg-white/80 px-2.5 py-1 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
              RANKED BY ALGORITHMIC VELOCITY
            </span>
          </div>

          {/* Quick Tab Launcher Ribbon for the 3 distinct articles */}
          <div className="mb-8 p-3.5 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black animate-pulse" />
              <span className="font-pixel text-xs text-black font-bold">
                MULTI-TAB ESSAYS:
              </span>
              <span className="text-[11px] font-mono text-slate-700">
                Click any dispatch card below or these direct tab links to open each in a different separate tab:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/article/what-is-brain-rot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-mono font-black rounded border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1 transition-transform hover:-translate-y-0.5"
                title="Open 'What is Brain Rot' in a new separate tab"
              >
                <span>1. Brain Rot ↗</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/article/how-memes-go-viral"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#00f0ff] hover:bg-[#00d8e6] text-black text-xs font-mono font-black rounded border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1 transition-transform hover:-translate-y-0.5"
                title="Open 'How Does a Meme Go Viral' in a new separate tab"
              >
                <span>2. Viral Memes ↗</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/article/why-is-everyone-obsessed-with-nostalgia-on-the-internet"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#ffd700] hover:bg-[#e6c200] text-black text-xs font-mono font-black rounded border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1 transition-transform hover:-translate-y-0.5"
                title="Open 'Why Is Everyone Obsessed With Nostalgia on the Internet?' in a new separate tab"
              >
                <span>3. Internet Nostalgia ↗</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryFeatures.map((art) => (
              <ArticleCard
                key={art.slug}
                article={art}
                onNavigate={(slug) => onNavigate(slug)}
                isBookmarked={bookmarkedSlugs.includes(art.slug)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Alternating Section: Complete Archive with Chunky Filter Buttons (Icy Cyber Grid Backing) */}
      <section id="articles-archive" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-black">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="sticker sticker-blue">
                ISSUE 04 ARCHIVES
              </span>
              <span className="sticker sticker-pink hidden sm:inline-flex">
                10 LONG-FORM ESSAYS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black font-display tracking-tight drop-shadow-xs">
              All Cultural Analyses
            </h2>
          </div>

          {/* Functional Y2K Tactile Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none p-2 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
            {TOPICS.slice(0, 6).map((topic) => {
              const isActive = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 text-xs font-pixel font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer border-2 ${
                    isActive
                      ? 'bg-[#ff1493] text-white border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-slate-50 text-black border-transparent hover:border-black hover:bg-[#ccff00]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid with Varied Visual Personalities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              onNavigate={(slug) => onNavigate(slug)}
              isBookmarked={bookmarkedSlugs.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-black p-8 y2k-box-shadow">
            <p className="text-black font-pixel font-bold text-sm">NO ESSAYS FOUND IN THIS SUBCATEGORY</p>
            <button
              onClick={() => setSelectedTopic('All Lore')}
              className="y2k-btn mt-4 px-4 py-2 bg-[#ff1493] text-white text-xs font-pixel font-bold"
            >
              ★ Reset to All Lore
            </button>
          </div>
        )}
      </section>

      {/* 5. Alternating Section: AEO FAQ Section (Lavender / Pink with Acid-Lime Badges) */}
      <AeoFaqSection />

      {/* 6. Alternating Section: Editorial Manifesto (Icy Blue / Lavender Grid Backing) */}
      <section className="py-16 bg-gradient-to-b from-[#e0e7ff] via-[#ede9fe] to-[#fce7f3] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="sticker sticker-pink rotate-[-1deg]">
                ★ EDITORIAL MANIFESTO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-black font-display leading-tight drop-shadow-xs">
                Why "chronically online"? Because the digital stream is our collective psyche.
              </h2>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                We believe internet culture is not trivial fluff—it is the fastest evolving linguistic and sociological experiment in human history. Memes are contemporary political folklore. Aesthetics are digital subcultures. Brain rot is the surrealist poetry of the algorithm.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                Founded by cultural researchers and digital natives, <em>chronically online</em> dissects trends with intellectual rigor, sharp design, and a complete absence of corporate cringe.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="y2k-btn px-4 py-2 bg-white hover:bg-[#ccff00] text-black text-xs font-pixel font-bold shadow-[3px_3px_0px_#000]"
                >
                  <span>READ OUR METHODOLOGY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#0055ff] rotate-1">
                <span className="text-4xl font-black text-[#0055ff] font-pixel block">10+</span>
                <span className="text-xs text-black font-pixel font-bold mt-1 block">ORIGINAL ESSAYS</span>
                <p className="text-xs text-slate-700 mt-2 font-mono">Deep cultural dives running 850–1,000 words each.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#ff1493] -rotate-1">
                <span className="text-4xl font-black text-[#ff1493] font-pixel block">0%</span>
                <span className="text-xs text-black font-pixel font-bold mt-1 block">PR BULLSHIT</span>
                <p className="text-xs text-slate-700 mt-2 font-mono">Zero astroturfed marketing or sponsored trends.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#65a30d] -rotate-1">
                <span className="text-4xl font-black text-[#65a30d] font-pixel block">24/7</span>
                <span className="text-xs text-black font-pixel font-bold mt-1 block">LORE ARCHIVES</span>
                <p className="text-xs text-slate-700 mt-2 font-mono">Tracking memes from underground forums to feeds.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#7c3aed] rotate-1">
                <span className="text-4xl font-black text-[#7c3aed] font-pixel block">100%</span>
                <span className="text-xs text-black font-pixel font-bold mt-1 block">AEO GROUNDED</span>
                <p className="text-xs text-slate-700 mt-2 font-mono">Direct Q&A answers for AI search clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Alternating Section: Newsletter Subscription (Checkerboard) */}
      <NewsletterSticker />
    </div>
  );
};
