# App integration contract

This page describes how a SkyCD client consumes the directory. It is the client-side counterpart to [CONTRIBUTING.md](../CONTRIBUTING.md).

## Discovery

- The canonical endpoint is `https://skycd.github.io/awesome-skycd/plugins.json`.
- The previous `raw.githubusercontent.com` endpoint is retired. Clients must use the GitHub Pages endpoint.
- The directory is not a plugin host, package index or update channel. It is a list of manifest URLs.
- Fetch it anonymously over HTTPS. Do not send credentials, cookies or user data. Do not execute code from the catalog or a manifest while building the browse list.

## Reading the catalog

- Accept only a top-level JSON array of unique strings. `[]` is a valid, empty catalog: no sources are listed, and this is not an error.
- Apply the same rules as CI before using an entry: absolute HTTPS, no credentials, no fragment, no whitespace. Skip entries that fail instead of rejecting the whole catalog for one bad entry.
- Fetch manifests only over HTTPS, with a timeout and without credentials. Do not follow redirects that downgrade to HTTP.
- Cache the response and use conditional requests where the host allows it. If a fetch fails or the payload is invalid, keep the last known good list rather than showing an empty directory.
- The endpoint is served from GitHub Pages and is republished when a change to `catalog.yaml` is merged. There is no release artifact to pin.

## Delisted sources

Delisting removes a source from browse results. It must not uninstall, disable or silently alter plugins that are already installed.

Suggested behavior:

- Stop listing the source in browse and add flows.
- Keep installed plugins installed and launchable, together with their settings and data.
- Treat the source's absence as "no longer listed", not as an uninstall command.
- Mark the source and its plugins as delisted in plugin details, and keep uninstall available as a user action.
- Do not remove files or user data because of delisting.
- Installed plugins keep the update path configured at install time. A delisted source is a discovery change, not a rewrite of the publisher feed the plugin already uses.

A source may return after a fix. It can then be listed again and behaves as before.

## Trust boundaries

- The directory does not review binaries. Package signatures, publisher identity and feed trust remain the app's and the user's responsibility.
- Scheduled link checks are advisory and can be stale or wrong. The client must validate the catalog itself.
- Never run package scripts, install hooks or plugin code as part of browsing the catalog or validating a manifest.
