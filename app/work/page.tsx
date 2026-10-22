import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";
import "./page.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Content that earns attention. Communities that keep people coming back. Selected work across fintech, Web3, developer education and open source.",
};

export default function Page() {
  return <WorkView />;
}
