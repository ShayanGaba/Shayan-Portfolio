import { useRef } from "react";
import { Marquee } from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ContactSummary = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const items = [
    "Fast Delivery",
    "Clean Architecture",
    "User-Focused",
    "AI-Powered",
    "Production-Ready",
  ];
  const items2 = [
    "Let's Connect",
    "Let's Connect",
    "Let's Connect",
    "Let's Connect",
    "Let's Connect",
  ];

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tween = gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=400 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
      willChange: "transform",
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        willChange: "opacity, transform",
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
      aria-labelledby="summary-title"
    >
      <Marquee
        items={items}
        className="hover:scale-105 transition-transform duration-300 bg-black text-white"
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
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2 hover:border-gold/50 transition-colors duration-300"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};
