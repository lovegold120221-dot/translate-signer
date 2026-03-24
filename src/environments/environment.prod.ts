export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAtVDGmDVCwWunWW2ocgeHWnAsUhHuXvcg',
    authDomain: 'sign-mt.firebaseapp.com',
    projectId: 'sign-mt',
    storageBucket: 'sign-mt.appspot.com',
    messagingSenderId: '665830225099',
    appId: '1:665830225099:web:18e0669d5847a4b047974e',
    measurementId: 'G-1LXY5W5Z9H',
  },
  reCAPTCHAKey: '6Ldsxb8oAAAAAGyUZbyd0QruivPSudqAWFygR-4t',
  translationApi: {
    textNormalizationUrl: 'https://sign.mt/api/text-normalization',
    signWritingDescriptionUrl: 'https://sign.mt/api/signwriting-description',
    spokenTextToSignWritingUrl: 'https://sign.mt/api/spoken-text-to-signwriting',
    spokenTextToSignedPoseUrl: 'https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose',
    spokenTextToSignedVideoUrl: 'https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_video',
    imageToAvatarUrl: 'https://image-to-avatar-665830225099.us-central1.run.app/',
  },
};
