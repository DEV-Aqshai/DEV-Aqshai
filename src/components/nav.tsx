"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";

const links = [{ label: "About", href: "/about" }, { label: "Projects", href: "/projects" }, { label: "Skills", href: "/skills" }, { label: "Contact", href: "/contact" }];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>AQSHAI<span>DEV</span><i>.</i></Link>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/v2" className="nav-cta nav-v2-link" onClick={() => setOpen(false)}>V2 <ArrowUpRight size={14}/></Link>
          <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={14}/></Link>
        </nav>
        <div className="nav-actions">
          <CommandMenu />
          <ThemeToggle />
          <button className="icon-button mobile-menu" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </div>
    </header>
  );
}
