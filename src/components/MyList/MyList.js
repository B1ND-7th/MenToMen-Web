import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios";
import MyListItem from "./MyListItem/MyListItem";

const Mylist = () => {
  const [mypost, setMyPost] = useState([]);
  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/post");
      setMyPost(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="listSection">
      {mypost.map((item, idx) => (
        <MyListItem data={item} key={item.name + " " + idx} />
      ))}
    </div>
  );
};

export default Mylist;
