import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";
import "./List.css";
import { useRecoilState } from "recoil";
import { listState } from "../../recoil/listAtom";
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
        {list?.map((item, idx) => (
          <ListItem data={item} key={item.name + " " + idx} />
        ))}
      </div>
    </>
  );
}

export default List;
