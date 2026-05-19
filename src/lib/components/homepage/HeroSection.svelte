<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import heroImg from '$lib/assets/homepage/hero-illustration.png?enhanced';

	// Picture.img holds the fallback src (largest image in the fallback format).
	// Picture.sources is a Record<format, srcset>. We pick the fallback format's
	// srcset (or any modern format) for the preload's imagesrcset attribute.
	// Using the fallback format keeps the preload safe across browsers and
	// matches what the browser will actually fetch from the <img> fallback.
	const sourceFormats = Object.keys(heroImg.sources);
	// Prefer webp if present (good cross-browser support + small); else fall
	// back to the last source (which is conventionally the fallback format).
	const preferredFormat =
		sourceFormats.find((f) => f === 'webp') ?? sourceFormats[sourceFormats.length - 1];
	const preloadSrcset = preferredFormat ? heroImg.sources[preferredFormat] : '';
</script>

<svelte:head>
	{#if preloadSrcset}
		<link
			rel="preload"
			as="image"
			href={heroImg.img.src}
			imagesrcset={preloadSrcset}
			imagesizes="min(1280px, 100vw)"
			fetchpriority="high"
		/>
	{:else}
		<link rel="preload" as="image" href={heroImg.img.src} fetchpriority="high" />
	{/if}
</svelte:head>

<section class="relative overflow-hidden bg-brand-gold">
	<!-- Gradient: solid gold at top, fading to white at bottom -->
	<div class="absolute inset-0 bg-gradient-to-b from-brand-gold via-brand-gold to-brand-white"></div>

	<div class="relative px-4 pt-20 md:pt-28 lg:pt-36 pb-8 md:pb-12">
		<div class="mx-auto max-w-4xl text-center">
			<h1
				class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-brand-black"
			>
				Van implementatie<br />
				naar <span
					class="inline-block bg-brand-black text-brand-white px-3 py-1 rounded-lg -rotate-1"
					>effici&euml;ntie.</span
				>
			</h1>
			<p class="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto mb-10">
				Vlot, eenvoudig en resultaatgericht.
			</p>
			<Button href="/contact" variant="primary" size="lg">Plan gratis adviesgesprek</Button>
		</div>
	</div>

	<!-- Hero workflow illustration (LCP element -- eager, high priority) -->
	<div class="relative px-4 pb-12 md:pb-20">
		<div class="mx-auto max-w-5xl">
			<enhanced:img
				src={heroImg}
				alt="Workflow automatisering diagram"
				class="w-full h-auto"
				sizes="min(1280px, 100vw)"
				fetchpriority="high"
				decoding="async"
			/>
		</div>
	</div>
</section>
