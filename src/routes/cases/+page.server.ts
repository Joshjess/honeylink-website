import { getCases } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const cases = getCases();
	return {
		cases,
		seo: {
			title: 'Cases | HoneyLink',
			description:
				'Bekijk onze succesverhalen en ontdek hoe wij bedrijven helpen met automatisering en AI-oplossingen.'
		}
	};
};
