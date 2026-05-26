<script lang="ts">
	import { footerLinks, socialLinks } from '$lib/data/navigation';
</script>

<footer class="bg-brand-black text-white">
	<div class="mx-auto max-w-7xl px-4 py-12 md:py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
			<!-- Column 1: Company info -->
			<div>
				<a href="/" class="inline-block mb-4">
					<span class="font-heading text-xl font-bold">HoneyLink</span>
				</a>
				<p class="text-gray-400 text-sm leading-relaxed">
					Van implementatie naar effici&euml;ntie
				</p>
				<!-- Social links -->
				{#if socialLinks.length > 0}
					<div class="flex items-center gap-3 mt-6">
						{#each socialLinks as social}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.platform}
								class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
							>
								{#if social.icon === 'linkedin'}
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
										/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Dynamic link columns from footerLinks data -->
			{#each footerLinks as column}
				<div>
					<h3 class="font-heading font-bold text-sm uppercase tracking-wider mb-4">
						{column.heading}
					</h3>
					<ul class="space-y-2">
						{#each column.links as link}
							<li>
								<a
									href={link.href}
									class="text-gray-400 text-sm hover:text-white transition-colors"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom bar -->
		<div
			class="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
		>
			<p class="text-gray-500 text-sm">
				&copy; {new Date().getFullYear()} HoneyLink. All rights reserved.
			</p>
			<div class="flex items-center gap-4">
				<a
					href="/terms-conditions"
					class="text-gray-500 text-sm hover:text-white transition-colors">Voorwaarden</a
				>
				<a
					href="/betalings-voorwaarden"
					class="text-gray-500 text-sm hover:text-white transition-colors"
					>Betalingsvoorwaarden</a
				>
				<a
					href="/privacy-policy"
					class="text-gray-500 text-sm hover:text-white transition-colors">Privacy</a
				>
			</div>
		</div>
	</div>
</footer>
