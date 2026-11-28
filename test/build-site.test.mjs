import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSite } from '../.github/scripts/build-site.mjs';

const sample = `<!-- Generated from catalog.yaml. Do not edit by hand. -->
# Awesome SkyCD

> A curated list of community plugin sources for [SkyCD](https://github.com/SkyCD/SkyCD).

## Contents

- [Catalog endpoint](#catalog-endpoint)

## Catalog endpoint

The list is published at https://skycd.github.io/awesome-skycd/plugins.json.

- [Contributing](CONTRIBUTING.md)
- [Workflow](./.github/workflows/render-catalog.yml)
- [SkyCD](https://github.com/SkyCD/SkyCD)
`;

const jsonLdOf = (html) => {
  const match = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
  assert.ok(match, 'expected JSON-LD script');
  return JSON.parse(match[1]);
};

test('renders a complete html document with metadata', () => {
  const html = buildSite(sample);

  assert.match(html, /^<!doctype html>\n<html lang="en">\n<head>/);
  assert.match(html, /<meta charset="utf-8">/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(html, /<title>Awesome SkyCD — SkyCD plugin directory<\/title>/);
  assert.match(html, /<meta name="description" content="A curated list of community plugin sources for SkyCD\.">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/skycd\.github\.io\/awesome-skycd\/">/);
  assert.match(html, /<meta name="robots" content="index, follow">/);
  assert.match(html, /<meta property="og:type" content="website">/);
  assert.match(html, /<meta property="og:site_name" content="Awesome SkyCD">/);
  assert.match(html, /<meta property="og:url" content="https:\/\/skycd\.github\.io\/awesome-skycd\/">/);
  assert.match(html, /<meta name="twitter:card" content="summary">/);
  assert.match(html, /<meta name="color-scheme" content="light dark">/);
});

test('emits valid JSON-LD', () => {
  const data = jsonLdOf(buildSite(sample));

  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'WebSite');
  assert.equal(data.name, 'Awesome SkyCD');
  assert.equal(data.url, 'https://skycd.github.io/awesome-skycd/');
  assert.equal(data.description, 'A curated list of community plugin sources for SkyCD.');
});

test('drops the generated-file notice', () => {
  assert.ok(!buildSite(sample).includes('Do not edit by hand'));
});

test('adds heading ids that match the table of contents', () => {
  const html = buildSite(sample);

  assert.match(html, /<h1 id="awesome-skycd">Awesome SkyCD<\/h1>/);
  assert.match(html, /<h2 id="catalog-endpoint">Catalog endpoint<\/h2>/);
  assert.match(html, /<a href="#catalog-endpoint">Catalog endpoint<\/a>/);
});

test('rewrites relative links to the repository while keeping external links and anchors', () => {
  const html = buildSite(sample);

  assert.ok(html.includes('href="https://github.com/SkyCD/awesome-skycd/blob/main/CONTRIBUTING.md"'));
  assert.ok(html.includes('href="https://github.com/SkyCD/awesome-skycd/blob/main/.github/workflows/render-catalog.yml"'));
  assert.ok(html.includes('href="https://github.com/SkyCD/SkyCD"'));
  assert.ok(html.includes('href="#catalog-endpoint"'));
});

test('rejects unsafe link targets', () => {
  const html = buildSite('[bad](javascript:alert(1)) [data](data:text/html,x)');

  assert.ok(!html.includes('javascript:'));
  assert.ok(!html.includes('data:text/html'));
  assert.ok(html.includes('href="#"'));
});

test('escapes raw html from catalog text', () => {
  const html = buildSite('## Danger <script>alert(1)</script>\n\nText <img src=x onerror=alert(1)>');

  assert.ok(!html.includes('<script>alert(1)'));
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
});

test('honours custom site options', () => {
  const html = buildSite('# Title\n\n> Summary.\n\n[Guide](docs/guide.md)', {
    siteUrl: 'https://example.com/list',
    repositoryUrl: 'https://example.com/owner/repo/',
    branch: 'v2',
  });

  assert.ok(html.includes('<link rel="canonical" href="https://example.com/list/">'));
  assert.ok(html.includes('href="https://example.com/owner/repo/blob/v2/docs/guide.md"'));
  assert.equal(jsonLdOf(html).url, 'https://example.com/list/');
});

test('the repository README renders as a catalog page', () => {
  const markdown = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const html = buildSite(markdown);

  assert.match(html, /<meta name="description" content="A curated list of community plugin sources for SkyCD\.">/);
  for (const id of ['feature-plugins', 'file-format-plugins', 'metadata-plugins', 'sample-plugins']) {
    assert.ok(html.includes(`id="${id}"`), `missing heading id ${id}`);
  }
  assert.ok(html.includes('https://skycd.github.io/awesome-skycd/plugins.json'));
  assert.ok(!html.includes('docs/'));
});
