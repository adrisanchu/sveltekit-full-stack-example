<script lang="ts">
	import Tweet from '$root/components/tweet.svelte';
	import type { TweetType } from '$root/types';
	import type { PageData } from './$types';

	export let data: PageData;
	// load tweets from DB
	const tweets: TweetType[] = data.tweets;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Feed</h1>

{#if tweets.length === 0}
	<p>No tweets to display</p>
{:else}
	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
{/if}

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
