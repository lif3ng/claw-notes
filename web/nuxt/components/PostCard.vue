<template>
  <li class="post-card">
    <NuxtLink :to="`/${post.year}/${post.slug}`">
      <div class="post-card-title">{{ lang === 'zh' ? post.title_zh : post.title_en }}</div>
      <div class="post-card-date">{{ post.date }}</div>
      <div v-if="post.tags?.length" class="post-card-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-card-tag">{{ tag }}</span>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { PostMeta } from '~/server/api/posts.get'

defineProps<{
  post: PostMeta
}>()

const { lang } = useLang()
</script>
