import { useRef } from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { AnimatedText } from "../components/AnimatedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const text = `Where frontend meets intelligence.
    I develop React interfaces and AI-powered
     features that solve real problems,
      not theoretical ones.`;
  const aboutText = `Frontend developer who builds clean, performant React interfaces and AI-powered features — from GSAP-animated experiences to LangChain-powered workflows. Beyond personal projects, I help businesses establish their digital presence across any industry. Every project balances aesthetic design with technical excellence, ensuring fast load times, smooth interactions, and scalable architecture.`;

  const imgRef = useRef(null);
  const sectionRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(imgRef.current, { opacity: 1 });
      return;
    }

    const sectionTween = gsap.to(sectionRef.current, {
      scale: 0.95,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
      willChange: "transform",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    const imgTween = gsap.to(imgRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
      },
      willChange: "clip-path",
    });

    return () => {
      sectionTween.scrollTrigger?.kill();
      imgTween.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black rounded-b-4xl"
      aria-labelledby="about-title"
    >
      <AnimatedHeader
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div
        className="flex flex-col items-center justify-between gap-8 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row lg:gap-12 md:text-2xl lg:text-3xl text-white/60 
                      lg:grid lg:grid-cols-2 lg:items-center"
      >
        <img
          ref={imgRef}
          src="/images/impdp.jpg"
          alt="Professional developer at work in a modern workspace"
          loading="lazy"
          className="w-full max-w-md rounded-3xl lg:w-full lg:translate-x-6 
                     transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-white 
                     relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-black/20 before:rounded-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          role="img"
        />
        <AnimatedText
          text={aboutText}
          className="w-full lg:w-full text-xl lg:text-2xl max-w-4xl lg:-translate-x-10"
        />
      </div>
    </section>
  );
};
