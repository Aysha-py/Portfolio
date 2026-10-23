import type { Metadata } from "next";
import CaseWeb3LadiesView from "@/components/views/CaseWeb3LadiesView";
import "./page.css";

export const metadata: Metadata = {
  title: "Web3Ladies case study",
  description: "Building the systems and programmes that help a community grow: community operations, educational programmes and ecosystem partnerships for Web3Ladies.",
};

export default function Page() {
  return <CaseWeb3LadiesView />;
}
