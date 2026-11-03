import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div><span className="eyebrow">END OF TRANSMISSION</span><h2>Have an idea?<br/><em>Let's make it real.</em></h2></div>
      <a className="round-link" href="mailto:someone17082@gmail.com" aria-label="Email Aqshai"><ArrowUpRight size={25}/></a>
    </div>
    <div className="footer-bottom">
      <Link href="/" className="brand">AQSHAI<span>DEV</span><i>.</i></Link>
      <span>© {new Date().getFullYear()} AqshaiDev. Built with intent.</span>
      <a href="https://github.com/DEV-Aqshai" target="_blank" rel="noreferrer" className="footer-social"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a>
    </div>
  </footer>;
}
