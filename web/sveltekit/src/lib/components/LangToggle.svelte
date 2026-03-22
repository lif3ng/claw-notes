<script lang="ts">
  import { lang } from '$lib/lang'
</script>

<div class="lang-toggle">
  <button
    class="lang-btn"
    class:active={$lang === 'zh'}
    on:click={() => lang.set('zh')}
  >中</button>
  <button
    class="lang-btn"
    class:active={$lang === 'en'}
    on:click={() => lang.set('en')}
  >EN</button>
</div>
