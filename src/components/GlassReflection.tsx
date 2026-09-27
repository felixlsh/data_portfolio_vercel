import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMotion } from "@/lib/motion";

const surfaces = ".glass-panel, .glass-card, .glass-control";

/** A single, frame-batched reflection listener; no React renders on pointer movement. */
export const GlassReflection = () => {
  const { motion } = useMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!motion) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let active: HTMLElement | null = null;
    let pending: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const clearActive = () => {
      active?.classList.remove("glass-reflecting");
      active?.style.removeProperty("--glass-x");
      active?.style.removeProperty("--glass-y");
      active = null;
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      clearActive();
    };

    const paint = () => {
      frame = 0;
      if (active !== pending) clearActive();
      active = pending;
      if (!active?.isConnected) { clearActive(); return; }
      const rect = active.getBoundingClientRect();
      active.style.setProperty("--glass-x", `${Math.round(x - rect.left)}px`);
      active.style.setProperty("--glass-y", `${Math.round(y - rect.top)}px`);
      active.classList.add("glass-reflecting");
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") return;
      pending = event.target instanceof Element ? event.target.closest<HTMLElement>(surfaces) : null;
      if (!pending) { reset(); return; }
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      finePointer.removeEventListener("change", reset);
    };
  }, [motion, pathname]);

  return null;
};
