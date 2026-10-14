import React, { useState, useEffect } from 'react';
import { Article, UserComment } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import {
  Clock,
  Share2,
  Bookmark,
  Heart,
  Check,
  ChevronLeft,
  ArrowRight,
  MessageSquare,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Send,
  ThumbsUp,
  Globe,
  Terminal,
  Zap,
  Star
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string, e: React.MouseEvent) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [imgError, setImgError] = useState(false);

  // Comments state
  const [comments, setComments] = useState<UserComment[]>([
    {
      id: 'c1',
      authorName: 'Sasha M.',
      authorHandle: '@sashaposting',
      timestamp: '2 hours ago',
      content: 'This analysis hit way too close to home. The point about corporate LinkedIn adoption killing the ironic edge of memes is 100% accurate.',
      likes: 18,
      userLiked: false,
    },
    {
      id: 'c2',
      authorName: 'Devon K.',
      authorHandle: '@devon_irl',
      timestamp: '5 hours ago',
      content: 'The AEO answer on recommendation algorithms is super concise. Loved the breakdown of why friction in early internet forums kept memes alive longer.',
      likes: 12,
      userLiked: false,
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Update document title & meta tags for SEO when article loads
  useEffect(() => {
    document.title = article.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scroll)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: UserComment = {
      id: 'c_' + Date.now(),
      authorName: newCommentName.trim() || 'Anonymous Lurker',
      authorHandle: '@user_' + Math.floor(Math.random() * 900 + 100),
      timestamp: 'Just now',
      content: newCommentText.trim(),
      likes: 1,
      userLiked: true,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setNewCommentName('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const toggleCommentLike = (id: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === id) {
          const isLiked = c.userLiked;
          return {
            ...c,
            likes: isLiked ? c.likes - 1 : c.likes + 1,
            userLiked: !isLiked,
          };
        }
        return c;
      })
    );
  };

  // Find related articles
  const relatedArticles = allArticles.filter(
    (a) => article.relatedSlugs.includes(a.slug) || (a.category === article.category && a.slug !== article.slug)
  ).slice(0, 3);

  // Font size multiplier
  const proseFontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-xl leading-loose font-medium'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed font-normal'
      : 'text-sm sm:text-base leading-relaxed font-normal';

  return (
    <article className="min-h-screen bg-[#faf5ff] text-slate-900 relative pb-20 bg-y2k-pink-grid">
      {/* Reading Progress Indicator Bar (Hot Pink to Blue) */}
      <div className="fixed top-22 left-0 right-0 h-1.5 bg-slate-200 z-40">
        <div
          className="h-full bg-gradient-to-r from-[#ff1493] via-[#a855f7] to-[#0055ff] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,20,147,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation Bar */}
      <div className="border-b-2 border-black bg-[#ffe4e6] py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-mono font-bold text-black">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 hover:text-[#ff1493] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
            <span>◄ Return to Magazine Index</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-[#ff1493] text-white px-2 py-0.5 rounded text-[10px] font-pixel border border-black shadow-[1px_1px_0px_#000]">
              {article.category}
            </span>
            <span className="hidden sm:inline text-slate-500 font-mono">/{article.slug}</span>
          </div>
        </div>
      </div>

      {/* Article Header Section */}
      <header className="pt-10 pb-8 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4">
          <span className="sticker sticker-pink">
            ★ {article.category}
          </span>
          <span className="sticker sticker-chrome">
            Published {article.publishedAt}
          </span>
          <span className="sticker sticker-lime flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="sticker sticker-lavender">
            {article.wordCount} words
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black font-display tracking-tight leading-[1.12] drop-shadow-xs">
          {article.title}
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-slate-800 font-medium leading-relaxed font-mono">
          {article.deck}
        </p>

        {/* Author Bio Card & Reader Controls */}
        <div className="mt-8 pt-6 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            <div className="w-10 h-10 rounded-full bg-[#0055ff] border-2 border-black flex items-center justify-center font-bold text-sm text-white font-mono">
              {article.author.avatar}
            </div>
            <div>
              <div className="text-sm font-black text-black font-display">{article.author.name}</div>
              <div className="text-xs text-purple-900 font-mono font-bold">
                {article.author.role} <span className="text-black">·</span> {article.author.handle}
              </div>
            </div>
          </div>

          {/* Reader Controls: Font Resizer, Share, Bookmark, Like */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Font size switcher */}
            <div className="flex items-center bg-white border-2 border-black rounded-xl p-1 text-xs font-mono shadow-[2px_2px_0px_#000]">
              <span className="px-1.5 text-black font-pixel text-[10px]">SIZE:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${fontSize === 'normal' ? 'bg-[#ff1493] text-white' : 'text-black hover:bg-pink-100'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${fontSize === 'large' ? 'bg-[#ff1493] text-white' : 'text-black hover:bg-pink-100'}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${fontSize === 'xlarge' ? 'bg-[#ff1493] text-white' : 'text-black hover:bg-pink-100'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Like button */}
            <button
              onClick={handleLike}
              className={`y2k-btn p-2 text-xs font-pixel ${
                hasLiked
                  ? 'bg-[#ff1493] text-white border-black'
                  : 'bg-white text-black hover:bg-pink-100'
              }`}
              title="Like this essay"
              aria-label="Like article"
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />
              <span>{likes}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleBookmark(article.slug, e)}
              className={`y2k-btn p-2 ${
                isBookmarked
                  ? 'bg-[#0055ff] text-white border-black'
                  : 'bg-white text-black hover:bg-blue-100'
              }`}
              title={isBookmarked ? 'Saved to reading list' : 'Save article'}
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              className="y2k-btn p-2 bg-white hover:bg-[#ccff00] text-black"
              title="Share article link"
              aria-label="Copy article link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Toast for copied link */}
        {copiedLink && (
          <div className="mt-3 p-2.5 bg-[#ccff00] border-2 border-black text-black text-xs font-pixel rounded-xl text-center shadow-[2px_2px_0px_#000] font-bold">
            ★ ARTICLE LINK COPIED TO CLIPBOARD! ★
          </div>
        )}
      </header>

      {/* Hero Image Presentation with Retro OS Window Motif */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="y2k-window rounded-2xl overflow-hidden">
          {/* Retro Window Header */}
          <div className="y2k-window-header px-4 py-2 flex items-center justify-between text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black inline-block" />
              </div>
              <span className="font-pixel text-[10px] text-white ml-1">
                {article.slug}.png // 1280x720
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[9px] font-mono text-white">
              <Globe className="w-3 h-3 text-[#ccff00]" />
              <span>chronicallyonline.net/{article.slug}</span>
            </div>
          </div>

          <div className="aspect-16/9 w-full overflow-hidden bg-slate-900">
            {!imgError ? (
              <img
                src={article.heroImage}
                alt={article.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-200 to-blue-200 text-center">
                <span className="text-xl font-black text-black">chronically online</span>
                <span className="text-sm font-bold text-slate-800 mt-2">{article.title}</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-[#e2e8f0] border-t-2 border-black flex items-center justify-between text-xs text-black font-mono font-bold">
            <span className="truncate pr-4">{article.imageAlt}</span>
            <span className="text-[#ff1493] font-pixel shrink-0">FIG. HERO-01</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Sidebar */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="sticky top-28 space-y-6">
            {/* Key Takeaways Box (Scrapbook Style) */}
            <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#ff1493]">
              <span className="text-xs font-pixel uppercase tracking-wider text-[#ff1493] font-black block mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ff1493]" />
                <span>★ EXECUTIVE SUMMARY</span>
              </span>
              <ul className="space-y-2.5 text-xs text-slate-800 font-mono">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#0055ff] font-black mt-0.5">►</span>
                    <span className="font-semibold">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of Contents */}
            <nav className="p-5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#0a0a0a]">
              <span className="text-xs font-pixel uppercase tracking-wider text-black font-black block mb-3">
                CONTENTS INDEX
              </span>
              <ul className="space-y-2 text-xs font-mono">
                {article.sections.map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-slate-700 hover:text-[#ff1493] font-bold transition-colors block py-0.5 leading-snug line-clamp-1"
                    >
                      <span className="text-[#0055ff] mr-1.5">0{idx + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#conclusion"
                    className="text-slate-700 hover:text-[#ff1493] font-bold transition-colors block py-0.5 leading-snug"
                  >
                    <span className="text-[#0055ff] mr-1.5">0{article.sections.length + 1}.</span>
                    Conclusion
                  </a>
                </li>
                <li>
                  <a
                    href="#discussion"
                    className="text-slate-700 hover:text-[#ff1493] font-bold transition-colors block py-0.5 leading-snug"
                  >
                    <span className="text-[#0055ff] mr-1.5">0{article.sections.length + 2}.</span>
                    Reader Discussion ({comments.length})
                  </a>
                </li>
              </ul>
            </nav>

            {/* Transparent SEO Metadata Card */}
            <div className="p-4 rounded-2xl bg-[#eff6ff] border-2 border-black text-[11px] font-mono text-slate-800 space-y-2 shadow-[3px_3px_0px_#0055ff]">
              <div className="flex items-center gap-1.5 text-black font-pixel font-bold uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-[#0055ff]" />
                <span>SEO KEYWORDS METADATA</span>
              </div>
              <div>
                <span className="text-slate-600 font-bold">Primary:</span>
                <span className="text-[#ff1493] ml-1 font-black">{article.primaryKeyword}</span>
              </div>
              <div>
                <span className="text-slate-600 font-bold">Related:</span>
                <span className="text-black ml-1 font-bold">{article.relatedKeywords.join(', ')}</span>
              </div>
              <div className="pt-1 text-[10px] text-slate-600 border-t border-black">
                URL SLUG: /{article.slug}
              </div>
            </div>
          </div>
        </aside>

        {/* Narrative Body Column: High Contrast, Clean White Paper, Generous Spacing */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 max-w-2xl bg-white p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#0a0a0a]">
          {article.sections.map((section, idx) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight leading-snug">
                {section.heading}
              </h2>

              {/* AEO Formatted Question & Direct Concise Answer Box */}
              {section.isQna && section.quickAnswer && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#ccff00]/25 border-2 border-black shadow-[3px_3px_0px_#000] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-pixel text-black font-black uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-black fill-black" />
                    <span>DIRECT ANSWER (AEO SUMMARY):</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-950 font-bold leading-relaxed font-mono">
                    {section.quickAnswer}
                  </p>
                </div>
              )}

              {/* Paragraphs with Clear Contrast and Generous Leading */}
              <div className={`space-y-5 text-slate-800 ${proseFontSizeClass}`}>
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {pIdx === 0 && idx === 0 ? (
                      // Drop cap opening for the first paragraph
                      <span>
                        <span className="float-left text-5xl sm:text-6xl font-black font-display text-[#ff1493] leading-none pr-3 pt-1">
                          {paragraph.charAt(0)}
                        </span>
                        {paragraph.slice(1)}
                      </span>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>

              {/* Pull quote if present */}
              {section.pullQuote && (
                <blockquote className="my-8 py-6 px-6 border-2 border-black bg-[#fdf2f8] rounded-2xl text-center shadow-[3px_3px_0px_#000]">
                  <p className="text-lg sm:text-2xl font-black text-black italic leading-snug font-serif">
                    "{section.pullQuote}"
                  </p>
                  <cite className="block mt-2 text-xs font-pixel text-[#0055ff] not-italic font-bold">
                    — CHAPTER: {section.heading}
                  </cite>
                </blockquote>
              )}
            </section>
          ))}

          {/* Conclusion Section */}
          <section id="conclusion" className="scroll-mt-28 pt-8 border-t-2 border-black space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">
              {article.conclusion.heading}
            </h2>
            <div className={`space-y-5 text-slate-800 ${proseFontSizeClass}`}>
              {article.conclusion.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Article Footer Actions */}
          <div className="pt-8 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`y2k-btn px-4 py-2 text-xs font-pixel uppercase tracking-wider ${
                  hasLiked
                    ? 'bg-[#ff1493] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-black hover:bg-[#ffb6c1]'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />
                <span>{hasLiked ? 'LIKED!' : 'APPLAUD ESSAY'} ({likes})</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="y2k-btn px-4 py-2 bg-white hover:bg-[#ccff00] text-xs font-pixel text-black"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0055ff]" />
                <span>{copiedLink ? 'COPIED!' : 'SHARE LINK'}</span>
              </button>
            </div>

            <div className="text-xs font-mono font-bold text-slate-700">
              Department: <span className="text-[#0055ff]">{article.category}</span>
            </div>
          </div>

          {/* Interactive Comments & Discussion Section */}
          <section id="discussion" className="scroll-mt-28 pt-10 border-t-2 border-black space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#ff1493]" />
                <h3 className="text-xl font-black text-black font-display">
                  Reader Discussion ({comments.length})
                </h3>
              </div>
              <span className="sticker sticker-lime text-[10px]">
                ★ NO BOT SPAM // CIVIL ONLY
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="p-5 rounded-2xl bg-[#faf5ff] border-2 border-black shadow-[3px_3px_0px_#000] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder="Your Name or Pseudonym"
                  className="px-3.5 py-2 rounded-xl bg-white border-2 border-black text-xs text-black placeholder-slate-500 focus:outline-none font-mono font-bold shadow-[2px_2px_0px_#000]"
                />
              </div>
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Drop your thoughts, memes, or cultural counterpoint to this essay..."
                rows={3}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-xs text-black placeholder-slate-500 focus:outline-none font-mono font-medium shadow-[2px_2px_0px_#000]"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-700 font-bold">
                  Instant publication to the feed
                </span>
                <button
                  type="submit"
                  className="y2k-btn px-4 py-2 bg-[#ff1493] text-white text-xs font-pixel uppercase tracking-wider"
                >
                  <span>Post Dispatch</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {commentSubmitted && (
                <div className="p-2.5 bg-[#ccff00] border-2 border-black text-black text-xs font-pixel rounded-xl text-center font-bold">
                  ★ COMMENT POSTED TO DISCUSSION THREAD! ★
                </div>
              )}
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-2xl bg-white border-2 border-black space-y-2 shadow-[2.5px_2.5px_0px_#000]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-black font-mono">{comment.authorName}</span>
                      <span className="text-[#0055ff] font-pixel text-[10px]">{comment.authorHandle}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px] font-bold">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono font-medium">
                    {comment.content}
                  </p>
                  <div className="pt-1 flex items-center gap-4 text-xs font-mono">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center gap-1 text-[11px] font-pixel font-bold transition-colors ${
                        comment.userLiked ? 'text-[#ff1493]' : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{comment.likes} {comment.likes === 1 ? 'UPVOTE' : 'UPVOTES'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related Stories Grid */}
      <section className="mt-20 pt-16 border-t-2 border-black bg-[#ffe4e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="sticker sticker-pink">
                ★ FURTHER EXPLORATIONS
              </span>
              <h3 className="text-2xl font-black text-black font-display">
                Related Internet Lore Dispatches
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/')}
              className="text-xs font-pixel font-bold text-[#0055ff] hover:text-[#ff1493] flex items-center gap-1"
            >
              <span>VIEW ALL 10 ESSAYS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.slug}
                article={rel}
                onNavigate={(slug) => onNavigate(slug)}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
