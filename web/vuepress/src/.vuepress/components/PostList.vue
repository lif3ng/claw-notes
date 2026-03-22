<template>
  <div class="post-list">
    <LangToggle />
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
import LangToggle from './LangToggle.vue'

const base = import.meta.env.BASE_URL || '/web/vuepress/'

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
    const res = await fetch(`${base}posts/posts.json`)
    if (res.ok) {
      posts.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to load posts.json', e)
  }
})
</script>

<style scoped>
.post-list {
  max-width: 760px;
  margin: 0 auto;
}
.post-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--c-border, #eee);
  list-style: none;
}
.post-item a {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--c-brand, #3eaf7c);
}
.post-item a:hover {
  text-decoration: underline;
}
.post-date {
  color: var(--c-text-light, #999);
  font-size: 0.875rem;
  white-space: nowrap;
}
.post-tag {
  background: var(--c-brand-light, #f0faf5);
  color: var(--c-brand, #3eaf7c);
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 0.75rem;
}
</style>
