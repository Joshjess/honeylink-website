<script lang="ts">
	let {
		title,
		subtitle,
		goldBackground = false
	}: {
		title: string;
		subtitle?: string;
		goldBackground?: boolean;
	} = $props();
</script>

<section
	class="pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 {goldBackground
		? 'bg-gradient-to-b from-brand-gold to-brand-white'
		: 'bg-brand-white'}"
>
	<div class="mx-auto max-w-7xl px-4 text-center">
		<h1
			class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-brand-black"
		>
			{title}
		</h1>
		{#if subtitle}
			<p class="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto text-center mt-6">
				{subtitle}
			</p>
		{/if}
	</div>
</section>
