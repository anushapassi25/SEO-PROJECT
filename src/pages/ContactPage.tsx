import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle2, MessageSquare, HelpCircle, Star, Zap } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Story Pitch');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-900 py-12 bg-y2k-pink-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('/')}
          className="y2k-btn px-4 py-2 bg-white hover:bg-[#ccff00] text-black text-xs font-pixel mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>◄ Back to Magazine</span>
        </button>

        <header className="pb-8 border-b-2 border-black space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker sticker-pink">
              ★ TRANSMISSION WIRE
            </span>
            <span className="sticker sticker-lime">
              DIRECT DESK
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-black font-display tracking-tight drop-shadow-xs">
            Pitch a Story or Say Hi
          </h1>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-mono font-medium">
            Have you identified an emerging micro-trend, an obscure internet subculture, or an untold memetic lineage? Our editorial board welcomes original pitches and critiques.
          </p>
        </header>

        <div className="py-10">
          {submitted ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-[#ccff00] border-2 border-black shadow-[6px_6px_0px_#000] space-y-4 text-center">
              <CheckCircle2 className="w-14 h-14 text-black mx-auto" />
              <h3 className="text-2xl sm:text-3xl font-black text-black font-display">TRANSMISSION RECEIVED!</h3>
              <p className="text-sm sm:text-base text-slate-900 font-mono font-bold max-w-md mx-auto">
                Thank you for reaching out to <em>chronically online</em>. Our student editorial collective reviews all dispatches within 48 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                  setName('');
                  setEmail('');
                }}
                className="y2k-btn mt-4 px-6 py-3 bg-[#ff1493] text-white text-xs font-pixel font-bold"
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10 rounded-3xl bg-white border-2 border-black shadow-[6px_6px_0px_#000]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-pixel uppercase tracking-wider text-black font-bold block">
                    YOUR NAME OR HANDLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kai or @meme_archaeologist"
                    className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border-2 border-black text-black placeholder-slate-500 text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] font-mono font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-pixel uppercase tracking-wider text-black font-bold block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border-2 border-black text-black placeholder-slate-500 text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase tracking-wider text-black font-bold block">
                  TRANSMISSION TYPE
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border-2 border-black text-black text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] font-mono font-bold"
                >
                  <option value="Story Pitch">Original Essay / Story Pitch</option>
                  <option value="Subculture Tip">Underground Meme / Trend Tip-Off</option>
                  <option value="Correction">Factual Correction or Attribution Note</option>
                  <option value="General Feedback">Reader Feedback / Letter to Editor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase tracking-wider text-black font-bold block">
                  PITCH SYNOPSIS OR MESSAGE *
                </label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the core thesis of your pitch, relevant links or screenshots, and why this trend matters to internet culture..."
                  className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border-2 border-black text-black placeholder-slate-500 text-sm focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] font-mono font-medium"
                />
              </div>

              <button
                type="submit"
                className="y2k-btn w-full sm:w-auto px-8 py-4 bg-[#ff1493] text-white text-xs font-pixel font-bold shadow-[4px_4px_0px_#000]"
              >
                <span>★ Transmit to Editorial Desk</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Note */}
          <div className="mt-10 p-5 rounded-2xl bg-[#eff6ff] border-2 border-black text-xs text-slate-800 space-y-2 shadow-[3px_3px_0px_#0055ff]">
            <span className="font-pixel text-[#0055ff] font-bold block">NOTE FOR WRITERS & LURKERS:</span>
            <p className="font-mono">
              We prioritize essays that investigate cultural causes over superficial summaries. Before pitching, please review our existing 10 foundational stories to ensure your angle is fresh and original.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
