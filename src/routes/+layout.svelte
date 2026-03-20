<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white">
	<main class="flex-1">
		{@render children()}
	</main>
</div>
