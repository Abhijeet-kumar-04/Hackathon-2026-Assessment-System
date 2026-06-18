import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HackathonCardProps {
  hackathon: {
    _id: string;
    title: string;
    description: string;
    banner?: string;
    startDate: string;
    endDate: string;
    mode: string;
    location?: string;
    prizePool?: number;
    teamRules: { maxTeamSize: number; minTeamSize: number };
    status: string;
  };
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PUBLISHED': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'COMPLETED': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col h-full"
    >
      {/* Banner Image */}
      <div className="h-48 relative overflow-hidden bg-slate-900">
        {hackathon.banner ? (
          <img 
            src={hackathon.banner} 
            alt={hackathon.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-indigo-500/30" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md ${getStatusColor(hackathon.status)}`}>
            {hackathon.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{hackathon.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow">{hackathon.description}</p>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-300 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{formatDate(hackathon.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>${hackathon.prizePool?.toLocaleString() || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-fuchsia-400" />
            <span>{hackathon.mode === 'ONLINE' ? 'Online' : hackathon.location || hackathon.mode}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>{hackathon.teamRules.minTeamSize}-{hackathon.teamRules.maxTeamSize} Members</span>
          </div>
        </div>

        <Link 
          href={`/hackathons/${hackathon._id}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
