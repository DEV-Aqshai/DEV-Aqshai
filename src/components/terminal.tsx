"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";

type Line = { kind: "input" | "output" | "link"; text: string; href?: string };
const help = "Commands: help, about, projects, skills, contact, github, clear";
const responses: Record<string, string> = {
  help, about: "Started with Scratch at 11. I build software to automate repetitive tasks and solve practical problems.",
  projects: "Featured work: Smart Simple AI Board, Echoes, Exam Rescue. Visit /projects for the full gallery.",
  skills: "Strong: HTML, CSS, Python, Git, SQL, APIs, Figma. Comfortable: JavaScript, Kotlin, React, Android. Learning: TypeScript, Java, C.",
  contact: "Reach me at someone17082@gmail.com",
  github: "Opening github.com/DEV-Aqshai"
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "output", text: "AQSHAIDEV PORTFOLIO SHELL v1.0 — type 'help' to get started." }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function run(e: FormEvent) {
    e.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) return;
    setHistory(old => [...old, command]);
    if (command === "clear") { setLines([]); setValue(""); return; }
    const answer = responses[command] ?? `Command not found: ${command}. Type 'help' for available commands.`;
    setLines(old => [...old, { kind: "input", text: value }, { kind: "output", text: answer }, ...(command === "github" ? [{ kind: "link" as const, text: "Open GitHub profile", href: "https://github.com/DEV-Aqshai" }] : [])]);
    if (command === "github") window.open("https://github.com/DEV-Aqshai", "_blank", "noopener,noreferrer");
    setValue("");
  }

  return <div className="terminal-full" onClick={() => inputRef.current?.focus()}>
    <div className="terminal-bar"><span/><span/><span/><small><TerminalIcon size={12}/> aqshai@portfolio — interactive shell</small></div>
    <div className="terminal-output" aria-live="polite">
      {lines.map((line, i) => line.kind === "link" ? <a key={i} href={line.href} target="_blank" rel="noreferrer" className="terminal-link">{line.text} <ArrowUpRight size={13}/></a> : <p key={i} className={line.kind === "input" ? "terminal-command" : "terminal-response"}>{line.kind === "input" ? <><b>aqshai@portfolio:~$</b> {line.text}</> : line.text}</p>)}
    </div>
    <form onSubmit={run} className="terminal-form"><label htmlFor="terminal-input">aqshai@portfolio:~$</label><input id="terminal-input" ref={inputRef} value={value} onChange={e => setValue(e.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command"/><button type="submit">RUN ↵</button></form>
    <div className="terminal-foot"><span>LOCAL PORTFOLIO TERMINAL</span><span>{history.length} COMMANDS RUN</span></div>
  </div>;
}
