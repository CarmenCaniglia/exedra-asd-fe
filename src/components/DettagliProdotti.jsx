import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../redux/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const DettagliProdotto = ({ prodottoSelected }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCartAction(prodottoSelected));
    toast.success("Prodotto aggiunto al carrello");
  };

  return (
    <div className="mt-3 mb-4 mb-lg-0 ms-5">
      <ToastContainer position="top-center" autoClose={2000} />
      {prodottoSelected ? (
        <>
          <Row>
            <Col sm={12}>
              <h1 className="titolo-shop">{prodottoSelected.nome}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              sm={4}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mt-3">
                <img
                  className="img-fluid"
                  src={prodottoSelected.image}
                  alt="Prodotto selezionato"
                />
              </div>
            </Col>
            <Col
              sm={8}
              className="d-flex flex-column align-items-start justify-content-around"
            >
              <div>
                <p>
                  <span className="fw-bold">Descrizione:</span>&nbsp;
                  {prodottoSelected.descrizione}
                </p>
                <p>
                  <span className="fw-bold">Prezzo:</span>&nbsp;
                  {prodottoSelected.prezzo}€
                </p>
              </div>
              <div>
                <button
                  className="bn632-hover bn19 d-flex align-items-center "
                  onClick={handleAddToCart}
                >
                  <span className="ms-3 me-2 mt-1">AGGIUNGI AL</span>
                  <i className="bi bi-cart"></i>
                </button>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Clicca su un prodotto per i dettagli</h3>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DettagliProdotto;
