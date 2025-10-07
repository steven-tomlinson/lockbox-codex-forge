// lib/protocol.js
// Protocol utilities for Lockb0x Codex Forge

export function generateUUIDv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export async function sha256Hash(data) {
  const encoder = new TextEncoder();
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  return await crypto.subtle.digest('SHA-256', bytes);
}

export function encodeNiUri(hashBuffer) {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `ni:///sha-256;${hashBase64}`;
}

export function canonicalizeJCS(obj) {
  // TODO: Implement full RFC 8785 canonicalization
  return JSON.stringify(obj, Object.keys(obj).sort());
}

export function createCodexEntry(data, metadata) {
  return {
    version: "0.0.2",
    id: generateUUIDv4(),
    storage: {
      integrity_proof: null
    },
    identity: metadata || {},
    anchor: {},
    signatures: []
  };
}
