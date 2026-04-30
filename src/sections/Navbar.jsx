import { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { Link } from "react-scroll";

export const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactsRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTL = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactsRef.current], { autoAlpha: 0, x: -20 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
        willChange: "transform",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        contactsRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2",
      );

    iconTL.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: prefersReducedMotion ? 0 : 45,
        y: prefersReducedMotion ? 0 : 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: prefersReducedMotion ? 0 : -45,
          y: prefersReducedMotion ? 0 : -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );

    return () => {
      tl.current?.kill();
      iconTL.current?.kill();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) toggleMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTL.current.reverse();
    } else {
      tl.current.play();
      iconTL.current.play();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px]"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <nav
        ref={navRef}
        className="fixed z-[9999] flex flex-col justify-between
          w-[85vw] xs:w-3/4 sm:w-[55vw] md:w-[45vw] lg:w-[38vw] xl:w-[32vw]
          right-0 h-full
          px-6 sm:px-8 md:px-10
          pt-20 pb-10
          uppercase bg-gradient-to-b from-black to-black/95
          text-white/80
          shadow-2xl
          overflow-y-auto"
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="flex flex-col gap-y-1">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={section} ref={(el) => (linksRef.current[index] = el)}>
                {/* <Link
                  className="block
                  text-[9vw] xs:text-[8vw] sm:text-5xl md:text-6xl lg:text-7xl
                  font-light tracking-tight leading-tight
                  transition-all duration-300
                  cursor-pointer
                  hover:text-white hover:translate-x-2
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm
                  py-1"
                  to={section}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={toggleMenu}
                  aria-label={`Navigate to ${section} section`}
                >
                  {section}
                </Link> */}
                <div className="w-full h-px bg-white/10 mt-1" />
              </div>
            ),
          )}
        </div>

        <div
          ref={contactsRef}
          className="flex flex-col gap-5 mt-8 pt-6 border-t border-white/10"
        >
          <div className="font-light">
            <p className="text-[10px] tracking-[0.2rem] text-white/40 mb-1">
              E-MAIL
            </p>
            <a
              href="mailto:shayangaba953@gmail.com"
              className="text-sm sm:text-base tracking-wider lowercase text-white/80
                hover:text-white transition-colors duration-300
                underline decoration-transparent hover:decoration-white/30 underline-offset-4"
            >
              shayangaba953@gmail.com
            </a>
          </div>

          <div className="font-light">
            <p className="text-[10px] tracking-[0.2rem] text-white/40 mb-2">
              SOCIALS
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-white/50
                    hover:text-white transition-all duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                  aria-label={`Visit ${social.name} profile`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[10px] tracking-[0.15rem] uppercase text-white/30">
              Available for work
            </span>
          </div>
        </div>
      </nav>

      <div
        className={`fixed z-[99998] flex flex-col items-center justify-center gap-[5px]
          transition-all duration-300
          bg-black rounded-full
          w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
          top-4 right-4 md:top-6 md:right-8
          ${isOpen ? "opacity-100" : ""}`}
        onClick={toggleMenu}
        style={
          showBurger || isOpen
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleMenu();
        }}
      >
        <span
          ref={topLineRef}
          className="block w-5 sm:w-6 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-5 sm:w-6 h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </>
  );
};
