import React, { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios/customAxios.js";
import ListItem from "./ListItem/ListItem.js";

function List() {
  const [list, setList] = useState([]);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/post/readAll");
      console.log(data);
      setList(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="listSection">
      {list.map((item) => (
        <ListItem data={item} />
      ))}
    </div>
  );
}

export default List;
