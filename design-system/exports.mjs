// Generators: every export format is derived from tokens.mjs, nothing is typed twice.
import {
  brand, primitives, roles, fonts, type, space, layout, breakpoints, radius, border, shadow, motion, contrastChecks, principles,
} from "./tokens.mjs";

export const hex = (role, theme) => primitives[roles[role][theme]];

// ---------- contrast ----------
const lum = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a, b) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
export function runContrast() {
  const rows = [];
  for (const theme of ["light", "dark"]) {
    for (const [fg, bg, min] of contrastChecks) {
      const r = ratio(hex(fg, theme), hex(bg, theme));
      rows.push({ theme, fg, bg, min, ratio: r, pass: r >= min });
    }
  }
  return rows;
}

// ---------- CSS variables (also the live stylesheet tokens) ----------
const typeVars = () =>
  Object.entries(type)
    .map(([k, t]) =>
      [`size`, `weight`, `line`, `track`, `stretch`].map((p) => `  --sk-type-${k}-${p}: ${t[p]};`).join("\n"),
    )
    .join("\n");

export function cssVars() {
  const root = [
    ":root {",
    ...Object.entries(primitives).map(([k, v]) => `  --sk-${k}: ${v};`),
    "",
    `  --sk-font-sans: ${fonts.sans};`,
    `  --sk-font-mono: ${fonts.mono};`,
    typeVars(),
    "",
    ...Object.entries(space).map(([k, v]) => `  --sk-space-${k}: ${v};`),
    "",
    ...Object.entries(layout).map(([k, v]) => `  --sk-${k}: ${v};`),
    "",
    ...Object.entries(radius).map(([k, v]) => `  --sk-radius-${k}: ${v};`),
    ...Object.entries(border).map(([k, v]) => `  --sk-border-${k}: ${v};`),
    "",
    ...Object.entries(motion.duration).map(([k, v]) => `  --sk-dur-${k}: ${v};`),
    ...Object.entries(motion.easing).map(([k, v]) => `  --sk-ease-${k}: ${v};`),
    "}",
  ].join("\n");
  const theme = (t) =>
    [
      `[data-theme="${t}"] {`,
      ...Object.keys(roles).map((r) => `  --sk-${r}: ${hex(r, t)};`),
      ...Object.entries(shadow).map(([k, v]) => `  --sk-shadow-${k}: ${v[t]};`),
      `  color-scheme: ${t};`,
      "}",
    ].join("\n");
  return [root, theme("light"), theme("dark")].join("\n\n");
}

// ---------- JSON ----------
export function tokenObject() {
  const themed = (t) =>
    Object.fromEntries(Object.keys(roles).map((r) => [r, hex(r, t)]));
  return {
    name: brand.name,
    version: brand.version,
    color: { primitives, light: themed("light"), dark: themed("dark") },
    font: { sans: fonts.sans, mono: fonts.mono },
    type: Object.fromEntries(
      Object.entries(type).map(([k, t]) => [
        k,
        { family: t.family, size: t.size, weight: t.weight, lineHeight: t.line, letterSpacing: t.track, stretch: t.stretch },
      ]),
    ),
    space,
    layout,
    breakpoints,
    radius,
    border,
    shadow,
    motion,
  };
}
export const json = () => JSON.stringify(tokenObject(), null, 2);

// ---------- JS theme ----------
export function jsTheme() {
  return `export const theme = ${JSON.stringify(tokenObject(), null, 2)};\n\nexport default theme;`;
}

// ---------- Tailwind ----------
export function tailwind() {
  const colors = Object.fromEntries(Object.keys(roles).map((r) => [r, `var(--sk-${r})`]));
  const cfg = {
    darkMode: ["selector", '[data-theme="dark"]'],
    theme: {
      extend: {
        colors: { ...colors, ...Object.fromEntries(Object.entries(primitives).map(([k, v]) => [k, v])) },
        fontFamily: { sans: [fonts.sans], mono: [fonts.mono] },
        borderRadius: radius,
        spacing: space,
        screens: breakpoints,
        maxWidth: { container: layout["container-max"], measure: layout.measure },
        boxShadow: Object.fromEntries(Object.keys(shadow).map((k) => [k, `var(--sk-shadow-${k})`])),
        transitionDuration: motion.duration,
        transitionTimingFunction: motion.easing,
      },
    },
  };
  return `// tailwind.config.js\n// Load the CSS variables export first. Colours resolve through var(--sk-*), so dark mode switches with data-theme.\nmodule.exports = ${JSON.stringify(cfg, null, 2)};`;
}

