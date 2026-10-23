"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ══ Full-Background Interactive Particles ══════════════════
   A shape made of dots covering the full background. Move over
   it and the dots are pushed away from the pointer and spring home
   behind it; press and a shockwave throws them out, and they gather
   again into the NEXT shape — circle, square, flower, round again.
   ═══════════════════════════════════════════════════════════ */

const stillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const N = 880;

export const SHAPES = ["Circle", "Square", "Flower"] as const;
type Shape = (typeof SHAPES)[number];

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function outline(s: Shape, W: number, H: number): Path2D {
  const p = new Path2D();
  const CX = W / 2;
  const CY = H / 2;
  const baseDim = Math.min(W, H);

  if (s === "Circle") {
    const r = Math.min(baseDim * 0.42, 340);
    p.arc(CX, CY, r, 0, Math.PI * 2);
  } else if (s === "Square") {
    const size = Math.min(baseDim * 0.72, 540);
    const radius = Math.min(48, size * 0.12);
    if (typeof p.roundRect === "function") {
      p.roundRect(CX - size / 2, CY - size / 2, size, size, radius);
    } else {
      p.rect(CX - size / 2, CY - size / 2, size, size);
    }
  } else {
    /* five round petals round a smaller middle */
    const petalDist = Math.min(baseDim * 0.24, 200);
    const petalR = Math.min(baseDim * 0.16, 130);
    const centerR = Math.min(baseDim * 0.15, 120);
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const x = CX + Math.cos(a) * petalDist;
      const y = CY + Math.sin(a) * petalDist;
      p.moveTo(x + petalR, y);
      p.arc(x, y, petalR, 0, Math.PI * 2);
    }
    p.moveTo(CX + centerR, CY);
    p.arc(CX, CY, centerR, 0, Math.PI * 2);
  }
  return p;
}

function homes(s: Shape, W: number, H: number): [number, number][] {
  if (typeof document === "undefined" || W <= 0 || H <= 0) return [];
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  if (!g) return [];
  const path = outline(s, W, H);
  let area = 0;
  const step = Math.max(2, Math.floor(Math.min(W, H) / 160));
  for (let y = 1; y < H; y += step) {
    for (let x = 1; x < W; x += step) {
      if (g.isPointInPath(path, x, y)) area += step * step;
    }
  }
  if (area <= 0) area = W * H * 0.25;
  const sp = Math.sqrt((area / N) * (2 / Math.sqrt(3)));
  const rowH = (sp * Math.sqrt(3)) / 2;
  const pts: [number, number][] = [];
  for (let y = rowH / 2, row = 0; y < H; y += rowH, row++) {
    for (let x = sp / 2 + (row % 2) * (sp / 2); x < W; x += sp) {
      if (g.isPointInPath(path, x, y)) pts.push([x, y]);
    }
  }
  const out: [number, number][] = [];
  if (pts.length === 0) return out;
  for (let i = 0; i < N; i++) out.push(pts[Math.floor((i * pts.length) / N)]);
  return out;
}

