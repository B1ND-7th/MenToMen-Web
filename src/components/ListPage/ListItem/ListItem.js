import React from "react";
import "./Listitem.css";

const ListItem = ({ data }) => {
  return (
    <div className="formSection">
      <div>{data.userName}</div>
      <div>{data.tags}</div>
      <div>{data.localDateTime}</div>
      <div>{data.content}</div>
      <div>
        {data.stdInfo.grade}학년 {data.stdInfo.room}반 {data.stdInfo.number}번
      </div>
    </div>
  );
};

export default ListItem;
