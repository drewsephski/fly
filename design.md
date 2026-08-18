# Design — fly-portfolio

Locked design system. Future Hallmark runs read this file first; pages defer
to it. Amend intentionally. The file is the rule.

## System
- Genre · editorial
- Macrostructure · Marquee Hero
- Theme · studied-DNA (cool paper · cobalt accent · Fraunces + DM Sans)
- Axes · light / high-contrast-serif / cool
- Nav · N5 floating pill
- Footer · Ft5 statement
- Tone · premium technical editorial

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:      oklch(0.982 0.003 80);
  --color-paper-2:    oklch(0.998 0.001 80);
  --color-paper-3:    oklch(0.958 0.004 80);
  --color-ink:        oklch(0.17 0.006 80);
  --color-ink-2:      oklch(0.32 0.008 80);
  --color-rule:       oklch(0.89 0.006 80);
  --color-muted:      oklch(0.62 0.007 80);
  --color-accent:     oklch(0.61 0.2 257);
  --color-accent-ink: oklch(0.99 0.002 80);
  --color-focus:      oklch(0.47 0.2 257);

  --font-display: "Fraunces", ui-serif, Georgia, serif; /* loaded as --font-playfair */
  --font-body:    "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", ui-monospace, monospace;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long: 420ms;

  --rule-hair: 1px;
  --radius-control: 0.5rem;
  --radius-card: 0.875rem;
  --radius-round: 999px;
}
```

Dark mode lives in `.dark` inside `tokens.css`. Paper shifts to ink-blue
(`oklch(0.145 0.018 258)`); accent stays cobalt.

## CTA voice
- Primary · `--color-accent` fill · `--color-accent-ink` type · pill (`--radius-round`) · min-height 2.75rem
- Secondary · hairline underline or outline · same height · no fill

## Motion stance
- One first-load reveal (opacity + 0.5rem translate). Hover is color or 1px lift.
- Never italic headers. Never fake browser chrome. Never `transition-all`.
- Reduced-motion fallback · ≤150ms opacity crossfade.

## Copy
- Brief, specific, named products. No em dashes.
- Flagship ledes sit near 105 characters and match each other in length.
- Kickers default off. No invented metrics.

## Notes
- Headers are roman. Emphasis is weight, muted color, or a drawn underline.
- Product screenshots sit in a hairline frame. Do not redraw OS chrome.
- Diversification is inverted: later pages share this system.

## Exports
`tokens.css` is the source of truth. For Tailwind v4 `@theme`, DTCG
`tokens.json`, or shadcn/ui CSS variables, ask *"extend design.md with
Tailwind exports"*.
