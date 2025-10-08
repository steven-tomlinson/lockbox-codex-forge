# AGENTS.md — Code Review & Action Plan for Lockb0x Codex Forge

## Codebase Review (2025-10-07)

### 1. Manifest & Service Worker
- ✅ Manifest now declares background.js as a module (fixes registration error).
- ⚠️ Ensure all required permissions are present: "identity", "storage", "activeTab", "scripting", "contextMenus", "downloads".

### 2. Message Passing & Async Handling
- ✅ Message passing between popup and background is implemented.
- ⚠️ Confirm all async message listeners in background.js use `return true;` for proper callback handling.
- ⚠️ Add robust error handling and logging for all message responses.

### 3. Google Authentication & Anchor Integration
- ✅ Chrome Identity API logic scaffolded in background.js.
- ⚠️ Test Google sign-in flow and handle token errors.
- ⚠️ Google anchor adapter is stubbed; needs real API integration for production.
- ⚠️ UI should clearly indicate anchor type and authentication status.

### 4. AI Metadata Generation
- ✅ AI summarization and process tagging logic present (lib/ai.js).
- ⚠️ Ensure Chrome AI APIs are available and handle fallback gracefully.
- ⚠️ Add error feedback if AI APIs fail or are unavailable.

### 5. UI Feedback & Error Handling
- ✅ Status and error messages shown in popup.
- ✅ Console logging added for debugging.
- ⚠️ Ensure all user actions (file upload, sign-in, entry generation) provide clear feedback and error messages.

### 6. Permissions & Manifest Completeness
- ⚠️ Double-check manifest for all required permissions and host permissions.
- ⚠️ Add "identity" permission for Google sign-in.

### 7. Schema Validation & Export Polish
- ⚠️ Lockb0x v0.0.2 schema validation not yet implemented.
- ⚠️ Add validation before export and display feedback in popup.
- ⚠️ Ensure exported JSON is canonical and signed.

### 8. Unit Testing & Modularity
- ⚠️ Protocol and AI logic are modularized, but no unit tests present.
- ⚠️ Add Jest or similar tests for protocol, anchor, and AI modules.

---

## Action Plan for AI Agents & Contributors

1. **Permissions:**
   - Add and verify all required permissions in manifest.json.
2. **Async Handling:**
   - Ensure all async message listeners use `return true;`.
   - Add error handling and logging for all message responses.
3. **Google Integration:**
   - Test and polish Google sign-in flow.
   - Implement real Google anchor API integration.
   - Improve UI for anchor selection and authentication status.
4. **AI Metadata:**
   - Test Chrome AI API calls and handle errors/fallbacks.
   - Provide user feedback for AI failures.
5. **UI Feedback:**
   - Ensure all actions provide clear status and error messages.
6. **Schema Validation:**
   - Implement Lockb0x schema validation before export.
   - Display validation results in popup.
7. **Testing:**
   - Add unit tests for protocol, anchor, and AI logic.
8. **Documentation:**
   - Update README and docs with troubleshooting, usage, and contribution guidelines.

---

This file is for all AI agents and contributors to track, fix, and improve the extension for hackathon and production readiness.
