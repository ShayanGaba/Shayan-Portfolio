import { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

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

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTL.current.reverse();
    } else {
      tl.current.play();
      iconTL.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-3/4 right-0 h-full px-10 uppercase bg-gradient-to-b from-black to-black/95 text-white/80 py-28 gap-y-8 md:w-1/2 md:left-1/2 md:right-auto shadow-2xl"
        aria-labelledby="nav-menu"
        role="navigation"
      >
        <div className="flex flex-col text-4xl gap-y-2 sm:text-5xl md:text-6xl lg:text-8xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={toggleMenu}
                  aria-label={`Navigate to ${section} section`}
                >
                  {section}
                </Link>
              </div>
            ),
          )}
        </div>
        <div
          ref={contactsRef}
          className="flex flex-col flex-wrap justify-between gap-6 md:gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-lg sm:text-xl tracking-widest lowercase text-pretty">
              shayangaba953@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2 gap-y-1">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                  aria-label={`Visit ${social.name} profile`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-4 md:right-10 ${isOpen ? "opacity-100" : ""}`}
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
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};
