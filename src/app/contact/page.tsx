import type { Metadata } from "next";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact", description: "Contact AqshaiDev about projects, collaboration and ideas." };

export default function ContactPage() {
  return <div className="page-shell contact-page">
    <section className="page-hero"><span className="eyebrow">CONTACT / START A CONVERSATION</span><h1>Good ideas<br/><em>need builders.</em></h1><p>Have a project, a problem to solve or an interesting idea? Send a message and tell me what you're thinking.</p></section>
    <Reveal className="contact-panel">
      <div><span className="eyebrow">EMAIL</span><h2>Let's talk about<br/><em>what's next.</em></h2><p>For project enquiries, collaboration or just a thoughtful conversation.</p><a className="button-primary" href="mailto:someone17082@gmail.com?subject=Hello%20AqshaiDev">Email Aqshai <ArrowUpRight size={16}/></a></div>
      <div className="contact-links"><a href="mailto:someone17082@gmail.com"><span><Mail size={17}/></span><div><small>WRITE TO ME</small><strong>someone17082@gmail.com</strong></div><ArrowUpRight size={15}/></a><a href="https://github.com/DEV-Aqshai" target="_blank" rel="noreferrer"><span><Github size={17}/></span><div><small>CODE & PROJECTS</small><strong>github.com/DEV-Aqshai</strong></div><ArrowUpRight size={15}/></a></div>
    </Reveal>
    <p className="contact-footnote">One inbox. One clear way to get in touch.</p>
  </div>;
}
