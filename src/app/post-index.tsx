'use client';

import Link from 'next/link';
import { useState } from 'react';

const POSTS_PER_PAGE = 5;

type PostIndexItem = {
  slug: string;
  title: string;
  date: string;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ul className="post-list">
        {visiblePosts.map((post) => (
          <li key={post.slug}>
            <Link className="post-list-item" href={post.href}>
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
          {currentPage > 1 ? (
            <button
              type="button"
              className="pagination-link pagination-step"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Prev
            </button>
          ) : (
            <span className="pagination-link pagination-step is-disabled">Prev</span>
          )}

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  className={`pagination-link${page === currentPage ? ' is-current' : ''}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {currentPage < totalPages ? (
            <button
              type="button"
              className="pagination-link pagination-step"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </button>
          ) : (
            <span className="pagination-link pagination-step is-disabled">Next</span>
          )}
        </nav>
      ) : null}
    </>
  );
}
