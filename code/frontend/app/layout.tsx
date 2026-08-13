import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note Board",
  description: "Read-only saved notes list.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
