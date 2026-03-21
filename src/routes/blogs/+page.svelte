<script lang="ts">
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import PageHero from '$lib/components/ui/PageHero.svelte';
	import { inview } from '$lib/actions/inview';

	let { data } = $props();
</script>

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
	<div
		use:inview
		class="mx-auto max-w-7xl px-4 pb-16 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
	>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</div>
{/if}

<CtaSection />
