import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios";
import MyListItem from "./MyListItem/MyListItem";
import post from "../../img/post.png";
import "../../components/MyList/MyList.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";

const Mylist = () => {
  const [mypost, setMyPost] = useState([]);
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const userData = useRecoilValue(userStateAtom);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/post");
      console.log(data.data);

      setMyPost(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <div className="myProfile">
        {userData[0]?.imgUrl ? (
          <img
            src={userData[0]?.imgUrl}
            className="myImg"
            alt={"listItem profile"}
          />
        ) : (
          <img
            src="http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"
            alt="img"
            className="myImg"
          />
        )}
        <div className="myGrade">
          <h1 className="grade">{`${mypost[0]?.stdInfo.grade}학년 ${mypost[0]?.stdInfo.room}반 ${mypost[0]?.stdInfo.number}번`}</h1>
          <h1 className="myName">{mypost[0]?.userName}</h1>
        </div>
      </div>
      <img
        src={post}
        alt=""
        onClick={() => setModal(!modal)}
        className="postImg"
      />
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
