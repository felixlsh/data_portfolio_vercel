import { Briefcase, Zap, FileSpreadsheet, Repeat, Bell, Clock } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const automation = [
  {
    icon: FileSpreadsheet,
    title: "엑셀 편집 자동화",
    desc: "AutoHotkey로 포맷 변환·셀 병합·정리 작업을 단일 핫키에 묶어 로컬에서 즉시 실행. Zapier는 완성된 파일을 지정 경로·드라이브로 자동 백업하고 담당자에게 공유.",
    tools: ["AutoHotkey", "Zapier"],
    metric: "↓ 85%",
    metricLabel: "처리 시간",
  },
  {
    icon: Repeat,
    title: "반복 작업 효율화",
    desc: "AutoHotkey로 PC 내 반복 매크로(파일 분류·보고서 생성)를 처리. Zapier는 앱 간 트리거 연결부터 다단계 분기 시나리오까지 맡아 워크플로우 전체를 자동화.",
    tools: ["AutoHotkey", "Zapier"],
    metric: "10+",
    metricLabel: "자동화 시나리오",
  },
  {
    icon: Bell,
    title: "실시간 웹 모니터링 알림",
    desc: "GCP 인스턴스에서 Python 스크립트를 상시 구동, 타겟 웹사이트를 5~15초 주기로 폴링. 키워드·변경 감지 시 Telegram Bot이 즉시 Alert를 전송해 기회·이슈를 놓치지 않게 함.",
    tools: ["Python", "GCP", "Telegram Bot"],
    metric: "5~15s",
    metricLabel: "폴링 주기",
  },
  {
    icon: Clock,
    title: "주기적 업무 보고",
    desc: "Zapier가 정기 트리거로 데이터를 수집하고 가공·시각화·배포 시나리오를 실행. Discord Bot은 완료 알림과 핵심 지표 요약을 매일 정해진 시간에 자동 전달.",
    tools: ["Zapier", "Discord Bot"],
    metric: "24/7",
    metricLabel: "무인 실행",
  },
];

const AutomationCard = ({ item, index }: { item: (typeof automation)[number]; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl border border-border bg-gradient-card p-6 overflow-hidden hover:border-primary/40 transition-colors opacity-0",
        inView && "animate-fade-up"
      )}
      style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="text-right">
            <p className="font-display text-xl text-gradient tabular-nums leading-none">{item.metric}</p>
            <p className="text-[10px] text-muted-foreground mt-1 tracking-wider">{item.metricLabel}</p>
          </div>
        </div>
        <h4 className="font-display text-lg mb-2">{item.title}</h4>
        <p className="text-sm text-foreground/75 leading-relaxed mb-4">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tools.map((t) => (
            <span
              key={t}
              className="rounded-md bg-primary/10 border border-primary/20 text-primary-glow px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Automation = () => {
  const headerView = useInView<HTMLDivElement>();

  return (
    <section id="automation" className="py-20 lg:py-24">
      <div
        ref={headerView.ref}
        className={cn(
          "flex items-end justify-between mb-10 opacity-0",
          headerView.inView && "animate-fade-up"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">01.5 — AUTOMATION</p>
            <h3 className="font-display text-2xl md:text-3xl">업무 자동화</h3>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
              반복되는 업무를 스크립트와 워크플로우로 압축하여 진짜 일에 집중할 시간을 만들기
            </p>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary-glow px-3 py-1.5 text-[10px] font-semibold flex-shrink-0">
          <Briefcase className="h-3 w-3" />
          ONGOING TOOLKIT
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {automation.map((item, i) => (
          <AutomationCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

