<script lang="ts">
	import type { NavLink } from "$lib/types";
	import { page } from "$app/state";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";

	let { links }: { links: NavLink[] } = $props();

	let openDropdown = $state<string | null>(null);

	function handleMouseEnter(label: string) {
		openDropdown = label;
	}

	function handleMouseLeave() {
		openDropdown = null;
	}
</script>

<nav class="hidden md:flex items-center gap-1">
	{#each links as link}
		{#if link.children && link.children.length > 0}
			<div
				class="relative"
				onmouseenter={() => handleMouseEnter(link.label)}
				onmouseleave={handleMouseLeave}
				role="presentation"
			>
				<button
					class="px-3 py-2 text-lg font-medium text-brand-gray-dark hover:text-brand-black transition-colors rounded-md"
					aria-expanded={openDropdown === link.label}
				>
					{link.label}
					<ChevronDown class="inline-block w-4 h-4 ml-1" />
				</button>
				{#if openDropdown === link.label}
					<div
						class="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
					>
						{#each link.children as child}
							<a
								href={child.href}
								class="block px-4 py-2 text-lg text-brand-gray-dark hover:bg-brand-gray-light hover:text-brand-black transition-colors"
								class:text-brand-purple={page.url.pathname ===
									child.href}
							>
								{child.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<a
				href={link.href}
				class="px-3 py-2 text-lg font-medium text-brand-gray-dark hover:text-brand-black transition-colors rounded-md"
				class:text-brand-purple={page.url.pathname === link.href}
			>
				{link.label}
			</a>
		{/if}
	{/each}
</nav>
