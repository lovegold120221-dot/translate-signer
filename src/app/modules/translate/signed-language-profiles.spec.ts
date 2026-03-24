import {getSignedLanguageProfile} from './signed-language-profiles';

describe('getSignedLanguageProfile', () => {
  afterEach(() => {
    delete window.__SIGN_MT_CONFIG__;
  });

  it('should explain that VGT falls back to DSE when no dedicated backend is configured', () => {
    const profile = getSignedLanguageProfile('vgt');

    expect(profile.status).toBe('experimental');
    expect(profile.defaultSpokenLanguage).toBe('nl');
    expect(profile.note).toContain('falls back to DSE output');
  });

  it('should reflect dedicated VGT routing when a signed-language-specific override is present', () => {
    window.__SIGN_MT_CONFIG__ = {
      signedLanguageBackends: {
        vgt: {
          spokenTextToSignedPoseUrl: 'https://example.com/vgt/pose',
        },
      },
    };

    const profile = getSignedLanguageProfile('vgt');

    expect(profile.status).toBe('experimental');
    expect(profile.note).toContain('VGT custom backend configured');
  });

  it('should warn when VGT relies on a custom global backend', () => {
    window.__SIGN_MT_CONFIG__ = {
      translationApi: {
        spokenTextToSignedPoseUrl: 'https://example.com/shared/pose',
      },
    };

    const profile = getSignedLanguageProfile('vgt');

    expect(profile.status).toBe('experimental');
    expect(profile.note).toContain('custom global spoken-to-signed backend');
  });
});
