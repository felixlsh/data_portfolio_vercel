import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionContextValue = {
  /** True when continuous / decorative motion may run. */
  motion: boolean;
  /** True when the OS asks for reduced motion (toggle is then locked off). */
  systemReduced: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  motion: true,
  systemReduced: false,
  toggle: () => {},
});

const STORAGE_KEY = "motion-enabled";

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const [systemReduced, setSystemReduced] = useState(false);
  const [userEnabled, setUserEnabled] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") setUserEnabled(false);
    } catch {
      /* storage blocked — keep default */
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const motion = userEnabled && !systemReduced;

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !motion);
  }, [motion]);

  const toggle = useCallback(() => {
    setUserEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        /* storage blocked — session-only preference */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ motion, systemReduced, toggle }),
    [motion, systemReduced, toggle]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export const useMotion = () => useContext(MotionContext);

