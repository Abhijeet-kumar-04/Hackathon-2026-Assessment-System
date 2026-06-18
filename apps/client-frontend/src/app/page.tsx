'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { ArrowRight, Hexagon, Rocket, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isLoaded, userId } = useAuth();
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Light Theme Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-200/50 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-white/60 border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-indigo-600 fill-indigo-100" />
          <span className="text-xl font-bold tracking-tight text-slate-900">HackSphere</span>
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">NIT Silchar</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link href="/connect" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Connect
          </Link>
          <Link href="/hackathons" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Explore Hackathons
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {isLoaded && userId && (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          {isLoaded && !userId && (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            NIT Silchar Hackathon 2026 Registrations Open
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Build the Future, <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">One Line of Code at a Time.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for NIT Silchar students to discover prestigious hackathons, form elite teams, 
            and transform ideas into reality. Powered by AI matchmaking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            {isLoaded && !userId && (
              <SignUpButton mode="modal">
                <button className="group relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 overflow-hidden w-full sm:w-auto justify-center hover:-translate-y-1">
                  <span>Join as Hacker</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignUpButton>
            )}
            {isLoaded && userId && (
              <Link href="/hackathons" className="group relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 w-full sm:w-auto justify-center hover:-translate-y-1">
                <span>View Hackathons</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            <button className="flex items-center gap-2 px-8 py-4 text-slate-700 font-semibold rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm w-full sm:w-auto justify-center hover:-translate-y-1">
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
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-left group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Team Matching</h3>
            <p className="text-slate-600">Find the perfect teammates from NIT Silchar based on skills, tech stack, and experience level instantly.</p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-left group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Live Leaderboards</h3>
            <p className="text-slate-600">Track your team's progress with real-time scoring, judge feedback, and dynamic rankings.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-left group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless Submissions</h3>
            <p className="text-slate-600">Submit GitHub repos, demo videos, and presentations directly through your dashboard.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
