import React, { useEffect } from "react";
import StartNav from "../Nav/Start/StartNav";
import "./Startpage.css";
import Button from "../Button/Button/Button";
import IOStest from "../../img/IOStest.png";
import { useRecoilState } from "recoil";
import { listState } from "../../recoil/listAtom";
import { customAxios } from "../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const [list, setList] = useRecoilState(listState);
  const navigate = useNavigate();

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/read-all");
      setList(data.data);
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
      </section>
      <div className="menList">
        <div className="realMenWrap">
          <span className="listCount">{list.length}</span>
          <strong className="hardWord">명</strong>
          <span className="nomalWord">의 멘티가 도움을 기다립니다.</span>
        </div>
        <Button className="realMainBtn" />
      </div>
    </>
  );
}
export default StartPage;
