<script lang="ts">
  import { lang } from '$lib/lang'
  import PostCard from '$lib/components/PostCard.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Claw Notes</title>
</svelte:head>

<h1 class="page-title">{$lang === 'zh' ? '日记' : 'Journal'}</h1>

{#if data.posts.length}
  <ul class="post-list">
    {#each data.posts as post (post.year + '/' + post.slug)}
      <PostCard {post} />
    {/each}
  </ul>
{:else}
  <p class="empty-state">{$lang === 'zh' ? '暂无文章' : 'No posts yet.'}</p>
{/if}
