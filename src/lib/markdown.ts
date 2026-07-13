import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';
import type { RehypeShikiOptions } from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { shikiDark2026 } from './shiki-dark-2026';
import { withBasePath } from './paths';

type Heading = {
  id: string;
  depth: number;
  text: string;
};

const assetExtensions = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const shikiOptions = {
  theme: shikiDark2026,
  langs: ['bash', 'c', 'css', 'html', 'javascript', 'json', 'jsx', 'nginx', 'scss', 'tsx', 'typescript'],
  langAlias: {
    conf: 'nginx',
    js: 'javascript',
    ts: 'typescript',
  },
  fallbackLanguage: 'text',
} as unknown as RehypeShikiOptions;

function isExternalUrl(value: string) {
  return /^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('#') || value.startsWith('mailto:');
}

function assetUrl(slug: string, rawUrl: string) {
  if (!rawUrl || isExternalUrl(rawUrl) || rawUrl.startsWith('/')) {
    return rawUrl;
  }

  const [pathname, suffix = ''] = rawUrl.split(/(?=[?#])/);
  if (!assetExtensions.test(pathname)) {
    return rawUrl;
  }

  const encoded = pathname
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

  return `${withBasePath(`/posts-assets/${slug}/${encoded}`)}${suffix}`;
}

function stripTocFence(markdown: string) {
  return markdown.replace(/```toc[\s\S]*?```/gi, '');
}

function extractHeadings(markdown: string) {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const match of markdown.matchAll(/^(#{2,4})\s+(.+)$/gm)) {
    const text = match[2]
      .replace(/[#`*_~[\]()]/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();

    if (!text) {
      continue;
    }

    headings.push({
      id: slugger.slug(text),
      depth: match[1].length,
      text,
    });
  }

  return headings;
}

function rewriteRawHtmlImageUrls(markdown: string, slug: string) {
  return markdown.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_match, before, src, after) => {
    return `${before}${assetUrl(slug, src)}${after}`;
  });
}

function rewriteMarkdownImageUrls(markdown: string, slug: string) {
  return markdown.replace(/(!\[[^\]]*]\()([^)]+)(\))/g, (_match, before, src, after) => {
    return `${before}${assetUrl(slug, src.trim())}${after}`;
  });
}

function remarkAssetLinks(slug: string) {
  return () => (tree: Parameters<typeof visit>[0]) => {
    const visitor = (node: { url?: string }) => {
      if (node.url) {
        node.url = assetUrl(slug, node.url);
      }
    };

    visit(tree, 'image', visitor as never);
  };
}

export async function renderMarkdown(markdown: string, slug: string) {
  const withoutToc = stripTocFence(markdown);
  const headings = extractHeadings(withoutToc);
  const rewritten = rewriteMarkdownImageUrls(rewriteRawHtmlImageUrls(withoutToc, slug), slug);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAssetLinks(slug))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeShiki, shikiOptions)
    .use(rehypeStringify)
    .process(rewritten);

  return {
    html: String(file),
    headings,
  };
}
