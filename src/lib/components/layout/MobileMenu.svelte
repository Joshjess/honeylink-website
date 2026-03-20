<script lang="ts">
	import type { NavLink } from '$lib/types';
	import Button from '$lib/components/ui/Button.svelte';

	let {
		open,
		links,
		onclose
	}: {
		open: boolean;
		links: NavLink[];
		onclose: () => void;
	} = $props();

	let expandedGroup = $state<string | null>(null);

	function toggleGroup(label: string) {
		expandedGroup = expandedGroup === label ? null : label;
	}
</script>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 bg-black/50 z-40 md:hidden" onclick={onclose} role="presentation">
	</div>

	<!-- Slide-out panel -->
	<div
		class="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
	>
		<div class="flex items-center justify-between p-4 border-b border-gray-100">
			<span class="font-heading font-bold text-lg">Menu</span>
			<button
				onclick={onclose}
				class="p-2 hover:bg-brand-gray-light rounded-lg"
				aria-label="Menu sluiten"
			>
				<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<nav class="p-4 space-y-1">
			{#each links as link}
				{#if link.children && link.children.length > 0}
					<div>
						<button
							class="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-brand-gray-dark hover:bg-brand-gray-light rounded-lg"
							onclick={() => toggleGroup(link.label)}
						>
							{link.label}
							<svg
								class="w-5 h-5 transition-transform {expandedGroup === link.label
									? 'rotate-180'
									: ''}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{#if expandedGroup === link.label}
							<div class="ml-4 space-y-1">
								{#each link.children as child}
									<a
										href={child.href}
										class="block px-3 py-2 text-sm text-brand-gray-dark hover:text-brand-black hover:bg-brand-gray-light rounded-lg"
										onclick={onclose}
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
						class="block px-3 py-3 text-base font-medium text-brand-gray-dark hover:text-brand-black hover:bg-brand-gray-light rounded-lg"
						onclick={onclose}
					>
						{link.label}
					</a>
				{/if}
			{/each}

			<div class="pt-4 border-t border-gray-100 mt-4">
				<Button href="/contact" variant="primary" size="md">
					Plan gratis adviesgesprek
				</Button>
			</div>
		</nav>
	</div>
{/if}
