<script lang="ts">
	let {
		name,
		role,
		image
	}: {
		name: string;
		role: string;
		image: string;
	} = $props();
</script>

<div>
	<img
		src={image}
		alt={name}
		class="rounded-2xl aspect-square object-cover w-full max-w-xs"
	/>
	<p class="font-heading font-bold text-brand-black mt-4">{name}</p>
	<p class="text-sm text-brand-gray-dark">{role}</p>
</div>
