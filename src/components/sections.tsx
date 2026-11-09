import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Sparkles, Workflow } from "lucide-react";
import { HeroWordmark } from "@/components/hero-wordmark";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PlaylistEmbed } from "@/components/playlist-embed";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";

export function HomeSections() {
  return <>
    <section className="hero section-shell" id="home">
      <div className="hero-grid"/>
      <div className="hero-copy">
        <Reveal delay={0.08}><p className="hero-overline">SOFTWARE ENGINEER / DEVELOPER <span>— SRI LANKA</span></p></Reveal>
        <Reveal delay={0.14}><h1>CODE THE<br/><span>FUTURE WORLD.</span></h1></Reveal>
        <Reveal delay={0.2}><p className="hero-tagline">One line at a time <span>:3</span></p></Reveal>
        <Reveal delay={0.26}><div className="hero-actions"><Link className="button-primary" href="/projects">Explore projects <ArrowUpRight size={16}/></Link><Link className="button-quiet" href="/about">A little about me <ArrowRight size={15}/></Link></div></Reveal>
      </div>
      <Reveal delay={0.25} className="hero-object">
        <div className="hero-portrait">
          <Image src="/images/aqshai-portrait.png" alt="Portrait of AqshaiDev" fill priority sizes="(max-width: 700px) 80vw, 38vw" className="hero-portrait-image"/>
        </div>
        <HeroWordmark/>
      </Reveal>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span><span>01 — 05</span><span>DESIGNING · BUILDING · ITERATING</span></div>
    </section>

    <section className="intro-band section-shell">
      <Reveal><p className="intro-statement">I like turning <em>annoying, repetitive problems</em> into small, elegant pieces of software.</p></Reveal>
      <div className="intro-side"><span className="eyebrow">THE SHORT VERSION</span><p>Curious since 11. Builder by habit. Always learning what the next problem can teach me.</p><Link href="/about" className="text-link">More about my approach <ArrowUpRight size={14}/></Link></div>
    </section>

    <section className="section-shell section-block" id="projects">
      <Reveal><SectionHeading index="01" eyebrow="SELECTED WORK" title="Things I've" accent="built."/></Reveal>
      <div className="projects-grid">{projects.slice(0, 3).map((project, i) => <Reveal key={project.name} delay={i * 0.08}><ProjectCard project={project}/></Reveal>)}</div>
      <div className="section-end"><span>MORE EXPERIMENTS & UTILITIES</span><Link href="/projects" className="text-link">Explore all projects <ArrowUpRight size={14}/></Link></div>
    </section>

    <section className="about-preview section-shell section-block" id="about">
      <Reveal><SectionHeading index="02" eyebrow="A BIT ABOUT ME" title="Curiosity turned" accent="into code."/></Reveal>
      <div className="about-preview-grid">
        <Reveal className="portrait-frame"><Image src="/images/aqshai-portrait.png" alt="Portrait of AqshaiDev wearing a black hoodie with blue studio lighting" fill sizes="(max-width: 800px) 90vw, 38vw" className="portrait-image"/></Reveal>
        <Reveal className="about-preview-copy" delay={0.1}>
          <span className="eyebrow">STARTED AT AGE 11 · SCRATCH</span>
          <h3>I build because<br/><em>problems are invitations.</em></h3>
          <p>I started programming at 11 on Scratch. What hooked me was the ability to make an idea do something. Today, I enjoy using software to automate tedious tasks, simplify workflows and build useful things.</p>
          <p>I'm working toward becoming a versatile engineer: someone who can move between disciplines, understand the problem, and ship thoughtful solutions.</p>
          <Link href="/about" className="text-link">Read my story <ArrowUpRight size={14}/></Link>
        </Reveal>
      </div>
    </section>

    <section className="principles section-shell">
      <div className="principle"><Code2/><span>01 / BUILD</span><h3>Make it useful.</h3><p>Start with the problem, then shape the smallest tool that makes a real difference.</p></div>
      <div className="principle"><Workflow/><span>02 / AUTOMATE</span><h3>Remove the friction.</h3><p>Turn repetitive work into reliable systems and better workflows.</p></div>
      <div className="principle"><Sparkles/><span>03 / EXPLORE</span><h3>Stay curious.</h3><p>Learn across the stack, experiment often, and keep improving the craft.</p></div>
    </section>

    <section className="section-shell section-block skills-preview" id="skills">
      <Reveal><SectionHeading index="03" eyebrow="TECHNICAL TOOLKIT" title="Tools for the" accent="work."/></Reveal>
      <div className="skill-preview-grid">
        {skillGroups.map((group, i) => <Reveal key={group.title} delay={i * 0.08}><div className="skill-group"><span className="eyebrow">{group.title}</span>{group.skills.slice(0, 5).map(skill => <div className="skill-line" key={skill.name}><span>{skill.name}</span><small>{skill.level}</small></div>)}</div></Reveal>)}
      </div>
      <div className="section-end"><span>HONESTLY REPRESENTED · ALWAYS EVOLVING</span><Link href="/skills" className="text-link">Full skill set <ArrowUpRight size={14}/></Link></div>
    </section>

    <section className="terminal-teaser section-shell">
      <div className="terminal-copy"><span className="eyebrow">A DIFFERENT WAY TO EXPLORE</span><h2>Prefer the<br/><em>command line?</em></h2><p>Open the interactive terminal and navigate the portfolio like a developer.</p></div>
      <div className="terminal-window"><div className="terminal-bar"><span/><span/><span/><small>aqshai@portfolio ~</small></div><div className="terminal-body"><p><b>aqshai@portfolio</b>:~$ help</p><p className="terminal-muted">Available commands:</p><p><i>about</i> · <i>projects</i> · <i>skills</i> · <i>contact</i></p><p><b>aqshai@portfolio</b>:~$ <span className="terminal-caret"/></p><Link href="/terminal" className="text-link terminal-open-link">Open interactive terminal <ArrowUpRight size={13}/></Link></div></div>
    </section>

    <section className="section-shell section-block playlist-section" id="listening">
      <Reveal><SectionHeading index="04" eyebrow="OFF THE CLOCK" title="What's on" accent="repeat." /></Reveal>
      <Reveal delay={0.08}><PlaylistEmbed /></Reveal>
      <div className="section-end"><span>CURATED, NOT ALGORITHMIC</span><span>122 TRACKS · 6H 37M</span></div>
    </section>

    <section className="contact-cta section-shell" id="contact">
      <Reveal><span className="eyebrow">HAVE A PROBLEM WORTH SOLVING?</span><h2>Let's make<br/><em>something useful.</em></h2><Link className="button-primary" href="/contact">Start a conversation <ArrowUpRight size={16}/></Link></Reveal>
    </section>
  </>;
}
