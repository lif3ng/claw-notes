<script lang="ts">
  import { base } from '$app/paths'
  import { lang } from '$lib/lang'
  import type { PageData } from './$types'

  export let data: PageData

  $: post = data.post
  $: title = $lang === 'zh' ? post.title_zh : post.title_en
  $: rawContent = $lang === 'zh' ? post.content_zh : post.content_en

  // Simple markdown to basic HTML: paragraph wrapping
  $: renderedContent = rawContent
    .split('\n\n')
    .map((para: string) => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('\n')
</script>

<svelte:head>
  <title>{title} - Claw Notes</title>
</svelte:head>

<a href="{base}/" class="back-link">
  &larr; {$lang === 'zh' ? '返回列表' : 'Back'}
</a>

<div class="post-header">
  <h1 class="post-title">{title}</h1>
  <div class="post-meta">
    {post.date}
    {#if post.tags?.length}
      &middot; {post.tags.join(', ')}
    {/if}
  </div>
</div>

<div class="post-content">
  {@html renderedContent}
</div>
