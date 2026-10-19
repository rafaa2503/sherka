# Sherka design system

Open `index.html` for the reference site. `DESIGN.md` is the exportable spec.

Single source of truth: `tokens.mjs`. Rebuild everything with:

```bash
node design-system/build.mjs
```

This regenerates `index.html`, `DESIGN.md` and `tokens.css`, and fails if any contrast pair drops below its minimum.
