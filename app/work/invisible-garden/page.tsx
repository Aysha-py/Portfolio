import type { Metadata } from "next";
import CaseInvisibleGardenView from "@/components/views/CaseInvisibleGardenView";
import "./page.css";

export const metadata: Metadata = {
  title: "Invisible Garden case study",
  description: "Turning a developer residency into a story people could follow: social media copy, content coverage, video and outreach for Invisible Garden’s Ethereum residency in Buenos Aires.",
};

export default function Page() {
  return <CaseInvisibleGardenView />;
}
