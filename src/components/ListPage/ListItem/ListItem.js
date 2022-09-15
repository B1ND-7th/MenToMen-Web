import React from "react";
import "./Listitem.css";

const ListItem = ({ data }) => {
  const date = new Date(data.localDateTime);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const theHours = date.getHours();
  const theMinutes = date.getMinutes();
  console.log(theHours);

  return (
    <div className="formSection">
      <div className="leftSection">
        <div className="profile">
          <div className="profileUrl">
            {data.profileUrl && (
              <img
                src={data.profileUrl}
                className="profileUrl"
                alt={"listItem profile"}
              />
            )}
          </div>
          <div className="nameTag">
            <div className="userName">{data.userName}</div>
            <div className="tagbox">
              <div className="tag">{data.tag}</div>
            </div>
          </div>
          <div className="date">
            {`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 ${week[date.getDay()]}요일 `}
            {theHours > 12
              ? `오후 ${theHours - 12}시 ${theMinutes}분`
              : `오전${theHours}`}
          </div>
        </div>
        <div className="contentSection">{data.content}</div>
        <div className="able">채팅이모티콘</div>
      </div>

      <div className="imgUrl">
        {data.imgUrl && (
          <img src={data.imgUrl} className="imgUrl" alt={"listItem img"} />
        )}
      </div>
    </div>
  );
};

export default ListItem;
