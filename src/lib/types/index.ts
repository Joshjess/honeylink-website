export interface NavLink {
	label: string;
	href: string;
	children?: NavLink[];
}

export interface SiteConfig {
	name: string;
	url: string;
	description: string;
}
