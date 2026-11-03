export function SectionHeading({ index, eyebrow, title, accent }: { index: string; eyebrow: string; title: string; accent?: string }) {
  return <div className="section-heading">
    <div className="section-kicker"><span>{index}</span><span>{eyebrow}</span></div>
    <h2>{title} {accent && <em>{accent}</em>}</h2>
  </div>;
}
