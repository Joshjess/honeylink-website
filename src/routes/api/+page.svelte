<script lang="ts">
	import { pageData } from '$lib/data/services/api';
	import PageHero from '$lib/components/ui/PageHero.svelte';
	import ServiceFeatureCard from '$lib/components/services/ServiceFeatureCard.svelte';
	import FaqAccordion from '$lib/components/ui/FaqAccordion.svelte';
	import TestimonialsSection from '$lib/components/homepage/TestimonialsSection.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { inview } from '$lib/actions/inview';
</script>

<PageHero title={pageData.title} subtitle={pageData.subtitle} goldBackground={true} />

{#each pageData.sections as section}
	{#if section.type === 'value-proposition'}
		<section
			use:inview
			class="bg-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
		>
			<div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
				{#if section.image}
					<div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
						<div>
							<h2
								class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6"
							>
								{section.heading}
							</h2>
							<p class="text-lg text-brand-gray-dark leading-relaxed">{section.body}</p>
						</div>
						<div>
							<img
								src={section.image}
								alt={section.heading}
								class="rounded-2xl w-full h-auto"
							/>
						</div>
					</div>
				{:else}
					<h2
						class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6"
					>
						{section.heading}
					</h2>
					<p class="text-lg text-brand-gray-dark leading-relaxed max-w-3xl">
						{section.body}
					</p>
				{/if}
			</div>
		</section>
	{:else if section.type === 'features'}
		<section
			use:inview
			class="bg-brand-gray-light opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
		>
			<div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
				<h2
					class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
				>
					{section.heading}
				</h2>
				{#if section.body}
					<p class="text-lg text-brand-gray-dark text-center max-w-3xl mx-auto mb-12">
						{section.body}
					</p>
				{/if}
				{#if section.items}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#each section.items as item}
							<ServiceFeatureCard
								title={item.title}
								description={item.description}
								accentColor={item.accentColor}
							/>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{:else if section.type === 'examples'}
		<section
			use:inview
			class="bg-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
		>
			<div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
				<h2
					class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-8"
				>
					{section.heading}
				</h2>
				{#if section.body}
					<p class="text-lg text-brand-gray-dark leading-relaxed mb-8">{section.body}</p>
				{/if}
				{#if section.items}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#each section.items as item}
							<div class="rounded-2xl bg-brand-gray-light p-8">
								<h3 class="font-heading font-bold text-brand-black mb-2">
									{item.title}
								</h3>
								<p class="text-brand-gray-dark leading-relaxed">{item.description}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}
{/each}

<section
	use:inview
	class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-3xl px-4 py-8">
		<div class="bg-brand-gold rounded-2xl p-8 text-center">
			<h4 class="font-heading text-xl md:text-2xl font-bold text-brand-black mb-4">
				Nieuwsgierig? We vertellen je graag meer!
			</h4>
			<Button href="/contact" variant="primary" size="md">Neem contact op</Button>
		</div>
	</div>
</section>

<TestimonialsSection />

<FaqAccordion items={pageData.faq} />

<CtaSection />
