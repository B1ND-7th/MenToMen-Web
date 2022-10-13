import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import Inputpage from "./page/Inputpage/Inputpage";
import Comment from "./components/comment/commentpage/Comment";
import "./color.css";
import Introduce from "./components/Introduce/Introduce";
import AuthLoadingPage from "./page/AuthLoadingPage";
import { RecoilRoot } from "recoil";
import "./App.css";
import List from "./components/ListPage/List";
import StartNav from "./components/Nav/Start/StartNav";
import MyList from "./components/MyList/MyList";
import StartPage from "./components/Startpage/Startpage";

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
          <Route path="/comment" element={<Comment />} />
          <Route path="/form" element={<Inputpage />} />
          <Route path="/mypage" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
