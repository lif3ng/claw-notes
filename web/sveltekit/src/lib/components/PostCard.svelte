<script lang="ts">
  import { base } from '$app/paths'
  import { lang } from '$lib/lang'
  import type { PostMeta } from '$lib/content'

  export let post: PostMeta
</script>

<li class="post-card">
  <a href="{base}/{post.year}/{post.slug}">
    <div class="post-card-title">
      {$lang === 'zh' ? post.title_zh : post.title_en}
    </div>
    <div class="post-card-date">{post.date}</div>
    {#if post.tags?.length}
      <div class="post-card-tags">
        {#each post.tags as tag}
          <span class="post-card-tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </a>
</li>
