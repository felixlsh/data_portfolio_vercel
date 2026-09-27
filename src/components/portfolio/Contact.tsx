import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
const contacts = [
  { label: "EMAIL", value: "felixlsh2@naver.com", href: "mailto:felixlsh2@naver.com", name: "이메일" },
  { label: "PHONE", value: "010-6392-7944", href: "tel:01063927944", name: "전화번호" },
];
export const Contact = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      toast.success("클립보드에 복사했습니다.");
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("복사하지 못했습니다. 표시된 주소를 직접 선택해 주세요.");
    }
  };
  return (
    <section id="contact" className="relative border-t border-border pb-8 pt-20 md:pt-32">
      <Reveal>
        <div className="mb-8 flex items-center justify-between">
          <p className="eyebrow text-[10px] text-primary-glow">04 / Let's connect</p>
          <ArrowUpRight className="h-10 w-10 text-muted-foreground md:h-16 md:w-16" strokeWidth={1} aria-hidden />
        </div>
        <h2 className="font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[1.1] tracking-tighter">함께,<br /><span className="text-gradient">다음 인사이트로.</span></h2>
        <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">단순한 취미를 넘어 비즈니스 인사이트 도출에 기여하고자 합니다.<br />새로운 프로젝트, 협업, 가벼운 커피챗 모두 환영합니다.</p>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-16">
          {contacts.map((item) => (
            <div key={item.label} className="border-b border-border pb-7">
              <p className="mb-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{item.label}</p>
              <div className="flex items-center gap-3">
                <a href={item.href} className="min-w-0 break-all font-display text-xl transition-colors hover:text-primary-glow sm:text-2xl lg:text-3xl">{item.value}</a>
                <button type="button" onClick={() => copy(item.value)} aria-label={item.name + " 복사"}
                  className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary-glow hover:text-primary-glow">
                  {copied === item.value ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7 text-[11px] text-muted-foreground">
        <p>© {new Date().getFullYear()} 이승헌 · Felix</p>
        <p className="font-mono tracking-wider">THINK WITH DATA. BUILD WITH CARE.</p>
      </footer>
    </section>
  );
};
