# Design System — Note Board

> Source of truth: approved `index.html`.
> Every value below is extracted from it. Changing a value here without changing approved design is defect.

Last updated: 2026-08-13

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#F8FAFC` | Page background, quiet cards |
| `--color-bg-soft` | `#EEF4FF` | Page gradient end, nav hover, status pill, empty illustration |
| `--color-surface` | `#FFFFFF` | Card / panel background |
| `--color-surface-raised` | `#FBFDFF` | Note card gradient end, state panels |
| `--color-border` | `#DCE3EF` | Default border, divider |
| `--color-border-skeleton` | `#E7EDF7` | Skeleton placeholder lines |
| `--color-text` | `#111827` | Body text, headings |
| `--color-text-body` | `#334155` | Note body text |
| `--color-text-muted` | `#64748B` | Secondary text, captions |
| `--color-text-tag` | `#475569` | Tag text |
| `--color-primary` | `#2563EB` | Primary active state, logo, focus color source |
| `--color-primary-strong` | `#1E40AF` | Primary hover text, logo, illustration strokes |
| `--color-primary-text` | `#FFFFFF` | Text on primary and logo |
| `--color-success` | `#10B981` | Read-only status dot, success accent |
| `--color-success-bg` | `#ECFDF5` | Eyebrow background |
| `--color-success-text` | `#047857` | Eyebrow text |
| `--color-tag-bg` | `#F1F5F9` | Tag background |
| `--color-danger` | `#DC2626` | Error stroke |
| `--color-danger-strong` | `#991B1B` | Error heading and icon mark |
| `--color-danger-text` | `#7F1D1D` | Error body text |
| `--color-danger-bg` | `#FEF2F2` | Error panel background |
| `--color-danger-icon-bg` | `#FEE2E2` | Error icon fill |
| `--color-focus` | `#2563EB` | Focus ring source color at 38% alpha |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `16.6:1` | AA |
| `--color-text` | `--color-surface` | `17.7:1` | AA |
| `--color-text-body` | `--color-surface-raised` | `11.9:1` | AA |
| `--color-text-muted` | `--color-surface` | `4.8:1` | AA |
| `--color-text-muted` | `--color-bg` | `4.5:1` | AA |
| `--color-text-tag` | `--color-tag-bg` | `6.4:1` | AA |
| `--color-primary-text` | `--color-primary` | `5.2:1` | AA |
| `--color-primary-strong` | `--color-bg-soft` | `7.9:1` | AA |
| `--color-success-text` | `--color-success-bg` | `4.8:1` | AA |
| `--color-danger-strong` | `--color-danger-bg` | `7.8:1` | AA |
| `--color-danger-text` | `--color-danger-bg` | `10.0:1` | AA |
| `--color-border` | `--color-surface` | `1.3:1` | FAIL for UI border contrast; decorative separator only |
| `--color-danger` | `--color-danger-bg` | `4.0:1` | AA Large / UI |

### 1.2 Spacing

Base unit: `1px`, because approved design uses precise values outside 4px grid. Product spacing should reuse these exact values.

| Token | Value |
|---|---|
| `--space-0` | `0` |
| `--space-1` | `5px` |
| `--space-2` | `6px` |
| `--space-3` | `7px` |
| `--space-4` | `8px` |
| `--space-5` | `9px` |
| `--space-6` | `10px` |
| `--space-7` | `11px` |
| `--space-8` | `12px` |
| `--space-9` | `13px` |
| `--space-10` | `14px` |
| `--space-11` | `16px` |
| `--space-12` | `18px` |
| `--space-13` | `20px` |
| `--space-14` | `22px` |
| `--space-15` | `24px` |
| `--space-16` | `28px` |
| `--space-17` | `32px` |
| `--space-18` | `34px` |
| `--space-19` | `56px` |

Clamp values used: `clamp(20px, 3vw, 28px)`, `clamp(28px, 5vw, 54px)`.

### 1.3 Typography

Font families, loaded from system stack only:

