import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("theme"); } catch { /* Storage may be unavailable. */ }
    const light = stored === "light";
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch { /* Theme still works for this session. */ }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={isLight ? "다크 모드로 전환" : "라이트 모드로 전환"}
      className={cn(
        "glass-control inline-flex h-11 w-16 items-center rounded-full",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-2 h-7 w-7 rounded-full bg-gradient-primary shadow-sm transition-transform duration-300 flex items-center justify-center",
          isLight ? "translate-x-8" : "translate-x-1"
        )}
      >
        {isLight ? (
          <Sun className="h-3.5 w-3.5 text-primary-foreground" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-primary-foreground" />
        )}
      </span>
      <Sun className={cn("absolute left-2 h-3.5 w-3.5 transition-opacity", isLight ? "opacity-0" : "opacity-40 text-muted-foreground")} />
      <Moon className={cn("absolute right-2 h-3.5 w-3.5 transition-opacity", isLight ? "opacity-40 text-muted-foreground" : "opacity-0")} />
    </button>
  );
};
