<script lang="ts">
	import ProseContent from '$lib/components/content/ProseContent.svelte';
	import AuthorInfo from '$lib/components/content/AuthorInfo.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import { JsonLd } from 'svelte-meta-tags';

	let { data } = $props();

	const ContentComponent = $derived(data.content);
</script>

<JsonLd schema={{
	'@type': 'Article',
	headline: data.meta.title,
	author: { '@type': 'Person', name: data.meta.author },
	image: `https://honeylink.nl${data.meta.image}`,
	publisher: {
		'@type': 'Organization',
		name: 'HoneyLink',
		logo: { '@type': 'ImageObject', url: 'https://honeylink.nl/images/logo.png' }
	}
}} />

<JsonLd schema={{
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honeylink.nl' },
		{ '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://honeylink.nl/cases' },
		{ '@type': 'ListItem', position: 3, name: data.meta.title }
	]
}} />

<h1
	class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-brand-black text-center max-w-4xl mx-auto mb-8 px-4 pt-20 md:pt-28 lg:pt-36"
>
	{data.meta.title}
</h1>

<div class="max-w-3xl mx-auto px-4 mb-8">
	<div class="bg-brand-gold rounded-xl overflow-hidden">
		<img
			src={data.meta.image}
			alt={data.meta.title}
			class="rounded-xl w-full h-auto"
		/>
	</div>
</div>

<div class="max-w-3xl mx-auto px-4">
	<AuthorInfo
		author={data.meta.author}
		authorImage={data.meta.authorImage}
	/>
</div>

<div class="px-4">
	<ProseContent>
		<ContentComponent />
	</ProseContent>
</div>

<CtaSection />
