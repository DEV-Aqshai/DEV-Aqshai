import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? { title: project.name, description: project.description } : { title: "Project not found" };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <div className="page-shell project-detail-page">
    <section className="page-hero"><Link href="/projects" className="text-link"><ArrowLeft size={14}/> Back to projects</Link><div className="detail-kicker"><span>{project.number} / {project.category}</span><span>{project.status}</span></div><h1>{project.name}<br/><em>Project notes.</em></h1><p>{project.description}</p><div className="tag-list detail-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><a className="button-primary" href={project.href} target="_blank" rel="noreferrer">View source on GitHub <Github size={15}/><ArrowUpRight size={13}/></a></section>
    <section className="detail-content"><Reveal><span className="eyebrow">OVERVIEW / WHAT I EXPLORED</span><h2>Built around a <em>real problem.</em></h2><p>{project.description}</p></Reveal><div className="detail-points">{project.details.map((detail, i) => <Reveal key={detail} delay={i * .06}><article><span>0{i + 1}</span><p>{detail}</p></article></Reveal>)}</div></section>
    <div className="detail-disclaimer">These notes are a portfolio-level overview. See the repository for the current implementation and source history.</div>
  </div>;
}
