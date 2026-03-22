import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	const modules = import.meta.glob('/src/content/blogs/*.md', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

function estimateReadingTime(text: string): number {
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / 200));
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/blogs/${params.slug}.md`);
		const raw = await import(`../../../content/blogs/${params.slug}.md?raw`);

		return {
			content: post.default,
			meta: {
				...post.metadata,
				readingTime: estimateReadingTime(raw.default)
			},
			seo: {
				title: `${post.metadata.title} | HoneyLink`,
				description: post.metadata.excerpt,
				image: `https://honeylink.nl${post.metadata.image}`,
				type: 'article'
			}
		};
	} catch {
		error(404, `Blog post niet gevonden: ${params.slug}`);
	}
};
