import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { commentListAtom, postAtom } from "../../../recoil/uploadAtom";

import "./CommentList.css";
import profileimg from "../../../img/aprofile.png";

import CommentDelete from "../../Button/CommentDelete/CommentDelete";

export default function CommentList() {
  const [commentList, setCommentList] = useRecoilState(commentListAtom);
  const [postId, setPostid] = useRecoilState(postAtom);

  const [commentbox, setCommentbox] = useState([]);

  const request = async () => {
    try {
      const { data } = await customAxios.get(`/comment/read/${postId}`);
      console.log(data);
      setCommentList(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  return (
    <>
      <div className="CommentListComment">
        {commentList.map((item) => (
          <>
            <div className="CommentListBox">
              <div className="CommentListBoxWrap">
                <div className="test">
                  {item.profileUrl ? (
                    <img
                      src={item.profileUrl}
                      className="CommentListProfileUrl"
                      alt={"listItem profile"}
                    />
                  ) : (
                    <img
                      src={profileimg}
                      alt="img"
                      className="CommentListProfileUrl"
                    />
                  )}
                </div>

                <div className="CommentListuserName">{item.userName}</div>

                <div className="CommentListContentBox">
                  <div className="CommentListContent">{item.content}</div>
                </div>

                <div className="TrashImgBox">
                  <CommentDelete
                    id={item.commentId}
                    comments={commentList}
                    item={item}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
