import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { MotionToggle } from "@/components/MotionToggle";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
const items = [
  { id: "about", label: "About" }, { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" }, { id: "contact", label: "Contact" },
];
export const TopNav = () => {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let next = "about";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) next = item.id;
      }
      setActive(next);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, [pathname]);
  const links = (mobile = false) => items.map((item) => (
    <Link key={item.id} to={"/#" + item.id} onClick={() => { setOpen(false); setActive(item.id); }}
      aria-current={pathname === "/" && active === item.id ? "location" : undefined}
      className={cn("relative rounded-full text-sm transition-colors",
        mobile ? "block px-5 py-3" : "px-4 py-2.5",
        pathname === "/" && active === item.id ? "bg-foreground/[0.07] text-foreground" : "text-muted-foreground hover:text-foreground")}>{item.label}</Link>
  ));
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 md:top-6">
        <nav aria-label="주요 메뉴" className="glass-panel pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 rounded-full p-2 pl-5 md:gap-4">
          <Link to="/" onClick={() => setOpen(false)} className="font-display py-2 text-xl tracking-tight">Felix<span className="text-primary-glow">.</span></Link>
          <div className="mx-auto hidden items-center lg:flex">{links()}</div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div className="flex items-center gap-2"><MotionToggle /><ThemeToggle /></div>
            <Link to="/#contact" className="glass-control glass-cta hidden min-h-11 items-center gap-2 rounded-full px-5 text-xs font-semibold lg:inline-flex">연락하기<ArrowUpRight className="h-4 w-4" /></Link>
            <button ref={trigger} type="button" onClick={() => setOpen(!open)}
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open} aria-controls="mobile-navigation"
              className="glass-control flex h-11 w-11 items-center justify-center rounded-full lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        <div id="mobile-navigation" hidden={!open} className="glass-panel pointer-events-auto mx-auto mt-3 max-w-5xl rounded-3xl p-3 lg:hidden">
          {links(true)}
        </div>
      </header>
      {open && <button type="button" aria-label="메뉴 닫기" tabIndex={-1} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-background/20 lg:hidden" />}
    </>
  );
};