export function Particles({
  shape = "Circle",
  reach = 110,
  force = 75,
  grain = "Fine",
  className = "",
}: {
  shape?: string;
  reach?: number;
  force?: number;
  grain?: string;
  className?: string;
} = {}) {
  const still = stillness();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const dots = useRef<Dot[]>([]);
  const at = useRef<Shape>("Circle");
  const hand = useRef<{ x: number; y: number } | null>(null);
  const raf = useRef(0);
  const [dim, setDim] = useState({ w: 1200, h: 800 });
  const dimRef = useRef({ w: 1200, h: 800 });
  dimRef.current = dim;

  const knobs = useRef({ reach, force, grain });
  knobs.current = { reach, force, grain };

  const angle = (x: number, y: number) => Math.atan2(y - dimRef.current.h / 2, x - dimRef.current.w / 2);

  const become = useCallback((s: Shape, W?: number, H?: number) => {
    at.current = s;
    const curW = W ?? dimRef.current.w;
    const curH = H ?? dimRef.current.h;
    if (curW <= 0 || curH <= 0) return;
    const next = homes(s, curW, curH);
    if (!next.length) return;
    const ds = dots.current;
    if (!ds.length) {
      dots.current = next.map(([x, y]) => ({ hx: x, hy: y, x, y, vx: 0, vy: 0 }));
      return;
    }
    const a = ds.map((d, i) => [angle(d.x, d.y), i] as const).sort((p, q) => p[0] - q[0]);
    const b = next.map((h, i) => [angle(h[0], h[1]), i] as const).sort((p, q) => p[0] - q[0]);
    a.forEach(([, di], k) => {
      const h = next[b[k][1]];
      ds[di].hx = h[0];
      ds[di].hy = h[1];
      if (still) {
        ds[di].x = h[0];
        ds[di].y = h[1];
      }
    });
  }, [still]);

  const draw = useCallback(() => {
    const c = cv.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;
    const { w, h } = dimRef.current;
    if (w <= 0 || h <= 0) return;
    const dpr = c.width / w;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, w, h);
    x.fillStyle = getComputedStyle(c).color || "rgba(255,255,255,0.22)";
    const r = knobs.current.grain === "Coarse" ? 2.8 : 2.0;
    x.beginPath();
    for (const d of dots.current) {
      const sp = Math.hypot(d.vx, d.vy);
      if (sp < 0.3) {
        x.moveTo(d.x + r, d.y);
        x.arc(d.x, d.y, r, 0, Math.PI * 2);
      } else {
        const s = Math.min(2.8, 1 + sp * 0.12);
        const rot = Math.atan2(d.vy, d.vx);
        x.moveTo(d.x + Math.cos(rot) * r * s, d.y + Math.sin(rot) * r * s);
        x.ellipse(d.x, d.y, r * s, r / Math.sqrt(s), rot, 0, Math.PI * 2);
      }
    }
    x.fill();
  }, []);

  const run = useCallback(() => {
    if (raf.current) return;
    let prev = 0;
    const tick = (t: number) => {
      const dt = prev ? clamp((t - prev) / 16.67, 0, 2.5) : 1;
      prev = t;
      const h = hand.current;
      const R = clamp(knobs.current.reach, 40, 200);
      const S = (clamp(knobs.current.force, 0, 100) / 100) * 12;
      let busy = !!h;
      for (const d of dots.current) {
        if (h) {
          const dx = d.x - h.x;
          const dy = d.y - h.y;
          const dd = Math.hypot(dx, dy);
          if (dd < R && dd > 0.01) {
            const f = Math.pow(1 - dd / R, 2) * S;
            d.vx += (dx / dd) * f * dt;
            d.vy += (dy / dd) * f * dt;
          }
        }
        d.vx = (d.vx + (d.hx - d.x) * 0.05 * dt) * Math.pow(0.84, dt);
        d.vy = (d.vy + (d.hy - d.y) * 0.05 * dt) * Math.pow(0.84, dt);
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (
          Math.abs(d.hx - d.x) < 0.05 &&
          Math.abs(d.hy - d.y) < 0.05 &&
          Math.abs(d.vx) < 0.02 &&
          Math.abs(d.vy) < 0.02
        ) {
          d.x = d.hx;
          d.y = d.hy;
          d.vx = 0;
          d.vy = 0;
        } else {
          busy = true;
        }
      }
      draw();
      raf.current = busy ? requestAnimationFrame(tick) : 0;
    };
    raf.current = requestAnimationFrame(tick);
  }, [draw]);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width) || window.innerWidth;
      const h = Math.round(rect.height) || window.innerHeight;
      setDim({ w, h });
      dimRef.current = { w, h };

      const c = cv.current;
      if (c) {
        const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      become(at.current, w, h);
      draw();
      run();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [become, draw, run]);

  useEffect(() => {
    const s = (SHAPES as readonly string[]).includes(shape) ? (shape as Shape) : "Circle";
    become(s);
    draw();
    run();
  }, [shape, become, draw, run]);

  useEffect(() => {
    draw();
  }, [grain, draw]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, []);

  useEffect(() => {
    const mo = new MutationObserver(() => draw());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, [draw]);

  const where = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div ref={containerRef} className={`ptc absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={cv}
        className="ptc-canvas absolute inset-0 w-full h-full block"
        role="img"
        aria-label="A shape made of dots. Move over it; press to change the shape."
        onPointerMove={(e) => {
          if (still) return;
          hand.current = where(e);
          run();
        }}
        onPointerLeave={() => {
          hand.current = null;
          run();
        }}
        onPointerDown={(e) => {
          const p = where(e);
          if (!still) {
            const S = 0.4 + (clamp(knobs.current.force, 0, 100) / 100) * 1.3;
            for (const d of dots.current) {
              const dx = d.x - p.x;
              const dy = d.y - p.y;
              const dd = Math.hypot(dx, dy);
              if (dd > 280 || dd < 0.01) continue;
              const f = (1 - dd / 280) * 36 * S;
              d.vx += (dx / dd) * f;
              d.vy += (dy / dd) * f;
            }
          }
          become(SHAPES[(SHAPES.indexOf(at.current) + 1) % SHAPES.length]);
          draw();
          run();
        }}
      />
    </div>
  );
}
