import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const slug = 'betalings-voorwaarden';
		const post = await import(`../../content/legal/${slug}.md`);
		return {
			content: post.default,
			meta: post.metadata,
			seo: {
				title: 'Betalingsvoorwaarden | HoneyLink',
				description:
					'Betalingsvoorwaarden van HoneyLink. Informatie over onze betalingsafspraken en facturatie.'
			}
		};
	} catch {
		error(404, 'Pagina niet gevonden');
	}
};
