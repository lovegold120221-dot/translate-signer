# Eburon AI Sign Language Bridge

<p align="center">
  <i>
    Real-time translation between Flemish Sign Language (VGT) and spoken languages.
    <br>
    Bidirectional sign to text and text to sign powered by AI avatars.
  </i>
</p>

<p align="center">
  <a href="https://eburon.ai/"><strong>eburon.ai</strong></a>
</p>

---

## Features

- **Text to Sign Language** - Convert spoken text into realistic sign language animations
- **Sign to Text** - Capture sign language video and translate to written text
- **AI Avatars** - Photorealistic 3D avatars for natural sign language representation
- **Multi-language Support** - Works with Dutch (NL) and Flemish Sign Language (VGT)
- **Real-time Translation** - Instant translation for seamless communication
- **Privacy-focused** - Deploy your own branded workspace

## Architecture

### Text to Sign

```
Text Input → AI Processing → SignWriting → Pose Generation → 3D Avatar Animation
```

### Sign to Text

```
Video Capture → Pose Estimation → SignWriting → NLP Processing → Text Output
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

## Configuration

Configure your sign language backend URLs:

```javascript
window.__SIGN_MT_CONFIG__ = {
  translationApi: {
    spokenTextToSignedPoseUrl: 'https://your-gpu-service.com/pose',
    spokenTextToSignedVideoUrl: 'https://your-gpu-service.com/video',
    imageToAvatarUrl: 'https://your-gpu-service.com/avatar/',
  },
};
```

## Technology Stack

- **Frontend**: Angular, Ionic
- **AI/ML**: TensorFlow.js, MediaPipe
- **SignWriting**: Sutton SignWriting standard
- **Avatar**: 3D photorealistic avatars
- **Backend**: Firebase, Cloud Functions

## Supported Languages

| Signed Language           | Spoken Language | Status |
| ------------------------- | --------------- | ------ |
| VGT (Vlaamse Gebarentaal) | Dutch (NL)      | Active |

## License

MIT License - See LICENSE file for details.

---

<p align="center">
  Built with ❤️ for the deaf and hard of hearing community
</p>
