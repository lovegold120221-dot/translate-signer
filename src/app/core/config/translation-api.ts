import {environment} from '../../../environments/environment';

export interface TranslationApiConfig {
  textNormalizationUrl: string;
  signWritingDescriptionUrl: string;
  spokenTextToSignWritingUrl: string;
  spokenTextToSignedPoseUrl: string;
  spokenTextToSignedVideoUrl: string;
  imageToAvatarUrl: string;
}

export type SignedLanguageTranslationApiConfig = Partial<
  Pick<
    TranslationApiConfig,
    'spokenTextToSignWritingUrl' | 'spokenTextToSignedPoseUrl' | 'spokenTextToSignedVideoUrl' | 'imageToAvatarUrl'
  >
>;

interface RuntimeConfig {
  translationApi?: Partial<TranslationApiConfig>;
  signedLanguageBackends?: Record<string, SignedLanguageTranslationApiConfig>;
}

declare global {
  interface Window {
    __SIGN_MT_CONFIG__?: RuntimeConfig;
  }
}

const SIGNED_LANGUAGE_BACKEND_KEYS = [
  'spokenTextToSignWritingUrl',
  'spokenTextToSignedPoseUrl',
  'spokenTextToSignedVideoUrl',
  'imageToAvatarUrl',
] as const satisfies readonly (keyof SignedLanguageTranslationApiConfig)[];

const DEFAULT_SIGNED_LANGUAGE_FALLBACKS = Object.freeze({
  vgt: 'dse',
});

export const DEFAULT_TRANSLATION_API: TranslationApiConfig = Object.freeze(environment.translationApi);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function filterStringValues<T extends string>(record: Record<string, unknown>, keys?: readonly T[]): Partial<Record<T, string>> {
  const entries = Object.entries(record).filter(([key, value]) => {
    return typeof value === 'string' && value.length > 0 && (!keys || keys.includes(key as T));
  });
  return Object.fromEntries(entries) as Partial<Record<T, string>>;
}

export function getTranslationApiConfig(): TranslationApiConfig {
  const runtimeOverride =
    'window' in globalThis && isRecord(window.__SIGN_MT_CONFIG__?.translationApi) ? window.__SIGN_MT_CONFIG__.translationApi : {};
  const filteredOverride = filterStringValues<keyof TranslationApiConfig>(runtimeOverride);

  return {
    ...DEFAULT_TRANSLATION_API,
    ...filteredOverride,
  };
}

export function getSignedLanguageBackendOverrides(): Record<string, SignedLanguageTranslationApiConfig> {
  const runtimeBackends =
    'window' in globalThis && isRecord(window.__SIGN_MT_CONFIG__?.signedLanguageBackends)
      ? window.__SIGN_MT_CONFIG__.signedLanguageBackends
      : {};

  const sanitizedEntries = Object.entries(runtimeBackends).flatMap(([language, value]) => {
    if (!isRecord(value)) {
      return [];
    }

    const override = filterStringValues<(typeof SIGNED_LANGUAGE_BACKEND_KEYS)[number]>(value, SIGNED_LANGUAGE_BACKEND_KEYS);
    if (Object.keys(override).length === 0) {
      return [];
    }

    return [[language.toLowerCase(), override] as const];
  });

  return Object.fromEntries(sanitizedEntries);
}

export function getSignedLanguageTranslationApi(signedLanguage?: string | null): TranslationApiConfig {
  const globalConfig = getTranslationApiConfig();
  if (!signedLanguage) {
    return globalConfig;
  }

  const signedLanguageOverride = getSignedLanguageBackendOverrides()[signedLanguage.toLowerCase()] ?? {};
  return {
    ...globalConfig,
    ...signedLanguageOverride,
  };
}

export function hasSignedLanguageBackendOverride(signedLanguage?: string | null): boolean {
  if (!signedLanguage) {
    return false;
  }

  return signedLanguage.toLowerCase() in getSignedLanguageBackendOverrides();
}

export function getSignedLanguageBackendCode(signedLanguage?: string | null): string {
  if (!signedLanguage) {
    return '';
  }

  const normalizedLanguage = signedLanguage.toLowerCase();
  const fallbackLanguage = DEFAULT_SIGNED_LANGUAGE_FALLBACKS[normalizedLanguage as keyof typeof DEFAULT_SIGNED_LANGUAGE_FALLBACKS];
  if (!fallbackLanguage) {
    return normalizedLanguage;
  }

  if (hasSignedLanguageBackendOverride(normalizedLanguage)) {
    return normalizedLanguage;
  }

  if (!usesDefaultHostedTranslationApi(getSignedLanguageTranslationApi(normalizedLanguage))) {
    return normalizedLanguage;
  }

  return fallbackLanguage;
}

export function isSignedLanguageFallbackActive(signedLanguage?: string | null): boolean {
  if (!signedLanguage) {
    return false;
  }

  return getSignedLanguageBackendCode(signedLanguage) !== signedLanguage.toLowerCase();
}

export function usesDefaultHostedTranslationApi(config = getTranslationApiConfig()): boolean {
  return Object.entries(DEFAULT_TRANSLATION_API).every(([key, value]) => {
    return config[key as keyof TranslationApiConfig] === value;
  });
}
