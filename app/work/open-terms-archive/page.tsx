import type { Metadata } from "next";
import CaseOpenTermsArchiveView from "@/components/views/CaseOpenTermsArchiveView";
import "./page.css";

export const metadata: Metadata = {
  title: "Open Terms Archive case study",
  description: "Making it easier for contributors to find their way in: community migration, onboarding, documentation and community calls for Open Terms Archive.",
};

export default function Page() {
  return <CaseOpenTermsArchiveView />;
}
