<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
