import { useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import AdminUser from "./AdminUser";
import AdminAbbonamenti from "./AdminAbbonamenti";
import AdminCorsi from "./AdminCorsi";

const AdminArea = () => {
  const [activeSection, setActiveSection] = useState("utenti");

  const handleSelect = (selectedArea) => {
    setActiveSection(selectedArea);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "utenti":
        return <AdminUser />;

      case "abbonamenti":
        return <AdminAbbonamenti />;

      case "corsi":
        return <AdminCorsi />;

      case "shop":
        return <div>Lista Prodotti</div>;
      default:
        return <div>Seleziona una sezione</div>;
    }
  };

  return (
    <Container className="admin-sections">
      <Nav className="justify-content-center" onSelect={handleSelect}>
        <Row className="d-flex justify-content-between mb-3">
          <Col xs="auto" className=" text-center">
            <Nav.Link eventKey="utenti" className="link">
              Utenti
            </Nav.Link>
          </Col>
          <Col xs="auto" className=" text-center flex-grow-1">
            <Nav.Link eventKey="abbonamenti" className="link">
              Abbonamenti
            </Nav.Link>
          </Col>
          <Col xs="auto" className=" text-center">
            <Nav.Link eventKey="corsi" className="link">
              Corsi
            </Nav.Link>
          </Col>
          <Col xs="auto" className=" text-center">
            <Nav.Link eventKey="shop" className="link">
              Shop
            </Nav.Link>
          </Col>
        </Row>
      </Nav>
      {/* Render della sezione attiva */}
      <div>{renderSection()}</div>
    </Container>
  );
};

export default AdminArea;
