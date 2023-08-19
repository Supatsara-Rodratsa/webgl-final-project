import { useEffect } from "react";
import IntroSceneInit from "../libs/introScene/introSceneInit";

export const Introduction = () => {
  // Initialize ThreeJS canvas
  useEffect(() => {
    const scene = new IntroSceneInit("canvas", true);
    scene.initialize();
    scene.animate();
    return () => {
      scene.pause();
    };
  }, []);

  return (
    <div className="h-[calc(100vh_-_80px)] relative">
      <div className="text-white text-[40px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full">
        <svg width="100%">
          <text x="50%" y="50%">
            my collections
          </text>
        </svg>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
};
