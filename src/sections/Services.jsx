import { useRef } from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const text = `Transforming complexity into simplicity.
    I craft React experiences, business websites,
     and intelligent capabilities to maximize 
     impact, not confusion.`;
  const serviceRef = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); 

  
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    serviceRef.current.forEach((el) => {
      if (!el) return;

      const tween = gsap.from(el, {
        y: prefersReducedMotion ? 0 : 200, 
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
        willChange: "transform", 
      });

      
      return () => {
        tween.scrollTrigger?.kill();
      };
    });
  }, [prefersReducedMotion]);

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
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRef.current[index] = el)}
          key={index}
          className="sticky px-6 sm:px-10 pt-6 pb-12 text-white bg-gradient-to-b from-black to-black/95 border-t-2 border-white/30 shadow-lg" 
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}rem)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 } 
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl hover:text-white/90 transition-colors duration-300 hover:scale-105">
                {" "}
                {service.title}
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-xl sm:text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div
                    key={`item-${index}-${itemIndex}`}
                    className="hover:bg-white/5 rounded-lg p-2 transition-all duration-300"
                  >
                    {" "}
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
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
