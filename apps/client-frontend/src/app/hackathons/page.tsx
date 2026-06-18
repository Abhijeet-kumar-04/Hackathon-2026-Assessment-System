'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HackathonCard } from '@/components/HackathonCard';
import { Hexagon, Search, Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Light Theme Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white pointer-events-none" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-white/60 border-b border-slate-200 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-indigo-600 fill-indigo-100" />
          <span className="text-xl font-bold tracking-tight text-slate-900">HackSphere</span>
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
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hackathons</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
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
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <select className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer shadow-sm">
            <option value="all" className="bg-white">All Formats</option>
            <option value="online" className="bg-white">Online</option>
            <option value="offline" className="bg-white">In-Person</option>
            <option value="hybrid" className="bg-white">Hybrid</option>
          </select>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
            <p className="font-medium">Loading epic hackathons...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl text-center shadow-sm">
            <p className="font-medium">{error}</p>
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
