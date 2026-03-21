<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const clients = [
		{ name: 'OWL', logo: '/images/clients/owl.webp' },
		{ name: 'Wan2Connect', logo: '/images/clients/wan2connect.png' },
		{ name: 'Isolidify', logo: '/images/clients/isolidify.png' },
		{ name: 'Goochem Media', logo: '/images/clients/goochem-media.png' },
		{ name: 'Webfabrikant', logo: '/images/clients/webfabrikant.svg' },
		{ name: 'Novus Arte', logo: '/images/clients/novus-arte.png' }
	];
</script>

<section
	use:inview
	class="px-4 py-12 md:py-16 bg-brand-white opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
	<div class="mx-auto max-w-7xl">
		<p class="text-center text-sm font-medium text-brand-gray-dark mb-8">
			Vertrouwd door ondernemers
		</p>
		<div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
			{#each clients as client}
				<img
					src={client.logo}
					alt="Logo {client.name}"
					class="h-8 md:h-10 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
				/>
			{/each}
		</div>
	</div>
</section>
