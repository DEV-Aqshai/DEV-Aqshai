import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";

export const metadata: Metadata = {
  title: { default: "AqshaiDev — Software Engineer / Developer", template: "%s — AqshaiDev" },
  description: "AqshaiDev — software developer building useful digital experiences, Android applications, AI experiments and practical tools.",
  openGraph: {
    title: "AqshaiDev — Code the future world one line at a time",
    description: "Software Engineer / Developer. Building useful things with code.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Providers><Cursor/><Nav/><main>{children}</main><Footer/></Providers></body></html>;
}
