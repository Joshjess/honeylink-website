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
		{
			'@type': 'ListItem',
			position: 2,
			name: 'Algemene Voorwaarden',
			item: 'https://honeylink.nl/terms-conditions'
		},
		{
			'@type': 'ListItem',
			position: 3,
			name: data.archiveVersion?.label ?? 'Gearchiveerde algemene voorwaarden'
		}
	]
}} />

<div class="bg-white">
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
		<p class="text-sm text-brand-gray-dark text-center mt-3">
			Gearchiveerde versie. Bekijk de <a
				href={data.currentHref}
				class="text-brand-purple underline hover:text-brand-black">actuele algemene voorwaarden</a
			>.
		</p>
	</div>

	<div class="px-4 pb-16 md:pb-24">
		<ProseContent maxWidth="legal">
			<ContentComponent />

			<hr />

			<section aria-labelledby="current-terms-version">
				<h2 id="current-terms-version">Nieuwste versie</h2>
				<p>
					Dit is een gearchiveerde versie. Bekijk de
					<a href={data.currentHref}>actuele algemene voorwaarden</a>.
				</p>
			</section>
		</ProseContent>
	</div>
</div>
