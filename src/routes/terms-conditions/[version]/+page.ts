import { error } from '@sveltejs/kit';
import { termsConditionsArchiveVersions } from '$lib/data/legal';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export const prerender = true;

const archivedTerms = import.meta.glob<{
	default: Component;
	metadata: Record<string, unknown>;
}>('/src/content/legal/terms-conditions-*.md');

export const entries = () => termsConditionsArchiveVersions.map(({ slug }) => ({ version: slug }));

export const load: PageLoad = async ({ params }) => {
	const loader = archivedTerms[`/src/content/legal/terms-conditions-${params.version}.md`];

	if (!loader) {
		error(404, 'Pagina niet gevonden');
	}

	const post = await loader();
	const archiveVersion = termsConditionsArchiveVersions.find((item) => item.slug === params.version);

	return {
		content: post.default,
		currentHref: '/terms-conditions',
		meta: post.metadata,
		archiveVersion,
		seo: {
			title: `Algemene Voorwaarden ${archiveVersion?.date ?? params.version} | HoneyLink`,
			description: `Gearchiveerde versie van de algemene voorwaarden van HoneyLink van ${archiveVersion?.date ?? params.version}.`
		}
	};
};
