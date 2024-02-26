import { useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import AdminUser from "./AdminUser";
import AdminAbbonamenti from "./AdminAbbonamenti";

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
        return <div>Lista Corsi</div>;

      case "shop":
        return <div>Lista Prodotti</div>;
      default:
        return <div>Seleziona una sezione</div>;
    }
  };

  return (
    <Container className="admin-sections">
      <Nav className="justify-content-center" onSelect={handleSelect}>
        <Row>
          <Col xs={12} md={3}>
            <Nav.Link eventKey="utenti">Utenti</Nav.Link>
          </Col>
          <Col xs={12} md={3}>
            <Nav.Link eventKey="abbonamenti">Abbonamenti</Nav.Link>
          </Col>
          <Col xs={12} md={3}>
            <Nav.Link eventKey="corsi">Corsi</Nav.Link>
          </Col>
          <Col xs={12} md={3}>
            <Nav.Link eventKey="shop">Shop</Nav.Link>
          </Col>
        </Row>
      </Nav>
      {/* Render della sezione attiva */}
      <div>{renderSection()}</div>
    </Container>
  );
};

export default AdminArea;
