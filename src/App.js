import "./App.css";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import AuthLoadingPage from "./page/AuthLoadingPage";
import StartNav from "./components/Nav/StartNav";

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
    </div>
  );
}
export default App;
