import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Workshop on Introduction to Astronomy & Astrophysics",
  description: "IIT Tirupati & IISER Tirupati | In Collaboration with IUCAA",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer is global, so we can put it here or in page. Putting it here ensures it's always at bottom. */}
        <Footer contactEmail="aa_workshop_2026@iittp.ac.in" />
      </body>
    </html>
  );
}
