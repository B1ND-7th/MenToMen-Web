import React, { useEffect, useState } from "react";
import useFeedMenu from "../../../Hooks/useFeedMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../../recoil/userAtom";
import talk from "../../../img/talk.png";
import trash from "../../../img/trash.svg";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../lib/axios/customAxios";

const MyListItem = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const navigate = useNavigate();

  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/my");
      setUserInfo(data.data);
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    request();
  }, []);

  const date = new Date(data.createDateTime);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const theHours = date.getHours();
  const theMinutes = date.getMinutes();
  const { sentDeleteFeedData } = useFeedMenu();
  const userData = useRecoilValue(userStateAtom);

  const changeTagColor = () => {
    switch (data.tag) {
      case "WEB":
        return "#D38D42";
      case "DESIGN":
        return "#D83F67";
      case "SERVER":
        return "#3E89DB";
      case "ANDROID":
        return "#35C174";
      case "IOS":
        return "#4C4C4C";
      default:
        break;
    }
  };

  return (
    <>
      <div className="formSection">
        <div className="leftSection">
          <div className="profile">
            <div className="profileUrl">
              {data.profileUrl ? (
                <img
                  src={data.profileUrl}
                  className="profileUrl"
                  alt={"listItem profile"}
                />
              ) : (
                <img
                  src="http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"
                  alt="img"
                />
              )}
            </div>
            <div className="nameTag">
              <div className="userName">{data.userName}</div>
              <div
                className="tagbox"
                style={{
                  border: `1px solid ${changeTagColor()}`,
                  color: `${changeTagColor()}`,
                }}
              >
                <div className="tag">{data.tag}</div>
              </div>
            </div>
            <div className="date">
              {`${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일 ${week[date.getDay()]}요일 `}
              {theHours > 12
                ? `오후 ${theHours - 12}시 ${theMinutes}분`
                : `오전 ${theHours}시 ${theMinutes}분`}
            </div>
            {userData.userId === data.author ? (
              <img
                src={trash}
                className="trashImg"
                alt=""
                onClick={() => sentDeleteFeedData(data.postId)}
              />
            ) : null}
          </div>
          <p className="contentSection">{data.content}</p>
          <img className="able" src={talk} alt={""} />
        </div>
        <div className="imgUrl">
          {data.imgUrl && (
            <img src={data.imgUrl} className="imgUrl" alt={"listItem img"} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyListItem;
