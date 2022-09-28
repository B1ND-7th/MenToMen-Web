import React, { useEffect } from "react";
import "./ListItem.css";
import talk from "../../../img/talk.png";
import trash from "../../../img/trash.png";
import useFeedMenu from "../../../Hooks/useFeedMenu";
import { userStateAtom } from "../../../recoil/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";

const FeedMenuModal = ({ data }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/my");

      setUserInfo(data.data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    request();
  }, []);
  const userData = useRecoilValue(userStateAtom);

  const date = new Date(data.createDateTime);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const theHours = date.getHours();
  const theMinutes = date.getMinutes();

