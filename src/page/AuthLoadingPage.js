import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";
import { ACCESS_KEY, REFRESH_KEY } from "../constants/auth/auth.constant";
import { customAxios } from "../lib/axios/customAxios";

const AuthLoadingPage = () => {
  const { search } = useLocation();
  const query = QueryString.parse(search);
  const navigate = useNavigate();

  console.log(query);

  // useEffect(() => {
  //   console.log(location);
  //   console.log(location.search);
  // }, [location]);

  const request = async (code) => {
    try {
      const { data } = await axios.post("http://10.80.162.146:8080/auth/code", {
        code,
      });

      localStorage.setItem(ACCESS_KEY, data.data.accessToken);
      localStorage.setItem(REFRESH_KEY, data.data.refreshToken);
      navigate("/list");
    } catch (error) {}
  };

  const checkOut = async () => {
    try {
      const response = await customAxios.post("/auth/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      request(query.code);
    }
  }, [query]);

  return <h1>404 Page</h1>;
};

export default AuthLoadingPage;
