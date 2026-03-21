<script lang="ts">
	import PageHero from '$lib/components/ui/PageHero.svelte';
	import TeamMember from '$lib/components/about/TeamMember.svelte';
	import FaqAccordion from '$lib/components/ui/FaqAccordion.svelte';
	import CtaSection from '$lib/components/homepage/CtaSection.svelte';
	import { inview } from '$lib/actions/inview';
	import {
		missionHeading,
		missionParagraphs,
		missionSubtext,
		teamMembers,
		faqItems
	} from '$lib/data/about';
</script>

<PageHero title="Over HoneyLink" />

<!-- Mission section -->
<section
	use:inview
	class="bg-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
		<div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
			<div>
				<img
					src="/images/about/team-office.jpg"
					alt="HoneyLink team aan het werk"
					class="rounded-2xl w-full h-auto"
				/>
			</div>
			<div class="mt-8 lg:mt-0">
				<h2
					class="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-6"
				>
					{missionHeading}
				</h2>
				{#each missionParagraphs as paragraph}
					<p class="text-brand-gray-dark leading-relaxed mb-4">
						{paragraph}
					</p>
				{/each}
				<p class="text-brand-purple font-heading font-bold mt-6 border-l-4 border-brand-gold pl-4">
					{missionSubtext}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Team section -->
<section
	use:inview
	class="bg-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl px-4 py-16 md:py-24">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
		>
			De bezige bijen van HoneyLink
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
			{#each teamMembers as member}
				<TeamMember name={member.name} role={member.role} image={member.image} />
			{/each}
		</div>
	</div>
</section>

<!-- FAQ section -->
<FaqAccordion items={faqItems} />

<!-- CTA section -->
<CtaSection />
