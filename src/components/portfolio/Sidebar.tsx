import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Briefcase, FolderKanban, Mail, BarChart3, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { projects } from "@/data/projects";
import { smoothScrollTo, smoothScrollToId } from "@/lib/smooth-scroll";

const items = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Sidebar = () => {
  const [active, setActive] = useState("about");
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith("/projects/");
  const activeSlug = isProjectDetail ? location.pathname.split("/projects/")[1] : null;

  useEffect(() => {
    if (isProjectDetail) {
      setActive("projects");
      setProjectsOpen(true);
      return;
    }

    const sectionEls = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (sectionEls.length === 0) return;

    // Track each section's intersection ratio; pick the most-visible one.
    const ratios = new Map<string, number>();

    const pickActive = () => {
      // Bottom of page → force last section active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(items[items.length - 1].id);
        return;
      }
      // Top of page → force first section active
      if (window.scrollY < 80) {
        setActive(items[0].id);
        return;
      }
      let bestId = active;
      let bestRatio = -1;
      ratios.forEach((r, id) => {
        if (r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      });
      setActive(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        pickActive();
      },
      {
        // Account for sticky header (~64px) at top
        rootMargin: "-72px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const onScroll = () => pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    pickActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProjectDetail]);

  const scrollToSection = (id: string) => {
    if (id === "about") {
      smoothScrollTo(0);
      return;
    }
    smoothScrollToId(id);
  };

  const go = (id: string) => {
    setActive(id);
    if (isProjectDetail) {
      setMobileOpen(false);
      navigate(`/#${id}`);
      return;
    }
    if (mobileOpen) {
      // Let the drawer close (and layout settle) before animating.
      setMobileOpen(false);
      window.setTimeout(() => scrollToSection(id), 260);
      return;
    }
    scrollToSection(id);
  };

  const goProject = (slug: string) => {
    setMobileOpen(false);
    navigate(`/projects/${slug}`);
  };

  const renderProjectsGroup = (variant: "desktop" | "mobile") => {
    if (variant === "mobile") {
      return null; // handled inline below
    }
    return (
      <div className="flex flex-col">
        <button
          onClick={() => {
            setProjectsOpen((o) => !o);
            go("projects");
          }}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
            active === "projects"
              ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          )}
        >
          <FolderKanban
            className={cn(
              "h-4 w-4 transition-colors",
              active === "projects" && "text-primary-glow"
            )}
          />
          <span className="font-medium">Projects</span>
          <ChevronDown
            className={cn(
              "ml-auto h-3.5 w-3.5 transition-transform",
              projectsOpen && "rotate-180"
            )}
          />
        </button>
        {projectsOpen && (
          <ul className="mt-1 ml-3 pl-4 border-l border-border/60 flex flex-col gap-0.5 py-1">
            {projects.map((p) => {
              const isActiveSub = activeSlug === p.slug;
              return (
                <li key={p.slug}>
                  <button
                    onClick={() => goProject(p.slug)}
                    className={cn(
                      "w-full text-left rounded-md px-2.5 py-1.5 text-xs transition-colors truncate",
                      isActiveSub
                        ? "bg-primary/10 text-primary-glow"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                    )}
                    title={p.title}
                  >
                    {p.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl px-6 py-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-base">이승헌</p>
            <p className="text-xs text-muted-foreground">Data Analyst</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto pr-1">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 px-3">NAVIGATION</p>
          {items.map(({ id, label, icon: Icon }) => {
            if (id === "projects") return <div key={id}>{renderProjectsGroup("desktop")}</div>;
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 transition-colors", isActive && "text-primary-glow")} />
                <span className="font-medium">{label}</span>
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-glow shadow-glow" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-card/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-muted-foreground">Available for hire</p>
          </div>
          <p className="text-xs text-foreground/80 leading-relaxed">
            데이터로 비즈니스 임팩트를 만들 기회를 찾고 있습니다.
          </p>
        </div>
      </aside>

      {/* Desktop floating theme toggle */}
      <div className="hidden lg:block fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <button
            onClick={() => go("about")}
            className="flex items-center gap-2 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
            aria-label="홈으로 이동"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm">이승헌</span>
          </button>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle className="!h-8 !w-14" />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-card/60 text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="메뉴 열기"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] max-w-xs bg-sidebar/95 backdrop-blur-xl border-border p-0 flex flex-col">
                <SheetHeader className="px-5 pt-6 pb-4 border-b border-border text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                      <BarChart3 className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-base">이승헌</p>
                      <p className="text-xs text-muted-foreground font-normal">Data Analyst</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-2 px-3">NAVIGATION</p>
                  {items.map(({ id, label, icon: Icon }) => {
                    const isActive = active === id;
                    if (id === "projects") {
                      return (
                        <div key={id} className="flex flex-col">
                          <button
                            onClick={() => {
                              setProjectsOpen((o) => !o);
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                              isActive
                                ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                            )}
                          >
                            <FolderKanban className={cn("h-4 w-4", isActive && "text-primary-glow")} />
                            <span className="font-medium">Projects</span>
                            <ChevronDown className={cn("ml-auto h-3.5 w-3.5 transition-transform", projectsOpen && "rotate-180")} />
                          </button>
                          <button
                            onClick={() => go("projects")}
                            className="text-[11px] text-muted-foreground hover:text-foreground self-start ml-10 mt-1 mb-1"
                          >
                            ↓ 섹션으로 스크롤
                          </button>
                          {projectsOpen && (
                            <ul className="ml-3 pl-4 border-l border-border/60 flex flex-col gap-0.5 py-1">
                              {projects.map((p) => {
                                const isActiveSub = activeSlug === p.slug;
                                return (
                                  <li key={p.slug}>
                                    <button
                                      onClick={() => goProject(p.slug)}
                                      className={cn(
                                        "w-full text-left rounded-md px-2.5 py-1.5 text-xs transition-colors",
                                        isActiveSub
                                          ? "bg-primary/10 text-primary-glow"
                                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                                      )}
                                    >
                                      {p.title}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={id}
                        onClick={() => go(id)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                          isActive
                            ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                      >
                        <Icon className={cn("h-4 w-4", isActive && "text-primary-glow")} />
                        <span className="font-medium">{label}</span>
                        {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-glow shadow-glow" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="m-4 mt-0 rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-muted-foreground">Available for hire</p>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    데이터로 비즈니스 임팩트를 만들 기회를 찾고 있습니다.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

