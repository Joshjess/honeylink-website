<script lang="ts">
	import ProseContent from '$lib/components/content/ProseContent.svelte';
	import AuthorInfo from '$lib/components/content/AuthorInfo.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import { JsonLd } from 'svelte-meta-tags';

	let { data } = $props();

	const ContentComponent = $derived(data.content);

	const formattedDate = $derived(
		new Date(data.meta.date).toLocaleDateString('nl-NL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<JsonLd schema={{
	'@type': 'Article',
	headline: data.meta.title,
	author: { '@type': 'Person', name: data.meta.author },
	datePublished: data.meta.date,
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
		{ '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://honeylink.nl/blogs' },
		{ '@type': 'ListItem', position: 3, name: data.meta.title }
	]
}} />

<p class="text-sm font-normal text-brand-purple text-center pt-20 md:pt-28 lg:pt-36 mb-4">
	{formattedDate}
</p>

<h1
	class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-brand-black text-center max-w-4xl mx-auto mb-8 px-4"
>
	{data.meta.title}
</h1>

<div class="max-w-3xl mx-auto px-4 mb-8">
	<img
		src={data.meta.image}
		alt={data.meta.title}
		class="rounded-xl w-full h-auto"
	/>
</div>

<div class="max-w-3xl mx-auto px-4">
	<AuthorInfo
		author={data.meta.author}
		authorImage={data.meta.authorImage}
		readingTime={data.meta.readingTime}
	/>
</div>

<div class="px-4">
	<ProseContent>
		<ContentComponent />
	</ProseContent>
</div>

<CtaSection />
