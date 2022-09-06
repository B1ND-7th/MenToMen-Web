import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";
import { ACCESS_KEY } from "../constants/auth/auth.constant";

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
      const { data } = await axios.post("http://10.80.162.20:8080/auth/code", {
        code,
      });
      localStorage.setItem(ACCESS_KEY, data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    const response = await axios.post("http://10.80.162.20:8080/auth/", {
      Headers: {
        access_token: localStorage.getItem(ACCESS_KEY),
      },
    });

    console.log(response);
  };

  useEffect(() => {
    if (query) {
      request(query.code);
    }
  }, [query]);

  return <h1>404 Page</h1>;
};

export default AuthLoadingPage;
