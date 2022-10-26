import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userStateAtom } from "../../../recoil/userAtom";
import "../ListProfile/ListProfile.css";
import Design from "../../../img/Design.svg";
import Web from "../../../img/Web1.svg";
import Android from "../../../img/Android.svg";
import Ios from "../../../img/Ios.svg";
import Server from "../../../img/Server.svg";
import copy from "../../../img/copy.png";
import { ACCESS_KEY, REFRESH_KEY } from "../../../constants/auth/auth.constant";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../lib/axios/customAxios";
import { listState } from "../../../recoil/listAtom";
import { tagPost } from "../../../api/auth/tagSearch.api";
import darkcopy from "../../../img/darkcopy.png";
import useDarkMode from "use-dark-mode";

const ListProfile = () => {
  const currentMode = useDarkMode(localStorage.getItem("darkMode"));
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const setList = useSetRecoilState(listState);

  const test123 = async (tag) => {
    const { data } = await tagPost(tag);
    setList(data);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await customAxios.get("/user/my");
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
          <p className="mainUserGrade">{`${userInfo?.stdInfo?.grade}학년 ${userInfo?.stdInfo?.room}반 ${userInfo?.stdInfo?.number}번`}</p>
        </div>
      </div>
      <div className="mainTag">
        <div className="dd">
          <img src={Design} alt="" />
          <p
            onClick={() => {
              test123("DESIGN");
            }}
          >
            Design
          </p>
        </div>
        <div className="dd">
          <img src={Web} alt="" />
          <p
            onClick={() => {
              test123("WEB");
            }}
          >
            Web
          </p>
        </div>
        <div className="dd">
          <img src={Android} alt="" />
          <p
            onClick={() => {
              test123("ANDROID");
            }}
          >
            Android
          </p>
        </div>
        <div className="dd">
          <img src={Server} alt="" />
          <p
            onChange={(e) => {}}
            onClick={() => {
              test123("SERVER");
            }}
          >
            Server
          </p>
        </div>
        <div className="dd">
          <img src={Ios} alt="" />
          <p
            onClick={() => {
              test123("IOS");
            }}
          >
            iOS
          </p>
        </div>
      </div>
      <div className="checkList">
        <img
          src={currentMode.value === true ? darkcopy : copy}
          alt=""
          className="copy"
        />
        <p onClick={() => navigate("/mypage")}>내가 쓴 멘토 요청글</p>
      </div>
      <div
        className="mainLogOut"
        onClick={() => {
          localStorage.removeItem(ACCESS_KEY);
          localStorage.removeItem(REFRESH_KEY);
          navigate("/");
          window.location.reload();
        }}
      >
        로그아웃
      </div>
    </div>
  );
};

export default ListProfile;
