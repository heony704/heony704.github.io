import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OtherPosts } from '@/app/[slug]/other-posts';
import { createPreviewMetadata } from '@/lib/metadata';
import { renderMarkdown } from '@/lib/markdown';
import { formatDate, getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/posts';
import { postPath } from '@/lib/paths';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!getAllSlugs().includes(slug)) {
    return {};
  }

  const post = getPostBySlug(slug);
  const previewDescription = post.excerpt ? `${post.excerpt.slice(0, 100).trimEnd()}...` : post.excerpt;

  return {
    title: post.title,
    description: previewDescription,
    ...createPreviewMetadata({
      title: post.title,
      description: previewDescription,
      path: `/${slug}/`,
      type: 'article',
    }),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  if (!getAllSlugs().includes(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);
  const otherPosts = getAllPosts().map((otherPost) => ({
    ...otherPost,
    href: postPath(otherPost.slug),
    formattedDate: formatDate(otherPost.date),
  }));
  const { html, headings } = await renderMarkdown(post.content, slug);

  return (
    <div className="page-shell post-layout">
      <article className="post-article">
        <header className="post-header">
          {post.categories.length ? (
            <div className="category-row">
              {post.categories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          ) : null}
          <h1 className="post-header-title">{post.title}</h1>
          <time className="post-header-time" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </header>

        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />

        <OtherPosts currentSlug={slug} posts={otherPosts} />
      </article>

      <aside className="post-aside">
        {headings.length ? (
          <nav className="toc" aria-label="목차">
            <strong>목차</strong>
            <ul>
              {headings.map((heading) => (
                <li key={`${heading.id}-${heading.text}`} className={`toc-depth-${heading.depth}`}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </aside>
    </div>
  );
}
