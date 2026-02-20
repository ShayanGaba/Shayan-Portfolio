import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { AnimatedHeader } from "../components/AnimatedHeader";

export const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Turning complex ideas into elegant code.
    I craft React experiences, business websites,
    and AI integrations that drive real results.`;

  return (
    <section
      id="home"
      className="flex flex-col justify-end min-h-screen relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <AnimatedHeader
        subTitle={"404 No Bugs Found"}
        title={"Shayan Gaba"}
        text={text}
        textColor={"text-black"}
        className="hover:scale-105 transition-transform duration-500"
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
        role="img"
        aria-label="Interactive 3D planet scene representing innovation and web development"
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};
