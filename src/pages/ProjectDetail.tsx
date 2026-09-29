import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ZoomIn, BarChart3, FileText, Download } from "lucide-react";
import { getProjectBySlug, getProjectStatusLabel } from "@/data/projects";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TopNav } from "@/components/portfolio/TopNav";
import { Reveal } from "@/components/Reveal";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);


  if (!project) return <NotFound />;

  const Icon = project.icon;
  const isLive = project.status === "Live";
  const evidence = project.evidence;

  return (
    <div className="project-page min-h-screen bg-background text-foreground animate-fade-in">
      <TopNav />
      <main className="pt-24 md:pt-[6.5rem]">
        {/* Keep the project context aligned with the floating main navigation. */}
        <div className="pointer-events-none sticky top-24 z-30 px-4 md:top-[6.5rem]">
          <nav aria-label="프로젝트 내비게이션" className="glass-panel pointer-events-auto mx-auto flex max-w-5xl items-center gap-3 rounded-3xl p-2 sm:gap-4 sm:rounded-full sm:px-3">
            <Link
              to="/#projects"
              className="glass-control group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="프로젝트 목록으로 돌아가기"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none" aria-hidden />
              <span className="hidden sm:inline">프로젝트 목록</span>
            </Link>
            <span className="h-5 w-px shrink-0 bg-border" aria-hidden />
            <p aria-current="page" title={project.title} className="min-w-0 flex-1 truncate text-xs font-medium tracking-tight text-foreground/85 sm:text-sm">
              {project.title}
            </p>
            {project.status && (
              <span className="mr-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-[10px] font-medium text-muted-foreground sm:mr-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", isLive ? "bg-primary-glow" : "bg-emerald-500")} aria-hidden />
                {getProjectStatusLabel(project.status)}
              </span>
            )}
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 pt-10 pb-16 md:pt-12 md:pb-20 animate-fade-in" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="glass-control glass-icon h-14 w-14 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary-glow" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{project.org}</p>
              {project.status && <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  isLive
                    ? "bg-primary/20 text-primary-glow"
                    : "bg-emerald-500/15 text-emerald-300 [.light_&]:text-emerald-800"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isLive ? "bg-primary-glow animate-pulse" : "bg-emerald-400"
                  )}
                />
                {getProjectStatusLabel(project.status)}
              </span>}
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            {project.overview}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-xs">
            {project.period && (
              <div><dt className="mb-1.5 text-muted-foreground">수행 기간</dt><dd>{project.period}</dd></div>
            )}
            {project.dataPeriod && (
              <div><dt className="mb-1.5 text-muted-foreground">데이터 기준 기간</dt><dd>{project.dataPeriod}</dd></div>
            )}
            <div>
              <dt className="mb-1.5 text-muted-foreground">내용 검토일</dt>
              <dd><time dateTime={project.reviewedAt}>{project.reviewedAt.replace(/-/g, ".")}</time></dd>
            </div>
          </dl>
        </div>

        <a href={project.externalHref} target="_blank" rel="noopener noreferrer" className="glass-control mb-10 inline-flex min-h-11 items-center rounded-full px-5 text-sm">원본 프로젝트 열기 ↗</a>

        {/* Implementation outcome + tags */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Reveal className="glass-card glass-card--accent rounded-2xl p-6">
            <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">
              구현 결과
            </p>
            <p className="text-sm leading-7 text-foreground/90">
              {project.caseStudy.result}
            </p>
          </Reveal>
          <Reveal delay={120} className="glass-card md:col-span-2 rounded-2xl p-6">
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">
              본인 사용 기술
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono text-foreground/90 bg-muted/60 border border-border rounded-md px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
            {project.teamStack && project.teamStack.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-[10px] text-muted-foreground">팀 사용 기술</p>
                <ul className="flex flex-wrap gap-2">
                  {project.teamStack.map((tool) => <li key={tool} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">{tool}</li>)}
                </ul>
              </div>
            )}
          </Reveal>
        </div>

        <section id="evidence" aria-labelledby="evidence-heading" className="mb-12 scroll-mt-44">
          <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-2">대표 결과물</p>
          <h2 id="evidence-heading" className="font-display text-2xl mb-5">{evidence.title}</h2>
          {evidence.kind === "image" ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,1fr)]">
              <figure className="min-w-0">
                <button
                  type="button"
                  aria-label={`${evidence.title} 확대 보기`}
                  onClick={() => setLightbox({ src: evidence.src, alt: evidence.alt })}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted/30 p-3 shadow-elevated transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img src={evidence.src} alt={evidence.alt} loading="lazy" className="mx-auto max-h-[28rem] w-full object-contain" />
                  <span className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-full bg-background/90 px-3 text-xs text-foreground/90">
                    <ZoomIn className="h-3.5 w-3.5" aria-hidden />화면 확대
                  </span>
                </button>
                <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">{evidence.caption}</figcaption>
              </figure>
              <div className="glass-card rounded-2xl p-5">
                <p className="mb-4 text-sm font-semibold">화면에서 볼 수 있는 내용</p>
                <ul className="space-y-4">
                  {evidence.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-foreground/80">
                      <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary-glow" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 md:p-6">
              <p className="mb-5 text-sm leading-7 text-muted-foreground">{evidence.caption}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {evidence.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="group rounded-xl border border-border bg-background/50 p-5 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <FileText className="mb-4 h-6 w-6 text-primary-glow" aria-hidden />
                    <span className="block text-sm font-semibold">{link.title} ↗</span>
                    <span className="mt-2 block text-xs leading-6 text-muted-foreground">{link.description}</span>
                  </a>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-xs leading-6 text-muted-foreground">
                {evidence.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          )}
        </section>

        {/* Role */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">본인 역할</h2>
          <ul className="space-y-3">
            {project.role.map((r, i) => (
              <Reveal
                as="li"
                key={r}
                delay={i * 80}
                className="glass-card flex items-start gap-3 rounded-xl p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-primary-glow flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{r}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">구현 내용</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {project.highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 100}
                className="glass-card rounded-2xl p-5"
              >
                <p className="font-display text-lg text-gradient mb-2">
                  {h.title}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {h.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>


        {/* Live embed (e.g. Looker Studio) */}
        {project.embedUrl && (
          <section className="mb-12">
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                EXTERNAL DASHBOARD
              </p>
              <h2 className="font-display text-2xl">{project.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {project.embedCaption ?? "Looker Studio 대시보드를 외부 서비스에서 열어봅니다. 대표 결과물과 갤러리에서도 화면 구성을 확인할 수 있습니다."}
              </p>
            </div>
            <div className="bezel-border relative rounded-2xl bg-gradient-card shadow-elevated overflow-hidden">
              <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-background/40 backdrop-blur">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-4 w-4 text-primary-glow" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm truncate">{project.embedAppName ?? project.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {project.embedPoweredBy ?? "Powered by Looker Studio"}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/15 text-primary-glow px-2.5 py-1 text-[10px] font-semibold">
                  외부 데모
                </span>
              </div>
              <div className="relative aspect-video bg-background/60">
                <iframe
                  title={`${project.title} 외부 대시보드`}
                  src={project.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  frameBorder={0}
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </div>
          </section>
        )}

        {/* Galleries (grouped) */}
        {project.galleries && project.galleries.length > 0 && (
          <section className="mb-12 space-y-10">
            {project.galleries.map((g) => (
              <div key={g.title}>
                <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                      SECTION
                    </p>
                    <h2 className="font-display text-2xl">{g.title}</h2>
                    {g.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {g.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {g.images.length} {g.images.length === 1 ? "screen" : "screens"}
                  </span>
                </div>
                <div
                  className={cn(
                    "grid gap-4",
                    g.images.length > 1 && "sm:grid-cols-2"
                  )}
                >
                  {g.images.map((src, i) => (
                    <Reveal key={src} delay={i * 100}>
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            src,
                            alt: `${g.title} screenshot ${i + 1}`,
                          })
                        }
                        className={cn(
                          "group relative w-full block rounded-2xl border border-border bg-muted/30 overflow-hidden shadow-elevated hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                          g.images.length === 1 ? "aspect-[16/7]" : "aspect-[4/3]"
                        )}
                      >
                        <img
                          src={src}
                          alt={`${g.title} screenshot ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <span className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="h-4 w-4" />
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* PDF embed */}
        {project.pdfUrl && (
          <section className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                  DOCUMENT
                </p>
                <h2 className="font-display text-2xl">졸업작품 보고서</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  프로젝트 진행 과정과 결과를 정리한 PDF 보고서입니다.
                </p>
              </div>
              <a
                href={project.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:text-primary-glow text-foreground/90 px-4 py-2 text-xs font-semibold transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-card overflow-hidden shadow-elevated">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40 text-[11px] font-mono text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-primary-glow" />
                graduation-report.pdf
              </div>
              <iframe
                title="졸업작품 보고서"
                src={`${project.pdfUrl}#view=FitH`}
                className="w-full h-[80vh] bg-background"
                loading="lazy"
              />
            </div>
          </section>
        )}

        </div>
      </main>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl p-2 bg-background/95 border-border" aria-describedby={undefined}>
          <DialogTitle className="sr-only">{lightbox?.alt ?? "프로젝트 이미지 확대"}</DialogTitle>
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
