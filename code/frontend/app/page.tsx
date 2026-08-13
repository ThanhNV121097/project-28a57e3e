import { DisplaySavedNotes } from "../components/DisplaySavedNotes";

export default function Page() {
  return (
    <main className="app-shell">
      {/* Story components mount here. */}
      <DisplaySavedNotes />
    </main>
  );
}
