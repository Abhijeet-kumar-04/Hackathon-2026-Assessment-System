'use client';

import { UserButton } from '@clerk/nextjs';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  FolderGit2, 
  Settings,
  LogOut,
  Code2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Teams', href: '/dashboard/teams', icon: Users },
  { name: 'Hackathons', href: '/hackathons', icon: Trophy },
  { name: 'Submissions', href: '/dashboard/submissions', icon: FolderGit2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 hidden md:flex flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-white/5">
          <Code2 className="w-6 h-6 text-indigo-500" />
          <span className="font-bold text-white tracking-tight">HackHub</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <UserButton afterSignOutUrl="/" />
            <span className="text-sm font-medium text-slate-300">My Account</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-white">HackHub</span>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950">
          <div className="container mx-auto p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
