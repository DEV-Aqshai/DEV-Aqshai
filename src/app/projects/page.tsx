import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Projects", description: "Selected software projects and experiments by AqshaiDev." };

export default function ProjectsPage() {
  return <div className="page-shell">
    <section className="page-hero"><span className="eyebrow">PROJECT ARCHIVE / 2026</span><h1>Built to solve.<br/><em>Made to explore.</em></h1><p>A selection of applications, experiments and practical tools. Each project represents a problem explored and something learned.</p></section>
    <div className="project-archive">{projects.map((project, i) => <Reveal key={project.name} delay={(i % 3) * 0.06}><ProjectCard project={project} compact/></Reveal>)}</div>
    <div className="archive-note"><span className="eyebrow">MORE IN PROGRESS</span><p>Not every experiment makes it into the spotlight. Follow the GitHub profile for more builds and iterations.</p><a className="button-primary" href="https://github.com/DEV-Aqshai" target="_blank" rel="noreferrer">Explore GitHub ↗</a></div>
  </div>;
}
