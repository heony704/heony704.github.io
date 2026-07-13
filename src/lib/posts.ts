import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
};

export type Post = PostMeta & {
  content: string;
};

type Frontmatter = {
  title?: string;
  date?: string;
  categories?: string;
};

function getPostDirs() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(CONTENT_DIR, slug, 'index.md')));
}

function parseCategories(categories: unknown) {
  if (typeof categories !== 'string') {
    return [];
  }

  return categories.split(/\s+/).filter(Boolean);
}

function makeExcerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(CONTENT_DIR, slug, 'index.md');
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as Frontmatter;

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || '',
    categories: parseCategories(frontmatter.categories),
    excerpt: makeExcerpt(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostDirs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllSlugs() {
  return getPostDirs();
}

export function getOtherPosts(currentSlug: string, limit?: number) {
  const posts = getAllPosts().filter((post) => post.slug !== currentSlug);

  if (typeof limit !== 'number') {
    return posts;
  }

  return posts.slice(0, limit);
}

export function formatDate(date: string) {
  if (!date) {
    return '';
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsed);
}
