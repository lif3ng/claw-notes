'use client';

import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import type { PostMeta } from '@/lib/content';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const { lang } = useLang();
  const title = lang === 'zh' ? post.title_zh : post.title_en;
  const href = `/web/nextjs/${post.year}/${post.slug}`;

  return (
    <article className="border-b border-gray-200 py-4">
      <Link href={`/${post.year}/${post.slug}`} className="group no-underline">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-lg font-bold group-hover:underline">
            {title}
          </h2>
          <time className="font-mono text-sm text-gray-500 shrink-0">
            {post.date}
          </time>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-1 flex gap-1.5 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-gray-300 px-1.5 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
