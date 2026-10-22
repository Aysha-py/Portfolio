import type { Metadata } from "next";
import CaseCommunityForAfricaView from "@/components/views/CaseCommunityForAfricaView";
import "./page.css";

export const metadata: Metadata = {
  title: "Community for Africa case study",
  description: "Turning community learning into practical resources: events, content and the Skills Audit Sheet for Community for Africa’s community managers and creatives.",
};

export default function Page() {
  return <CaseCommunityForAfricaView />;
}
