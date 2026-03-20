import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://honeylink.nl';
const OUTPUT_DIR = path.join(__dirname, 'scraped-data');

const URLS = [
	'/',
	'/over-ons',
	'/automation',
	'/data-verrijking',
	'/api',
	'/maatwerk-software',
	'/offerte-automatisering',
	'/ai-agent',
	'/chatbot',
	'/contact',
	'/terms-conditions',
	'/betalings-voorwaarden',
	'/privacy-policy',
	'/cases',
	'/cases/van-binnen-mijn-bedrijf-valt-weinig-te-automatiseren-naar-voor-de-file-naar-huis',
	'/cases/minimalpad-s-naadloze-verzendervaring-via-webflow-en-sendcloud',
	'/cases/van-volgers-naar-kunstenaars-novus-arte-s-geautomatiseerde-talentscouting',
	'/cases/van-handleidingen-naar-interactieve-chatbot-ondersteuning',
	'/cases/hoe-honeylink-de-software-koppeling-facilteerde-voor-surinaams-betaal-en-spaarprogramma-pietpiet',
	'/blogs/ai-fabeltjes-fabriek',
	'/blogs/5-ongefundeerde-redenen-waarom-ondernemers-ai-links-laten-liggen',
	'/blogs/van-prompt-naar-website-in-minuten-waarom-lovable-niet-het-wondermiddel-is',
	'/blogs/hoe-ik-op-mijn-12de-op-een-creatieve-manier-mijn-eerste-geld-verdiende',
	'/blogs/is-jouw-ai-agent-bestand-tegen-prompt-injectie-van-cybercriminelen',
	'/blogs/het-is-misschien-een-open-deur-maar-ik-heb-me-er-toch-op-verkeken',
	'/blogs/ik-snap-niet-waarom-mensen-nog-chatgpt-gebruiken',
	'/blogs/waarom-ik-kies-voor-onzekerheid-boven-een-vaste-baan',
	'/blogs/digitale-collega-s-die-met-elkaar-praten-wat-is-de-rol-van-google-s-nieuwe-agent2agent',
	'/blogs/honeylink-automatiseert-ook-over-de-grens',
	'/blogs/5-manieren-waarop-een-chatbot-jouw-mkb-bedrijf-tijd-kan-besparen',
	'/blogs/waarom-ben-ik-honeylink-begonnen',
	'/blogs/krijg-weer-grip-op-je-data-met-model-context-protocol-(mcp)',
	'/blogs/ai-agents-hype-of-de-toekomst-van-jouw-mkb-bedrijf',
	'/blogs/chatbots-met-spelfouten-om-menselijk-te-lijken',
	'/blogs/waarom-grote-bedrijven-miljoenen-uitgeven-aan-iets-wat-het-mkb-slimmer-kan-aanpakken',
];

interface PageContent {
	url: string;
	title: string;
	headings: Array<{ tag: string; text: string }>;
	paragraphs: string[];
	links: Array<{ text: string; href: string }>;
	images: Array<{ src: string; alt: string }>;
	sections: Array<{ tag: string; text: string; className: string }>;
	computedStyles: {
		bodyFontFamily: string;
		bodyColor: string;
		bodyBackground: string;
	};
	navigationLinks: Array<{ text: string; href: string }>;
	footerContent: string;
}

