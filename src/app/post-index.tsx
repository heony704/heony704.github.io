'use client';

import Link from 'next/link';
import { useState } from 'react';

const POSTS_PER_PAGE = 5;

type PostIndexItem = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  href: string;
  formattedDate: string;
};

type PostIndexProps = {
  posts: PostIndexItem[];
};

export function PostIndex({ posts }: PostIndexProps) {
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      document.getElementById('post-index')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <>
      <ul className="post-list">
        {visiblePosts.map((post) => (
          <li key={post.slug}>
            <Link className="post-list-item" href={post.href}>
              {post.categories.length ? (
                <span className="post-list-categories">
                  {post.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </span>
              ) : null}
              <span className="post-list-title">{post.title}</span>
              {post.excerpt ? <p className="post-list-content">{post.excerpt}</p> : null}
              <time className="post-list-time" dateTime={post.date}>
                {post.formattedDate}
              </time>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <nav className="pagination" aria-label="Posts pagination">
          <button
            type="button"
            className="pagination-button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            &lt;
          </button>

          <span className="pagination-status" aria-current="page">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="pagination-button"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            &gt;
          </button>
        </nav>
      ) : null}
    </>
  );
}
