import type { Metadata } from "next";
import { skillGroups } from "@/lib/skills";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Skills", description: "Technologies and tools AqshaiDev works with and is learning." };

export default function SkillsPage() {
  return <div className="page-shell">
    <section className="page-hero"><span className="eyebrow">SKILLS / TECHNICAL TOOLKIT</span><h1>Learn widely.<br/><em>Build thoughtfully.</em></h1><p>A snapshot of the tools I use, the areas where I'm comfortable and the technologies I'm actively learning.</p></section>
    <div className="skill-groups-page">{skillGroups.map((group, i) => <Reveal key={group.title} delay={i * 0.08}><section className="skill-group-page"><span className="eyebrow">{group.title}</span>{group.skills.map(skill => <div className="skill-detail" key={skill.name}><div className="skill-detail-top"><strong>{skill.name}</strong><span>{skill.level}</span></div><div className="skill-track"><i style={{ width: `${skill.value}%` }}/></div></div>)}</section></Reveal>)}</div>
    <p className="skills-disclaimer">Proficiency labels are self-assessments, not formal certifications or standardized test scores.</p>
  </div>;
}
