import type { Metadata } from "next";
import CaseOneDevView from "@/components/views/CaseOneDevView";
import "./page.css";

export const metadata: Metadata = {
  title: "One Dev case study",
  description: "Turning community interest into participation: community management, content and programme marketing for One Dev, a tech education community of 8,000+ members.",
};

export default function Page() {
  return <CaseOneDevView />;
}
