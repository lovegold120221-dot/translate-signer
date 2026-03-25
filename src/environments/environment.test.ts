// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import type {InitialNavigation} from '@angular/router';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AQ.Ab8RN6JW9B3RYIxHIvVlLczOeMRsNTFHeNcqW6EBIzCm_z22KA',
    authDomain: 'gen-lang-client-0460519420.firebaseapp.com',
    projectId: 'gen-lang-client-0460519420',
    storageBucket: 'gen-lang-client-0460519420.appspot.com',
    messagingSenderId: '0',
    appId: '1:0:web:anonymous',
    clientId: '135934226058-scnh9htmlrahn1p1rcs6d42m6vgkdet72.apps.googleusercontent.com',
  },
  reCAPTCHAKey: '',
  initialNavigation: 'enabledNonBlocking' as InitialNavigation,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
