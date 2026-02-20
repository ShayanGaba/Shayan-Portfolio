import { useState } from "react";
import { useGSAP } from "@gsap/react";
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

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tween = gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
        start: "top 80%",
      },
      willChange: "transform, opacity",
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [prefersReducedMotion]);

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
        <div className="flex px-4 sm:px-6 md:px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10 lg:grid lg:grid-cols-2 lg:gap-12">
            {" "}
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="mailto:shayangaba953@gmail.com"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl 
                       hover:text-white/80 transition-all duration-300 hover:scale-105
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-white/50 focus-visible:ring-offset-4 
                       focus-visible:ring-offset-black rounded-sm
                       underline decoration-transparent hover:decoration-white/50
                       underline-offset-4"
                aria-label="Send email to ShayanGaba@gmail.com"
              >
                ShayanGaba953@gmail.com
              </a>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="tel:+923282200919"
                className="text-xl lowercase md:text-2xl lg:text-3xl
                       hover:text-white/80 transition-all duration-300 hover:scale-105
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-white/50 focus-visible:ring-offset-4 
                       focus-visible:ring-offset-black rounded-sm
                       underline decoration-transparent hover:decoration-white/50
                       underline-offset-4"
                aria-label="Call +92 328 2200919"
              >
                +92 328 2200919
              </a>
            </div>
            <div className="social-link lg:col-span-2">
              {" "}
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs leading-none tracking-widest uppercase md:text-sm 
                           hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 px-2 py-1 rounded 
                           focus-visible:outline-none focus-visible:ring-2 
                           focus-visible:ring-white/50 focus-visible:ring-offset-2 
                           focus-visible:ring-offset-black rounded-sm"
                    aria-label={`Visit ${social.name} profile`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-10 mb-10">
          <h3 className="text-2xl font-light text-white mb-4">
            Or Send a Message
          </h3>
          {isSubmitted && (
            <p className="text-green-400 mb-4">Message sent successfully!</p>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            role="form"
            aria-labelledby="form-title"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1">
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
                className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
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
                className="w-full p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 h-32 resize-none"
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};
