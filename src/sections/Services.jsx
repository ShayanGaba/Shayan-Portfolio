import { useRef } from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { servicesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const text = `Transforming complexity into simplicity.
    I craft React experiences, business websites,
     and intelligent capabilities to maximize 
     impact, not confusion.`;

  const serviceRef = useRef([]);
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  useGSAP(() => {
    serviceRef.current = serviceRef.current.filter(Boolean);

    const tweens = serviceRef.current.map((el) => {
      if (!el) return null;
      return gsap.from(el, {
        y: prefersReducedMotion ? 0 : 200,
        scrollTrigger: { trigger: el, start: "top 80%" },
        duration: 1,
        ease: "circ.out",
        willChange: "transform",
        onComplete: () => {
          el.style.willChange = "auto";
        },
      });
    });

    return () => {
      tweens.forEach((t) => t?.scrollTrigger?.kill());
    };
  }, [prefersReducedMotion]);

  const TOP_BASE = "8vh";
  const STAGGER = 4; 

  return (
    <section
      id="services"
      className="min-h-screen bg-black rounded-t-4xl"
      aria-labelledby="services-title"
      role="region"
    >
      <AnimatedHeader
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => {
        const remaining = servicesData.length - index - 1;

        return (
          <div
            key={service.id ?? service.title ?? index}
            ref={(el) => {
              serviceRef.current[index] = el;
            }}
            className="px-6 sm:px-10 py-10 text-white bg-gradient-to-b from-black to-black/95 border-t-2 border-white/30 shadow-lg"
            style={{
              position: "sticky",
              top: `calc(${TOP_BASE} + ${index * STAGGER}rem)`,
              marginBottom: remaining > 0 ? `${remaining * STAGGER}rem` : 0,
              minHeight: `calc(100vh - ${TOP_BASE} - ${index * STAGGER}rem)`,
              zIndex: index + 1,
            }}
          >
            <div className="flex flex-col gap-6 font-light w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-light tracking-[0.3rem] text-white/25 uppercase">
                  0{index + 1}
                </span>
                {service.price && (
                  <span className="text-[10px] sm:text-xs font-light tracking-[0.2rem] uppercase text-white/30 border border-white/10 px-3 py-1">
                    {service.price}
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl hover:text-white/90 transition-colors duration-300">
                {service.title}
              </h2>

              <p className="text-base sm:text-lg leading-relaxed tracking-wide lg:text-xl text-white/50 text-pretty max-w-2xl">
                {service.description}
              </p>

              <div className="flex flex-col text-xl sm:text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div
                    key={`item-${service.id ?? service.title ?? index}-${item.title ?? itemIndex}`}
                    className="hover:bg-white/5 rounded-lg p-2 transition-all duration-300"
                  >
                    <h3 className="flex items-center">
                      <span className="mr-8 sm:mr-12 text-base sm:text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="group relative w-fit flex items-center gap-3 px-6 py-3 mt-4 text-xs font-light tracking-[0.2rem] uppercase text-white border border-white/20 overflow-hidden transition-all duration-300 hover:border-white"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Get a Quote
                </span>
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};
