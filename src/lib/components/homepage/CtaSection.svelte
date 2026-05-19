<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section
	use:inview
	class="relative overflow-hidden opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<!-- Gold gradient background matching the hero -->
	<div class="absolute inset-0 bg-gradient-to-b from-brand-white via-brand-gold to-brand-gold"></div>

	<div class="relative px-4 py-16 md:py-24">
		<div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
			<!-- Text content -->
			<div class="text-center lg:text-left">
				<h2
					class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black"
				>
					Verbeter je bedrijfsproces vandaag nog
				</h2>
				<p class="text-lg text-brand-gray-dark mb-10 max-w-xl mx-auto lg:mx-0">
					Meer weten over wat HoneyLink voor jouw bedrijf kan betekenen? Druk dan op knop hieronder!
				</p>
				<Button href="/contact" variant="primary" size="lg">Plan gratis adviesgesprek</Button>
			</div>

			<!-- CTA image -->
			<div class="hidden lg:block">
				<enhanced:img
					src="$lib/assets/homepage/cta-bg.jpg"
					alt="HoneyLink team aan het werk"
					class="rounded-2xl w-full h-auto object-cover shadow-lg"
					sizes="100vw"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	</div>
</section>
