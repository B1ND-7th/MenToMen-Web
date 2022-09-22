import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";
import "./List.css";
import StartNav from "../Nav/Start/StartNav.js";

function List() {
  const [list, setList] = useState([]);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/read-all");
      console.log(data);
      setList(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      {/* <StartNav/> */}
      <div className="listSection">
        {list.map((item, idx) => (
          <ListItem data={item} key={item.name + " " + idx} />
        ))}
      </div>
    </>
  );
}

export default List;
