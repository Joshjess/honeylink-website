import type { BlogPost, CaseStudy } from '$lib/types';
import { getBlogHero, getCaseHero } from '$lib/assets/heroes';
import readingTime from 'reading-time';

export function getBlogPosts(): BlogPost[] {
	const paths = import.meta.glob<{
		metadata: Omit<BlogPost, 'readingTime'>;
	}>('/src/content/blogs/*.md', { eager: true });

	const rawPaths = import.meta.glob<string>('/src/content/blogs/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const posts: BlogPost[] = [];

	for (const [path, file] of Object.entries(paths)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const metadata = file.metadata;

		if (metadata?.published) {
			const raw = rawPaths[path] ?? '';
			const stats = readingTime(raw);
			posts.push({
				...metadata,
				slug,
				readingTime: Math.max(1, Math.round(stats.minutes)),
				heroPicture: getBlogHero(slug)
			});
		}
	}

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export function getCases(): CaseStudy[] {
	const paths = import.meta.glob<{
		metadata: CaseStudy;
	}>('/src/content/cases/*.md', { eager: true });

	const cases: CaseStudy[] = [];

	for (const [path, file] of Object.entries(paths)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const metadata = file.metadata;

		if (metadata?.published) {
			cases.push({
				...metadata,
				slug,
				heroPicture: getCaseHero(metadata.image)
			});
		}
	}

	return cases;
}
