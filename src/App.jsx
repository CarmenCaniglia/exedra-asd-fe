import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { useState } from "react";
import Login from "./components/Login";
import AdminArea from "./components/AdminArea";
import UserPage from "./components/UserPage";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar
          onRegisterClick={handleShowRegister}
          onLoginClick={handleShowLogin}
        />
        <Register show={showRegister} handleClose={handleCloseRegister} />
        <Login show={showLogin} handleClose={handleCloseLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-area" element={<AdminArea />} />
          <Route path="/user-page" element={<UserPage />} />
          {/* Qui puoi aggiungere altre Route per altre pagine */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
