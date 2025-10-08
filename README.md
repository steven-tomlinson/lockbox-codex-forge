# Lockb0x Codex Forge — Chrome Extension

## Overview

Lockb0x Codex Forge is a Chrome Extension that streamlines the creation of secure, verifiable Lockb0x Codex Entries (v0.0.2) from web content or user-uploaded files. It leverages Chrome's built-in AI for automated metadata generation and supports both mock and Google anchor flows for robust protocol compliance.

## Unique Features

- **Manifest V3 Architecture:** Secure, modern Chrome extension design.
- **AI-Assisted Metadata:** Uses Chrome AI APIs to summarize content and generate process tags and certificate summaries.
- **Protocol Engine:** Implements Lockb0x v0.0.2 features—UUID generation, SHA-256 hashing, ni-URI encoding, RFC 8785 canonicalization, and ECDSA signing.
- **Anchor Flexibility:** Supports both mock anchors and Google anchor integration (with Google authentication and Drive support).
- **Schema Validation:** Ensures all entries conform to Lockb0x protocol standards.
- **User-Friendly UI:** Simple popup for file upload, page extraction, anchor selection, and export/copy of entries.

## Why Use Lockb0x Codex Forge?

- **Security & Verifiability:** Create cryptographically signed, canonical entries for digital assets, research, or compliance.
- **Automation:** Let AI generate human-readable summaries and tags, saving time and reducing manual errors.
- **Google Integration:** For users with Google accounts, anchor entries to Google Drive or Cloud for enhanced provenance and sharing.
- **Hackathon-Ready:** Designed for rapid prototyping, demo, and real-world use.

## When & How to Use

### When
- You need to create verifiable records of files, web content, or research.
- You want to automate metadata and certificate generation.
- You require Google-based anchoring for compliance or sharing.
- You’re participating in a hackathon or want to demo protocol features quickly.

### How
1. **Install the Extension:** Load it in Chrome via `chrome://extensions` (Developer Mode > Load Unpacked).
2. **Open the Popup:** Click the extension icon.
3. **Upload a File or Extract Page Content:** Use the popup to select your source data.
4. **Select Anchor Type:** Choose between mock or Google anchor (Google account required for Google anchor).
5. **Generate Entry:** The extension will hash, canonicalize, sign, and anchor your entry, using AI to generate metadata.
6. **Export or Copy:** Download the JSON entry or copy it to your clipboard for use in Lockb0x workflows.

## Implementation Details

- **Protocol Logic:** Modularized in `lib/protocol.js` and `background.js`.
- **AI Integration:** In `lib/ai.js`, using Chrome AI APIs.
- **Google Anchor:** Uses Chrome Identity API for authentication and Google APIs for anchor creation (see docs/GoogleCloudAnchor.md).
- **Schema Validation:** Ensures all entries are compliant before export.

## Documentation & Support

- See `docs/DEVELOPMENT-PLAN.md` for the full implementation roadmap.
- See `docs/GoogleCloudAnchor.md` for Google anchor integration details.

## Contributing

Pull requests and feedback are welcome! See the docs for contribution guidelines.

---

Lockb0x Codex Forge — Secure, AI-powered, and ready for the future of digital provenance.