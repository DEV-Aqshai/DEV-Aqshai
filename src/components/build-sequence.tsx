"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const SEEN_KEY = "aqshai:build-intro:v3";

const AGENTS = [
  { id: "a01", label: "layout", color: "#4169f5", ink: "#f4f8ff" },
  { id: "a02", label: "type", color: "#ffb648", ink: "#140e03" },
  { id: "a03", label: "paint", color: "#3ddc97", ink: "#04140c" },
  { id: "a04", label: "qa", color: "#c084fc", ink: "#170529" }
];

type Kind = "nav" | "line" | "headline" | "buttons" | "media" | "canvas" | "strip" | "card" | "block";

type Target = { key: string; sel: string; kind: Kind; agent: number; log: string };
type Item = Target & {
  el: HTMLElement;
  left: number; top: number; w: number; h: number;
  aimX: number; aimY: number;
  trigger: number;
};

/** Real page elements, top to bottom. Order is resolved at measure time. */
const TARGETS: Target[] = [
  { key: "nav", sel: ".site-header", kind: "nav", agent: 0, log: "agent-01 › scaffolding the nav" },
  { key: "overline", sel: ".hero-overline", kind: "line", agent: 1, log: "agent-02 › loading the type scale" },
  { key: "headline", sel: ".hero h1", kind: "headline", agent: 1, log: "agent-02 › setting the headline" },
  { key: "tagline", sel: ".hero-tagline", kind: "line", agent: 1, log: "agent-02 › kerning the tagline" },
  { key: "actions", sel: ".hero-actions", kind: "buttons", agent: 2, log: "agent-03 › wiring the actions" },
  { key: "portrait", sel: ".hero-portrait", kind: "media", agent: 2, log: "agent-03 › compositing the portrait" },
  { key: "wordmark", sel: ".hero-object .wordmark-wrap", kind: "canvas", agent: 3, log: "agent-04 › rendering the wordmark" },
  { key: "intro", sel: ".intro-statement", kind: "headline", agent: 1, log: "agent-02 › typesetting the intro" },
  { key: "intro-side", sel: ".intro-side", kind: "card", agent: 0, log: "agent-01 › placing the short version" },
  { key: "projects-heading", sel: "#projects .section-heading", kind: "block", agent: 1, log: "agent-02 › setting the work heading" },
  { key: "project-1", sel: ".projects-grid > :nth-child(1)", kind: "card", agent: 0, log: "agent-01 › mounting project 01" },
  { key: "project-2", sel: ".projects-grid > :nth-child(2)", kind: "card", agent: 2, log: "agent-03 › mounting project 02" },
  { key: "project-3", sel: ".projects-grid > :nth-child(3)", kind: "card", agent: 3, log: "agent-04 › mounting project 03" },
  { key: "about-heading", sel: "#about .section-heading", kind: "block", agent: 1, log: "agent-02 › setting the about heading" },
  { key: "about-portrait", sel: ".portrait-frame", kind: "media", agent: 2, log: "agent-03 › placing the second portrait" },
  { key: "about-copy", sel: ".about-preview-copy", kind: "block", agent: 0, log: "agent-01 › flowing the about copy" },
  { key: "principle-1", sel: ".principle:nth-of-type(1)", kind: "card", agent: 0, log: "agent-01 › building principle 01" },
  { key: "principle-2", sel: ".principle:nth-of-type(2)", kind: "card", agent: 2, log: "agent-03 › building principle 02" },
  { key: "principle-3", sel: ".principle:nth-of-type(3)", kind: "card", agent: 3, log: "agent-04 › building principle 03" },
  { key: "skills-heading", sel: "#skills .section-heading", kind: "block", agent: 1, log: "agent-02 › setting the toolkit heading" },
  { key: "skills-grid", sel: ".skill-preview-grid", kind: "block", agent: 0, log: "agent-01 › wiring the toolkit grid" },
  { key: "terminal-copy", sel: ".terminal-copy", kind: "block", agent: 1, log: "agent-02 › typesetting the terminal teaser" },
  { key: "terminal-window", sel: ".terminal-window", kind: "card", agent: 3, log: "agent-04 › rendering the terminal" },
  { key: "listening-heading", sel: "#listening .section-heading", kind: "block", agent: 1, log: "agent-02 › setting the listening heading" },
  { key: "playlist", sel: ".playlist-card", kind: "media", agent: 2, log: "agent-03 › mounting the playlist" },
  { key: "contact", sel: ".contact-cta", kind: "headline", agent: 1, log: "agent-02 › setting the closing call" },
  { key: "footer-top", sel: ".footer-top", kind: "block", agent: 0, log: "agent-01 › assembling the footer" },
  { key: "footer-bottom", sel: ".footer-bottom", kind: "strip", agent: 3, log: "agent-04 › final polish pass" }
];

