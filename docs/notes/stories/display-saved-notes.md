# Story — Display saved notes

## User story

As a visitor, I want to view saved notes already stored in the database, so that I can read existing note content without changing anything.

## In scope

- Show the single Note Board page.
- Fetch saved notes from the backend API backed by PostgreSQL.
- Show a loading state while the notes request is pending.
- Show a read-only list when one or more notes exist.
- Show an empty state when the database returns zero notes.
- Show an error state when the notes request fails.
- Keep UI calm, neutral-blue, and consistent with `design/design-system.md`.
- Keep page responsive down to `320px` width.
- Keep accessibility semantics for loading, empty, error, and note list states.

## Out of scope

- Adding notes.
- Editing notes.
- Deleting notes.
- Searching notes.
- Filtering or sorting controls.
- Authentication or user-specific note visibility.
- Pagination or infinite scroll.
- Tag management.
- Design-preview controls labelled Loading, Empty, or Error.
- Any write API endpoint.

## UI scope

This story touches one screen: the Note Board page.

Use approved design components from `design/design-system.md`:

- App shell with sticky topbar, intro panel, notes board, and read-only scope note.
- Notes board as primary section for fetched notes and all fetch states.
- Status pill that reflects `Loading`, `Loaded`, `Empty`, or `Error` state.
- Skeleton loading cards while request is pending.
- Note cards for loaded notes, with title, saved date, body, and optional metadata tags if returned by API.
- Empty state with heading `No saved notes yet` and copy that confirms database returned zero notes.
- Error state with heading `Notes could not load` and safe recovery copy, no internal error details.

Production UI must not include preview state buttons from approved mockup. State guide may be omitted from production page because it exists for design preview documentation, not core user task.

## Acceptance criteria

1. When the Note Board page first requests notes, the notes board shows skeleton loading cards and status label `Loading`.
2. While loading, no fake note text is exposed to assistive technology; loading wrapper has an accessible label such as `Loading saved notes`.
3. When the notes request succeeds with one or more notes, the notes board renders a semantic `ul` with `aria-label="Saved notes"` and one list item per returned note.
4. Each rendered note shows its title, body, and saved date using a semantic `time` element with ISO `datetime` value and visible format like `Aug 12, 2026`.
5. If note metadata tags are returned, tags render as non-interactive text pills; if no tags are returned, no empty tag row appears.
6. Loaded note cards contain no buttons, links, inputs, menus, checkboxes, or controls for add, edit, delete, search, filter, sign-in, or selection.
7. When the notes request succeeds with zero notes, the notes board shows empty state with `role="status"`, heading `No saved notes yet`, and copy that does not suggest adding a note.
8. When the notes request fails, the notes board shows error state with `role="alert"`, heading `Notes could not load`, and recovery copy such as `Something went wrong while fetching saved notes. Refresh page or try again later.`
9. Error state does not expose database errors, stack traces, SQL, environment values, URLs containing credentials, or raw backend exception text.
10. Board state changes are announced through a polite live region, except the error panel which uses alert semantics.
11. Page remains usable and visually coherent at `320px` viewport width.
12. Keyboard navigation does not land on non-interactive note cards, tags, skeletons, empty art, or error art.
13. Backend API used by this story reads notes only; no create, update, delete, search, auth, or mutation endpoint is added for this story.
14. If the API base URL is missing or request fails, UI enters the same user-facing error state.

## Dependencies

- Existing fullstack scaffold: Next.js frontend, Go backend, PostgreSQL database.
- `NEXT_PUBLIC_API_URL` configured for browser calls to backend.
- Notes table and read endpoint to be designed by architecture step for this story.
- Database must contain saved notes for loaded-data verification; empty database verifies empty state.
- No external accounts, credentials, or stakeholder decisions required.
