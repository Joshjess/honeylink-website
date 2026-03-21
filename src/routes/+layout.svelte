<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children, data }: { children: Snippet; data: any } = $props();

	let seoTitle = $derived(
		$page.data.seo?.title ?? `${data.siteConfig.name} | Automation en AI Agency`
	);
	let seoDescription = $derived(
		$page.data.seo?.description ?? data.siteConfig.description
	);
	let canonicalUrl = $derived(
		`${data.siteConfig.url}${$page.url.pathname}`
	);
	let ogImage = $derived(
		$page.data.seo?.image ?? `${data.siteConfig.url}/images/og-default.jpg`
	);
	let ogType = $derived(
		$page.data.seo?.type ?? 'website'
	);
</script>

<MetaTags
	title={seoTitle}
	description={seoDescription}
	canonical={canonicalUrl}
	openGraph={{
		type: ogType,
		url: canonicalUrl,
		title: seoTitle,
		description: seoDescription,
		siteName: data.siteConfig.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: seoTitle
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: seoTitle,
		description: seoDescription,
		image: ogImage
	}}
/>

<div class="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
