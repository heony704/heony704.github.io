import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { withBasePath } from '@/lib/paths';

export const metadata: Metadata = {
  title: {
    default: 'heony704 blog',
    template: '%s | heony704 blog',
  },
  description: 'heony704 blog',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link href={withBasePath('/')} className="site-title">
            🍯 heony704 blog
          </Link>
        </header>

        <main>{children}</main>

        <footer className="site-footer">© heony704</footer>
      </body>
    </html>
  );
}
