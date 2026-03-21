<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section
	use:inview
	class="px-4 py-16 md:py-24 bg-brand-gold opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-3xl text-center">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black"
		>
			Verbeter je bedrijfsproces vandaag nog
		</h2>
		<p class="text-lg text-brand-gray-dark mb-10 max-w-xl mx-auto">
			Meer weten over wat HoneyLink voor jouw bedrijf kan betekenen? Druk dan op knop hieronder!
		</p>
		<Button href="/contact" variant="primary" size="lg">Plan gratis adviesgesprek</Button>
	</div>
</section>
