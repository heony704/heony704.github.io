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
        <header className="header">
          <Link href={withBasePath('/')} className="logo">
            <span className="logo-strong">heony704</span>
            <span>.logs</span>
          </Link>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-copyright-box">
            <span className="footer-blog-name">HEONY704.LOGS</span>
            <span className="footer-copyright">© 2026 heony704</span>
          </div>
          <div className="footer-link-box">
            <a href="https://github.com/heony704" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:heony704@gmail.com">Email</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
