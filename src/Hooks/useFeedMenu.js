import { useState } from "react";
import { customAxios } from "../lib/axios/customAxios";

const useFeedMenu = () => {
  const [isMenu, setIsMenu] = useState(false);

  const toggleFeedMenuClick = () => {
    setIsMenu((prev) => !prev);
  };

  const sentDeleteFeedData = async (id) => {
    const res = await sentDeleteFeedData(id);

    const { status } = res;
    if (status === 200) {
      window.alert("삭제되었습니다");
      toggleFeedMenuClick();
      window.location.reload();
      return;
    }
    window.alert("삭제 실패");
    toggleFeedMenuClick();
    try {
      const { data } = await customAxios.delete(`/post/delete/${id}`);
      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  };

  return {
    isMenu,
    toggleFeedMenuClick,
    sentDeleteFeedData,
  };
};

export default useFeedMenu;
