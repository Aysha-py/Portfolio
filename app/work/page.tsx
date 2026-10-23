import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";
import "./page.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Work shaped by people, stories, and ideas. Selected work across fintech, Web3, developer education and open source.",
};

export default function Page() {
  return <WorkView />;
}
