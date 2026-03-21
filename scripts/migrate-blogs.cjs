const fs = require('fs');
const path = require('path');

// Read all blog JSONs
const blogFiles = fs.readdirSync('scripts/scraped-data/content/')
  .filter(f => f.startsWith('blogs--'))
  .sort();

// Author image - ob2Fg6deUU5UtiBoIaIWqoFwloY.jpeg
const authorImgSrc = 'scripts/scraped-data/images/ob2Fg6deUU5UtiBoIaIWqoFwloY.jpeg';
const authorImgDest = 'static/images/team/joshua-offermans.jpeg';
fs.mkdirSync(path.dirname(authorImgDest), { recursive: true });
if (fs.existsSync(authorImgSrc)) {
  fs.copyFileSync(authorImgSrc, authorImgDest);
  console.log('Copied author image');
} else {
  console.log('Author image not found at', authorImgSrc);
}

// Image hash -> filename in scraped images dir
const scrapedImages = fs.readdirSync('scripts/scraped-data/images/');

function findImageFile(hash) {
  return scrapedImages.find(f => f.startsWith(hash));
}

// Footer/CTA texts to skip
const skipTexts = new Set([
  'Home', 'Over Ons', 'Cases', 'Blogs', 'Contact', 'Plan gratis adviesgesprek',
  'Meer weten over wat HoneyLink voor jouw bedrijf kan betekenen? Druk dan op knop hieronder!',
  'Van implementatie naar efficiëntie',
  'Over HoneyLink', 'Over ons', 'Hulpbronnen', 'Blog',
  'Bedrijfsinformatie', 'Privacy policy', 'Algemene voorwaarden', 'Betalingsvoorwaarden',
]);

// Process each blog
blogFiles.forEach(f => {
  const slug = f.replace('blogs--', '').replace('.json', '');
  const data = JSON.parse(fs.readFileSync('scripts/scraped-data/content/' + f, 'utf8'));

  // Extract data
  const h1 = data.headings[0]?.text || '';
  const rawDate = data.paragraphs[6] || '';

  // Parse date to ISO format
  let isoDate = '';
  const parts = rawDate.split('-');
  if (parts.length === 3) {
    const d = parts[0].padStart(2, '0');
    const m = parts[1].padStart(2, '0');
    const y = parts[2];
    isoDate = `${y}-${m}-${d}`;
  }

  // Hero image - second image (index 1), skip logo at index 0
  const heroImgUrl = data.images[1]?.src || '';
  const heroHashMatch = heroImgUrl.match(/images\/([^.?]+)/);
  const heroHash = heroHashMatch ? heroHashMatch[1] : '';

  // Find and copy hero image
  const heroFile = findImageFile(heroHash);
  const heroDir = `static/images/blogs/${slug}`;
  fs.mkdirSync(heroDir, { recursive: true });

  let heroExt = 'jpg';
  if (heroFile) {
    heroExt = heroFile.split('.').pop();
    fs.copyFileSync(`scripts/scraped-data/images/${heroFile}`, `${heroDir}/hero.${heroExt}`);
  } else {
    console.log('Hero image not found for', slug, '- hash:', heroHash);
  }

  // Extract body paragraphs
  // Skip: 0-5 (nav), 6 (date), 7 ("Door:"), 8 (author name)
  // Then skip CTA/footer text at the end
  const bodyParagraphs = [];
  let metaSkipped = false;

  for (let i = 0; i < data.paragraphs.length; i++) {
    const p = data.paragraphs[i];

    // Skip nav items and known skip texts
    if (skipTexts.has(p)) continue;
    // Skip the date
    if (p === rawDate) continue;
    // Skip "Door:" label
    if (p === 'Door:') continue;
    // Skip author name (first occurrence only)
    if (p === 'Joshua Offermans' && !metaSkipped) { metaSkipped = true; continue; }
    // Skip copyright
    if (p.includes('HoneyLink. All rights reserved')) continue;

    bodyParagraphs.push(p);
  }

  // Get h2 headings (excluding CTA section heading)
  const h2Headings = data.headings
    .filter(h => h.tag === 'h2' && h.text !== 'Verbeter je bedrijfsproces vandaag nog');

  // Convert body content to markdown
  let bodyMarkdown = '';

  bodyParagraphs.forEach(p => {
    // Check if this paragraph starts with any h2 heading text
    let matched = false;
    for (const h of h2Headings) {
      if (p.startsWith(h.text)) {
        bodyMarkdown += `\n## ${h.text}\n\n`;
        const remainder = p.substring(h.text.length).trim();
        if (remainder) bodyMarkdown += remainder + '\n\n';
        matched = true;
        break;
      }
    }
    if (!matched) {
      bodyMarkdown += p + '\n\n';
    }
  });

  bodyMarkdown = bodyMarkdown.trim();

  // Create excerpt (~150 chars from first meaningful paragraph)
  const firstBody = bodyParagraphs[0] || '';
  let excerpt = firstBody.substring(0, 155);
  const lastSpace = excerpt.lastIndexOf(' ');
  if (lastSpace > 80) {
    excerpt = excerpt.substring(0, lastSpace) + '...';
  } else if (excerpt.length >= 155) {
    excerpt += '...';
  }

  // Escape double quotes in YAML values
  const escTitle = h1.replace(/"/g, '\\"');
  const escExcerpt = excerpt.replace(/"/g, '\\"');

  // Create markdown file content
  const md = `---
title: "${escTitle}"
slug: "${slug}"
date: "${isoDate}"
author: "Joshua Offermans"
authorImage: "/images/team/joshua-offermans.jpeg"
excerpt: "${escExcerpt}"
image: "/images/blogs/${slug}/hero.${heroExt}"
published: true
---

${bodyMarkdown}
`;

  const mdPath = `src/content/blogs/${slug}.md`;
  fs.writeFileSync(mdPath, md);
  console.log('Created:', mdPath);
});

console.log(`\nDone! Created ${blogFiles.length} blog posts`);
