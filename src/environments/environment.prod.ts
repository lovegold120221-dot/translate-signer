export const environment = {
  production: true,
  firebase: {
    apiKey: 'AQ.Ab8RN6JW9B3RYIxHIvVlLczOeMRsNTFHeNcqW6EBIzCm_z22KA',
    authDomain: 'gen-lang-client-0460519420.firebaseapp.com',
    projectId: 'gen-lang-client-0460519420',
    storageBucket: 'gen-lang-client-0460519420.appspot.com',
    messagingSenderId: '0',
    appId: '1:0:web:anonymous',
    clientId: '135934226058-scnh9tmlrahn1p1rcs6d42m6vgkdet72.apps.googleusercontent.com',
  },
  reCAPTCHAKey: '6Ldsxb8oAAAAAGyUZbyd0QruivPSudqAWFygR-4t',
  translationApi: {
    textNormalizationUrl: 'https://api.eburon.ai/text-normalization',
    signWritingDescriptionUrl: 'https://api.eburon.ai/signwriting-description',
    spokenTextToSignWritingUrl: 'https://api.eburon.ai/spoken-text-to-signwriting',
    spokenTextToSignedPoseUrl: 'https://api.eburon.ai/spoken-text-to-signed-pose',
    spokenTextToSignedVideoUrl: 'https://api.eburon.ai/spoken-text-to-signed-video',
    imageToAvatarUrl: 'https://api.eburon.ai/image-to-avatar/',
  },
  signedLanguageBackends: {
    vgt: {
      spokenTextToSignedPoseUrl: 'https://api.eburon.ai/spoken-text-to-signed-pose',
      spokenTextToSignedVideoUrl: 'https://api.eburon.ai/spoken-text-to-signed-video',
      imageToAvatarUrl: 'https://api.eburon.ai/image-to-avatar/',
    },
  },
};