function urlToSlug(urlPath: string): string {
	if (urlPath === '/') return 'home';
	return urlPath.slice(1).replace(/\//g, '--');
}

async function downloadImage(imageUrl: string, outputDir: string): Promise<void> {
	try {
		const response = await fetch(imageUrl);
		if (!response.ok) return;

		const contentType = response.headers.get('content-type') || '';
		if (!contentType.startsWith('image/')) return;

		const urlObj = new URL(imageUrl);
		let filename = path.basename(urlObj.pathname);
		if (!filename || filename === '/') {
			filename = `image-${Date.now()}.jpg`;
		}

		// Deduplicate: skip if file already exists
		const filePath = path.join(outputDir, filename);
		if (fs.existsSync(filePath)) return;

		const buffer = Buffer.from(await response.arrayBuffer());
		fs.writeFileSync(filePath, buffer);
	} catch {
		// Skip failed image downloads silently
	}
}

async function scrape() {
	// Ensure output directories exist
	fs.mkdirSync(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });
	fs.mkdirSync(path.join(OUTPUT_DIR, 'content'), { recursive: true });
	fs.mkdirSync(path.join(OUTPUT_DIR, 'images'), { recursive: true });

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	});

	const page = await context.newPage();

	// Collect image URLs to download at the end
	const imageUrls = new Set<string>();

	// Listen for image requests
	page.on('response', async (response) => {
		const url = response.url();
		const contentType = response.headers()['content-type'] || '';
		if (contentType.startsWith('image/') && !url.includes('data:') && !url.includes('tracking')) {
			imageUrls.add(url);
		}
	});

	console.log(`Starting scrape of ${URLS.length} URLs...`);

	for (let i = 0; i < URLS.length; i++) {
		const urlPath = URLS[i];
		const fullUrl = `${BASE_URL}${urlPath}`;
		const slug = urlToSlug(urlPath);

		console.log(`[${i + 1}/${URLS.length}] Scraping: ${fullUrl}`);

		try {
			// Navigate with networkidle to wait for Framer SPA to render
			await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });

			// Wait a bit extra for Framer animations to settle
			await page.waitForTimeout(2000);

			// 1. Full-page desktop screenshot
			const screenshotPath = path.join(OUTPUT_DIR, 'screenshots', `${slug}.png`);
			await page.screenshot({ path: screenshotPath, fullPage: true });

			// 2. Extract structured content
			const content: PageContent = await page.evaluate((pageUrl: string) => {
				// Extract headings
				const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(
					(h) => ({
						tag: h.tagName.toLowerCase(),
						text: h.textContent?.trim() || '',
					})
				);

				// Extract paragraphs
				const paragraphs = [...document.querySelectorAll('p')]
					.map((p) => p.textContent?.trim() || '')
					.filter((text) => text.length > 0);

				// Extract links
				const links = [...document.querySelectorAll('a')]
					.map((a) => ({
						text: a.textContent?.trim() || '',
						href: a.getAttribute('href') || '',
					}))
					.filter((link) => link.href.length > 0);

				// Extract images
				const images = [...document.querySelectorAll('img')].map((img) => ({
					src: img.getAttribute('src') || img.currentSrc || '',
					alt: img.getAttribute('alt') || '',
				}));

				// Extract sections
				const sections = [
					...document.querySelectorAll('section, [class*="section"], [data-framer-name]'),
				].map((el) => ({
					tag: el.tagName.toLowerCase(),
					text: el.textContent?.trim().slice(0, 500) || '',
					className: el.getAttribute('class') || '',
				}));

				// Computed styles
				const bodyStyles = window.getComputedStyle(document.body);
				const computedStyles = {
					bodyFontFamily: bodyStyles.fontFamily,
					bodyColor: bodyStyles.color,
					bodyBackground: bodyStyles.backgroundColor,
				};

				// Navigation links from header/nav
				const navElements = document.querySelectorAll(
					'header a, nav a, [role="navigation"] a'
				);
				const navigationLinks = [...navElements]
					.map((a) => ({
						text: a.textContent?.trim() || '',
						href: a.getAttribute('href') || '',
					}))
					.filter(
						(link) => link.text.length > 0 && link.href.length > 0
					);

				// Footer content
				const footer = document.querySelector('footer');
				const footerContent = footer ? footer.innerHTML : '';

				return {
					url: pageUrl,
					title: document.title,
					headings,
					paragraphs,
					links,
					images,
					sections,
					computedStyles,
					navigationLinks,
					footerContent,
				};
			}, fullUrl);

			// Save content JSON
			const contentPath = path.join(OUTPUT_DIR, 'content', `${slug}.json`);
			fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

			// Collect image URLs from page content
			for (const img of content.images) {
				if (img.src && img.src.startsWith('http')) {
					imageUrls.add(img.src);
				} else if (img.src && !img.src.startsWith('data:')) {
					imageUrls.add(new URL(img.src, fullUrl).href);
				}
			}

			// 3. Mobile viewport screenshot
			await page.setViewportSize({ width: 375, height: 812 });
			await page.waitForTimeout(1000);
			const mobileScreenshotPath = path.join(
				OUTPUT_DIR,
				'screenshots',
				`${slug}--mobile.png`
			);
			await page.screenshot({ path: mobileScreenshotPath, fullPage: true });

			// Reset to desktop viewport
			await page.setViewportSize({ width: 1440, height: 900 });

			console.log(`  -> Saved: ${slug}.png, ${slug}--mobile.png, ${slug}.json`);
		} catch (error) {
			console.error(`  -> ERROR scraping ${fullUrl}:`, error instanceof Error ? error.message : error);
		}
	}

	// Download all collected images
	console.log(`\nDownloading ${imageUrls.size} images...`);
	const imagesDir = path.join(OUTPUT_DIR, 'images');
	let downloadedCount = 0;

	for (const imageUrl of imageUrls) {
		// Skip tracking pixels, data URIs, and very small images
		if (
			imageUrl.includes('data:') ||
			imageUrl.includes('tracking') ||
			imageUrl.includes('pixel') ||
			imageUrl.includes('analytics') ||
			imageUrl.includes('facebook.com') ||
			imageUrl.includes('google-analytics')
		) {
			continue;
		}

		await downloadImage(imageUrl, imagesDir);
		downloadedCount++;

		if (downloadedCount % 10 === 0) {
			console.log(`  -> Downloaded ${downloadedCount} images...`);
		}
	}

	await browser.close();

	// Print summary
	const screenshotCount = fs.readdirSync(path.join(OUTPUT_DIR, 'screenshots')).filter((f) => f.endsWith('.png')).length;
	const contentCount = fs.readdirSync(path.join(OUTPUT_DIR, 'content')).filter((f) => f.endsWith('.json')).length;
	const imageCount = fs.readdirSync(path.join(OUTPUT_DIR, 'images')).length;

	console.log('\n=== Scraping Complete ===');
	console.log(`Screenshots: ${screenshotCount}`);
	console.log(`Content files: ${contentCount}`);
	console.log(`Images downloaded: ${imageCount}`);
}

scrape().catch(console.error);
