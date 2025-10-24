import { jcsStringify, signEntryCanonical, uuidv4 } from './protocol.js';

export async function signCodexEntry(entry) {
  const canonical = jcsStringify(entry);
  const sig = await signEntryCanonical(canonical);
  entry.signatures.push(sig);
  return entry;
}

export function buildUnsignedCodexEntry({
  id,
  version = "0.0.2",
  payloadDriveId,
  payloadDriveUrl,
  integrity_proof,
  org = "Codex Forge",
  process,
  artifact,
  subject,
  anchor
}) {
  return {
    id,
    version,
    storage: {
      protocol: "gdrive",
      location: payloadDriveUrl || `https://drive.google.com/file/d/${payloadDriveId}`,
      integrity_proof
    },
    identity: {
      org,
      process,
      artifact,
      subject
    },
    anchor,
    signatures: []
  };
}

export async function makeCodexEntrySelfReferential({ entry, codexFileId, token, signCodexEntryFn }) {
  // Update storage.location to point to the Codex entry's own Drive file
  const codexUrl = `https://drive.google.com/file/d/${codexFileId}`;
  entry.storage.location = codexUrl;
  // Remove old signatures and re-sign
  entry.signatures = [];
  await (signCodexEntryFn || signCodexEntry)(entry);
  // Update the file on Drive (this part should be handled by Drive utils)
  return entry;
}
