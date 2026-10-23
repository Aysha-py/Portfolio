import type { Metadata } from "next";
import CaseInvisibleGardenView from "@/components/views/CaseInvisibleGardenView";
import "./page.css";

export const metadata: Metadata = {
  title: "Invisible Garden case study",
  description: "Building visibility before, during, and beyond the event: content marketing and event communications for Invisible Garden’s Ethereum developer residency in Buenos Aires.",
};

export default function Page() {
  return <CaseInvisibleGardenView />;
}
