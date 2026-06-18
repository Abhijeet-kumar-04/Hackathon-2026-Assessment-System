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
      case 'LIVE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'PUBLISHED': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'COMPLETED': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
      className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col h-full transition-all"
    >
      {/* Banner Image */}
      <div className="h-48 relative overflow-hidden bg-slate-100">
        {hackathon.banner ? (
          <img 
            src={hackathon.banner} 
            alt={hackathon.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-indigo-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${getStatusColor(hackathon.status)}`}>
            {hackathon.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{hackathon.title}</h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">{hackathon.description}</p>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-600 mb-6 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{formatDate(hackathon.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>${hackathon.prizePool?.toLocaleString() || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-fuchsia-500" />
            <span>{hackathon.mode === 'ONLINE' ? 'Online' : hackathon.location || hackathon.mode}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <span>{hackathon.teamRules.minTeamSize}-{hackathon.teamRules.maxTeamSize} Members</span>
          </div>
        </div>

        <Link 
          href={`/hackathons/${hackathon._id}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-indigo-700 font-semibold transition-colors"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
