import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";
import "./page.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Stories I’ve told and communities I’ve grown.",
};

export default function Page() {
  return <WorkView />;
}
