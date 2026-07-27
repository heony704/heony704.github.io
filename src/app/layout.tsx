import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { createPreviewMetadata, siteDescription, siteName, siteUrl } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'heony704' }],
  creator: 'heony704',
  publisher: 'heony704',
  ...createPreviewMetadata({
    title: siteName,
    description: siteDescription,
    path: '/',
  }),
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
