"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";

const SEEN_KEY = "aqshai:build-intro:v1";

type Agent = { id: string; label: string; color: string; ink: string };

const AGENTS: Agent[] = [
  { id: "agent-01", label: "layout", color: "#4169f5", ink: "#f4f8ff" },
  { id: "agent-02", label: "type", color: "#ffb648", ink: "#140e03" },
  { id: "agent-03", label: "paint", color: "#3ddc97", ink: "#04140c" },
  { id: "agent-04", label: "qa", color: "#c084fc", ink: "#170529" }
];

const SPAWN: { x: number; y: number }[] = [
  { x: 44, y: 58 },
  { x: 58, y: 26 },
  { x: 36, y: 44 },
  { x: 68, y: 74 }
];

type Step = { agent: number; x: number; y: number; build?: string; log: string };

const STEPS: Step[] = [
  { agent: 0, x: 58, y: 5, build: "nav", log: "agent-01 › scaffolding the shell" },
  { agent: 1, x: 12, y: 21, build: "overline", log: "agent-02 › loading type scale" },
  { agent: 1, x: 18, y: 31, build: "headline-a", log: "agent-02 › setting headline / 01" },
  { agent: 1, x: 25, y: 43, build: "headline-b", log: "agent-02 › setting headline / 02" },
  { agent: 1, x: 14, y: 56, build: "tagline", log: "agent-02 › kerning the tagline" },
  { agent: 2, x: 10, y: 66, build: "cta-a", log: "agent-03 › rendering primary action" },
  { agent: 2, x: 28, y: 66, build: "cta-b", log: "agent-03 › rendering quiet action" },
  { agent: 2, x: 72, y: 41, build: "portrait", log: "agent-03 › compositing portrait plate" },
  { agent: 3, x: 64, y: 68, build: "badge", log: "agent-04 › checking contrast ratios" },
  { agent: 0, x: 16, y: 88, build: "card-a", log: "agent-01 › mounting project cards" },
  { agent: 2, x: 44, y: 88, build: "card-b", log: "agent-03 › filling second card" },
  { agent: 3, x: 74, y: 88, build: "card-c", log: "agent-04 › final polish pass" }
];

const TOTAL = STEPS.length;

