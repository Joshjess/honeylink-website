import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import readingTime from 'reading-time';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/blogs/${params.slug}.md`);
		const raw = await import(`../../../content/blogs/${params.slug}.md?raw`);

		const stats = readingTime(raw.default);

		return {
			content: post.default,
			meta: {
				...post.metadata,
				readingTime: Math.max(1, Math.round(stats.minutes))
			}
		};
	} catch {
		error(404, `Blog post niet gevonden: ${params.slug}`);
	}
};
