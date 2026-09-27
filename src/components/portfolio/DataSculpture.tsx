import { useEffect, useRef } from "react";
import { useMotion } from "@/lib/motion";

/**
 * Decorative, conceptual data sculpture — layered orbital rings, a rotating
 * dot field and floating glass planes. This is an artistic visual, NOT a chart
 * of real analytics data.
 *
 * - Compositor friendly: single canvas, rAF loop, DPR capped at 2
 * - Pauses when offscreen, when the tab is hidden, or when motion is off
 * - Pointer parallax only for fine pointers (mouse), never on touch
 */
export const DataSculpture = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { motion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const animated = motion && !isCoarse;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep a visible frame after any size change, even when motion is off.
      if (!animated) render(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // --- scene definition -------------------------------------------------
    const rings = [
      { r: 0.46, tilt: 0.16, speed: 0.12, dots: 46, hue: 218, alpha: 0.95, size: 1.9 },
      { r: 0.37, tilt: -0.42, speed: -0.18, dots: 34, hue: 200, alpha: 0.8, size: 1.7 },
      { r: 0.28, tilt: 0.72, speed: 0.26, dots: 26, hue: 264, alpha: 0.7, size: 1.6 },
      { r: 0.19, tilt: -1.05, speed: -0.34, dots: 18, hue: 214, alpha: 0.6, size: 1.4 },
    ];

    const field = Array.from({ length: 90 }, (_, i) => ({
      a: (i / 90) * Math.PI * 2 + Math.random(),
      r: 0.08 + Math.random() * 0.5,
      z: Math.random(),
      s: 0.4 + Math.random() * 1.1,
    }));

    const planes = [
      { w: 0.62, h: 0.34, y: -0.16, rot: 0.1, hue: 216 },
      { w: 0.5, h: 0.28, y: 0.06, rot: -0.06, hue: 262 },
      { w: 0.38, h: 0.22, y: 0.26, rot: 0.12, hue: 198 },
    ];

    const drawPlane = (
      cx: number,
      cy: number,
      base: number,
      p: (typeof planes)[number],
      t: number,
      depth: number
    ) => {
      const float = Math.sin(t * 0.6 + p.y * 6) * base * 0.02;
      const w = base * p.w;
      const h = base * p.h;
      const x = cx + eased.x * 14 * depth;
      const y = cy + base * p.y + float + eased.y * 10 * depth;

      ctx.save();
      ctx.translate(x, y);
      ctx.transform(1, p.rot * 0.22, -0.55, 0.32, 0, 0); // isometric-ish shear
      ctx.beginPath();
      ctx.rect(-w / 2, -h / 2, w, h);
      const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      g.addColorStop(0, `hsla(${p.hue}, 90%, 62%, 0.10)`);
      g.addColorStop(1, `hsla(${p.hue}, 90%, 62%, 0.01)`);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = `hsla(${p.hue}, 92%, 72%, 0.28)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height);

      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;

      // core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.5);
      glow.addColorStop(0, "hsla(218, 96%, 66%, 0.28)");
      glow.addColorStop(0.5, "hsla(262, 80%, 66%, 0.08)");
      glow.addColorStop(1, "hsla(218, 96%, 66%, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, base * 0.5, 0, Math.PI * 2);
      ctx.fill();

      planes.forEach((p, i) => drawPlane(cx, cy, base, p, t, 0.4 + i * 0.3));

      // rotating dot field
      field.forEach((d) => {
        const a = d.a + t * (0.05 + d.z * 0.08);
        const rr = base * d.r;
        const x = cx + Math.cos(a) * rr + eased.x * (8 + d.z * 20);
        const y = cy + Math.sin(a) * rr * 0.38 + eased.y * (6 + d.z * 14);
        ctx.beginPath();
        ctx.arc(x, y, d.s, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${205 + d.z * 55}, 92%, ${64 + d.z * 16}%, ${0.18 + d.z * 0.35})`;
        ctx.fill();
      });

      // orbital rings
      rings.forEach((ring, ri) => {
        const depth = 0.4 + ri * 0.22;
        const rx = base * ring.r;
        const ry = rx * 0.34;
        const rot = t * ring.speed + ring.tilt;
        const ox = cx + eased.x * 18 * depth;
        const oy = cy + eased.y * 12 * depth;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(ring.tilt + Math.sin(t * 0.1 + ri) * 0.05);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.hue}, 92%, 70%, ${0.16 * ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        for (let i = 0; i < ring.dots; i++) {
          const a = (i / ring.dots) * Math.PI * 2 + rot;
          const px = Math.cos(a) * rx;
          const py = Math.sin(a) * ry;
          const cosT = Math.cos(ring.tilt);
          const sinT = Math.sin(ring.tilt);
          const x = ox + px * cosT - py * sinT;
          const y = oy + px * sinT + py * cosT;
          const front = (Math.sin(a) + 1) / 2; // depth cue
          ctx.beginPath();
          ctx.arc(x, y, ring.size * (0.55 + front * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ring.hue}, 95%, ${62 + front * 20}%, ${(0.22 + front * 0.6) * ring.alpha})`;
          ctx.fill();
        }
      });

      // core
      ctx.beginPath();
      ctx.arc(cx + eased.x * 6, cy + eased.y * 4, base * 0.026, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(210, 100%, 92%, 0.9)";
      ctx.shadowColor = "hsla(218, 100%, 70%, 0.9)";
      ctx.shadowBlur = 26;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    let raf: number | null = null;
    let running = false;
    let visible = true;
    const startedAt = performance.now();

    const loop = (now: number) => {
      render((now - startedAt) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || !animated) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (animated) {
      start();
    } else {
      render(0); // single static frame — content stays visible
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (finePointer) window.removeEventListener("pointermove", onPointerMove);
    };
  }, [motion]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="장식용 데이터 조형 이미지 (실제 분석 수치가 아닌 개념적 시각 요소)"
      />
    </div>
  );
};

