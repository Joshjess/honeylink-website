<script lang="ts">
	import type { BlogPost } from '$lib/types';

	let {
		post
	}: {
		post: BlogPost;
	} = $props();

	const formattedDate = $derived(
		new Date(post.date).toLocaleDateString('nl-NL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<a
	href="/blogs/{post.slug}"
	class="rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 block"
>
	<img
		src={post.image}
		alt={post.title}
		class="aspect-video w-full object-cover"
	/>
	<div class="bg-white p-6">
		<p class="text-sm text-brand-gray-dark mb-2">{formattedDate}</p>
		<h3 class="font-heading text-lg font-bold text-brand-black line-clamp-2 mb-2">
			{post.title}
		</h3>
		<p class="text-sm text-brand-gray-dark line-clamp-3">{post.excerpt}</p>
	</div>
</a>
