// Unit tests for codex-ui-utils.js
import { showError, updateCodexUI } from './codex-ui-utils.js';

describe('codex-ui-utils', () => {
  test('showError sets statusDiv text and color', () => {
    const statusDiv = { textContent: '', style: { color: '' } };
    showError(statusDiv, 'Test error', 'Try again');
    expect(statusDiv.textContent).toContain('Error: Test error');
    expect(statusDiv.textContent).toContain('Recovery: Try again');
    expect(statusDiv.style.color).toBe('#c62828');
  });

  test('updateCodexUI sets UI elements for valid entry', () => {
    const statusDiv = { textContent: '', style: { color: '' } };
    const jsonResult = { textContent: '' };
    const downloadBtn = { style: { display: '' } };
    const copyBtn = { style: { display: '' } };
    const aiSummary = { textContent: '' };
    const certificateSummary = { textContent: '' };
    const domRefs = { statusDiv, jsonResult, downloadBtn, copyBtn, aiSummary, certificateSummary };
    const entry = {
      entry: {
        identity: { subject: 'subject' },
        certificate_summary: 'cert',
        storage: { location: 'https://drive.google.com/file', protocol: 'gdrive' }
      }
    };
    updateCodexUI(domRefs, entry, true, 'Payload exists');
    expect(jsonResult.textContent).toContain('subject');
    expect(downloadBtn.style.display).toBe('inline-block');
    expect(copyBtn.style.display).toBe('inline-block');
    expect(statusDiv.style.color).toBe('#00796b');
    expect(aiSummary.textContent).toContain('subject');
    expect(certificateSummary.textContent).toContain('cert');
  });
});
