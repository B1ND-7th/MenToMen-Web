import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [url, setUrl] = useState("");
  const request = async () => {
    const { data } = await axios.get(`http://10.80.162.60:8080/auth/url`);
    setUrl(data.url);
    console.log(data);
  };

  return (
    <>
      <button onClick={() => request()}>불러오기</button>
      <button onClick={() => (window.location = url)}>불러오기1</button>
      <a href="http://dauth.b1nd.com/login?client_id=39bc523458c14eb987b7b16175426a31a9f105b7f5814f1f9eca7d454bd23c73&redirect_uri=http://localhost:3000/callback">
        이동
      </a>
    </>
  );
}

export default Auth;

// {
//   "access_token": "string",
//   "refresh_token": "string",
//   "token_type": "string",
//   "expires_in": "string",
// }

// {
//   400 :
//     "검증 오류 (잘못된 형식입니다)"
//   401 :
//     "잘못된 clientSecret입니다"
//   403 :
//     "변조된 code입니다"
//   410 :
//     "토큰이 만료 되었습니다"
//   500 :
//     "Open API 서버 오류"
// }

// {
//   "refreshToken" : "string",
//   "clientId" : "string",
// }

// {
//   "access_token": "string",
//   "token_type": "string",
//   "expries_in": "string",
// }

// {
//   400 :
//     "잘못된 토큰입니다"
//   401 :
//     "위조된 토큰입니다"
//   404 :
//     "찾을 수 없는 회원입니다"
//   410 :
//     "토큰이 만료 되었습니다"
//   500 :
//     "Open API 서버 오류"
// }
