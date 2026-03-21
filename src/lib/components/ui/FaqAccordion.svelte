<script lang="ts">
	import type { FaqItemData } from '$lib/types';
	import FaqItem from './FaqItem.svelte';

	let {
		items,
		heading = 'Veelgestelde vragen'
	}: {
		items: FaqItemData[];
		heading?: string;
	} = $props();
</script>

<section class="bg-brand-gray-light py-16 md:py-24 px-4">
	<div class="mx-auto max-w-3xl">
		<h2
			class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
		>
			{heading}
		</h2>
		{#each items as item}
			<FaqItem question={item.question} answer={item.answer} />
		{/each}
	</div>
</section>
