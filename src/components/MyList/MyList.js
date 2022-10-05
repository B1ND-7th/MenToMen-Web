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
  const [modal, setModal] = useState(false);
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
      console.log(userInfo);
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
      <div className="myProfile">
        {userInfo.profileUrl ? (
          <img
            src={userInfo.profileUrl}
            className="myImg"
            alt={"listItem profile"}
          />
        ) : (
          <img src={aprofile} alt="img" className="myImg" />
        )}
        <div className="myGrade">
          <h1 className="grade">{`${userInfo?.stdInfo?.grade}학년 ${userInfo?.stdInfo?.room}반 ${userInfo?.stdInfo?.number}번`}</h1>
          <h1 className="myName">{userInfo.name}</h1>
        </div>
        <img
          src={post}
          alt=""
          onClick={() => setModal(!modal)}
          className="postImg"
        />
      </div>

      <div className="listSection">
        {mypost.map((item, idx) =>
          modal === true ? (
            <MyListItem data={item} key={item.name + " " + idx} />
          ) : null
        )}
      </div>
    </>
  );
};

export default Mylist;