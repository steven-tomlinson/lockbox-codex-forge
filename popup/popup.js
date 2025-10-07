// popup.js - Handles popup UI logic for Lockb0x Protocol Codex Forge

const fileInput = document.getElementById('fileInput');
const extractPageBtn = document.getElementById('extractPageBtn');
const anchorSelect = document.getElementById('anchorSelect');
const generateBtn = document.getElementById('generateBtn');
const entryForm = document.getElementById('entryForm');
const jsonResult = document.getElementById('jsonResult');
const certificateSummary = document.getElementById('certificateSummary');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const statusDiv = document.getElementById('status');

let extractedData = '';
let metadata = {};

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      extractedData = evt.target.result;
      statusDiv.textContent = `Loaded file: ${file.name}`;
    };
    reader.readAsText(file);
  }
});

extractPageBtn.addEventListener('click', () => {
  statusDiv.textContent = 'Extracting page content...';
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => document.body.innerText
    }, (results) => {
      if (results && results[0] && results[0].result) {
        extractedData = results[0].result;
        statusDiv.textContent = 'Page content extracted.';
      } else {
        statusDiv.textContent = 'Failed to extract page content.';
      }
    });
  });
});

entryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!extractedData) {
    statusDiv.textContent = 'No data to process. Upload a file or extract page content.';
    return;
  }
  metadata = {
    anchor: anchorSelect.value
    // Add more metadata fields as needed
  };
  statusDiv.textContent = 'Generating Codex Entry...';
  chrome.runtime.sendMessage({
    type: 'GENERATE_ENTRY',
    data: extractedData,
    metadata
  }, (response) => {
    if (response && response.entry) {
      jsonResult.textContent = JSON.stringify(response.entry, null, 2);
      downloadBtn.style.display = 'inline-block';
      copyBtn.style.display = 'inline-block';
      statusDiv.textContent = 'Codex Entry generated.';
      // TODO: Display certificate summary if available
    } else {
      statusDiv.textContent = 'Failed to generate entry.';
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
