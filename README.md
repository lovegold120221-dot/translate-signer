<h1 align="center">👋 Sign Translate</h1>

<p align="center">
  <i>
    Revolutionizing Sign Language Communication with Cutting-Edge Real-Time Translation Models.
    <br>
    Enjoy seamless Sign Language Translation on desktop and mobile.
  </i>
</p>

<p align="center">
  <a href="https://sign.mt/"><strong>sign.mt</strong></a>
  <br>
</p>

<p align="center">
  <a href="https://github.com/sign/.github/blob/main/CONTRIBUTING.md">Contribution Guidelines</a>
  ·
  <a href="https://github.com/sign/translate/issues">Submit an Issue</a>
</p>

<p align="center">
  <a href="https://github.com/sign/translate/actions/workflows/client.yml">
    <img src="https://github.com/sign/translate/actions/workflows/client.yml/badge.svg" alt="Client Build Test Status Badge" />
  </a>
  <a href="https://github.com/sign/translate/actions/workflows/server.yml">
    <img src="https://github.com/sign/translate/actions/workflows/server.yml/badge.svg" alt="Server Build Test Status Badge" />
  </a>
  <a href="https://coveralls.io/github/sign/translate?branch=master">
    <img src="https://coveralls.io/repos/github/sign/translate/badge.svg?branch=master" alt="Coverage Status Badge" />
  </a>
  <a href="https://github.com/sign/translate/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg" alt="License: CC BY-NC-SA 4.0 Badge" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/sign/translate/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/sign/translate" alt="GitHub Stars for sign/translate" />
  </a>
  <a href="https://github.com/sign/translate/network/members" target="_blank">
    <img src="https://img.shields.io/github/forks/sign/translate" alt="GitHub Forks for sign/translate" />
  </a>
  <a href="https://github.com/sign/translate/stargazers" target="_blank">
    <img src="https://img.shields.io/github/contributors/sign/translate" alt="GitHub Contributors for sign/translate" />
  </a>
  <a href="https://github.com/sign/translate/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/sign/translate" alt="GitHub Issues for sign/translate" />
  </a>
</p>

<p align="center">
  <a href="https://sign.mt" target="_blank">
    <img src="src/assets/promotional/about/hero.webp" alt="Sign Language Translation Demo Image" />
  </a>
</p>

<hr>

## Key Features

### [Sign Language Production](https://github.com/sign/translate/wiki/Spoken-to-Signed)

```
┌─────────────────────┐
│Spoken Language Audio│                                                              ┌─────────┐
└─────────┬───────────┘                                                  ┌──────────►│Human GAN│
          │                                                              │           └─────────┘
          ▼                                                              │
┌────────────────────┐     ┌───────────────┐     ┌───────────┐    ┌──────┴──────┐    ┌───────────────┐
│Spoken Language Text├────►│Normalized Text├────►│SignWriting├───►│Pose Sequence├───►│Skeleton Viewer│
└─────────┬──────────┘     └───────────────┘     └───────────┘    └──────┬──────┘    └───────────────┘
          │                        ▲                   ▲                 │
          ▼                        │                   │                 │           ┌─────────┐
┌───────────────────────┐          │                   │                 └──────────►│3D Avatar│
│Language Identification├──────────┘───────────────────┘                             └─────────┘
└───────────────────────┘
```

### [Sign Language Translation](https://github.com/sign/translate/wiki/Signed-to-Spoken)

```
┌──────────────────────────┐                                ┌────────────────────┐
│Upload Sign Language Video│                      ┌────────►│Spoken Language Text│
└──────────┬───────────────┘                      │         └──────────┬─────────┘
           │                                      │                    │
           │          ┌────────────┐       ┌──────┴────┐               │
           ├─────────►│Segmentation├──────►│SignWriting│               │
           │          └────────────┘       └───────────┘               │
           │                                                           ▼
┌──────────┴────────────────┐                               ┌─────────────────────┐
│Camera Sign Language Video │                               │Spoken Language Audio│
└───────────────────────────┘                               └─────────────────────┘
```

### Want to Help?

Join us on the journey to revolutionize sign language communication.
Follow our progress on the [Project Board][project-board],
shape the project's future,
and delve deeper into our vision and plans in the [Wiki][wiki].

