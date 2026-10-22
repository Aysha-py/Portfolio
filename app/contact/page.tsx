import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";
import "./page.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Content marketing, content creation, speaking and collaborations. Get in touch.",
};

export default function Page() {
  return <ContactView />;
}
