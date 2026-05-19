<script lang="ts">
	import type { CaseStudy } from '$lib/types';

	let {
		caseStudy
	}: {
		caseStudy: CaseStudy;
	} = $props();
</script>

<a
	href="/cases/{caseStudy.slug}"
	class="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 block"
>
	{#if caseStudy.heroPicture}
		<enhanced:img
			src={caseStudy.heroPicture}
			alt={caseStudy.title}
			class="aspect-video w-full object-cover"
			sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
			loading="lazy"
			decoding="async"
		/>
	{:else if caseStudy.image}
		<img
			src={caseStudy.image}
			alt={caseStudy.title}
			class="aspect-video w-full object-cover"
			loading="lazy"
			decoding="async"
		/>
	{:else}
		<div class="bg-brand-gold aspect-video"></div>
	{/if}
	<div class="p-6">
		<h3 class="font-heading text-lg md:text-xl font-bold text-brand-black">
			{caseStudy.title}
		</h3>
	</div>
</a>
