import { Pause, Play } from "lucide-react";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Accessible pause/play control for continuous decorative motion.
 * Locked (and shown as paused) when the OS requests reduced motion.
 */
export const MotionToggle = ({ className }: { className?: string }) => {
  const { motion, systemReduced, toggle } = useMotion();

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={systemReduced}
      aria-pressed={!motion}
      aria-label={motion ? "배경 애니메이션 일시정지" : "배경 애니메이션 재생"}
      title={
        systemReduced
          ? "시스템 설정에서 모션 줄이기가 켜져 있습니다"
          : motion
            ? "애니메이션 일시정지"
            : "애니메이션 재생"
      }
      className={cn(
        "glass-control inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:opacity-50",
        className
      )}
    >
      {motion ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
    </button>
  );
};
