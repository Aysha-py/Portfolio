import type { Metadata } from "next";
import CaseCommunityForAfricaView from "@/components/views/CaseCommunityForAfricaView";
import "./page.css";

export const metadata: Metadata = {
  title: "Community for Africa case study",
  description: "Helping community builders learn, connect, and grow: moderation, educational resources, events and content for Community for Africa.",
};

export default function Page() {
  return <CaseCommunityForAfricaView />;
}
