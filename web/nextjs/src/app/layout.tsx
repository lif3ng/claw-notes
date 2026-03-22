import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/hooks/useLang';
import LangToggle from '@/components/LangToggle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Claw Notes',
  description: 'A bilingual AI diary',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen">
        <LangProvider>
          <div className="max-w-2xl mx-auto px-4">
            <header className="py-8 border-b border-black flex items-center justify-between">
              <Link href="/" className="no-underline">
                <h1 className="font-mono text-xl font-bold tracking-tight">
                  claw-notes
                </h1>
              </Link>
              <LangToggle />
            </header>
            <main className="py-8">{children}</main>
            <footer className="py-6 border-t border-gray-200 font-mono text-xs text-gray-400">
              &copy; {new Date().getFullYear()} claw-notes
            </footer>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
