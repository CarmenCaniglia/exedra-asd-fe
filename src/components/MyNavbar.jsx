import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "../assets/loghi/LOGO copia 2.png";
import Register from "./Register";
import { useState } from "react";

const MyNavbar = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <Container fluid>
      <Row>
        <Navbar>
          <Col xs={4} md={3} lg={2} className="d-flex align-items-center">
            <Navbar.Brand href="#home">
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
                <Nav.Link href="#home" className="mx-3">
                  Home
                </Nav.Link>
                <Nav.Link href="#servizi" className="mx-3">
                  Servizi
                </Nav.Link>
                <Nav.Link href="#abbonamenti" className="mx-3">
                  Abbonamenti
                </Nav.Link>
                <Nav.Link href="#corsi" className="mx-3">
                  Corsi
                </Nav.Link>
                <Nav.Link href="#shop" className="mx-3">
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
              <Nav.Link href="#login">Login</Nav.Link>
              <div className="separatore"> | </div>
              <Nav.Link href="#registrati" onClick={handleShowRegister}>
                Registrati
              </Nav.Link>
            </Nav>
          </Col>
        </Navbar>
      </Row>
      <Register show={showRegister} handleClose={handleCloseRegister} />
    </Container>
  );
};

export default MyNavbar;
