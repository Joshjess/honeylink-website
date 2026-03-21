import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => ({
	...data,
	seo: {
		title: 'Contact | HoneyLink',
		description:
			'Neem contact op met HoneyLink. Plan een vrijblijvend adviesgesprek over automatisering en AI voor uw bedrijf.'
	}
});
