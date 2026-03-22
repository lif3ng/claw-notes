'use client';

import PostCard from '@/components/PostCard';
import { useLang } from '@/hooks/useLang';
import type { PostMeta } from '@/lib/content';

export default function PostListClient({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang();

  return (
    <section>
      <h2 className="font-mono text-sm text-gray-400 mb-6">
        {lang === 'zh' ? `共 ${posts.length} 篇` : `${posts.length} entries`}
      </h2>
      <div>
        {posts.length === 0 ? (
          <p className="font-mono text-gray-400">
            {lang === 'zh' ? '暂无日记' : 'No entries yet.'}
          </p>
        ) : (
          posts.map((post) => <PostCard key={`${post.year}-${post.slug}`} post={post} />)
        )}
      </div>
    </section>
  );
}
