import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";
import "./List.css";
import { useRecoilState } from "recoil";
import { listState } from "../../recoil/listAtom";
import Sidebar from "../Sidebar/Sidebar.js";
import Slider from "react-slick";

function List() {
  const [list, setList] = useRecoilState(listState);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/read-all");
      setList(data);
      setList(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <div className="listSection">
        {/* <Sidebar /> */}
        {list?.map((item, idx) => (
          <>
            <ListItem data={item} key={item.name + " " + idx} />
            {/* <Sidebar data={item} key={item.name + " " + idx} /> */}
          </>
        ))}
      </div>
    </>
  );
}

export default List;
