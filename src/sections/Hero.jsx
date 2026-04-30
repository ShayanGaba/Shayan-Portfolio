import { useMediaQuery } from "react-responsive";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LazyPlanetCanvas = lazy(() => import("../components/LazyPlantCanvas"));

export const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const extrasRef = useRef(null);

  const text = `Turning complex ideas into elegant code.
    I craft React experiences, business websites,
    and AI integrations that drive real results.`;

  useGSAP(() => {
    if (!extrasRef.current) return;
    gsap.from(extrasRef.current.children, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: "circ.out",
      delay: 1.2,
    });
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col justify-end min-h-screen relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <AnimatedHeader
        subTitle={"404 No Bugs Found"}
        title={"Shayan Gaba"}
        text={text}
        textColor={"text-black"}
      />

      <div
        ref={extrasRef}
        className="relative z-10 flex items-center justify-between gap-4 px-10 pb-10 pt-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] sm:text-xs font-light tracking-[0.18rem] uppercase text-black/50">
            Available for work
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#work"
            className="group relative px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-light tracking-[0.15rem] uppercase text-black border border-black/25 overflow-hidden transition-all duration-300 hover:border-black whitespace-nowrap"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View Work
            </span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </a>

          <a
            href="#contact"
            className="px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-light tracking-[0.15rem] uppercase bg-black text-white border border-black transition-all duration-300 hover:bg-transparent hover:text-black whitespace-nowrap"
          >
            Let's Talk
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-35 pointer-events-none">
        <span className="text-[8px] tracking-[0.3rem] uppercase text-black font-light">
          Scroll
        </span>
        <div className="w-px h-8 bg-black/40 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-black"
            style={{
              height: "40%",
              animation: "scrollDrop 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
        role="img"
        aria-label="Interactive 3D planet scene"
      >
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <LazyPlanetCanvas isMobile={isMobile} />
        </figure>
      </figure>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(300%);  opacity: 0; }
        }
      `}</style>
    </section>
  );
};
