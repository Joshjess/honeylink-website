import type { BlogPost, CaseStudy } from '$lib/types';
import readingTime from 'reading-time';

export function getBlogPosts(): BlogPost[] {
	const paths = import.meta.glob<{
		metadata: Omit<BlogPost, 'readingTime'>;
		default: { render: () => { html: string } };
	}>('/src/content/blogs/*.md', { eager: true });

	const posts: BlogPost[] = [];

	for (const [path, file] of Object.entries(paths)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const metadata = file.metadata;

		if (metadata?.published) {
			const html = file.default?.render?.()?.html ?? '';
			const stats = readingTime(html.replace(/<[^>]*>/g, ''));
			posts.push({
				...metadata,
				slug,
				readingTime: Math.max(1, Math.round(stats.minutes))
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
			cases.push({ ...metadata, slug });
		}
	}

	return cases;
}
