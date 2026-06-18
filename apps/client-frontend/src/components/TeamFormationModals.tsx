'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, KeySquare, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

interface Props {
  hackathonId: string;
  isOpen: boolean;
  onClose: () => void;
  mode: 'CREATE' | 'JOIN';
  onSuccess: (team: any) => void;
}

export function TeamFormationModals({ hackathonId, isOpen, onClose, mode, onSuccess }: Props) {
  const { userId } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('You must be logged in to do this.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'CREATE' ? '/api/v1/teams' : '/api/v1/teams/join';
      const payload = mode === 'CREATE' 
        ? { teamName, hackathonId, userId } 
        : { teamCode, userId };

      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      onSuccess(data.team);
      setTeamName('');
      setTeamCode('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${mode === 'CREATE' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'}`}>
              {mode === 'CREATE' ? <Users className="w-6 h-6" /> : <KeySquare className="w-6 h-6" />}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {mode === 'CREATE' ? 'Create a Team' : 'Join a Team'}
            </h2>
            <p className="text-slate-600 mb-6">
              {mode === 'CREATE' 
                ? 'Gather your squad and build something amazing.' 
                : 'Enter the 6-character invite code from your team leader.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'CREATE' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. The Code Fathers"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Team Code</label>
                  <input
                    type="text"
                    required
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                    placeholder="e.g. X7B9A2"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all uppercase tracking-widest text-center text-xl text-slate-900 placeholder-slate-300"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center transition-all ${
                  mode === 'CREATE' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30' 
                    : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'CREATE' ? 'Create Team' : 'Join Team')}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
