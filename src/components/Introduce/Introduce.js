import React from "react";
import "./Introduce.css";
import FirstSection from "./IntroduceSections/FirstSection";
import SecondSection from "./IntroduceSections/SecondSection";
import ThirdSection from "./IntroduceSections/ThirdSections";
import StartNav from "../Nav/StartNav";
function Introduce() {
  return (
    <>
      <div className="introduce">
        <StartNav />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </div>
    </>
  );
}

export default Introduce;