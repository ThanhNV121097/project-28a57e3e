"use client";

import { useEffect, useMemo, useState } from "react";
import { getSavedNotes, type NotesResponse } from "../lib/mock/display-saved-notes";
import styles from "./DisplaySavedNotes.module.css";

type BoardState = "loading" | "loaded" | "empty" | "error";

export function DisplaySavedNotes() {
  const [state, setState] = useState<BoardState>("loading");
  const [response, setResponse] = useState<NotesResponse | null>(null);

  useEffect(() => {
    let active = true;
    const mode = new URLSearchParams(window.location.search).get("notes_state");

    async function loadNotes() {
      setState("loading");

      if (mode === "error") {
        await wait();
        if (active) setState("error");
        return;
      }

      try {
        const data = mode === "empty" ? { notes: [], next_cursor: null, has_more: false } : await getSavedNotes();
        if (!active) return;
        setResponse(data);
        setState(data.notes.length ? "loaded" : "empty");
      } catch {
        if (active) setState("error");
      }
    }

    loadNotes();
    return () => {
      active = false;
    };
  }, []);

  const notes = response?.notes ?? [];
  const status = state === "loaded" ? "Loaded" : state[0].toUpperCase() + state.slice(1);

  return (
    <section className={styles.page} aria-labelledby="note-board-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}><span aria-hidden="true" /> Read-only database notes</p>
        <h1 id="note-board-title" className={styles.title}>Note Board</h1>
        <p className={styles.lede}>Saved notes from the database appear here in one calm, read-only list.</p>
        <dl className={styles.summary} aria-label="Scope summary">
          <div><dt>One screen</dt><dd>Notes list only</dd></div>
          <div><dt>Read-only</dt><dd>No note changes</dd></div>
          <div><dt>Public</dt><dd>No sign-in gate</dd></div>
        </dl>
      </div>

      <section className={styles.board} aria-labelledby="saved-notes-heading">
        <div className={styles.boardHead}>
          <div>
            <h2 id="saved-notes-heading">Saved notes</h2>
            <p>Existing notes are displayed newest first when data is available.</p>
          </div>
          <span className={styles.status}><span aria-hidden="true" />{status}</span>
        </div>

        <div className={styles.viewport} aria-live="polite">
          {state === "loading" && <LoadingState />}
          {state === "loaded" && <NotesList notes={notes} />}
          {state === "empty" && <EmptyState />}
          {state === "error" && <ErrorState />}
        </div>

        <p className={styles.readOnly}>This page only displays saved notes. It does not include adding, editing, deleting, searching, or authentication.</p>
      </section>
    </section>
  );
}

function NotesList({ notes }: { notes: NonNullable<NotesResponse["notes"]> }) {
  return (
    <ul className={styles.list} aria-label="Saved notes">
      {notes.map((note) => (
        <li className={styles.card} key={note.id}>
          <div className={styles.cardTop}>
            <h3>{note.title}</h3>
            {note.saved_at ? <NoteTime value={note.saved_at} /> : <span className={styles.timeText}>Date unavailable</span>}
          </div>
          <p>{note.body}</p>
        </li>
      ))}
    </ul>
  );
}

function NoteTime({ value }: { value: string }) {
  const label = useMemo(() => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value)), [value]);
  return <time dateTime={value}>{label}</time>;
}

function LoadingState() {
  return (
    <div className={styles.loading} aria-label="Loading saved notes">
      {[0, 1, 2].map((item) => <div className={styles.skeleton} aria-hidden="true" key={item}><span /><span /><span /></div>)}
    </div>
  );
}

function EmptyState() {
  return <div className={styles.empty} role="status"><StateMark /> <h3>No saved notes yet</h3><p>Database returned zero saved notes for this board.</p></div>;
}

function ErrorState() {
  return <div className={styles.error} role="alert"><StateMark /> <h3>Notes could not load</h3><p>Something went wrong while fetching saved notes. Refresh page or try again later.</p></div>;
}

function StateMark() {
  return <svg aria-hidden="true" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" /><path d="M21 34h22M24 26h16M28 42h8" /></svg>;
}

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, 700));
}
