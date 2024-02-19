import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../redux/actions";

const Carrello = () => {
  const cart = useSelector((state) => state.cart.content);
  const dispatch = useDispatch();
  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {cart.map((prodotto, i) => (
            <li key={i} className="my-4 d-flex align-items-center">
              <Button
                variant="danger"
                className="me-2"
                onClick={() => {
                  dispatch(removeFromCartAction(i));
                }}
              >
                <i className="bi bi-trash"></i>
              </Button>
              <img
                className="img-fluid"
                src={prodotto.image}
                alt={prodotto.nome}
                style={{ width: "50px", height: "50px", marginRight: "10px" }} // Assicurati di adattare queste dimensioni al design del tuo sito
              />
              {prodotto.nome} - {prodotto.prezzo}€
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="fw-bold mb-3 ms-4">
          TOTALE:{" "}
          {cart.reduce((acc, prodotto) => acc + parseFloat(prodotto.prezzo), 0)}
          €
        </Col>
      </Row>
    </Row>
  );
};

export default Carrello;
