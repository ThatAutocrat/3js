import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

import HeroCamera from '../components/HeroCamera.jsx';
import { HackerRoom } from '../components/HackerRoom.jsx';
import CanvasLoader from '../components/CanvasLoader.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { Leva } from 'leva';
import { calculateSizes } from '../constants/index.js';
import Target from '../components/Target.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I am Devashish <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Building Products & Brands</p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Leva hidden />
        <ErrorBoundary fallback={<div className="w-full h-full bg-black-200" />}>
          <Canvas className="w-full h-full">
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />

              <HeroCamera isMobile={isMobile}>
                <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />
              </HeroCamera>

              <group></group>

              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <div className="btn">
            <div className="relative flex h-3 w-3">
              <span className="btn-ping" />
              <span className="btn-ping_dot" />
            </div>
            <p className="flex text-white">Available for work</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
