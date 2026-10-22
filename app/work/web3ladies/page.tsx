import type { Metadata } from "next";
import CaseWeb3LadiesView from "@/components/views/CaseWeb3LadiesView";
import "./page.css";

export const metadata: Metadata = {
  title: "Web3Ladies case study",
  description: "Turning community needs into opportunities to learn and grow: community leadership, programmes and partnerships for Web3Ladies, a community of 15,000+ members.",
};

export default function Page() {
  return <CaseWeb3LadiesView />;
}
