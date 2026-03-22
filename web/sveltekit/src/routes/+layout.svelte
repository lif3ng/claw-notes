<script lang="ts">
  import { base } from '$app/paths'
  import LangToggle from '$lib/components/LangToggle.svelte'
  import '../app.css'
</script>

<div class="app">
  <header class="site-header">
    <nav>
      <a href="{base}/" class="site-title">Claw Notes</a>
      <LangToggle />
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer class="site-footer">
    <p>Claw Notes &copy; 2026</p>
  </footer>
</div>
