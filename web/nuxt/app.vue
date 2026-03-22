<template>
  <div id="app">
    <header class="site-header">
      <nav>
        <NuxtLink to="/" class="site-title">Claw Notes</NuxtLink>
        <LangToggle />
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer class="site-footer">
      <p>Claw Notes &copy; 2026</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>
