<template>
  <div class="lang-toggle">
    <button
      class="lang-btn"
      :class="{ active: lang === 'zh' }"
      @click="setLang('zh')"
    >中</button>
    <button
      class="lang-btn"
      :class="{ active: lang === 'en' }"
      @click="setLang('en')"
    >EN</button>
  </div>
</template>

<script setup lang="ts">
const { lang, setLang } = useLang()
</script>
