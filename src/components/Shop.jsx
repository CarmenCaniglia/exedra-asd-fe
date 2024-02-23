import { Col, Container, Row } from "react-bootstrap";
import Prodotti from "./Prodotti";
import DettagliProdotto from "./DettagliProdotti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Shop = () => {
  const [prodottoSelected, setProdottoSelected] = useState(null);
  const navigate = useNavigate();
  const cartLength = useSelector((state) => state.cart.cart.content.length);

  return (
    <Container className="shop-container">
      <div className="d-flex align-items-baseline justify-content-between my-4">
        <h1 className="titolo-shop">Scopri i nostri prodotti!</h1>
        <button
          onClick={() => navigate("/cart")}
          className="custom-btn2 d-flex align-items-center"
        >
          <i className="bi bi-cart"></i>
          <span className="ms-2">{cartLength}</span>
        </button>
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
