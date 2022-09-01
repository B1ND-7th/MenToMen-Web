import "./SecondSection.css";

const SecondSection = () => {
  return (
    <div className="secondSection">
      <div className="secondSectionContentWrap">
        <span className="secondSectionContentText">
          내가 프로젝트를 하면서 막혔던 것을
          <span className="secondSectionContentStrongText">
            {" "}
            멘토에게 질문{" "}
          </span>
          해보세요.
        </span>
        <span className="secondSectionContentText">
          멘토들을 동해 프로젝트를 하며 막혔던 부분을 도움 받을 수 있습니다
        </span>
      </div>
    </div>
  );
};

export default SecondSection;
