# Visual customization

ForgePress uses an anime-inspired visual language rather than copying a specific franchise or character.

## Design principles

- Soft sakura pink, violet and cyan accents.
- Dark indigo canvas with readable high-contrast article surfaces.
- Glass panels are decorative; long-form text remains on stable opaque backgrounds.
- Rounded cards and small star/sparkle ornaments provide personality.
- Motion is brief and disabled under `prefers-reduced-motion`.
- Decorative elements use `aria-hidden` so assistive technology is not polluted.

## Token layers

1. Primitive colors and spacing in `packages/theme`.
2. CSS custom properties in each frontend.
3. Component-level semantic tokens such as `--fp-card` and `--fp-muted`.
4. Site configuration such as title, tagline and navigation.

## Creating a new theme

- Copy the token object in `packages/theme/src/index.ts`.
- Keep every key in `ThemeTokens`.
- Override CSS variables at `html[data-theme="your-theme"]`.
- Test at 360px, 768px, 1280px and 1600px widths.
- Check keyboard focus, reduced motion and contrast before publishing.
