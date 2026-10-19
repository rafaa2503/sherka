---
name: "Sherka"
description: "Swiss web design agency that builds and maintains websites for small businesses. Bold, premium, trustworthy: dark ink, bone white, one amber signal."
version: "1.0.0"
colors:
  ink-950: "#0E0D14"
  ink-900: "#14131C"
  ink-800: "#1C1B26"
  ink-700: "#262532"
  ink-600: "#34333F"
  ink-500: "#5A5A68"
  ink-400: "#70707E"
  ink-300: "#A3A4B0"
  bone-50: "#FFFFFF"
  bone-100: "#F0F1F3"
  bone-200: "#E9EAED"
  bone-300: "#D6D7DC"
  amber-400: "#FFB84D"
  amber-500: "#FFA51E"
  amber-600: "#E69100"
  amber-700: "#C77A00"
  amber-800: "#8F5700"
  green-400: "#4CC38A"
  green-700: "#1B7F4B"
  red-400: "#FF7A70"
  red-700: "#C42B22"
  ground-light: "#F0F1F3"
  ground-dark: "#14131C"
  surface-light: "#FFFFFF"
  surface-dark: "#1C1B26"
  sunken-light: "#E9EAED"
  sunken-dark: "#0E0D14"
  line-light: "#D6D7DC"
  line-dark: "#34333F"
  line-strong-light: "#70707E"
  line-strong-dark: "#70707E"
  text-light: "#14131C"
  text-dark: "#F0F1F3"
  text-muted-light: "#5A5A68"
  text-muted-dark: "#A3A4B0"
  accent-light: "#FFA51E"
  accent-dark: "#FFA51E"
  accent-hover-light: "#FFB84D"
  accent-hover-dark: "#FFB84D"
  accent-press-light: "#E69100"
  accent-press-dark: "#E69100"
  on-accent-light: "#14131C"
  on-accent-dark: "#14131C"
  accent-text-light: "#8F5700"
  accent-text-dark: "#FFA51E"
  brand-dot-light: "#C77A00"
  brand-dot-dark: "#FFA51E"
  success-light: "#1B7F4B"
  success-dark: "#4CC38A"
  danger-light: "#C42B22"
  danger-dark: "#FF7A70"
  focus-light: "#14131C"
  focus-dark: "#FFA51E"
typography:
  display:
    fontFamily: "Archivo"
    fontSize: "clamp(2.75rem, 1.2rem + 6.2vw, 5.5rem)"
    fontWeight: 800
    lineHeight: "0.98"
    letterSpacing: "-0.035em"
    fontStretch: "112%"
  h1:
    fontFamily: "Archivo"
    fontSize: "clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: "1.02"
    letterSpacing: "-0.03em"
    fontStretch: "108%"
  h2:
    fontFamily: "Archivo"
    fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
    fontStretch: "104%"
  h3:
    fontFamily: "Archivo"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "1.2"
    letterSpacing: "-0.015em"
  h4:
    fontFamily: "Archivo"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.3"
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Archivo"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: "1.55"
    letterSpacing: "0"
  body:
    fontFamily: "Archivo"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "1.6"
    letterSpacing: "0"
  body-sm:
    fontFamily: "Archivo"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "0"
  caption:
    fontFamily: "Archivo"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: "1.4"
    letterSpacing: "0.01em"
  label:
    fontFamily: "Archivo"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "0.005em"
    fontStretch: "104%"
  overline:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1.2"
    letterSpacing: "0.12em"
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.6"
    letterSpacing: "0"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
  10: "128px"
  container-max: "1200px"
  measure: "68ch"
  gutter-mobile: "20px"
  gutter-desktop: "32px"
  grid-columns-mobile: "4"
  grid-columns-desktop: "12"
  section-y-mobile: "64px"
  section-y-desktop: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.on-accent}"
  button-primary-pressed:
    backgroundColor: "{colors.accent-press}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 24px"
    borderColor: "{colors.text}"
    borderWidth: "2px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 16px"
  tag:
    backgroundColor: "{colors.sunken}"
    textColor: "{colors.text}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    height: "28px"
    padding: "0 12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 16px"
    borderColor: "{colors.line-strong}"
    borderWidth: "1px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "24px"
    borderColor: "{colors.line}"
    borderWidth: "1px"
  table-header:
    backgroundColor: "{colors.sunken}"
    textColor: "{colors.text-muted}"
    typography: "{typography.overline}"
    padding: "12px 16px"
  nav-bar:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    height: "72px"
    padding: "0 32px"
    borderColor: "{colors.line}"
    borderWidth: "1px"
