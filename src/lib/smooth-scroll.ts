export const getHeaderOffset = () => 112;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("motion-off");
let frame = 0;
let finish: (() => void) | undefined;
export const cancelSmoothScroll = () => {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  finish?.();
  finish = undefined;
};
export const smoothScrollTo = (targetY: number, duration = 550) => new Promise<void>((resolve) => {
  cancelSmoothScroll();
  const to = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
  if (reduced() || Math.abs(to - window.scrollY) < 2) {
    window.scrollTo(0, to); resolve(); return;
  }
  const from = window.scrollY;
  const start = performance.now();
  finish = resolve;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    window.scrollTo(0, from + (to - from) * eased);
    if (t < 1) frame = requestAnimationFrame(step);
    else { frame = 0; finish = undefined; resolve(); }
  };
  frame = requestAnimationFrame(step);
});
export const smoothScrollToId = async (id: string, extraOffset = 0) => {
  const el = document.getElementById(id);
  if (!el) return false;
  await smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - extraOffset);
  return true;
};
if (typeof window !== "undefined") {
  for (const event of ["wheel", "touchstart", "keydown"]) window.addEventListener(event, cancelSmoothScroll, { passive: true });
}
