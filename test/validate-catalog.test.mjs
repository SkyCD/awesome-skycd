import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import {
  collectSourceUrls,
  validateCatalog,
  validateCatalogData,
  validateCatalogText,
  validateCatalogYamlText,
} from '../.github/scripts/validate-catalog.mjs';

const errorsFor = (value) => validateCatalog(value).errors;

const catalogErrorsFor = (value) => validateCatalogData(value).errors;

const item = (overrides = {}) => ({
  name: 'Sample plugin',
  description: 'Demonstrates a plugin contract.',
  project_url: 'https://github.com/SkyCD/SkyCD.Plugin.Sample',
  source_url: 'https://skycd.github.io/SkyCD.Plugin.Sample/plugins.json',
  ...overrides,
});

const category = (overrides = {}) => ({
  name: 'Sample plugins',
  description: 'Reference plugins that demonstrate the plugin API.',
  items: [item()],
  ...overrides,
});

const catalog = (categories = [category()]) => ({ categories });

test('accepts an empty catalog', () => {
  assert.deepEqual(errorsFor([]), []);
});

test('accepts unique absolute https urls', () => {
  assert.deepEqual(errorsFor([
    'https://plugins.example.com/skycd/manifest.json',
    'https://skycd.example.org/feed/manifest.json',
  ]), []);
});

test('rejects a non-array root', () => {
  for (const value of [{}, 'https://example.com/x', null, 42]) {
    assert.ok(errorsFor(value).length > 0, `expected ${JSON.stringify(value)} to fail`);
  }
});

test('rejects non-string entries', () => {
  for (const entry of [42, null, true, [], {}]) {
    assert.ok(errorsFor([entry]).length > 0, `expected ${JSON.stringify(entry)} to fail`);
  }
});

test('rejects non-https urls', () => {
  for (const entry of [
    'http://example.com/manifest.json',
    'ftp://example.com/manifest.json',
    'data:application/json,[]',
    'javascript:alert(1)',
  ]) {
    assert.ok(errorsFor([entry]).length > 0, `expected ${entry} to fail`);
  }
});

test('rejects relative and malformed urls', () => {
  for (const entry of ['/manifest.json', 'manifest.json', 'https://', 'not a url']) {
    assert.ok(errorsFor([entry]).length > 0, `expected ${entry} to fail`);
  }
});

test('rejects duplicate entries', () => {
  const url = 'https://plugins.example.com/skycd/manifest.json';
  assert.ok(errorsFor([url, url]).length > 0);
});

test('rejects urls that normalize to the same value', () => {
  assert.ok(errorsFor(['https://example.com/manifest.json', 'HTTPS://EXAMPLE.COM/manifest.json']).length > 0);
  assert.ok(errorsFor(['https://example.com:443/manifest.json', 'https://example.com/manifest.json']).length > 0);
  assert.ok(errorsFor(['https://example.com', 'https://example.com/']).length > 0);
});

test('rejects whitespace and control characters', () => {
  assert.ok(errorsFor([' https://example.com/manifest.json']).length > 0);
  assert.ok(errorsFor(['https://example.com/manifest.json ']).length > 0);
  assert.ok(errorsFor(['https://example.com/manifest .json']).length > 0);
  assert.ok(errorsFor(['https://example.com/manifest.json\n']).length > 0);
  assert.ok(errorsFor([`https://example.com/manifest.json${String.fromCharCode(27)}`]).length > 0);
});

test('rejects embedded credentials', () => {
  assert.ok(errorsFor(['https://user:secret@example.com/manifest.json']).length > 0);
});

test('rejects fragments', () => {
  assert.ok(errorsFor(['https://example.com/manifest.json#v1']).length > 0);
});

test('warns about query strings without rejecting them', () => {
  const result = validateCatalog(['https://example.com/manifest.json?version=1']);
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.length, 1);
});

test('reports malformed json', () => {
  const result = validateCatalogText('{');
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /not valid JSON/);
});

test('ignores a utf-8 bom', () => {
  assert.deepEqual(validateCatalogText('\uFEFF[]').errors, []);
});

test('accepts a valid catalog document', () => {
  assert.deepEqual(catalogErrorsFor(catalog()), []);
});

test('accepts an empty categories list', () => {
  assert.deepEqual(catalogErrorsFor({ categories: [] }), []);
});

test('rejects a non-mapping catalog root', () => {
  for (const value of [[], 'categories', null, 42]) {
    assert.ok(catalogErrorsFor(value).length > 0, `expected ${JSON.stringify(value)} to fail`);
  }
});

test('rejects a missing categories array', () => {
  for (const value of [{}, { categories: {} }, { categories: 'x' }]) {
    assert.ok(catalogErrorsFor(value).length > 0, `expected ${JSON.stringify(value)} to fail`);
  }
});

