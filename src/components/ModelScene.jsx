import { useEffect } from "react";
import ModelSceneInit from "../libs/modelScene";

export const ModelScene = () => {
  // Initialize ThreeJS canvas
  useEffect(() => {
    const scene = new ModelSceneInit("modelCanvas");
    scene.initialize();
    scene.animate();

    return () => {
      scene.pause();
    };
  }, []);

  return (
    <div className="h-screen relative">
      <div className="text-white text-[40px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full">
        <svg width="100%">
          <text x="50%" y="50%">
            3d model
          </text>
        </svg>
      </div>
      <canvas className="bg-transparent" id="modelCanvas"></canvas>
    </div>
  );
};
