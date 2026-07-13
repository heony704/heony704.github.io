'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

const POSTS_PER_PAGE = 5;

type OtherPostItem = {
  slug: string;
  title: string;
  date: string;
  href: string;
  formattedDate: string;
};

type OtherPostsProps = {
  currentSlug: string;
  posts: OtherPostItem[];
};

export function OtherPosts({ currentSlug, posts }: OtherPostsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPostIndex = posts.findIndex((post) => post.slug === currentSlug);
  const initialPage =
    currentPostIndex === -1 ? 1 : Math.floor(currentPostIndex / POSTS_PER_PAGE) + 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="other-posts" aria-labelledby="other-posts-title" ref={sectionRef}>
      <h2 className="other-posts-title" id="other-posts-title">
        다른 글
      </h2>
      <ul>
        {visiblePosts.map((post) => {
          const isCurrent = post.slug === currentSlug;

          return (
            <li key={post.slug}>
              {isCurrent ? (
                <div className="other-posts-item other-posts-current" aria-current="page">
                  <span className="other-posts-item-title">{post.title}</span>
                  <time dateTime={post.date}>{post.formattedDate}</time>
                  <span className="other-posts-current-label">현재 글</span>
                </div>
              ) : (
                <Link className="other-posts-item" href={post.href}>
                  <span className="other-posts-item-title">{post.title}</span>
                  <time dateTime={post.date}>{post.formattedDate}</time>
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {totalPages > 1 ? (
        <nav className="pagination" aria-label="Other posts pagination">
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
    </section>
  );
}
