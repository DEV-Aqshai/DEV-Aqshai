"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const SEEN_KEY = "aqshai:build-intro:v2";

const AGENTS = [
  { id: "a01", label: "layout", color: "#4169f5", ink: "#f4f8ff" },
  { id: "a02", label: "type", color: "#ffb648", ink: "#140e03" },
  { id: "a03", label: "paint", color: "#3ddc97", ink: "#04140c" },
  { id: "a04", label: "qa", color: "#c084fc", ink: "#170529" }
];

type Kind = "nav" | "line" | "headline" | "buttons" | "media" | "canvas" | "strip";

type Target = { key: string; sel: string; kind: Kind; agent: number; log: string };
type Box = Target & { el: HTMLElement; x: number; y: number; w: number; h: number };

/** Real elements of the home page, in the order the agents build them. */
const TARGETS: Target[] = [
  { key: "nav", sel: ".site-header", kind: "nav", agent: 0, log: "agent-01 › scaffolding the nav" },
  { key: "overline", sel: ".hero-overline", kind: "line", agent: 1, log: "agent-02 › loading the type scale" },
  { key: "headline", sel: ".hero h1", kind: "headline", agent: 1, log: "agent-02 › setting the headline" },
  { key: "tagline", sel: ".hero-tagline", kind: "line", agent: 1, log: "agent-02 › kerning the tagline" },
  { key: "actions", sel: ".hero-actions", kind: "buttons", agent: 2, log: "agent-03 › wiring the actions" },
  { key: "portrait", sel: ".hero-portrait", kind: "media", agent: 2, log: "agent-03 › compositing the portrait" },
  { key: "wordmark", sel: ".hero-object .wordmark-wrap", kind: "canvas", agent: 3, log: "agent-04 › rendering the wordmark" },
  { key: "cue", sel: ".hero-bottom", kind: "strip", agent: 3, log: "agent-04 › final polish pass" }
];

function aim(b: Box) {
  switch (b.kind) {
    case "nav": return { x: b.x + b.w * 0.68, y: b.y + b.h * 0.52 };
    case "headline": return { x: b.x + Math.min(b.w * 0.22, 220), y: b.y + b.h * 0.3 };
    case "media": return { x: b.x + b.w * 0.56, y: b.y + b.h * 0.4 };
    case "buttons": return { x: b.x + b.w * 0.1, y: b.y + b.h * 0.55 };
    case "canvas": return { x: b.x + b.w * 0.52, y: b.y + b.h * 0.55 };
    default: return { x: b.x + Math.min(b.w * 0.3, 190), y: b.y + b.h * 0.5 };
  }
}

function SkeletonInner({ kind }: { kind: Kind }) {
  switch (kind) {
    case "nav":
      return <><span className="s-brand" /><span className="s-links"><i /><i /><i /><i /></span></>;
    case "headline":
      return <><span className="s-1" /><span className="s-2" /></>;
    case "buttons":
      return <><span className="s-1 s-solid" /><span className="s-2 s-ghost" /></>;
    case "media":
      return <><span className="s-cross-a" /><span className="s-cross-b" /><span className="s-label">IMAGE</span></>;
    case "canvas":
      return <><span className="s-label">WORDMARK</span><span className="s-bar" /></>;
    case "strip":
      return <><span className="s-t" /><span className="s-t" /><span className="s-t" /></>;
    default:
      return <span className="s-1" />;
  }
}

