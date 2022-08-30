import React, { useEffect } from "react";
import StartNav from "../Nav/StartNav";
import "./StartPage.css";
import IOSimg from "../../img/IOSimg.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios/customAxios";
import axios from "axios";
import { ACCESS_KEY } from "../../constants/auth/auth.constant";

function StartPage() {
  let navigate = useNavigate();
  const request = async () => {
    try {
      await customAxios.get("/user/my");

      //   axios.get("http://10.80.162.9:8080/user/my", {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem(ACCESS_KEY)}`,
      //     },
      //   });
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    request();
  }, []);
  return (
    <>
      <StartNav />
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
          <img className="iosimg" alt="" src={IOSimg} />
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
