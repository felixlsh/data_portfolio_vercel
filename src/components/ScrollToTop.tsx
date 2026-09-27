import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cancelSmoothScroll, smoothScrollToId } from "@/lib/smooth-scroll";
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let id: string;
        try { id = decodeURIComponent(hash.slice(1)); } catch { id = hash.slice(1); }
        void smoothScrollToId(id);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelSmoothScroll();
      window.history.scrollRestoration = previous;
    };
  }, [pathname, hash, key]);
  return null;
};
export default ScrollToTop;
