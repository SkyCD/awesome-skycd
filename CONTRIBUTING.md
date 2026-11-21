# Contributing to the SkyCD plugin directory

This repository is a URL-only index. A listing is one HTTPS URL pointing at a publisher-owned manifest. The manifest describes package IDs and the NuGet v3 feed as specified by the publishing contract in [issue #2](https://github.com/SkyCD/awesome-skycd/issues/2).

The directory does not host, mirror or review plugin binaries. It does not store package IDs or version history, and it cannot publish an update on a publisher's behalf.

## Inclusion criteria

Each proposed source is reviewed against all of the following. A URL that passes CI can still be rejected on review.

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
2. Add exactly one URL to `plugins.json`, or replace an existing entry when moving a source. The file must remain a JSON array of unique absolute HTTPS URLs. `[]` is valid, and order is not significant.
3. Validate locally:

   ```bash
   node scripts/validate-catalog.mjs
   node --test
   ```

4. Open a pull request using the template checklist. Include the publisher, the ownership evidence, the manifest URL, the public project page and the license.

CI rejects a pull request when the file is not a JSON array, an entry is not a string, a URL is not an absolute HTTPS URL, or two entries resolve to the same URL. CI does not install packages, run package scripts or execute plugin code.

Reviewers then verify identity, ownership, provenance and availability. Reviews are metadata-only: a reviewer may open the manifest and feed but must not run publisher code. The pull request receives an approval or the reason for rejection.

## Updates and source moves

Updates belong to the publisher:

- New versions and changes need no directory change. Publish to your feed and update your manifest; clients see the change on their next fetch.
- Keep the manifest URL stable. Apps and cached catalogs may hold it for a long time.
- If the URL must change because of a domain change, a repository rename or a Pages move, open one pull request that replaces the old URL with the new one. Keep the new URL live before the merge, and never reuse the old URL for different content.
- Update the listing after a repository rename instead of relying on redirects from the old manifest URL.

## Removal and delisting

A maintainer may remove an entry, recording the reason in the pull request that removes it, when:

- the publisher asks for removal;
- ownership or control can no longer be verified, for example after an account or domain transfer;
- the manifest or feed has been unavailable for a sustained period;
- the source violates the criteria above, including non-HTTPS access, authentication, mirrors or unstable URLs;
- a security incident affects the source, such as a compromised account or malicious packages.

Where possible the publisher is told first through the pull request or the contact in the listing. Security incidents can be removed immediately without prior notice.

Delisting is a change to this catalog only. It removes the source from browse results and does not uninstall anything from a user's machine. The client contract is documented in [docs/APP-INTEGRATION.md](docs/APP-INTEGRATION.md).

A removed source can be proposed again once the problem is fixed, with evidence in a new pull request.

## Contribution checklist

- [ ] `plugins.json` remains a JSON array, and the change is limited to the intended entry.
- [ ] The URL is absolute, HTTPS, and points directly at the manifest (no credentials, no fragment).
- [ ] The URL is stable and is not a signed or expiring link.
- [ ] The manifest is publicly readable without authentication and matches the publishing contract.
- [ ] Publisher identity and source ownership are explained in the pull request.
- [ ] Package provenance and the license are linked.
- [ ] The NuGet v3 feed is public and has at least one installable version.
- [ ] `node scripts/validate-catalog.mjs` and `node --test` pass locally.
- [ ] The publisher understands that updates ship through their own feed, not through this directory.
