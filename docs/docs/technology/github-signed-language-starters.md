# GitHub Starters For NGT And VGT

This workspace can route `dse` and `vgt` to separate spoken-to-signed backends. The missing piece is the backend stack itself.

These GitHub repositories are the most useful starting points found during this pass:

## NGT-specific starter

- [`LykeEsselink/SignLanguageSynthesis`](https://github.com/LykeEsselink/SignLanguageSynthesis)
  - Older NGT prototype.
  - Uses a HamNoSys dictionary and a JASigning avatar pipeline.
  - Useful as a lexical and notation reference, not as a production-ready cloud service.

## Generic sign-language production stack

- [`sign-language-processing/transcription`](https://github.com/sign-language-processing/transcription)
  - Repository with `text_to_text`, `text_to_pose`, `video_to_pose`, and related components.
  - Good as a reference architecture for splitting translation into text, notation, pose, and rendering stages.

- [`rotem-shalev/Ham2Pose`](https://github.com/rotem-shalev/Ham2Pose)
  - HamNoSys to pose-sequence model.
  - Useful when the language layer can produce HamNoSys or a close intermediate notation.

- [`sign-language-processing/pose-to-video`](https://github.com/sign-language-processing/pose-to-video)
  - Renders `.pose` sequences into videos using multiple backends.
  - Useful for human-video output once the translation stack already emits valid pose sequences.

- [`sign-language-processing/fluent-pose-synthesis`](https://github.com/sign-language-processing/fluent-pose-synthesis)
  - Post-processes stitched sign poses into more fluent motion.
  - Useful after dictionary-lookup or notation-to-pose generation when transitions look mechanical.

## What this means for VGT

This GitHub pass found a usable NGT prototype repository, but not a maintained VGT-specific repository that already provides a ready-made VGT lexicon plus pose generation stack.

That means VGT support in this app is now a routing and deployment problem, not a frontend wiring problem:

1. Build or train a VGT backend from a VGT corpus or lexicon.
2. Expose dedicated pose, signwriting, and optional video endpoints.
3. Point `signedLanguageBackends.vgt` or `SIGNED_LANGUAGE_BACKENDS_JSON` at those endpoints.

Once those endpoints exist, this workspace can send `vgt` traffic to them without sharing the same spoken-to-signed backend used by other languages.
