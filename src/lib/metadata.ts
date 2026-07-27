import type { Metadata } from 'next';
import { withBasePath } from '@/lib/paths';

export const siteName = 'heony704.logs';
export const siteDescription = 'heony704의 블로그';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heony704.github.io';
export const ogImagePath = '/hello-world.png';

export function absoluteUrl(path: string) {
  return new URL(withBasePath(path), siteUrl).toString();
}

type PreviewMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
};

export function createPreviewMetadata({
  title,
  description = siteDescription,
  path,
  type = 'website',
}: PreviewMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImagePath);

  return {
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: 'ko_KR',
      type,
      images: [
        {
          url: imageUrl,
          alt: siteName,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: siteName,
        },
      ],
    },
  };
}