- Body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Headings: same as body
- Mono: none used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-xs` | `12px` | normal | `400` / `650` | Time, tags |
| `--text-sm` | `13px` | normal | `700` | Eyebrow, status pill, meta caption |
| `--text-note` | `14px` | `1.55` | `400` | Read-only scope note, guide text |
| `--text-base` | `16px` | `1.5` to `1.6` | `400` | Body fallback, board subtitle, note copy |
| `--text-card-title` | `17px` | normal | default bold | Note card h3 |
| `--text-lg` | `clamp(17px, 2vw, 20px)` | `1.65` | `400` | Lead paragraph |
| `--text-xl` | `22px` | normal | bold | State heading, meta value |
| `--text-2xl` | `24px` | normal | bold | State guide h2 |
| `--text-3xl` | `26px` | normal | bold | Board h2 |
| `--text-display` | `clamp(42px, 7vw, 74px)` | `.94` | bold | Page h1 |

Heading levels are used in order: `h1`, `h2`, `h3`. No skipped level.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | `12px` | Logo, skeleton line cap base |
| `--radius-md` | `18px` | Cards, read-only note, guide card |
| `--radius-lg` | `28px` | Intro, board, state panels, guide section |
| `--radius-mobile-lg` | `22px` | Main panels under 560px |
| `--radius-topbar-mobile` | `24px` | Topbar under 900px |
| `--radius-full` | `999px` | Pills, dot, buttons, skeleton lines |
| `--border-width` | `1px` | Default border |
| `--border-width-illustration` | `3px` | Empty and error SVG strokes |
| `--shadow-sm` | `0 10px 24px rgba(37,99,235,.24)` | Active preview button |
| `--shadow-md` | `0 14px 32px rgba(15,23,42,.08)` | Hovered note card |
| `--shadow-lg` | `0 18px 50px rgba(15,23,42,.10)` | Main intro and board panels |
| `--shadow-topbar` | `0 10px 30px rgba(15, 23, 42, .06)` | Sticky topbar |
| `--shadow-guide` | `0 14px 34px rgba(15,23,42,.07)` | State guide |
| `--duration-fast` | `.18s` | Nav hover and preview button hover |
| `--duration-base` | `.2s` | Note card hover |
| `--duration-panel` | `.32s` | State panel entrance |
| `--duration-pulse` | `1.5s` | Status dot pulse |
| `--duration-shimmer` | `1.35s` | Skeleton shimmer |
| `--easing` | `ease` | All transitions and animations |

Motion respects `prefers-reduced-motion: reduce`: animation duration becomes `.01ms`, iteration count becomes `1`, scroll behavior becomes `auto`, transition duration becomes `.01ms`.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `base` | `0` | `min(100% - 20px, 1120px)` under 560px | 1 | `20px` page inset |
| `sm` | `560px` | `min(1120px, calc(100% - 32px))` | 1 | `32px` page inset |
| `md` | `900px` | `min(1120px, calc(100% - 32px))` | Hero 2 columns | `28px` |
| `lg` | `1120px` | `1120px` max | Hero `1.05fr .95fr` | `28px` |
| `xl` | Not used | Not used | Not used | Not used |

Z-index scale, only these values allowed:

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | `5` |
| Dropdown | Not used |
| Modal backdrop | Not used |
| Modal | Not used |
| Toast | Not used |
## 2. Components

One subsection per reusable component. Every component lists all states.

### 2.1 App shell

**Purpose** — Holds entire single-page product, including sticky topbar, intro, board, and state guide. Do not use for nested panels.

**Anatomy** — `[topbar] [main: hero + state guide]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-bg`, `--color-bg-soft`, `--space-16`, `--space-19` | Full Note Board page |
| Mobile | `--space-6`, `--space-13` | Viewport under `560px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `min-height: 100vh` | `28px 0 56px` | `--text-base` |
| Mobile | `min-height: 100vh` | `10px 0 56px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Soft radial plus vertical page gradient | `--color-bg`, `--color-bg-soft`, `--color-primary` |
| Hover | No page-level hover | None |
| Focus (keyboard) | Focus handled by child links and buttons | `--color-focus` |
| Active / pressed | No page-level active state | None |
| Disabled | App shell is never disabled | None |
| Loading | Board area shows skeletons; shell stays stable | `--duration-shimmer` |
| Error | Board area shows error panel; shell stays stable | `--color-danger-bg` |
| Empty | Board area shows empty panel; shell stays stable | `--color-surface-raised` |

**Accessibility** — Use landmark order `header`, `main`, sections with labelled headings. Page remains usable at `320px` width. No shell focus target.

### 2.2 Sticky topbar

**Purpose** — Shows brand, section links, and design-preview state controls. Real product build removes preview state controls.

**Anatomy** — `[brand link] [mobile menu button] [nav links] [preview state controls]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Desktop | `--radius-full`, `--shadow-topbar`, `--color-surface` | Width `> 900px` |
| Mobile | `--radius-topbar-mobile`, `--color-surface` | Width `<= 900px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Desktop | Content-driven | `14px 16px` | `--text-base` |
| Mobile | Content-driven | `14px 16px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Translucent white pill, blurred backdrop, light border | `--color-surface`, `--color-border`, `--shadow-topbar` |
| Hover | Child links get pale primary background and slight lift | `--color-bg-soft`, `--color-primary-strong`, `--duration-fast` |
| Focus (keyboard) | Links and buttons show 3px primary focus ring with 3px offset | `--color-focus` |
| Active / pressed | Preview button uses primary fill and white text | `--color-primary`, `--color-primary-text`, `--shadow-sm` |
| Disabled | No disabled state in approved design | None |
| Loading | Preview Loading button can be active in design only | `--color-primary`, `--color-primary-text` |
| Error | Preview Error button can be active in design only | `--color-primary`, `--color-primary-text` |
| Empty | Preview Empty button can be active in design only | `--color-primary`, `--color-primary-text` |

