import React from "react";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";
import Imgpp from "../../img/imgpp.png";
import "../Ask/Ask.css";
const Ask = () => {
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  return (
    <>
      <div className="askWrap">
        <p>멘토 요청하기</p>
        <div className="askMidWrap">
          <img src={userInfo.profileImage} alt=" " className="inputUser" />
          <form>
            <input placeholder="멘토 요청할 내용을 작성하세요" />
          </form>
          <img src={Imgpp} alt="" className="inputFile" />
        </div>
      </div>
    </>
  );
};

export default Ask;
