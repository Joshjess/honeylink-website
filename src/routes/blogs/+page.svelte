<script lang="ts">
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import PageHero from '$lib/components/ui/PageHero.svelte';
	import { JsonLd } from 'svelte-meta-tags';

	let { data } = $props();
</script>

<JsonLd schema={{
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honeylink.nl' },
		{ '@type': 'ListItem', position: 2, name: 'Blogs' }
	]
}} />

<PageHero title="Blogs" />

{#if data.posts.length === 0}
	<div class="mx-auto max-w-7xl px-4 py-16 text-center">
		<h2 class="font-heading text-2xl font-bold text-brand-black mb-4">
			Nog geen blogs gepubliceerd
		</h2>
		<p class="text-brand-gray-dark">
			We zijn druk bezig met het schrijven van nieuwe content. Kom binnenkort terug!
		</p>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 pb-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</div>
{/if}

<CtaSection />
