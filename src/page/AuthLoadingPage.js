import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthLoadingPage = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return <div>authLoadingPage</div>;
};

export default AuthLoadingPage;

// useEffect(() => {localStorage.setItem("?", JSON.stringify([])),[]}
