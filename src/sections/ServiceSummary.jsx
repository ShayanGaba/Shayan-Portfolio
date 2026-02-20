import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center contact-text-responsive mb-42">
      <div id="title-service-1" className="mb-4">
        <p>Creativity</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-2 mb-4 translate-x-16"
      >
        <p className="font-normal">Performance</p>
        <svg
          className="w-32 h-4"
          viewBox="0 0 100 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7.5 Q25 4 40 7.5 Q55 11 70 7.5 Q85 4 95 7.5"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gold"
          />
        </svg>
        <p>Intelligence</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-2 mb-4 -translate-x-48"
      >
        <p>UI/UX</p>
        <svg
          className="w-32 h-4"
          viewBox="0 0 100 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7.5 Q25 4 40 7.5 Q55 11 70 7.5 Q85 4 95 7.5"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gold"
          />
        </svg>
        <p className="italic">Automation</p>
        <svg
          className="w-32 h-4"
          viewBox="0 0 100 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7.5 Q25 4 40 7.5 Q55 11 70 7.5 Q85 4 95 7.5"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gold"
          />
        </svg>
        <p>Scalability</p>
      </div>
      <div id="title-service-4" className="translate-x-48">
        <p>Innovation</p>
      </div>
    </section>
  );
};