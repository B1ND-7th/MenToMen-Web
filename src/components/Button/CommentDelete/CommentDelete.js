import React from "react";
import "./CommentDelete.css";
import Img from "../../../img/img.png";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commentAtom,
  CommentIdAtom,
  commentListAtom,
  CommentUserId,
} from "../../../recoil/uploadAtom";
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

  useEffect(() => {
    setCommentId(id);
  }, [id]);

  const Removecomment = () => {
    setCommentList(
      comments.filter((comments) => comments.commentId !== commentId)
    );
  };

  const Commentdelete = async () => {
    try {
      const { data } = await customAxios.delete(`/comment/delete/${commentId}`);
      Removecomment();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="TrashImgBox">
      {userData.userId === item.userId && (
        <img
          src={Img}
          alt="trashimg"
          className="TrashImg"
          onClick={Commentdelete}
        />
      )}
    </div>
  );
}
