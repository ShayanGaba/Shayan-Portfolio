import { Icon } from "@iconify/react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Works = () => {
  const [curIndex, setCurIndex] = useState(null);
  const previewRef = useRef(null);
  const overlayRefs = useRef([]);
  const moveX = useRef(null);
  const moveY = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const text = `From interactive Web applications to
    AI-powered features. Each project reflects
    my commitment to clean code and thoughtful
    design, built with attention to performance,
    accessibility, and real-world impact.`;

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
      willChange: "transform",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
      willChange: "transform",
    });

    const tween = gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  const handleProjectClick = (project) => {
    if (project.href) {
      window.open(project.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="work"
      className="flex flex-col min-h-screen"
      aria-labelledby="works-title"
      role="region"
    >
      <AnimatedHeader
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleProjectClick(project)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleProjectClick(project);
            }}
            aria-describedby={`project-${index}-desc`}
            role="button"
            aria-label={`View ${project.name} live site`}
          >
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-gradient-to-r from-black to-black/90 -z-10 clip-path"
            />

            <div className="flex justify-between px-6 sm:px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 rounded-sm">
              <h2 className="lg:text-[32px] text-[24px] sm:text-[26px] leading-none hover:scale-105 transition-transform duration-300">
                {project.name}
              </h2>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 rounded-sm"
                    aria-label={`View ${project.name} on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon icon="mdi:github" className="md:size-6 size-5" />
                  </a>
                )}
                <Icon
                  icon="lucide:arrow-up-right"
                  className="md:size-6 size-5 hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full h-0.5 bg-black/80" />
            <div className="flex px-6 sm:px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-4 sm:gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  id={`project-${index}-desc`}
                  className="text-black transition-colors duration-500 md:group-hover:text-white hover:text-black/70"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            <div className="relative flex items-center justify-center px-6 sm:px-10 md:hidden h-[350px] sm:h-[400px]">
              {/* <img
                src={project.bgImage}
                alt={`${project.name} background`}
                className="object-cover w-full h-full rounded-md brightness-50"
                loading="lazy"
              /> */}
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="absolute bg-center px-10 sm:px-14 rounded-xl"
              />
            </div>
          </div>
        ))}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 overflow-hidden border-4 border-black pointer-events-none w-[450px] h-[250px] sm:w-[480px] sm:h-[270px] md:block hidden opacity-0 rounded-lg shadow-2xl"
        >
          {curIndex !== null && (
            <img
              src={projects[curIndex].image}
              alt={`Preview of ${projects[curIndex].name}`}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};
