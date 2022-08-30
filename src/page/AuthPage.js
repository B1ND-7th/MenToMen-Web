import config from "../config.json";
const AuthPage = () => {
  return (
    <div>
      <a
        href={`http://dauth.b1nd.com/login?client_id=${config.CLIENTID}&redirect_uri=http://localhost:3000/callback`}
      >
        도담도담 계정으로 로그인하기
      </a>
      <button
        className="auth-path"
        onClick={() => {
          window.location =
            "http://dauth.b1nd.com/login?client_id=39bc523458c14eb987b7b16175426a31a9f105b7f5814f1f9eca7d454bd23c73&redirect_uri=http://localhost:3000/callback";
        }}
      >
        도담도담 계정으로 로그인하기
      </button>
    </div>
  );
};

export default AuthPage;
