<!-- Generated from catalog.yaml and templates/README.md.j2. Do not edit by hand. -->
# Awesome SkyCD

> A curated list of community plugin sources for [SkyCD](https://github.com/SkyCD/SkyCD).

SkyCD plugins are distributed by their publishers as NuGet feeds described by a manifest. This list links to publisher-owned manifests; it does not host, mirror or review plugin binaries.

## Contents

- [Feature plugins](#feature-plugins)
- [File format plugins](#file-format-plugins)
- [Metadata plugins](#metadata-plugins)
- [Sample plugins](#sample-plugins)


## Feature plugins

Add user-facing features to the SkyCD desktop app.

- [Web Browser](https://github.com/SkyCD/SkyCD.Plugin.Feature.WebBrowser) - Opens a built-in web browser from the Tools menu.


## File format plugins

Import, open, save, or export third-party catalog, database, and playlist formats.

- [abeMeda](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.AbeMeda) - Imports abeMeda, XML, and NeoFinder text catalogs.
- [Basenji](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Basenji) - Imports Basenji volume databases (.vdb).
- [Broken X Disk Manager](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.BrokenX) - Opens and saves Broken X Disk Manager databases (.bxd).
- [Cathy](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Cathy) - Imports Cathy disk catalogs (.caf).
- [CD Catalog Expert](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCatalogExpert) - Opens and saves CD Catalog Expert 9.x catalogs (.zdc).
- [CdCat Hyper Catalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCat) - Imports CdCat hyper catalogs (.hcf) as read-only.
- [CDCollect](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCollect) - Opens SQLite 2/3 catalogs and saves in SQLite 3.
- [CDPlayer.ini](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDPlayer) - Imports CDPlayer.ini audio CD databases (read-only).
- [Disk Explorer Professional](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskExplorer) - Imports Disk Explorer Professional catalogs and reports; saves XML reports.
- [DiskBase](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskBase) - Imports DiskBase QDR catalogs.
- [DiskCatalogMaker](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskCatalogMaker) - Imports DiskCatalogMaker v5 catalogs and text exports.
- [Easy Disk Catalog Maker](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.EasyDiskCatalog) - Imports Easy Disk Catalog Maker 1.7 databases (.edcdb).
- [GCstar](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.GCstar) - Imports GCstar collection exports.
- [Katalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Katalog) - Imports Katalog CSV/IDX and SQLite collections.
- [Librer](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Librer) - Imports Librer disk databases.
- [MyCatalogue](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.MyCatalogue) - Imports MyCatalogue Access databases (.mdb).
- [Playlists](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Playlist) - Reads and writes M3U, PLS, and XSPF playlists.
- [Smart CD Catalog PRO](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.SmartCDCatalogPro) - Imports Smart CD Catalog PRO catalogs (.scdc).
- [TAR Archive Index](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Tar) - Lists TAR archive entries as a catalog hierarchy.
- [Tellico](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Tellico) - Imports Tellico archives and XML exports.
- [Virtual Volumes View](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Vvv) - Imports Virtual Volumes View CSV/TSV exports and logical backups.
- [Where Is It?](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.WhereIsIt) - Imports Where Is It? XML reports.
- [WinCatalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.WinCatalog) - Imports WinCatalog databases and CSV/XML reports.


## Metadata plugins

Read metadata and render previews from catalogued files.

- [3D Model Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Models3D) - Reads structural metadata and renders thumbnails from 3D model files.
- [AbiWord Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.AbiWord) - Reads document metadata and renders a preview without requiring AbiWord.
- [Apple iWork Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.IWork) - Reads metadata from Pages, Numbers, and Keynote documents.
- [Archive Contents](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Archives) - Lists archive contents for metadata scanning.
- [Audio Tags, Cover Art and Audio CDs](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Audio) - Reads audio tags, cover art, and CD details.
- [Disk Images](https://github.com/SkyCD/SkyCD.Plugin.Metadata.DiskImages) - Lists files inside disk images for scanning.
- [eBook Metadata and Covers](https://github.com/SkyCD/SkyCD.Plugin.Metadata.EBook) - Reads e-book metadata and extracts covers.
- [eComic Metadata and Covers](https://github.com/SkyCD/SkyCD.Plugin.Metadata.EComic) - Reads comic metadata and extracts covers.
- [Email Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Email) - Reads email and mailbox metadata.
- [Executable File Facts and Icons](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Executable) - Reads executable version details and extracts the program icon.
- [File Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.FileMetadata) - Reads tags, comments, and ratings from file properties.
- [Font Metadata and Previews](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Fonts) - Reads font names and renders font previews.
- [Game Engine Project and Asset Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.GameDev) - Reads project and asset metadata from game engines and tools.
- [Image Preview and Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Image) - Shows image tags, dimensions, and previews.
- [Jupyter Notebook Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Notebook) - Reads notebook metadata and titles without executing code.
- [Microsoft Office Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Office) - Reads metadata from Microsoft Office documents without decrypting them.
- [Microsoft Works Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Works) - Reads metadata and renders a text preview from Microsoft Works documents.
- [OpenOffice Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.OpenOffice) - Reads metadata from OpenDocument and OpenOffice documents without decrypting them.
- [P2P File Hashes](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Hash) - Computes eD2k, Tiger Tree Hash, and SHA-256 hashes.
- [Sequencer Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Sequencer) - Catalogs DAW projects, MIDI files, and tracker modules.
- [Video Metadata and Poster Frames](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Video) - Reads video metadata and renders a poster frame.
- [Video Project Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.VideoProjects) - Reads project metadata from Premiere Pro, After Effects, and DaVinci Resolve.
- [Volume Serial Number](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Volume) - Captures the filesystem volume serial number when a disk is added.
- [WordPerfect Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.WordPerfect) - Reads document metadata and renders a text preview without decrypting files.
- [XMP Sidecar Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Xmp) - Reads keywords, description, and rating from XMP sidecar files.


## Sample plugins

Reference plugins that demonstrate the plugin API and UI contracts.

- [Sample Configuration](https://github.com/SkyCD/SkyCD.Plugin.Sample.Config) - Demonstrates an embedded, session-local Options draft page.
- [Sample Menu](https://github.com/SkyCD/SkyCD.Plugin.Sample.Menu) - Demonstrates a Tools menu command with a notification dialog.
- [Sample Modal](https://github.com/SkyCD/SkyCD.Plugin.Sample.Modal) - Demonstrates a blocking confirm-export modal with typed contracts.


## How this list works

Every entry links to the publisher who makes the plugin. SkyCD reads that publisher's manifest, shows the plugin in its built-in browser, and installs it from the publisher's own NuGet feed. Nothing is hosted, mirrored or reviewed here, and a listing is not an endorsement of what a plugin does.

Publishers ship updates through their own feed, not through this list. The list changes only when a plugin is added, moves to a new manifest address, or is removed.

## Reading the list from an app

SkyCD and other clients read the same entries as JSON, published alongside this page:

```text
https://skycd.github.io/awesome-skycd/plugins.json
```

The response is an open, anonymous list of manifest URLs that matches the plugins shown here; an empty list is valid. How a plugin gets listed is described in [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for inclusion criteria, the submission and review process, source moves, removal policy and the contribution checklist. Delisting affects only this list; it never uninstalls anything from a user's machine.
