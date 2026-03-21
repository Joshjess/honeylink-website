import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const slug = 'terms-conditions';
		const post = await import(`../../content/legal/${slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch {
		error(404, 'Pagina niet gevonden');
	}
};