**Accessibility** — Brand link has `aria-label="Note Board home"`. Nav has `aria-label="Design sections"`. Mobile menu uses `aria-expanded` and `aria-controls`. Escape closes mobile nav and returns focus to menu button. Targets meet 44px height when topbar padding included.

### 2.3 Intro panel

**Purpose** — States product scope and reassures user that page is read-only. Do not add marketing actions.

**Anatomy** — `[eyebrow] [h1] [lede] [scope summary cards]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--radius-lg`, `--shadow-lg` | Product intro on Notes page |
| Mobile | `--radius-mobile-lg` | Width `<= 560px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `clamp(28px, 5vw, 54px)` | `--text-display`, `--text-lg` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White translucent card with green background accent circle | `--color-surface`, `--color-success` |
| Hover | No hover state | None |
| Focus (keyboard) | Child brand and nav handle focus; panel not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Intro unchanged while notes load | None |
| Error | Intro unchanged when notes fail | None |
| Empty | Intro unchanged when no notes exist | None |

**Accessibility** — Page title is `h1`. Eyebrow dot is `aria-hidden`. Scope summary uses `aria-label="Scope summary"`.

### 2.4 Scope summary card

**Purpose** — Communicates constraints: one screen, read-only database notes, no mutation/search/auth controls.

**Anatomy** — `[strong metric] [caption]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-bg`, `--color-border`, `--radius-md` | Inside intro meta strip |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `16px` | `--text-xl`, `--text-sm` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Light background, one-pixel border | `--color-bg`, `--color-border` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Content remains static | None |
| Error | Content remains static | None |
| Empty | Content remains static | None |

**Accessibility** — Text only. Keep metric meaningful when read without layout.

### 2.5 Notes board

**Purpose** — Primary read-only container for fetched notes and all fetch states.

**Anatomy** — `[board head: title + subtitle + status pill] [viewport with state panel] [read-only scope note]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--radius-lg`, `--shadow-lg` | Main notes area |
| Mobile | `--radius-mobile-lg` | Width `<= 560px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `min-height: 560px` | `clamp(20px, 3vw, 28px)` | `--text-3xl`, `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Loaded note list visible | `--color-surface` |
| Hover | Child note cards lift | `--shadow-md`, `--duration-base` |
| Focus (keyboard) | Board not focusable; child controls use focus ring | `--color-focus` |
| Active / pressed | No board active state | None |
| Disabled | Not disabled | None |
| Loading | Skeleton list visible; status says `Loading` | `--color-border-skeleton`, `--duration-shimmer` |
| Error | Error panel visible; status says `Error` | `--color-danger-bg`, `--color-danger-strong` |
| Empty | Empty panel visible; status says `Empty` | `--color-surface-raised`, `--color-primary` |

**Accessibility** — Board is a labelled section. Viewport uses `aria-live="polite"` for fetch state changes. Error panel uses `role="alert"`. Empty panel uses `role="status"`.

### 2.6 Status pill

**Purpose** — Shows current fetch state label in compact form. Do not use for editable filters.

**Anatomy** — `[animated dot] [label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-bg-soft`, `--color-primary-strong`, `--radius-full` | Board status |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `8px 11px` | `--text-sm` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Primary dot pulses beside state label | `--color-primary`, `--duration-pulse` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Label becomes `Loading`; dot keeps pulse | `--color-primary` |
| Error | Label becomes `Error`; approved design keeps primary dot | `--color-primary` |
| Empty | Label becomes `Empty`; approved design keeps primary dot | `--color-primary` |

**Accessibility** — Decorative dot is `aria-hidden`. Label updates with board live region context.

### 2.7 Note card

**Purpose** — Displays one saved note. No edit, delete, tag-management, or selection behavior.

**Anatomy** — `[top row: title + time] [body] [tag row?]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--color-surface-raised`, `--color-border`, `--radius-md` | Saved note in loaded list |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `18px` | `--text-card-title`, `--text-base`, `--text-xs` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Subtle vertical white-to-raised gradient, one-pixel border | `--color-surface`, `--color-surface-raised`, `--color-border` |
| Hover | Moves up `2px`, border becomes primary alpha, medium shadow | `--shadow-md`, `--duration-base`, `--color-primary` |
| Focus (keyboard) | Not focusable in approved read-only design | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Replaced by skeleton card | `--color-border-skeleton` |
| Error | Replaced by error panel | `--color-danger-bg` |
| Empty | Replaced by empty panel | `--color-surface-raised` |

**Accessibility** — Note list is `ul` with `aria-label="Saved notes"`. Use semantic `time datetime`. Cards contain no interactive controls.

### 2.8 Tag

**Purpose** — Shows note metadata labels. Do not use as filters or buttons.

**Anatomy** — `[text label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-tag-bg`, `--color-text-tag`, `--radius-full` | Note metadata label |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `5px 8px` | `--text-xs` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Pale background pill, muted label | `--color-tag-bg`, `--color-text-tag` |
| Hover | No hover state; tag is not interactive | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Hidden with note card during skeleton state | None |
| Error | Hidden with note card during error state | None |
| Empty | Hidden with note card during empty state | None |

**Accessibility** — Text label only. Do not add `button` role unless real filtering exists.

### 2.9 Skeleton loading card

**Purpose** — Shows loading feedback while saved notes request is pending.

**Anatomy** — `[card] [title line] [middle line] [short line] [shimmer overlay]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--color-border`, `--color-border-skeleton`, `--radius-md` | Notes loading state |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `18px` | None |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Static skeleton card would show pale lines | `--color-border-skeleton` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Shimmer moves horizontally every `1.35s`; three cards stacked with `14px` gap | `--duration-shimmer`, `--easing` |
| Error | Replaced by error panel | `--color-danger-bg` |
| Empty | Replaced by empty panel | `--color-surface-raised` |

**Accessibility** — Wrapper has `aria-label="Loading saved notes"`. Skeleton shapes are decorative. Do not expose fake note text.

### 2.10 Empty state

**Purpose** — Confirms database returned zero notes. Do not show add-note action because creation is out of scope.

**Anatomy** — `[decorative SVG] [heading] [message]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface-raised`, `--color-border`, `--radius-lg` | Empty notes response |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `min-height: 360px` | `28px` | `--text-xl`, `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Dashed border, centered message | `--color-surface-raised`, `--color-border` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Replaced by skeleton cards | `--color-border-skeleton` |
| Error | Replaced by error panel | `--color-danger-bg` |
| Empty | Visible with heading `No saved notes yet` and explanatory copy | `--color-primary`, `--color-success` |

**Accessibility** — Container uses `role="status"`. SVG is `aria-hidden`. Message must explain absence without suggesting unavailable actions.

### 2.11 Error state

**Purpose** — Tells user saved notes could not load and gives non-destructive recovery guidance.

**Anatomy** — `[decorative SVG] [heading] [message]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-danger-bg`, `--color-danger`, `--color-danger-strong`, `--radius-lg` | Notes fetch failure |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `min-height: 360px` | `28px` | `--text-xl`, `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Red-tinted panel, dashed border, centered message | `--color-danger-bg`, `--color-danger` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Replaced by skeleton cards | `--color-border-skeleton` |
| Error | Visible with heading `Notes could not load` and recovery copy | `--color-danger-strong`, `--color-danger-text` |
| Empty | Replaced by empty panel | `--color-surface-raised` |

**Accessibility** — Container uses `role="alert"`. SVG is `aria-hidden`. Message avoids exposing internal errors.

### 2.12 Read-only note

**Purpose** — Reinforces excluded capabilities so users do not search for controls that intentionally do not exist.

**Anatomy** — `[scope sentence]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-bg`, `--color-border`, `--color-text-muted`, `--radius-md` | Under notes viewport |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `14px 16px` | `--text-note` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Light card with muted text | `--color-bg`, `--color-text-muted` |
| Hover | No hover state | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Remains visible while notes load | None |
| Error | Remains visible when notes fail | None |
| Empty | Remains visible when no notes exist | None |

**Accessibility** — Plain paragraph. Keep wording explicit: no add, edit, delete, search, or sign-in controls.

### 2.13 State guide

**Purpose** — Design preview documentation section explaining loading, empty, and error state behavior. Real product may omit this section if not user-facing.

**Anatomy** — `[h2] [description] [three guide cards]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-surface`, `--color-border`, `--radius-lg`, `--shadow-guide` | Approved preview page |
| Mobile | `--radius-mobile-lg` | Width `<= 560px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | Content-driven | `28px` | `--text-2xl`, `--text-note` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Translucent white panel with three cards | `--color-surface`, `--color-border` |
| Hover | No panel hover; guide cards are static | None |
| Focus (keyboard) | Not focusable | None |
| Active / pressed | No active state | None |
| Disabled | Not disabled | None |
| Loading | Explains loading behavior | `--color-text-muted` |
| Error | Explains error behavior | `--color-text-muted` |
| Empty | Explains empty behavior | `--color-text-muted` |

**Accessibility** — Section labelled by `h2`. Guide cards use text, not interactive controls.

### 2.14 Preview state button

**Purpose** — Switches approved mockup between loaded, loading, empty, and error states. Design-preview only; must not appear in real product build.

**Anatomy** — `[button label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-text-muted`, `--radius-full`, `--duration-fast` | In preview nav only |
| Active | `--color-primary`, `--color-primary-text`, `--shadow-sm` | Current preview state |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Desktop | Content-driven | `9px 13px` | `--text-base` |
| Mobile | Full nav width | `9px 13px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Transparent pill with muted text | `--color-text-muted` |
| Hover | Pale primary background, primary-strong text, lifts `-1px` | `--color-bg-soft`, `--color-primary-strong`, `--duration-fast` |
| Focus (keyboard) | 3px primary focus ring, 3px offset | `--color-focus` |
| Active / pressed | Primary background, white text, soft shadow | `--color-primary`, `--color-primary-text`, `--shadow-sm` |
| Disabled | No disabled state in approved design | None |
| Loading | Active when Loading preview selected | `--color-primary`, `--color-primary-text` |
| Error | Active when Error preview selected | `--color-primary`, `--color-primary-text` |
| Empty | Active when Empty preview selected | `--color-primary`, `--color-primary-text` |

**Accessibility** — Buttons use `aria-pressed`. Group has `aria-label="Preview note data states"`. Remove from production UI per project memory.

### 2.15 Mobile menu button

**Purpose** — Opens and closes collapsed navigation under `900px`.

**Anatomy** — `[Menu label]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Mobile | `--color-bg-soft`, `--color-primary-strong`, `--radius-full` | Width `<= 900px` |
| Desktop hidden | None | Width `> 900px` |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Mobile | Content-driven | `9px 12px` | `--text-base` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | Pale primary pill, primary-strong text | `--color-bg-soft`, `--color-primary-strong` |
| Hover | No separate hover rule in approved design | None |
| Focus (keyboard) | 3px primary focus ring, 3px offset | `--color-focus` |
| Active / pressed | Nav opens; `aria-expanded` becomes `true` | `--color-bg-soft` |
| Disabled | No disabled state | None |
| Loading | No change | None |
| Error | No change | None |
| Empty | No change | None |

**Accessibility** — Button has `aria-expanded` and `aria-controls="site-nav"`. Escape closes nav and restores focus to button.

## 3. Content and formatting

- Voice and tone: calm, plain, scope-explicit, utilitarian.
- Date format: abbreviated English month, day, four-digit year, e.g. `Aug 12, 2026`; machine value uses ISO date in `datetime`, e.g. `2026-08-12`.
- Time format: none used.
- Number format: plain decimal numerals for counts, e.g. `1`, `0`.
- Currency format: none used.
- Capitalization: sentence case for headings and messages; short labels may use title case only when proper noun or data label requires it.
- Empty-state wording pattern: state what data source returned, then confirm there is nothing to display. Example: `Database returned zero notes. Page stays quiet and confirms there is nothing to display.`
- Error-message wording pattern: state user-facing failure, then give safe recovery action without internal detail. Example: `Something went wrong while fetching saved notes. Refresh page or try again later.`
- Scope wording: repeat excluded capabilities exactly when needed: `no add, edit, delete, search, or sign-in controls`.

## 4. Known deviations

Places where approved design does not follow its own rules or anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Body background, logo, note cards | Uses decorative gradients, including page background, logo, and card fill | Stakeholder approved calm neutral-blue visual; gradients are already in approved mockup | Keep unless stakeholder requests flatter visual direction |
| Spacing system | Many values are not on simple 4px scale: `5px`, `6px`, `7px`, `9px`, `10px`, `11px`, `13px`, `14px`, `18px`, `22px`, `34px`, `54px`, `56px` | Approved CSS uses precise spacing; doc records exact source values | If UI expands, normalize only after design revision |
| Borders | Default `#DCE3EF` on white has `1.3:1`, below 3:1 UI contrast target | Borders are decorative separators, not only affordance | Increase border contrast only through approved design change |
| Focus ring | Uses `rgba(37, 99, 235, .38)`, not solid hex token | Approved CSS uses alpha focus ring | Keep visible ring; if tokenizing in code, derive alpha from `--color-focus` |
| Preview controls | Header contains Loading/Empty/Error buttons | They are design-preview controls only per project memory | Remove from real product build |
| Emoji iconography | No emoji used | Approved design avoids this AI default | No action |
| Filler copy | Uses realistic note samples and real empty/error copy | Approved design avoids this AI default | No action |
| Missing states | Loading, empty, and error states exist | Approved design avoids this AI default | No action |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-08-13 | Initial design system extracted from approved `index.html` | This PR |
