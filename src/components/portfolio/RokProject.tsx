import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { TrendingUp, Users, Trophy, Target, Gamepad2, ExternalLink, BarChart3, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/Reveal";

const data = [
  { week: "W1", active: 612, kills: 1.2, power: 38 },
  { week: "W2", active: 684, kills: 1.8, power: 42 },
  { week: "W3", active: 731, kills: 2.4, power: 47 },
  { week: "W4", active: 802, kills: 3.1, power: 53 },
  { week: "W5", active: 848, kills: 4.0, power: 58 },
  { week: "W6", active: 901, kills: 5.2, power: 64 },
  { week: "W7", active: 947, kills: 6.4, power: 71 },
  { week: "W8", active: 1012, kills: 7.9, power: 78 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-popover/95 backdrop-blur px-4 py-3 shadow-elevated">
      <p className="text-[10px] tracking-widest text-muted-foreground mb-2">{label} · 2025 SEASON</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-xs text-foreground">
            <span className="h-2 w-2 rounded-full bg-primary-glow" />
            Active Users
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums">{payload[0].value}</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-xs text-foreground">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Kill Points (M)
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums">{payload[1]?.value}</span>
        </div>
      </div>
    </div>
  );
};

export const RokProject = () => {
  const peak = useMemo(() => Math.max(...data.map((d) => d.active)), []);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="py-12">
      {/* Header — clickable, links to project detail */}
      <Link
        to="/projects/rok-dashboard"
        aria-label="ROK Dashboard 프로젝트 상세 보기"
        className="group flex items-start justify-between gap-4 mb-8 rounded-2xl -mx-3 px-3 py-2 transition-all duration-300 hover:bg-primary/5 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Gamepad2 className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Featured Case Study</p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl break-keep inline-flex items-center gap-2">
              Rise of Kingdoms 데이터 분석
              <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-glow" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              1,000여 개 계정의 시즌별 활동을 수집·가공·시각화한 장기 분석 프로젝트
            </p>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary-glow px-3 py-1.5 text-[10px] font-semibold flex-shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
          IN PROGRESS
        </span>
      </Link>

      {/* Chart + Stats grid */}
      <div className="grid lg:grid-cols-5 gap-5 mb-5">
        {/* Chart card */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-gradient-card p-5 md:p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground">USER ACTIVITY</p>
              <h4 className="font-display text-lg mt-1">유저 활동 지표 · 8주 추이</h4>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary-glow" /> Active
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Kills
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mt-4 mb-2">
            <p className="font-display text-4xl tabular-nums text-gradient">{peak.toLocaleString()}</p>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +65.4%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Peak weekly active accounts</p>

          <div className="h-[260px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 6" vertical={false} />
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--primary-glow))", strokeOpacity: 0.3, strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--primary-glow))"
                  strokeWidth={2.5}
                  fill="url(#gradActive)"
                  dot={{ fill: "hsl(var(--primary-glow))", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "hsl(var(--primary-glow))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="kills"
                  stroke="hsl(199 89% 60%)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">KEY OUTCOME</p>
              <p className="font-display text-3xl leading-tight">
                <span className="text-gradient">1,000+</span> 계정
              </p>
              <p className="text-sm text-foreground/85 mt-3 leading-relaxed">
                계정 데이터 수집 및 시각화로 길드 운영 의사결정의 핵심 인사이트 제공
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, v: "1,012", l: "Active Accounts" },
              { icon: Trophy, v: "Top 3", l: "Server Ranking" },
              { icon: Target, v: "94%", l: "KPI 달성률" },
              { icon: TrendingUp, v: "+65%", l: "활동 증가율" },
            ].map(({ icon: Icon, v, l }, i) => (
              <Reveal
                key={l}
                delay={i * 90}
                className="rounded-xl border border-border bg-card/60 p-4 hover:border-primary/40 transition-colors"
              >
                <Icon className="h-4 w-4 text-primary-glow mb-3" />
                <p className="font-display text-xl tabular-nums">{v}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Looker Studio embed — dashboard window */}
      <div className="bezel-border relative rounded-2xl bg-gradient-card shadow-elevated overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(60%_80%_at_50%_-10%,hsl(var(--primary-glow)/0.18),transparent_60%)]" />

        {/* Window chrome */}
        <div className="relative flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-border bg-background/40 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            {/* traffic lights */}
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-4 w-4 text-primary-glow" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm truncate">ROK Live Dashboard</p>
              <p className="text-[11px] text-muted-foreground truncate">Powered by Looker Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 px-2.5 py-1 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>

        {/* iframe slot — responsive height */}
        <div className="relative bg-background/60 h-[70vh] min-h-[420px] sm:h-[78vh] sm:min-h-[560px] lg:h-[820px] lg:max-h-[88vh]">
          {/* inner ring */}
          <div className="pointer-events-none absolute inset-0 rounded-b-2xl ring-1 ring-inset ring-border/60 z-10" />

          {/* Loading skeleton overlay */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-20 p-4 sm:p-6 bg-background/80 backdrop-blur-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
              <Skeleton className="flex-1 w-full rounded-xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
              </div>
              <p className="text-center text-[11px] font-mono text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse mr-2 align-middle" />
                Loading Looker Studio…
              </p>
            </div>
          )}

          <iframe
            title="ROK Looker Studio Dashboard"
            src="https://datastudio.google.com/embed/reporting/305dc2f7-bc0e-445f-b855-157fa8ab8f56/page/p_71pb7nil6c"
            className="absolute inset-0 w-full h-full"
            frameBorder={0}
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* status bar */}
        <div className="relative flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 border-t border-border bg-background/40 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            connected · auto-refresh
          </span>
          <span className="hidden sm:inline">looker · datastudio.google.com</span>
        </div>
      </div>
    </section>
  );
};

