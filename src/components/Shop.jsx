import { Button, Col, Container, Row } from "react-bootstrap";
import Prodotti from "./Prodotti";
import DettagliProdotto from "./DettagliProdotti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Shop = () => {
  const [prodottoSelected, setProdottoSelected] = useState(null);
  const navigate = useNavigate();
  const cartLength = useSelector((state) => state.cart.content.length);
  return (
    <Container>
      <div className="d-flex align-items-baseline justify-content-between my-4">
        <h2>Scopri i nostri prodotti!</h2>
        <Button
          onClick={() => navigate("/cart")}
          className="d-flex align-items-center"
        >
          <i className="bi bi-cart"></i>
          <span className="ms-2">{cartLength}</span>
        </Button>
      </div>
      <Row>
        <Col lg={4}>
          <Prodotti
            setSelected={setProdottoSelected}
            selected={prodottoSelected}
          />
        </Col>
        <Col lg={8}>
          <DettagliProdotto prodottoSelected={prodottoSelected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