Wish to report a bug, contribute some code, or enhance documentation? Fantastic!
Check our guidelines for [contributing][contributing] and then explore our issues marked as <kbd>[help wanted](https://github.com/sign/translate/labels/help%20wanted)</kbd> or <kbd>[good first issue](https://github.com/sign/translate/labels/good%20first%20issue)</kbd>.

**Find this useful? Give our repo a star :star: :arrow_up:.**

[![Stargazers repo roster for @sign/translate](https://reporoster.com/stars/sign/translate)](https://github.com/sign/translate/stargazers)

[wiki]: https://github.com/sign/translate/wiki/Spoken-to-Signed
[contributing]: https://github.com/sign/.github/blob/main/CONTRIBUTING.md
[project-board]: https://github.com/sign/translate/projects/1

## Development

### Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

### Setting Up the Project

Install dependencies locally:

```bash
npm install
```

Run the application:

```bash
npm start
```

Test the application:

```bash
npm test
```

Run the application on iOS:

```bash
npm run build:full && \
npx cap sync ios && \
npx cap run ios
```

### Custom Signed Language Backends

This fork can now route spoken-to-signed traffic to dedicated per-language stacks instead of forcing every signed language through the same shared endpoints.

In the browser, inject runtime overrides before Angular bootstraps:

```html
<script>
  window.__SIGN_MT_CONFIG__ = {
    translationApi: {
      spokenTextToSignedPoseUrl: 'https://your-shared-gpu.example.com/pose',
      spokenTextToSignedVideoUrl: 'https://your-shared-gpu.example.com/video',
      spokenTextToSignWritingUrl: 'https://your-shared-gpu.example.com/signwriting',
      imageToAvatarUrl: 'https://your-shared-gpu.example.com/avatar/'
    },
    signedLanguageBackends: {
      dse: {
        spokenTextToSignedPoseUrl: 'https://your-ngt-gpu.example.com/pose',
        spokenTextToSignWritingUrl: 'https://your-ngt-gpu.example.com/signwriting'
      },
      vgt: {
        spokenTextToSignedPoseUrl: 'https://your-vgt-gpu.example.com/pose',
        spokenTextToSignedVideoUrl: 'https://your-vgt-gpu.example.com/video',
        spokenTextToSignWritingUrl: 'https://your-vgt-gpu.example.com/signwriting',
        imageToAvatarUrl: 'https://your-vgt-gpu.example.com/avatar/'
      }
    }
  };
</script>
```

For the Firebase gateway, set these environment variables:

```bash
SPOKEN_TEXT_TO_SIGNED_POSE_URL=https://your-vgt-gpu.example.com/pose
SPOKEN_TEXT_TO_SIGNED_VIDEO_URL=https://your-vgt-gpu.example.com/video
IMAGE_TO_AVATAR_URL=https://your-vgt-gpu.example.com/avatar/

SIGNED_LANGUAGE_BACKENDS_JSON='{
  "dse": {
    "spokenTextToSignedPoseUrl": "https://your-ngt-gpu.example.com/pose",
    "spokenTextToSignedVideoUrl": "https://your-ngt-gpu.example.com/video"
  },
  "vgt": {
    "spokenTextToSignedPoseUrl": "https://your-vgt-gpu.example.com/pose",
    "spokenTextToSignedVideoUrl": "https://your-vgt-gpu.example.com/video"
  }
}'
```

Recommended GitHub starters for these backends:

- NGT prototype stack: `LykeEsselink/SignLanguageSynthesis`
- Generic text or notation to pose: `sign-language-processing/transcription`
- HamNoSys to pose: `rotem-shalev/Ham2Pose`
- Pose to photoreal video: `sign-language-processing/pose-to-video`
- Pose fluency post-processing: `sign-language-processing/fluent-pose-synthesis`

This pass did not uncover a maintained GitHub repository that already ships a ready-to-drop VGT lexicon and pose generator, so VGT still requires a dedicated corpus or lexicon layer even though the app can now route VGT traffic to its own backend.

[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm

### Cite

```bibtex
@misc{moryossef2023signmt,
    title={sign.mt: Effortless Real-Time Sign Language Translation},
    author={Moryossef, Amit},
    howpublished={\url{https://sign.mt/}},
    year={2023}
}
```
