// Google OAuth token storage
let googleAuthToken = null;

// Handle Google authentication request
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GOOGLE_AUTH_REQUEST') {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        sendResponse({ ok: false, error: chrome.runtime.lastError });
      } else {
        googleAuthToken = token;
        sendResponse({ ok: true, token });
      }
    });
    return true;
  }
});
// background.js - Chrome Extension Service Worker
// Handles background tasks for Lockb0x Protocol Codex Forge

chrome.runtime.onInstalled.addListener(() => {
  console.log('Lockb0x Protocol Codex Forge extension installed.');
});


import { uuidv4, sha256, niSha256, jcsStringify, signEntryCanonical, anchorMock, anchorGoogle } from './lib/protocol.js';
import { summarizeContent, generateProcessTag, generateCertificateSummary } from './lib/ai.js';

// Message handler for popup/content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === "CREATE_CODEX_FROM_FILE") {
      const { bytes, filename, anchorType, googleAuthToken } = msg.payload;
      const fileBytes = new Uint8Array(bytes);
      const hash = await sha256(fileBytes);
      const integrity = niSha256(hash);

      // AI integration for subject, process, and certificate summary
      const fileText = new TextDecoder().decode(fileBytes);
      const subject = await summarizeContent(fileText);
      const processTag = await generateProcessTag(fileText);

      let anchor;
      if (anchorType === 'google' && googleAuthToken) {
        anchor = await anchorGoogle({ id: uuidv4(), storage: { integrity_proof: integrity } }, googleAuthToken);
      } else {
        anchor = await anchorMock({ id: uuidv4(), storage: { integrity_proof: integrity } });
      }

      const entry = {
        id: uuidv4(),
        version: "0.0.2",
        storage: {
          protocol: anchorType === 'google' ? 'google' : 'local',
          location: filename,
          integrity_proof: integrity
        },
        identity: {
          org: "Codex Forge",
          process: processTag,
          artifact: filename,
          subject
        },
        anchor,
        signatures: []
      };

      const canonical = jcsStringify(entry);
      const sig = await signEntryCanonical(canonical);
      entry.signatures.push(sig);

      entry.certificate_summary = await generateCertificateSummary(entry);

      sendResponse({ ok: true, entry });
    }
  })();
  return true;
});
