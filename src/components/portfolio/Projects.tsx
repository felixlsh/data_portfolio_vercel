import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, getProjectStatusLabel } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const order = ["crm-dashboard", "ahk-automation", "election-dashboard", "rok-dashboard", "carad"];
const allProjects = order.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);
const summaryRows = [
  { key: "problem", label: "문제" },
  { key: "solution", label: "본인 역할" },
  { key: "result", label: "결과" },
] as const;
const anchors: Record<string, string> = {
  "election-dashboard": "election",
  "rok-dashboard": "rok",
  "ahk-automation": "automation",
};
const names: Record<string, string> = {
  "election-dashboard": "From a changing signal.",
  "rok-dashboard": "Every player. One picture.",
  "crm-dashboard": "A clearer business view.",
  "ahk-automation": "Make time for what matters.",
  carad: "An idea, connected.",
};

export const Projects = () => {
  return (
    <section id="projects" className="border-t border-border py-12 md:py-14">
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="eyebrow mb-3 text-[10px] text-primary-glow">01 / Selected work</p>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tighter md:text-5xl">
            생각은 깊게.<br /><span className="text-muted-foreground">결과는 명확하게.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-7 text-muted-foreground">
          데이터 수집부터 의사결정까지.<br />문제를 발견하고, 직접 만든 다섯 가지 답.
        </p>
      </Reveal>
      <p className="my-8 font-mono text-[10px] tracking-widest text-muted-foreground">
        {String(allProjects.length).padStart(2, "0")} PROJECTS
      </p>
      <div className="space-y-20 md:space-y-28">
        {allProjects.map((p) => {
          const index = order.indexOf(p.slug);
          const cover = p.image ?? p.galleries?.[0]?.images[0];
          const Icon = p.icon;
          return (
            <Reveal key={p.slug} id={anchors[p.slug]} className="scroll-mt-28">
              <Link to={"/projects/" + p.slug}
                className="work-entry group grid items-start gap-8 outline-offset-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
                aria-label={p.title + " 상세 보기"}>
                <div className={cn("work-cover relative flex aspect-[4/3] min-w-0 items-center justify-center overflow-hidden rounded-3xl border border-border p-6 md:p-10",
                  index % 2 === 1 && "lg:order-2")} data-tone={index % 3}>
                  <div className="work-orbit" aria-hidden />
                  {cover ? (
                    <img src={cover} alt={p.title + " 실제 프로젝트 화면"} loading="lazy"
                      className="work-image relative z-10 max-h-full w-full rounded-lg border border-white/10 object-contain shadow-2xl transition-transform duration-700" />
                  ) : (
                    <div className="relative text-center">
                      <Icon className="mx-auto mb-6 h-14 w-14 text-primary-glow" strokeWidth={1} aria-hidden />
                      <p className="font-display text-7xl tracking-tighter">CarAD<span className="text-primary-glow">.</span></p>
                      <p className="mt-6 font-mono text-[11px] tracking-widest text-muted-foreground">APP · API · DATABASE</p>
                      <p className="mt-3 text-sm text-muted-foreground">차량 광고 플랫폼</p>
                    </div>
                  )}
                  <span className="absolute left-6 top-5 font-mono text-[10px] tracking-wider text-muted-foreground">CASE / {String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:-rotate-45">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
                    {p.org}{p.status && <> / {getProjectStatusLabel(p.status)}</>}
                  </p>
                  {p.period && <p className="mb-3 text-xs text-muted-foreground">수행 기간 · {p.period}</p>}
                  <p className="mb-3 font-display text-xl text-primary-glow md:text-2xl">{names[p.slug]}</p>
                  <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">{p.title}</h3>
                  <dl className="mt-6 space-y-4 border-y border-border py-5">
                    {summaryRows.map(({ key, label }) => (
                      <div key={key} className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[4rem_minmax(0,1fr)]">
                        <dt className="pt-1 text-xs font-semibold text-muted-foreground">{label}</dt>
                        <dd className={cn("text-sm leading-7 text-muted-foreground", key === "result" && "font-medium text-foreground/90")}>
                          {p.caseStudy[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1 text-[10px] text-muted-foreground">{tag}</span>)}
                  </div>
                  <p className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold">상세 보기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
