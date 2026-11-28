## Listing change

- Plugin name:
- Category:
- Project URL:
- Source (manifest) URL:
- Publisher:
- NuGet v3 feed:
- License:
- Contact:

## Checklist

- [ ] I read [CONTRIBUTING.md](CONTRIBUTING.md) and the source meets every inclusion criterion.
- [ ] The change is limited to `catalog.yaml`, adds, updates or removes one item, and does not edit `README.md` or `plugins.json`.
- [ ] The item is under an existing category, or the pull request explains the new category.
- [ ] `source_url` is absolute, HTTPS, stable, points directly at a manifest, and has no credentials, fragment or expiring query.
- [ ] `project_url` is the public project page.
- [ ] `description` is a single line and describes the plugin accurately.
- [ ] The manifest is publicly readable without authentication and matches the publishing contract.
- [ ] I can show publisher identity and source ownership.
- [ ] The feed is public, versions are immutable and at least one version is installable.
- [ ] `node .github/scripts/validate-catalog.mjs catalog.yaml` and `node --test` pass locally.
- [ ] The publisher understands that updates ship through their own feed, not through this directory.
