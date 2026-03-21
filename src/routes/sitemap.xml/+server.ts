import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';
import { getBlogPosts, getCases } from '$lib/server/content';

export const GET: RequestHandler = async () => {
	const blogSlugs = getBlogPosts().map((p) => p.slug);
	const caseSlugs = getCases().map((c) => c.slug);

	return await sitemap.response({
		origin: 'https://honeylink.nl',
		paramValues: {
			'/blogs/[slug]': blogSlugs,
			'/cases/[slug]': caseSlugs
		},
		excludeRoutePatterns: ['^/sitemap\\.xml$']
	});
};
