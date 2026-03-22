import { getAllPosts } from '$lib/content'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  const posts = getAllPosts()
  return { posts }
}
