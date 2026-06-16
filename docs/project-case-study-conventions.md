# Project case study conventions

Reference for building **additional** project case study pages. These rules apply across all case studies. Page layout and section structure may vary per project — do not copy the first case study layout blindly.

Reference implementation: `data/projects/instructional-video-for-managers.ts` + `components/projects/ProjectCaseStudy.tsx`.

---

## 1. Nav bar blur (on scroll)

Case study pages use the shared `SiteHeader` via `ProjectsPageShell`.

### Requirements

- Render header with **`persistent`** so it stays fixed while the page scrolls.
- Set **`headerVariant`** to match the hero: `"dark"` for dark heroes, `"light"` for light heroes.
- On scroll, the header must show a **progressive frosted-glass blur** — not a flat opaque bar with a hard bottom edge.

### How it works

- **Component:** `components/layout/SiteHeader.tsx`
- **Styles:** `components/layout/SiteHeader.module.css`
- After **12px** of scroll (`SCROLL_THRESHOLD_PX`), class `headerScrolled` is applied.
- Blur is rendered on a `::before` pseudo-element with:
  - `backdrop-filter: blur(22px) saturate(180%)`
  - A vertical gradient background (light or dark tint)
  - A **mask gradient** so blur fades out toward the bottom — no visible cutoff line
- At the top of the page the header stays fully transparent.

### Usage in a case study

```tsx
<ProjectsPageShell
  showcaseIndex={project.showcaseIndex}
  headerVariant={project.heroTheme === "dark" ? "dark" : "light"}
>
  {/* page content */}
</ProjectsPageShell>
```

### Do not

- Replace with a solid `background-color` bar on scroll.
- Remove `persistent` on scrollable case study pages.
- Use a hard-edged blur panel.

---

## 2. Dotted pattern on black sections

Every **dark/black surface** on a case study must use the same dot-grid texture.

### CSS pattern

Apply this shared dark-surface treatment (from `ProjectCaseStudy.module.css`):

```css
background-color: #000000;
background-image: radial-gradient(rgba(255, 255, 255, 0.15) 5%, transparent 0);
background-size: 30px 30px;
background-attachment: fixed;
color: #ffffff;
```

### Where it applies

Use on all black sections for a given page, for example:

- Dark hero (`.heroDark`)
- Dark process block (`.processSection`)
- Dark result block (`.resultSection`)
- Footer (`.footer`)

Any new dark section on a case study page must include this pattern. Do not use plain `#000` without the dots.

### Notes

- Dots are subtle white at **15% opacity**.
- Grid spacing: **30px × 30px**.
- `background-attachment: fixed` keeps the grid stable while scrolling.

---

## 3. Tools section — real logos only

The tools section must display **actual product/app logos**, not placeholders, generic icons, or text-only labels.

### Data shape

Each tool in the project data:

```ts
{
  name: string;      // Display name, e.g. "Premiere Pro"
  icon: string;      // Path to logo asset, e.g. "/assets/tools/premiere-pro.svg"
  wide?: boolean;    // Optional — use for horizontally wide logos (e.g. ClassIn)
}
```

Type: `ProjectTool` in `data/projects/instructional-video-for-managers.ts`.

### Asset rules

- Store logo files under **`/public/assets/tools/`** (referenced as `/assets/tools/...` in data).
- Prefer **SVG** or **PNG** with transparent background.
- Use official or accurate brand marks — not emoji, Font Awesome, or invented icons.
- Set `wide: true` when a logo is significantly wider than it is tall so it scales correctly (`.toolIconWide`).

### Rendering

- Render with `<img src={tool.icon} alt="" />` inside the tools grid.
- Label below the icon with the tool name.
- Icon sizing is handled by `.toolIcon` / `.toolIconWide` in `ProjectCaseStudy.module.css`.

---

## 4. Footer — previous / next project navigation

Every case study footer must include project-to-project navigation.

### Layout

Single horizontal row, vertically centered:

| Left | Center | Right |
|------|--------|-------|
| **← Go back** or **← Previous project** | Brand mark (`BrandMark variant="dark"`) | **Next project →** (empty on last) |

- Arrows must be **bold** (`font-weight: 800`).
- Footer sits on a **dark dotted surface** (see section 2).
- Footer has generous vertical padding; nav links and brand share one horizontal center line.

### Navigation logic

- **Helper:** `getAdjacentProjects(slug)` in `lib/projects.ts`
- Order comes from the `PROJECTS` array in that file.
- Navigation does **not** wrap: the first project shows **Go back** (returns to the showcase carousel); the last project leaves the right slot empty.
- With one project, left shows **Go back** and right is empty.

### Adding a new project

1. Create data file under `data/projects/`.
2. Import and append to `PROJECTS` in `lib/projects.ts` in the desired carousel order.
3. Footer prev/next updates automatically — no manual link wiring per page.

### Markup pattern

```tsx
<footer className={styles.footer}>
  {adjacentProjects?.previous ? (
    <Link href={`/projects/${adjacentProjects.previous.slug}`} className={`${styles.footerNav} ${styles.footerNavPrev}`}>
      <span className={styles.footerArrow} aria-hidden="true">←</span>
      Previous project
    </Link>
  ) : (
    <Link href={navIdToPortfolioHref("showcase", project.showcaseIndex)} className={`${styles.footerNav} ${styles.footerNavPrev}`}>
      <span className={styles.footerArrow} aria-hidden="true">←</span>
      Go back
    </Link>
  )}

  <div className={styles.footerBrand}>
    <BrandMark variant="dark" />
  </div>

  {adjacentProjects?.next ? (
    <Link href={`/projects/${adjacentProjects.next.slug}`} className={`${styles.footerNav} ${styles.footerNavNext}`}>
      Next project
      <span className={styles.footerArrow} aria-hidden="true">→</span>
    </Link>
  ) : (
    <span className={styles.footerNavSpacer} aria-hidden="true" />
  )}
</footer>
```

---

## Checklist for new case studies

Before shipping a new project page, confirm:

- [ ] Wrapped in `ProjectsPageShell` with correct `headerVariant` and `showcaseIndex`
- [ ] Nav blur appears on scroll (progressive fade, not a hard bar)
- [ ] Every black section uses the dotted pattern
- [ ] Tools use real logo assets from `/assets/tools/`
- [ ] Footer has **Previous project** / **Next project** with bold arrows + centered brand
- [ ] Project registered in `lib/projects.ts` `PROJECTS` array

---

## Out of scope for this document

- Overall page layout and section order (may differ per project)
- Hero composition, media breaks, typography scale, grid choices
- Which sections exist (Context, Process, Highlights, etc.) — decide per project
