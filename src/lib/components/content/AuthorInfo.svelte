<script lang="ts">
	let {
		author,
		authorImage,
		readingTime
	}: {
		author: string;
		authorImage: string;
		readingTime?: number;
	} = $props();
</script>

<div class="flex items-center gap-3 mb-8">
	<img
		src={authorImage}
		alt={author}
		class="w-10 h-10 rounded-full object-cover"
	/>
	<span class="text-sm text-brand-gray-dark">
		Door: {author}
		{#if readingTime}
			<span> &middot; {readingTime} min leestijd</span>
		{/if}
	</span>
</div>
