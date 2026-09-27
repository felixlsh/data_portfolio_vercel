import { Link } from "react-router-dom";
import { ArrowUpRight, Braces, Database, BarChart3, Workflow } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const capabilities = [
  {
    title: "데이터 조회·집계", Icon: Database, tools: ["SQL"],
    description: "CRM 데이터를 추출·집계하고, 실적 조회 화면에 필요한 데이터를 구성했습니다.",
    projects: [{ slug: "crm-dashboard", label: "CRM 실적 대시보드" }],
  },
  {
    title: "데이터 수집·정제", Icon: Braces, tools: ["Python", "Pandas"],
    description: "개표 데이터의 변동을 비교하고, ROK의 시즌별 계정 데이터를 수집·정리했습니다.",
    projects: [{ slug: "election-dashboard", label: "개표 추이 대시보드" }, { slug: "rok-dashboard", label: "ROK Dashboard" }],
  },
  {
    title: "BI·시각화", Icon: BarChart3, tools: ["Looker Studio"],
    description: "실무자의 실적 조회와 계정별 KPI 비교를 위한 대시보드를 구축했습니다.",
    projects: [{ slug: "crm-dashboard", label: "CRM 실적 대시보드" }, { slug: "rok-dashboard", label: "ROK Dashboard" }],
  },
  {
    title: "업무 자동화", Icon: Workflow, tools: ["AHK", "Zapier"],
    description: "AHK로 반복 입력·포맷 정리 작업을, Zapier로 ROK 데이터 파이프라인을 자동화했습니다.",
    projects: [{ slug: "ahk-automation", label: "업무 자동화" }, { slug: "rok-dashboard", label: "ROK Dashboard" }],
  },
];

export const Skills = () => (
  <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-28 border-t border-border py-16 md:py-24">
    <Reveal className="mb-10 grid gap-6 lg:grid-cols-2">
      <div>
        <p className="eyebrow mb-4 text-[10px] text-primary-glow">02 / Skills in practice</p>
        <h2 id="skills-heading" className="font-display text-4xl leading-tight tracking-tighter md:text-5xl">
          기술을 이해하고,<br /><span className="text-muted-foreground">업무에 연결합니다.</span>
        </h2>
      </div>
      <p className="max-w-sm self-end text-sm leading-7 text-muted-foreground lg:justify-self-end">
        어떤 도구를 썼는지, 무엇을 구현했는지.<br />관련 프로젝트에서 활용 경험을 확인할 수 있습니다.
      </p>
    </Reveal>

    <div className="grid gap-4 md:grid-cols-2">
      {capabilities.map(({ title, Icon, tools, description, projects }, index) => (
        <Reveal key={title} delay={index * 60} className="group rounded-2xl border border-border bg-gradient-card p-6 hover:border-primary/40 md:p-7">
          <div className="mb-4 flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary-glow" aria-hidden />
            <h3 className="font-display text-xl">{title}</h3>
          </div>
          <ul aria-label={`${title} 도구`} className="mb-4 flex flex-wrap gap-2">
            {tools.map((tool) => <li key={tool} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-foreground/90">{tool}</li>)}
          </ul>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 border-t border-border pt-3">
            {projects.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} aria-label={`${title} 활용 사례: ${project.label}`}
                className="inline-flex min-h-11 items-center gap-1.5 text-xs text-foreground/90 transition-colors hover:text-primary-glow focus-visible:outline-offset-4">
                {project.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </Reveal>
      ))}
    </div>

    <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2 md:gap-10">
      <Reveal>
        <h3 className="mb-3 text-sm font-semibold">함께 활용한 개발 기술</h3>
        <p className="text-xs leading-6 text-muted-foreground">Node.js · Express · MongoDB · REST API</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">CarAD에서 Android 앱과 연결되는 백엔드와 데이터 저장 구조를 구현했습니다.</p>
        <Link to="/projects/carad" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs text-foreground/90 hover:text-primary-glow focus-visible:outline-offset-4">
          CarAD 백엔드·DB 사례<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </Reveal>
      <Reveal delay={80}>
        <h3 className="mb-3 text-sm font-semibold">문서 업무에서의 AI 활용</h3>
        <p className="text-sm leading-7 text-muted-foreground">회사 문서 업무에 AI를 활용했습니다.</p>
      </Reveal>
    </div>
  </section>
);
