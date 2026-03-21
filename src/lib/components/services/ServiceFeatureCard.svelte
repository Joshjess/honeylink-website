<script lang="ts">
	let {
		title,
		description,
		accentColor = 'bg-accent-purple'
	}: {
		title: string;
		description: string;
		accentColor?: string;
	} = $props();
</script>

<div class="rounded-2xl p-8 {accentColor}">
	<h3 class="font-heading text-lg font-bold text-brand-black mb-3">
		{title}
	</h3>
	<p class="text-brand-gray-dark leading-relaxed">{description}</p>
</div>
