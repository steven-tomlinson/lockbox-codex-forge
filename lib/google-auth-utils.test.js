// Unit tests for google-auth-utils.js
import { loadGoogleAuthToken } from './google-auth-utils.js';

describe('google-auth-utils', () => {
  test('loadGoogleAuthToken returns null if no token', (done) => {
    // Mock chrome.storage.local.get
    global.chrome = { storage: { local: { get: (keys, cb) => cb({}) } } };
    loadGoogleAuthToken((token) => {
      expect(token).toBeNull();
      done();
    });
  });

  test('loadGoogleAuthToken returns token if present', (done) => {
    global.chrome = { storage: { local: { get: (keys, cb) => cb({ googleAuthToken: 'abc123' }) } } };
    loadGoogleAuthToken((token) => {
      expect(token).toBe('abc123');
      done();
    });
  });
});
