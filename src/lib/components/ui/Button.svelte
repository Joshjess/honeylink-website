<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href = '',
		variant = 'primary',
		size = 'md',
		children,
		onclick,
		type = 'button',
		class: extraClass = '',
		...restProps
	}: {
		href?: string;
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
		onclick?: (e: MouseEvent) => void;
		type?: 'button' | 'submit';
		class?: string;
		[key: string]: unknown;
	} = $props();

	const baseClasses =
		'inline-flex items-center justify-center font-accent font-medium rounded-lg transition-colors duration-200';

	const variantClasses: Record<string, string> = {
		primary: 'bg-brand-black text-white hover:bg-brand-purple',
		secondary: 'bg-brand-purple text-white hover:bg-brand-black',
		outline:
			'border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white'
	};

	const sizeClasses: Record<string, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};
</script>

{#if href}
	<a {href} class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {extraClass}" {...restProps}>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {extraClass}"
		{onclick}
		{...restProps}
	>
		{@render children()}
	</button>
{/if}
