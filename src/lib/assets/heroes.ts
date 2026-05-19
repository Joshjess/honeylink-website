/**
 * Resolves case + blog hero images to their @sveltejs/enhanced-img Picture objects.
 *
 * Why an eager glob:
 *   - The set of heroes is fixed at build time (one per case/blog folder).
 *   - Eager loading lets the Vite enhanced-img plugin statically analyse paths,
 *     emit AVIF/WebP/responsive variants, and content-hash filenames.
 *
 * Keying strategy:
 *   - Blog folders match the markdown slug 1:1 (and we index by that segment).
 *   - Case folders do NOT match the markdown slug (cases use short company names
 *     like "owl-integrations", but the slug is a long descriptive string like
 *     "van-handleidingen-naar-interactieve-chatbot-ondersteuning"). The loader
 *     can pass the frontmatter `image` path (e.g. "/images/cases/owl-integrations/hero.jpg")
 *     to `getCaseHero()` which extracts the folder segment.
 */
import type { Picture } from 'imagetools-core';

type PictureModule = { default: Picture };

const caseHeroes = import.meta.glob<PictureModule>(
	'/src/lib/assets/cases/**/hero.{png,jpg,jpeg,webp,avif}',
	{ query: { enhanced: true }, eager: true }
);

const blogHeroes = import.meta.glob<PictureModule>(
	'/src/lib/assets/blogs/**/hero.{png,jpg,jpeg,webp,avif,gif}',
	{ query: { enhanced: true }, eager: true }
);

function buildHeroMap(modules: Record<string, PictureModule>): Map<string, Picture> {
	const map = new Map<string, Picture>();
	for (const [path, mod] of Object.entries(modules)) {
		// Path looks like /src/lib/assets/cases/owl-integrations/hero.png
		// Folder name is the penultimate path segment.
		const parts = path.split('/');
		const folder = parts[parts.length - 2];
		if (folder) {
			map.set(folder, mod.default);
		}
	}
	return map;
}

const caseHeroByFolder = buildHeroMap(caseHeroes);
const blogHeroBySlug = buildHeroMap(blogHeroes);

/**
 * Extract the folder segment from a frontmatter image path.
 *   "/images/cases/owl-integrations/hero.jpg" -> "owl-integrations"
 *   "/images/blogs/my-slug/hero.jpg"          -> "my-slug"
 */
function folderFromImagePath(imagePath: string | undefined): string | null {
	if (!imagePath) return null;
	const parts = imagePath.split('/').filter(Boolean);
	if (parts.length < 2) return null;
	return parts[parts.length - 2];
}

/**
 * Resolve a case hero by the markdown's frontmatter `image` path.
 * Case folders are named after short company identifiers, not the slug.
 */
export function getCaseHero(imagePath: string | undefined): Picture | null {
	const folder = folderFromImagePath(imagePath);
	if (!folder) return null;
	return caseHeroByFolder.get(folder) ?? null;
}

/**
 * Resolve a blog hero by its slug. Blog folders match the slug 1:1.
 */
export function getBlogHero(slug: string): Picture | null {
	return blogHeroBySlug.get(slug) ?? null;
}

/**
 * Resolves a hero Picture to an absolute URL usable in <meta og:image>.
 * Returns null if the picture is null or has no img.src.
 */
export function pictureToOgUrl(picture: Picture | null, siteUrl: string): string | null {
	if (!picture) return null;
	const src = picture.img?.src;
	if (!src) return null;
	if (src.startsWith('http')) return src;
	return `${siteUrl}${src}`;
}
