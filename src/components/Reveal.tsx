import { type ElementType, type ReactNode, type CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
interface Props { children: ReactNode; as?: ElementType; delay?: number; className?: string; style?: CSSProperties; id?: string; }
export const Reveal = ({ children, as: Tag = "div", delay = 0, className, style, id }: Props) => {
  const { ref, inView } = useInView<HTMLElement>();
  const { motion } = useMotion();
  const visible = inView || !motion;
  return <Tag ref={ref as React.Ref<HTMLElement>} id={id}
    style={{ transitionDelay: visible && motion ? Math.min(delay, 250) + "ms" : undefined, ...style }}
    className={cn(motion ? "transition-[opacity,transform] duration-700 ease-out" : "",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", className)}>{children}</Tag>;
};
