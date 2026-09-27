import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
const jobs = [
  { company: "다이트랩", role: "데이터분석지원", period: "2023.10 — 2024.01", label: "DATA",
    summary: "데이터 이관 및 CRM 통계 시스템 구축",
    points: ["신규 CRM 데이터 전처리 및 이관", "SQL로 CRM 데이터 추출 후 Looker Studio 통계 페이지 구현", "원내 실무자 대상 결제·고객 실적 조회 시스템 제공 및 가이드", "AHK 기반 업무 자동화 프로그램 개발"] },
  { company: "사소한", role: "자산 & 인프라 관리", period: "2022.02 — 2022.08", label: "OPS",
    summary: "사내 IT 자산 관리 및 시스템 운영",
    points: ["IT Helpdesk · 계정 및 솔루션 관리", "사내 전산자원 & PC 유지보수", "사내 솔루션 문의 응대 및 운영 지원", "반복 업무 자동화 스크립트 개발"] },
  { company: "대한민국 육군", role: "정보체계운용 담당관", period: "2016.03 — 2018.06", label: "INFRA",
    summary: "군 정보체계 시스템 운용 및 유지보수",
    points: ["군 정보체계 24/7 운용 및 장애 대응", "시스템 유지보수 및 정기 점검 수행", "사용자 대상 IT Helpdesk 운영"] },
];
export const Experience = () => (
  <section id="experience" className="border-t border-border py-20 md:py-32">
    <Reveal className="mb-14 grid gap-8 lg:grid-cols-2">
      <div>
        <p className="eyebrow mb-5 text-[10px] text-primary-glow">03 / Experience</p>
        <h2 className="font-display text-5xl tracking-tighter md:text-7xl">경험이 쌓이면,<br /><span className="text-muted-foreground">시야는 넓어집니다.</span></h2>
      </div>
      <p className="max-w-sm self-end text-sm leading-7 text-muted-foreground lg:justify-self-end">시스템이 작동하는 원리를 이해하고,<br />데이터가 만드는 가능성으로 나아갑니다.</p>
    </Reveal>
    {jobs.map((job, index) => (
      <Reveal key={job.company} className="relative grid gap-6 border-t border-border py-9 md:grid-cols-[0.65fr_1fr_1.5fr] md:gap-10 md:py-12">
        <div className="self-start text-muted-foreground">
          <p className="mb-2 text-[10px]">{job.label === "INFRA" ? "복무 기간" : "재직 기간"}</p>
          <p className="flex items-center gap-3 font-mono text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" aria-hidden />
            {job.period}
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[10px] tracking-widest text-primary-glow">0{index + 1} / {job.label}</p>
          <h3 className="font-display text-2xl md:text-3xl">{job.company}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{job.role}</p>
        </div>
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold">{job.summary}<ArrowUpRight className="h-4 w-4 shrink-0 text-primary-glow" aria-hidden /></p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            {job.points.map((point) => <li key={point} className="flex gap-3"><span aria-hidden className="text-primary-glow">—</span>{point}</li>)}
          </ul>
        </div>
      </Reveal>
    ))}
  </section>
);
