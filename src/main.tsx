import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/liquid-glass.css";

console.log("[main.tsx] script start", { scrollRestoration: (window.history as any).scrollRestoration, scrollY: window.scrollY });

// Disable browser scroll restoration so initial load always starts at the top
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
  console.log("[main.tsx] scrollRestoration set to manual");
}

// Force the page to the top on first entry, before React mounts and during
// the first few frames (defeats late layout shifts, image loads, autofocus, etc.)
window.scrollTo(0, 0);
console.log("[main.tsx] initial window.scrollTo(0,0) called");

createRoot(document.getElementById("root")!).render(<App />);
console.log("[main.tsx] React root rendered");

// Keep forcing top for a short window after mount on the very first load only
const start = performance.now();
const forceTop = () => {
  window.scrollTo(0, 0);
  if (performance.now() - start < 800) {
    requestAnimationFrame(forceTop);
  } else {
    console.log("[main.tsx] post-mount forceTop loop ended, final scrollY:", window.scrollY);
  }
};
requestAnimationFrame(forceTop);
console.log("[main.tsx] post-mount forceTop rAF started");
