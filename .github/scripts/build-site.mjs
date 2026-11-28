#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { Marked } from 'marked';

const DEFAULT_SITE_URL = 'https://skycd.github.io/awesome-skycd/';
const DEFAULT_REPOSITORY_URL = 'https://github.com/SkyCD/awesome-skycd';
const DEFAULT_BRANCH = 'main';
const FALLBACK_TITLE = 'Awesome SkyCD';
const FALLBACK_DESCRIPTION = 'A curated list of community plugin sources for SkyCD.';

export function buildSite(markdown, options = {}) {
  const siteUrl = withTrailingSlash(options.siteUrl ?? DEFAULT_SITE_URL);
  const repositoryUrl = (options.repositoryUrl ?? DEFAULT_REPOSITORY_URL).replace(/\/+$/, '');
  const branch = options.branch ?? DEFAULT_BRANCH;

  const source = markdown.replace(/^\uFEFF/, '').replace(/^\s*<!--[\s\S]*?-->/, '');
  const title = extractTitle(source) ?? FALLBACK_TITLE;
  const description = extractDescription(source) ?? FALLBACK_DESCRIPTION;

  const marked = new Marked({ gfm: true });
  marked.use({ renderer: { html: ({ text }) => escapeHtml(text) } });

  let body = marked.parse(source);
  body = rewriteHrefs(body, repositoryUrl, branch);
  body = addHeadingIds(body);

  return renderPage({ title, description, siteUrl, repositoryUrl, branch, body });
}

function extractTitle(markdown) {
  const match = /^#\s+(.+?)\s*$/m.exec(markdown);
  return match ? plainInline(match[1]) : null;
}

function extractDescription(markdown) {
  const match = /^>\s+(.+?)\s*$/m.exec(markdown);
  return match ? plainInline(match[1]) : null;
}

function plainInline(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function rewriteHrefs(html, repositoryUrl, branch) {
  return html.replace(/href="([^"]*)"/g, (match, href) => {
    const target = resolveHref(href, repositoryUrl, branch);
    return target === href ? match : `href="${target}"`;
  });
}

function resolveHref(href, repositoryUrl, branch) {
  if (href.startsWith('#')) return href;
  if (/^https?:/i.test(href) || /^mailto:/i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return '#';
  const path = href.replace(/^\.\//, '');
  return `${repositoryUrl}/blob/${branch}/${path}`;
}

function addHeadingIds(html) {
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (match, level, inner) => {
    const id = slugify(inner.replace(/<[^>]*>/g, ''));
    if (!id) return match;
    return `<h${level} id="${escapeHtml(id)}">${inner}</h${level}>`;
  });
}

function slugify(text) {
  return text
    .replace(/&[a-z#0-9]+;/gi, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N} _-]+/gu, '')
    .replace(/\s+/g, '-');
}

function renderPage({ title, description, siteUrl, repositoryUrl, branch, body }) {
  const pageTitle = `${title} — SkyCD plugin directory`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: siteUrl,
    description,
    about: {
      '@type': 'SoftwareApplication',
      name: 'SkyCD',
      url: 'https://github.com/SkyCD/SkyCD',
    },
  }).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(siteUrl)}">
<meta name="robots" content="index, follow">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#101418" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(title)}">
<meta property="og:title" content="${escapeHtml(pageTitle)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(siteUrl)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(pageTitle)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<script type="application/ld+json">${jsonLd}</script>
<style>
:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --fg: #1f2328;
  --muted: #59636e;
  --link: #0969da;
  --border: #d1d9e0;
  --code: #f6f8fa;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #101418;
    --fg: #e6edf3;
    --muted: #9198a1;
    --link: #4493f8;
    --border: #3d444d;
    --code: #151b23;
  }
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
}
main, footer p {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}
main { padding-top: 3rem; padding-bottom: 2rem; }
h1, h2, h3, h4, h5, h6 { line-height: 1.25; }
h1 { font-size: 2rem; margin: 0 0 1rem; }
h2 { font-size: 1.5rem; margin-top: 2.5rem; padding-bottom: .3rem; border-bottom: 1px solid var(--border); }
a { color: var(--link); }
ul { padding-left: 1.5rem; }
li { margin: .35rem 0; }
blockquote {
  margin: 1.5rem 0;
  padding: .25rem 1rem;
  border-left: .25rem solid var(--border);
  color: var(--muted);
}
blockquote p { margin: .5rem 0; }
code {
  background: var(--code);
  padding: .15em .35em;
  border-radius: 4px;
  font-size: .9em;
}
pre { background: var(--code); padding: 1rem; overflow: auto; border-radius: 6px; }
pre code { background: none; padding: 0; }
footer {
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: .875rem;
  padding: 1.5rem 0 3rem;
}
</style>
</head>
<body>
<main>
${body.trimEnd()}
</main>
<footer>
<p>Generated from <a href="${escapeHtml(repositoryUrl)}/blob/${escapeHtml(branch)}/catalog.yaml">catalog.yaml</a>. Machine-readable catalog: <a href="${escapeHtml(siteUrl)}plugins.json">plugins.json</a>.</p>
</footer>
</body>
</html>
`;
}

function withTrailingSlash(value) {
  return value.endsWith('/') ? value : `${value}/`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function main() {
  const input = process.argv[2] ?? 'README.md';
  const output = process.argv[3] ?? 'index.html';
  let markdown;
  try {
    markdown = readFileSync(input, 'utf8');
  } catch (error) {
    console.error(`${input}: cannot read: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  const html = buildSite(markdown);
  try {
    writeFileSync(output, html, 'utf8');
  } catch (error) {
    console.error(`${output}: cannot write: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`${input} -> ${output} (${Buffer.byteLength(html)} bytes)`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main();
}
