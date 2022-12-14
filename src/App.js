import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import DarkMode from "./components/DarkMode/DarkMode";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <StartNav />
        <DarkMode />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/callback" element={<AuthLoadingPage />} />
          <Route path="/list" element={<List />} />
          <Route path="/comment/:postId" element={<Comment />} />
          <Route path="/form" element={<Inputpage />} />
          <Route path="/mypage" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
