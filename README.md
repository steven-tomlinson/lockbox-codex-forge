# Lockb0x Codex Forge — Chrome Extension

## Overview
Lockb0x Codex Forge is a Chrome Extension that streamlines the creation of secure, verifiable Lockb0x Codex Entries (v0.0.2) from web content or user-uploaded files. It leverages Chrome's built-in AI for automated metadata generation and supports both mock and Google anchor flows for robust protocol compliance.

## Elevator Pitch
Lockb0x Codex Forge empowers anyone to create cryptographically verifiable records of digital content—files, research, or web pages—using Chrome’s AI and Google Cloud integration. In seconds, users can anchor, sign, and export entries for compliance, provenance, and sharing. Designed for the Google Chrome Extension 2025 Hackathon, it’s secure, automated, and ready for real-world impact.

## Impact Statement
Lockb0x Codex Forge addresses the growing need for digital trust and provenance. By automating secure record creation and anchoring to Google Cloud, it enables researchers, professionals, and everyday users to prove authenticity and integrity of digital assets. The extension reduces manual errors, saves time, and sets a new standard for browser-based digital certification.

## Competitive Analysis
- **Existing Solutions:** Most Chrome extensions for file management or metadata generation lack cryptographic signing, canonicalization, and anchor integration. Few leverage Chrome AI or Google Cloud APIs for provenance.
- **Differentiators:** Lockb0x Codex Forge combines protocol-grade security, AI-powered automation, and Google anchoring in a single, user-friendly package. Competing extensions do not offer this level of compliance, automation, or integration.

## User Personas & Use Cases
- **Researcher:** Needs to certify the authenticity of research data and share it with collaborators.
- **Compliance Officer:** Requires verifiable records for audits and regulatory filings.
- **Content Creator:** Wants to prove ownership and timestamp of digital works.
- **General User:** Seeks a simple way to anchor and sign files for personal records.

**Use Cases:**
- Certifying research datasets for publication
- Anchoring legal documents for compliance
- Verifying ownership of creative works
- Creating tamper-proof records for audits

## Hackathon Judging Criteria Mapping
- **Innovation:** First Chrome extension to combine protocol-grade cryptography, AI metadata, and Google Cloud anchoring.
- **Impact:** Enables digital trust for a wide range of users and industries.
- **Technical Excellence:** Implements Manifest V3, Chrome AI APIs, Google Identity, and robust error handling.
- **Usability:** Simple popup UI, clear feedback, and easy export/copy features.
- **Demo-Ready:** Rapid setup, clear instructions, and demo assets for judges.

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

## Demo Instructions
1. Install the extension as described above.
2. Use the popup to upload a file or extract content from a web page.
3. Select anchor type and generate entry.
4. Export or copy the entry; verify schema and signature in the popup.
5. For Google anchor, sign in with your Google account and follow UI prompts.
6. See demo assets in the repository (screenshots, GIFs, video link).

## Technical Overview
- **Protocol Logic:** Modularized in `lib/protocol.js` and `background.js`.
- **AI Integration:** In `lib/ai.js`, using Chrome AI APIs.
- **Google Anchor:** Uses Chrome Identity API for authentication and Google APIs for anchor creation (adapter is stubbed; UI and error feedback are implemented. See docs/GoogleCloudAnchor.md for status and next steps).
- **Schema Validation:** Ensures all entries are compliant before export; validation runs before export and feedback is shown in the popup UI.
- **Unit Testing:** Protocol, AI, and validation modules are covered by unit tests.

## Roadmap
- Complete Google anchor integration (API calls, error handling, and feedback).
- Expand AI metadata capabilities (contextual tagging, multi-language support).
- Add more export formats and cloud destinations.
- Gather user feedback and iterate on UI/UX.
- Enhance schema validation and compliance checks.
- Prepare for public release and Chrome Web Store submission.

## Documentation & Support
- See `docs/DEVELOPMENT-PLAN.md` for the full implementation roadmap and current build status.
- See `docs/GoogleCloudAnchor.md` for Google anchor integration status and next steps.
- See `docs/AGENTS.md` for action plans, debugging, and contribution guidelines.

## Contributing
Pull requests and feedback are welcome! See the docs for contribution guidelines.

---
Lockb0x Codex Forge — Secure, AI-powered, and ready for the future of digital provenance.

## Submission Checklist
- README includes elevator pitch, impact, competitive analysis, personas, use cases, demo, technical overview, and roadmap
- Demo assets (screenshots, GIFs, video) are present
- User feedback and testing summary included
- Competitive analysis section completed
- Roadmap for future development included
- All hackathon requirements mapped and documented
- Documentation is organized and accessible for judges

## Current Build Status (as of 2025-10-14)
- Protocol core and AI metadata integration are complete and working.
- Google anchor integration is in progress (adapter stubbed, UI/auth logic present; UI feedback and error handling improved).
- Schema validation and export polish are implemented and working in the popup.
- Unit testing for protocol, AI, and validation modules is implemented.

## Troubleshooting & Error Handling
### Common Issues
- **Unchecked runtime.lastError: Cannot access a chrome:// URL**
	- This occurs if you try to extract content from a Chrome internal page (chrome://). Only extract from regular web pages.
- **Uncaught SyntaxError: Cannot use import statement outside a module**
	- Ensure popup.js is loaded with `<script type="module">` in popup.html. All imports should use correct relative paths.
- **Google Sign-In Not Working**
	- Make sure you have the "identity" permission in manifest.json and are signed into Chrome with a Google account.
- **Service Worker Registration Failed**
	- Confirm that background.js is declared as a module in manifest.json (`type: "module"`).

### Debugging Tips
- Use Chrome DevTools (F12) on the popup and background pages for console logs and error messages.
- Check the extension's background page for logs and errors in chrome://extensions > Details > Inspect views.
- Review status and error messages in the popup UI for feedback on user actions.
- For anchor and signing errors, see the console logs in background.js for detailed error traces.

For more help, see `docs/AGENTS.md` for a full action plan and debugging checklist.