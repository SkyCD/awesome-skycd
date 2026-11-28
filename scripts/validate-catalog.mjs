#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';

const CONTROL_OR_WHITESPACE = /[\s\u0000-\u001F\u007F]/;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;

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
    const url = validateUrl(entry, at, errors, warnings);
    if (!url) return;

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

export function validateCatalogData(value) {
  const errors = [];
  const warnings = [];

  if (!isMapping(value)) {
    errors.push(`catalog root must be a YAML mapping, got ${describe(value)}`);
    return { errors, warnings };
  }
  if (!Array.isArray(value.categories)) {
    errors.push('categories: must be an array');
    return { errors, warnings };
  }

  const seenCategories = new Map();
  const seenSources = new Map();

  value.categories.forEach((category, categoryIndex) => {
    const at = `categories[${categoryIndex}]`;
    if (!isMapping(category)) {
      errors.push(`${at}: must be a mapping`);
      return;
    }

    if (validateSingleLine(category.name, `${at}.name`, errors)) {
      const key = category.name.toLowerCase();
      if (seenCategories.has(key)) {
        errors.push(`${at}.name: duplicates categories[${seenCategories.get(key)}] (${category.name})`);
      } else {
        seenCategories.set(key, categoryIndex);
      }
    }

    if (!Array.isArray(category['items'])) {
      errors.push(`${at}.items: must be an array`);
      return;
    }
    if (category['items'].length === 0) {
      warnings.push(`${at}: category has no items`);
    }

    category['items'].forEach((item, itemIndex) => {
      const itemAt = `${at}.items[${itemIndex}]`;
      if (!isMapping(item)) {
        errors.push(`${itemAt}: must be a mapping`);
        return;
      }

      validateSingleLine(item.name, `${itemAt}.name`, errors);
      validateSingleLine(item.description, `${itemAt}.description`, errors);
      validateUrl(item.project_url, `${itemAt}.project_url`, errors, warnings);

      const source = validateUrl(item.source_url, `${itemAt}.source_url`, errors, warnings);
      if (source) {
        const key = source.href;
        if (seenSources.has(key)) {
          errors.push(`${itemAt}.source_url: duplicates ${seenSources.get(key)} (${key})`);
        } else {
          seenSources.set(key, `${itemAt}.source_url`);
        }
      }
    });
  });

  return { errors, warnings };
}

export function validateCatalogYamlText(text) {
  let value;
  try {
    value = parseYaml(text.replace(/^\uFEFF/, ''));
  } catch (error) {
    return { errors: [`catalog is not valid YAML: ${error.message}`], warnings: [] };
  }
  return validateCatalogData(value);
}

export function collectSourceUrls(value) {
  if (!isMapping(value) || !Array.isArray(value.categories)) return [];
  return value.categories.flatMap((category) => {
    if (!isMapping(category) || !Array.isArray(category['items'])) return [];
    return category['items']
      .filter((item) => isMapping(item))
      .map((item) => item.source_url);
  });
}

function validateUrl(value, at, errors, warnings) {
  if (typeof value !== 'string') {
    errors.push(`${at}: must be a string, got ${describe(value)}`);
    return null;
  }
  if (value.length === 0) {
    errors.push(`${at}: must not be empty`);
    return null;
  }
  if (CONTROL_OR_WHITESPACE.test(value)) {
    errors.push(`${at}: must not contain whitespace or control characters`);
    return null;
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    errors.push(`${at}: is not an absolute URL: ${JSON.stringify(value)}`);
    return null;
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

  return url;
}

function validateSingleLine(value, at, errors) {
  if (typeof value !== 'string') {
    errors.push(`${at}: must be a string, got ${describe(value)}`);
    return false;
  }
  if (value.length === 0) {
    errors.push(`${at}: must not be empty`);
    return false;
  }
  if (CONTROL_CHARS.test(value)) {
    errors.push(`${at}: must be a single line without control characters`);
    return false;
  }
  if (value.trim() !== value) {
    errors.push(`${at}: must not start or end with whitespace`);
    return false;
  }
  return true;
}

function describe(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  if (typeof value === 'string') return 'a string';
  return `a ${typeof value}`;
}

function isMapping(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isYamlFile(file) {
  return /\.ya?ml$/i.test(file);
}

function main() {
  const file = process.argv[2] ?? 'catalog.yaml';
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`${file}: cannot read: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const yaml = isYamlFile(file);
  const { errors, warnings } = yaml ? validateCatalogYamlText(text) : validateCatalogText(text);
  for (const warning of warnings) console.warn(`warning: ${warning}`);

  if (errors.length > 0) {
    for (const error of errors) console.error(`error: ${error}`);
    console.error(`${file}: ${errors.length} error(s)`);
    process.exitCode = 1;
    return;
  }

  if (yaml) {
    const data = parseYaml(text.replace(/^\uFEFF/, ''));
    const sources = collectSourceUrls(data);
    console.log(`${file}: valid (${data.categories.length} ${data.categories.length === 1 ? 'category' : 'categories'}, ${sources.length} ${sources.length === 1 ? 'item' : 'items'})`);
    return;
  }

  const entries = JSON.parse(text.replace(/^\uFEFF/, ''));
  console.log(`${file}: valid (${entries.length} ${entries.length === 1 ? 'entry' : 'entries'})`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main();
}
