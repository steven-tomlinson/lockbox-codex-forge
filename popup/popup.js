import { uuidv4, sha256, niSha256, jcsStringify, signEntryCanonical, anchorMock, anchorGoogle } from '../lib/protocol.js';
// ...existing code...
// popup.js - Handles popup UI logic for Lockb0x Protocol Codex Forge

const fileInput = document.getElementById('fileInput');
const extractPageBtn = document.getElementById('extractPageBtn');
const anchorType = document.getElementById('anchorType');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const generateBtn = document.getElementById('generateBtn');
const entryForm = document.getElementById('entryForm');
const jsonResult = document.getElementById('jsonResult');
const certificateSummary = document.getElementById('certificateSummary');
const aiSummary = document.getElementById('aiSummary');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const statusDiv = document.getElementById('status');

let extractedData = '';
let metadata = {};
let googleAuthToken = null;


fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log('[popup] File input changed:', file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      extractedData = evt.target.result;
      statusDiv.textContent = `Loaded file: ${file.name}`;
      console.log('[popup] File loaded:', file.name);
    };
    reader.onerror = function(err) {
      statusDiv.textContent = 'Error reading file.';
      console.error('[popup] FileReader error:', err);
    };
    reader.readAsText(file);
  }
});


extractPageBtn && extractPageBtn.addEventListener('click', () => {
  statusDiv.textContent = 'Extracting page content...';
  console.log('[popup] Extract Page Content button clicked');
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    if (tab.url && tab.url.startsWith('chrome://')) {
      statusDiv.textContent = 'Cannot extract content from chrome:// URLs.';
      console.warn('[popup] Attempted to extract from chrome:// URL:', tab.url);
      return;
    }
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => document.body.innerText
    }, (results) => {
      console.log('[popup] Scripting results:', results);
      if (results && results[0] && results[0].result) {
        extractedData = results[0].result;
        statusDiv.textContent = 'Page content extracted.';
      } else {
        statusDiv.textContent = 'Failed to extract page content.';
        console.error('[popup] Failed to extract page content:', results);
      }
    });
  });
});


// Show/hide Google sign-in button based on anchor type

if (anchorType && googleSignInBtn) {
  anchorType.addEventListener('change', () => {
    console.log('[popup] Anchor type changed:', anchorType.value);
    if (anchorType.value === 'google') {
      googleSignInBtn.style.display = 'inline-block';
    } else {
      googleSignInBtn.style.display = 'none';
      googleAuthToken = null;
    }
  });
}

// Handle Google sign-in

if (googleSignInBtn) {
  googleSignInBtn.addEventListener('click', () => {
    statusDiv.textContent = 'Signing in to Google...';
    console.log('[popup] Google sign-in button clicked');
    chrome.runtime.sendMessage({ type: 'GOOGLE_AUTH_REQUEST' }, (response) => {
      console.log('[popup] Google sign-in response:', response);
      if (response && response.ok && response.token) {
        googleAuthToken = response.token;
        statusDiv.textContent = 'Google sign-in successful.';
      } else {
        statusDiv.textContent = 'Google sign-in failed.';
        console.error('[popup] Google sign-in failed:', response);
      }
    });
  });
}


entryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('[popup] Generate Codex Entry button clicked');
  if (!extractedData) {
    statusDiv.textContent = 'No data to process. Upload a file or extract page content.';
    console.warn('[popup] No data to process');
    return;
  }
  metadata = {
    anchorType: anchorType ? anchorType.value : 'mock',
    googleAuthToken: googleAuthToken
    // Add more metadata fields as needed
  };
  statusDiv.textContent = 'Generating Codex Entry...';
  aiSummary.textContent = '';
  certificateSummary.textContent = '';
  chrome.runtime.sendMessage({
    type: 'CREATE_CODEX_FROM_FILE',
    payload: {
      bytes: Array.from(new TextEncoder().encode(extractedData)),
      filename: fileInput.files[0] ? fileInput.files[0].name : 'web-content.txt',
      anchorType: anchorType ? anchorType.value : 'mock',
      googleAuthToken: googleAuthToken
    }
  }, (response) => {
    console.log('[popup] Codex entry response:', response);
    if (response && response.ok && response.entry) {
      jsonResult.textContent = JSON.stringify(response.entry, null, 2);
      downloadBtn.style.display = 'inline-block';
      copyBtn.style.display = 'inline-block';
      statusDiv.textContent = 'Codex Entry generated.';
      aiSummary.textContent = response.entry.identity.subject || '';
      certificateSummary.textContent = response.entry.certificate_summary || '';
    } else {
      statusDiv.textContent = 'Failed to generate entry.';
      console.error('[popup] Failed to generate entry:', response);
    }
  });
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([jsonResult.textContent], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'codex-entry.json';
  a.click();
  URL.revokeObjectURL(url);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(jsonResult.textContent);
  statusDiv.textContent = 'Copied to clipboard.';
});
