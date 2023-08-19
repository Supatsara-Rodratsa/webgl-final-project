import GUI from "lil-gui";
import "./App.css";
import { BedroomScene } from "./components/BedroomScene";
import { InteractiveScene } from "./components/InteractiveScene";
import { Introduction } from "./components/IntroductionScene";
import { ModelScene } from "./components/ModelScene";
import { ThankYou } from "./components/ThankYouScene";

function App() {
  const TextWrapper = (text) => (
    <h2 className="uppercase text-white m-0 font-bold text-[24px]">{text}</h2>
  );
  return (
    <div className="App">
      {/* Custom ThreeJS Scene */}
      <Introduction />
      <ModelScene />
      <BedroomScene />
      <InteractiveScene />
      <ThankYou />
      {/* Outline Scene */}
      <div className="fixed top-0 left-0 w-full h-screen">
        <div className="absolute top-[40px] left-[40px]">
          {TextWrapper("Creative Idea")}
        </div>
        <div className="absolute bottom-[40px] left-[40px]">
          <div className="flex flex-col gap-[5px]">
            {TextWrapper("Module 14")}
            {TextWrapper("WebGl final Project")}
            <div className="border-t-[6px] border-white mt-[8px] w-[60px]" />
          </div>
        </div>
        <div className="absolute bottom-[40px] right-[40px]">
          {TextWrapper("Supatsara Rodratsa")}
        </div>
      </div>
    </div>
  );
}

export default App;
