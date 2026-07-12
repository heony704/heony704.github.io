import Link from 'next/link';
import { postPath } from '@/lib/paths';
import { formatDate, getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="page-shell">
      <section className="home-hero">
        <p>안녕하세요~~ 여기는 이미지 자리</p>
      </section>

      <section className="post-index" aria-labelledby="post-index-title">
        <div className="post-heading">
          <h2 className="post-heading-title" id="post-index-title">
            전체 게시글
          </h2>
          <span className="post-heading-posts">{posts.length} posts</span>
        </div>

        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-list-item">
              <Link href={postPath(post.slug)}>
                <span className="post-list-title">{post.title}</span>
                <time className="post-list-time" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                {post.excerpt ? <p className="post-list-content">{post.excerpt}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
