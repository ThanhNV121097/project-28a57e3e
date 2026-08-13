# Test Cases — Display saved notes

Function: Display saved notes  
Module: `notes`  
Requirement trace: `GENERAL-001`  
Risk level: Medium. This is read-only, but it is the product's only capability and must handle loading, empty, error, accessibility, responsive, and strict no-management UI scope.

## Automated test cases

**Scenario**: Loading state appears while saved notes request is pending
**Given**: The saved notes request has started and has not resolved
**When**: A visitor opens “Note Board”
**Then**: The notes board shows skeleton loading cards, status label `Loading`, an accessible label such as `Loading saved notes`, no empty state, no error state, and no fake note text exposed to assistive technology
Trace: Story AC-1, AC-2; SRS AC-1; GENERAL-001 behaviour 1, 2

**Scenario**: One saved note displays stored fields
**Given**: The database contains one saved note with title `Release notes`, body `Ship read-only notes board`, and saved timestamp `2026-08-12T00:00:00.000Z`
**When**: Saved notes load succeeds
**Then**: The notes board renders semantic `ul` with `aria-label="Saved notes"`, one list item, visible title `Release notes`, visible body `Ship read-only notes board`, and semantic `time` element with `datetime="2026-08-12T00:00:00.000Z"` and visible date like `Aug 12, 2026`
Trace: Story AC-3, AC-4; SRS AC-2; GENERAL-001 behaviour 3, 4

**Scenario**: Multiple saved notes all render in read-only list
**Given**: The database contains three saved notes titled `Alpha`, `Beta`, and `Gamma`
**When**: Saved notes load succeeds
**Then**: The notes board renders semantic `ul` with `aria-label="Saved notes"`, exactly three list items, and visible titles `Alpha`, `Beta`, and `Gamma`
Trace: Story AC-3; SRS AC-3; GENERAL-001 behaviour 3

**Scenario**: Metadata tags render only when returned
**Given**: One returned note has tags `planning` and `release`, and another returned note has no tags
**When**: Saved notes load succeeds
**Then**: The tagged note shows non-interactive text pills `planning` and `release`; the note without tags shows no empty tag row
Trace: Story AC-5

**Scenario**: Loaded note cards contain no management or auth controls
**Given**: Saved notes load succeeds with one or more notes
**When**: A visitor reviews the loaded notes board
**Then**: No buttons, links, inputs, menus, checkboxes, or controls for add, edit, delete, search, filter, sign-in, or selection are visible or focusable inside loaded note cards
Trace: Story AC-6; SRS AC-6; GENERAL-001 behaviour 5

**Scenario**: Empty state appears when database returns zero notes
**Given**: The database contains zero saved notes
**When**: Saved notes load succeeds
**Then**: The notes board shows empty state with `role="status"`, heading `No saved notes yet`, copy confirming zero saved notes without suggesting adding a note, and no note cards
Trace: Story AC-7; SRS AC-4; GENERAL-001 failure, boundary, permission behaviour: Empty data

**Scenario**: Error state appears when saved notes request fails
**Given**: The saved notes request fails because the API or database cannot load notes
**When**: A visitor opens “Note Board”
**Then**: The notes board shows error state with `role="alert"`, heading `Notes could not load`, recovery copy such as `Something went wrong while fetching saved notes. Refresh page or try again later.`, no blank screen, and no note cards or partial note list
Trace: Story AC-8; SRS AC-5; GENERAL-001 failure behaviour: Upstream failure

**Scenario**: Error state hides internal failure details
**Given**: The saved notes request fails with internal details containing database error text, SQL, stack trace, environment values, credential-bearing URL, or raw backend exception text
**When**: Error state is shown
**Then**: None of those internal details are visible in the page; only the safe user-facing error heading and recovery copy are visible
Trace: Story AC-9; GENERAL-001 failure behaviour: Upstream failure

**Scenario**: Board state changes use required announcement semantics
**Given**: The page can enter loading, loaded, empty, and error states
**When**: The notes board changes state after a request resolves or fails
**Then**: Non-error board state changes are announced through a polite live region, and the error panel uses `role="alert"`
Trace: Story AC-10

**Scenario**: Page remains usable at 320px viewport width
**Given**: Viewport width is `320px`
**When**: A visitor opens the page and reviews loading, loaded, empty, and error states
**Then**: Content remains readable, controls are not clipped, and the page has no horizontal scroll
Trace: Story AC-11; SRS non-functional Responsive; GENERAL-001 failure behaviour: Long content

**Scenario**: Keyboard navigation skips non-interactive content
**Given**: The page is in loading, loaded, empty, or error state
**When**: A visitor navigates by keyboard using Tab and Shift+Tab
**Then**: Focus does not land on non-interactive note cards, tags, skeletons, empty art, or error art
Trace: Story AC-12; SRS non-functional Accessibility

**Scenario**: Backend API is read-only for this story
**Given**: Backend routes for this story are available
**When**: API routes are inspected or exercised
**Then**: This story adds only a read endpoint for notes and adds no create, update, delete, search, auth, or mutation endpoint
Trace: Story AC-13; SRS AC-6; GENERAL-001 behaviour 5

**Scenario**: Missing API base URL uses same user-facing error state
**Given**: The frontend API base URL is missing or unusable
**When**: A visitor opens “Note Board”
**Then**: The notes board shows the same user-facing error state with `role="alert"`, heading `Notes could not load`, safe recovery copy, and no note cards
Trace: Story AC-14; SRS AC-5

**Scenario**: Unsigned visitor can view same read-only notes list
**Given**: A visitor is not signed in and the database contains saved notes
**When**: The visitor opens “Note Board” and saved notes load succeeds
**Then**: The same read-only notes list is visible and no sign-in requirement appears
Trace: SRS Actors; SRS AC-6; GENERAL-001 failure, boundary, permission behaviour: Not permitted

**Scenario**: Preview controls are absent from real product build
**Given**: Any saved notes state is visible in the real product build
**When**: A visitor reviews the header and page controls
**Then**: Preview controls labelled `Loading`, `Empty`, and `Error` are not visible
Trace: SRS AC-7; Product memory `product.preview_controls`

## Manual test cases

None. Required states, accessibility semantics, keyboard focus, API scope, and responsive layout are observable through automated browser, accessibility, and API tests.
