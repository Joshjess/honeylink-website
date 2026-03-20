<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
	<h1 class="font-heading text-6xl font-bold mb-4">{page.status}</h1>
	<p class="text-xl text-brand-gray-dark mb-8">{page.error?.message ?? 'Pagina niet gevonden'}</p>
	<a href="/" class="bg-brand-black text-white px-6 py-3 rounded-lg hover:bg-brand-purple transition-colors">
		Terug naar home
	</a>
</div>
