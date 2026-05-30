import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';
import { getBlogPosts, getCases } from '$lib/server/content';
import { termsConditionsArchiveVersions } from '$lib/data/legal';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const blogSlugs = getBlogPosts().map((p) => p.slug);
	const caseSlugs = getCases().map((c) => c.slug);
	const termsConditionVersions = termsConditionsArchiveVersions.map((version) => version.slug);

	return await sitemap.response({
		origin: 'https://honeylink.nl',
		paramValues: {
			'/blogs/[slug]': blogSlugs,
			'/cases/[slug]': caseSlugs,
			'/terms-conditions/[version]': termsConditionVersions
		},
		excludeRoutePatterns: ['^/sitemap\\.xml$']
	});
};
