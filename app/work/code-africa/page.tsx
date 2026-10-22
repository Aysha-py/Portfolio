import type { Metadata } from "next";
import CaseCodeAfricaView from "@/components/views/CaseCodeAfricaView";
import "./page.css";

export const metadata: Metadata = {
  title: "Code Africa Conference case study",
  description: "Connecting conference promotion with community participation: campaign content, community outreach and volunteer coordination for Code Africa Conference.",
};

export default function Page() {
  return <CaseCodeAfricaView />;
}
