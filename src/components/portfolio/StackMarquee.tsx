import { SiPython, SiMysql, SiLooker, SiJira, SiConfluence, SiZapier } from "react-icons/si";
import { FaSlack } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Stack = { label: string; Icon?: IconType; iconUrl?: string; color: string };

export const stacks: Stack[] = [
  { label: "Python", Icon: SiPython, color: "#3776AB" },
  { label: "SQL", Icon: SiMysql, color: "#4479A1" },
  { label: "Looker Studio", Icon: SiLooker, color: "#4285F4" },
  { label: "Jira", Icon: SiJira, color: "#0052CC" },
  { label: "Confluence", Icon: SiConfluence, color: "#5E8BEA" },
  { label: "Slack", Icon: FaSlack, color: "#8E6BA8" },
  { label: "Lovable", iconUrl: "/lovable-icon.svg", color: "#8B5CF6" },
  { label: "Zapier", Icon: SiZapier, color: "#FF4A00" },
];

const Item = ({ s }: { s: Stack }) => (
  <span className="inline-flex items-center gap-2.5 px-6 py-2 text-sm font-medium text-foreground/70">
    {s.Icon ? (
      <s.Icon className="h-4 w-4" style={{ color: s.color }} aria-hidden />
    ) : (
      <img src={s.iconUrl} alt="" aria-hidden className="h-4 w-4 object-contain" />
    )}
    {s.label}
    <span className="ml-4 h-1 w-1 rounded-full bg-primary/50" aria-hidden />
  </span>
);

/** Continuous stack rail; freezes into a static wrap when motion is off. */
export const StackMarquee = () => {
  const { motion } = useMotion();

  return (
    <div className="relative border-y border-border/60 py-4">
      <span className="sr-only">주요 사용 도구: {stacks.map((s) => s.label).join(", ")}</span>
      {motion ? (
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max whitespace-nowrap" aria-hidden>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex">
                {stacks.map((s) => (
                  <Item key={`${dup}-${s.label}`} s={s} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("flex flex-wrap justify-center gap-x-2 gap-y-1")} aria-hidden>
          {stacks.map((s) => (
            <Item key={s.label} s={s} />
          ))}
        </div>
      )}
    </div>
  );
};
