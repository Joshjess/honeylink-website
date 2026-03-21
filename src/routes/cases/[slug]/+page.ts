import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/cases/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata,
			seo: {
				title: `${post.metadata.title} | HoneyLink`,
				description: post.metadata.excerpt,
				image: `https://honeylink.nl${post.metadata.image}`,
				type: 'article'
			}
		};
	} catch {
		error(404, `Case study niet gevonden: ${params.slug}`);
	}
};
