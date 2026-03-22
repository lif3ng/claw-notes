<template>
  <button class="lang-toggle" @click="toggle">
    {{ currentLang === 'zh' ? 'EN' : '中文' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const LANG_KEY = 'claw-notes-lang'
const currentLang = ref('zh')

onMounted(() => {
  currentLang.value = localStorage.getItem(LANG_KEY) || 'zh'
  applyLang(currentLang.value)
})

function toggle() {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem(LANG_KEY, currentLang.value)
  applyLang(currentLang.value)
}

function applyLang(lang: string) {
  document.documentElement.setAttribute('data-lang', lang)
}
</script>

<style scoped>
.lang-toggle {
  padding: 4px 12px;
  border: 1px solid var(--c-border, #ddd);
  border-radius: 4px;
  background: var(--c-bg, #fff);
  color: var(--c-text, #333);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}
.lang-toggle:hover {
  background: var(--c-brand, #3eaf7c);
  color: #fff;
  border-color: var(--c-brand, #3eaf7c);
}
</style>
