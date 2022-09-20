import { useState } from "react";
import { customAxios } from "../lib/axios/customAxios";
import { buttonState, deleteState } from "../recoil/modalAtom";
import { useRecoilState } from "recoil";

const useFeedMenu = () => {
  const [value, setValue] = useRecoilState(deleteState);

  const toggleFeedMenuClick = () => {
    setValue((prev) => ({ ...prev, isMenu: !prev.isMenu }));
  };

  const sentDeleteFeedData = async (id) => {
    window.alert("삭제하시겠습니까");

    try {
      const { data } = await customAxios.delete(`/post/delete/${id}`);
      if (data.status === 200) {
        window.alert("삭제되었습니다");
        toggleFeedMenuClick();
        window.location.reload();
        return;
      }
      return data;
    } catch (error) {
      window.alert("삭제 실패");
      toggleFeedMenuClick();
      const { data } = error.response;
      return data;
    }
  };

  return {
    toggleFeedMenuClick,
    sentDeleteFeedData,
  };
};

export default useFeedMenu;
