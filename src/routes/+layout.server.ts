import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		siteConfig: {
			name: 'HoneyLink',
			url: 'https://honeylink.nl',
			description: 'Automation en AI agency'
		}
	};
};
