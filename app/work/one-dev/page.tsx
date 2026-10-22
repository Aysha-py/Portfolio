import type { Metadata } from "next";
import CaseOneDevView from "@/components/views/CaseOneDevView";
import "./page.css";

export const metadata: Metadata = {
  title: "One Dev case study",
  description: "Connecting developers with the knowledge and people they need to grow: community management, bootcamps and content for One Dev, a Web3 EdTech community of 8,000+ members.",
};

export default function Page() {
  return <CaseOneDevView />;
}
