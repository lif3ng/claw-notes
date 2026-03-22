'use client';

import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import type { Post } from '@/lib/content';
import { marked } from 'marked';

interface PostDetailClientProps {
  post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const { lang } = useLang();

  const title = lang === 'zh' ? post.title_zh : post.title_en;
  const rawContent = lang === 'zh' ? post.contentZh : post.contentEn;
  const html = marked.parse(rawContent) as string;

  return (
    <article>
      <header className="mb-8">
        <h1 className="font-serif text-2xl font-bold mb-2">{title}</h1>
        <div className="font-mono text-sm text-gray-500 flex items-center gap-3">
          <time>{post.date}</time>
          {post.tags.map((tag) => (
            <span key={tag} className="border border-gray-300 px-1.5 py-0.5 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/" className="font-mono text-sm">
          &larr; {lang === 'zh' ? '返回列表' : 'Back to list'}
        </Link>
      </footer>
    </article>
  );
}
