import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import StartPage from "./components/StartPage/StartPage";
import Inputpage from "./page/Inputpage/Inputpage";
import "./color.css";
import Introduce from "./components/Introduce/Introduce";
import AuthLoadingPage from "./page/AuthLoadingPage";
import List from "./components/ListPage/List";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { checkState } from "./recoil/loginCheckAtom";

function App() {
  const [isloggedIn, setIsLoggedIn] = useRecoilState(checkState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/callback" element={<AuthLoadingPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/form" element={<Inputpage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
