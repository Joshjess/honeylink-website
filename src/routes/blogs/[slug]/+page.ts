import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

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
			}
		};
	} catch {
		error(404, `Blog post niet gevonden: ${params.slug}`);
	}
};
