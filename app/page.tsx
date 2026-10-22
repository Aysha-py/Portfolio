import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";
import "./page.css";

export const metadata: Metadata = {
  description: "Helping brands earn attention through content that audiences care about.",
};

export default function Page() {
  return <HomeView />;
}
