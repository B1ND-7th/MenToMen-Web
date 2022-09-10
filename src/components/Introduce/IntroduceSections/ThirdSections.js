import IOStest from "../../../img/IOStest.png";
import "./ThirdSections.css";
import config from "../config.json";

const ThirdSection = () => {
  let authUrl = `http://dauth.b1nd.com/login?client_id=${config.CLIENTID}&redirect_uri=http://localhost:3000/callback`;

  return (
    <div className="thirdSection">
      <div className="thirdSectionWrap">
        <div className="thirdSectionTextWrap">
          <div className="thirdSectionText">멘토찾기</div>
          <div className="thirdSectionText1">
            도움이 필요할 때<br /> 나에게 도움을 줄 수 있는 멘토 찾기
          </div>
        </div>
        <img className="thirdSectionImg" src={IOStest} />
      </div>
      <button
        onClick={() => {
          window.location = authUrl;
        }}
        className="thirdSectionBtn"
      >
        <h1>멘투멘 시작하기</h1>
      </button>
    </div>
  );
};

export default ThirdSection;
