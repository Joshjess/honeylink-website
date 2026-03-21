import { getCases } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const cases = getCases();
	return { cases };
};
