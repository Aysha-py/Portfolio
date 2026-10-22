import type { Metadata } from "next";
import TalkShelfView from "@/components/views/TalkShelfView";
import "./page.css";

export const metadata: Metadata = {
  title: "Talk shelf",
  description: "Talks, panels and X Spaces since 2023, plus a media kit for event organisers.",
};

export default function Page() {
  return <TalkShelfView />;
}
