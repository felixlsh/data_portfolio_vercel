import { useRef, type MouseEvent } from "react";
import { ArrowUpRight, AlertCircle, Lightbulb, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { getProjectStatusLabel } from "@/data/projects";

const steps = [
  { key: "problem" as const, label: "문제", Icon: AlertCircle },
  { key: "solution" as const, label: "해결", Icon: Lightbulb },
  { key: "result" as const, label: "성과", Icon: Trophy },
];

export const CaseStudyCard = ({
  p,
  index,
  onOpen,
}: {
  p: Project;
  index: number;
  onOpen?: (p: Project) => void;
}) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const { ref: viewRef, inView } = useInView<HTMLAnchorElement>();

  const setRefs = (el: HTMLAnchorElement | null) => {
    cardRef.current = el;
    viewRef.current = el;
  };

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(p);
  };

  if (!p.caseStudy) return null;

  return (
    <Link
      ref={setRefs}
      to={`/projects/${p.slug}`}
      onMouseMove={onMove}
      onClick={onClick}
      className={cn(
        "shine group relative block rounded-2xl border border-primary/40 bg-gradient-card p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-elevated opacity-0",
        inView && "animate-fade-up"
      )}
      style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary-glow) / 0.18), transparent 45%)",
        }}
      />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-[2]">
        <div className="flex items-start justify-between mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary-glow">
            데이터 분석 사례
          </div>
          {p.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold bg-emerald-500/15 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {getProjectStatusLabel(p.status)}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-1">{p.org}</p>
        <h3 className="font-display text-2xl mb-5">{p.title}</h3>

        {/* PSR flow */}
        <div className="space-y-5">
          {steps.map(({ key, label, Icon }, i) => (
            <div key={key} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-glow">{i + 1}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2 min-h-[24px]" />
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="h-3.5 w-3.5 text-primary-glow" />
                  <span className="text-xs font-semibold text-primary-glow tracking-wide">{label}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{p.caseStudy[key]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-4 pt-5 border-t border-border mt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] font-mono text-muted-foreground bg-muted/50 rounded-md px-2 py-1">
                {t}
              </span>
            ))}
          </div>
          {p.metric && (
            <div className="text-right flex-shrink-0">
              <p className="font-display text-2xl text-gradient tabular-nums leading-none">{p.metric.v}</p>
              <p className="text-[10px] text-muted-foreground mt-1 tracking-wider">{p.metric.l}</p>
            </div>
          )}
        </div>

        <ArrowUpRight className="absolute -top-1 -right-1 h-5 w-5 text-muted-foreground opacity-40 group-hover:opacity-100 group-hover:text-primary-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
};
