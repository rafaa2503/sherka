// Single source of truth for the Sherka design system.
// build.mjs derives index.html (site + CSS), DESIGN.md and every export from this file.

export const brand = {
  name: "Sherka",
  description:
    "Swiss web design agency that builds and maintains websites for small businesses. Bold, premium, trustworthy: dark ink, bone white, one amber signal.",
  version: "1.0.0",
};

// Raw palette. Hex only. Logo values (ink, bone, amber) come from /logo.
export const primitives = {
  "ink-950": "#0E0D14",
  "ink-900": "#14131C",
  "ink-800": "#1C1B26",
  "ink-700": "#262532",
  "ink-600": "#34333F",
  "ink-500": "#5A5A68",
  "ink-400": "#70707E",
  "ink-300": "#A3A4B0",
  "bone-50": "#FFFFFF",
  "bone-100": "#F0F1F3",
  "bone-200": "#E9EAED",
  "bone-300": "#D6D7DC",
  "amber-400": "#FFB84D",
  "amber-500": "#FFA51E",
  "amber-600": "#E69100",
  "amber-700": "#C77A00",
  "amber-800": "#8F5700",
  "green-400": "#4CC38A",
  "green-700": "#1B7F4B",
  "red-400": "#FF7A70",
  "red-700": "#C42B22",
};

// Semantic roles per theme. Values are primitive names.
export const roles = {
  ground: { desc: "Page background", light: "bone-100", dark: "ink-900" },
  surface: { desc: "Cards, inputs, raised panels", light: "bone-50", dark: "ink-800" },
  sunken: { desc: "Wells, code, table headers, disabled fills", light: "bone-200", dark: "ink-950" },
  line: { desc: "Dividers and card borders", light: "bone-300", dark: "ink-600" },
  "line-strong": { desc: "Input borders, UI boundaries (3:1 or better)", light: "ink-400", dark: "ink-400" },
  text: { desc: "Headlines and body", light: "ink-900", dark: "bone-100" },
  "text-muted": { desc: "Secondary text, captions", light: "ink-500", dark: "ink-300" },
  accent: { desc: "Primary action fill. The one signal colour.", light: "amber-500", dark: "amber-500" },
  "accent-hover": { desc: "Primary action, hover", light: "amber-400", dark: "amber-400" },
  "accent-press": { desc: "Primary action, pressed", light: "amber-600", dark: "amber-600" },
  "on-accent": { desc: "Text on accent fill", light: "ink-900", dark: "ink-900" },
  "accent-text": { desc: "Accent used as text or icon on ground", light: "amber-800", dark: "amber-500" },
  "brand-dot": { desc: "Amber dot of the logo", light: "amber-700", dark: "amber-500" },
  success: { desc: "Success text and icons", light: "green-700", dark: "green-400" },
  danger: { desc: "Error text and icons", light: "red-700", dark: "red-400" },
  focus: { desc: "Focus ring", light: "ink-900", dark: "amber-500" },
};

export const fonts = {
  sans: 'Archivo, "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

// Type scale. stretch is the Archivo width axis (62 to 125).
export const type = {
  display: { size: "clamp(2.75rem, 1.2rem + 6.2vw, 5.5rem)", weight: 800, line: "0.98", track: "-0.035em", stretch: "112%", family: "sans", use: "Hero headlines. One per page." },
  h1: { size: "clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)", weight: 800, line: "1.02", track: "-0.03em", stretch: "108%", family: "sans", use: "Page and section titles." },
  h2: { size: "clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)", weight: 700, line: "1.1", track: "-0.02em", stretch: "104%", family: "sans", use: "Sub-sections." },
  h3: { size: "1.5rem", weight: 700, line: "1.2", track: "-0.015em", stretch: "100%", family: "sans", use: "Card titles." },
  h4: { size: "1.25rem", weight: 600, line: "1.3", track: "-0.01em", stretch: "100%", family: "sans", use: "Small headings, list titles." },
  "body-lg": { size: "1.1875rem", weight: 400, line: "1.55", track: "0", stretch: "100%", family: "sans", use: "Lead paragraphs." },
  body: { size: "1.0625rem", weight: 400, line: "1.6", track: "0", stretch: "100%", family: "sans", use: "Default reading text." },
  "body-sm": { size: "0.9375rem", weight: 400, line: "1.5", track: "0", stretch: "100%", family: "sans", use: "Secondary text, table cells." },
  caption: { size: "0.8125rem", weight: 400, line: "1.4", track: "0.01em", stretch: "100%", family: "sans", use: "Hints, legal, meta." },
  label: { size: "1rem", weight: 600, line: "1", track: "0.005em", stretch: "104%", family: "sans", use: "Buttons, tabs, form labels." },
  overline: { size: "0.75rem", weight: 500, line: "1.2", track: "0.12em", stretch: "100%", family: "mono", use: "Eyebrows, section numbers. Uppercase." },
  code: { size: "0.875rem", weight: 400, line: "1.6", track: "0", stretch: "100%", family: "mono", use: "Tokens, URLs, numbers in tables." },
};

export const space = { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "24px", 6: "32px", 7: "48px", 8: "64px", 9: "96px", 10: "128px" };

export const layout = {
  "container-max": "1200px",
  "measure": "68ch",
  "gutter-mobile": "20px",
  "gutter-desktop": "32px",
  "grid-columns-mobile": "4",
  "grid-columns-desktop": "12",
  "section-y-mobile": "64px",
  "section-y-desktop": "128px",
};

export const breakpoints = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" };

export const radius = { none: "0px", sm: "4px", md: "8px", lg: "16px", full: "999px" };

export const border = { hairline: "1px", strong: "2px" };

export const shadow = {
  raised: {
    light: "0 1px 2px rgb(20 19 28 / 0.06), 0 12px 28px -14px rgb(20 19 28 / 0.22)",
    dark: "0 0 0 1px #34333F, 0 16px 32px -16px rgb(0 0 0 / 0.7)",
  },
  overlay: {
    light: "0 2px 4px rgb(20 19 28 / 0.08), 0 24px 56px -16px rgb(20 19 28 / 0.32)",
    dark: "0 0 0 1px #34333F, 0 28px 56px -16px rgb(0 0 0 / 0.85)",
  },
};

export const motion = {
  duration: { fast: "120ms", base: "200ms", slow: "360ms", reveal: "600ms" },
  easing: {
    standard: "cubic-bezier(0.23, 1, 0.32, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
};

// Contrast pairs the build must prove. [foreground role, background role, minimum ratio]
export const contrastChecks = [
  ["text", "ground", 4.5],
  ["text", "surface", 4.5],
  ["text-muted", "ground", 4.5],
  ["text-muted", "surface", 4.5],
  ["accent-text", "ground", 4.5],
  ["accent-text", "surface", 4.5],
  ["on-accent", "accent", 4.5],
  ["on-accent", "accent-hover", 4.5],
  ["on-accent", "accent-press", 4.5],
  ["success", "surface", 4.5],
  ["danger", "surface", 4.5],
  ["line-strong", "surface", 3],
  ["line-strong", "ground", 3],
  ["focus", "ground", 3],
];

export const themes = ["light", "dark"];

export const principles = [
  ["Proof before promise", "Show a result, a real measurement, a real project. Never an adjective on its own."],
  ["One signal", "Amber appears once or twice per screen, on the thing the visitor should do next."],
  ["Type does the work", "Hierarchy comes from size, weight and width, not from decoration."],
  ["Calm contrast", "Every text pair is tested. Dark and light are equal first-class themes."],
  ["Swiss in substance", "Precise copy, correct spelling (no ß), real contact details, Sie-form."],
];
