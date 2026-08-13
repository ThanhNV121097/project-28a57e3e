# Test Cases — Display saved notes

Module: `general`
Requirement: GENERAL-001
Function: Display saved notes
Risk level: Low. Single read-only public page; main risks are incorrect state rendering and accidentally exposing out-of-scope controls.

## Automated coverage

**Scenario**: Loading state appears while saved notes request is pending  
**Given**: Saved notes request is pending  
**When**: Visitor opens “Note Board”  
**Then**: Loading state is visible and empty state text is not visible.  
**Traces to**: AC-1, GENERAL-001 behaviour 1-2, slow load

**Scenario**: Single saved note displays all stored fields  
**Given**: Database contains one saved note with title `Release plan`, body `Ship smallest useful read-only board.`, and saved timestamp `2026-08-13T10:30:00Z`  
**When**: Saved notes load succeeds  
**Then**: Read-only list contains one note card showing `Release plan`, `Ship smallest useful read-only board.`, and a browser-locale formatted saved timestamp for `2026-08-13T10:30:00Z`.  
**Traces to**: AC-2, GENERAL-001 behaviour 3-4

**Scenario**: Multiple saved notes display in read-only list  
**Given**: Database contains three saved notes titled `First note`, `Second note`, and `Third note`  
**When**: Saved notes load succeeds  
**Then**: Read-only list contains visible note cards for `First note`, `Second note`, and `Third note`.  
**Traces to**: AC-3, GENERAL-001 behaviour 3

**Scenario**: Empty state appears when database has zero notes  
**Given**: Database contains zero saved notes  
**When**: Saved notes load succeeds  
**Then**: Empty state is visible and no note cards are visible.  
**Traces to**: AC-4, empty data

**Scenario**: Error state appears when saved notes load fails  
**Given**: Saved notes load fails because backend API or database cannot return notes  
**When**: Visitor opens “Note Board”  
**Then**: Error state is visible, no note cards are visible, and page is not blank.  
**Traces to**: AC-5, upstream failure

**Scenario**: Management and auth controls are absent in every state  
**Given**: Loading, populated list, empty, or error state is visible  
**When**: Visitor reviews the screen  
**Then**: No control or affordance labelled or acting as add, edit, delete, search, filter, or sign-in is visible.  
**Traces to**: AC-6, GENERAL-001 behaviour 5, write attempt, not permitted

**Scenario**: Design preview state controls are absent from real product header  
**Given**: Loading, populated list, empty, or error state is visible in the real product build  
**When**: Visitor reviews the header  
**Then**: Header does not show preview controls labelled `Loading`, `Empty`, or `Error`.  
**Traces to**: AC-7, out-of-scope design-preview controls

**Scenario**: Visitor without sign-in can view saved notes  
**Given**: Visitor is not signed in and database contains one saved note titled `Public note`  
**When**: Visitor opens “Note Board” and saved notes load succeeds  
**Then**: `Public note` is visible in the read-only list and no sign-in requirement appears.  
**Traces to**: GENERAL-001 actor permission, not permitted

**Scenario**: Saved note without timestamp still displays content  
**Given**: Database contains one saved note with title `Untimed note`, body `Timestamp was not stored.`, and no saved timestamp  
**When**: Saved notes load succeeds  
**Then**: Note card shows `Untimed note` and `Timestamp was not stored.`, and timestamp area is omitted or shown as unavailable without breaking the card.  
**Traces to**: GENERAL-001 data rule, missing optional field

**Scenario**: Long note body remains readable without horizontal page scroll  
**Given**: Database contains one saved note with title `Long note` and body text longer than one viewport width  
**When**: Visitor opens “Note Board” at 320px viewport width and saved notes load succeeds  
**Then**: `Long note` body remains readable inside the page layout and the page has no horizontal scroll.  
**Traces to**: GENERAL-001 data rule, long content, responsive NFR

## Manual coverage

No manual-only cases. Listed results are observable through automated UI checks by controlling API responses and viewport width.
