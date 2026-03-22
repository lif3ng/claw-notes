import { getAllPosts } from '@/lib/content';
import PostListClient from './PostListClient';

export default function HomePage() {
  const posts = getAllPosts();
  return <PostListClient posts={posts} />;
}
