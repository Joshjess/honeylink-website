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

		<!-- This is the clip boundary -->
		<div class="marquee-wrapper">
			<!-- Fade edges -->
			<div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-white to-transparent z-10"></div>
			<div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-white to-transparent z-10"></div>

			<div class="marquee-track">
				<div class="marquee-group">
					{#each clients as client}
						<img
							src={client.logo}
							alt="Logo {client.name}"
							class="h-8 md:h-10 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						/>
					{/each}
				</div>
				<div class="marquee-group" aria-hidden="true">
					{#each clients as client}
						<img
							src={client.logo}
							alt="Logo {client.name}"
							class="h-8 md:h-10 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.marquee-wrapper {
		position: relative;
		overflow: hidden;
	}

	.marquee-track {
		display: flex;
		animation: marquee 25s linear infinite;
	}

	.marquee-track:hover {
		animation-play-state: paused;
	}

	.marquee-group {
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 2rem;
		padding: 0 2rem;
		flex-shrink: 0;
		/* Each group must be exactly the width of the clipping container */
		min-width: 100%;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
