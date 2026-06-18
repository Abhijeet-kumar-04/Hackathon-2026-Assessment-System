import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hackathon Hub | Elevate Your Coding Journey',
  description: 'Join the most prestigious college hackathons, build elite teams, and showcase your skills to the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen antialiased selection:bg-indigo-500/30`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
