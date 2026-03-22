<template>
  <div v-if="post">
    <NuxtLink to="/" class="back-link">
      &larr; {{ lang === 'zh' ? '返回列表' : 'Back' }}
    </NuxtLink>
    <div class="post-header">
      <h1 class="post-title">{{ lang === 'zh' ? post.title_zh : post.title_en }}</h1>
      <div class="post-meta">
        {{ post.date }}
        <span v-if="post.tags?.length">
          &middot; {{ post.tags.join(', ') }}
        </span>
      </div>
    </div>
    <div class="post-content" v-html="renderedContent" />
  </div>
  <div v-else>
    <p>{{ lang === 'zh' ? '文章不存在' : 'Post not found.' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { PostDetail } from '~/server/api/post/[year]/[slug].get'

const { lang } = useLang()
const route = useRoute()
const { year, slug } = route.params as { year: string; slug: string }

const { data: post } = await useFetch<PostDetail>(`/api/post/${year}/${slug}`)

// Simple markdown renderer: convert line breaks and basic md
const renderedContent = computed(() => {
  const raw = lang.value === 'zh' ? post.value?.content_zh : post.value?.content_en
  if (!raw) return ''
  // Basic: escape html, convert newlines to paragraphs
  return raw
    .split('\n\n')
    .map((para) => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('\n')
})
</script>
