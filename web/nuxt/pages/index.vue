<template>
  <div>
    <h1 class="page-title">{{ lang === 'zh' ? '日记' : 'Journal' }}</h1>
    <ul class="post-list">
      <PostCard v-for="post in posts" :key="`${post.year}/${post.slug}`" :post="post" />
    </ul>
    <p v-if="!posts.length" style="color: var(--color-muted)">
      {{ lang === 'zh' ? '暂无文章' : 'No posts yet.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PostMeta } from '~/server/api/posts.get'

const { lang } = useLang()

const { data: posts } = await useFetch<PostMeta[]>('/api/posts')
</script>
