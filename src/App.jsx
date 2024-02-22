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
import Corsi from "./components/Corsi";
import Shop from "./components/Shop";
import Carrello from "./components/Carrello";
import Abbonamenti from "./components/Abbonamenti";
import Footer from "./components/Footer";

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
          <Route path="/corsi" element={<Corsi />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Carrello />} />
          <Route path="/abbonamenti" element={<Abbonamenti />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
