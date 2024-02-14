import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "../assets/loghi/LOGO copia 2.png";
import Register from "./Register";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyNavbar = ({ onRegisterClick, onLoginClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row>
        <Navbar>
          <Col xs={4} md={3} lg={2} className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              <img
                alt="logo Exedra"
                src={logo}
                width="150"
                height="50"
                className="ms-3"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={8} md={6} lg={8}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-evenly"
            >
              <Nav>
                <Nav.Link as={Link} to="/" className="mx-3">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/servizi" className="mx-3">
                  Servizi
                </Nav.Link>
                <Nav.Link as={Link} to="/abbonamenti" className="mx-3">
                  Abbonamenti
                </Nav.Link>
                <Nav.Link as={Link} to="/corsi" className="mx-3">
                  Corsi
                </Nav.Link>
                <Nav.Link as={Link} to="/shop" className="mx-3">
                  Shop
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={2}
            className="d-flex justify-content-end align-items-center"
          >
            <Nav className="justify-content-end me-3">
              {isAuthenticated ? (
                <>
                  {userRole === "ADMIN" && (
                    <Nav.Link as={Link} to="/admin-area">
                      Area Admin
                    </Nav.Link>
                  )}
                  {userRole === "USER" && (
                    <Nav.Link as={Link} to="/user-page">
                      Pagina Utente
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="#" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="#" onClick={onLoginClick}>
                    Login
                  </Nav.Link>{" "}
                  {/* Usa onLoginClick qui */}
                  <div className="separatore"> | </div>
                  <Nav.Link as={Link} to="#" onClick={onRegisterClick}>
                    Registrati
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Col>
        </Navbar>
      </Row>
      <Register show={showRegister} handleClose={handleCloseRegister} />
    </Container>
  );
};

export default MyNavbar;
