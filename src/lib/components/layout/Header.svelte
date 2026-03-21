<script lang="ts">
	import Navigation from "./Navigation.svelte";
	import MobileMenu from "./MobileMenu.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { navigationLinks } from "$lib/data/navigation";

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header
	class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
>
	<div class="mx-auto max-w-7xl flex items-center justify-between px-4 py-5">
		<!-- Logo -->
		<a href="/" class="flex-shrink-0">
			<img src="/images/honeylink-logo.png" alt="HoneyLink" class="h-8 w-auto" />
		</a>

		<!-- Desktop navigation -->
		<Navigation links={navigationLinks} />

		<!-- Desktop CTA -->
		<div class="hidden md:block">
			<Button href="/contact" variant="primary" size="md">
				Plan gratis adviesgesprek
			</Button>
		</div>

		<!-- Mobile hamburger button -->
		<button
			class="md:hidden p-2 rounded-lg hover:bg-brand-gray-light text-lg"
			onclick={toggleMenu}
			aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
			aria-expanded={menuOpen}
		>
			<svg
				class="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={menuOpen
						? "M6 18L18 6M6 6l12 12"
						: "M4 6h16M4 12h16M4 18h16"}
				/>
			</svg>
		</button>
	</div>
</header>

<MobileMenu open={menuOpen} links={navigationLinks} onclose={closeMenu} />
