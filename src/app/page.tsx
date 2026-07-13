import { PostIndex } from '@/app/post-index';
import { postPath, withBasePath } from '@/lib/paths';
import { formatDate, getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts().map((post) => ({
    ...post,
    href: postPath(post.slug),
    formattedDate: formatDate(post.date),
  }));

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

        <PostIndex posts={posts} />
      </section>
    </div>
  );
}
