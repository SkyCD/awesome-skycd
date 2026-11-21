## Listing change

- Source (publisher / project):
- Manifest URL:
- NuGet v3 feed:
- License:
- Contact:

## Checklist

- [ ] I read [CONTRIBUTING.md](CONTRIBUTING.md) and the source meets every inclusion criterion.
- [ ] The change adds one URL, or replaces one URL for a source move; no other entries changed.
- [ ] The URL is absolute, HTTPS, stable, and points directly at a manifest (no credentials, fragment or expiring query).
- [ ] The manifest is publicly readable without authentication and matches the publishing contract.
- [ ] I can show publisher identity and source ownership.
- [ ] The feed is public, versions are immutable and at least one version is installable.
- [ ] `node scripts/validate-catalog.mjs` and `node --test` pass locally.
- [ ] The publisher understands that updates ship through their own feed, not through this directory.