// ---------- DESIGN.md ----------
const q = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

export function componentTokens() {
  return {
    "button-primary": { backgroundColor: "{colors.accent}", textColor: "{colors.on-accent}", typography: "{typography.label}", rounded: "{rounded.md}", height: "48px", padding: "0 24px" },
    "button-primary-hover": { backgroundColor: "{colors.accent-hover}", textColor: "{colors.on-accent}" },
    "button-primary-pressed": { backgroundColor: "{colors.accent-press}", textColor: "{colors.on-accent}" },
    "button-secondary": { backgroundColor: "transparent", textColor: "{colors.text}", typography: "{typography.label}", rounded: "{rounded.md}", height: "48px", padding: "0 24px", borderColor: "{colors.text}", borderWidth: "2px" },
    "button-ghost": { backgroundColor: "transparent", textColor: "{colors.text}", typography: "{typography.label}", rounded: "{rounded.md}", height: "48px", padding: "0 16px" },
    tag: { backgroundColor: "{colors.sunken}", textColor: "{colors.text}", typography: "{typography.caption}", rounded: "{rounded.full}", height: "28px", padding: "0 12px" },
    input: { backgroundColor: "{colors.surface}", textColor: "{colors.text}", typography: "{typography.body}", rounded: "{rounded.md}", height: "48px", padding: "0 16px", borderColor: "{colors.line-strong}", borderWidth: "1px" },
    card: { backgroundColor: "{colors.surface}", textColor: "{colors.text}", rounded: "{rounded.lg}", padding: "24px", borderColor: "{colors.line}", borderWidth: "1px" },
    "table-header": { backgroundColor: "{colors.sunken}", textColor: "{colors.text-muted}", typography: "{typography.overline}", padding: "12px 16px" },
    "nav-bar": { backgroundColor: "{colors.ground}", textColor: "{colors.text}", typography: "{typography.label}", height: "72px", padding: "0 32px", borderColor: "{colors.line}", borderWidth: "1px" },
  };
}

function yamlBlock(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  return Object.entries(obj)
    .map(([k, v]) => {
      const key = /^[a-z0-9-]+$/i.test(k) ? k : q(k);
      return v && typeof v === "object" ? `${pad}${key}:\n${yamlBlock(v, indent + 1)}` : `${pad}${key}: ${typeof v === "number" ? v : q(v)}`;
    })
    .join("\n");
}

export function designMd() {
  const colors = { ...primitives };
  for (const r of Object.keys(roles)) {
    colors[`${r}-light`] = hex(r, "light");
    colors[`${r}-dark`] = hex(r, "dark");
  }
  const typography = {};
  for (const [k, t] of Object.entries(type)) {
    typography[k] = {
      fontFamily: t.family === "sans" ? "Archivo" : "JetBrains Mono",
      fontSize: t.size,
      fontWeight: t.weight,
      lineHeight: t.line,
      letterSpacing: t.track,
      ...(t.stretch !== "100%" ? { fontStretch: t.stretch } : {}),
    };
  }
  const spacing = { ...space, ...Object.fromEntries(Object.entries(layout).map(([k, v]) => [k, v])) };
  const front = [
    "---",
    `name: ${q(brand.name)}`,
    `description: ${q(brand.description)}`,
    `version: ${q(brand.version)}`,
    "colors:",
    yamlBlock(colors, 1),
    "typography:",
    yamlBlock(typography, 1),
    "rounded:",
    yamlBlock(radius, 1),
    "spacing:",
    yamlBlock(spacing, 1),
    "components:",
    yamlBlock(componentTokens(), 1),
    "---",
  ].join("\n");

  const roleRows = (t) => Object.keys(roles).map((r) => `| \`${r}\` | ${hex(r, t)} | ${primitives && roles[r][t]} | ${roles[r].desc} |`).join("\n");
  const contrast = runContrast().map((c) => `| ${c.theme} | ${c.fg} on ${c.bg} | ${c.ratio.toFixed(2)}:1 | ${c.min}:1 | ${c.pass ? "pass" : "FAIL"} |`).join("\n");
  const typeRows = Object.entries(type).map(([k, t]) => `| \`${k}\` | ${t.family === "sans" ? "Archivo" : "JetBrains Mono"} | ${t.size} | ${t.weight} | ${t.line} | ${t.track} | ${t.stretch} | ${t.use} |`).join("\n");
  const spaceRows = Object.entries(space).map(([k, v]) => `| \`${k}\` | ${v} |`).join("\n");
  const radiusRows = Object.entries(radius).map(([k, v]) => `| \`${k}\` | ${v} |`).join("\n");

  const body = `
# ${brand.name} Design System

## Overview

Sherka is a Swiss web design agency. It builds and maintains websites for small businesses (salons, practices, restaurants, trades) so they attract more customers and spend less time on their web presence. The base of operations is Biel/Bienne. The work is remote and covers all of Switzerland.

The interface feels bold, premium and trustworthy. Dark ink and bone white carry the layout. Amber is the single signal colour and is reserved for actions and the logo dot. Type is large, tight and confident. Surfaces are flat and separated by lines, not by shadows.

It must not feel like a generic AI-generated site, a cheap template or a typical tech startup. That means: no gradients, no glassmorphism, no purple, no stock-illustration blobs, no emoji, no rounded-everything softness, no filler claims.

### Principles

${principles.map(([t, d], i) => `${i + 1}. ${t}. ${d}`).join("\n")}

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
${Object.entries(primitives).map(([k, v]) => `| \`${k}\` | ${v} |`).join("\n")}