---
# Sherka Design System

## Overview

Sherka is a Swiss web design agency. It builds and maintains websites for small businesses (salons, practices, restaurants, trades) so they attract more customers and spend less time on their web presence. The base of operations is Biel/Bienne. The work is remote and covers all of Switzerland.

The interface feels bold, premium and trustworthy. Dark ink and bone white carry the layout. Amber is the single signal colour and is reserved for actions and the logo dot. Type is large, tight and confident. Surfaces are flat and separated by lines, not by shadows.

It must not feel like a generic AI-generated site, a cheap template or a typical tech startup. That means: no gradients, no glassmorphism, no purple, no stock-illustration blobs, no emoji, no rounded-everything softness, no filler claims.

### Principles

1. Proof before promise. Show a result, a real measurement, a real project. Never an adjective on its own.
2. One signal. Amber appears once or twice per screen, on the thing the visitor should do next.
3. Type does the work. Hierarchy comes from size, weight and width, not from decoration.
4. Calm contrast. Every text pair is tested. Dark and light are equal first-class themes.
5. Swiss in substance. Precise copy, correct spelling (no ß), real contact details, Sie-form.

### Voice and tone

- Language: German (Swiss spelling, no ß), formal Sie-form. French mirrors it. English only for this documentation.
- Short sentences. Verbs first on buttons: "Erstgespräch anfragen", "Anrufen".
- State the cost and the next step near every call to action: "Kostenlos und unverbindlich. Antwort innert eines Werktags."
- No filler ("innovativ", "massgeschneiderte Lösungen", "ganzheitlich"), no exclamation marks, no invented numbers, clients or quotes.
- Numbers in Swiss format: CHF 1'200, 17. Oktober 2026, +41 78 745 00 47.
- Errors say what happened and what to do, without blame: "Die E-Mail-Adresse ist unvollständig. Bitte ergänzen Sie das @."

## Colors

