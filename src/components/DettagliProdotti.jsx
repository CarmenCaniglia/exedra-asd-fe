import { Button, Col, Row } from "react-bootstrap";

const DettagliProdotto = ({ selected }) => {
  return (
    <div className="mt-3 mb-4 mb-lg-0">
      {selected ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{selected.nome}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img
                  className="book-cover img-fluid"
                  src={selected.image}
                  alt="Prodotto selezionato"
                />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="fw-bold">Descrizione:</span>&nbsp;
                {selected.descrizione}
              </p>
              <p>
                <span className="fw-bold">Prezzo:</span>&nbsp;
                {selected.prezzo}€
              </p>
              <Button className="d-flex align-items-center" onClick={() => {}}>
                <span className="me-2">AGGIUNGI AL</span>
                <i className="bi bi-cart"></i>
              </Button>
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
