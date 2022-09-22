import React, { useEffect } from "react";
import StartNav from "../Nav/Start/StartNav";
import "./Startpage.css";
import Button from "../Button/Button/Button";
import IOStest from "../../img/IOStest.png";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios/customAxios";

function StartPage() {
  let navigate = useNavigate();
  const request = async () => {
    try {
      await customAxios.get("/user/my");
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <section className="top">
        <div className="sectionText">
          <h1>
            멘토 멘티 찾기 서비스
            <br />
            멘투멘을 만나보세요
          </h1>
          <h3>멘투멘은 멘토와 멘티를 서로 이어주는 서비스 입니다</h3>
        </div>

        <div className="iosImgContainer">
          <img className="iosimg" alt="" src={IOStest} />
        </div>
        <div>{/* 00명의 멘티가 도움을 기다립니다 들어갈 자리  */}</div>
      </section>
      <div className="btn">
        <Button />
      </div>
    </>
  );
}
export default StartPage;
