<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import timoImg from '$lib/assets/testimonials/timo-wielink.jpeg?enhanced';
	import keanuImg from '$lib/assets/testimonials/keanu-westerman.png?enhanced';
	import jashaImg from '$lib/assets/testimonials/jasha-berkenbosch.webp?enhanced';

	type Testimonial = {
		quote: string;
		name: string;
		role: string;
		image: typeof timoImg;
		featured: boolean;
	};

	const testimonials: Testimonial[] = [
		{
			quote:
				'Met HoneyLink hebben we ons klant-onboarding proces flink kunnen verbeteren. Hun chatbot geeft onze klanten direct antwoord op vragen over onze hardware producten. Het systeem heeft toegang tot onze complete productkennis, wat het proces efficiënter maakt.',
			name: 'Timo Wielink',
			role: 'Co-Founder & Head Of Product at OWL',
			image: timoImg,
			featured: true
		},
		{
			quote:
				"HoneyLink's content automatisering bespaart ons tijd en stelt ons in staat om voor elke klant gepersonaliseerde artikelen te leveren.",
			name: 'Keanu Westerman',
			role: 'Founder - WebFabrikant',
			image: keanuImg,
			featured: false
		},
		{
			quote:
				'HoneyLink heeft onze talent-acquisitie volledig geautomatiseerd, waardoor ons team nu kan focussen op wat echt telt: het succesvol managen van onze kunstenaars.',
			name: 'Jasha Berkenbosch',
			role: 'Founder - Novus Arte',
			image: jashaImg,
			featured: false
		}
	];

	const featured = testimonials.find((t) => t.featured)!;
	const others = testimonials.filter((t) => !t.featured);
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

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Featured testimonial (larger, left side) -->
			<div class="rounded-2xl bg-brand-gold p-8 md:p-10 flex flex-col justify-between">
				<blockquote class="mb-8">
					<p class="text-lg md:text-xl font-medium leading-relaxed text-brand-black">
						&ldquo;{featured.quote}&rdquo;
					</p>
				</blockquote>
				<div class="flex items-center gap-4">
					<enhanced:img
						src={featured.image}
						alt={featured.name}
						sizes="48px"
						loading="lazy"
						decoding="async"
						class="w-12 h-12 rounded-full object-cover"
					/>
					<div>
						<p class="font-heading font-bold text-brand-black">{featured.name}</p>
						<p class="text-sm text-brand-gray-dark">{featured.role}</p>
					</div>
				</div>
			</div>

			<!-- Other testimonials (stacked, right side) -->
			<div class="flex flex-col gap-6">
				{#each others as testimonial}
					<div class="rounded-2xl bg-brand-gray-light p-6 md:p-8 flex flex-col justify-between flex-1">
						<blockquote class="mb-6">
							<p class="leading-relaxed text-brand-black">
								&ldquo;{testimonial.quote}&rdquo;
							</p>
						</blockquote>
						<div class="flex items-center gap-4">
							<enhanced:img
								src={testimonial.image}
								alt={testimonial.name}
								sizes="40px"
								loading="lazy"
								decoding="async"
								class="w-10 h-10 rounded-full object-cover"
							/>
							<div>
								<p class="font-heading font-bold text-sm text-brand-black">
									{testimonial.name}
								</p>
								<p class="text-xs text-brand-gray-dark">
									{testimonial.role}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
