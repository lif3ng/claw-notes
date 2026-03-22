import { getPost } from '$lib/content'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ params }) => {
  const post = getPost(params.year, params.slug)
  if (!post) {
    throw error(404, 'Post not found')
  }
  return { post }
}
