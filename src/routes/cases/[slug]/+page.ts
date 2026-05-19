import { error } from '@sveltejs/kit';
import { getCaseHero, pictureToOgUrl } from '$lib/assets/heroes';
import type { PageLoad } from './$types';

export const prerender = true;

const SITE_URL = 'https://honeylink.nl';

export function entries() {
	const modules = import.meta.glob('/src/content/cases/*.md', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/cases/${params.slug}.md`);
		const heroPicture = getCaseHero(post.metadata.image);
		// Prefer the optimized hero asset URL for OG; fall back to og-default.jpg
		// when no hero picture is resolvable (keeps social previews working).
		const ogImage = pictureToOgUrl(heroPicture, SITE_URL) ?? `${SITE_URL}/images/og-default.jpg`;
		return {
			content: post.default,
			meta: post.metadata,
			heroPicture,
			seo: {
				title: `${post.metadata.title} | HoneyLink`,
				description: post.metadata.excerpt,
				image: ogImage,
				type: 'article'
			}
		};
	} catch {
		error(404, `Case study niet gevonden: ${params.slug}`);
	}
};
