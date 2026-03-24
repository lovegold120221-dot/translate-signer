function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

type SignedLanguageGatewayOverride = Partial<{
  spokenTextToSignedPoseUrl: string;
  spokenTextToSignedVideoUrl: string;
  imageToAvatarUrl: string;
}>;

const defaults = Object.freeze({
  spokenTextToSignedPoseUrl: 'https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose',
  spokenTextToSignedVideoUrl: 'https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_video',
  imageToAvatarUrl: 'https://image-to-avatar-665830225099.us-central1.run.app/',
});

const signedLanguageGatewayKeys = [
  'spokenTextToSignedPoseUrl',
  'spokenTextToSignedVideoUrl',
  'imageToAvatarUrl',
] as const satisfies readonly (keyof SignedLanguageGatewayOverride)[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSignedLanguageGatewayOverrides(): Record<string, SignedLanguageGatewayOverride> {
  const raw = process.env.SIGNED_LANGUAGE_BACKENDS_JSON;
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return {};
    }

    const entries = Object.entries(parsed).flatMap(([language, value]) => {
      if (!isRecord(value)) {
        return [];
      }

      const overrideEntries = signedLanguageGatewayKeys.flatMap(key => {
        const candidate = value[key];
        return typeof candidate === 'string' && candidate.length > 0 ? [[key, candidate] as const] : [];
      });

      if (overrideEntries.length === 0) {
        return [];
      }

      return [[language.toLowerCase(), Object.fromEntries(overrideEntries) as SignedLanguageGatewayOverride] as const];
    });

    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}

export function getGatewayConfig() {
  return {
    spokenTextToSignedPoseUrl: process.env.SPOKEN_TEXT_TO_SIGNED_POSE_URL ?? defaults.spokenTextToSignedPoseUrl,
    spokenTextToSignedVideoUrl: process.env.SPOKEN_TEXT_TO_SIGNED_VIDEO_URL ?? defaults.spokenTextToSignedVideoUrl,
    imageToAvatarUrl: ensureTrailingSlash(process.env.IMAGE_TO_AVATAR_URL ?? defaults.imageToAvatarUrl),
  };
}

export function getSignedLanguageGatewayConfig(signedLanguage?: string | null) {
  const base = getGatewayConfig();
  if (!signedLanguage) {
    return base;
  }

  const override = parseSignedLanguageGatewayOverrides()[signedLanguage.toLowerCase()] ?? {};
  const merged = {
    ...base,
    ...override,
  };

  return {
    ...merged,
    imageToAvatarUrl: ensureTrailingSlash(merged.imageToAvatarUrl),
  };
}
