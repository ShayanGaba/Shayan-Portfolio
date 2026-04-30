import { useRef } from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { AnimatedText } from "../components/AnimatedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "1+", label: "Years Experience" },
  { value: "100%", label: "Client Focus" },
];

export const About = () => {
  const text = `Where frontend meets intelligence.
    I develop React interfaces and AI-powered
     features that solve real problems,
      not theoretical ones.`;

  const aboutText = `Frontend developer who builds clean, performant React interfaces and AI-powered features — from GSAP-animated experiences to LangChain-powered workflows. Beyond personal projects, I help businesses establish their digital presence across any industry. Every project balances aesthetic design with technical excellence, ensuring fast load times, smooth interactions, and scalable architecture.`;

  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const sectionTween = gsap.to(sectionRef.current, {
      scale: 0.95,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
      willChange: "transform",
    });

    const imgTween = gsap.from(imgRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "back.out",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top 80%",
      },
      willChange: "transform, opacity",
    });

    const statEls = statsRef.current?.querySelectorAll(".stat-value");
    if (statEls) {
      gsap.from(statEls, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "circ.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
      });
    }

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
        ref={statsRef}
        className="grid grid-cols-3 border-t border-white/10 mx-6 sm:mx-10 mb-12"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`stat-value flex flex-col items-center py-8 gap-1 ${
              i !== stats.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              {stat.value}
            </span>
            <span className="text-[9px] sm:text-[11px] font-light tracking-[0.2rem] uppercase text-white/35 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-8 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row lg:gap-12 md:text-2xl lg:text-3xl text-white/60 lg:grid lg:grid-cols-2 lg:items-center">
        <div
          ref={imgWrapRef}
          className="w-full max-w-md lg:w-full overflow-hidden rounded-3xl lg:translate-x-6"
        >
          <img
            ref={imgRef}
            src="/images/impdp.jpg"
            alt="Professional developer at work in a modern workspace"
            loading="lazy"
            className="w-full rounded-3xl transition-transform duration-300 hover:scale-[1.01]"
            role="img"
          />
        </div>

        <AnimatedText
          text={aboutText}
          className="w-full lg:w-full text-xl lg:text-2xl max-w-4xl lg:-translate-x-10"
        />
      </div>
    </section>
  );
};
