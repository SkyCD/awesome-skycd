import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog, validateCatalogText } from '../scripts/validate-catalog.mjs';

const errorsFor = (value) => validateCatalog(value).errors;

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
