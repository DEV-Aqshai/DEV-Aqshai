import type { Metadata } from "next";
import { Terminal } from "@/components/terminal";

export const metadata: Metadata = { title: "Terminal", description: "Explore the AqshaiDev portfolio through an interactive terminal." };

export default function TerminalPage() {
  return <div className="page-shell"><section className="page-hero"><span className="eyebrow">INTERACTIVE / TERMINAL</span><h1>Less clicking.<br/><em>More commands.</em></h1><p>A small terminal-inspired way to navigate the portfolio. Type help to see what you can do.</p></section><Terminal/></div>;
}
