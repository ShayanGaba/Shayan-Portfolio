import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { AnimatedHeader } from "../components/AnimatedHeader";
import { Marquee } from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const items = [
    "Get in Touch",
    "Get in Touch",
    "Get in Touch",
    "Get in Touch",
  ];

  const text = `Got a project in mind or just want to connect?
    Whether you need a React developer, business website,
    AI integration specialist, or someone to bring
    your digital vision to life— I'm here to help.
    Let's build something exceptional together.`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 800);
    }
  };

  useGSAP(() => {
    if (prefersReducedMotion) return;
    const els = gsap.utils.toArray(".social-link");
    const tween = gsap.from(els, {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      willChange: "transform, opacity",
      scrollTrigger: { trigger: ".social-link", start: "top 80%" },
      onComplete: () => {
        els.forEach((el) => (el.style.willChange = "auto"));
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, [prefersReducedMotion]);

  const inputClass =
    "w-full px-4 py-3.5 bg-transparent border border-white/20 text-white text-sm font-light tracking-wide placeholder-white/25 focus:outline-none focus:border-white/60 transition-colors duration-200";

  return (
    <section
      className="flex flex-col justify-between min-h-screen bg-black"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div>
        <AnimatedHeader
          subTitle={"You Dream It, I Code It"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="px-4 sm:px-6 md:px-10 mb-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 gap-12">
            <div className="flex flex-col gap-10 font-light text-white uppercase">
              <div className="social-link">
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  E-mail
                </h2>
                <div className="w-full h-px my-2 bg-white/20" />
                <a
                  href="mailto:shayangaba953@gmail.com"
                  className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300 underline decoration-transparent hover:decoration-white/40 underline-offset-4"
                >
                  ShayanGaba953@gmail.com
                </a>
              </div>

              <div className="social-link">
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  Phone
                </h2>
                <div className="w-full h-px my-2 bg-white/20" />
                <a
                  href="tel:+923282200919"
                  className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/70 transition-colors duration-300 underline decoration-transparent hover:decoration-white/40 underline-offset-4"
                >
                  +92 328 2200919
                </a>
              </div>

              <div className="social-link">
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  Social Media
                </h2>
                <div className="w-full h-px my-2 bg-white/20" />
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {socials.map((social) => (
                    <a
                      href={social.href}
                      key={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {social.name}
                    </a>
                  ))}
                  <a
                    href="https://www.fiverr.com/core_stack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
                  >
                    Fiverr
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    <span className="text-[10px] tracking-[0.15rem] uppercase text-white/35">
                      Usually replies within 24 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 text-xs">◷</span>
                    <span className="text-[10px] tracking-[0.15rem] uppercase text-white/35">
                      PKT — UTC+5 (Karachi)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-sm font-light tracking-[0.25rem] uppercase text-white/40">
                  Send a Message
                </h3>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {isSubmitted ? (
                <div className="flex flex-col gap-2 py-8">
                  <p className="text-2xl font-light text-white tracking-wide">
                    Message received.
                  </p>
                  <p className="text-sm font-light text-white/40 tracking-widest uppercase">
                    I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 w-fit text-xs font-light tracking-[0.2rem] uppercase text-white/30 hover:text-white transition-colors duration-300"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  aria-label="Contact form"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-red-400/80 text-xs mt-1.5 tracking-wide font-light">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-red-400/80 text-xs mt-1.5 tracking-wide font-light">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`${inputClass} h-36 resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400/80 text-xs mt-1.5 tracking-wide font-light">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-fit flex items-center gap-3 px-8 py-3.5 text-xs font-light tracking-[0.2rem] uppercase text-white border border-white/25 overflow-hidden transition-all duration-300 hover:border-white disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-black">
                      {isLoading ? (
                        <>
                          <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin group-hover:border-black/40 group-hover:border-t-black" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};
