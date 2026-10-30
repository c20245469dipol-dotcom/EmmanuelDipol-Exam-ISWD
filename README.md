# Minu Computer Cafe

**Live site:**  https://c20245469dipol-dotcom.github.io/EmmanuelDipol-Exam-ISWD/

## About

Minu Computer Cafe is a small neighbourhood computer café in Brgy. 1-A, Manapla,
Negros Occidental. This single-page site is a simple shop front — it introduces
the café, its services, past events, hourly rates, and a booking form for anyone
curious enough to walk in.

Copy on the site is written partly in Hiligaynon/Bisaya to feel local:
"Deoende kung pila ka oras gusto mo", "Asta mag aga a", "Ihambal lng pangalan ko
kung mamangkot ka kay itudlo kalng na nila."

## Design System

### Palette (60-30-10)

| Role | Share | Light | Dark | Used for |
|---|---|---|---|---|
| Dominant | 60% | `#806d07` (deep olive-yellow) | `#000000` (pure black) | Page background, neumorphic cards, navbar, footer, form fields |
| Secondary | 30% | `#010c29` (very dark navy) + `#010102` (near black) | `#f5f5f5` + `#a3a3a3` (neutral grays) | Headings, body text, stat numbers, muted labels |
| Accent | 10% | `#08cc50` (bright green) | `#d4d4d4` (soft white) | CTA buttons, progress bar, prices, logo period |

The light theme reads as a warm "retro arcade" surface (olive + dark navy + neon
green), and the dark theme is a monochrome "arcade at midnight" look (black +
off-white).

### Visual style

**Style chosen:** Neumorphism (soft UI)

**Why I chose it:** The café is built around physical hardware — keyboards,
mice, chairs — so extruded and inset card shadows make the layout feel like
pressable buttons on the same machine the café is selling time on.

### Contrast check

**Light mode** — `#010c29` (body text) on `#806d07` (background)

- Contrast ratio: **≈ 3.8 : 1**
- Meets WCAG AA for **large text** (headings, 18pt+) which needs ≥ 3:1
- **Below** WCAG AA for normal body text (needs ≥ 4.5:1)

**Dark mode** — `#f5f5f5` (body text) on `#000000` (background)

- Contrast ratio: **≈ 18.9 : 1**
- Passes WCAG AAA (needs ≥ 7:1)

Tool used: WebAIM Contrast Checker

> ⚠️ Known improvement: the light-mode body text is a little low-contrast. A
> quick fix is to darken `--bg` in the light theme (e.g. `#5a4d05`) or lighten
> `--text` (e.g. `#1a2b5e`) to push the ratio above 4.5:1.

### Known design notes

- In the light theme, `--sh-light` and `--sh-dark` are both `rgb(44, 3, 3)`,
  so the neumorphic depth is subtle. Using two different tones
  (e.g. `--sh-light: #a08a1a; --sh-dark: #4a3d02;`) will make the cards pop.
- In dark mode, `.neu-accent` switches to a bordered neutral button so the
  green accent doesn't clash with the monochrome theme — this is intentional.

## Features

- [x] Mobile-first responsive layout
- [x] Dark mode toggle (**dark is the default**, saved to `localStorage`)
- [x] Page-load intro animation (GSAP timeline, ~1.8s)
- [x] Scroll reveals on every section below the hero (ScrollTrigger, reverses on scroll-up)
- [x] Scroll progress bar (scrub)
- [x] Reduced-motion support via `gsap.matchMedia()`

## Sections

| Section | Purpose |
|---|---|
| **New / Hero** | Brand headline, tagline, live status pill, "Replay" button |
| **About** | Story of the café + three stats (stations, members, hours) |
| **Services** | Hourly sessions, tournaments |
| **Work** | Recent events hosted (Valorant Night #9, 48h Speedrun, Corporate LAN) |
| **Products** | 1-Hour (₱25), 2-Hours (₱50), Open Time, Snack House |
| **Contact** | Booking form + location (Brgy. 1-A Manapla) |

## GSAP Checklist

| Item | Implementation in `script.js` |
|---|---|
| **B1** Dark mode toggle | Toggles `.dark` on `<html>`, saved as `minu-theme` in `localStorage`, label flips between "☀ Light" and "🌙 Dark" |
| **C2** Palette tokens | CSS custom properties in `:root` (light) and `.dark` — `--bg`, `--sh-light`, `--sh-dark`, `--text`, `--muted`, `--accent` |
| **A5** Reusable component | `.neu`, `.neu-in`, `.neu-btn`, `.neu-accent`, `.field` in `@layer components` |
| **D1+D2** Intro timeline | `introTl` — nav + h1 + p + CTA, `stagger: 0.1`, three `-=` position overlaps, ~1.8s total. Eases commented (`back.out`, `power3.out`, `power2.out`) |
| **D3** Click interaction | `#replayBtn` → `introTl.restart()` |
| **E1** Scroll reveals | `.reveal` loop, each with own `ScrollTrigger`, `start: "top 85%"`, `toggleActions: "play none none reverse"` |
| **E2** Scroll-linked effect | `#progressBar` `scaleX: 0 → 1` with `scrub: 0.3` |
| **E3** Reduced motion | `gsap.matchMedia()` — normal branch plays intro + scroll effects, reduce branch jumps intro to end and clears `.reveal`. No `markers: true` anywhere. |