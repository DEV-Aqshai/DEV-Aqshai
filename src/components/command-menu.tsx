"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, Command, Github, House, Layers3, Mail, Moon, Sun, UserRound, X } from "lucide-react";
import { useTheme } from "next-themes";

const actions = [
  { label: "Home", hint: "Go to top", icon: House, href: "#home" },
  { label: "About", hint: "My story", icon: UserRound, href: "#about" },
  { label: "Projects", hint: "Selected work", icon: Layers3, href: "/projects" },
  { label: "Terminal", hint: "Explore by command line", icon: Command, href: "/terminal" },
  { label: "Skills", hint: "Technical toolkit", icon: Command, href: "#skills" },
  { label: "Contact", hint: "Get in touch", icon: Mail, href: "#contact" },
  { label: "GitHub", hint: "Open profile", icon: Github, href: "https://github.com/DEV-Aqshai", external: true }
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()) || a.hint.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(v => !v); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button className="command-trigger" onClick={() => setOpen(true)} aria-label="Open command menu">
        <Command size={14} /><span>Quick find</span><kbd>⌘ K</kbd>
      </button>
      {open && (
        <div className="command-backdrop" onMouseDown={() => setOpen(false)}>
          <section className="command-panel" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={e => e.stopPropagation()}>
            <div className="command-input-wrap">
              <Command size={18} />
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Where do you want to go?" />
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close command menu"><X size={17}/></button>
            </div>
            <p className="command-label">NAVIGATION</p>
            <div className="command-results">
              {filtered.map(item => {
                const Icon = item.icon;
                return <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setOpen(false)} className="command-item">
                  <span className="command-item-icon"><Icon size={16}/></span><span><strong>{item.label}</strong><small>{item.hint}</small></span>{item.external && <ArrowUpRight size={15}/>}
                </a>;
              })}
              <button className="command-item" onClick={() => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); setOpen(false); }}>
                <span className="command-item-icon">{resolvedTheme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</span><span><strong>Toggle appearance</strong><small>Switch light / dark mode</small></span>
              </button>
              <button className="command-item" onClick={() => { setOpen(false); window.dispatchEvent(new Event("aqshai:build")); }}>
                <span className="command-item-icon"><Bot size={16}/></span><span><strong>Replay build intro</strong><small>Watch the agents rebuild the page</small></span>
              </button>
              {filtered.length === 0 && <p className="empty-state">No matching commands.</p>}
            </div>
            <div className="command-footer"><span>Navigate with links</span><span>ESC to close</span></div>
          </section>
        </div>
      )}
    </>
  );
}
