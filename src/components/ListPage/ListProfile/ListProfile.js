import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../../recoil/userAtom";
import "../ListProfile/ListProfile.css";
import Design from "../../../img/Design.png";
import Web from "../../../img/Web1.svg";
import Android from "../../../img/Android.png";
import Ios from "../../../img/Ios.svg";
import Server from "../../../img/Server.svg";
import copy from "../../../img/copy.png";
import { ACCESS_KEY, REFRESH_KEY } from "../../../constants/auth/auth.constant";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../lib/axios/customAxios";
import profileimg from "../../../img/aprofile.png";
const ListProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await customAxios.get("/api/user/my");
        setUserInfo(data.data);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="listProfileContainer">
      <div className="mainUserInfo">
        {userInfo?.profileImage ? (
          <img
            src={userInfo?.profileImage}
            className="mainProfile"
            alt={"listItem profile"}
          />
        ) : (
          <img
            src="http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"
            alt="img"
            className="mainProfile"
          />
        )}
        <div className="mainUserInfo">
          <p className="mainUserName">{userInfo?.name}</p>
          <p className="mainUserGrade">{`${userInfo?.stdInfo.grade}학년 ${userInfo?.stdInfo.room}반 ${userInfo?.stdInfo.number}번`}</p>
        </div>
      </div>
      <div className="mainTag">
        <div className="dd">
          <img src={Design} alt="" />
          <p>Design</p>
        </div>
        <div className="dd">
          <img src={Web} alt="" />
          <p>Web</p>
        </div>
        <div className="dd">
          <img src={Android} alt="" />
          <p>Android</p>
        </div>
        <div className="dd">
          <img src={Server} alt="" />
          <p>Server</p>
        </div>
        <div className="dd">
          <img src={Ios} alt="" />
          <p>iOS</p>
        </div>
      </div>
      <div className="checkList">
        <img src={copy} alt="" className="copy" />
        <p onClick={() => navigate("/mypage")}>내가 쓴 멘토 요청글</p>
      </div>
      <p
        className="mainLogOut"
        onClick={() => {
          localStorage.removeItem(ACCESS_KEY);
          localStorage.removeItem(REFRESH_KEY);
          navigate("/");
          window.location.reload();
        }}
      >
        로그아웃
      </p>
    </div>
  );
};

export default ListProfile;
