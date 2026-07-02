/**
 * Prerender → static HTML (pure Node, no browser).
 *
 * 1. Renders <App/> to HTML via the SSR build (dist-server/entry-server.js) and
 *    writes dist/index.html (hydrated SPA homepage).
 * 2. Renders each programmatic-SEO landing page to its OWN static file at
 *    dist/<path>/index.html — reached by a normal full-page <a href>, so these
 *    are NOT hydrated (the App-hydrating client <script> is stripped from them).
 * 3. Injects per-page <title>/meta/canonical/OG/Twitter/JSON-LD via src/lib/seo.js.
 * 4. Writes robots.txt + a sitemap.xml that includes the home + every landing.
 *
 * Mirrors the intent of C4's scripts/prerender.mjs but, since this site is fully
 * static, uses Vite SSG instead of a Playwright capture — so it runs anywhere,
 * including CI with no browser.
 */
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const { render, renderLanding } = await import(pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href);
const { renderHead, landingSchemas } = await import(pathToFileURL(resolve(root, 'src/lib/seo.js')).href);
const { seo } = await import(pathToFileURL(resolve(root, 'src/data/product.js')).href);
const { landings } = await import(pathToFileURL(resolve(root, 'src/data/landings.js')).href);

const templatePath = resolve(root, 'dist/index.html');
const template = await readFile(templatePath, 'utf8');

/** Build a full HTML doc from the template, injecting body markup + head. */
function compose(tpl, appHtml, head) {
  let html = tpl.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);
  if (html.includes('<!--app-head-->')) {
    html = html.replace('<!--app-head-->', head);
  } else {
    html = html.replace('</head>', `    ${head}\n  </head>`);
  }
  return html;
}

// ── 1. Homepage (hydrated SPA) ───────────────────────────────────────────────
const homeHtml = compose(template, render(), renderHead());
await writeFile(templatePath, homeHtml, 'utf8');

// ── 2. Landing pages (static, not hydrated) ──────────────────────────────────
// Strip the App-hydrating module script so the landing markup is the final DOM.
// After `vite build` the dev entry (/src/entry-client.jsx) is rewritten to a
// hashed module at /assets/index-*.js, so match either form.
const scriptRe = /\s*<script type="module"[^>]*src="[^"]*(?:entry-client|\/assets\/index-)[^"]*"[^>]*><\/script>/g;
const landingTemplate = template.replace(scriptRe, '');
if (landingTemplate === template) {
  // Nothing was stripped — fail loud rather than silently shipping a hydrating landing.
  throw new Error('prerender: could not find the client entry <script> to strip from landing pages.');
}

for (const landing of landings) {
  const canonical = `${seo.url}${landing.path}`;
  const head = renderHead({
    title: landing.title,
    description: landing.description,
    canonical,
    schemas: landingSchemas(landing),
  });
  const html = compose(landingTemplate, renderLanding(landing), head);
  const outDir = join(root, 'dist', landing.path.replace(/^\//, ''));
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html, 'utf8');
}

// ── 3. robots.txt + sitemap.xml (home + every landing) ───────────────────────
const origin = new URL(seo.url).origin;
await writeFile(
  resolve(root, 'dist/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  'utf8'
);

const urls = [
  { loc: seo.url, changefreq: 'weekly', priority: '1.0' },
  ...landings.map((l) => ({ loc: `${seo.url}${l.path}`, changefreq: 'monthly', priority: '0.8' })),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8');

await rm(resolve(root, 'dist-server'), { recursive: true, force: true });

console.log(
  `✓ Prerendered dist/index.html + ${landings.length} landing page(s): ` +
    landings.map((l) => l.path).join(', ') +
    ` + robots.txt + sitemap.xml (${urls.length} URLs)`
);
