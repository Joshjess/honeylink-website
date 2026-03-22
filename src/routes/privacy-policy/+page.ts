import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	try {
		const slug = 'privacy-policy';
		const post = await import(`../../content/legal/${slug}.md`);
		return {
			content: post.default,
			meta: post.metadata,
			seo: {
				title: 'Privacy Policy | HoneyLink',
				description:
					'Privacybeleid van HoneyLink. Hoe wij omgaan met uw persoonlijke gegevens en privacy.'
			}
		};
	} catch {
		error(404, 'Pagina niet gevonden');
	}
};