Two themes with identical roles. Dark is the native theme (it is the logo's home). Light is a full equal, not an inversion. Always reference roles, never raw hex, in product code.

Primitives:

| Name | Hex |
|---|---|
| `ink-950` | #0E0D14 |
| `ink-900` | #14131C |
| `ink-800` | #1C1B26 |
| `ink-700` | #262532 |
| `ink-600` | #34333F |
| `ink-500` | #5A5A68 |
| `ink-400` | #70707E |
| `ink-300` | #A3A4B0 |
| `bone-50` | #FFFFFF |
| `bone-100` | #F0F1F3 |
| `bone-200` | #E9EAED |
| `bone-300` | #D6D7DC |
| `amber-400` | #FFB84D |
| `amber-500` | #FFA51E |
| `amber-600` | #E69100 |
| `amber-700` | #C77A00 |
| `amber-800` | #8F5700 |
| `green-400` | #4CC38A |
| `green-700` | #1B7F4B |
| `red-400` | #FF7A70 |
| `red-700` | #C42B22 |

Light theme roles:

| Role | Hex | Primitive | Use |
|---|---|---|---|
| `ground` | #F0F1F3 | bone-100 | Page background |
| `surface` | #FFFFFF | bone-50 | Cards, inputs, raised panels |
| `sunken` | #E9EAED | bone-200 | Wells, code, table headers, disabled fills |
| `line` | #D6D7DC | bone-300 | Dividers and card borders |
| `line-strong` | #70707E | ink-400 | Input borders, UI boundaries (3:1 or better) |
| `text` | #14131C | ink-900 | Headlines and body |
| `text-muted` | #5A5A68 | ink-500 | Secondary text, captions |
| `accent` | #FFA51E | amber-500 | Primary action fill. The one signal colour. |
| `accent-hover` | #FFB84D | amber-400 | Primary action, hover |
| `accent-press` | #E69100 | amber-600 | Primary action, pressed |
| `on-accent` | #14131C | ink-900 | Text on accent fill |
| `accent-text` | #8F5700 | amber-800 | Accent used as text or icon on ground |
| `brand-dot` | #C77A00 | amber-700 | Amber dot of the logo |
| `success` | #1B7F4B | green-700 | Success text and icons |
| `danger` | #C42B22 | red-700 | Error text and icons |
| `focus` | #14131C | ink-900 | Focus ring |

Dark theme roles:

| Role | Hex | Primitive | Use |
|---|---|---|---|
| `ground` | #14131C | ink-900 | Page background |
| `surface` | #1C1B26 | ink-800 | Cards, inputs, raised panels |
| `sunken` | #0E0D14 | ink-950 | Wells, code, table headers, disabled fills |
| `line` | #34333F | ink-600 | Dividers and card borders |
| `line-strong` | #70707E | ink-400 | Input borders, UI boundaries (3:1 or better) |
| `text` | #F0F1F3 | bone-100 | Headlines and body |
| `text-muted` | #A3A4B0 | ink-300 | Secondary text, captions |
| `accent` | #FFA51E | amber-500 | Primary action fill. The one signal colour. |
| `accent-hover` | #FFB84D | amber-400 | Primary action, hover |
| `accent-press` | #E69100 | amber-600 | Primary action, pressed |
| `on-accent` | #14131C | ink-900 | Text on accent fill |
| `accent-text` | #FFA51E | amber-500 | Accent used as text or icon on ground |
| `brand-dot` | #FFA51E | amber-500 | Amber dot of the logo |
| `success` | #4CC38A | green-400 | Success text and icons |
| `danger` | #FF7A70 | red-400 | Error text and icons |
| `focus` | #FFA51E | amber-500 | Focus ring |

Amber rules: fill amber (`accent`) always carries `on-accent` ink text. On the light theme amber is never used as text; use `accent-text` (#8F5700). The logo dot uses `brand-dot`.

Verified contrast (WCAG 2.2, computed from the values above):

| Theme | Pair | Ratio | Minimum | Result |
|---|---|---|---|---|
| light | text on ground | 16.30:1 | 4.5:1 | pass |
| light | text on surface | 18.43:1 | 4.5:1 | pass |
| light | text-muted on ground | 6.00:1 | 4.5:1 | pass |
| light | text-muted on surface | 6.78:1 | 4.5:1 | pass |
| light | accent-text on ground | 5.26:1 | 4.5:1 | pass |
| light | accent-text on surface | 5.95:1 | 4.5:1 | pass |
| light | on-accent on accent | 9.35:1 | 4.5:1 | pass |
| light | on-accent on accent-hover | 10.72:1 | 4.5:1 | pass |
| light | on-accent on accent-press | 7.38:1 | 4.5:1 | pass |
| light | success on surface | 5.02:1 | 4.5:1 | pass |
| light | danger on surface | 5.65:1 | 4.5:1 | pass |
| light | line-strong on surface | 4.87:1 | 3:1 | pass |
| light | line-strong on ground | 4.31:1 | 3:1 | pass |
| light | focus on ground | 16.30:1 | 3:1 | pass |
| dark | text on ground | 16.30:1 | 4.5:1 | pass |
| dark | text on surface | 15.06:1 | 4.5:1 | pass |
| dark | text-muted on ground | 7.45:1 | 4.5:1 | pass |
| dark | text-muted on surface | 6.88:1 | 4.5:1 | pass |
| dark | accent-text on ground | 9.35:1 | 4.5:1 | pass |
| dark | accent-text on surface | 8.63:1 | 4.5:1 | pass |
| dark | on-accent on accent | 9.35:1 | 4.5:1 | pass |
| dark | on-accent on accent-hover | 10.72:1 | 4.5:1 | pass |
| dark | on-accent on accent-press | 7.38:1 | 4.5:1 | pass |
| dark | success on surface | 7.68:1 | 4.5:1 | pass |
| dark | danger on surface | 6.70:1 | 4.5:1 | pass |
| dark | line-strong on surface | 3.49:1 | 3:1 | pass |
| dark | line-strong on ground | 3.78:1 | 3:1 | pass |
| dark | focus on ground | 9.35:1 | 3:1 | pass |

## Typography

Two families. Archivo (variable, weight 100-900, width 62-125) for everything readable; width is used as a second hierarchy axis, wider for headlines. JetBrains Mono for tokens, numbers in tables, overlines and code. Fallbacks: "Helvetica Neue", Helvetica, Arial, sans-serif.

| Style | Family | Size | Weight | Line height | Tracking | Width | Use |
|---|---|---|---|---|---|---|---|
| `display` | Archivo | clamp(2.75rem, 1.2rem + 6.2vw, 5.5rem) | 800 | 0.98 | -0.035em | 112% | Hero headlines. One per page. |
| `h1` | Archivo | clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem) | 800 | 1.02 | -0.03em | 108% | Page and section titles. |
| `h2` | Archivo | clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem) | 700 | 1.1 | -0.02em | 104% | Sub-sections. |
| `h3` | Archivo | 1.5rem | 700 | 1.2 | -0.015em | 100% | Card titles. |
| `h4` | Archivo | 1.25rem | 600 | 1.3 | -0.01em | 100% | Small headings, list titles. |
| `body-lg` | Archivo | 1.1875rem | 400 | 1.55 | 0 | 100% | Lead paragraphs. |
| `body` | Archivo | 1.0625rem | 400 | 1.6 | 0 | 100% | Default reading text. |
| `body-sm` | Archivo | 0.9375rem | 400 | 1.5 | 0 | 100% | Secondary text, table cells. |
| `caption` | Archivo | 0.8125rem | 400 | 1.4 | 0.01em | 100% | Hints, legal, meta. |
| `label` | Archivo | 1rem | 600 | 1 | 0.005em | 104% | Buttons, tabs, form labels. |
| `overline` | JetBrains Mono | 0.75rem | 500 | 1.2 | 0.12em | 100% | Eyebrows, section numbers. Uppercase. |
| `code` | JetBrains Mono | 0.875rem | 400 | 1.6 | 0 | 100% | Tokens, URLs, numbers in tables. |

