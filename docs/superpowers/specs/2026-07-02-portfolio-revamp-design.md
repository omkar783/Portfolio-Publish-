# Portfolio Revamp — Design Doc

## Overview

Polish and refine the existing DevOps-themed portfolio with richer animations, better mobile UX, interactive elements, and a contact form while preserving the terminal hero identity.

## Architecture

- **Framework:** React 19 (no router — single page)
- **UI Library:** `performative-ui` (existing — keep GlassCard, Button, GradientText, Rotator, StatCounter)
- **Styling:** Plain CSS (existing approach — no Tailwind)
- **API:** Existing Vercel Serverless Functions (`api/track.mjs`, `api/get-visitors.mjs`) + new `api/contact.mjs`

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Terminal hero | Keep as-is, refine spacing | Unique brand identity for DevOps engineer |
| Scroll animations | IntersectionObserver + staggered children | Zero-dependency, performant |
| Contact form | Vercel Function + Blob store | Same infra as visitor tracking, no email service needed |
| Mobile nav | Hamburger stays (improved), add swipe | Hamburgers more discoverable than bottom tabs for portfolios |
| Admin panel | Keep modal, add keyboard/UX polish | Functional, just needs ergonomic fixes |

## Section-by-Section Spec

### 1. Hero Section
- Profile pic: 160x160, pulse glow animation on load (CSS keyframe - box-shadow oscillation)
- Terminal right panel: sequential line appearance via CSS animation-delay (each line delayed 0.3s after previous)
- Stats: Change from flat bar to individual glass cards with animated StatCounter and SVG icons
  - Icon set: Phosphor (server, heartbeat, rocket, timer)
  - Hover: slight lift + border glow
- Buttons: "Hire Me" adds arrow icon on hover, LinkedIn shows logo icon
- Background: Add slow-drift CSS animation on the grid pattern (transform: translate)

### 2. Skills Section
- Category-based tag colors:
  - Cloud & Infrastructure: `#38bdf8` (blue)
  - Containers & K8s: `#14b8a6` (teal)
  - CI/CD & Version Control: `#a78bfa` (purple)
  - Infrastructure as Code: `#fb923c` (orange)
  - Web Servers & Stacks: `#34d399` (green)
  - Monitoring & Security: `#f472b6` (pink)
  - Databases & Caching: `#facc15` (yellow)
  - AI & LLM Tooling: `#818cf8` (indigo)
- Tags stagger entrance on scroll using `transition-delay` calculation per tag index
- GlassCard border changes to match category color on hover

### 3. Experience Timeline
- Timeline line animates as user scrolls (grow from 0 to full height using IntersectionObserver + CSS height transition)
- Current role (first item) gets pulsing green dot on timeline
- Bullet points fade in sequentially using `data-reveal` with per-index delay
- Click on timeline card toggles expanded/collapsed view (show first bullet, expand all on click)

### 4. Projects Section
- Color accent bar at top of each card (unique color derived from tag[0])
- Tech badges: colored by technology type (Docker=blue, AWS=orange, GitHub=purple, etc.)
- Grid: 3-col desktop, 2-col tablet, 1-col mobile (via CSS grid auto-fill with responsive overrides)

### 5. Education & Certifications
- Minimal changes — card layout continues existing pattern
- Certifications get tag-style badges with category colors

### 6. Contact Section
- Add contact form with fields: Name, Email, Message
- Floating label pattern (label moves up on focus/value)
- Form posts to `/api/contact` (new Vercel Function)
- Submit button: loading spinner (CSS animation), success checkmark, error shake
- Existing contact info cards remain

### New: Contact API (`api/contact.mjs`)
- Receives POST with `{ name, email, message }`
- Validates: name > 2 chars, email regex, message > 10 chars
- Stores to Vercel Blob `messages.json` (same pattern as visits)
- Returns `{ ok: true }` or `{ error: "..." }` with 400
- Same CORS/admin-style auth pattern

### 7. Mobile Experience
- Hamburger menu: smoother open/close transition, backdrop blur
- Timeline: horizontal padding increased, font sizes adjusted
- Skills grid: 2-col on mobile
- Admin table: card view on mobile (label: value rows instead of table)
- All touch targets >= 44px
- Swipe left/right gesture on sections — deferred (out of scope for this iteration)

### 8. Admin Panel Polish
- Close with Escape key (add keydown listener)
- Table sticky first column (IP) for horizontal scroll
- Mobile card view: `{ ip: ..., location: ..., time: ... }` per row
- Loading state: skeleton instead of text
- Error: retry button

### 9. Global Polish
- All `data-reveal` animations use `cubic-bezier(0.22, 1, 0.36, 1)` easing (already set — keep)
- Reduced motion media query respected (already done — expand to include new animations)
- `::selection` color already set — keep
- Smooth scroll for anchor links (already have — keep)
- Focus-visible outlines for all interactive elements (already have — extend to form fields)

## Data Flow

```
Visitor: /api/track POST → Vercel Function → fetch read visits.json → append → put()
Admin:   /api/get-visitors GET → Vercel Function → fetch visits.json → return filtered
Contact: /api/contact POST → Vercel Function → fetch read messages.json → append → put()
```

All three use the same pattern: fetch existing blob, modify, put with `allowOverwrite: true`.

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.jsx` | Hero refinements, new contact form component, admin panel polish, Escape key, mobile improvements |
| `src/App.css` | All new styles for each section, new animations, mobile card view for admin |
| `api/contact.mjs` | **New file** — contact form Vercel Function |

## Not in Scope
- No database migration (Vercel Blob stays)
- No router (single page stays)
- No dark/light mode toggle (dark-only is the brand)
- No i18n (English only)
