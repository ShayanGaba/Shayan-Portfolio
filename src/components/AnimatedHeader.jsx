import { useRef } from "react";
import { AnimatedText } from "../components/AnimatedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const AnimatedHeader = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : null,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2",
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={contextRef} aria-labelledby="header-title">
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              id="header-title"
              className={`flex flex-col flex-wrap gap-12 ${textColor} uppercase banner-text-responsive sm:gap-16 md:block py-3`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedText
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor} font-clash-display`}
          />
        </div>
      </div>
    </div>
  );
};