Rules: headlines use `text-wrap: balance`, body uses `text-wrap: pretty`. Measure for reading text is 68ch. Never set body text below 15px. Overlines are uppercase.

## Layout

Base unit 4px. Spacing scale:

| Token | Value |
|---|---|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `5` | 24px |
| `6` | 32px |
| `7` | 48px |
| `8` | 64px |
| `9` | 96px |
| `10` | 128px |

- Container max width 1200px, gutters 20px (mobile) and 32px (desktop).
- Grid: 12 columns on desktop, 4 on mobile.
- Vertical rhythm between page sections: 64px mobile, 128px desktop. Inside a component use space 3 to 5.
- Section starts are marked by a 2px rule in `text` and a mono overline with the section number.
- Left-aligned by default. Centred text only for single short statements.

### Shape

| Token | Radius | Use |
|---|---|---|
| `none` | 0px |
| `sm` | 4px |
| `md` | 8px |
| `lg` | 16px |
| `full` | 999px |

Buttons and inputs use `md`. Cards and panels use `lg`. Tags use `full`. Images use `sm`. Borders: hairline 1px for structure, strong 2px for emphasis and secondary buttons. The logo mark is two half-ellipses; it may be echoed once as a decorative shape per page, never repeated as a pattern.

## Elevation

Flat first. Depth comes from surface roles (`ground`, `surface`, `sunken`) and 1px lines.

| Level | Light | Dark | Use |
|---|---|---|---|
| 0 | none | none | Default |
| raised | `0 1px 2px rgb(20 19 28 / 0.06), 0 12px 28px -14px rgb(20 19 28 / 0.22)` | `0 0 0 1px #34333F, 0 16px 32px -16px rgb(0 0 0 / 0.7)` | Hovered cards, dropdowns |
| overlay | `0 2px 4px rgb(20 19 28 / 0.08), 0 24px 56px -16px rgb(20 19 28 / 0.32)` | `0 0 0 1px #34333F, 0 28px 56px -16px rgb(0 0 0 / 0.85)` | Dialogs, menus |

