import { getBlogPosts } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const posts = getBlogPosts();
	return {
		posts,
		seo: {
			title: 'Blogs | HoneyLink',
			description:
				'Lees onze laatste artikelen over automatisering, AI-agents, chatbots en bedrijfsoptimalisatie.'
		}
	};
};
