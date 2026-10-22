import type { Metadata } from "next";
import "@fontsource-variable/figtree";
import "@fontsource/ibm-plex-mono/500.css";

const description =
  "Aishat Muhammed is a content marketer and community manager who helps brands make complex ideas easier to understand through audience-focused content, research, and storytelling.";

export const metadata: Metadata = {
  title: {
    default: "Aishat Muhammed · Content marketer",
    template: "%s · Aishat Muhammed",
  },
  description,
  openGraph: {
    title: "Aishat Muhammed · Content marketer",
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
