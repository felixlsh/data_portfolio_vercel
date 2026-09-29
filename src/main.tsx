import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/liquid-glass.css";

// Let ScrollToTop handle initial positions and hash navigation without a competing scroll loop.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
