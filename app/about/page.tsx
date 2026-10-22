import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";
import "./page.css";

export const metadata: Metadata = {
  title: "About",
  description: "I’m still becoming. My story, some favourite moments and selected writings.",
};

export default function Page() {
  return <AboutView />;
}
