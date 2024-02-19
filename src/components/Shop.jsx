import { Button, Col, Container, Row } from "react-bootstrap";
import Prodotti from "./Prodotti";
import DettagliProdotto from "./DettagliProdotti";
import { useState } from "react";

const Shop = () => {
  const [selected, setSelected] = useState(null);
  return (
    <Container>
      <div className="d-flex align-items-baseline justify-content-between my-4">
        <h2>Scopri i nostri prodotti!</h2>
        <Button>
          <i className="bi bi-cart"></i>
        </Button>
      </div>
      <Row>
        <Col lg={4}>
          <Prodotti setSelected={setSelected} selected={selected} />
        </Col>
        <Col lg={8}>
          <DettagliProdotto selected={selected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
