import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "About", description: "The story and engineering philosophy behind AqshaiDev." };

export default function AboutPage() {
  return <div className="page-shell">
    <section className="page-hero"><span className="eyebrow">ABOUT / THE BUILDER</span><h1>A curious mind.<br/><em>A builder's instinct.</em></h1><p>From Scratch experiments to building useful software — a journey driven by curiosity and practical problem-solving.</p></section>
    <div className="about-page-grid">
      <Reveal className="portrait-frame portrait-large"><Image src="/images/aqshai-portrait.png" alt="AqshaiDev portrait" fill sizes="(max-width: 800px) 90vw, 40vw" className="portrait-image"/></Reveal>
      <div className="story-copy"><Reveal><span className="eyebrow">01 / WHERE IT STARTED</span><h2>It started with <em>Scratch.</em></h2><p>I started programming at 11 on a platform called Scratch. It introduced me to the idea that a few instructions could turn a thought into something interactive. That feeling stuck.</p></Reveal><Reveal><span className="eyebrow">02 / WHAT I ENJOY</span><h2>Make the tedious <em>disappear.</em></h2><p>I love using programming to finish annoying tasks and time-consuming work. Automation is more than a technical trick to me: it's a way to give people time back and make everyday workflows less frustrating.</p></Reveal><Reveal><span className="eyebrow">03 / WHERE I'M GOING</span><h2>Versatility with <em>depth.</em></h2><p>My ambition is to become a versatile 10X engineer: someone who can understand a problem, work across disciplines, learn new tools quickly and deliver thoughtful solutions. I'm still learning, and I want the work to show that progression honestly.</p></Reveal></div>
    </div>
    <section className="about-manifesto"><span className="eyebrow">A WORKING PRINCIPLE</span><p>If a task can be automated, <em>why do it manually?</em></p><a href="https://github.com/DEV-Aqshai" target="_blank" rel="noreferrer" className="text-link">Explore my code on GitHub <ArrowUpRight size={14}/></a></section>
  </div>;
}
