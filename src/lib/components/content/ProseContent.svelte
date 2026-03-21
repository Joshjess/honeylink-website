<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		maxWidth = 'prose'
	}: {
		children: Snippet;
		maxWidth?: 'prose' | 'legal';
	} = $props();

	const widthClass = $derived(maxWidth === 'legal' ? 'max-w-4xl' : 'max-w-3xl');
</script>

<div class="prose-content mx-auto {widthClass}">
	{@render children()}
</div>

<style>
	.prose-content :global(h2) {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-brand-black);
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		.prose-content :global(h2) {
			font-size: 1.875rem;
			line-height: 2.25rem;
		}
	}

	.prose-content :global(h3) {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-brand-black);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	@media (min-width: 768px) {
		.prose-content :global(h3) {
			font-size: 1.5rem;
			line-height: 2rem;
		}
	}

	.prose-content :global(h4) {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-brand-black);
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.prose-content :global(p) {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-brand-gray-dark);
		margin-bottom: 1.5rem;
	}

	.prose-content :global(ul) {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-brand-gray-dark);
		margin-bottom: 1.5rem;
		margin-left: 1.5rem;
		list-style-type: disc;
	}

	.prose-content :global(ol) {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-brand-gray-dark);
		margin-bottom: 1.5rem;
		margin-left: 1.5rem;
		list-style-type: decimal;
	}

	.prose-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.prose-content :global(blockquote) {
		border-left: 4px solid var(--color-brand-purple);
		padding-left: 1.5rem;
		font-style: italic;
		font-size: 1.125rem;
		color: var(--color-brand-gray-dark);
		margin-bottom: 1.5rem;
	}

	.prose-content :global(a) {
		color: var(--color-brand-purple);
		text-decoration: underline;
		transition: color 0.2s;
	}

	.prose-content :global(a:hover) {
		color: var(--color-brand-black);
	}

	.prose-content :global(code) {
		font-family: var(--font-mono);
		background-color: var(--color-brand-gray-light);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 1rem;
	}

	.prose-content :global(pre) {
		background-color: var(--color-brand-black);
		padding: 1.5rem;
		border-radius: 0.75rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}

	.prose-content :global(pre code) {
		font-family: var(--font-mono);
		background-color: transparent;
		padding: 0;
		border-radius: 0;
		color: white;
		font-size: 1rem;
	}

	.prose-content :global(img) {
		border-radius: 0.75rem;
		width: 100%;
		height: auto;
		margin-bottom: 1.5rem;
	}

	.prose-content :global(hr) {
		border: none;
		border-top: 1px solid #e5e7eb;
		margin: 2rem 0;
	}

	.prose-content :global(strong) {
		font-weight: 700;
		color: var(--color-brand-black);
	}
</style>
