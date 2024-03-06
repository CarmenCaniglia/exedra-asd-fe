import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const Carrello = () => {
  const cart = useSelector((state) => state.cart.cart.content);
  const dispatch = useDispatch();
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  const removeItemFromCart = (index) => {
    dispatch(removeFromCartAction(index));
    toast.success("Prodotto rimosso dal carrello!");
  };

  const handleCheckout = () => {
    window.open("https://buy.stripe.com/test_dR6aI90u203d0GQ147", "_blank");
    setShowCheckoutConfirm(false);
  };

  return (
    <Container className="cart-container ">
      <ToastContainer position="top-center" autoClose={2000} />
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
                  onClick={() => removeItemFromCart(i)}
                  role="button"
                  aria-label="Remove item"
                ></i>
              </li>
            ))}
          </ul>
        </Col>
        <Row className=" cart justify-content-center text-center mt-4">
          <Col sm={12} className="d-flex fw-bold mb-3 ms-4">
            <div className="totale-shop">
              TOTALE:{" "}
              {cart
                .reduce((acc, prodotto) => acc + parseFloat(prodotto.prezzo), 0)
                .toFixed(2)}
              €
            </div>
            <button
              type="button"
              className="bn632-hover bn19 ms-5 "
              onClick={() => setShowCheckoutConfirm(true)}
            >
              CHECKOUT
            </button>
          </Col>
        </Row>
      </Row>
      <Modal
        show={showCheckoutConfirm}
        onHide={() => setShowCheckoutConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler procedere al checkout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCheckoutConfirm(false)}
          >
            Annulla
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Carrello;
