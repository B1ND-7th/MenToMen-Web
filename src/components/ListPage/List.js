import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";
import "./List.css";
import { useRecoilState } from "recoil";
import { listState } from "../../recoil/listAtom";
import ListProfile from "./ListProfile/ListProfile.js";
import Notice from "../Notice/Notice.js";

function List() {
  const [list, setList] = useRecoilState(listState);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/read-all");
      setList(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <div className="listContainer">
        <ListProfile />

        <div className="listSectionContainer">
          <div className="listSectionWrap">
            {list?.map((item, idx) => (
              <>
                <ListItem data={item} key={item.name + " " + idx} />
              </>
            ))}
          </div>
        </div>

        <Notice />
      </div>
    </>
  );
}

export default List;
