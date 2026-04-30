import { useRef } from "react";
import { Marquee } from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Fast Delivery",
  "Clean Architecture",
  "User-Focused",
  "AI-Powered",
  "Production-Ready",
];

const MARQUEE_ITEMS_2 = [
  "Let's Connect",
  "Let's Connect",
  "Let's Connect",
  "Let's Connect",
  "Let's Connect",
];

export const ContactSummary = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const textTween = gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          if (textRef.current) textRef.current.style.willChange = "auto";
        },
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        willChange: "opacity, transform",
      },
    );

    return () => {
      textTween.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
      aria-labelledby="summary-title"
    >
      <Marquee
        items={MARQUEE_ITEMS}
        className="transition-transform duration-300 bg-black text-white"
      />

      <div
        ref={textRef}
        className="overflow-hidden font-light text-center contact-text-responsive"
      >
        <p>
          " Ready to build <br />
          <span className="font-normal text-black/40">intelligent</span> &{" "}
          <span className="italic text-black/40">beautiful</span> <br />
          applications{" "}
          <span className="text-gold drop-shadow-lg">together</span> "
        </p>
      </div>

      <Marquee
        items={MARQUEE_ITEMS_2}
        reverse={true}
        className="text-black bg-transparent border-y-2 hover:border-gold/50 transition-colors duration-300"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};
