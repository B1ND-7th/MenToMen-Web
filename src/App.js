import "./App.css";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import AuthLoadingPage from "./page/AuthLoadingPage";
import StartNav from "./components/Nav/StartNav";
import File from "./components/File/File";
import Input from "./components/Input/Input";
import Inputpage from "./page/Inputpage/Inputpage";
import "./color.css";
import LastButton from "./components/Button/LastButton/LastButton";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/callback" element={<AuthLoadingPage />} />
        </Routes>
      </BrowserRouter>
      <Inputpage />
      <LastButton />
      <Inputpage />

    </div>
  );
}
export default App;
