import { Link } from "react-router-dom";
import { AlertCircle, Lightbulb, Trophy, Layers, ArrowUpRight, ListChecks } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Section = ({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof AlertCircle;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-muted/20 p-4">
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className="h-3.5 w-3.5 text-primary-glow" />
      <span className="text-xs font-semibold tracking-wide text-primary-glow">{label}</span>
    </div>
    {children}
  </div>
);

export const ProjectModal = ({ project, open, onOpenChange }: Props) => {
  if (!project) return null;
  const p = project;
  const Icon = p.icon;
  const cs = p.caseStudy;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-primary-glow" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{p.org}</p>
              <DialogTitle className="font-display text-xl leading-tight">{p.title}</DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-left text-sm leading-relaxed">
            {p.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Section icon={AlertCircle} label="문제">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {cs?.problem ?? p.overview}
            </p>
          </Section>

          <Section icon={Lightbulb} label="과정">
            {cs?.solution && (
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{cs.solution}</p>
            )}
            <ul className="space-y-1.5">
              {p.role.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                  <ListChecks className="h-3.5 w-3.5 mt-1 flex-shrink-0 text-primary-glow/70" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Trophy} label="결과">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {cs?.result ?? p.highlights[0]?.body}
            </p>
            {p.metric && (
              <div className="mt-3 inline-flex items-baseline gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
                <span className="font-display text-xl text-gradient tabular-nums leading-none">
                  {p.metric.v}
                </span>
                <span className="text-[11px] text-muted-foreground tracking-wide">{p.metric.l}</span>
              </div>
            )}
          </Section>

          <Section icon={Layers} label="기술 스택">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-mono text-muted-foreground bg-muted/50 rounded-md px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        </div>

        <div className="flex justify-end pt-1">
          <Link
            to={`/projects/${p.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs text-primary-glow hover:bg-primary/20 transition-colors"
          >
            상세 페이지 보기
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
