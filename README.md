<!-- Generated from catalog.yaml and templates/README.md.j2. Do not edit by hand. -->
# Awesome SkyCD [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of community plugin sources for [SkyCD](https://github.com/SkyCD/SkyCD).

SkyCD plugins are distributed by their publishers as NuGet feeds described by a manifest. This list links to publisher-owned manifests; it does not host, mirror or review plugin binaries.

## Contents

- [Metadata plugins](#metadata-plugins)
- [File format plugins](#file-format-plugins)
- [Feature plugins](#feature-plugins)
- [Sample plugins](#sample-plugins)


## Metadata plugins

- [3D Model Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Models3D) - Extracts structural metadata and renders thumbnails for 3D model files.
- [AbiWord Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.AbiWord) - Reads bounded document metadata from AbiWord XML and gzip-compressed AbiWord files without loading external resources or requiring AbiWord, and renders a bounded thumbnail of the leading body text.
- [Apple iWork Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.IWork) - Reads format version, producer build, language, identifier and package inventory from modern Apple iWork (Pages, Numbers and Keynote) packages without altering them. No credential is requested, guessed or stored, and a protected package is reported as protected while its plain metadata is still catalogued.
- [Archive Contents](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Archives) - Contributes the entries of supported archives as scan work items so metadata providers can inspect them.
- [Audio Tags, Cover Art and Audio CDs](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Audio) - Extracts normalized audio tags and technical stream facts from MP3, FLAC, Ogg Vorbis and M4A sources, reads embedded cover art as a bounded preview, identifies audio CDs and their tracks during catalog scanning, and optionally retrieves disc and track details from MusicBrainz and GnuDb with cover art under configurable per-disc and per-track options.
- [Disk Images](https://github.com/SkyCD/SkyCD.Plugin.Metadata.DiskImages) - Contributes the files inside supported disk images as scan work items so metadata providers can inspect them.
- [eBook Metadata and Covers](https://github.com/SkyCD/SkyCD.Plugin.Metadata.EBook) - Reads title, author and publication metadata from epub, ibook, mobi, azw, azw3, prc and fb2 e-books, publishes author tags and preferred names, and extracts a bounded cover image during indexing.
- [eComic Metadata and Covers](https://github.com/SkyCD/SkyCD.Plugin.Metadata.EComic) - Reads ComicInfo.xml from cbz, cbr and cb7 comic archives, publishes series and title metadata with optional preferred names and writer tags, and extracts a bounded cover image during indexing.
- [Email Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Email) - Captures message metadata from EML and MSG files and mailbox metadata from PST stores.
- [Executable File Facts and Icons](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Executable) - Reads PE version information and technical facts from executable files with the in-box PE reader, and extracts the program's own icon as a bounded, index-time PNG preview so the catalog can show it offline. PNG icons are decoded with SkiaSharp; no Windows-only API is used.
- [File Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.FileMetadata) - Reads the tags, comment and rating a user or a colleague assigned through Windows file properties, Linux extended attributes or macOS Finder properties, so the catalog keeps the metadata that is not stored in the file bytes.
- [Font Metadata and Previews](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Fonts) - Reads font name, version and copyright from ttf, ttc, otf and otc files and renders a bounded preview image with the font's own glyphs.
- [Game Engine Project and Asset Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.GameDev) - Reads typed project and asset facts from Godot, Unity, Unreal, Roblox, GameMaker, RPG Maker, Construct 3, Cocos, Defold, CRYENGINE, O3DE, Flax, Stride, Wicked, Ren'Py, s&box, MonoGame/FNA, LÖVE, libGDX atlases, Tiled, LDtk and Aseprite files, with bounded pixel and structure thumbnails. Referenced tilesets, GUID targets and media files are never opened.
- [Image Preview and Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Image) - See image tags, dimensions and previews where supported. TIFF support reads tags, and some document formats depend on an embedded preview.
- [Jupyter Notebook Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Notebook) - Reads notebook format version, kernel language, cell counts and leading cell titles from Jupyter notebooks through the bounded OfficeIMO reader. The source is never executed, stored output payloads are never decoded, and no kernel, widget or remote resource is contacted.
- [Microsoft Office Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Office) - Reads title, author, dates and document statistics from Word, Excel, PowerPoint, Visio, OneNote, Access and Project documents without altering them. Password-protected content is never decrypted.
- [Microsoft Works Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Works) - Reads title, author, dates and document statistics from Microsoft Works word processor sources, and publishes an embedded preview or a bounded thumbnail of the document's leading text. The source is never modified, decrypted or opened by path.
- [OpenOffice Document Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.OpenOffice) - Reads document metadata from OpenDocument and legacy OpenOffice.org packages, including text fields, statistics and dates, without altering the source. Protected documents are reported as needing a credential and are never decrypted.
- [P2P File Hashes](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Hash) - Streams any file once to compute interoperable eD2k and Tiger Tree Hash identifiers plus a conventional SHA-256 digest.
- [Sequencer Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Sequencer) - Catalogs DAW projects, MIDI files and tracker modules with structure previews.
- [Video Metadata and Poster Frames](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Video) - Reads container metadata from MP4, Matroska, WebM and AVI sources, and renders one bounded poster frame in-process with the bundled OpenCV decoder, falling back to an explicitly configured external decoder when one is available.
- [Video Project Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.VideoProjects) - Reads bounded project facts from Adobe Premiere Pro (.prproj), After Effects (.aep, .aepx) and DaVinci Resolve (.drp, .drt) projects: application version, timelines, tracks, clips, frame rate, duration and referenced media counts, without opening the referenced media.
- [Volume Serial Number](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Volume) - Captures the read-only filesystem volume serial number of a disk when it is added to a catalog.
- [WordPerfect Document Metadata and Preview](https://github.com/SkyCD/SkyCD.Plugin.Metadata.WordPerfect) - Reads the extended document summary from Corel WordPerfect documents, including compound-document storage, and renders a bounded thumbnail of the leading body text, without altering the source. Protected documents are reported as needing a credential and are never decrypted.
- [XMP Sidecar Metadata](https://github.com/SkyCD/SkyCD.Plugin.Metadata.Xmp) - Reads the keywords, description and rating from standalone XMP sidecar files, so a photo's catalog tags travel with the sidecar even when the image formats are read elsewhere.


## File format plugins

- [abeMeda](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.AbeMeda) - Import native abeMeda catalogs, XML catalogs, and compatible NeoFinder text exports.
- [Basenji](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Basenji) - Import Basenji volume databases (.vdb).
- [Broken X Disk Manager](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.BrokenX) - Open and save Broken X Disk Manager databases (.bxd).
- [Cathy](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Cathy) - Import Cathy disk catalogs (.caf).
- [CD Catalog Expert](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCatalogExpert) - Open and save CD Catalog Expert 9.x catalogs (.zdc).
- [CdCat Hyper Catalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCat) - Read-only import of CdCat .hcf hyper catalog files.
- [CDCollect](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDCollect) - Open CDCollect catalogs made with SQLite 2 or SQLite 3. Save catalogs in the SQLite 3 format.
- [CDPlayer.ini](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.CDPlayer) - Read-only import of CDPlayer.ini audio CD databases.
- [Disk Explorer Professional](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskExplorer) - Import native Disk Explorer Professional catalogs and supported report exports. Save XML reports.
- [DiskBase](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskBase) - Import DiskBase QDR catalogs.
- [DiskCatalogMaker](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.DiskCatalogMaker) - Import native v5 catalogs (.dcmf and .dcmd) and text exports from DiskCatalogMaker.
- [Easy Disk Catalog Maker](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.EasyDiskCatalog) - Import Easy Disk Catalog Maker 1.7 databases (.edcdb).
- [GCstar](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.GCstar) - Import GCstar collection exports.
- [Katalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Katalog) - Import Katalog Memory-mode CSV/IDX collections and File-mode SQLite collections.
- [Librer](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Librer) - Import Librer disk databases.
- [MyCatalogue](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.MyCatalogue) - Import MyCatalogue Access databases (.mdb).
- [Playlists](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Playlist) - Reads and writes M3U, PLS and XSPF playlists as catalogs.
- [Smart CD Catalog PRO](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.SmartCDCatalogPro) - Import Smart CD Catalog PRO catalogs (.scdc).
- [TAR Archive Index](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Tar) - Lists TAR archive entries as a catalog hierarchy.
- [Tellico](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Tellico) - Import Tellico archives (.tc) and XML exports.
- [Virtual Volumes View](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.Vvv) - Import Virtual Volumes View CSV or TSV exports and logical backups (.vvvbk).
- [Where Is It?](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.WhereIsIt) - Import Where Is It? XML reports.
- [WinCatalog](https://github.com/SkyCD/SkyCD.Plugin.FileFormat.WinCatalog) - Import native WinCatalog databases and CSV or XML reports.


## Feature plugins

- [Web Browser](https://github.com/SkyCD/SkyCD.Plugin.Feature.WebBrowser) - Opens a built-in web browser window from the Tools menu.


## Sample plugins

- [Sample Configuration](https://github.com/SkyCD/SkyCD.Plugin.Sample.Config) - Demonstrates an embedded, session-local Options draft page without a UI dependency.
- [Sample Menu](https://github.com/SkyCD/SkyCD.Plugin.Sample.Menu) - Demonstrates a Tools menu command that opens a notification dialog.
- [Sample Modal](https://github.com/SkyCD/SkyCD.Plugin.Sample.Modal) - Demonstrates a blocking confirm-export modal with typed input and output contracts.


## Catalog endpoint

The catalog is published to GitHub Pages on every merged change to `catalog.yaml`:

```text
https://skycd.github.io/awesome-skycd/plugins.json
```

The endpoint is public, requires no authentication, and returns a JSON array of unique absolute HTTPS URLs. Each URL points directly at a publisher-owned manifest. The directory stores no package IDs, versions or binaries. An empty array is valid.

Verify it from a clean client:

```bash
curl -sS https://skycd.github.io/awesome-skycd/plugins.json
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

This page is generated from [`catalog.yaml`](catalog.yaml) by [`.github/workflows/render-catalog.yml`](.github/workflows/render-catalog.yml). On merge, that workflow regenerates the list and publishes `plugins.json` to GitHub Pages. Pull-request CI validates the catalog schema and renders both templates without executing plugin code.

## Follow the work

- [SkyCD in-app plugin installation](https://github.com/SkyCD/SkyCD/issues/801)
- [Directory and contribution rules](https://github.com/SkyCD/awesome-skycd/issues/1)
- [Publisher guide and reference plugin](https://github.com/SkyCD/awesome-skycd/issues/2)
