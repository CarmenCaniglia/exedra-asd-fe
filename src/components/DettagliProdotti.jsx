import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../redux/actions";

const DettagliProdotto = ({ prodottoSelected }) => {
  const dispatch = useDispatch();

  return (
    <div className="mt-3 mb-4 mb-lg-0">
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
              className="d-flex flex-column align-items-center justify-content-start"
            >
              <p>
                <span className="fw-bold">Descrizione:</span>&nbsp;
                {prodottoSelected.descrizione}
              </p>
              <p>
                <span className="fw-bold">Prezzo:</span>&nbsp;
                {prodottoSelected.prezzo}€
              </p>
              <button
                className="custom-btn2 d-flex align-items-center "
                onClick={() => {
                  dispatch(addToCartAction(prodottoSelected));
                  alert("Prodotto aggiunto al carrello");
                }}
              >
                <span className="me-2">AGGIUNGI AL</span>
                <i className="bi bi-cart"></i>
              </button>
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