export function BuildSequence() {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [built, setBuilt] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["spawning 4 agents on edge runtime…"]);
  const [active, setActive] = useState(-1);
  const [tick, setTick] = useState(0);
  const [positions, setPositions] = useState(SPAWN);
  const timers = useRef<number[]>([]);

  const tints = useMemo(() => {
    const map: Record<string, string> = {};
    STEPS.forEach(step => { if (step.build) map[step.build] = AGENTS[step.agent].color; });
    return map;
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const shut = useCallback(() => {
    clearTimers();
    setExiting(true);
    timers.current.push(window.setTimeout(() => setMounted(false), 700));
  }, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    setBuilt([]);
    setLogs(["spawning 4 agents on edge runtime…"]);
    setPositions(SPAWN);
    setActive(-1);
    setExiting(false);
    setMounted(true);

    let at = 340;
    STEPS.forEach(step => {
      timers.current.push(window.setTimeout(() => {
        setActive(step.agent);
        setTick(t => t + 1);
        setPositions(prev => prev.map((pos, idx) => (idx === step.agent ? { x: step.x, y: step.y } : pos)));
        setLogs(prev => [...prev, step.log].slice(-4));
        timers.current.push(window.setTimeout(() => {
          if (!step.build) return;
          setBuilt(prev => (prev.includes(step.build!) ? prev : [...prev, step.build!]));
        }, 150));
      }, at));
      at += 205;
    });

    timers.current.push(window.setTimeout(() => {
      setLogs(prev => [...prev, "build complete · 4 agents · shipping"].slice(-4));
      setPositions(prev => prev.map((_, idx) => ({ x: 62 + idx * 5, y: 95 - idx * 2 })));
    }, at + 60));

    timers.current.push(window.setTimeout(() => shut(), at + 700));
  }, [clearTimers, shut]);

  // First-visit gating: skip for reduced motion, skip if already seen this session.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forced = new URLSearchParams(window.location.search).get("build") === "1";
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch { /* storage blocked */ }
    if (reduce) return;
    if (seen && !forced) return;
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* storage blocked */ }
    run();
    return clearTimers;
  }, [run, clearTimers]);

  // Replay hook: any component can dispatch window event "aqshai:build".
  useEffect(() => {
    const replay = () => run();
    window.addEventListener("aqshai:build", replay);
    return () => window.removeEventListener("aqshai:build", replay);
  }, [run]);

  // Skip on key press.
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") shut(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, shut]);

  // Lock scroll while the build plays.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mounted]);

  const pct = Math.round((built.length / TOTAL) * 100);
  const has = (key: string) => built.includes(key);
  const tint = (key: string) => ({ "--tint": tints[key] ?? "#4169f5" }) as CSSProperties;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className={`build-overlay ${exiting ? "is-exiting" : ""}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={shut}
          aria-hidden="true"
        >
          <div className="build-atmos" />
          <div className="build-scanline" />

          <div className="build-hud">
            <span className="build-hud-brand">aqshaidev<span>://</span>build</span>
            <span className="build-hud-meta">
              <i className="build-pulse" />
              4 agents · {pct}%
            </span>
          </div>

          <div className="build-stage">
            <div className="build-frame">
              <div className="build-chrome">
                <i /><i /><i />
                <small>dev-aqshai.vercel.app</small>
                <em>{exiting ? "ready" : "building"}</em>
              </div>

              <div className="build-canvas">
                <div className={`bp bp-nav ${has("nav") ? "is-built" : ""}`} style={tint("nav")}>
                  <strong className="bp-text bp-brand">AQSHAIDEV<i>.</i></strong>
                  <span className="bp-links"><i /><i /><i /><i /></span>
                </div>

                <div className="bp-col">
                  <div className={`bp bp-overline ${has("overline") ? "is-built" : ""}`} style={tint("overline")}>
                    <span className="bp-bar" />
                    <span className="bp-text">SOFTWARE ENGINEER / DEVELOPER — SRI LANKA</span>
                  </div>

                  <div className={`bp bp-headline bp-headline-a ${has("headline-a") ? "is-built" : ""}`} style={tint("headline-a")}>
                    <span className="bp-bar" />
                    <strong className="bp-text">CODE THE</strong>
                  </div>

                  <div className={`bp bp-headline bp-headline-b ${has("headline-b") ? "is-built" : ""}`} style={tint("headline-b")}>
                    <span className="bp-bar" />
                    <strong className="bp-text">FUTURE WORLD.</strong>
                  </div>

                  <div className={`bp bp-tagline ${has("tagline") ? "is-built" : ""}`} style={tint("tagline")}>
                    <span className="bp-bar" />
                    <span className="bp-text">One line at a time :3</span>
                  </div>

                  <div className="bp-ctas">
                    <div className={`bp bp-btn ${has("cta-a") ? "is-built" : ""}`} style={tint("cta-a")}>
                      <span className="bp-bar" />
                      <span className="bp-text">Explore projects</span>
                    </div>
                    <div className={`bp bp-btn bp-btn-quiet ${has("cta-b") ? "is-built" : ""}`} style={tint("cta-b")}>
                      <span className="bp-bar" />
                      <span className="bp-text">A little about me</span>
                    </div>
                  </div>
                </div>

                <div className={`bp bp-portrait ${has("portrait") ? "is-built" : ""}`} style={tint("portrait")}>
                  <div className="bp-portrait-fill" />
                  <span className="bp-portrait-label">PORTRAIT · 4:5</span>
                  <div className={`bp bp-badge ${has("badge") ? "is-built" : ""}`} style={tint("badge")}>
                    <span className="bp-bar" />
                    <span className="bp-text"><i />OPEN TO WORK</span>
                  </div>
                </div>

                <div className="bp-cards">
                  {(["card-a", "card-b", "card-c"] as const).map((key, i) => (
                    <div key={key} className={`bp bp-card ${has(key) ? "is-built" : ""}`} style={tint(key)}>
                      <span className="bp-bar" />
                      <span className="bp-card-head" />
                      <span className="bp-card-line" />
                      <span className="bp-card-line bp-card-line-short" />
                      <span className="bp-card-index">0{i + 1}</span>
                    </div>
                  ))}
                </div>

                {AGENTS.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    className="build-cursor"
                    animate={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
                    initial={false}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    style={{ color: agent.color }}
                  >
                    <svg className="build-cursor-arrow" width="17" height="23" viewBox="0 0 17 23" fill="none">
                      <path d="M1.2 1.2V17.6L5.7 13.4L8.6 20.7L11.9 19.4L9 12.2L15 11.8L1.2 1.2Z" fill="currentColor" stroke="#05070d" strokeWidth="1.1" strokeLinejoin="round" />
                    </svg>
                    <span className="build-cursor-tag" style={{ background: agent.color, color: agent.ink }}>
                      {agent.id.replace("agent-", "a")} <b>{agent.label}</b>
                    </span>
                    {active === i && (
                      <span key={tick} className="build-ripple" style={{ borderColor: agent.color }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="build-console">
              {logs.map((line, i) => (
                <p key={`${line}-${i}`} className={i === logs.length - 1 ? "is-latest" : ""}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <span className="build-skip">skip build ›</span>
          <div className="build-progress" style={{ width: `${pct}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
