# Contributing to the SkyCD plugin directory

This repository has one source of truth: [`catalog.yaml`](catalog.yaml). It groups plugins into categories; every category has a name and a one-line description, and every item has a name, a one-line description, a public project URL and a publisher-owned manifest URL.

[`README.md`](README.md) and the published `plugins.json` are generated from that file. Do not edit them by hand; the render workflow overwrites `README.md` on every merge and deploys the HTML page and `plugins.json` to GitHub Pages.

The directory does not host, mirror or review plugin binaries. It does not store package IDs or version history, and it cannot publish an update on a publisher's behalf.

## Catalog format

```yaml
categories:
  - name: Metadata plugins
    description: Read metadata and render previews from catalogued files.
    items:
      - name: Example metadata plugin
        description: Reads example facts from example files during indexing.
        project_url: https://github.com/example/example-plugin
        source_url: https://example.github.io/example-plugin/plugins.json
```

- A category needs `name` (the heading shown on the page) and `description` (one sentence on one line explaining what the category covers).
- `name` is the display name shown in the list and in the app.
- `description` is one sentence on one line, taken from or consistent with the manifest summary.
- `project_url` is the public project page: a repository, website or documentation page.
- `source_url` is the publisher-owned manifest URL. It is the value emitted into `plugins.json`.

Use the existing categories where they fit. Propose a new category in the pull request only when no current category is appropriate, and explain why. Order inside a category is not significant; the list is sorted by name when generated.

## Inclusion criteria

Each proposed source is reviewed against all of the following. A catalog that passes CI can still be rejected on review.

### Publisher identity

- The source is publicly attributable to the person or organization that controls it, for example through a public project page, a verified domain, or an organization-owned repository.
- The pull request identifies a maintainer contact and the public project page.
- Impersonation, lookalike domains and anonymous re-hosting are rejected.

### Source ownership

- The manifest URL is on an HTTPS endpoint controlled by the publisher: a publisher website, GitHub Pages, or a publisher-owned repository.
- The manifest and feed are owned and operated by the same publisher. Third-party mirrors and unofficial repackaging are not listed.
- The publisher can keep the URL stable, or will submit an update when it changes.

### Package provenance

- Packages on the feed are published by the publisher named in the manifest, and package versions are immutable.
- The manifest points to the publisher's own NuGet v3 feed, not to a shared or borrowed feed.
- Source code, build instructions or release notes are publicly traceable, and the license is stated.
- Reviewers check metadata only. They never execute plugin code or package scripts, and a listing is not an endorsement of runtime behavior.

### Manifest and feed availability

- The manifest is readable anonymously over HTTPS, without cookies, custom headers or interactive steps.
- The manifest URL is stable and does not depend on query parameters, signed links or short-lived redirects.
- The manifest matches the published contract, and the feed is publicly reachable with at least one installable version.
- The publisher can release updates through the manifest and feed without changing this directory.

## Propose a listing

1. Fork the repository and create a branch.
2. Add exactly one item to `catalog.yaml` under the best category, or update or remove one existing item. Do not edit `README.md` or `plugins.json`.
3. Validate locally:

   ```bash
   npm ci --ignore-scripts
   node .github/scripts/validate-catalog.mjs catalog.yaml
   node --test
   ```

4. Open a pull request using the template checklist. Include the publisher, the ownership evidence, the manifest URL, the public project page and the license.

CI rejects a pull request when the YAML is malformed, a field is missing, empty or not a single line, a URL is not an absolute HTTPS URL, two items share a source URL, or two categories share a name. Every category needs a name and a description. CI also renders the templates and validates the generated catalog array.

CI installs only the pinned YAML parser with lifecycle scripts disabled. It runs no package scripts and never executes plugin code.

Reviewers then verify identity, ownership, provenance and availability. Reviews are metadata-only: a reviewer may open the manifest and feed but must not run publisher code. The pull request receives an approval or the reason for rejection.

## Rendering and publishing

On every merge that changes `catalog.yaml`, templates, scripts or the renderer, [`.github/workflows/render-catalog.yml`](.github/workflows/render-catalog.yml):

- renders `README.md` from [`templates/README.md.j2`](templates/README.md.j2) and commits it back to `main`;
- renders `plugins.json` from [`templates/plugins.json.j2`](templates/plugins.json.j2), renders the HTML page from [`templates/index.html.j2`](templates/index.html.j2), and publishes both to GitHub Pages.

The published site is:

```text
https://skycd.github.io/awesome-skycd/
https://skycd.github.io/awesome-skycd/plugins.json
```

Repository maintainers must enable GitHub Pages with **Source: GitHub Actions** under **Settings → Pages** before the first deployment. Branch protection must also allow the render workflow to push the generated `README.md` commit, for example with a GitHub Actions bypass rule.

## Updates and source moves

Updates belong to the publisher:

- New versions and changes need no directory change. Publish to your feed and update your manifest; clients see the change on their next fetch.
- Keep the manifest URL and project URL stable. Apps and cached catalogs may hold them for a long time.
- If the manifest URL must change because of a domain change, a repository rename or a Pages move, open one pull request that replaces `source_url` with the new one. Keep the new URL live before the merge, and never reuse the old URL for different content.
- Update `project_url` in the same pull request when the repository or project page moves.

## Removal and delisting

A maintainer may remove an item from `catalog.yaml`, recording the reason in the pull request that removes it, when:

- the publisher asks for removal;
- ownership or control can no longer be verified, for example after an account or domain transfer;
- the manifest or feed has been unavailable for a sustained period;
- the source violates the criteria above, including non-HTTPS access, authentication, mirrors or unstable URLs;
- a security incident affects the source, such as a compromised account or malicious packages.

Where possible the publisher is told first through the pull request or the contact in the listing. Security incidents can be removed immediately without prior notice.

Delisting is a change to this catalog only. It removes the source from browse results and does not uninstall anything from a user's machine.

A removed source can be proposed again once the problem is fixed, with evidence in a new pull request.

## Contribution checklist

- [ ] The change is limited to `catalog.yaml` and touches exactly the intended item.
- [ ] The item is under an existing category, or the pull request explains the new category.
- [ ] `source_url` is absolute, HTTPS, points directly at the manifest, and has no credentials, fragment or expiring query.
- [ ] `source_url` is stable and unique across the catalog.
- [ ] `project_url` is the public project page and is reachable.
- [ ] `description` is a single line and describes the plugin accurately.
- [ ] The manifest is publicly readable without authentication and matches the publishing contract.
- [ ] Publisher identity and source ownership are explained in the pull request.
- [ ] Package provenance and the license are linked.
- [ ] The NuGet v3 feed is public and has at least one installable version.
- [ ] `node .github/scripts/validate-catalog.mjs catalog.yaml` and `node --test` pass locally.
- [ ] The publisher understands that updates ship through their own feed, not through this directory.
