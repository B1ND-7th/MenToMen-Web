import React from "react";
import "./Introduce.css";
import IOStest from "../../img/IOStest.png";
import BackImg from "../../img/BackImg.png";
import { useNavigate } from "react-router-dom";
function Introduce() {
  let navigate = useNavigate();
  return (
    <>
      <div className="Introduce">
        <img className="BackImg" alt=" " src={BackImg} />
        <h1 className="Title">멘토와 멘티를 이어주다.</h1>
        <p className="Text">
          내가 프로젝트를 하면서 막혔던 것을 멘토에게 질문해보세요.
          <br />
          멘토들을 동해 프로젝트를 하며 막혔던 부분을 도움 받을 수 있습니다
        </p>
        <p className="Text1">멘토 찾기</p>
        <p className="Text2">
          도움이 필요할 때 <br /> 나에게 도움을 줄 수 있는 멘토 찾기
        </p>
        <img className="IosTest" alt=" " src={IOStest} />
        <button
          className="authBtn"
          onClick={() => {
            window.location =
              "http://dauth.b1nd.com/login?client_id=39bc523458c14eb987b7b16175426a31a9f105b7f5814f1f9eca7d454bd23c73&redirect_uri=http://localhost:3000/callback";
          }}
        >
          <h1>멘투멘 시작하기</h1>
        </button>
      </div>
    </>
  );
}

export default Introduce;
