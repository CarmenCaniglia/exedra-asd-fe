import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { useState } from "react";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar onRegisterClick={handleShowRegister} />
        <Register show={showRegister} handleClose={handleCloseRegister} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Qui puoi aggiungere altre Route per altre pagine */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
