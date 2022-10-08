import React from "react";
import "./CommentDelete.css";
import Img from "../../../img/img.png";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commentAtom,
  CommentIdAtom,
  commentListAtom,
  CommentUserId,
} from "../../../store/upload/uploadAtom";
import { customAxios } from "../../../lib/axios/customAxios";
import { useEffect } from "react";
import { useState } from "react";
import { userStateAtom } from "../../../recoil/userAtom";

export default function CommentDelete({ id, comments, item }) {
  const [Commentid, setCommentid] = useRecoilState(CommentIdAtom);
  const [comment, setComment] = useRecoilState(commentAtom);
  const [commentId, setCommentId] = useState();
  const userData = useRecoilValue(userStateAtom);
  const [commentList, setCommentList] = useRecoilState(commentListAtom);
  const [commetuserId, setCommentuserId] = useRecoilState(CommentUserId);
  // const userData = useRecoilState(userStateAtom);

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  useEffect(() => {
    setCommentId(id);
  }, [id]);

  const Removecomment = () => {
    setCommentList(
      comments.filter((comments) => comments.commentId !== commentId)
    );
  };

  // useEffect(() => {
  //   console.log(data.userId);
  // });

  const Commentdelete = async () => {
    try {
      const { data } = await customAxios.delete(`/comment/delete/${commentId}`);
      Removecomment();
      return data;

      // setCommentuserId(data.data);

      // window.alert("삭제되었습니다");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(comment);
  // });

  useEffect(() => {
    console.log(22222, userData.userId);
    console.log(33333, item);
  }, []);

  return (
    <div className="TrashImgBox">
      {userData.userId === item.userId && (
        <img
          src={Img}
          alt="trashimg"
          className="TrashImg"
          onClick={Commentdelete}
        ></img>
      )}
    </div>
  );
}