function SkeletonInner({ kind }: { kind: Kind }) {
  switch (kind) {
    case "nav":
      return <><span className="s-brand" /><span className="s-links"><i /><i /><i /><i /></span></>;
    case "headline":
      return <><span className="s-1" /><span className="s-2" /></>;
    case "buttons":
      return <><span className="s-1 s-solid" /><span className="s-2 s-ghost" /></>;
    case "media":
      return <><span className="s-label">IMAGE</span></>;
    case "canvas":
      return <><span className="s-label">WORDMARK</span><span className="s-bar" /></>;
    case "strip":
      return <><span className="s-t" /><span className="s-t" /><span className="s-t" /></>;
    case "card":
      return <><span className="s-head" /><span className="s-l" /><span className="s-l s-l-short" /></>;
    case "block":
      return <><span className="s-line" /><span className="s-l" /><span className="s-l s-l-short" /></>;
    default:
      return <span className="s-1" />;
  }
}

export function BuildSequence() {
  const [items, setItems] = useState<Item[]>([]);
  const [count, setCount] = useState(0);
  const [anchors, setAnchors] = useState<(string | null)[]>([null, null, null, null]);
  const [logs, setLogs] = useState<string[]>([]);
  const [armed, setArmed] = useState(false);
  const [tick, setTick] = useState(0);

  const itemsRef = useRef<Item[]>([]);
  const countRef = useRef(0);
  const anchorsRef = useRef<(string | null)[]>([null, null, null, null]);
  const frame = useRef(0);

  const teardown = useCallback(() => {
    document.documentElement.classList.remove("bp-building");
    itemsRef.current.forEach(it => { delete it.el.dataset.bpState; });
    itemsRef.current = [];
    countRef.current = 0;
    setArmed(false);
    setItems([]);
    setCount(0);
    setLogs([]);
    setAnchors([null, null, null, null]);
  }, []);

  const measure = useCallback(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const found: Item[] = [];

    TARGETS.forEach(t => {
      const el = document.querySelector<HTMLElement>(t.sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width < 12 || r.height < 6) return;
      found.push({
        ...t,
        el,
        left: r.left + window.scrollX,
        top: r.top + scrollY,
        w: r.width,
        h: r.height,
        aimX: 0,
        aimY: 0,
        trigger: 0
      });
    });
    if (found.length < 4) return;

    found.sort((a, b) => (a.top - b.top) || (a.left - b.left));

    // Aim points: where the agent cursor clicks for each kind of element.
    found.forEach(b => {
      switch (b.kind) {
        case "nav": b.aimX = b.left + b.w * 0.68; b.aimY = b.top + b.h * 0.52; break;
        case "headline": b.aimX = b.left + Math.min(b.w * 0.24, 230); b.aimY = b.top + b.h * 0.32; break;
        case "media": b.aimX = b.left + b.w * 0.56; b.aimY = b.top + b.h * 0.4; break;
        case "buttons": b.aimX = b.left + b.w * 0.1; b.aimY = b.top + b.h * 0.55; break;
        case "canvas": b.aimX = b.left + b.w * 0.52; b.aimY = b.top + b.h * 0.55; break;
        case "strip": b.aimX = b.left + b.w * 0.5; b.aimY = b.top + b.h * 0.5; break;
        case "card": b.aimX = b.left + b.w * 0.4; b.aimY = b.top + b.h * 0.22; break;
        case "block": b.aimX = b.left + Math.min(b.w * 0.3, 200); b.aimY = b.top + b.h * 0.35; break;
        default: b.aimX = b.left + Math.min(b.w * 0.3, 190); b.aimY = b.top + b.h * 0.5;
      }
    });

    // Scroll position at which each element gets built. Elements already on
    // screen at load are staggered over the first few hundred pixels.
    let prev = -1;
    found.forEach((b, i) => {
      const natural = Math.round(b.top - vh * 0.74 + scrollY * 0);
      const staggered = i === 0 ? 0 : 16 + i * 52;
      b.trigger = Math.max(natural, staggered, prev + 1);
      prev = b.trigger;
    });

    itemsRef.current = found;
    setItems(found);
    document.documentElement.classList.add("bp-building");

    const next = computeCount(window.scrollY);
    // Write the real state: everything below the scroll frontier is pending.
    found.forEach((b, i) => {
      const state = i < next ? "built" : "pending";
      if (b.el.dataset.bpState !== state) b.el.dataset.bpState = state;
    });

    const last = found[next - 1];
    if (last) {
      const a = [...anchorsRef.current];
      a[last.agent] = last.key;
      anchorsRef.current = a;
      setAnchors(a);
    }
    countRef.current = next;
    setCount(next);
  }, []);

  const computeCount = useCallback((y: number) => {
    let n = 0;
    for (const it of itemsRef.current) {
      if (it.trigger <= y + 2) n++; else break;
    }
    return n;
  }, []);

  const apply = useCallback((next: number) => {
    const list = itemsRef.current;
    const prev = countRef.current;
    if (next === prev) return;

    if (next > prev) {
      const fresh = list.slice(prev, next);
      fresh.forEach(it => { it.el.dataset.bpState = "built"; });
      const last = fresh[fresh.length - 1];
      const nextAnchors = [...anchorsRef.current];
      nextAnchors[last.agent] = last.key;
      anchorsRef.current = nextAnchors;
      setAnchors(nextAnchors);
      setLogs(l => [...l, ...fresh.map(f => f.log)].slice(-3));
      setTick(t => t + 1);
    } else {
      list.slice(next, prev).forEach(it => { it.el.dataset.bpState = "pending"; });
      const last = list[next - 1];
      if (last) {
        const nextAnchors = [...anchorsRef.current];
        nextAnchors[last.agent] = last.key;
        anchorsRef.current = nextAnchors;
        setAnchors(nextAnchors);
      }
      setLogs(l => [...l, "agent-01 › reverting the last edit"].slice(-3));
    }

    countRef.current = next;
    setCount(next);
  }, []);

  // Arm on first visit of the session.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const forced = new URLSearchParams(window.location.search).get("build") === "1";
    let seen = false;
    let skipped = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      skipped = sessionStorage.getItem(SEEN_KEY + ":skip") === "1";
    } catch { /* storage blocked */ }
    if (skipped && !forced) return;
    if (seen && !forced) return;
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* storage blocked */ }

    setArmed(true);
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      try { measure(); } catch { teardown(); }
    };
    start();
    const settle = window.setTimeout(start, 500);
    if (document.fonts?.ready) document.fonts.ready.then(() => { if (!cancelled) window.setTimeout(start, 60); });
    return () => { cancelled = true; window.clearTimeout(settle); };
  }, [measure, teardown]);

  // Scroll -> build / unbuild.
  useEffect(() => {
    if (!armed) return;
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        apply(computeCount(window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [armed, apply, computeCount]);

  // Re-measure on resize so nothing drifts.
  useEffect(() => {
    if (!armed) return;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => measure(), 220);
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); window.clearTimeout(timer); };
  }, [armed, measure]);

  // Esc (or the hint) drops the effect and shows the finished site.
  useEffect(() => {
    if (!armed) return;
    const drop = () => {
      try { sessionStorage.setItem(SEEN_KEY + ":skip", "1"); } catch { /* storage blocked */ }
      teardown();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") drop(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [armed, teardown]);

  // Replay from the command menu.
  useEffect(() => {
    const replay = () => {
      teardown();
      window.scrollTo(0, 0);
      setArmed(true);
      window.setTimeout(() => measure(), 80);
    };
    window.addEventListener("aqshai:build", replay);
    return () => window.removeEventListener("aqshai:build", replay);
  }, [teardown, measure]);

  if (!armed || items.length === 0) return null;

  const pending = items.slice(count);
  const pct = Math.round((count / items.length) * 100);
  const lastKey = items[count - 1]?.key;
  const cursorFor = (agentIndex: number) => {
    const key = anchors[agentIndex];
    if (!key) return null;
    const it = items.find(i => i.key === key);
    return it ? { x: it.aimX, y: it.aimY } : null;
  };

  return (
    <>
      <div className="bp-layer" aria-hidden="true">
        {pending.map(b => (
          <div
            key={b.key}
            className={`bp-skel bp-skel-${b.kind}`}
            style={{ left: b.left, top: b.top, width: b.w, height: b.h, "--tint": AGENTS[b.agent].color } as CSSProperties}
          >
            <SkeletonInner kind={b.kind} />
          </div>
        ))}

        {AGENTS.map((agent, i) => {
          const p = cursorFor(i);
          if (!p) return null;
          return (
            <motion.div
              key={agent.id}
              className="bp-cursor"
              initial={false}
              animate={{ left: p.x, top: p.y }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: agent.color }}
            >
              <svg className="bp-cursor-arrow" width="18" height="24" viewBox="0 0 17 23" fill="none">
                <path d="M1.2 1.2V17.6L5.7 13.4L8.6 20.7L11.9 19.4L9 12.2L15 11.8L1.2 1.2Z" fill="currentColor" stroke="#05070d" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
              <span className="bp-cursor-tag" style={{ background: agent.color, color: agent.ink }}>
                {agent.id} <b>{agent.label}</b>
              </span>
              {anchors[i] === lastKey && <span key={tick} className="bp-ripple" style={{ borderColor: agent.color }} />}
            </motion.div>
          );
        })}
      </div>

      <div className="bp-hud" aria-hidden="true">
        <div className="bp-log">
          {logs.length === 0 && <p className="is-latest">4 agents on standby · scroll to build</p>}
          {logs.map((line, i) => (
            <p key={`${line}-${i}`} className={i === logs.length - 1 ? "is-latest" : ""}>{line}</p>
          ))}
        </div>
        <span className="bp-skip" onClick={() => teardown()}>scroll builds · esc to just view the site</span>
      </div>
      <div className="bp-progress" style={{ width: `${pct}%` }} aria-hidden="true" />
    </>
  );
}
