import { getAllStaticParams, getPost } from '@/lib/content';
import PostDetailClient from './PostDetailClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { year: string; slug: string };
}

export async function generateStaticParams() {
  return getAllStaticParams();
}

export default function PostPage({ params }: PageProps) {
  const post = getPost(params.year, params.slug);
  if (!post) notFound();
  return <PostDetailClient post={post} />;
}
