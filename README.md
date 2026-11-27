# Awesome SkyCD

A curated directory of community plugin sources for [SkyCD](https://github.com/SkyCD/SkyCD).

## Catalog endpoint

The catalog is published from the default branch at:

```text
https://raw.githubusercontent.com/SkyCD/awesome-skycd/main/plugins.json
```

The endpoint is public, requires no authentication, and returns a JSON array of unique absolute HTTPS URLs. Each URL points directly at a publisher-owned manifest. The directory stores no package IDs, versions or binaries. An empty array is valid.

Verify it from a clean client:

```bash
curl -sS https://raw.githubusercontent.com/SkyCD/awesome-skycd/main/plugins.json
```

Format example only (not a listing):

```json
[
  "https://plugins.example.com/skycd/manifest.json"
]
```

Publishers own their manifests, NuGet feeds and release history. Once a source is listed, the author ships updates through those resources without changing this directory. The listing changes only when the manifest URL moves or the source is delisted.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for inclusion criteria, the submission and review process, source moves, removal policy and the contribution checklist. Client behavior, including how a delisted source must be handled, is documented in [docs/APP-INTEGRATION.md](docs/APP-INTEGRATION.md).

CI validates JSON shape, uniqueness and URL syntax on every pull request. It installs no packages, runs no package scripts and never executes plugin code. A separate scheduled check probes manifest reachability and is advisory.

## Follow the work

- [SkyCD in-app plugin installation](https://github.com/SkyCD/SkyCD/issues/801)
- [Directory and contribution rules](https://github.com/SkyCD/awesome-skycd/issues/1)
- [Publisher guide and reference plugin](https://github.com/SkyCD/awesome-skycd/issues/2)
