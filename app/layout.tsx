// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Videohub",
  description: "Génère des clips courts (Veo/FAL) – prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="border-b">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold">Videohub</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/generate" className="hover:underline">Generate</a>
              <a href="https://github.com/camgraphe/videohub" target="_blank" className="text-neutral-500 hover:underline">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        <footer className="border-t mt-10">
          <div className="mx-auto max-w-5xl px-6 h-12 flex items-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Videohub — prototype
          </div>
        </footer>
      </body>
    </html>
  );
}
