'use client';

import { motion } from 'framer-motion';
import { Plus, Users, Trophy, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, Hacker</h1>
          <p className="text-slate-400 mt-1">Here is what's happening with your teams and events.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <Plus className="w-5 h-5" />
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Active Hackathons</p>
              <h3 className="text-2xl font-bold text-white">2</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">My Teams</p>
              <h3 className="text-2xl font-bold text-white">3</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Awards Won</p>
              <h3 className="text-2xl font-bold text-white">1</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Teams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">My Teams</h2>
            <Link href="/dashboard/teams" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    T{i}
                  </div>
                  <div>
                    <h4 className="text-white font-medium group-hover:text-indigo-300 transition-colors">Neural Ninjas</h4>
                    <p className="text-xs text-slate-400">Global AI Hackathon 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Upcoming Deadlines</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-4 border-l-rose-500">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Round 1 Submission</h4>
                <p className="text-sm text-slate-400 mt-1">Global AI Hackathon 2026</p>
                <p className="text-xs text-rose-400 font-medium mt-2">Due in 2 days (Oct 15, 2026)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-4 border-l-amber-500">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Team Registration Closes</h4>
                <p className="text-sm text-slate-400 mt-1">Web3 Builders League</p>
                <p className="text-xs text-amber-400 font-medium mt-2">Due in 5 days (Oct 18, 2026)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
