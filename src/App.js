import "./App.css";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import AuthLoadingPage from "./page/AuthLoadingPage";
import Nav from "./hooks/MainNav";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/callback" element={<AuthLoadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
