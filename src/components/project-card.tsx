import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <article className={`project-card project-${project.accent} ${compact ? "compact" : ""}`}>
    <div className="project-card-top"><span>{project.number} / {project.category}</span><span className="project-status"><i/> {project.status}</span></div>
    <div className="project-art" aria-hidden="true">
      <div className="art-grid"/>
      <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
      <span className="art-monogram">{project.name === "Smart Simple AI Board" ? "AI" : project.name === "TimeTableMaker" ? "TM" : project.name.slice(0, 2).toUpperCase()}</span>
      <span className="art-index">{project.number}</span>
    </div>
    <div className="project-card-content">
      <div><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><p>{project.description}</p></div>
      <div className="project-meta"><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><Link className="project-link" href={`/projects/${project.slug}`} aria-label={`Read ${project.name} case study`}><span className="case-study-label">CASE STUDY</span><ArrowUpRight size={14}/></Link><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}><Github size={17}/><ArrowUpRight size={13}/></a></div>
    </div>
  </article>;
}
