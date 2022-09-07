import "./App.css";
// import StartPage from "./components/StartPage/StartPage";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import AuthLoadingPage from "./page/AuthLoadingPage";
import Introduce from "./components/Introduce/Introduce";
import List from "./components/ListPage/List";
// import StartNav from "./components/Nav/StartNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/callback" element={<AuthLoadingPage />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
