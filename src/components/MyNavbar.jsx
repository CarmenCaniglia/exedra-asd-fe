import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "../assets/loghi/LOGO copia 2.png";
import Register from "./Register";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions";

const MyNavbar = ({ onRegisterClick, onLoginClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.user);
  const isAuthenticated = token != null;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <Container fluid className="navbar-custom px-0">
      <Row>
        <Navbar fixed="top" bg="white" expand="lg">
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
                  {role === "ADMIN" && (
                    <Nav.Link as={Link} to="/admin-area">
                      Area Admin
                    </Nav.Link>
                  )}
                  {role === "USER" && (
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
