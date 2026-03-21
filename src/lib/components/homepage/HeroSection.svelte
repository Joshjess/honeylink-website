<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section class="relative overflow-hidden px-4 py-20 md:py-28 lg:py-36 bg-brand-gold">
	<!-- Decorative gradient overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-brand-gold via-brand-gold/90 to-brand-gold/70"
	></div>

	<div class="relative mx-auto max-w-4xl text-center">
		<h1
			class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-brand-black"
		>
			Van implementatie naar <span
				class="inline-block bg-brand-black text-brand-white px-3 py-1 rounded-lg -rotate-1"
				>effici&euml;ntie.</span
			>
		</h1>
		<p class="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto mb-10">
			Vlot, eenvoudig en resultaatgericht.
		</p>
		<Button href="/contact" variant="primary" size="lg">Plan gratis adviesgesprek</Button>
	</div>
</section>
