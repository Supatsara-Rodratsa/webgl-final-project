import { useEffect, useRef, useState } from "react";
import InteractiveSceneInit from "../libs/interactiveScene/interactiveScene";

export const InteractiveScene = () => {
  const audioRef = useRef(null);
  const [clicked, setIsClicked] = useState(false);
  // Initialize ThreeJS canvas
  useEffect(() => {
    const scene = new InteractiveSceneInit("interactiveCanvas");
    scene.initialize();
    scene.animate();
    const sceneElement = document.getElementById("interactiveCanvas");
    const audioElement = audioRef.current;

    const onScrollHandler = () => {
      if (sceneElement && audioElement) {
        const rect = sceneElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.top > 0;
        if (isVisible) {
          audioElement.muted = false;
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    };

    if (clicked) onScrollHandler();
    window.addEventListener("scroll", onScrollHandler);

    return () => {
      scene.pause();
    };
  }, [clicked]);

  const onClickedHandler = () => {
    setIsClicked(true);
  };

  return (
    <div className="h-[calc(100vh_-_120px)]">
      <div
        className="z-[99] circle absolute right-[30%] rounded-full w-[100px] h-[100px] text-amber-400 bg-[#7813dc] flex flex-col justify-center text-center"
        onClick={onClickedHandler}
      >
        {clicked ? "Hover my Belly plz!" : "Click Here"}
      </div>
      <canvas className="bg-transparent" id="interactiveCanvas"></canvas>
      <audio ref={audioRef} src="/music.mov" muted="muted"></audio>
    </div>
  );
};
