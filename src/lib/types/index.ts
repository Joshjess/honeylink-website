import type { Picture } from 'imagetools-core';

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

export interface BlogPost {
	title: string;
	slug: string;
	date: string;
	author: string;
	authorImage: string;
	excerpt: string;
	image: string;
	published: boolean;
	readingTime?: number;
	/** Resolved @sveltejs/enhanced-img Picture for the hero, or null. */
	heroPicture?: Picture | null;
}

export interface CaseStudy {
	title: string;
	slug: string;
	client: string;
	industry: string;
	author: string;
	authorImage: string;
	excerpt: string;
	image: string;
	published: boolean;
	/** Resolved @sveltejs/enhanced-img Picture for the hero, or null. */
	heroPicture?: Picture | null;
}

export interface FaqItemData {
	question: string;
	answer: string;
}

export interface ServicePageData {
	title: string;
	subtitle: string;
	sections: ServiceSection[];
	faq: FaqItemData[];
}

export interface ServiceSection {
	heading: string;
	body: string;
	type: 'value-proposition' | 'features' | 'examples';
	items?: ServiceFeature[];
	image?: string;
}

export interface ServiceFeature {
	title: string;
	description: string;
	accentColor?: string;
}
