import type { Metadata } from "next";
import CaseCodeAfricaView from "@/components/views/CaseCodeAfricaView";
import "./page.css";

export const metadata: Metadata = {
  title: "Code Africa Conference case study",
  description: "Building the communications and community operations behind a pan-African Web3 event: event marketing, ambassador and volunteer coordination, and stakeholder communications for Code Africa Conference.",
};

export default function Page() {
  return <CaseCodeAfricaView />;
}
