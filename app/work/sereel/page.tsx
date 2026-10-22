import type { Metadata } from "next";
import CaseSereelView from "@/components/views/CaseSereelView";
import "./page.css";

export const metadata: Metadata = {
  title: "Sereel case study",
  description: "Making complex ideas clearer: educational and thought-leadership content for Sereel, a compliance-first tokenization platform for institutional capital markets.",
};

export default function Page() {
  return <CaseSereelView />;
}
