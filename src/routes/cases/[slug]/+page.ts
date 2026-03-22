import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	const modules = import.meta.glob('/src/content/cases/*.md', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

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
