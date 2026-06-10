"# Swayam-Sanchay — Design System

A reference document of every visual and interaction decision used in **Utkarsh Dubey's portfolio**.

---

## 1. Concept

**Theme**: \"Developer Terminal\" — a dark, archival, retro-futuristic aesthetic that treats the portfolio like a live system log rather than a marketing page.

**Mood**: precise · technical · elegant · quietly confident · slightly nocturnal.

**Guiding principle**: every section reinforces the metaphor that *the site itself is a running process* — clocks tick, status dots pulse, terminal blocks render command output, and the navigation reports its own version (`v2.6`).

---

## 2. Color System

| Token | Value | Use |
|---|---|---|
| `bg.base` | `#050505` | Page background, void layer |
| `bg.surface` | `#0A0A0A` | Card body under glass |
| `bg.terminal` | `#000000` | Inside terminal blocks |
| `glass` | `rgba(255,255,255,0.02)` | Default card surface |
| `glass.hover` | `rgba(255,255,255,0.04)` | Hover state |
| `border` | `rgba(255,255,255,0.08)` | Default card border |
| `text.primary` | `#FAFAFA` (zinc-100) | Headings, key text |
| `text.secondary` | `#A1A1AA` (zinc-400) | Body copy |
| `text.tertiary` | `#52525B` (zinc-500/600) | Mono metadata |
| `accent.emerald` | `#10B981` / `#34D399` | Brand, status, hover, mono tags |
| `accent.sky` | `#38BDF8` | Focus card 2, Telemetry articles |
| `accent.amber` | `#FBBF24` | Focus card 3, Reliability articles |
| `accent.cyan / rose` | secondary skill tones | Database, Tools |

**Forbidden**: purple/violet gradients, white card backgrounds, pure neon green. Emerald is always paired with a generous amount of black to keep contrast WCAG-AA.

---

## 3. Typography

| Role | Family | Notes |
|---|---|---|
| Headings | `Outfit` (light/regular) | Geometric, modern; never bold |
| Body | `IBM Plex Sans` | Calm, technical, easy to scan |
| Mono / accent | `JetBrains Mono` | All metadata, tags, terminals, status pills, timestamps |

**Rules**
- Section titles: `text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight`
- Hero: `text-4xl → 4.25rem` mixing sans + mono on the same line
- Mono is always tracked (`tracking-[0.15em]` or wider) and often `uppercase` for kickers
- No Inter, Roboto, or generic system fonts anywhere

---

## 4. Spacing & Layout

- Container: `max-w-7xl mx-auto px-6 sm:px-12`
- Section rhythm: `py-24 sm:py-32` between every block (deliberately spacious)
- Cards: `rounded-2xl p-7 sm:p-8`
- Grid: 12-col bento for Focus Areas (6 / 3 / 3), 3-col for Skills, 2-col for Projects, 4-col for Connectors
- Optical alignment: dense text and terminal output are **always left-aligned**; only hero left-aligns asymmetrically with negative space on the right

---

## 5. Surfaces — Glassmorphism

```css
.glass {
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1rem;
}
.glass-hover:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(16,185,129,0.30);
}
```

- Cards stay translucent so the animated mesh shows faintly underneath
- Hover **lifts borders to emerald**, never adds a shadow (avoids generic SaaS feel)
- Terminal blocks break the glass language on purpose — solid black with a subtle scan-line gradient

---

## 6. Background System (`MeshBackground.jsx`)

Layered, all `position: fixed`, all `pointer-events: none`:

1. **Void base** — solid `#050505`
2. **Lattice grid** — 60px emerald grid at 7% opacity, masked by a radial gradient so it fades toward the edges
3. **Three drifting radial orbs**
   - Orb 1 — emerald, top-left, 24s drift
   - Orb 2 — sky, mid-right, 28s drift
   - Orb 3 — indigo, bottom-left, 32s drift
   - Each blurred 80–100px, opacity 25–40%
4. **SVG noise overlay** — fractal turbulence at 4% opacity, `mix-blend-overlay`
5. **Vignette** — radial fade to pure black at the corners

All animations respect `prefers-reduced-motion`.

---

## 7. Navigation

- **Top bar**: identity pill (`UTKARSH_DUBEY` with pulsing emerald dot) on the left, version stamp (`SWAYAM_SANCHAY / v2.6`) on the right
- **Floating capsule (desktop ≥md)**: pinned bottom-center, 10 mono links inside a glass capsule. Active link gets an emerald-tinted background + faint border ring
- **Mobile nav (<md)**: horizontally scrollable pill bar at the bottom
- Active state powered by `IntersectionObserver` with rootMargin `-40% 0px -55% 0px` so the highlight switches exactly when a section enters the upper third of the viewport

---

## 8. Section Patterns

### Section Header
- Kicker: `/ 0X — section_slug` in tracked emerald mono, prefixed by an 8px emerald rule
- Title: `Outfit text-3xl/5xl font-light`
- Subtitle: `zinc-500 max-w-2xl`

### Hero
- Three-line headline mixing sans + mono (`systems behave_in_production` with blinking caret)
- Status tag pill with active-focus
- Terminal block underneath rendering `$ whoami --verbose`

