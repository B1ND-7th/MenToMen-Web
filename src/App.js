import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
// import StartPage from "./components/StartPage/StartPage";
import StartPage from "./components/StartPage/StartPage";
import Inputpage from "./page/Inputpage/Inputpage";
import "./color.css";
import Introduce from "./components/Introduce/Introduce";
import AuthLoadingPage from "./page/AuthLoadingPage";
import { RecoilRoot } from "recoil";

import List from "./components/ListPage/List";
import StartNav from "./components/Nav/Start/StartNav";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <StartNav />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/callback" element={<AuthLoadingPage />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Inputpage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
