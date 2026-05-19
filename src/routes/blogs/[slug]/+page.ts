import { error } from '@sveltejs/kit';
import { getBlogHero, pictureToOgUrl } from '$lib/assets/heroes';
import type { PageLoad } from './$types';

export const prerender = true;

const SITE_URL = 'https://honeylink.nl';

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
		const heroPicture = getBlogHero(params.slug);
		const ogImage = pictureToOgUrl(heroPicture, SITE_URL) ?? `${SITE_URL}/images/og-default.jpg`;

		return {
			content: post.default,
			meta: {
				...post.metadata,
				readingTime: estimateReadingTime(raw.default)
			},
			heroPicture,
			seo: {
				title: `${post.metadata.title} | HoneyLink`,
				description: post.metadata.excerpt,
				image: ogImage,
				type: 'article'
			}
		};
	} catch {
		error(404, `Blog post niet gevonden: ${params.slug}`);
	}
};