In dark mode the shadow includes a 1px ring so the edge stays visible.

## Components

Every component exists in light and dark. Each reads only role tokens, so it switches automatically. The `components` block in the front matter lists the light-theme token mapping.

- **Buttons.** Primary (amber fill, ink text), secondary (2px outline in `text`, inverts on hover), ghost (text only). Heights 36 / 48 / 56. States: default, hover, pressed (scale 0.98), focus (2px ring, 3px offset), disabled (`sunken` fill, `text-muted`), loading (spinner, label kept).
- **Tags.** Pill, 28px high, caption type. Neutral, accent (outline), success, danger, solid. Status tags always include a word, colour is never the only signal.
- **Inputs.** 48px high, 1px `line-strong` border, label always above the field, hint or error below. Focus: ring in `focus`. Error: `danger` border plus message text. Selects, checkboxes, radios and toggles share the same border and focus rules.
- **Cards.** `surface` fill, 1px `line`, radius `lg`, padding 24px. Hover on interactive cards: border moves to `text`, lifts 2px.
- **Data.** Tables with mono overline headers on `sunken`, 1px row lines, tabular numerals. Stat blocks with large figure and a caption. Progress bars 8px, always paired with a value.
- **Navigation.** Top bar 72px with logo left, links centre or right, one primary button. Tabs use a 2px underline in `text`. Breadcrumb in `text-muted`. Pagination uses secondary buttons at 40px.

### Motion

| Token | Value | Use |
|---|---|---|
| `dur-fast` | 120ms | Press, hover colour |
| `dur-base` | 200ms | Most transitions |
| `dur-slow` | 360ms | Panels, menus |
| `dur-reveal` | 600ms | Scroll reveal, once |
| `ease-standard` | `cubic-bezier(0.23, 1, 0.32, 1)` | Enter and move |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Leave |

Animate only `transform` and `opacity`, plus colour. No parallax, no scroll-jacking, no looping decoration. With `prefers-reduced-motion: reduce` all transitions drop to 0.01ms and reveals show immediately.

## Imagery

Status: placeholder. No reference images were supplied, so no image styles are locked yet.

When references are provided, each gets a numbered locked style ("Style 01", "Style 02") with: the reference image, a table of style rules (subject, light, colour, composition, lens, texture, what to avoid), and a copy-paste prompt made of one subject sentence plus a fixed style block.

Constraints that already hold for any future style: no gradients, no emoji or cartoon illustration, no stock-photo handshakes or laptop-on-desk clichés, real Swiss small-business subjects, ink and bone tonality with at most one amber accent in frame, photographs with real people only with their consent.

## Responsive Behavior

| Breakpoint | Min width | Behaviour |
|---|---|---|
| `sm` | 640px | Single column, 4-column grid, gutters 20px |
| `md` | 768px | Two-column cards, tabs stay inline |
| `lg` | 1024px | 12-column grid, gutters 32px, desktop navigation |
| `xl` | 1280px | Container reaches max width 1200px |

- Mobile first. The base styles are the mobile styles.
- Touch targets are at least 44 by 44px. Primary buttons are full width below `sm`.
- Display and headline sizes use clamp(), so there is no jump at breakpoints.
- Navigation collapses to a menu button below `lg`. The primary button stays visible.
- Tables scroll horizontally inside their own container; the page never scrolls sideways.
- Print: light theme, no navigation, each section starts on a new page, links print their URL.

## Known Gaps

- Imagery styles are not locked (no reference images supplied).
- Archivo and JetBrains Mono load from Google Fonts. For production on sherka.ch, self-host them (the live site currently uses the system font stack plus Inter) and confirm the switch against page-speed targets.
- The live site currently uses a blue action colour. This system replaces it with amber. The live site needs a migration pass.
- No icon set is defined beyond the 1.75px-stroke style used in this document.
- Form validation messages exist only in German. French (/fr/) and a possible Italian version need a copy pass.
- Charts and data visualisation palettes are not defined; reuse `accent`, `success`, `danger` plus `text-muted` until a data palette is designed.
- Photography of the owner, client logos and testimonials are missing on the live site; the trust patterns are designed but have no real content yet.
