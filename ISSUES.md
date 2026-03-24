# Issues

Issues should be reported in the Github, but when offline, I log them here.

## Mat-tabs-bar

moving tabs creates a 1px line for a second, moving things around

## Navigation

- 404: Does not redirect to main page

## Dutch Sign Language (NGT / DSE)

- TODO: fully add Dutch Sign Language production support so the spoken-to-signed flow does not surface `No poses found` for short prompts.
- Repro cases seen so far: `who`, `who are`, `are you`, `you`.
- Expected outcome: the DSE/NGT path returns a valid pose sequence for these prompts, or a deliberate product fallback instead of an empty-pose failure.
- Follow-up work: point DSE/NGT at dedicated pose/signwriting backends, verify tokenizer and phrase coverage for short Dutch prompts, and add regression coverage for the phrases above.
