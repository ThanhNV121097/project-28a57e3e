export type NotesResponse = {
  notes: Array<{
    id: string;
    title: string;
    body: string;
    saved_at: string | null;
  }>;
  next_cursor: string | null;
  has_more: boolean;
};

export type NotesErrorResponse = {
  error: {
    code: "BAD_REQUEST" | "VALIDATION_FAILED" | "RATE_LIMITED" | "INTERNAL" | "UNAVAILABLE";
    message: string;
    details: string[];
    request_id: string;
  };
};

export const savedNotesResponse: NotesResponse = {
  notes: [
    {
      id: "4b931778-6b83-4d22-9a1b-8aa6b9f4e73d",
      title: "Release notes",
      body: "Ship read-only notes board with loading, empty, and error states before backend schema work starts.",
      saved_at: "2026-08-12T00:00:00.000Z",
    },
    {
      id: "9c7f89a1-22d8-4b6c-bcb0-6c8123f73db7",
      title: "Board scope",
      body: "Visitors can read saved notes only. Add, edit, delete, search, and auth controls stay out of this screen.",
      saved_at: "2026-08-11T15:30:00.000Z",
    },
    {
      id: "1df8d77e-596e-421a-a76b-1c06a4e17a08",
      title: "Fallback plan",
      body: "If saved notes cannot load, show safe recovery guidance without exposing database or stack details.",
      saved_at: null,
    },
  ],
  next_cursor: null,
  has_more: false,
};

export async function getSavedNotes(): Promise<NotesResponse> {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  return savedNotesResponse;
}
