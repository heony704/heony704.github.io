import Link from 'next/link';
import { postPath, withBasePath } from '@/lib/paths';
import { formatDate, getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="page-shell">
      <section className="home-hero">
        <img src={withBasePath('/banner/maxwell-cat.gif')} alt="Maxwell cat" />
      </section>

      <section className="post-index" aria-labelledby="post-heading-title">
        <div className="post-heading">
          <h2 className="post-heading-title" id="post-heading-title">
            전체 게시글
          </h2>
          <span className="post-heading-posts">{posts.length} posts</span>
        </div>

        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link className="post-list-item" href={postPath(post.slug)}>
                <span className="post-list-title">{post.title}</span>
                {post.excerpt ? <p className="post-list-content">{post.excerpt}</p> : null}
                <time className="post-list-time" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
