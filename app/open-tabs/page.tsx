import type { Metadata } from "next";
import OpenTabsView from "@/components/views/OpenTabsView";
import "./page.css";

export const metadata: Metadata = {
  title: "Open tabs",
  description: "Content creation, personal essays, open source and volunteering: the tabs I keep open.",
};

export default function Page() {
  return <OpenTabsView />;
}
