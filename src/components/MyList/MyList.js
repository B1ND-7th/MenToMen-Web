import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios";
import MyListItem from "./MyListItem/MyListItem";
import post from "../../img/post.png";
import aprofile from "../../img/aprofile.png";
import "../../components/MyList/MyList.css";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";
import { useNavigate } from "react-router-dom";

const Mylist = () => {
  const [mypost, setMyPost] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const navigate = useNavigate();

  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/post");
      setMyPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userRequest = async () => {
    try {
      const { data } = await customAxios.get("/user/my");
      setUserInfo(data.data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    userRequest();
    request();
  }, []);

  return (
    <>
      <div className="myPageWrap">
        <div className="myProfile">
          {userInfo.profileImage ? (
            <img
              className="myImg"
              alt={"listItem profile"}
              src={userInfo.profileImage}
            />
          ) : (
            <img src={aprofile} alt="img" className="myImg" />
          )}
          {userInfo.stdInfo ? (
            <div className="myGrade">
              <h1 className="myName">{userInfo.name}</h1>
              <h1 className="grade">{`${userInfo?.stdInfo?.grade}학년 ${userInfo?.stdInfo?.room}반 ${userInfo?.stdInfo?.number}번`}</h1>
            </div>
          ) : null}
        </div>
        <div className="myPageListSection">
          {mypost.map((item, idx) => (
            <MyListItem data={item} key={item.name + " " + idx} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mylist;
