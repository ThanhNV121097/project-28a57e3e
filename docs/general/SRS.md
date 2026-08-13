# SRS — General

Module: `general`
Last updated: 2026-08-13
Design: [View Design](http://localhost:8080/design/28a57e3e-6e6f-4ec7-aac6-6e9d233ce977)
Design system: `design/design-system.md`

## 1. Purpose

This module defines “Note Board”, one read-only page for people to view notes already stored in the database. It exists so the product can reliably show saved notes without any note management, search, or authentication scope.

If this module fails, the product cannot serve its only capability: display the saved notes list with clear loading, empty, and error states.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Visitor | Any person opening the page, signed in or not | View the read-only notes list and its loading, empty, and error states |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- Display saved notes

**Out of scope** — deliberately not built for this product:

- Adding notes — product scope is read-only display.
- Editing notes — product scope is read-only display.
- Deleting notes — product scope is read-only display.
- Searching notes — product scope is one unfiltered list.
- Authentication — every visitor has the same read-only access.
- Design-preview controls — header buttons labelled Loading, Empty, and Error are preview controls only and must not appear in the real product build.

## 4. Functional requirements

### 4.1 Display saved notes

**Requirement GENERAL-001 — Show saved notes list**

*As a* Visitor, *I want to* view saved notes, *so that* I can read notes already stored for “Note Board”.

Behaviour:

1. When the Visitor opens the page, the product starts loading saved notes.
2. While saved notes are loading, the product shows a loading state instead of an empty or failed list.
3. When one or more notes are available, the product shows each note in a read-only list.
4. Each displayed note shows its title, body, and saved timestamp when those values exist in stored data.
5. The product does not show controls or affordances to add, edit, delete, search, filter, or sign in.
6. The product keeps the Visitor on the same screen for loading, success, empty, and error states.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/general/test-cases/display-saved-notes.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Saved notes request is pending | Visitor opens “Note Board” | Loading state is visible and no empty state is visible |
| AC-2 | Database contains one saved note with title, body, and saved timestamp | Saved notes load succeeds | The note title, body, and saved timestamp are visible in the list |
| AC-3 | Database contains multiple saved notes | Saved notes load succeeds | All returned notes are visible in the read-only list |
| AC-4 | Database contains zero saved notes | Saved notes load succeeds | Empty state is visible and no note cards are visible |
| AC-5 | Saved notes load fails | Visitor opens “Note Board” | Error state is visible and no note cards are visible |
| AC-6 | Any saved notes state is visible | Visitor reviews the screen | No add, edit, delete, search, filter, or sign-in control is visible |
| AC-7 | Any saved notes state is visible in the real product build | Visitor reviews the header | Preview controls labelled Loading, Empty, and Error are not visible |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Empty data | Saved notes query returns zero notes | Empty state appears with no note cards and no management controls |
| Upstream failure | Saved notes cannot be loaded from the database or API | Error state appears with no blank screen and no partial note list |
| Slow load | Saved notes request has not completed | Loading state remains visible until success or failure |
| Missing optional field | A stored note lacks a saved timestamp | Note remains visible; timestamp area is omitted or shown as unavailable without breaking the card |
| Long content | A stored note has long body text | Note remains readable inside the page layout without horizontal page scroll |
| Not permitted | Visitor is not signed in | Same read-only list access is allowed; no sign-in requirement appears |
| Write attempt | Visitor looks for add, edit, delete, or search actions | No such action is present in the product UI |

**Data touched** — fields this function reads and writes, in product terms. Physical schema belongs to `docs/architecture/erd.md`.

| Field | Type | Required | Rule |
|---|---|---|---|
| Note title | text | yes | Display as stored; no editing in this module |
| Note body | text | yes | Display as stored; long content must remain readable |
| Saved timestamp | date/time | no | Display when present; no editing in this module |

## 5. Screens

## Design

Approved design preview: [View Design](http://localhost:8080/design/28a57e3e-6e6f-4ec7-aac6-6e9d233ce977).

Main screen: Notes — one read-only page showing saved notes with reachable loading, empty, and error states.

Color palette: primary blue `#2563EB`, primary dark `#1E40AF`, background `#F8FAFC`, surface `#FFFFFF`, accent green `#10B981`.

The real product must use the design’s calm utilitarian direction and must omit preview-only state controls from shipped UI.

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Notes | Notes page | GENERAL-001 | loading, populated list, empty, error |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Initial notes state renders within 2 seconds after page load on a typical broadband connection, excluding database/API outage time |
| Accessibility | Notes page is keyboard reachable, has visible focus for interactive elements if any exist, and text contrast is at least 4.5:1 |
| Responsive | Notes page works from 320px viewport width and up with no horizontal page scroll |
| Localisation | Product copy is in English; dates use browser locale formatting |
| Privacy | Module displays stored note content only; it does not collect visitor identity or authentication data |

## 7. Dependencies and assumptions

- **Depends on:** saved notes data source, for reading already stored notes.
- **Depends on:** approved visual design and design system, for page layout, colors, typography, and states.
- **Assumption:** stored notes already exist outside this module. If false, this module still shows the empty state and no note creation workflow is added.
- **Assumption:** every visitor may read the same notes. If false, authentication and authorization become new scope and must be planned separately.

| Open question | Proposed default | Who decides |
|---|---|---|
| None | Use approved scope: one public read-only list | Stakeholder |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Display saved notes | GENERAL-001 | `test-cases/display-saved-notes.md` |