### Focus Areas (Bento)
- Card 1 spans 6 cols at lg, cards 2 & 3 span 3 cols
- Hover reveals a colored tint matching the card's accent (emerald / sky / amber)
- Each card has a numbered counter `0X/03` in the top-right corner

### Skills
- 6 categories, each a glass tile with a colored icon and chip cluster
- Chips: `font-mono text-xs px-2.5 py-1 rounded-full border border-white/10`
- \"Learning: Go\" pill uses an amber pulsing dot

### Featured Writing
- 3 article cards with group-hover dim effect (siblings fade to 50% opacity)
- Category pill in category color, read-time in mono
- CTA `read.full_log()` deep-links into the Notebook and auto-expands the matching note

### Projects
- 2-column glass cards with bullet lists prefixed by `[+]` mono markers
- Status pill with pulsing emerald dot
- Footer of card holds a GitHub `Inspect.source` link with arrow-up-right icon

### Notebook (Archive)
- Sticky sidebar (3 cols): search input, category pill filters with counts, live `archive --stats` terminal block
- Main list (9 cols): divider-separated rows with date column, category, title, excerpt, expand chevron
- Expanded state reveals a terminal block showing `$ cat /notes/NNN_category.md` with the full body

### Timeline
- Single vertical emerald-to-transparent stem on the left
- Nodes are hollow emerald circles; expanded node fills emerald with a glow
- Expansion reveals a terminal block tagged `$ tail -f /logs/{file}.md` with `[LABEL] body` entries
- Plus/Minus icon morphs in the corner button

### Education + Research
- 3 horizontal glass cards
- Research interests rendered as a numbered grid (`[01]`, `[02]`, …) in mono

### Connectors
- 4-col grid of glass tiles; each tile gets a brand-tinted hover (GitHub→zinc, LinkedIn→sky, Medium→emerald, Scholar→blue, ORCID→lime, Instagram→pink, Email→amber)
- Icon scales on hover; arrow-up-right indicator slides diagonally

### Footer
- Large glass panel with project recap on the left
- **Live UTC clock**: `[UTC HH:MM:SS] — sys.clock.synced` ticking every second with a pulsing dot
- Below: version stamp `v2.6 / continuously_in_motion` + back-to-top link

---

## 9. Motion

- **Entrance**: `framer-motion` reveal — `opacity 0, y: 16 → 0`, duration 0.5–0.7s, `easeOut`, staggered ~80ms between siblings
- **Hover**: 500ms `transition-all` on glass cards (background + border), 200ms on links
- **Continuous**: orb drift (24–32s), pulse dots (2s), caret blink (1s)
- **Expansion**: `AnimatePresence` with `height: 0 → auto`, 300ms
- All continuous animations disabled under `prefers-reduced-motion: reduce`

---

## 10. Iconography

- Library: `lucide-react` only
- `strokeWidth: 1.6 – 1.8` (never the default 2 — too heavy for this aesthetic)
- Used: `Cpu`, `Activity`, `Shield`, `Code2`, `MonitorSmartphone`, `Server`, `Database`, `Cloud`, `Wrench`, `Search`, `X`, `ChevronRight`, `Plus`, `Minus`, `Github`, `Linkedin`, `BookOpen`, `GraduationCap`, `BadgeCheck`, `Instagram`, `Mail`, `ArrowUpRight`, `ArrowRight`, `Terminal`
- **No emoji characters** anywhere

---

## 11. Component Map

```
App.js
├── MeshBackground         (fixed background layers)
├── Navigation             (top bar + floating capsule + mobile nav)
└── main
    ├── Hero               (#hero)
    ├── Philosophy         (#about)
    ├── FocusAreas         (#focus)
    ├── Skills             (#skills)
    ├── FeaturedWriting    (#writing)   ← onOpen(id) lifts into App state
    ├── Projects           (#projects)
    ├── Notebook           (#archive)   ← receives openNoteId
    ├── Timeline           (#timeline)
    ├── Education          (#education + #research)
    └── Connectors         (#connectors)
└── Footer                 (live clock + back-to-top)
```

Data is centralized in `/app/frontend/src/data/`:
- `portfolio.js` — nav, focus, skills, projects, timeline, education, research, connectors
- `notes.js` — 10 notebook entries + categories list

---

## 12. Accessibility & Testing

- **Contrast**: all emerald text on `#050505` clears WCAG AA at the chosen weights
- **Reduced motion**: mesh orbs, pulses, caret all halt under user preference
- **Focus order**: native semantic HTML (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`) with internal anchor links
- **Test IDs**: every interactive element has a kebab-case `data-testid` (e.g. `nav-link-hero`, `archive-filter-reliability`, `timeline-toggle-2`, `connector-github`, `terminal-clock`, `footer-back-top`)

---

## 13. Things Intentionally Avoided

- Purple / violet brand gradients
- White or near-white card backgrounds
- Centered marketing layouts
- Generic Inter / Roboto stack
- Drop shadows on cards (we use border-color shift instead)
- Long fade-in stagger marathons (kept under 0.7s per element)
- Emoji-as-icon

---

*This document captures the design intent of Swayam-Sanchay v2.6. Any future feature should reinforce the \"live process\" metaphor — if it would feel at home in a terminal session, it belongs.*
"