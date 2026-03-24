import {TestBed} from '@angular/core/testing';
import {TranslationService} from './translate.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    delete window.__SIGN_MT_CONFIG__;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should include Dutch and Flemish sign languages in the supported signed languages', () => {
    expect(service.signedLanguages).toContain('dse');
    expect(service.signedLanguages).toContain('vgt');
  });

  it('should split spoken language sentences', () => {
    // splitSpokenSentences
    const sentences = ['Hello. ', 'My name is Inigo Montoya. ', 'You killed my father. ', 'Prepare to die. '];
    const text = sentences.join('');
    const language = 'en';
    const result = service.splitSpokenSentences(language, text);
    if ('Segmenter' in Intl) {
      expect(result).toEqual(sentences);
    } else {
      expect(result).toEqual([text]);
    }
  });

  it('should allow runtime overrides for the pose translation endpoint', () => {
    window.__SIGN_MT_CONFIG__ = {
      translationApi: {
        spokenTextToSignedPoseUrl: 'https://example.com/vgt/pose',
      },
    };

    const result = service.translateSpokenToSigned('Hallo wereld', 'nl', 'dse');

    expect(result).toEqual('https://example.com/vgt/pose?text=Hallo%20wereld&spoken=nl&signed=dse');
  });

  it('should fall back to the DSE backend code for VGT on the shared hosted stack', () => {
    const result = service.translateSpokenToSigned('who are you', 'nl', 'vgt');

    expect(result).toEqual(
      'https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?text=who%20are%20you&spoken=nl&signed=dse'
    );
  });

  it('should prefer signed-language-specific backend overrides over the shared endpoint', () => {
    window.__SIGN_MT_CONFIG__ = {
      translationApi: {
        spokenTextToSignedPoseUrl: 'https://example.com/shared/pose',
      },
      signedLanguageBackends: {
        vgt: {
          spokenTextToSignedPoseUrl: 'https://example.com/vgt/pose',
        },
      },
    };

    const vgtResult = service.translateSpokenToSigned('Hallo wereld', 'nl', 'vgt');
    const dseResult = service.translateSpokenToSigned('Hallo wereld', 'nl', 'dse');

    expect(vgtResult).toEqual('https://example.com/vgt/pose?text=Hallo%20wereld&spoken=nl&signed=vgt');
    expect(dseResult).toEqual('https://example.com/shared/pose?text=Hallo%20wereld&spoken=nl&signed=dse');
  });
});
