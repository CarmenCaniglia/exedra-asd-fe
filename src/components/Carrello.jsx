import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../redux/actions";

const Carrello = () => {
  const cart = useSelector((state) => state.cart.cart.content);
  const dispatch = useDispatch();
  return (
    <Container className="cart-container ">
      <Row className="cart">
        <h1 className="titolo-shop">Riepilogo ordine:</h1>
        <Col sm={12}>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: "0 auto" }}>
            {cart.map((prodotto, i) => (
              <li key={i} className="my-4 d-flex align-items-center ">
                <img
                  className="img-fluid"
                  src={prodotto.image}
                  alt={prodotto.nome}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                {prodotto.nome} - {prodotto.prezzo}€
                <i
                  className="bi bi-trash-fill ms-3 i-custom"
                  style={{ cursor: "pointer", fontSize: "1.4rem" }}
                  onClick={() => {
                    const isConfirmed = window.confirm(
                      "Sei sicuro di voler rimuovere l'elemento dal carrello?"
                    );
                    if (isConfirmed) {
                      dispatch(removeFromCartAction(i));
                    }
                  }}
                  role="button"
                  aria-label="Remove item"
                ></i>
              </li>
            ))}
          </ul>
        </Col>
        <Row className=" cart justify-content-center text-center mt-4">
          <Col sm={12} className="titolo-shop fs-5 fw-bold mb-3 ms-4">
            TOTALE:{" "}
            {cart.reduce(
              (acc, prodotto) => acc + parseFloat(prodotto.prezzo),
              0
            )}
            €
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Carrello;
