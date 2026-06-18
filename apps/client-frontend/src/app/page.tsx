'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { ArrowRight, Code2, Rocket, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isLoaded, userId } = useAuth();
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold tracking-tight text-white">HackHub</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/hackathons" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Explore Hackathons
          </Link>
          {isLoaded && userId && (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          {isLoaded && !userId && (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Hackathon 2026 Registrations Open
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300">
            Build the Future, <br className="hidden md:block" /> One Line of Code at a Time.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform to discover prestigious hackathons, form elite teams, 
            and transform your ideas into reality. Powered by AI matchmaking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            {isLoaded && !userId && (
              <SignUpButton mode="modal">
                <button className="group relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)] overflow-hidden w-full sm:w-auto justify-center">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span>Join as Hacker</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignUpButton>
            )}
            {isLoaded && userId && (
              <Link href="/hackathons" className="group relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)] w-full sm:w-auto justify-center">
                <span>View Hackathons</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            <button className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
              Organize Event
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32"
        >
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors text-left group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Team Matching</h3>
            <p className="text-slate-400">Find the perfect teammates based on skills, tech stack, and experience level instantly.</p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors text-left group">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Live Leaderboards</h3>
            <p className="text-slate-400">Track your team's progress with real-time scoring, judge feedback, and dynamic rankings.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors text-left group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Seamless Submissions</h3>
            <p className="text-slate-400">Submit GitHub repos, demo videos, and presentations directly through your dashboard.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
