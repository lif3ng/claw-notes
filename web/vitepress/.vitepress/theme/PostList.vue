<template>
  <div class="post-list">
    <ul>
      <li v-for="post in posts" :key="post.slug" class="post-item">
        <a :href="`${base}posts/${post.slug}.html`">
          <span class="post-title lang-zh-inline">{{ post.title_zh }}</span>
          <span class="post-title lang-en-inline">{{ post.title_en }}</span>
        </a>
        <span class="post-date">{{ post.date }}</span>
        <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const base = '/web/vitepress/'

interface Post {
  slug: string
  date: string
  title_zh: string
  title_en: string
  tags: string[]
}

const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const res = await fetch(`${base}posts-data.json`)
    if (res.ok) {
      posts.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to load posts-data.json', e)
  }
})
</script>

<style scoped>
.post-list ul {
  padding: 0;
  list-style: none;
}
.post-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-item a {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--vp-c-brand-1);
}
.post-item a:hover {
  text-decoration: underline;
}
.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  white-space: nowrap;
}
.post-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.75rem;
}
</style>