test('rejects a malformed category', () => {
  assert.ok(catalogErrorsFor({ categories: ['Sample plugins'] }).length > 0);
  assert.ok(catalogErrorsFor({ categories: [{ description: 'Samples.', items: [] }] }).length > 0);
  assert.ok(catalogErrorsFor({ categories: [{ name: '  Samples', description: 'Samples.', items: [] }] }).length > 0);
  assert.ok(catalogErrorsFor({ categories: [{ name: 'Samples\nMore', description: 'Samples.', items: [] }] }).length > 0);
  assert.ok(catalogErrorsFor({ categories: [{ name: 'Samples', description: 'Samples.', items: {} }] }).length > 0);
});

test('rejects missing or malformed category descriptions', () => {
  const base = { name: 'Samples', items: [] };
  assert.ok(catalogErrorsFor({ categories: [base] }).length > 0, 'missing');
  for (const description of ['', 42, 'One line\nTwo lines', ' padded ']) {
    assert.ok(catalogErrorsFor({ categories: [{ ...base, description }] }).length > 0, JSON.stringify(description));
  }
  assert.deepEqual(catalogErrorsFor({ categories: [{ ...base, description: 'One line.' }] }), []);
});

test('rejects duplicate category names ignoring case', () => {
  const value = {
    categories: [
      { name: 'Samples', description: 'First.', items: [] },
      { name: 'samples', description: 'Second.', items: [] },
    ],
  };
  assert.ok(catalogErrorsFor(value).length > 0);
});

test('rejects a malformed item', () => {
  assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: ['Sample'] }])).length > 0);
});

test('rejects missing or empty item fields', () => {
  for (const field of ['name', 'description', 'project_url', 'source_url']) {
    const missing = item();
    delete missing[field];
    assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [missing] }])).length > 0, `missing ${field}`);
    assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [item({ [field]: '' })] }])).length > 0, `empty ${field}`);
    assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [item({ [field]: 42 })] }])).length > 0, `non-string ${field}`);
  }
});

test('rejects multiline descriptions', () => {
  assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [item({ description: 'One line\nTwo lines' })] }])).length > 0);
  assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [item({ name: 'Padded ' })] }])).length > 0);
});

test('rejects invalid project and source urls', () => {
  for (const field of ['project_url', 'source_url']) {
    for (const value of ['http://example.com/x', 'https://', 'https://user:secret@example.com/x', 'https://example.com/x#frag']) {
      assert.ok(catalogErrorsFor(catalog([{ name: 'Samples', description: 'Samples.', items: [item({ [field]: value })] }])).length > 0, `${field}: ${value}`);
    }
  }
});

test('rejects duplicate source urls across categories', () => {
  const value = {
    categories: [
      { name: 'One', description: 'First.', items: [item()] },
      { name: 'Two', description: 'Second.', items: [item({ name: 'Another' })] },
    ],
  };
  assert.ok(catalogErrorsFor(value).length > 0);
});

test('warns about query strings in catalog urls', () => {
  const result = validateCatalogData(catalog([
    { name: 'Samples', description: 'Samples.', items: [item({ source_url: 'https://example.com/plugins.json?version=1' })] },
  ]));
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.length, 1);
});

test('reports malformed yaml', () => {
  const result = validateCatalogYamlText('categories: [');
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /not valid YAML/);
});

test('reports duplicate yaml keys', () => {
  const result = validateCatalogYamlText('categories: []\ncategories: []\n');
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /not valid YAML/);
});

test('ignores a utf-8 bom in yaml', () => {
  assert.deepEqual(validateCatalogYamlText('\uFEFFcategories: []\n').errors, []);
});

test('collects source urls in document order', () => {
  const value = {
    categories: [
      { name: 'One', description: 'First.', items: [item({ source_url: 'https://example.com/a.json' }), item({ name: 'B', source_url: 'https://example.com/b.json' })] },
      { name: 'Two', description: 'Second.', items: [item({ name: 'C', source_url: 'https://example.com/c.json' })] },
    ],
  };
  assert.deepEqual(collectSourceUrls(value), [
    'https://example.com/a.json',
    'https://example.com/b.json',
    'https://example.com/c.json',
  ]);
});

test('the repository catalog.yaml is valid', () => {
  const text = readFileSync(new URL('../catalog.yaml', import.meta.url), 'utf8');
  const result = validateCatalogYamlText(text);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);

  const data = parseYaml(text);
  const sources = collectSourceUrls(data);
  assert.ok(sources.length > 0);
  assert.deepEqual(validateCatalog(sources).errors, []);
});
