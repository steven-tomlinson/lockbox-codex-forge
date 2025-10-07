// background.js - Chrome Extension Service Worker
// Handles background tasks for Lockb0x Protocol Codex Forge

chrome.runtime.onInstalled.addListener(() => {
  console.log('Lockb0x Protocol Codex Forge extension installed.');
});

// Utility: UUIDv4 generator
function generateUUIDv4() {
  // Uses crypto.getRandomValues for RFC4122 compliance
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Utility: SHA-256 hashing (returns ArrayBuffer)
async function sha256Hash(data) {
  const encoder = new TextEncoder();
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  return await crypto.subtle.digest('SHA-256', bytes);
}

// Utility: NI-URI encoding (RFC 6920)
function encodeNiUri(hashBuffer) {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `ni:///sha-256;${hashBase64}`;
}

// Utility: RFC 8785 JSON Canonicalization (stub)
function canonicalizeJCS(obj) {
  // TODO: Implement full RFC 8785 canonicalization
  // For now, use stable stringify as a placeholder
  return JSON.stringify(obj, Object.keys(obj).sort());
}

// Entry assembly stub
function createCodexEntry(data, metadata) {
  // Assemble basic Lockb0x entry structure
  return {
    version: "0.0.2",
    id: generateUUIDv4(),
    storage: {
      integrity_proof: null // to be filled after hashing
    },
    identity: metadata || {},
    anchor: {}, // stub
    signatures: []
  };
}

// Message handler for popup/content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'GENERATE_ENTRY') {
    // Example: { type: 'GENERATE_ENTRY', data, metadata }
    const entry = createCodexEntry(message.data, message.metadata);
    sha256Hash(message.data).then(hashBuffer => {
      entry.storage.integrity_proof = encodeNiUri(hashBuffer);
      sendResponse({ entry });
    });
    // Indicate async response
    return true;
  }
  // ...other message types
});
