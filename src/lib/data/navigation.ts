import type { NavLink } from '$lib/types';

export const navigationLinks: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Over Ons', href: '/over-ons' },
	{ label: 'Cases', href: '/cases' },
	{ label: 'Blogs', href: '/blogs' },
	{ label: 'Contact', href: '/contact' }
];

export const footerLinks: { heading: string; links: NavLink[] }[] = [
	{
		heading: 'Over HoneyLink',
		links: [{ label: 'Over ons', href: '/over-ons' }]
	},
	{
		heading: 'Hulpbronnen',
		links: [
			{ label: 'Blog', href: '/blogs' },
			{ label: 'Cases', href: '/cases' },
			{ label: 'Contact', href: '/contact' }
		]
	},
	{
		heading: 'Bedrijfsinformatie',
		links: [
			{ label: 'Privacy policy', href: '/privacy-policy' },
			{ label: 'Algemene voorwaarden', href: '/terms-conditions' },
			{ label: 'Betalingsvoorwaarden', href: '/betalings-voorwaarden' }
		]
	}
];

export const socialLinks: { platform: string; href: string; icon: string }[] = [
	{
		platform: 'LinkedIn',
		href: 'https://www.linkedin.com/company/honeylink/',
		icon: 'linkedin'
	}
];
