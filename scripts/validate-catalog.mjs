#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const CONTROL_OR_WHITESPACE = /[\s\u0000-\u001F\u007F]/;

export function validateCatalog(value) {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(value)) {
    errors.push(`catalog root must be a JSON array, got ${describe(value)}`);
    return { errors, warnings };
  }

  const seen = new Map();

  value.forEach((entry, index) => {
    const at = `entry ${index}`;

    if (typeof entry !== 'string') {
      errors.push(`${at}: must be a string, got ${describe(entry)}`);
      return;
    }
    if (entry.length === 0) {
      errors.push(`${at}: must not be empty`);
      return;
    }
    if (CONTROL_OR_WHITESPACE.test(entry)) {
      errors.push(`${at}: must not contain whitespace or control characters`);
      return;
    }

    let url;
    try {
      url = new URL(entry);
    } catch {
      errors.push(`${at}: is not an absolute URL: ${JSON.stringify(entry)}`);
      return;
    }

    if (url.protocol !== 'https:') {
      errors.push(`${at}: must use https, got ${JSON.stringify(url.protocol)}`);
    }
    if (!url.hostname) {
      errors.push(`${at}: must include a host name`);
    }
    if (url.username || url.password) {
      errors.push(`${at}: must not embed credentials`);
    }
    if (url.hash) {
      errors.push(`${at}: must not include a fragment`);
    }
    if (url.search) {
      warnings.push(`${at}: query strings are discouraged; use a stable path`);
    }

    const key = url.href;
    if (seen.has(key)) {
      errors.push(`${at}: duplicates entry ${seen.get(key)} (${key})`);
    } else {
      seen.set(key, index);
    }
  });

  return { errors, warnings };
}

export function validateCatalogText(text) {
  let value;
  try {
    value = JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (error) {
    return { errors: [`catalog is not valid JSON: ${error.message}`], warnings: [] };
  }
  return validateCatalog(value);
}

function describe(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  if (typeof value === 'string') return 'a string';
  return `a ${typeof value}`;
}

function main() {
  const file = process.argv[2] ?? 'plugins.json';
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`${file}: cannot read: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const { errors, warnings } = validateCatalogText(text);
  for (const warning of warnings) console.warn(`warning: ${warning}`);

  if (errors.length > 0) {
    for (const error of errors) console.error(`error: ${error}`);
    console.error(`${file}: ${errors.length} error(s)`);
    process.exitCode = 1;
    return;
  }

  const entries = JSON.parse(text.replace(/^\uFEFF/, ''));
  console.log(`${file}: valid (${entries.length} ${entries.length === 1 ? 'entry' : 'entries'})`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main();
}
