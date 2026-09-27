import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const THRESHOLD = 400;

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", onChange);

    const onScroll = () => {
      setVisible(window.scrollY > THRESHOLD);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      mediaQuery.removeEventListener("change", onChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 스크롤"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "border border-border/60 bg-background/80 backdrop-blur-xl shadow-lg",
        "text-foreground transition-all duration-300 ease-out",
        "hover:bg-primary hover:text-primary-foreground hover:shadow-glow hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-90 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

