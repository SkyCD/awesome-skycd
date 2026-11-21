#!/usr/bin/env node
import { appendFileSync, readFileSync } from 'node:fs';
import { validateCatalogText } from './validate-catalog.mjs';

const TIMEOUT_MS = 15_000;
const CONCURRENCY = 4;
const getFallbackStatuses = new Set([400, 403, 405, 501]);

function loadUrls(file) {
  const text = readFileSync(file, 'utf8');
  const { errors } = validateCatalogText(text);
  if (errors.length > 0) {
    console.error(`${file} is invalid; fix it before checking links:`);
    for (const error of errors) console.error(`error: ${error}`);
    process.exit(1);
  }
  return JSON.parse(text.replace(/^\uFEFF/, ''));
}

function fetchWithTimeout(url, init = {}) {
  return fetch(url, {
    ...init,
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function probe(url) {
  const headers = { 'user-agent': 'awesome-skycd-link-check/1.0' };
  let response = await fetchWithTimeout(url, { method: 'HEAD', headers });
  if (getFallbackStatuses.has(response.status)) {
    response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: { ...headers, range: 'bytes=0-0' },
    });
  }
  return response;
}

async function check(url) {
  try {
    const response = await probe(url);
    const redirected = response.url !== url ? ` -> ${response.url}` : '';
    return {
      url,
      ok: response.status >= 200 && response.status < 400 && response.url.startsWith('https:'),
      detail: `${response.status} ${response.statusText}${redirected}`,
    };
  } catch (error) {
    return {
      url,
      ok: false,
      detail: error.name === 'TimeoutError' ? 'timeout' : error.message,
    };
  }
}

function cell(value) {
  return String(value).replaceAll('|', '\\|');
}

function writeSummary(results, failed) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;

  const lines = [
    '',
    '## Catalog link check (advisory)',
    '',
    '| URL | Result |',
    '| --- | --- |',
    ...results.map((result) => `| ${cell(result.url)} | ${result.ok ? 'ok' : 'failed'}: ${cell(result.detail)} |`),
    '',
    `${results.length - failed}/${results.length} manifest URL(s) reachable. Network results are advisory and do not block pull requests.`,
    '',
  ];
  appendFileSync(path, lines.join('\n'));
}

async function main() {
  const file = process.argv[2] ?? 'plugins.json';
  const urls = loadUrls(file);

  if (urls.length === 0) {
    console.log('catalog is empty; nothing to check');
    return;
  }

  const results = [];
  for (let index = 0; index < urls.length; index += CONCURRENCY) {
    const batch = urls.slice(index, index + CONCURRENCY);
    results.push(...await Promise.all(batch.map(check)));
  }

  for (const result of results) {
    console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.url} (${result.detail})`);
  }

  const failed = results.filter((result) => !result.ok).length;
  console.log(`${results.length - failed}/${results.length} manifest URL(s) reachable`);
  writeSummary(results, failed);

  // Advisory by design: unreachable hosts are reported, never used to block a pull request.
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