export function BuildSequence() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [built, setBuilt] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [cursors, setCursors] = useState<{ x: number; y: number }[]>([]);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);

  const timers = useRef<number[]>([]);
  const boxesRef = useRef<Box[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const end = useCallback(() => {
    clearTimers();
    document.documentElement.classList.remove("bp-building");
    boxesRef.current.forEach(b => { delete b.el.dataset.bpState; });
    boxesRef.current = [];
    setRunning(false);
    setBoxes([]);
    setBuilt([]);
    setActiveKey(null);
    setCursors([]);
  }, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    window.scrollTo(0, 0);

    const found: Box[] = [];
    TARGETS.forEach(t => {
      const el = document.querySelector<HTMLElement>(t.sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width < 12 || r.height < 6) return;
      if (r.top > window.innerHeight - 8 || r.bottom < 12) return;
      found.push({ ...t, el, x: r.left, y: r.top, w: r.width, h: r.height });
    });
    if (found.length < 4) return;

    boxesRef.current = found;
    document.documentElement.classList.add("bp-building");
    found.forEach(b => { b.el.dataset.bpState = "pending"; });

    setBoxes(found);
    setBuilt([]);
    setActiveKey(null);
    setLogs(["4 agents online · reading the layout"]);
    setCursors([
      { x: -70, y: window.innerHeight * 0.42 },
      { x: window.innerWidth + 70, y: window.innerHeight * 0.26 },
      { x: window.innerWidth * 0.5, y: window.innerHeight + 90 },
      { x: window.innerWidth + 50, y: window.innerHeight * 0.74 }
    ]);
    setRunning(true);

    // ?slow=1 stretches the sequence, handy for screen-recording the build.
    const slow = new URLSearchParams(window.location.search).get("slow") === "1" ? 3.2 : 1;

    let at = 400 * slow;
    found.forEach(b => {
      timers.current.push(window.setTimeout(() => {
        const p = aim(b);
        setActiveKey(b.key);
        setTick(t => t + 1);
        setCursors(prev => prev.map((c, i) => (i === b.agent ? p : c)));
        setLogs(prev => [...prev, b.log].slice(-3));
        timers.current.push(window.setTimeout(() => {
          b.el.dataset.bpState = "built";
          setBuilt(prev => (prev.includes(b.key) ? prev : [...prev, b.key]));
        }, 170 * slow));
      }, at));
      at += 285 * slow;
    });

    timers.current.push(window.setTimeout(() => {
      setLogs(prev => [...prev, "build complete · shipping to production"].slice(-3));
      setCursors(prev => prev.map((_, i) => ({ x: window.innerWidth + 90 + i * 24, y: window.innerHeight * (0.18 + i * 0.2) })));
    }, at + 120 * slow));

    timers.current.push(window.setTimeout(() => end(), at + 660 * slow));
  }, [clearTimers, end]);

  // First-visit gating.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forced = new URLSearchParams(window.location.search).get("build") === "1";
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch { /* storage blocked */ }
    if (reduce) return;
    if (seen && !forced) return;
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* storage blocked */ }

    let cancelled = false;
    const start = () => { if (!cancelled) run(); };
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => window.setTimeout(start, 60));
      window.setTimeout(start, 700); // safety net if the font promise stalls
    } else {
      window.setTimeout(start, 120);
    }
    return () => { cancelled = true; clearTimers(); };
  }, [run, clearTimers]);

  // Replay hook for the command menu.
  useEffect(() => {
    const replay = () => { end(); window.setTimeout(run, 60); };
    window.addEventListener("aqshai:build", replay);
    return () => window.removeEventListener("aqshai:build", replay);
  }, [run, end]);

  // Skip on click or key.
  useEffect(() => {
    if (!running) return;
    const skip = () => end();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip(); };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [running, end]);

  // Hold the page still while it is being assembled.
  useEffect(() => {
    if (!running) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [running]);

  if (!running) return null;

  const pct = boxes.length ? Math.round((built.length / boxes.length) * 100) : 0;

  return (
    <>
      <div className="bp-blueprint" aria-hidden="true" />
      <div className="bp-layer" aria-hidden="true">
        {boxes.map(b => built.includes(b.key) ? null : (
          <div
            key={b.key}
            className={`bp-skel bp-skel-${b.kind} ${activeKey === b.key ? "is-active" : ""}`}
            style={{ left: b.x, top: b.y, width: b.w, height: b.h, "--tint": AGENTS[b.agent].color } as CSSProperties}
          >
            <SkeletonInner kind={b.kind} />
          </div>
        ))}

        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            className="bp-cursor"
            initial={false}
            animate={{ left: cursors[i]?.x ?? -80, top: cursors[i]?.y ?? -80 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: agent.color }}
          >
            <svg className="bp-cursor-arrow" width="18" height="24" viewBox="0 0 17 23" fill="none">
              <path d="M1.2 1.2V17.6L5.7 13.4L8.6 20.7L11.9 19.4L9 12.2L15 11.8L1.2 1.2Z" fill="currentColor" stroke="#05070d" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            <span className="bp-cursor-tag" style={{ background: agent.color, color: agent.ink }}>
              {agent.id} <b>{agent.label}</b>
            </span>
            {activeKey && AGENTS.findIndex(a => a.id === agent.id) === (boxes.find(b => b.key === activeKey)?.agent ?? -1) && (
              <span key={tick} className="bp-ripple" style={{ borderColor: agent.color }} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="bp-hud" aria-hidden="true">
        <div className="bp-log">
          {logs.map((line, i) => (
            <p key={`${line}-${i}`} className={i === logs.length - 1 ? "is-latest" : ""}>{line}</p>
          ))}
        </div>
        <span className="bp-skip">skip ›</span>
      </div>
      <div className="bp-progress" style={{ width: `${pct}%` }} aria-hidden="true" />
    </>
  );
}
