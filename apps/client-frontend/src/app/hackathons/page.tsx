'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HackathonCard } from '@/components/HackathonCard';
import { Code2, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { UserButton, useAuth, SignInButton } from '@clerk/nextjs';

export default function HackathonsPage() {
  const { isLoaded, userId } = useAuth();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        // API Gateway runs on 3000 and routes /api/v1/hackathons to the hackathon-service
        const res = await fetch('http://localhost:3000/api/v1/hackathons');
        if (!res.ok) throw new Error('Failed to fetch hackathons');
        const data = await res.json();
        setHackathons(data.hackathons || []);
      } catch (err: any) {
        console.error(err);
        setError('Unable to load hackathons. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 bg-slate-950/50">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold tracking-tight text-white">HackHub</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/hackathons" className="text-sm font-medium text-white transition-colors">
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
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 relative">
        <div className="max-w-3xl mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Hackathons</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Find the perfect opportunity to build, learn, and win. Compete with the best developers from around the world.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search hackathons..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <select className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer">
            <option value="all" className="bg-slate-900">All Formats</option>
            <option value="online" className="bg-slate-900">Online</option>
            <option value="offline" className="bg-slate-900">In-Person</option>
            <option value="hybrid" className="bg-slate-900">Hybrid</option>
          </select>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
            <p>Loading epic hackathons...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((hackathon: any, i: number) => (
              <HackathonCard key={hackathon._id || i} hackathon={hackathon} />
            ))}
            
            {hackathons.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-500">
                <p>No hackathons found right now. Check back later!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
