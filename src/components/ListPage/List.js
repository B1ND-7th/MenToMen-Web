import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";
import "./List.css";
import Search from "../Search/Search.js";
import { useRecoilState } from "recoil";
import { listState } from "../../recoil/listAtom";
function List() {
  const [list, setList] = useRecoilState(listState);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/read-all");
      setList(data);
      console.log(data);
      setList(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Search />
      <div className="listSection">
        {list.map((item, idx) => (
          <ListItem data={item} key={item.name + " " + idx} />
        ))}
      </div>
    </>
  );
}

export default List;
