import type { MetadataRoute } from 'next';
import { getBasePath } from '@/lib/paths';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const basePath = getBasePath();

  return {
    name: 'heony704.logs',
    short_name: 'heony704.logs',
    description: 'heony704의 블로그',
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#111111',
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
