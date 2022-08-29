import "./App.css";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import AuthLoadingPage from "./page/AuthLoadingPage";
import Startnav from "./components/Nav/startnav";
import Nav from "./hooks/MainNav";
import { useEffect } from "react";
function App() {
  return (
    <BrowserRouter>
      <Startnav />
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/callback" element={<AuthLoadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
