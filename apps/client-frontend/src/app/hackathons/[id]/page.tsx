'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs';
import { Calendar, Users, MapPin, Trophy, ArrowLeft, Hexagon, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { TeamFormationModals } from '@/components/TeamFormationModals';

export default function HackathonDetailsPage() {
  const params = useParams();
  const { id } = params;
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [modalMode, setModalMode] = useState<'CREATE' | 'JOIN' | null>(null);
  const [successTeam, setSuccessTeam] = useState<any>(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/hackathons/${id}`);
        if (!res.ok) throw new Error('Failed to load hackathon details');
        const data = await res.json();
        setHackathon(data.hackathon);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHackathon();
  }, [id]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error || 'Hackathon not found'}</p>
        <button onClick={() => router.push('/hackathons')} className="text-indigo-600 hover:underline">
          Go back to hackathons
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-white/60 border-b border-slate-200 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-indigo-600 fill-indigo-100" />
          <span className="text-xl font-bold tracking-tight text-slate-900">HackSphere</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/hackathons" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
            Back to Explore
          </Link>
          {isLoaded && userId ? <UserButton afterSignOutUrl="/" /> : (
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      {/* Hero Banner Section */}
      <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
        {hackathon.banner ? (
          <img src={hackathon.banner} alt={hackathon.title} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {hackathon.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{hackathon.title}</h1>
            <p className="text-xl text-slate-300 max-w-3xl">{hackathon.description}</p>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="space-y-1">
              <span className="text-slate-500 text-sm flex items-center gap-1"><Calendar className="w-4 h-4"/> Start Date</span>
              <p className="font-semibold text-slate-900">{formatDate(hackathon.startDate)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-sm flex items-center gap-1"><Trophy className="w-4 h-4"/> Prize Pool</span>
              <p className="font-semibold text-slate-900">${hackathon.prizePool?.toLocaleString() || 'TBA'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-sm flex items-center gap-1"><MapPin className="w-4 h-4"/> Location</span>
              <p className="font-semibold text-slate-900">{hackathon.mode === 'ONLINE' ? 'Online' : hackathon.location}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-sm flex items-center gap-1"><Users className="w-4 h-4"/> Team Size</span>
              <p className="font-semibold text-slate-900">{hackathon.teamRules.minTeamSize}-{hackathon.teamRules.maxTeamSize} Members</p>
            </div>
          </div>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">About this Hackathon</h3>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>{hackathon.description}</p>
              <p>Join us to build the future. Connect with mentors, attend workshops, and win amazing prizes. Whether you are a beginner or a pro, there's a place for you here!</p>
            </div>
          </section>

          {hackathon.tracks && hackathon.tracks.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Tracks & Prizes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {hackathon.tracks.map((track: any, i: number) => (
                  <div key={i} className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <h4 className="text-xl font-bold text-indigo-900 mb-2">{track.name}</h4>
                    <p className="text-indigo-700/80 mb-4">{track.description}</p>
                    <div className="text-lg font-bold text-indigo-600">{track.prize}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Action Box) */}
        <div>
          <div className="sticky top-32 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to hack?</h3>
            <p className="text-slate-600 mb-8">Form a team or join an existing one using an invite code.</p>

            {successTeam ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-emerald-900 mb-2">Success!</h4>
                <p className="text-emerald-700 mb-4">You are now in team <strong>{successTeam.teamName}</strong>.</p>
                {successTeam.leader === userId && ( // Highly simplified check
                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-sm text-emerald-600 block mb-1">Share this Team Code:</span>
                    <span className="text-2xl font-black tracking-widest text-emerald-700">{successTeam.teamCode}</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4">
                {(!isLoaded || !userId) ? (
                  <SignInButton mode="modal">
                    <button className="w-full py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors">
                      Sign in to Register
                    </button>
                  </SignInButton>
                ) : (
                  <>
                    <button 
                      onClick={() => setModalMode('CREATE')}
                      className="w-full py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1"
                    >
                      Create a Team
                    </button>
                    <button 
                      onClick={() => setModalMode('JOIN')}
                      className="w-full py-4 rounded-xl font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                    >
                      Join with Code
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <TeamFormationModals 
        isOpen={modalMode !== null}
        mode={modalMode!}
        hackathonId={id as string}
        onClose={() => setModalMode(null)}
        onSuccess={(team) => {
          setSuccessTeam(team);
          setModalMode(null);
        }}
      />
    </div>
  );
}
