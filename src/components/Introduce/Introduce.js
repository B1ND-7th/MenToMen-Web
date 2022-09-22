import React from "react";
import "./Introduce.css";
import FirstSection from "./IntroduceSections/FirstSection";
import SecondSection from "./IntroduceSections/SecondSection";
import ThirdSection from "./IntroduceSections/ThirdSections";
function Introduce() {
  return (
    <>
      <div className="introduce">
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </div>
    </>
  );
}

export default Introduce;
