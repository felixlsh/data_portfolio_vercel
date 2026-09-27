import { ArrowUpRight } from "lucide-react";
import { DataSculpture } from "./DataSculpture";
import { smoothScrollToId } from "@/lib/smooth-scroll";

const coreSkills = ["SQL", "Python", "Pandas", "Looker Studio"];

export const Hero = () => {
  return (
    <section
      id="about"
      className="relative pt-28 pb-8 md:pt-32 lg:pt-28 lg:pb-10"
    >
      <div className="grid w-full items-center gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left — editorial headline */}
        <div className="relative z-10 min-w-0">
          <p
            className="flex flex-wrap items-baseline gap-x-4 gap-y-2 animate-fade-up"
            style={{ animationDelay: "40ms" }}
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
              이승헌
            </span>
            <span className="font-mono text-xs tracking-[0.04em] text-muted-foreground sm:text-sm">
              Data Analyst <span className="text-primary-glow">/</span> BI
            </span>
          </p>

          <h1
            className="mt-5 font-display text-[clamp(1.85rem,8vw,3.4rem)] font-bold leading-[1.15] tracking-[-0.045em] animate-fade-up lg:text-[clamp(2.7rem,4.2vw,3.6rem)]"
            style={{ animationDelay: "120ms" }}
          >
            <span className="block">실적을 한눈에,</span>
            <span className="block">
              반복 업무는 <span className="text-gradient">자동으로.</span>
            </span>
          </h1>

          <p
            className="mt-5 max-w-[36rem] text-sm leading-7 text-muted-foreground animate-fade-up sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            <span className="font-medium text-foreground">SQL과 Looker Studio</span>로 CRM 실적 조회 화면을 구축하고,{" "}
            <span className="font-medium text-foreground">AHK</span>로 반복 업무를 자동화했습니다.{" "}
            ROK 데이터 파이프라인에는 <span className="font-medium text-foreground">Zapier</span>를,{" "}
            회사 문서 업무에는 <span className="font-medium text-foreground">AI</span>를 활용했습니다.
          </p>

          <ul
            aria-label="핵심 기술"
            className="mt-5 flex flex-wrap gap-2 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            {coreSkills.map((skill) => (
              <li key={skill} className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-[11px] font-medium text-foreground/90 sm:text-xs">
                {skill}
              </li>
            ))}
          </ul>

          <div
            className="mt-6 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <button
              type="button"
              onClick={() => smoothScrollToId("projects")}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:px-6"
            >
              대표 프로젝트 보기
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => smoothScrollToId("contact")}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground/90 transition-colors hover:border-primary/50 hover:text-foreground sm:px-6"
            >
              연락하기
            </button>
          </div>
        </div>

        {/* Right — conceptual data sculpture */}
        <div className="relative animate-fade-in" style={{ animationDelay: "220ms" }}>
          <DataSculpture className="mx-auto h-[180px] w-full max-w-[320px] sm:h-[220px] sm:max-w-[400px] lg:h-[360px] lg:max-w-[460px]" />
          <p className="mt-1 text-center font-mono text-[9px] tracking-[0.28em] text-muted-foreground/70">
            DATA IN MOTION
          </p>
        </div>
      </div>
    </section>
  );
};
