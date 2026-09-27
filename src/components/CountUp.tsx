import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useMotion } from "@/lib/motion";

type Props = {
  /** Final numeric value — rendered verbatim when motion is off. */
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const format = (n: number) => n.toLocaleString("en-US");

/** One-time count-up that lands exactly on `value`. */
export const CountUp = ({ value, prefix = "", suffix = "", duration = 1400, className }: Props) => {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const { motion } = useMotion();
  const [display, setDisplay] = useState(motion ? 0 : value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!motion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, motion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
};

