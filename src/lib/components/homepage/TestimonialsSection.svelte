<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const testimonials = [
		{
			quote:
				'Met HoneyLink hebben we ons klant-onboarding proces flink kunnen verbeteren. Hun chatbot geeft onze klanten direct antwoord op vragen over onze hardware producten. Het systeem heeft toegang tot onze complete productkennis, wat het proces effici\u00ebnter maakt.',
			name: 'Timo Wielink',
			role: 'Co-Founder & Head Of Product at OWL',
			image: '/images/testimonials/timo-wielink.jpeg',
			featured: true
		},
		{
			quote:
				"HoneyLink's content automatisering bespaart ons tijd en stelt ons in staat om voor elke klant gepersonaliseerde artikelen te leveren.",
			name: 'Keanu Westerman',
			role: 'Founder - WebFabrikant',
			image: '/images/testimonials/keanu-westerman.png',
			featured: false
		},
		{
			quote:
				'HoneyLink heeft onze talent-acquisitie volledig geautomatiseerd, waardoor ons team nu kan focussen op wat echt telt: het succesvol managen van onze kunstenaars.',
			name: 'Jasha Berkenbosch',
			role: 'Founder - Novus Arte',
			image: '/images/testimonials/jasha-berkenbosch.webp',
			featured: false
		}
	];
</script>

<section
	use:inview
	class="px-4 py-16 md:py-24 bg-brand-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
		>
			Wat ondernemers zeggen
		</h2>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{#each testimonials as testimonial}
				<div
					class="rounded-2xl p-8 {testimonial.featured
						? 'bg-brand-gold lg:row-span-1'
						: 'bg-brand-gray-light'}"
				>
					<blockquote class="mb-6">
						<p
							class="text-brand-black {testimonial.featured
								? 'text-lg font-medium leading-relaxed'
								: 'leading-relaxed'}"
						>
							&ldquo;{testimonial.quote}&rdquo;
						</p>
					</blockquote>
					<div class="flex items-center gap-4">
						<img
							src={testimonial.image}
							alt={testimonial.name}
							class="w-12 h-12 rounded-full object-cover"
						/>
						<div>
							<p class="font-heading font-bold text-brand-black">
								{testimonial.name}
							</p>
							<p class="text-sm text-brand-gray-dark">
								{testimonial.role}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
