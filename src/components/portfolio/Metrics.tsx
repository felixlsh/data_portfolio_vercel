import { CountUp } from "@/components/CountUp";

const items = [
  { render: () => <CountUp value={1000} suffix="+" />, label: "분석 계정", sub: "Rise of Kingdoms" },
  { render: () => <>4년+</>, label: "데이터 경력", sub: "취미 · 실무 포함" },
  { render: () => <CountUp value={3} />, label: "주요 프로젝트", sub: "Data viz & 자동화" },
];

export const Metrics = () => (
  <section className="py-16 md:py-24">
    <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
      {items.map((it, i) => (
        <div key={it.label} className="border-t border-border/70 pt-6">
          <span className="eyebrow text-[10px] text-muted-foreground">0{i + 1}</span>
          <p className="display-xl mt-4 text-[2.75rem] tabular-nums md:text-[3.5rem]">{it.render()}</p>
          <p className="mt-3 text-sm font-semibold text-foreground">{it.label}</p>
          <p className="text-xs text-muted-foreground">{it.sub}</p>
        </div>
      ))}
    </div>
  </section>
);

