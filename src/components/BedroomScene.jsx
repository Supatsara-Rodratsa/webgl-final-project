import { useEffect } from "react";
import BedroomSceneInit from "../libs/bedroomScene";

export const BedroomScene = () => {
  // Initialize ThreeJS canvas
  useEffect(() => {
    const scene = new BedroomSceneInit("3DCanvas");
    scene.initialize();
    scene.animate();

    return () => {
      scene.pause();
    };
  }, []);

  return (
    <div className="h-[calc(100vh_-_80px)]">
      <canvas className="bg-transparent" id="3DCanvas"></canvas>
    </div>
  );
};
