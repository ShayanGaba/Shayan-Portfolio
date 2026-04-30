import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 2.5,
  easing: (t) => 1 - Math.pow(1 - t, 4), // smooth deceleration
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Expose lenis globally for navbar
window.lenis = lenis;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
