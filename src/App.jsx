import ReactLenis from "lenis/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Hero } from "./sections/Hero";
import { Navbar } from "./sections/Navbar";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";

const ServiceSummary = lazy(() =>
  import("./sections/ServiceSummary").then((m) => ({
    default: m.ServiceSummary,
  })),
);
const Services = lazy(() =>
  import("./sections/Services").then((m) => ({ default: m.Services })),
);
const About = lazy(() =>
  import("./sections/About").then((m) => ({ default: m.About })),
);
const Works = lazy(() =>
  import("./sections/Works").then((m) => ({ default: m.Works })),
);
const ContactSummary = lazy(() =>
  import("./sections/ContactSummary").then((m) => ({
    default: m.ContactSummary,
  })),
);
const Contact = lazy(() =>
  import("./sections/Contact").then((m) => ({ default: m.Contact })),
);

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => setIsReady(true), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <ReactLenis
      root
      className="relative w-screen min-h-screen overflow-x-hidden"
    >
      <CustomCursor />

      {!isReady && <LoadingScreen fadeOut={fadeOut} />}

      <div
        className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      >
        <Navbar />
        <Hero />
        <Suspense fallback={null}>
          <ServiceSummary />
          <Services />
          <About />
          <Works />
          <ContactSummary />
          <Contact />
        </Suspense>
      </div>
    </ReactLenis>
  );
};
