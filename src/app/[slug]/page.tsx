import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { renderMarkdown } from '@/lib/markdown';
import { formatDate, getAllSlugs, getOtherPosts, getPostBySlug } from '@/lib/posts';
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
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  if (!getAllSlugs().includes(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);
  const otherPosts = getOtherPosts(slug);
  const { html, headings } = await renderMarkdown(post.content, slug);

  return (
    <div className="page-shell post-layout">
      <article className="post-article">
        <header className="post-header">
          <h1 className="post-header-title">{post.title}</h1>
          <time className="post-header-time" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {post.categories.length ? (
            <div className="category-row">
              {post.categories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />

        <section className="other-posts" aria-labelledby="other-posts-title">
          <h2 className="other-posts-title" id="other-posts-title">
            다른 글
          </h2>
          <ul>
            {otherPosts.map((otherPost) => (
              <li key={otherPost.slug}>
                <Link href={postPath(otherPost.slug)}>
                  <span>{otherPost.title}</span>
                  <time dateTime={otherPost.date}>{formatDate(otherPost.date)}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
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
