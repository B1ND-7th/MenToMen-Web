import React, { useEffect, useState } from "react";
import "../../components/Modal/Modal.css";
import useFeedMenu from "../../Hooks/useFeedMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";
import { postAtom } from "../../recoil/uploadAtom";
import { customAxios } from "../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";
import { listState } from "../../recoil/listAtom";
import usePostModal from "../../Hooks/usePostModal";

const Modal = ({ data, isModify, onChangeModify }) => {
  const [list, setList] = useRecoilState(listState);
  const { sentDeleteFeedData } = useFeedMenu();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const userData = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

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
    <div className="modalWrap">
      <div
        className="modalAble"
        onClick={() => {
          sentDeleteFeedData(data.postId);
        }}
      >
        삭제하기
      </div>
      <div className="modalAble" onClick={onChangeModify}>
        수정하기
      </div>
    </div>
  );
};

export default Modal;
