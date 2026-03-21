<script lang="ts">
	import ProseContent from '$lib/components/content/ProseContent.svelte';
	import { JsonLd } from 'svelte-meta-tags';

	let { data } = $props();

	const ContentComponent = $derived(data.content);
</script>

<JsonLd schema={{
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honeylink.nl' },
		{ '@type': 'ListItem', position: 2, name: 'Algemene Voorwaarden' }
	]
}} />

<div class="bg-white">
	<!-- Header -->
	<div class="pt-20 md:pt-28 lg:pt-36 pb-8 text-center px-4">
		<h1
			class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-brand-black"
		>
			{data.meta.title}
		</h1>
		{#if data.meta.lastUpdated}
			<p class="text-sm text-brand-gray-dark text-center mt-4">
				Laatst bijgewerkt: {data.meta.lastUpdated}
			</p>
		{/if}
	</div>

	<!-- Prose body -->
	<div class="px-4 pb-16 md:pb-24">
		<ProseContent maxWidth="legal">
			<ContentComponent />
		</ProseContent>
	</div>
</div>