Light theme roles:

| Role | Hex | Primitive | Use |
|---|---|---|---|
${roleRows("light")}

Dark theme roles:

| Role | Hex | Primitive | Use |
|---|---|---|---|
${roleRows("dark")}

Amber rules: fill amber (\`accent\`) always carries \`on-accent\` ink text. On the light theme amber is never used as text; use \`accent-text\` (${hex("accent-text", "light")}). The logo dot uses \`brand-dot\`.

Verified contrast (WCAG 2.2, computed from the values above):

| Theme | Pair | Ratio | Minimum | Result |
|---|---|---|---|---|
${contrast}

## Typography

Two families. Archivo (variable, weight 100-900, width 62-125) for everything readable; width is used as a second hierarchy axis, wider for headlines. JetBrains Mono for tokens, numbers in tables, overlines and code. Fallbacks: ${fonts.sans.split(", ").slice(1).join(", ")}.

| Style | Family | Size | Weight | Line height | Tracking | Width | Use |
|---|---|---|---|---|---|---|---|
${typeRows}

Rules: headlines use \`text-wrap: balance\`, body uses \`text-wrap: pretty\`. Measure for reading text is ${layout.measure}. Never set body text below 15px. Overlines are uppercase.

## Layout

Base unit 4px. Spacing scale:

| Token | Value |
|---|---|
${spaceRows}

- Container max width ${layout["container-max"]}, gutters ${layout["gutter-mobile"]} (mobile) and ${layout["gutter-desktop"]} (desktop).
- Grid: ${layout["grid-columns-desktop"]} columns on desktop, ${layout["grid-columns-mobile"]} on mobile.
- Vertical rhythm between page sections: ${layout["section-y-mobile"]} mobile, ${layout["section-y-desktop"]} desktop. Inside a component use space 3 to 5.
- Section starts are marked by a 2px rule in \`text\` and a mono overline with the section number.
- Left-aligned by default. Centred text only for single short statements.

### Shape

| Token | Radius | Use |
|---|---|---|
${radiusRows}

Buttons and inputs use \`md\`. Cards and panels use \`lg\`. Tags use \`full\`. Images use \`sm\`. Borders: hairline ${border.hairline} for structure, strong ${border.strong} for emphasis and secondary buttons. The logo mark is two half-ellipses; it may be echoed once as a decorative shape per page, never repeated as a pattern.

## Elevation

Flat first. Depth comes from surface roles (\`ground\`, \`surface\`, \`sunken\`) and 1px lines.

| Level | Light | Dark | Use |
|---|---|---|---|
| 0 | none | none | Default |
| raised | \`${shadow.raised.light}\` | \`${shadow.raised.dark}\` | Hovered cards, dropdowns |
| overlay | \`${shadow.overlay.light}\` | \`${shadow.overlay.dark}\` | Dialogs, menus |

In dark mode the shadow includes a 1px ring so the edge stays visible.

## Components

Every component exists in light and dark. Each reads only role tokens, so it switches automatically. The \`components\` block in the front matter lists the light-theme token mapping.

- **Buttons.** Primary (amber fill, ink text), secondary (2px outline in \`text\`, inverts on hover), ghost (text only). Heights 36 / 48 / 56. States: default, hover, pressed (scale 0.98), focus (2px ring, 3px offset), disabled (\`sunken\` fill, \`text-muted\`), loading (spinner, label kept).
- **Tags.** Pill, 28px high, caption type. Neutral, accent (outline), success, danger, solid. Status tags always include a word, colour is never the only signal.
- **Inputs.** 48px high, 1px \`line-strong\` border, label always above the field, hint or error below. Focus: ring in \`focus\`. Error: \`danger\` border plus message text. Selects, checkboxes, radios and toggles share the same border and focus rules.
- **Cards.** \`surface\` fill, 1px \`line\`, radius \`lg\`, padding 24px. Hover on interactive cards: border moves to \`text\`, lifts 2px.
- **Data.** Tables with mono overline headers on \`sunken\`, 1px row lines, tabular numerals. Stat blocks with large figure and a caption. Progress bars 8px, always paired with a value.
- **Navigation.** Top bar 72px with logo left, links centre or right, one primary button. Tabs use a 2px underline in \`text\`. Breadcrumb in \`text-muted\`. Pagination uses secondary buttons at 40px.

### Motion

| Token | Value | Use |
|---|---|---|
| \`dur-fast\` | ${motion.duration.fast} | Press, hover colour |
| \`dur-base\` | ${motion.duration.base} | Most transitions |
| \`dur-slow\` | ${motion.duration.slow} | Panels, menus |
| \`dur-reveal\` | ${motion.duration.reveal} | Scroll reveal, once |
| \`ease-standard\` | \`${motion.easing.standard}\` | Enter and move |
| \`ease-exit\` | \`${motion.easing.exit}\` | Leave |

Animate only \`transform\` and \`opacity\`, plus colour. No parallax, no scroll-jacking, no looping decoration. With \`prefers-reduced-motion: reduce\` all transitions drop to 0.01ms and reveals show immediately.

## Imagery

Status: placeholder. No reference images were supplied, so no image styles are locked yet.

When references are provided, each gets a numbered locked style ("Style 01", "Style 02") with: the reference image, a table of style rules (subject, light, colour, composition, lens, texture, what to avoid), and a copy-paste prompt made of one subject sentence plus a fixed style block.

Constraints that already hold for any future style: no gradients, no emoji or cartoon illustration, no stock-photo handshakes or laptop-on-desk clichés, real Swiss small-business subjects, ink and bone tonality with at most one amber accent in frame, photographs with real people only with their consent.

## Responsive Behavior

| Breakpoint | Min width | Behaviour |
|---|---|---|
${Object.entries(breakpoints).map(([k, v]) => `| \`${k}\` | ${v} | ${{ sm: "Single column, 4-column grid, gutters 20px", md: "Two-column cards, tabs stay inline", lg: "12-column grid, gutters 32px, desktop navigation", xl: "Container reaches max width " + layout["container-max"] }[k]} |`).join("\n")}

- Mobile first. The base styles are the mobile styles.
- Touch targets are at least 44 by 44px. Primary buttons are full width below \`sm\`.
- Display and headline sizes use clamp(), so there is no jump at breakpoints.
- Navigation collapses to a menu button below \`lg\`. The primary button stays visible.
- Tables scroll horizontally inside their own container; the page never scrolls sideways.
- Print: light theme, no navigation, each section starts on a new page, links print their URL.

## Known Gaps

- Imagery styles are not locked (no reference images supplied).
- Archivo and JetBrains Mono load from Google Fonts. For production on sherka.ch, self-host them (the live site currently uses the system font stack plus Inter) and confirm the switch against page-speed targets.
- The live site currently uses a blue action colour. This system replaces it with amber. The live site needs a migration pass.
- No icon set is defined beyond the 1.75px-stroke style used in this document.
- Form validation messages exist only in German. French (/fr/) and a possible Italian version need a copy pass.
- Charts and data visualisation palettes are not defined; reuse \`accent\`, \`success\`, \`danger\` plus \`text-muted\` until a data palette is designed.
- Photography of the owner, client logos and testimonials are missing on the live site; the trust patterns are designed but have no real content yet.
`;
  return `${front}\n${body.trimStart()}`;
}
