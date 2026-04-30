import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [tabindex='0']";

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const isDarkRef = useRef(false);
  const rafRef = useRef(null);
  const initializedRef = useRef(false);
  const quickToRef = useRef({});

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    if (coarseQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const initGSAP = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      quickToRef.current = {
        moveX: gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" }),
        moveY: gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" }),
        ringX: gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" }),
        ringY: gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" }),
      };

      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    const detectColor = () => {
      const { x, y } = posRef.current;
      if (x < 0 || y < 0) return;

      const els = document.elementsFromPoint(x, y);
      for (const el of els) {
        if (el === dot || el === ring) continue;
        if (el.hasAttribute("data-cursor")) continue;

        const bg = window.getComputedStyle(el).backgroundColor;
        if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") continue;

        const match = bg.match(/\d+/g);
        if (!match) continue;

        const [r, g, b] = match.map(Number);
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const newIsDark = luminance < 80;

        if (newIsDark !== isDarkRef.current) {
          isDarkRef.current = newIsDark;
          setIsDark(newIsDark);
        }
        break;
      }
    };

    const onMove = (e) => {
      initGSAP();
      posRef.current = { x: e.clientX, y: e.clientY };
      const { moveX, moveY, ringX, ringY } = quickToRef.current;
      moveX?.(e.clientX);
      moveY?.(e.clientY);
      ringX?.(e.clientX);
      ringY?.(e.clientY);
      detectColor();
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        detectColor();
        rafRef.current = null;
      });
    };

    const onEnter = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;
      gsap.to(ring, {
        scale: 1.7,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onLeaveWindow = () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () =>
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    const onPointerChange = (e) => {
      if (e.matches) {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      } else {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    coarseQuery.addEventListener("change", onPointerChange);

    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      coarseQuery.removeEventListener("change", onPointerChange);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (dot) dot.style.willChange = "auto";
      if (ring) ring.style.willChange = "auto";
    };
  }, []);

  const color = isDark ? "255,255,255" : "0,0,0";
  const dotColor = `rgb(${color})`;
  const ringColor = `rgba(${color}, 0.5)`;

  return (
    <>
      <div
        ref={dotRef}
        data-cursor
        className="fixed top-0 left-0 z-[99999] pointer-events-none opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full transition-colors duration-150"
          style={{ backgroundColor: dotColor }}
        />
      </div>

      <div
        ref={ringRef}
        data-cursor
        className="fixed top-0 left-0 z-[99999] pointer-events-none opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="w-14 h-14 rounded-full transition-colors duration-150"
          style={{ border: `1px solid ${ringColor}` }}
        />
      </div>
    </>
  );
};
